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
  output,
  ViewContainerRef,
  TemplateRef,
  Signal,
  InjectionToken
} from '@angular/core';
import { AlfBaseComponent } from '@alfcomponents/base';
import { AlfTabsInterface } from './interfaces/alf-tabs.interface';
import { AlfAnimateCssInterface } from '@alfcomponents/interfaces';
import { AlfTabsPositionEnum, AlfTabsVisualTypeEnum } from './enums/alf-tabs-visual-type.enum';
import { AlfIconsUnicodeIconEnum, AlfColorEnum, AlfColorVariantEnum, AlfThemeEnum, AlfButtonVisualTypeEnum } from '@alfcomponents/enums';
import { BASIC_IDENTITIES } from '../../../predefined/intefaces-basic/basic-colors';
import { getAlfPredefinedTabs } from './predefined/alf-tabs.predefined';
import { DefaultTabsKeys } from './enums/default-tabs-keys.enum';
import { AlfTabComponent } from './alf-tab/alf-tab';
import { AlfTabContentComponent } from './alf-tab-content/alf-tab-content';
import { AlfPortalDirective } from './directives/alf-portal';
import { ALF_TABS_TOKEN } from './tokens';
import { AlfButtonInterface } from '../../simple/alf-button/interfaces/alf-button.interface';

/**
 * AlfTabsComponent
 * Orquestador Élite del sistema de pestañas.
 */
@Component({
  selector: 'alf-tabs',
  standalone: true,
  imports: [AlfPortalDirective],
  templateUrl: './alf-tabs.html',
  styleUrl: './alf-tabs.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: ALF_TABS_TOKEN, useExisting: AlfTabsComponent }],
})
export class AlfTabsComponent extends AlfBaseComponent<AlfTabsInterface> implements AfterViewInit, OnDestroy {

  @Input('predefined') public set predefined(v: AlfTabsInterface | string | undefined) {
    this.predefinedInput.set(v || DefaultTabsKeys.Underline);
  }
  protected readonly predefinedInput = signal<AlfTabsInterface | string>(DefaultTabsKeys.Underline);

  /** 
   * Entrada global para la estética de las cabeceras (DRY).
   * Si se define aquí, todos los AlfTab hijos heredarán esta configuración.
   */
  @Input('tabsConfiguration') public set tabsConfiguration(v: AlfButtonInterface | undefined) {
    this.tabsConfigurationInput.set(v);
  }
  protected readonly tabsConfigurationInput = signal<AlfButtonInterface | undefined>(undefined);

  /** 
   * Source of Truth: Identidad Predefinida vinculada al ADN reactivo.
   */
  protected override readonly resolvedPredefined: Signal<AlfTabsInterface | undefined> = computed(() => {
    const p = this.predefinedInput();
    const config = typeof p === 'string' ? getAlfPredefinedTabs(p) : p;

    // Inyectamos la configuración de cabeceras en el objeto global del componente
    return {
      ...config,
      tabsConfiguration: this.tabsConfigurationInput() || config?.tabsConfiguration
    };
  });

  // --- Identidad y Configuración ---
  private readonly baseId = `alf-tabs-${Math.random().toString(36).substring(2, 9)}`;

  // --- Máquina de Estados ---
  public readonly activeIndex = model<number>(0);
  public readonly contentIndex = signal<number>(0);
  protected readonly targetIndexPending = signal<number | null>(null);
  protected readonly navigationDirection = signal<'forward' | 'backward'>('forward');
  protected readonly isTransitioning = signal(false);
  protected readonly exitingTabsSet = signal<Set<number>>(new Set());

  // --- Métricas de Alto Rendimiento (Ahorro de recursos) ---
  protected readonly headerMetrics = signal({ scrollWidth: 0, clientWidth: 0, scrollLeft: 0, canLeft: false, canRight: false });
  protected readonly activeTabMetrics = signal({ left: 0, width: 0, opacity: 0 });

  /** 
   * Flujo Reactivo Puro: El estilo del indicador es un `computed` 
   * basado en las métricas de la pestaña activa. Sin efectos colaterales.
   */
  protected readonly indicatorStyle = computed(() => {
    const m = this.activeTabMetrics();
    return {
      transform: `translateX(${m.left}px)`,
      width: `${m.width}px`,
      opacity: m.opacity,
      backgroundColor: this.indicatorColorVarComputed()
    };
  });

  // --- UI & Proyección ---
  public readonly position = input<AlfTabsPositionEnum>(AlfTabsPositionEnum.Top);
  public readonly configComputed = this.resolvedConfigComputed;
  public readonly tabChange = output<number>();

  protected readonly liveMessageComputed = signal<string>('');
  protected readonly icons = AlfIconsUnicodeIconEnum;
  protected readonly tabs = contentChildren(AlfTabComponent);
  protected readonly manualContents = contentChildren(AlfTabContentComponent);

  private readonly headerScroll = viewChild<ElementRef<HTMLDivElement>>('headerScroll');
  protected readonly contentContainer = viewChild<ElementRef<HTMLDivElement>>('contentContainer');
  protected readonly showScrollArrowsComputed = signal<boolean>(false);
  protected readonly canScrollLeft = signal(false);
  protected readonly canScrollRight = signal(false);

  public readonly isNestedModeComputed = computed(() => this.manualContents().length === 0 && this.tabs().length > 0);

  // --- Lógica Interna ---
  private touchStartX = 0;
  private readonly swipeThreshold = 50;
  private resizeObserver?: ResizeObserver;
  private rafId?: number;

  constructor() {
    super();
  }

  /** Lógica de Transiciones Natural y Cálculo Estructural */
  public readonly selectTabByIndex = (targetIndex: number): void => {
    const currentIndex = this.contentIndex();
    if (targetIndex === currentIndex || this.isTransitioning()) return;

    this.isTransitioning.set(true);
    const direction = targetIndex > currentIndex ? 'forward' : 'backward';
    this.navigationDirection.set(direction);

    this.activeIndex.set(targetIndex);
    this.targetIndexPending.set(targetIndex);

    const container = this.contentContainer()?.nativeElement;
    
    // 1. Extraemos la altura EXACTA del panel viejo (no del contenedor, para no sumar paddings 2 veces)
    const currentTab = this.tabs()[currentIndex];
    let oldHeight = 0;
    
    if (currentTab) {
      const oldPanelEl = document.getElementById(currentTab.panelId()!);
      if (oldPanelEl) {
        oldHeight = oldPanelEl.offsetHeight;
        this['_oldHeightMemory'] = oldHeight;
      }
    }

    const anim = this.getTabAnimations(currentTab);

    if (currentTab && anim?.exitStage) {
      this.exitingTabsSet.update(set => new Set(set).add(currentIndex));
    } else {
      this.completeTransition(targetIndex);
    }
  };

  protected readonly completeTransition = (targetIndex: number): void => {
    const container = this.contentContainer()?.nativeElement;
    const oldHeight = this['_oldHeightMemory'] || 0;

    // 2. Transición Lógica (Desmonta el texto viejo, monta el texto nuevo de golpe)
    this.contentIndex.set(targetIndex);
    this.targetIndexPending.set(null);
    this.isTransitioning.set(false);

    // 3. ¡Animamos al Hijo Directamente! (Tu intuición)
    if (container) {
      requestAnimationFrame(() => {
        const allTabs = this.tabs();
        const targetTab = allTabs[targetIndex];
        const targetPanelEl = targetTab ? document.getElementById(targetTab.panelId()!) : null;

        if (targetPanelEl) {
          // Extraemos la sangre pura: lo que de verdad mide el Panel Nuevo en sus entrañas
          const originalPanelHeight = targetPanelEl.style.height;
          targetPanelEl.style.height = 'max-content'; // Vital: evita que el Grid estire la medida
          const newHeight = targetPanelEl.offsetHeight;
          targetPanelEl.style.height = originalPanelHeight;

          if (Math.abs(newHeight - oldHeight) < 2) return;

          const compStyle = getComputedStyle(container);
          const rawDur = parseFloat(compStyle.transitionDuration) || 0;
          const cssDuration = rawDur > 0 ? (rawDur * 1000) : 300;

          // Bifurcación Inteligente (Basada en tu intuición):
          let animFrames: Keyframe[] = [];
          const originalOverflow = targetPanelEl.style.overflow;
          targetPanelEl.style.overflow = 'hidden'; // Clip estricto durante animación

          console.log("antiguo: ", oldHeight)
          console.log("Nuevo: ", newHeight)
          console.log("Diferencia: ", Math.abs(newHeight - oldHeight));
          console.log("-------------------------------------")
          if (oldHeight > newHeight) {
            // EMPEQUEÑECER: Forzamos la altura por abajo (minHeight) y dejamos que el suelo caiga.
            // Así el contenido nuevo se queda pegado arriba intacto mientras la caja reduce su vacío.
            animFrames = [
              { minHeight: `${oldHeight}px` },
              { minHeight: `${newHeight}px` }
            ];
          } else if (oldHeight < newHeight) {
            // AGRANDAR: Aplastamos la caja por arriba (maxHeight) y dejamos que el techo suba.
            // Así el contenido va revelándose progresivamente mientras crece.
            animFrames = [
              { maxHeight: `${oldHeight}px` },
              { maxHeight: `${newHeight}px` }
            ];
          }

          // Magia WAAPI Dinámica
          const resizeAnim = targetPanelEl.animate(animFrames, {
            duration: cssDuration,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
          });

          resizeAnim.onfinish = () => {
            targetPanelEl.style.overflow = originalOverflow;
          };
        }
      });
    }
  };

  public readonly onTabAnimationEnd = (tab: AlfTabComponent): void => {
    const index = tab.effectiveIndex();
    if (this.exitingTabsSet().has(index)) {
      this.exitingTabsSet.update(set => {
        const newSet = new Set(set);
        newSet.delete(index);
        return newSet;
      });

      const pending = this.targetIndexPending();
      if (pending !== null) {
        this.completeTransition(pending);
      }
    }
  };

  protected readonly getTabAnimations = (tab: AlfTabComponent): AlfAnimateCssInterface | undefined => {
    const local = tab.configComputed()?.animations;
    const globalByParent = this.resolvedConfigComputed()?.behavior?.defaultAnimations;
    return local ?? globalByParent;
  };

  /** Gestión de Recursos e Interacción con el DOM */
  public readonly ngAfterViewInit = (): void => {
    const scrollEl = this.headerScroll()?.nativeElement;
    if (scrollEl) {
      this.resizeObserver = new ResizeObserver(() => this.requestMetricsUpdate());
      this.resizeObserver.observe(scrollEl);
      this.requestMetricsUpdate();
    }
  };

  public readonly ngOnDestroy = (): void => {
    this.resizeObserver?.disconnect();
    if (this.rafId) cancelAnimationFrame(this.rafId);
  };

  /**
   * Actualización Gradual (Ahorro de CPU): 
   * Agrupamos lecturas del DOM en un único frame de animación.
   */
  protected readonly requestMetricsUpdate = (): void => {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.updateAllMetrics());
  };

  private readonly updateAllMetrics = (): void => {
    const el = this.headerScroll()?.nativeElement;
    if (!el) return;

    // 1. Métricas de Scroll
    const isOverflowing = el.scrollWidth > el.clientWidth;
    this.headerMetrics.set({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      scrollLeft: el.scrollLeft,
      canLeft: isOverflowing && el.scrollLeft > 2,
      canRight: isOverflowing && (el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
    });

    // 2. Métricas de la pestaña activa (para el indicador) con doble RAF 
    // para garantizar que los cambios de layout (font-weight) se han aplicado.
    requestAnimationFrame(() => this.measureActiveTabParams());
  };

  private readonly measureActiveTabParams = (): void => {
    const currentTab = this.tabs()[this.activeIndex()];
    const navEl = this.headerScroll()?.nativeElement.querySelector('.alf-tabs__nav') as HTMLElement;

    if (!currentTab || !navEl) {
      this.activeTabMetrics.set({ left: 0, width: 0, opacity: 0 });
      return;
    }

    const host = currentTab.hostElement.nativeElement as HTMLElement;
    const measurable = host.querySelector('.alf-tab__header') as HTMLElement || host;

    if (measurable && measurable.offsetWidth > 0) {
      const navRect = navEl.getBoundingClientRect();
      const tabRect = measurable.getBoundingClientRect();

      this.activeTabMetrics.set({
        left: tabRect.left - navRect.left,
        width: tabRect.width,
        opacity: 1
      });
    }
  };

  public readonly scrollLeft = (): void => { this.headerScroll()?.nativeElement.scrollBy({ left: -150, behavior: 'smooth' }); };
  public readonly scrollRight = (): void => { this.headerScroll()?.nativeElement.scrollBy({ left: 150, behavior: 'smooth' }); };

  /** Accesibilidad e IDs Dinámicos */
  public readonly getPanelId = (index: number): string => `${this.baseId}-panel-${index}`;
  public readonly getTabId = (index: number): string => `${this.baseId}-tab-${index}`;

  /** Touch & Teclado */
  public readonly onTouchStart = (event: TouchEvent): void => {
    this.touchStartX = event.touches[0].clientX;
  };

  public readonly onTouchEnd = (event: TouchEvent): void => {
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(deltaX) > this.swipeThreshold) {
      deltaX > 0 ? this.navigateBack() : this.navigateForward();
    }
  };

  private readonly navigateForward = (): void => {
    const max = this.tabs().length;
    const circular = this.resolvedConfigComputed()?.behavior?.circularNavigation;
    let target = this.activeIndex() < max - 1 ? this.activeIndex() + 1 : (circular ? 0 : this.activeIndex());
    this.selectTabByIndex(target);
  };

  private readonly navigateBack = (): void => {
    const max = this.tabs().length;
    const circular = this.resolvedConfigComputed()?.behavior?.circularNavigation;
    let target = this.activeIndex() > 0 ? this.activeIndex() - 1 : (circular ? max - 1 : this.activeIndex());
    this.selectTabByIndex(target);
  };

  @HostListener('keydown', ['$event'])
  protected readonly onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowRight': event.preventDefault(); this.navigateForward(); break;
      case 'ArrowLeft': event.preventDefault(); this.navigateBack(); break;
      case 'Home': event.preventDefault(); this.selectTabByIndex(0); break;
      case 'End': event.preventDefault(); this.selectTabByIndex(Math.max(0, this.tabs().length - 1)); break;
    }
  };

  /** Reactividad Pura y Coordinación */
  protected readonly initEffects = (() => {
    effect(() => {
      this.tabs().forEach((tab, index) => {
        tab.setAutoIndex(index);
        tab.panelId.set(this.getPanelId(index));
        tab.tabId.set(this.getTabId(index));
      });
    });

    effect(() => {
      const currentTab = this.tabs()[this.activeIndex()];
      if (!currentTab) return;
      const label = currentTab.configComputed()?.label || `Pestaña ${this.activeIndex() + 1}`;
      untracked(() => {
        this.liveMessageComputed.set(`Pestaña ${label} seleccionada`);
        this.tabChange.emit(this.activeIndex());
        this.requestMetricsUpdate();
      });
    });
  })();

  /** 
   * Color dinámico del indicador deslizante.
   * Se sincroniza con el color de marca de la pestaña activa interpretando su variante al 100%.
   */
  public readonly indicatorColorVarComputed = computed(() => {
    const activeIdx = this.activeIndex();
    const activeTab = this.tabs().find(t => t.effectiveIndex() === activeIdx);
    const theme = this.globalTheme().theme;

    // Interpretamos la variante de la pestaña activa (ej: Primary, Success...)
    const variant = activeTab?.configComputed()?.predefined
      || (this.defineComponentInput() as any)?.variant
      || AlfColorVariantEnum.Primary;

    // Obtenemos el ADN puro de la variante
    const adn = BASIC_IDENTITIES[theme][variant] || BASIC_IDENTITIES[theme][AlfColorVariantEnum.Primary];
    const baseBrand = adn.brand || AlfColorEnum.Primary;

    // Mismo color base, pero "más fuerte" (oscurecido un 20%)
    return `color-mix(in srgb, ${baseBrand} 80%, black 20%)`;
  });

  /** 
   * Color de fondo para el contenedor de contenido en modo Solid.
   * Coincide con el tono más claro (10%) de los botones.
   */
  public readonly solidContentBgVarComputed = computed(() => {
    if (!this.isSolidComputed()) return 'transparent';
    const theme = this.globalTheme().theme;

    // Prioridad a la variante del componente (usada en la galería)
    const variant = this.variantInput()
      || (this.defineComponentInput() as any)?.variant
      || AlfColorVariantEnum.Primary;

    const adn = BASIC_IDENTITIES[theme][variant] || BASIC_IDENTITIES[theme][AlfColorVariantEnum.Primary];
    return `color-mix(in srgb, ${adn.brand} 10%, transparent)`;
  });

  /** 
   * Color de borde dinámico o por defecto (Gray200).
   * Si hay una variante (Primary, Success), el borde toma ese color.
   */
  public readonly reactiveBorderColorVarComputed = computed(() => {
    const variantStr = this.variantInput() || (this.defineComponentInput() as any)?.variant;
    if (variantStr) {
      const theme = this.globalTheme().theme;
      const adn = BASIC_IDENTITIES[theme][variantStr as AlfColorVariantEnum];
      if (adn && adn.brand) return adn.brand;
    }
    return 'var(--alf-brd-color)';
  });

  /** Determina si el diseño global es de tipo Solid */
  public readonly isSolidComputed = computed(() => {
    return this.resolvedConfigComputed()?.tabsConfiguration?.tabConfiguration?.visualType === AlfButtonVisualTypeEnum.Solid;
  });

  /** Helpers de Template */
  public readonly getPanelClassesStr = (tab: AlfTabComponent): string => {
    const baseClass = 'alf-tabs__panel';
    const isActive = this.contentIndex() === tab.effectiveIndex();
    const isExiting = this.exitingTabsSet().has(tab.effectiveIndex());
    if (!isActive && !isExiting) return baseClass;

    const anim = this.getTabAnimations(tab);
    let stage = isExiting ? anim?.exitStage : anim?.enterStage;
    if (!stage) return baseClass;

    const direction = this.navigationDirection();
    const isSlide = stage.toLowerCase().includes('slide');

    if (isSlide) {
      if (isExiting) stage = direction === 'forward' ? 'animate__slideOutLeft' : 'animate__slideOutRight';
      else stage = direction === 'forward' ? 'animate__slideInRight' : 'animate__slideInLeft';
    }

    return `${baseClass} animate__animated ${stage}`;
  };

  public readonly getPanelStylesStr = (tab: AlfTabComponent): string => {
    const anim = this.getTabAnimations(tab);
    let str = (this.contentIndex() === tab.effectiveIndex() || this.exitingTabsSet().has(tab.effectiveIndex())) ? 'display:block;' : 'display:none;';
    if (anim?.duration) str += `--animate-duration:${anim.duration};`;
    if (anim?.delay) str += `--animate-delay:${anim.delay};`;
    return str;
  };

  public readonly attachPortal = (vContainerRef: ViewContainerRef, template: TemplateRef<any> | null): void => {
    if (!vContainerRef || !template) return;
    vContainerRef.clear();
    vContainerRef.createEmbeddedView(template);
  };
}
