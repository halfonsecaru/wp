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
  ChangeDetectionStrategy,
} from '@angular/core';
import { AlfTabComponent } from './components/alf-tab/alf-tab';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum, AlfCursorEnum } from '@alfcomponents/enums';
import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { visualBackgroundBase } from '@alfcomponents/base/base-visual';
import { AlfTabsContainerConfigInterface, ALF_TABS_CONTAINER_TOKEN, AlfTabsParentInterface } from './interfaces/alf-tabs.interface';
import { getAlfDefaultConfig } from '@alfcomponents/shared/functions/generateStyles';
import { ALF_TABS_CONTAINER_DEFAULT } from './predefined/alf-tabs-container.predefined';
import { AlfBaseDirectives, deepMergeStates } from '@alfcomponents/components/base/bases.directive';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';

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
    {
      provide: ALF_TABS_CONTAINER_TOKEN,
      useExisting: forwardRef(() => AlfTabsContainerComponent),
    },
  ],
})
export class AlfTabsContainerComponent extends AlfBaseDirectives<AlfTabsContainerConfigInterface> {
  // // ==========================================
  // 1. Attributes (Properties, Injections, basicas para los stilos border, background, shadow, etc)
  // // ==========================================
  // protected override readonly visualPrefix: string = visualprefixEnum.TabsContainer;
  // protected override readonly componentType = AlfComponentTypeEnum.Tabs;
  // private readonly internalId = generateUniqueId({ prefix: visualprefixEnum.TabsContainerInternalId });
  // public override readonly colorVariant = input<AlfColorVariantEnum>();

  // private readonly parentTab = inject(AlfTabComponent, { optional: true });
  // private readonly injector = inject(Injector);
  // private resizeObserver?: ResizeObserver;
  // private currentHeightAnimation: Animation | null = null;
  // private _touchStartX = 0;
  // private _touchStartY = 0;

  // // ==========================================
  // // 1. Effects
  // // ==========================================
  // protected readonly resizeEffect = effect((onCleanup) => {
  //   const scrollEl = this.headerScrollRef()?.nativeElement;
  //   if (!scrollEl) return;

  //   this.resizeObserver = new ResizeObserver(this.onResizeObserverTick);
  //   this.resizeObserver.observe(scrollEl);
  //   this.updateScrollMetrics();

  //   onCleanup(this.cleanupResizeObserver);
  // });

  // protected readonly animateSlider = effect(() => {
  //   this.activeIndex();
  //   this.buttonRefs();

  //   untracked(this.executeSliderUpdate);
  // });

  // protected readonly syncActiveTab = effect(() => {
  //   let active = this.activeIndex();
  //   const currentTabs = this.tabs();
  //   const contentAnim = this.finalConfig()?.contentAnimations;
  //   const contentBg = this.finalConfig()?.backgrounds;

  //   if (currentTabs.length === 0) return;

  //   if (active >= currentTabs.length) {
  //     active = currentTabs.length - 1;
  //     untracked(() => this.activeIndex.set(active));
  //   }

  //   currentTabs.forEach((tab, index) => {
  //     const isActive = index === active;
  //     tab.setActive(isActive);

  //     if (contentAnim) {
  //       tab.parentContentAnimations.set(contentAnim);
  //     }
  //     if (contentBg) {
  //       tab.parentContentBackgrounds.set(contentBg);
  //     }
  //   });

  //   untracked(this.executeTabHeightMeasurement);
  // });

  // // ==========================================
  // // 3. Signals (Inputs, Models, State)
  // // ==========================================

  // public override readonly inputConfig = input<AlfTabsContainerConfigInterface>(undefined, { alias: 'config' });
  // public readonly fluidHeightInput = input<boolean | undefined>(undefined, { alias: 'fluidHeight' });
  // public readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  // public readonly keyboardActivation = input<'automatic' | 'manual'>('automatic');

  // public readonly tabClose = output<number>();

  // public readonly activeIndex = model<number>(0);
  // public readonly isAnimating = signal<boolean>(false);
  // public readonly containerHeight = signal<string>('auto');
  // protected readonly headerMetrics = signal({ canLeft: false, canRight: false });

  // protected readonly tabs = contentChildren(
  //   forwardRef(() => AlfTabComponent),
  //   { descendants: false },
  // );
  // protected readonly nestedContainers = contentChildren(
  //   forwardRef(() => AlfTabsContainerComponent),
  //   { descendants: false },
  // );

  // protected readonly headerScrollRef = viewChild<ElementRef<HTMLDivElement>>('headerScroll');
  // protected readonly sliderRef = viewChild<ElementRef<HTMLDivElement>>('slider');
  // public readonly contentContainer = viewChild<ElementRef<HTMLDivElement>>('contentContainer');
  // protected readonly buttonRefs = viewChildren('tabButton', { read: ElementRef });

  // // ==========================================
  // // 4. Computed
  // // ==========================================

  // protected readonly predefinedConfigComputed = computed(() => {
  //   const rawV = this.colorVariant() ?? this.inputConfig()?.colorVariant;

  //   return getAlfDefaultConfig(rawV, this.componentType, ALF_TABS_CONTAINER_DEFAULT, this.inputConfig() ?? {});
  // });

  // protected override readonly colorVariantComputed = computed(() => {
  //   return this.predefinedConfigComputed()?.colorVariant;
  // });

  // protected override readonly cursorComputed = computed(() => {
  //   return this.cursor() ?? this.resolvedConfig()?.cursor ?? AlfCursorEnum.Default;
  // });

  // protected readonly isDisabled = computed(() => {
  //   return this.disabledComputed() ?? this.predefinedConfigComputed()?.disabled ?? false;
  // });

  // protected override readonly borderComputed = computed(() => {
  //   const base = this.resolvedVariantConfig()?.borderBase;
  //   const resolved = this.resolvedConfig()?.border || {};
  //   const user = this.border() || {};

  //   const mergeState = (stateKey: 'default' | 'hover' | 'focus' | 'active' | 'disabled') => {
  //     const baseState = base?.[stateKey] || {};
  //     const resolvedState = resolved?.[stateKey] || {};
  //     const userState = user?.[stateKey] || {};

  //     const hasVariant = this.colorVariantComputed() && this.colorVariantComputed() !== AlfColorVariantEnum.Default;

  //     return hasVariant ? { ...resolvedState, ...baseState, ...userState } : { ...baseState, ...resolvedState, ...userState };
  //   };

  //   return {
  //     default: mergeState('default'),
  //     hover: mergeState('hover'),
  //     focus: mergeState('focus'),
  //     active: mergeState('active'),
  //     disabled: mergeState('disabled'),
  //   };
  // });

  // public readonly activeTabColor = computed(() => {
  //   return this.borderComputed()?.default?.borderColor || this.textStyleComputed()?.default?.color || 'var(--alf-color-primary, #3b82f6)';
  // });

  // public override readonly resolvedConfig = computed(() => {
  //   const predefined = this.predefinedConfigComputed();
  //   const manual = this.inputConfig();
  //   const variant = this.colorVariantComputed();

  //   return {
  //     ...predefined,
  //     ...manual,
  //     colorVariant: variant,
  //     fluidHeight: this.fluidHeightInput() ?? manual?.fluidHeight ?? predefined?.fluidHeight,
  //     contentAnimations: manual?.contentAnimations ?? predefined?.contentAnimations,
  //   };
  // });

  // public readonly finalConfig = this.resolvedConfig;

  // public readonly containerId = computed(() => this.resolvedConfig()?.id ?? this.internalId);

  // public readonly cursorStyle = computed(() => this.cursorComputed());

  // public readonly isFluidHeight = computed(() => {
  //   const fromInput = this.fluidHeightInput();
  //   const config = this.finalConfig();
  //   const fromConfig = config?.fluidHeight;

  //   if (fromInput || fromConfig) return true;

  //   return this.nestedContainers().length === 0;
  // });

  // public readonly navigationTabs = computed(() => {
  //   const currentTabs = this.tabs();
  //   const activeIdx = this.activeIndex();

  //   return currentTabs.map((tab, index) => {
  //     const isActive = index === activeIdx;
  //     const tabLabel = tab.finalLabel();

  //     return {
  //       label: tabLabel,
  //       iconLeft: tab.iconLeft(),
  //       iconRight: tab.iconRight(),
  //       isActive,
  //       disabled: tab.isDisabled(),
  //       closable: tab.closable(),
  //     };
  //   });
  // });

  // public readonly contentAnimationsStyle = computed(() => {
  //   const anim = this.finalConfig()?.contentAnimations;
  //   const baseStyles = 'position: relative; overflow: hidden;';
  //   if (!anim) return baseStyles;

  //   const declarations: string[] = [baseStyles];
  //   if (anim.duration) declarations.push(`--animate-duration: ${anim.duration};`);
  //   if (anim.delay) declarations.push(`--animate-delay: ${anim.delay};`);
  //   return declarations.join(' ');
  // });

  // public readonly contentAnimationsClass = computed(() => {
  //   const anim = this.finalConfig()?.contentAnimations?.enterStage ?? '';
  //   if (!anim) return '';
  //   this.activeIndex();
  //   return anim;
  // });

  // public readonly contentBackgroundsStyle = computed(() =>
  //   visualBackgroundBase('--alf-tabs-content', {
  //     type: this.colorVariantComputed(),
  //     backgrounds: this.backgroundsComputed(),
  //   }),
  // );

  // // ==========================================
  // // 5. Lifecycle Hooks
  // // ==========================================
  // constructor() {
  //   super();
  // }

  // // ==========================================
  // // 6. Functions (Arrow Functions)
  // // ==========================================
  // protected readonly executeSliderUpdate = (): void => {
  //   this.updateSlider();
  // };

  // protected readonly executeTabHeightMeasurement = (): void => {
  //   afterNextRender(this.onTabHeightMeasured, { injector: this.injector });
  // };

  // protected readonly onResizeObserverTick = (): void => {
  //   this.updateScrollMetrics();
  // };

  // protected readonly cleanupResizeObserver = (): void => {
  //   this.resizeObserver?.disconnect();
  // };

  // private readonly applyHeight = (container: HTMLElement, value: string): void => {
  //   container.style.setProperty('--alf-tabs-content-height', value);
  // };

  // private readonly measureNaturalHeight = (): number => {
  //   const activeIdx = this.activeIndex();
  //   const allTabs = this.tabs();
  //   const activeTab = allTabs[activeIdx];
  //   if (!activeTab) return 0;

  //   const container = this.contentContainer()?.nativeElement;
  //   if (!container) return 0;

  //   const savedToken = container.style.getPropertyValue('--alf-tabs-content-height');
  //   container.style.setProperty('--alf-tabs-content-height', 'auto');

  //   const savedDisplays: { el: HTMLElement; display: string }[] = [];
  //   for (let i = 0; i < allTabs.length; i++) {
  //     if (i !== activeIdx) {
  //       const el = allTabs[i].elementRef.nativeElement;
  //       savedDisplays.push({ el, display: el.style.display });
  //       el.style.display = 'none';
  //     }
  //   }

  //   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //   container.offsetHeight; // Reflow
  //   const naturalHeight = container.scrollHeight;

  //   container.style.setProperty('--alf-tabs-content-height', savedToken || 'auto');
  //   for (const saved of savedDisplays) {
  //     saved.el.style.display = saved.display;
  //   }

  //   return naturalHeight;
  // };

  // public readonly onTabHeightMeasured = (): void => {
  //   if (!this.isFluidHeight()) return;
  //   const container = this.contentContainer()?.nativeElement;
  //   if (!container) return;

  //   if (this.currentHeightAnimation) {
  //     this.currentHeightAnimation.cancel();
  //     this.currentHeightAnimation = null;
  //   }

  //   const startHeight = container.offsetHeight;
  //   const endHeight = this.measureNaturalHeight();

  //   if (endHeight === 0) return;

  //   if (startHeight === 0 || Math.abs(startHeight - endHeight) < 2) {
  //     this.applyHeight(container, `${endHeight}px`);
  //     return;
  //   }

  //   this.isAnimating.set(true);
  //   this.applyHeight(container, `${startHeight}px`);

  //   const anim = container.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], {
  //     duration: 350,
  //     easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  //     fill: 'none',
  //   });

  //   this.currentHeightAnimation = anim;
  //   anim.onfinish = this.onHeightAnimationFinish(container, endHeight);
  // };

  // private readonly onHeightAnimationFinish = (container: HTMLElement, endHeight: number): (() => void) => {
  //   return (): void => {
  //     this.applyHeight(container, `${endHeight}px`);
  //     this.currentHeightAnimation = null;
  //     this.isAnimating.set(false);

  //     if (this.parentTab) {
  //       this.parentTab.reportHeight();
  //     }
  //   };
  // };

  // protected readonly updateScrollMetrics = (): void => {
  //   const el = this.headerScrollRef()?.nativeElement;
  //   if (!el) return;

  //   const { scrollLeft, scrollWidth, clientWidth } = el;
  //   this.headerMetrics.set({
  //     canLeft: scrollLeft > 1,
  //     canRight: scrollLeft + clientWidth < scrollWidth - 1,
  //   });

  //   this.updateSlider(false);
  // };

  // public readonly scrollLeft = (): void => {
  //   const el = this.headerScrollRef()?.nativeElement;
  //   if (!el) return;
  //   el.scrollBy({ left: -200, behavior: 'smooth' });
  // };

  // public readonly scrollRight = (): void => {
  //   const el = this.headerScrollRef()?.nativeElement;
  //   if (!el) return;
  //   el.scrollBy({ left: 200, behavior: 'smooth' });
  // };

  // protected readonly onScroll = (): void => {
  //   this.updateScrollMetrics();
  // };

  // public readonly updateSlider = (animate: boolean = true): void => {
  //   const active = this.activeIndex();
  //   const buttons = this.buttonRefs();
  //   const slider = this.sliderRef()?.nativeElement;

  //   if (!slider || buttons.length === 0) return;

  //   const targetButton = buttons[active]?.nativeElement;
  //   if (!targetButton) return;

  //   const isVertical = this.orientation() === 'vertical';

  //   if (isVertical) {
  //     const targetHeight = targetButton.offsetHeight;
  //     const targetTop = targetButton.offsetTop;

  //     if (targetHeight === 0) return;

  //     const currentHeight = parseFloat(slider.style.height) || 0;
  //     const currentTop = parseFloat(slider.style.top) || 0;

  //     // Reset horizontal styles
  //     slider.style.width = '';
  //     slider.style.left = '';

  //     if (animate && currentHeight > 0 && Math.abs(targetTop - currentTop) > 1) {
  //       const isMovingDown = targetTop > currentTop;

  //       let midTop: number;
  //       let midHeight: number;

  //       if (isMovingDown) {
  //         midTop = currentTop + (targetTop - currentTop) * 0.15;
  //         midHeight = targetTop + targetHeight - midTop;
  //       } else {
  //         midTop = targetTop;
  //         midHeight = currentTop + currentHeight - targetTop;
  //       }

  //       slider.animate(
  //         [
  //           { top: `${currentTop}px`, height: `${currentHeight}px` },
  //           { top: `${midTop}px`, height: `${midHeight}px` },
  //           { top: `${targetTop}px`, height: `${targetHeight}px` },
  //         ],
  //         {
  //           duration: 320,
  //           easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  //           fill: 'forwards',
  //         },
  //       );
  //     } else {
  //       slider.style.height = `${targetHeight}px`;
  //       slider.style.top = `${targetTop}px`;
  //     }

  //     slider.style.height = `${targetHeight}px`;
  //     slider.style.top = `${targetTop}px`;
  //   } else {
  //     const targetWidth = targetButton.offsetWidth;
  //     const targetLeft = targetButton.offsetLeft;

  //     if (targetWidth === 0) return;

  //     const currentWidth = parseFloat(slider.style.width) || 0;
  //     const currentLeft = parseFloat(slider.style.left) || 0;

  //     // Reset vertical styles
  //     slider.style.height = '';
  //     slider.style.top = '';

  //     if (animate && currentWidth > 0 && Math.abs(targetLeft - currentLeft) > 1) {
  //       const isMovingRight = targetLeft > currentLeft;

  //       let midLeft: number;
  //       let midWidth: number;

  //       if (isMovingRight) {
  //         midLeft = currentLeft + (targetLeft - currentLeft) * 0.15;
  //         midWidth = targetLeft + targetWidth - midLeft;
  //       } else {
  //         midLeft = targetLeft;
  //         midWidth = currentLeft + currentWidth - targetLeft;
  //       }

  //       slider.animate(
  //         [
  //           { left: `${currentLeft}px`, width: `${currentWidth}px` },
  //           { left: `${midLeft}px`, width: `${midWidth}px` },
  //           { left: `${targetLeft}px`, width: `${targetWidth}px` },
  //         ],
  //         {
  //           duration: 320,
  //           easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  //           fill: 'forwards',
  //         },
  //       );
  //     } else {
  //       slider.style.width = `${targetWidth}px`;
  //       slider.style.left = `${targetLeft}px`;
  //     }

  //     slider.style.width = `${targetWidth}px`;
  //     slider.style.left = `${targetLeft}px`;
  //   }
  // };

  // public readonly setActiveTab = (index: number): void => {
  //   const tabs = this.tabs();
  //   const targetTab = tabs[index];
  //   if (targetTab && targetTab.isDisabled()) {
  //     return;
  //   }

  //   const oldIndex = this.activeIndex();
  //   if (oldIndex !== index) {
  //     const oldTab = tabs[oldIndex];

  //     if (oldTab) {
  //       oldTab.playExitAnimation();
  //     }

  //     this.activeIndex.set(index);
  //   }
  // };

  // public readonly onHeaderKeydown = (event: KeyboardEvent, index: number): void => {
  //   const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', ' ', 'Spacebar'];
  //   if (!keys.includes(event.key)) return;

  //   const isVertical = this.orientation() === 'vertical';
  //   const totalTabs = this.tabs().length;
  //   if (totalTabs === 0) return;

  //   let targetIndex = -1;

  //   if (isVertical) {
  //     if (event.key === 'ArrowDown') {
  //       targetIndex = this.findNextFocusableTab(index, 1);
  //       event.preventDefault();
  //     } else if (event.key === 'ArrowUp') {
  //       targetIndex = this.findNextFocusableTab(index, -1);
  //       event.preventDefault();
  //     }
  //   } else {
  //     if (event.key === 'ArrowRight') {
  //       targetIndex = this.findNextFocusableTab(index, 1);
  //       event.preventDefault();
  //     } else if (event.key === 'ArrowLeft') {
  //       targetIndex = this.findNextFocusableTab(index, -1);
  //       event.preventDefault();
  //     }
  //   }

  //   if (event.key === 'Home') {
  //     targetIndex = this.findNextFocusableTab(-1, 1);
  //     event.preventDefault();
  //   } else if (event.key === 'End') {
  //     targetIndex = this.findNextFocusableTab(totalTabs, -1);
  //     event.preventDefault();
  //   }

  //   if (targetIndex !== -1 && targetIndex !== index) {
  //     const isAuto = this.keyboardActivation() === 'automatic';
  //     if (isAuto) {
  //       this.setActiveTab(targetIndex);
  //     }

  //     setTimeout(() => {
  //       const btn = this.buttonRefs()[targetIndex]?.nativeElement;
  //       if (btn) btn.focus();
  //     });
  //   }
  // };

  // private findNextFocusableTab(current: number, direction: number): number {
  //   const tabs = this.tabs();
  //   const len = tabs.length;
  //   let next = current;

  //   for (let i = 0; i < len; i++) {
  //     next = (next + direction + len) % len;
  //     if (!tabs[next].isDisabled()) {
  //       return next;
  //     }
  //   }
  //   return current;
  // }

  // public readonly closeTab = (index: number, event?: Event): void => {
  //   if (event) {
  //     event.stopPropagation();
  //     event.preventDefault();
  //   }
  //   const currentTabs = this.tabs();
  //   const tabToClose = currentTabs[index];
  //   if (!tabToClose) return;

  //   this.tabClose.emit(index);
  // };

  // public readonly onTouchStart = (event: TouchEvent): void => {
  //   this._touchStartX = event.touches[0].clientX;
  //   this._touchStartY = event.touches[0].clientY;
  // };

  // public readonly onTouchEnd = (event: TouchEvent): void => {
  //   const touchEndX = event.changedTouches[0].clientX;
  //   const touchEndY = event.changedTouches[0].clientY;

  //   const deltaX = touchEndX - this._touchStartX;
  //   const deltaY = touchEndY - this._touchStartY;

  //   if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 60) {
  //     const active = this.activeIndex();
  //     const total = this.tabs().length;

  //     if (deltaX > 0 && active > 0) {
  //       this.setActiveTab(active - 1);
  //     } else if (deltaX < 0 && active < total - 1) {
  //       this.setActiveTab(active + 1);
  //     }
  //   }
  // };
}
