import { Component, contentChildren, effect, input, signal, computed, viewChild, ElementRef, viewChildren, untracked, afterNextRender, forwardRef, inject, booleanAttribute } from '@angular/core';
import { AlfTabComponent } from './components/alf-tab/alf-tab';
import { AlfButtons } from '../../simple/alf-buttons/alf-buttons';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfButtonVisualTypeEnum, AlfColorVariantEnum, AlfCursorEnum, AlfColorEnum } from '@alfcomponents/enums';
import { AlfBorderInterface } from '@alfcomponents/interfaces';
import { AlfBaseConfiguration } from '@alfcomponents/base';
import { AlfTabsContainerConfigInterface, ALF_TABS_CONTAINER_TOKEN } from './interfaces/alf-tabs.interface';
import { getAlfTabDefaultConfig, ALF_TABS_CONTAINER_DEFAULT } from './predefined/alf-tabs-container.predefined';
import { AlfButtonInterface } from '../../simple/alf-buttons/interfaces/alf-button.interface';

@Component({
  selector: 'alf-tabs-container',
  standalone: true,
  imports: [AlfButtons],
  templateUrl: './alf-tabs-container.html',
  styleUrl: './alf-tabs-container.scss',
  providers: [
    {
      provide: ALF_TABS_CONTAINER_TOKEN,
      useExisting: forwardRef(() => AlfTabsContainerComponent)
    }
  ]
})
export class AlfTabsContainerComponent extends AlfBaseConfiguration<AlfTabsContainerConfigInterface> {
  /**
   * Indica si se debe activar el comportamiento de altura fluida con transiciones.
   * Por defecto es false (height: auto).
   */
  public readonly fluidHeightInput = input(false, {
    alias: 'fluid',
    transform: booleanAttribute
  });

  /**
   * Busca otros contenedores de pestañas dentro de este para detectar si somos el último nivel.
   */
  protected readonly nestedContainers = contentChildren(forwardRef(() => AlfTabsContainerComponent), { descendants: true });

  /**
   * Propiedad computada que combina el input directo, la configuración y la auto-detección.
   */
  protected readonly isFluidHeight = computed(() => {
    // Si el usuario lo fuerza por input o config, tiene prioridad
    const fromInput = this.fluidHeightInput();
    const config = this.inputConfig();
    const fromConfig = config?.fluidHeight || (config as any)?.fluid;

    if (fromInput || fromConfig) return true;

    // Auto-detección: Si no hay contenedores anidados, somos el último nivel y activamos el modo fluido
    return this.nestedContainers().length === 0;
  });

  /**
   * Referencia a la pestaña padre si este contenedor está anidado.
   */
  private readonly parentTab = inject(AlfTabComponent, { optional: true });

  /**
   * Prefijo para las variables CSS.
   */
  protected readonly visualPrefix = visualprefixEnum.TabsContainer;

  /**
   * Configuración general del contenedor con valores por defecto.
   */
  public override readonly inputConfig = input<AlfTabsContainerConfigInterface>(ALF_TABS_CONTAINER_DEFAULT, { alias: 'config' });

  /**
   * Listado de pestañas proyectadas.
   */
  protected readonly tabs = contentChildren(AlfTabComponent, { descendants: false });

  /**
   * Referencia al contenedor de scroll de la cabecera.
   */
  protected readonly headerScrollRef = viewChild<ElementRef<HTMLDivElement>>('headerScroll');

  /**
   * Métricas de scroll para mostrar/ocultar flechas.
   */
  protected readonly headerMetrics = signal({ canLeft: false, canRight: false });

  /**
   * Índice de la pestaña activa.
   */
  public readonly activeIndex = signal<number>(0);

  /**
   * Referencias a los botones de navegación para cálculos del slider.
   */
  protected readonly buttonRefs = viewChildren(AlfButtons, { read: ElementRef });

  /**
   * Referencia al elemento del slider.
   */
  protected readonly sliderRef = viewChild<ElementRef<HTMLDivElement>>('slider');

  /**
   * Observer para actualizar métricas de scroll.
   */
  private resizeObserver?: ResizeObserver;

  /**
   * Indica si el contenedor está en medio de una transición de altura.
   */
  protected readonly isAnimating = signal<boolean>(false);

  /**
   * Altura actual del contenedor en píxeles.
   * Se inicia en 'auto' para el primer renderizado, pero luego siempre será un valor fijo.
   */
  public readonly containerHeight = signal<string>('auto');

  constructor() {
    super();

    // Efecto para inicializar el ResizeObserver cuando el scrollRef esté disponible
    effect((onCleanup) => {
      const scrollEl = this.headerScrollRef()?.nativeElement;
      if (!scrollEl) return;

      this.resizeObserver = new ResizeObserver(() => {
        this.updateScrollMetrics();
      });

      this.resizeObserver.observe(scrollEl);
      this.updateScrollMetrics();

      onCleanup(() => {
        this.resizeObserver?.disconnect();
      });
    });

    // Asegurar medición inicial estable
    afterNextRender(() => {
      const activeTab = this.tabs()[this.activeIndex()];
      if (activeTab) activeTab.reportHeight();
    });
  }

  /**
   * Maneja el reporte de altura de un tab hijo y ejecuta la transición.
   * @param height Altura en píxeles reportada por el hijo.
   */
  /**
   * Mide la altura natural del contenido proyectado.
   */
  public readonly measureContentHeight = (): void => {
    if (!this.isFluidHeight()) return;

    const container = this.contentContainer()?.nativeElement;
    if (!container) return;

    // Guardamos la altura actual para la animación
    const startHeight = container.offsetHeight;

    // Forzamos altura auto temporalmente para medir el "natural"
    container.style.height = 'auto';
    const endHeight = container.scrollHeight;

    // Restauramos la altura de inicio para que WAAPI pueda animar desde ahí
    container.style.height = `${startHeight}px`;

    console.log(`[Tabs] Medición: start=${startHeight}px, end=${endHeight}px`);
    this.onTabHeightMeasured(endHeight, startHeight);
  };

  /**
   * Referencia al elemento contenedor del contenido.
   */
  protected readonly contentContainer = viewChild<ElementRef<HTMLDivElement>>('contentContainer');

  /**
   * Referencia al elemento "fantasma" que empuja la altura.
   */
  protected readonly ghostRef = viewChild<ElementRef<HTMLDivElement>>('ghost');

  /**
   * Maneja el reporte de altura y ejecuta la transición usando el truco del "Fantasma".
   */
  public readonly onTabHeightMeasured = (height: number, startHeightOverride?: number): void => {
    if (!this.isFluidHeight()) {
      this.containerHeight.set('auto');
      return;
    }

    const ghost = this.ghostRef()?.nativeElement;

    // La altura que llega ya incluye los paddings internos calculados por el hijo
    const endHeight = height;

    if (!ghost) {
      this.containerHeight.set(`${endHeight}px`);
      return;
    }

    // El startHeight es la altura actual del fantasma (o la override)
    const startHeight = startHeightOverride ?? ghost.offsetHeight;

    if (startHeight === 0 || this.containerHeight() === 'auto' || Math.abs(startHeight - endHeight) < 1) {
      this.containerHeight.set(`${endHeight}px`);
      return;
    }

    this.isAnimating.set(true);

    // Animamos el FANTASMA. Como el padre es auto, seguirá al fantasma.
    const anim = ghost.animate([
      { height: `${startHeight}px` },
      { height: `${endHeight}px` }
    ], {
      duration: 450,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });

    anim.onfinish = () => {
      this.containerHeight.set(`${endHeight}px`);
      this.isAnimating.set(false);

      // PROPAGACIÓN: Si estamos anidados, avisamos al padre para que el abuelo se ajuste
      if (this.parentTab) {
        this.parentTab.reportHeight();
      }
    };
  };

  /**
   * Actualiza las métricas de scroll (canLeft, canRight).
   */
  protected updateScrollMetrics(): void {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    // Tolerancia de 1px para redondeos
    this.headerMetrics.set({
      canLeft: scrollLeft > 1,
      canRight: scrollLeft + clientWidth < scrollWidth - 1
    });

    // Aprovechamos para actualizar el slider si ha cambiado la visibilidad
    this.updateSlider(false);
  }

  /**
   * Desplaza el scroll hacia la izquierda.
   */
  public scrollLeft(): void {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: -200, behavior: 'smooth' });
  }

  /**
   * Desplaza el scroll hacia la derecha.
   */
  public scrollRight(): void {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: 200, behavior: 'smooth' });
  }

  /**
   * Manejador del evento de scroll.
   */
  protected onScroll(): void {
    this.updateScrollMetrics();
  }

  /**
   * Actualiza la posición y ancho del slider.
   */
  public updateSlider(animate: boolean = true): void {
    const active = this.activeIndex();
    const buttons = this.buttonRefs();
    const slider = this.sliderRef()?.nativeElement;

    if (!slider || buttons.length === 0) return;

    const targetButton = buttons[active]?.nativeElement;
    if (!targetButton) return;

    const width = targetButton.offsetWidth;
    const left = targetButton.offsetLeft;

    // Si no hay dimensiones (ej: está oculto), no hacemos nada
    if (width === 0) return;

    if (animate) {
      slider.animate([
        { width: slider.style.width || '0px', left: slider.style.left || '0px' },
        { width: `${width}px`, left: `${left}px` }
      ], {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });
    }

    slider.style.width = `${width}px`;
    slider.style.left = `${left}px`;
  }

  /**
   * Efecto para animar el slider cuando cambia la pestaña activa.
   */
  protected readonly animateSlider = effect(() => {
    // Suscribimos a cambios de pestaña o botones
    this.activeIndex();
    this.buttonRefs();

    untracked(() => {
      this.updateSlider();
    });
  });

  /**
   * Datos de navegación derivados de las pestañas proyectadas.
   */
  protected readonly navigationTabs = computed(() => {
    const active = this.activeIndex();
    return this.tabs().map((tab, index) => {
      const baseConfig = (tab.inputConfig()?.configuration ?? getAlfTabDefaultConfig(tab.tabName())) as AlfButtonInterface;
      const isActive = index === active;
      const activeColor = baseConfig.backgrounds?.active?.backgroundColor;

      return {
        label: tab.tabName(),
        configuration: {
          ...baseConfig,
          backgrounds: isActive ? {
            ...baseConfig.backgrounds,
            default: { ...baseConfig.backgrounds?.default, backgroundColor: activeColor },
            hover: { ...baseConfig.backgrounds?.hover, backgroundColor: activeColor },
            focus: { ...baseConfig.backgrounds?.focus, backgroundColor: activeColor },
            active: { ...baseConfig.backgrounds?.active, backgroundColor: activeColor },
          } : baseConfig.backgrounds
        }
      };
    });
  });

  /**
   * Efecto para sincronizar la pestaña activa con los componentes hijos.
   */
  protected readonly syncActiveTab = effect(() => {
    const currentTabs = this.tabs();
    const active = this.activeIndex();
    const contentAnim = this.inputConfig()?.contentAnimations;

    currentTabs.forEach((tab, index) => {
      const isActive = index === active;
      tab.setActive(isActive);

      if (contentAnim) {
        tab.parentContentAnimations.set(contentAnim);
      }
    });

    // Disparamos la auto-medición cuando cambia la pestaña
    untracked(() => {
      setTimeout(() => {
        this.measureContentHeight();
      }, 50);
    });
  });

  /**
   * Cambia la pestaña activa.
   * @param index Nuevo índice
   */
  public readonly setActiveTab = (index: number): void => {
    if (this.activeIndex() !== index) {
      this.activeIndex.set(index);
    }
  };

  /**
   * Estilos de animación para el contenido.
   */
  protected readonly contentAnimationsStyle = computed(() => {
    const anim = this.inputConfig()?.contentAnimations;
    if (!anim) return '';
    const declarations: string[] = [];
    if (anim.duration) declarations.push(`--animate-duration: ${anim.duration};`);
    if (anim.delay) declarations.push(`--animate-delay: ${anim.delay};`);
    return declarations.join(' ');
  });

  /**
   * Clases de animación para el contenido.
   */
  protected readonly contentAnimationsClass = computed(() => {
    const anim = this.inputConfig()?.contentAnimations?.enterStage ?? '';
    if (!anim) return '';

    // Forzamos el recalculo al cambiar de pestaña
    this.activeIndex();
    return anim;
  });
}
