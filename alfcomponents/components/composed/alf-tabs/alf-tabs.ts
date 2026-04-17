import { 
  ChangeDetectionStrategy, 
  Component, 
  computed, 
  ElementRef, 
  HostListener, 
  input, 
  model, 
  viewChild, 
  ViewEncapsulation,
  signal,
  AfterViewInit,
  OnDestroy,
  Input,
  contentChildren,
  effect,
  untracked,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlfBaseComponent } from '@alfcomponents/base';
import { AlfTabsInterface } from './interfaces/alf-tabs.interface';
import { AlfAnimateCssInterface } from '@alfcomponents/interfaces';
import { AlfTabsPositionEnum } from './enums/alf-tabs-visual-type.enum';
import { AlfButton } from '@alfcomponents/components';
import { AlfIconsUnicodeIconEnum, AlfColorEnum } from '@alfcomponents/enums';
import { getAlfPredefinedTabs } from './predefined/alf-tabs.predefined';
import { DefaultTabsKeys } from './enums/default-tabs-keys.enum';
import { AlfTabComponent } from './alf-tab/alf-tab';
import { AlfTabContentComponent } from './alf-tab-content/alf-tab-content';

/**
 * AlfTabsComponent
 * Orquestador Élite del sistema de pestañas.
 */
@Component({
  selector: 'alf-tabs',
  standalone: true,
  imports: [CommonModule, AlfButton],
  templateUrl: './alf-tabs.html',
  styleUrl: './alf-tabs.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlfTabsComponent extends AlfBaseComponent<AlfTabsInterface> implements AfterViewInit, OnDestroy {
  
  // --- Configuración e Identidades ---
  @Input('predefined') set predefined(v: AlfTabsInterface | string | undefined) { 
    this.predefinedInput.set(v || DefaultTabsKeys.Base); 
  }
  protected readonly predefinedInput = signal<AlfTabsInterface | string>(DefaultTabsKeys.Base);

  protected override readonly resolvedPredefined = computed(() => {
    const p = this.predefinedInput();
    return typeof p === 'string' ? getAlfPredefinedTabs(p) : p;
  });

  // --- Máquina de Estados de Transición ---
  readonly activeIndex = model<number>(0);
  readonly contentIndex = signal<number>(0);
  protected readonly targetIndexPending = signal<number | null>(null);
  protected readonly navigationDirection = signal<'forward' | 'backward'>('forward');

  /** Estilos dinámicos para el Sliding Indicator (Master mode) */
  protected readonly indicatorStyle = signal({ transform: 'translateX(0)', width: '0', opacity: 0 });
  protected readonly isTransitioning = signal(false);
  protected readonly exitingTabsSet = signal<Set<number>>(new Set());

  // --- UI & Proyección ---
  readonly position = input<AlfTabsPositionEnum>(AlfTabsPositionEnum.Top);
  readonly configComputed = this.resolvedConfigComputed;
  readonly tabChange = output<number>();
  
  protected readonly liveMessageComputed = signal<string>('');
  protected readonly icons = AlfIconsUnicodeIconEnum;
  protected readonly tabs = contentChildren(AlfTabComponent);
  protected readonly manualContents = contentChildren(AlfTabContentComponent);
  
  private readonly headerScroll = viewChild<ElementRef<HTMLDivElement>>('headerScroll');
  protected readonly showScrollArrowsComputed = signal<boolean>(false);
  
  readonly isNestedModeComputed = computed(() => this.manualContents().length === 0 && this.tabs().length > 0);

  // --- Lógica Interna ---
  private touchStartX = 0;
  private readonly swipeThreshold = 50;
  private resizeObserver?: ResizeObserver;

  constructor() {
    super();
    this.initAutoIndexingEffect();
    this.initAccessibilityEffect();
    this.initIndicatorEffect();
  }

  public selectTabByIndex(targetIndex: number): void {
    const currentIndex = this.contentIndex();
    if (targetIndex === currentIndex || this.isTransitioning()) return;

    this.isTransitioning.set(true);
    const direction = targetIndex > currentIndex ? 'forward' : 'backward';
    this.navigationDirection.set(direction);

    this.activeIndex.set(targetIndex);
    this.targetIndexPending.set(targetIndex);

    const currentTab = this.tabs()[currentIndex];
    const anim = this.getTabAnimations(currentTab);

    if (currentTab && anim?.exitStage) {
      this.exitingTabsSet.update(set => new Set(set).add(currentIndex));
      currentTab.isExiting.set(true);
    } else {
      this.completeTransition(targetIndex);
    }
  }

  protected completeTransition(targetIndex: number): void {
    const allTabs = this.tabs();
    this.exitingTabsSet().forEach(idx => {
      const tab = allTabs[idx];
      if (tab) tab.isExiting.set(false);
    });

    this.exitingTabsSet.set(new Set());
    this.contentIndex.set(targetIndex);
    this.targetIndexPending.set(null);
    this.isTransitioning.set(false);
  }

  public onTabAnimationEnd(tab: AlfTabComponent): void {
    const index = tab.effectiveIndex();
    if (this.exitingTabsSet().has(index)) {
      const pending = this.targetIndexPending();
      if (pending !== null) this.completeTransition(pending);
    }
  }

  protected getTabAnimations(tab: AlfTabComponent): AlfAnimateCssInterface | undefined {
    const local = tab.configComputed()?.animations;
    const globalByParent = this.resolvedConfigComputed()?.behavior?.defaultAnimations;
    return local ?? globalByParent;
  }

  protected getPanelClasses(tab: AlfTabComponent): string {
    const index = tab.effectiveIndex();
    const isExiting = this.exitingTabsSet().has(index);
    const isActive = this.contentIndex() === index;
    
    if (!isActive && !isExiting) return '';

    const anim = this.getTabAnimations(tab);
    let stage = isExiting ? anim?.exitStage : anim?.enterStage;
    if (!stage) return '';

    const isSlide = stage.toLowerCase().includes('slide');
    const isFadeDirectional = stage.toLowerCase().includes('fade') && (stage.includes('Up') || stage.includes('Down') || stage.includes('Left') || stage.includes('Right'));

    if (isSlide || isFadeDirectional) {
      const direction = this.navigationDirection();
      const isVertical = stage.includes('Up') || stage.includes('Down');

      if (isVertical) {
        if (isExiting) {
          stage = direction === 'forward' ? 'animate__fadeOutUp' : 'animate__fadeOutDown';
        } else {
          stage = direction === 'forward' ? 'animate__fadeInUp' : 'animate__fadeInDown';
        }
      } else {
        if (isExiting) {
          stage = direction === 'forward' ? 'animate__slideOutLeft' : 'animate__slideOutRight';
        } else {
          stage = direction === 'forward' ? 'animate__slideInRight' : 'animate__slideInLeft';
        }
      }
    }

    return `animate__animated ${stage}`;
  }

  protected getPanelStyles(tab: AlfTabComponent): Record<string, string> {
    const anim = this.getTabAnimations(tab);
    const styles: Record<string, string> = {};
    if (anim?.duration) styles['--animate-duration'] = anim.duration;
    if (anim?.delay) styles['--animate-delay'] = anim.delay;
    return styles;
  }

  ngAfterViewInit(): void {
    const scrollEl = this.headerScroll()?.nativeElement;
    if (scrollEl) {
      this.resizeObserver = new ResizeObserver(() => this.checkScrollArrows());
      this.resizeObserver.observe(scrollEl);
      this.checkScrollArrows();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private checkScrollArrows(): void {
    const el = this.headerScroll()?.nativeElement;
    if (el) this.showScrollArrowsComputed.set(el.scrollWidth > el.clientWidth);
  }

  scrollLeft(): void { this.headerScroll()?.nativeElement.scrollBy({ left: -150, behavior: 'smooth' }); }
  scrollRight(): void { this.headerScroll()?.nativeElement.scrollBy({ left: 150, behavior: 'smooth' }); }

  public onTouchStart(event: TouchEvent): void { 
    this.touchStartX = event.touches[0].clientX; 
  }

  public onTouchEnd(event: TouchEvent): void {
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(deltaX) > this.swipeThreshold) {
      if (deltaX > 0) {
        this.navigateBack();
      } else {
        this.navigateForward();
      }
    }
  }

  private navigateForward(): void {
    const max = this.tabs().length;
    const circular = this.resolvedConfigComputed()?.behavior?.circularNavigation;
    let target = this.activeIndex() < max - 1 ? this.activeIndex() + 1 : (circular ? 0 : this.activeIndex());
    this.selectTabByIndex(target);
  }

  private navigateBack(): void {
    const max = this.tabs().length;
    const circular = this.resolvedConfigComputed()?.behavior?.circularNavigation;
    let target = this.activeIndex() > 0 ? this.activeIndex() - 1 : (circular ? max - 1 : this.activeIndex());
    this.selectTabByIndex(target);
  }

  @HostListener('keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight': event.preventDefault(); this.navigateForward(); break;
      case 'ArrowLeft': event.preventDefault(); this.navigateBack(); break;
      case 'Home': event.preventDefault(); this.selectTabByIndex(0); break;
      case 'End': event.preventDefault(); this.selectTabByIndex(Math.max(0, this.tabs().length - 1)); break;
    }
  }

  private initAutoIndexingEffect(): void {
    effect(() => {
      this.tabs().forEach((tab, index) => tab.setAutoIndex(index));
    });
  }

  private initAccessibilityEffect(): void {
    effect(() => {
      const currentTab = this.tabs()[this.activeIndex()];
      if (!currentTab) return;
      const label = currentTab.configComputed()?.label || `Pestaña ${this.activeIndex() + 1}`;
      untracked(() => {
        this.liveMessageComputed.set(`Pestaña ${label} seleccionada`);
        this.tabChange.emit(this.activeIndex());
      });
    });
  }

  private initIndicatorEffect(): void {
    effect(() => {
      const index = this.activeIndex();
      const allTabs = this.tabs();
      const currentTab = allTabs[index];

      if (!currentTab || this.configComputed()?.visualType !== 'master') {
        untracked(() => this.indicatorStyle.set({ transform: 'translateX(0)', width: '0', opacity: 0 }));
        return;
      }

      const el = currentTab.hostElement.nativeElement as HTMLElement;
      untracked(() => {
        const width = el.offsetWidth;
        const left = el.offsetLeft;
        this.indicatorStyle.set({
          transform: `translateX(${left}px)`,
          width: `${width}px`,
          opacity: 1
        });
      });
    }, { allowSignalWrites: true });
  }

  protected readonly indicatorColorComputed = computed(() => {
    const config = this.resolvedConfigComputed();
    return config?.brandColor || AlfColorEnum.Primary;
  });
}
