import { Component, contentChildren, effect, input, signal, computed, viewChild, ElementRef, viewChildren, untracked, afterNextRender, forwardRef, inject, booleanAttribute, model, Injector } from '@angular/core';
import { AlfTabComponent } from './components/alf-tab/alf-tab';
import { AlfButton } from '../../simple/alf-button/alf-button';
import { visualprefixEnum } from '@alfcomponents/shared';
import {
  AlfColorVariantEnum,
  AlfColorEnum,
  AlfDisplayEnum,
  AlfFlexDirectionEnum,
  AlfAlignItemsEnum,
  AlfJustifyContentEnum,
  AlfPxEnum,
  AlfFontWeightEnum,
  AlfRadiusEnum,
  AlfFontSizeEnum
} from '@alfcomponents/enums';
import { AlfBaseConfiguration } from '@alfcomponents/base';
import { AlfTabsContainerConfigInterface, ALF_TABS_CONTAINER_TOKEN } from './interfaces/alf-tabs.interface';
import { getAlfTabDefaultConfig, ALF_TABS_CONTAINER_DEFAULT } from './predefined/alf-tabs-container.predefined';
import { AlfButtonInterface } from '../../simple/alf-button/interfaces/alf-button.interface';

@Component({
  selector: 'alf-tabs-container',
  standalone: true,
  imports: [AlfButton],
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
   * Choosing a predefined style (Primary, Secondary, etc.) - Supports base and local naming.
   */
  public readonly variant = input<AlfColorVariantEnum | undefined>(undefined);

  /**
   * Direct user configuration (Elite Standard).
   */
  public override readonly inputConfig = input<AlfTabsContainerConfigInterface>(ALF_TABS_CONTAINER_DEFAULT, { alias: 'config' });

  /**
   * Final configuration merge.
   * Resolves hierarchy: Inputs > InputConfig > Design System Defaults.
   */
  public readonly finalConfig = computed<AlfTabsContainerConfigInterface>(() => {
    const rawV = (this.colorVariant() ?? this.variant() ?? this.inputConfig()?.colorVariant) as string;
    
    // Manual mapping for core variants if string is provided
    let v: AlfColorVariantEnum | undefined;
    if (rawV) {
      const lowerV = rawV.toLowerCase();
      const coreVariants: Record<string, AlfColorVariantEnum> = {
        primary: AlfColorVariantEnum.Primary,
        secondary: AlfColorVariantEnum.Secondary,
        success: AlfColorVariantEnum.Success,
        danger: AlfColorVariantEnum.Danger,
        warning: AlfColorVariantEnum.Warning,
        info: AlfColorVariantEnum.Info,
        light: AlfColorVariantEnum.Light,
        dark: AlfColorVariantEnum.Dark,
        transparent: AlfColorVariantEnum.Transparent
      };
      
      v = coreVariants[lowerV] ?? (rawV as AlfColorVariantEnum);
    }

    const cfg = {
      ...getAlfTabDefaultConfig(v),
      ...this.inputConfig(),
    };

    return {
      ...cfg,
      fluidHeight: this.fluidHeightInput() ?? cfg?.fluidHeight,
      contentAnimations: cfg?.contentAnimations,
    };
  });

  /** Syncs with AlfBaseConfiguration resolvedConfig */
  public override readonly resolvedConfig = this.finalConfig;

  /**
   * Additional custom styles.
   */
  public readonly customStyleComputed = computed(() => {
    let styles = '';
    
    // 1. Slider color logic
    const explicitBorder = this.borderComputed()?.default?.borderColor;
    let sliderColor: string;

    if (explicitBorder && explicitBorder !== AlfColorEnum.Transparent) {
      sliderColor = explicitBorder;
    } else {
      const v = this.colorVariantComputed().toString().toLowerCase();
      const baseColor = v.replace(/outline|soft|crystal|3d/g, '');
      
      const colorMap: Record<string, AlfColorEnum> = {
        primary: AlfColorEnum.Primary,
        success: AlfColorEnum.Success,
        danger: AlfColorEnum.Danger,
        warning: AlfColorEnum.Warning,
        info: AlfColorEnum.Info,
        light: AlfColorEnum.Gray300,
        dark: AlfColorEnum.Gray900,
        secondary: AlfColorEnum.Secondary
      };

      sliderColor = colorMap[baseColor] ?? AlfColorEnum.Secondary;
    }
    styles += `--alf-tabs-slider-color: ${sliderColor};`;

    // 2. Crystal variant logic (Glassmorphism)
    if (this.colorVariantComputed().toString().toLowerCase().includes('crystal')) {
      styles += 'backdrop-filter: blur(12px) saturate(180%); background-color: rgba(255, 255, 255, 0.3) !important;';
    }

    return styles;
  });

  /**
   * Indica si se debe activar el comportamiento de altura fluida con transiciones.
   */
  public readonly fluidHeightInput = input(false, {
    alias: 'fluid',
    transform: booleanAttribute
  });

  /**
   * Busca si hay otros contenedores anidados para determinar el comportamiento de altura.
   */
  protected readonly nestedContainers = contentChildren(forwardRef(() => AlfTabsContainerComponent), { descendants: false });

  /**
   * Propiedad computada que combina el input directo, la configuración y la auto-detección.
   */
  public readonly isFluidHeight = computed(() => {
    const fromInput = this.fluidHeightInput();
    const config = this.finalConfig();
    const fromConfig = config?.fluidHeight;

    if (fromInput || fromConfig) return true;

    return this.nestedContainers().length === 0;
  });

  private readonly parentTab = inject(AlfTabComponent, { optional: true });
  protected override readonly visualPrefix: string = visualprefixEnum.TabsContainer;
  protected readonly tabs = contentChildren(forwardRef(() => AlfTabComponent), { descendants: false });
  protected readonly headerScrollRef = viewChild<ElementRef<HTMLDivElement>>('headerScroll');
  protected readonly headerMetrics = signal({ canLeft: false, canRight: false });
  /**
   * Índice de la pestaña activa (Zoneless model).
   */
  public readonly activeIndex = model<number>(0);
  protected readonly buttonRefs = viewChildren('tabButton', { read: ElementRef });
  protected readonly sliderRef = viewChild<ElementRef<HTMLDivElement>>('slider');
  private resizeObserver?: ResizeObserver;
  private readonly injector = inject(Injector);
  public readonly isAnimating = signal<boolean>(false);
  public readonly containerHeight = signal<string>('auto');

  constructor() {
    super();

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

    afterNextRender(() => {
      this.onTabHeightMeasured();
    });
  }

  private currentHeightAnimation: Animation | null = null;

  public readonly contentContainer = viewChild<ElementRef<HTMLDivElement>>('contentContainer');

  /**
   * Aplica la altura al contenedor de contenido mediante el token CSS --alf-tabs-content-height.
   * Este es el ÚNICO mecanismo de control de altura, eliminando conflictos Angular/WAAPI.
   */
  private readonly applyHeight = (container: HTMLElement, value: string): void => {
    container.style.setProperty('--alf-tabs-content-height', value);
  };

  /**
   * Mide la altura natural de la pestaña activa.
   * Dos técnicas combinadas para romper TODO el estiramiento del Grid:
   * 1. Oculta los tabs no-activos (rompe el stretch entre hermanos)
   * 2. Colapsa el token --alf-tabs-content-height a auto (rompe el stretch del contenedor padre)
   * Mide el scrollHeight del CONTENEDOR (no del inner), ya que este incluye
   * el padding acumulado de todos los niveles de anidación.
   * Todo síncrono en un frame, sin parpadeo.
   */
  private readonly measureNaturalHeight = (): number => {
    const activeIdx = this.activeIndex();
    const allTabs = this.tabs();
    const activeTab = allTabs[activeIdx];
    if (!activeTab) return 0;

    const container = this.contentContainer()?.nativeElement;
    if (!container) return 0;

    // 1. Guardar el token actual del contenedor y colapsarlo a auto
    const savedToken = container.style.getPropertyValue('--alf-tabs-content-height');
    container.style.setProperty('--alf-tabs-content-height', 'auto');

    // 2. Ocultar todos los tabs no-activos
    const savedDisplays: { el: HTMLElement; display: string }[] = [];
    for (let i = 0; i < allTabs.length; i++) {
      if (i !== activeIdx) {
        const el = allTabs[i].elementRef.nativeElement;
        savedDisplays.push({ el, display: el.style.display });
        el.style.display = 'none';
      }
    }

    // Forzar un reflow para que el browser recalcule TODO
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    container.offsetHeight;

    // Medir scrollHeight del CONTENEDOR: incluye contenido + padding de hijos
    const naturalHeight = container.scrollHeight;

    // 3. Restaurar el token del contenedor
    container.style.setProperty('--alf-tabs-content-height', savedToken || 'auto');

    // 4. Restaurar los displays de los tabs
    for (const saved of savedDisplays) {
      saved.el.style.display = saved.display;
    }

    return naturalHeight;
  };

  public readonly onTabHeightMeasured = (): void => {
    if (!this.isFluidHeight()) return;

    const container = this.contentContainer()?.nativeElement;
    if (!container) return;

    // Cancelar animación previa para evitar conflictos
    if (this.currentHeightAnimation) {
      this.currentHeightAnimation.cancel();
      this.currentHeightAnimation = null;
    }

    // Leer la altura actual ANTES de colapsar
    const startHeight = container.offsetHeight;

    // Medir la altura natural colapsando temporalmente
    const endHeight = this.measureNaturalHeight();

    console.log('[TABS DEBUG] startHeight:', startHeight, 'endHeight:', endHeight, 'diff:', Math.abs(startHeight - endHeight));

    if (endHeight === 0) return;

    if (startHeight === 0 || Math.abs(startHeight - endHeight) < 2) {
      this.applyHeight(container, `${endHeight}px`);
      return;
    }

    this.isAnimating.set(true);

    // Fijar la altura de inicio antes de animar
    this.applyHeight(container, `${startHeight}px`);

    const anim = container.animate([
      { height: `${startHeight}px` },
      { height: `${endHeight}px` }
    ], {
      duration: 350,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'none'
    });

    this.currentHeightAnimation = anim;

    anim.onfinish = () => {
      this.applyHeight(container, `${endHeight}px`);
      this.currentHeightAnimation = null;
      this.isAnimating.set(false);

      if (this.parentTab) {
        this.parentTab.reportHeight();
      }
    };
  };

  protected readonly updateScrollMetrics = (): void => {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    this.headerMetrics.set({
      canLeft: scrollLeft > 1,
      canRight: scrollLeft + clientWidth < scrollWidth - 1
    });

    this.updateSlider(false);
  };

  public readonly scrollLeft = (): void => {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: -200, behavior: 'smooth' });
  };

  public readonly scrollRight = (): void => {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: 200, behavior: 'smooth' });
  };

  protected readonly onScroll = (): void => {
    this.updateScrollMetrics();
  };

  public readonly updateSlider = (animate: boolean = true): void => {
    const active = this.activeIndex();
    const buttons = this.buttonRefs();
    const slider = this.sliderRef()?.nativeElement;

    if (!slider || buttons.length === 0) return;

    const targetButton = buttons[active]?.nativeElement;
    if (!targetButton) return;

    const width = targetButton.offsetWidth;
    const left = targetButton.offsetLeft;

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
  };

  protected readonly animateSlider = effect(() => {
    this.activeIndex();
    this.buttonRefs();

    untracked(() => {
      this.updateSlider();
    });
  });

  /**
   * Resolves the configuration for each tab button in the header.
   */
  public readonly navigationTabs = computed(() => {
    const containerVariant = this.colorVariantComputed();
    const currentTabs = this.tabs();
    const activeIdx = this.activeIndex();

    return currentTabs.map((tab, index) => {
      const isActive = index === activeIdx;
      const tabLabel = tab.finalLabel();
      const tabConfig = tab.inputConfig();

      // Resolve effective variant for this tab
      const v = tab.colorVariant() ?? tabConfig?.colorVariant ?? containerVariant ?? AlfColorVariantEnum.Secondary;
      const baseColor = v.toString().toLowerCase();

      // Para el texto activo, tratamos de sacar el color de la identidad:
      let textColor = isActive ? AlfColorEnum.Gray900 : AlfColorEnum.Gray500;
      if (isActive && baseColor.includes('primary')) textColor = AlfColorEnum.Primary;
      else if (isActive && baseColor.includes('secondary')) textColor = AlfColorEnum.Secondary;
      else if (isActive && baseColor.includes('success')) textColor = AlfColorEnum.Success;
      else if (isActive && baseColor.includes('danger')) textColor = AlfColorEnum.Danger;
      else if (isActive && baseColor.includes('warning')) textColor = AlfColorEnum.Warning;

      const buttonConfig: AlfButtonInterface = {
        ...tabConfig,
        label: tabLabel,
        iconLeft: tab.iconLeft() ?? tabConfig?.iconLeft,
        iconRight: tab.iconRight() ?? tabConfig?.iconRight,
        colorVariant: v,
        backgrounds: {
          default: { backgroundColor: AlfColorEnum.Transparent },
          hover: { backgroundColor: AlfColorEnum.Transparent },
          active: { backgroundColor: AlfColorEnum.Transparent },
          focus: { backgroundColor: AlfColorEnum.Transparent }
        },
        typography: {
          default: {
            ...tabConfig?.typography?.default,
            fontWeight: isActive ? AlfFontWeightEnum.Bold : AlfFontWeightEnum.SemiBold,
          }
        },
        textStyle: {
          default: { color: textColor },
          hover: { color: textColor },
          active: { color: textColor }
        },
        border: {
          default: {
            ...tabConfig?.border?.default,
            borderWidth: AlfPxEnum.None,
            borderRadius: AlfRadiusEnum.None
          }
        },
        padding: {
          default: {
            paddingTop: AlfPxEnum.Px12,
            paddingBottom: AlfPxEnum.Px12,
            paddingLeft: AlfPxEnum.Px16,
            paddingRight: AlfPxEnum.Px16
          },
          hover: {
            paddingTop: AlfPxEnum.Px12,
            paddingBottom: AlfPxEnum.Px12,
            paddingLeft: AlfPxEnum.Px16,
            paddingRight: AlfPxEnum.Px16
          },
          active: {
            paddingTop: AlfPxEnum.Px12,
            paddingBottom: AlfPxEnum.Px12,
            paddingLeft: AlfPxEnum.Px16,
            paddingRight: AlfPxEnum.Px16
          },
          focus: {
            paddingTop: AlfPxEnum.Px12,
            paddingBottom: AlfPxEnum.Px12,
            paddingLeft: AlfPxEnum.Px16,
            paddingRight: AlfPxEnum.Px16
          }
        },
        displayAndLayout: {
          default: {
            display: AlfDisplayEnum.Flex,
            flexDirection: AlfFlexDirectionEnum.Row,
            alignItems: AlfAlignItemsEnum.Center,
            justifyContent: AlfJustifyContentEnum.Center,
            gap: AlfPxEnum.Px8,
            width: AlfPxEnum.auto,
            height: '100%' as any
          }
        }
      };

      return {
        label: tabLabel,
        configuration: buttonConfig
      };
    });
  });

  public readonly arrowLeftConfig = computed<AlfButtonInterface>(() => ({
    label: '‹',
    colorVariant: AlfColorVariantEnum.Transparent,
    typography: { default: { fontSize: AlfFontSizeEnum.Xl3, fontWeight: AlfFontWeightEnum.Bold } },
    padding: { default: { paddingTop: AlfPxEnum.None, paddingBottom: AlfPxEnum.None, paddingLeft: AlfPxEnum.None, paddingRight: AlfPxEnum.None } },
    border: { default: { borderWidth: AlfPxEnum.None } },
    backgrounds: { default: { backgroundColor: AlfColorEnum.Transparent }, hover: { backgroundColor: AlfColorEnum.Transparent }, active: { backgroundColor: AlfColorEnum.Transparent } },
    displayAndLayout: { default: { width: '100%' as any, height: '100%' as any } }
  }));

  public readonly arrowRightConfig = computed<AlfButtonInterface>(() => ({
    label: '›',
    colorVariant: AlfColorVariantEnum.Transparent,
    typography: { default: { fontSize: AlfFontSizeEnum.Xl3, fontWeight: AlfFontWeightEnum.Bold } },
    padding: { default: { paddingTop: AlfPxEnum.None, paddingBottom: AlfPxEnum.None, paddingLeft: AlfPxEnum.None, paddingRight: AlfPxEnum.None } },
    border: { default: { borderWidth: AlfPxEnum.None } },
    backgrounds: { default: { backgroundColor: AlfColorEnum.Transparent }, hover: { backgroundColor: AlfColorEnum.Transparent }, active: { backgroundColor: AlfColorEnum.Transparent } },
    displayAndLayout: { default: { width: '100%' as any, height: '100%' as any } }
  }));

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

    // El contenedor padre mide la altura directamente tras el render,
    // sin depender del reporte del hijo (que puede ir a un contenedor anidado).
    untracked(() => {
      afterNextRender(this.onTabHeightMeasured, { injector: this.injector });
    });
  });

  public readonly setActiveTab = (index: number): void => {
    const oldIndex = this.activeIndex();
    if (oldIndex !== index) {
      const tabs = this.tabs();
      const oldTab = tabs[oldIndex];

      if (oldTab) {
        oldTab.playExitAnimation();
      }

      this.activeIndex.set(index);
    }
  };

  public readonly contentAnimationsStyle = computed(() => {
    const anim = this.finalConfig()?.contentAnimations;
    const baseStyles = 'position: relative; overflow: hidden;';
    
    if (!anim) return baseStyles;
    
    const declarations: string[] = [baseStyles];
    if (anim.duration) declarations.push(`--animate-duration: ${anim.duration};`);
    if (anim.delay) declarations.push(`--animate-delay: ${anim.delay};`);
    return declarations.join(' ');
  });

  public readonly contentAnimationsClass = computed(() => {
    const anim = this.finalConfig()?.contentAnimations?.enterStage ?? '';
    if (!anim) return '';

    this.activeIndex();
    return anim;
  });

  private _touchStartX = 0;
  private _touchStartY = 0;

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
}
