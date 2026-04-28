import { Component, contentChildren, effect, input, signal, computed, viewChild, ElementRef, viewChildren, untracked, afterNextRender, forwardRef, inject, booleanAttribute } from '@angular/core';
import { AlfTabComponent } from './components/alf-tab/alf-tab';
import { AlfButtons } from '../../simple/alf-buttons/alf-buttons';
import { visualprefixEnum } from '@alfcomponents/shared';
import {
  AlfButtonVisualTypeEnum,
  AlfColorVariantEnum,
  AlfColorEnum,
  AlfDisplayEnum,
  AlfFlexDirectionEnum,
  AlfAlignItemsEnum,
  AlfJustifyContentEnum,
  AlfPxEnum,
  AlfFontWeightEnum,
  AlfRadiusEnum
} from '@alfcomponents/enums';
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
   * Señal para elegir un estilo predefinido (Primary, Secondary, OutlinePrimary, etc.)
   */
  public readonly variant = input<string | AlfColorVariantEnum>(undefined, { alias: 'variant' });

  /**
   * Configuración predefinida basada en la variante elegida.
   */
  protected readonly predefinedConfig = computed(() => {
    const variant = this.variant();
    return variant ? getAlfTabDefaultConfig(variant) : ALF_TABS_CONTAINER_DEFAULT;
  });

  /**
   * Configuración directa del usuario.
   */
  public override readonly inputConfig = input<AlfTabsContainerConfigInterface>(ALF_TABS_CONTAINER_DEFAULT, { alias: 'config' });

  /**
   * Configuración FINAL (Prioridad absoluta a la variante si existe).
   */
  protected readonly finalConfig = computed(() => {
    const variant = this.variant();
    const input = this.inputConfig();

    // Si el usuario elige una variante, esa manda sobre todo lo demás
    if (variant) {
      return this.predefinedConfig();
    }

    // Si no hay variante, usamos la configuración manual o el default
    return input ?? ALF_TABS_CONTAINER_DEFAULT;
  });

  // --- SOBREESCRITURA DE COMPUTEDS DE LA CLASE BASE ---
  // Sobrescribimos el resolvedConfig de la clase base para que todo el motor (colores, fondos, bordes, etc.)
  // lea directamente de nuestra configuración final (que combina la variante elegida con la manual).
  protected override readonly resolvedConfig = this.finalConfig;

  /**
   * Estilos custom adicionales (Sincroniza el color del slider con el borde o variante)
   */
  protected override readonly customStyleComputed = computed(() => {
    // 1. Prioridad absoluta: Si hay un color de borde explícito y NO es transparente
    const explicitBorder = this.borderComputed()?.default?.borderColor;
    if (explicitBorder && explicitBorder !== AlfColorEnum.Transparent) {
      return `--alf-tabs-slider-color: ${explicitBorder};`;
    }

    // 2. Si el borde es transparente (ej. diseño Solid/Text sin bordes), usamos el color de la variante
    const variant = this.colorVariantComputed();
    let color: AlfColorEnum = AlfColorEnum.Secondary;
    switch (variant) {
      case AlfColorVariantEnum.Primary: color = AlfColorEnum.Primary; break;
      case AlfColorVariantEnum.Success: color = AlfColorEnum.Success; break;
      case AlfColorVariantEnum.Danger: color = AlfColorEnum.Danger; break;
      case AlfColorVariantEnum.Warning: color = AlfColorEnum.Warning; break;
      case AlfColorVariantEnum.Info: color = AlfColorEnum.Info; break;
      case AlfColorVariantEnum.Light: color = AlfColorEnum.Gray300; break;
      case AlfColorVariantEnum.Dark: color = AlfColorEnum.Gray900; break;
    }

    return `--alf-tabs-slider-color: ${color};`;
  });

  /**
   * Indica si se debe activar el comportamiento de altura fluida con transiciones.
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
    const fromInput = this.fluidHeightInput();
    const config = this.finalConfig();
    const fromConfig = config?.fluidHeight || (config as any)?.fluid;

    if (fromInput || fromConfig) return true;

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
   * Es vital que sea estable y NO dependa de activeIndex para evitar re-renders innecesarios.
   */
  protected readonly navigationTabs = computed(() => {
    const containerConfig = this.finalConfig();
    const containerVisualType = this.visualTypeComputed() ?? containerConfig.visualType;
    const containerColorVariant = this.colorVariantComputed() ?? containerConfig.colorVariant;

    return this.tabs().map((tabInstance) => {
      const tab = tabInstance as any;
      const tabLabel = tab.finalLabel();
      const tabInputConfig = tab.inputConfig() ?? {};

      // Resolvemos el tipo visual prioritariamente (Ghost para que tenga hover suave, en vez de Text)
      const visualType = tab.visualType() ?? tabInputConfig.visualType ?? AlfButtonVisualTypeEnum.Ghost;

      // Color muy clarito para el hover de las pestañas
      const resolvedVariant = tab.colorVariant() ?? tabInputConfig.colorVariant ?? containerColorVariant ?? AlfColorVariantEnum.Secondary;
      let hoverBg = AlfColorEnum.Gray050;
      switch (resolvedVariant) {
        case AlfColorVariantEnum.Primary: hoverBg = AlfColorEnum.Blue050; break;
        case AlfColorVariantEnum.Secondary: hoverBg = AlfColorEnum.Gray050; break;
        case AlfColorVariantEnum.Success: hoverBg = AlfColorEnum.Green050; break;
        case AlfColorVariantEnum.Danger: hoverBg = AlfColorEnum.Red050; break;
        case AlfColorVariantEnum.Warning: hoverBg = AlfColorEnum.Yellow050; break;
        case AlfColorVariantEnum.Info: hoverBg = AlfColorEnum.Cyan050; break;
        case AlfColorVariantEnum.Light: hoverBg = AlfColorEnum.Gray050; break;
        case AlfColorVariantEnum.Dark: hoverBg = AlfColorEnum.Gray100; break;
      }

      const configuration: AlfButtonInterface = {
        ...tabInputConfig,
        label: tabLabel,
        iconLeft: tab.iconLeft() ?? tabInputConfig.iconLeft,
        iconRight: tab.iconRight() ?? tabInputConfig.iconRight,
        visualType,
        colorVariant: resolvedVariant,
        // Forzamos el background para que el hover sea extremadamente clarito (050) y no el 200 de Ghost
        backgrounds: {
          default: { backgroundColor: AlfColorEnum.Transparent },
          hover: { backgroundColor: hoverBg },
          active: { backgroundColor: hoverBg }
        },
        typography: {
          default: {
            ...tabInputConfig.typography?.default,
            fontWeight: tabInputConfig.typography?.default?.fontWeight ?? AlfFontWeightEnum.SemiBold
          },
          hover: tabInputConfig.typography?.hover,
          active: tabInputConfig.typography?.active,
          focus: tabInputConfig.typography?.focus,
          disabled: tabInputConfig.typography?.disabled
        },
        border: {
          default: {
            ...tabInputConfig.border?.default,
            borderRadius: tabInputConfig.border?.default?.borderRadius ?? AlfRadiusEnum.None
          },
          hover: {
            ...tabInputConfig.border?.hover,
            borderRadius: tabInputConfig.border?.hover?.borderRadius ?? AlfRadiusEnum.None
          },
          active: {
            ...tabInputConfig.border?.active,
            borderRadius: tabInputConfig.border?.active?.borderRadius ?? AlfRadiusEnum.None
          }
        },
        displayAndLayout: {
          default: {
            display: AlfDisplayEnum.Flex,
            flexDirection: AlfFlexDirectionEnum.Row,
            alignItems: AlfAlignItemsEnum.Center,
            justifyContent: AlfJustifyContentEnum.Center,
            gap: AlfPxEnum.Px8
          }
        }
      };

      return {
        label: tabLabel,
        configuration
      };
    });
  });

  /**
   * Efecto para sincronizar la pestaña activa con los componentes hijos.
   */
  protected readonly syncActiveTab = effect(() => {
    const active = this.activeIndex();
    const currentTabs = this.tabs();
    const contentAnim = this.finalConfig()?.contentAnimations;

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
    const anim = this.finalConfig()?.contentAnimations;
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
    const anim = this.finalConfig()?.contentAnimations?.enterStage ?? '';
    if (!anim) return '';

    // Forzamos el recalculo al cambiar de pestaña
    this.activeIndex();
    return anim;
  });
}
