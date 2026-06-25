import {
  Component,
  contentChildren,
  effect,
  input,
  signal,
  computed,
  viewChild,
  ElementRef,
  viewChildren,
  untracked,
  afterNextRender,
  forwardRef,
  inject,
  model,
  Injector,
  output,
  ChangeDetectionStrategy
} from '@angular/core';
import { AlfTabComponent } from './components/alf-tab/alf-tab';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfTabsContainerConfigInterface, ALF_TABS_CONTAINER_TOKEN } from './interfaces/alf-tabs.interface';
import { AlfBaseDirectives, AlfComponentTypeEnum, deepMergeStates } from '@alfcomponents/components/base/bases.directive';
import { ALF_TABS_CONTAINER_DEFAULT } from './predefined/alf-tabs-container.predefined';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';

import { AlfTabsHeightService } from './services/alf-tabs-height.service';

@Component({
  selector: 'alf-tabs-container',
  standalone: true,
  imports: [
    ...ALF_CORE_DIRECTIVES
  ],
  templateUrl: './alf-tabs-container.html',
  styleUrl: './alf-tabs-container.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    AlfTabsHeightService,
    {
      provide: ALF_TABS_CONTAINER_TOKEN,
      useExisting: forwardRef(() => AlfTabsContainerComponent),
    },
  ],
})
export class AlfTabsContainerComponent extends AlfBaseDirectives<AlfTabsContainerConfigInterface> {
  // // ==========================================
  // // 1. Effects
  // // ==========================================
  protected readonly resizeEffect = effect((onCleanup) => {
    const scrollEl = this.headerScrollRef()?.nativeElement;
    if (!scrollEl) return;

    this.resizeObserver = new ResizeObserver(this.onResizeObserverTick);
    this.resizeObserver.observe(scrollEl);
    this.updateScrollMetrics();

    onCleanup(() => this.resizeObserver?.disconnect());
  });

  protected readonly animateSlider = effect(() => {
    this.activeIndex();
    this.buttonRefs();

    untracked(() => this.updateSlider());
  });

  protected readonly syncActiveTab = effect(() => {
    let active = this.activeIndex();
    const currentTabs = this.tabs();
    const contentAnim = this.animationsComputed();
    const contentBg = this.backgroundComputed();

    if (currentTabs.length === 0) return;

    if (active >= currentTabs.length) {
      active = currentTabs.length - 1;
      untracked(() => this.activeIndex.set(active));
    }

    const container = this.contentContainer()?.nativeElement;
    if (container && this.isFluidHeight() && this.orientation() !== 'vertical') {
      this.applyMinMaxHeight(container, `${container.offsetHeight}px`);
    }

    currentTabs.forEach((tab, index) => {
      const isActive = index === active;
      tab.setActive(isActive);

      if (contentAnim) {
        tab.parentContentAnimations.set(contentAnim);
      }
      if (contentBg) {
        tab.parentContentBackgrounds.set(contentBg);
      }
    });

    untracked(this.executeTabHeightMeasurement);
  });

  // ── 1. Constants & View Queries ───────────────────────────────────────────
  protected readonly cssVarPrefix: string = visualprefixEnum.TabsContainer as string;
  protected readonly classPrefix: string = visualprefixEnum.TabsContainerPrefix as string;

  // ── 2. Inputs & Models ────────────────────────────────────────────────────

  protected readonly id = input<string>();
  protected readonly inputConfig = input<AlfTabsContainerConfigInterface>(undefined, { alias: 'config' });
  protected readonly fluidHeightInput = input<boolean | undefined>(undefined, { alias: 'fluidHeight' });
  protected readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  protected readonly keyboardActivation = input<'automatic' | 'manual'>('automatic');
  protected readonly tabClose = output<number>();


  protected readonly activeIndex = model<number>(0);
  protected readonly isAnimating = signal<boolean>(false);
  protected readonly containerHeight = signal<string>('auto');
  protected readonly headerMetrics = signal({ canLeft: false, canRight: false });

  protected readonly tabs = contentChildren(
    forwardRef(() => AlfTabComponent),
    { descendants: false },
  );
  protected readonly nestedContainers = contentChildren(
    forwardRef(() => AlfTabsContainerComponent),
    { descendants: false },
  );


  // ── 4. Internal State (Signals & Variables) ─────────────────────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: this.classPrefix });
  private readonly parentTab = inject(AlfTabComponent, { optional: true });
  protected readonly hostRef = inject(ElementRef);
  private readonly injector = inject(Injector);
  
  private readonly localHeightService = inject(AlfTabsHeightService);
  private readonly parentHeightService = inject(AlfTabsHeightService, { optional: true, skipSelf: true });
  
  private resizeObserver?: ResizeObserver;
  private currentHeightAnimation: Animation | null = null;
  private _touchStartX = 0;
  private _touchStartY = 0;
  protected readonly headerScrollRef = viewChild<ElementRef<HTMLDivElement>>('headerScroll');
  protected readonly sliderRef = viewChild<ElementRef<HTMLDivElement>>('slider');
  public readonly contentContainer = viewChild<ElementRef<HTMLDivElement>>('contentContainer');
  protected readonly buttonRefs = viewChildren('tabButton', { read: ElementRef });



  // ── 5. Computed State (Derived from Inputs & State) ───────────────────────
  protected readonly idComputed = computed(() => this.id() ?? this.inputConfig()?.id ?? this.internalId);
  public readonly disabledComputed = computed<boolean>(() => {
    return !!(this.disabled() || this.inputConfig()?.disabled);
  });

  public readonly navigationTabs = computed(() => {
    const currentTabs = this.tabs();
    const activeIdx = this.activeIndex();

    return currentTabs.map((tab, index) => {
      const isActive = index === activeIdx;
      const tabLabel = tab.finalLabel();

      return {
        label: tabLabel,
        iconLeft: tab.iconLeft(),
        iconRight: tab.iconRight(),
        isActive,
        disabled: tab.isDisabled(),
        closable: tab.closable(),
      };
    });
  });

  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.Tabs);
    this.initialization(visualprefixEnum.TabsContainer, visualprefixEnum.TabsContainerClass, AlfComponentTypeEnum.Tabs);

    effect(() => {
      // Nos suscribimos a la señal reactiva
      const _trigger = this.localHeightService.heightChangeSignal();
      if (_trigger > 0) {
        untracked(() => {
          this.executeTabHeightMeasurement();
        });
      }
    });
  };

  public readonly isFluidHeight = computed(() => {
    if (this.orientation() === 'vertical') return false;

    const fromInput = this.fluidHeightInput();
    const config = this.inputConfig();
    const fromConfig = this.fluidHeightInput() ?? config?.fluidHeight;

    if (fromInput || fromConfig) return true;

    return this.nestedContainers().length === 0;
  });


  // =========================================================
  // Protected methods
  // =========================================================
  private readonly onResizeObserverTick = (): void => {
    this.updateScrollMetrics();
  };

  private lastClientWidth = 0;
  private lastClientHeight = 0;

  private readonly updateScrollMetrics = (): void => {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth, clientHeight } = el;
    this.headerMetrics.set({
      canLeft: scrollLeft > 1,
      canRight: scrollLeft + clientWidth < scrollWidth - 1,
    });

    if (this.lastClientWidth !== clientWidth || this.lastClientHeight !== clientHeight) {
      this.lastClientWidth = clientWidth;
      this.lastClientHeight = clientHeight;
      this.updateSlider(false);

      if (clientWidth === 0 || clientHeight === 0) {
        const container = this.contentContainer()?.nativeElement;
        if (container) {
          this.applyMinMaxHeight(container, 'auto');
        }
        if (this.currentHeightAnimation) {
          this.currentHeightAnimation.cancel();
          this.currentHeightAnimation = null;
        }
      }
    }
  };

  private readonly updateSlider = (animate: boolean = true): void => {
    const active = this.activeIndex();
    const buttons = this.buttonRefs();
    const slider = this.sliderRef()?.nativeElement;

    if (!slider || buttons.length === 0) return;

    const targetButton = buttons[active]?.nativeElement;
    if (!targetButton) return;

    const isVertical = this.orientation() === 'vertical';

    if (animate) {
      slider.style.transition = 'transform 280ms cubic-bezier(0.35, 0, 0.25, 1), width 280ms cubic-bezier(0.35, 0, 0.25, 1), height 280ms cubic-bezier(0.35, 0, 0.25, 1)';
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      slider.offsetHeight; // Forzar reflow para asegurar que la transición se activa antes del cambio de transform
    } else {
      slider.style.transition = 'none';
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      slider.offsetHeight;
    }

    if (isVertical) {
      const targetHeight = targetButton.offsetHeight;
      const targetTop = targetButton.offsetTop;

      if (targetHeight === 0) return;

      slider.style.width = '';
      slider.style.left = '';
      slider.style.height = `${targetHeight}px`;
      slider.style.transform = `translateY(${targetTop}px)`;
    } else {
      const targetWidth = targetButton.offsetWidth;
      const targetLeft = targetButton.offsetLeft;

      if (targetWidth === 0) return;

      slider.style.height = '';
      slider.style.top = '';
      slider.style.width = `${targetWidth}px`;
      slider.style.transform = `translateX(${targetLeft}px)`;
    }
  };

  protected readonly executeTabHeightMeasurement = (): void => {
    afterNextRender(this.onTabHeightMeasured, { injector: this.injector });
  };

  public readonly onTabHeightMeasured = (): void => {
    const container = this.contentContainer()?.nativeElement;
    if (!container) return;

    const activeIdx = this.activeIndex();
    const allTabs = this.tabs();
    const activeTab = allTabs[activeIdx];
    const activeTabEl = activeTab?.elementRef.nativeElement;
    const hasNestedContainer = activeTabEl?.querySelector('alf-tabs-container') !== null;

    if (this.orientation() === 'vertical' || hasNestedContainer) {
      this.applyMinMaxHeight(container, 'auto');
      return;
    }

    if (!this.isFluidHeight()) return;

    if (this.currentHeightAnimation) {
      this.currentHeightAnimation.cancel();
      this.currentHeightAnimation = null;
    }

    // Obtenemos la restricción maxHeight del CSS desde el HOST
    const host = this.hostRef.nativeElement as HTMLElement;
    const hostStyle = window.getComputedStyle(host);
    let maxHeightStr = hostStyle.maxHeight;

    if (!maxHeightStr || maxHeightStr === 'none') {
      const cssVar = hostStyle.getPropertyValue('--alf-tbs-layout-max-height').trim();
      if (cssVar && cssVar !== 'none') {
        maxHeightStr = cssVar;
      }
    }

    const startHeight = container.offsetHeight;
    const endHeight = this.measureNaturalHeight();

    if (endHeight === 0) return;

    let limitHeight = endHeight;
    if (maxHeightStr && maxHeightStr !== 'none') {
      const maxVal = parseFloat(maxHeightStr);
      if (!isNaN(maxVal)) {
        const headerEl = host.querySelector(`.${this.classPrefix}__header-wrapper`);
        const headerHeight = headerEl ? (headerEl as HTMLElement).offsetHeight : 0;
        const availableHeight = maxVal - headerHeight;

        if (endHeight > availableHeight) {
          limitHeight = availableHeight;
        }
      }
    }

    if (startHeight === 0 || Math.abs(startHeight - limitHeight) < 2) {
      this.applyMinMaxHeight(container, `${limitHeight}px`);
      // Notify parent about instant height change!
      this.parentHeightService?.notifyHeightChange();
      return;
    }

    this.currentHeightAnimation = container.animate(
      [
        { minHeight: `${startHeight}px`, maxHeight: `${startHeight}px` },
        { minHeight: `${limitHeight}px`, maxHeight: `${limitHeight}px` }
      ],
      {
        duration: 320,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    );

    this.currentHeightAnimation.onfinish = () => {
      this.applyMinMaxHeight(container, `${limitHeight}px`);
      const anim = this.currentHeightAnimation;
      this.currentHeightAnimation = null;
      if (anim) {
        anim.onfinish = null;
        anim.oncancel = null;
        anim.cancel();
      }

      // Avisamos al componente padre (si existe) de que nuestra altura ha cambiado
      // para que pueda recalcular la suya automáticamente de forma fluida.
      this.parentHeightService?.notifyHeightChange();
    };

  }


  private readonly measureNaturalHeight = (): number => {
    const activeIdx = this.activeIndex();
    const allTabs = this.tabs();
    const activeTab = allTabs[activeIdx];
    if (!activeTab) return 0;

    const savedDisplays: { el: HTMLElement; display: string }[] = [];
    for (let i = 0; i < allTabs.length; i++) {
      if (i !== activeIdx) {
        const el = allTabs[i].elementRef.nativeElement;
        savedDisplays.push({ el, display: el.style.display });
        el.style.display = 'none';
      }
    }

    // MEDIMOS LA PESTAÑA ACTIVA DIRECTAMENTE
    const activeTabEl = activeTab.elementRef.nativeElement;
    // Buscamos el elemento interior (.alf-tab-content)
    const contentInner = activeTabEl.querySelector('.alf-tab-content') as HTMLElement;
    const naturalHeight = contentInner ? contentInner.scrollHeight : activeTabEl.scrollHeight;

    for (const saved of savedDisplays) {
      saved.el.style.display = saved.display;
    }

    return naturalHeight;
  };


  private readonly applyMinMaxHeight = (container: HTMLElement, value: string): void => {
    container.style.minHeight = value === 'auto' ? '' : value;
    container.style.maxHeight = value === 'auto' ? '' : value;
  };


  protected readonly scrollRight = (): void => {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: 200, behavior: 'smooth' });
  };

  public readonly onTouchStart = (event: TouchEvent): void => {
    this._touchStartX = event.touches[0].clientX;
    this._touchStartY = event.touches[0].clientY;
  };

  public readonly onTouchEnd = (event: TouchEvent): void => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - this._touchStartX;
    const deltaY = touchEndY - this._touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 60) {
      const active = this.activeIndex();
      const total = this.tabs().length;

      if (deltaX > 0 && active > 0) {
        this.setActiveTab(active - 1);
      } else if (deltaX < 0 && active < total - 1) {
        this.setActiveTab(active + 1);
      }
    }
  };


  public readonly setActiveTab = (index: number): void => {
    const tabs = this.tabs();
    const targetTab = tabs[index];
    if (targetTab && targetTab.isDisabled()) {
      return;
    }

    const oldIndex = this.activeIndex();
    if (oldIndex !== index) {
      const oldTab = tabs[oldIndex];

      if (oldTab) {
        oldTab.playExitAnimation();
      }

      this.activeIndex.set(index);
    }
  };

  public readonly onHeaderKeydown = (event: KeyboardEvent, index: number): void => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', ' ', 'Spacebar'];
    if (!keys.includes(event.key)) return;

    const isVertical = this.orientation() === 'vertical';
    const totalTabs = this.tabs().length;
    if (totalTabs === 0) return;

    let targetIndex = -1;

    if (isVertical) {
      if (event.key === 'ArrowDown') {
        targetIndex = this.findNextFocusableTab(index, 1);
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        targetIndex = this.findNextFocusableTab(index, -1);
        event.preventDefault();
      }
    } else {
      if (event.key === 'ArrowRight') {
        targetIndex = this.findNextFocusableTab(index, 1);
        event.preventDefault();
      } else if (event.key === 'ArrowLeft') {
        targetIndex = this.findNextFocusableTab(index, -1);
        event.preventDefault();
      }
    }

    if (event.key === 'Home') {
      targetIndex = this.findNextFocusableTab(-1, 1);
      event.preventDefault();
    } else if (event.key === 'End') {
      targetIndex = this.findNextFocusableTab(totalTabs, -1);
      event.preventDefault();
    }

    if (targetIndex !== -1 && targetIndex !== index) {
      const isAuto = this.keyboardActivation() === 'automatic';
      if (isAuto) {
        this.setActiveTab(targetIndex);
      }

      setTimeout(() => {
        const btn = this.buttonRefs()[targetIndex]?.nativeElement;
        if (btn) btn.focus();
      });
    }
  };

  private findNextFocusableTab(current: number, direction: number): number {
    const tabs = this.tabs();
    const len = tabs.length;
    let next = current;

    for (let i = 0; i < len; i++) {
      next = (next + direction + len) % len;
      if (!tabs[next].isDisabled()) {
        return next;
      }
    }
    return current;
  }

  public readonly closeTab = (index: number, event?: Event): void => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const currentTabs = this.tabs();
    const tabToClose = currentTabs[index];
    if (!tabToClose) return;

    this.tabClose.emit(index);
  };

  protected readonly onScroll = (): void => {
    this.updateScrollMetrics();
  };


  public readonly scrollLeft = (): void => {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: -200, behavior: 'smooth' });
  };


  // ── Control Config override ────────────────────────────────────────────
  protected override getControlConfig() {
    return deepMergeStates(ALF_TABS_CONTAINER_DEFAULT, this.inputConfig());
  }
}