import { Component, contentChildren, effect, input, signal, computed, viewChild, ElementRef, viewChildren, untracked, afterNextRender, forwardRef, inject, booleanAttribute } from '@angular/core';
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
  AlfRadiusEnum
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
   * Señal para elegir un estilo predefinido (Primary, Secondary, OutlinePrimary, etc.)
   */
  public readonly variant = input<string | AlfColorVariantEnum>(undefined, { alias: 'variant' });

  /**
   * Configuración predefinida basada en la variante elegida.
   */
  protected readonly predefinedConfig = computed(() => {
    const v = this.variant();
    if (!v) return ALF_TABS_CONTAINER_DEFAULT;

    // Resolución segura del Enum si llega un string
    let variantEnum = AlfColorVariantEnum.Transparent;
    if (typeof v === 'string') {
      const normalized = v.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      const key = normalized.charAt(0).toUpperCase() + normalized.slice(1);
      variantEnum = (AlfColorVariantEnum as any)[key] ?? AlfColorVariantEnum.Secondary;
    } else {
      variantEnum = v;
    }

    return getAlfTabDefaultConfig(variantEnum);
  });

  /**
   * Configuración directa del usuario.
   */
  public override readonly inputConfig = input<AlfTabsContainerConfigInterface>(ALF_TABS_CONTAINER_DEFAULT, { alias: 'config' });

  /**
   * Configuración FINAL (Prioridad absoluta a la variante si existe).
   */
  public readonly finalConfig = computed(() => {
    const variant = this.variant();
    const input = this.inputConfig();

    if (variant) {
      return this.predefinedConfig();
    }

    return input ?? ALF_TABS_CONTAINER_DEFAULT;
  });

  public override readonly resolvedConfig = this.finalConfig;

  /**
   * Estilos custom adicionales
   */
  public readonly customStyleComputed = computed(() => {
    let styles = '';
    
    // 1. Lógica del color del slider
    const explicitBorder = this.borderComputed()?.default?.borderColor;
    let sliderColor: string;

    if (explicitBorder && explicitBorder !== AlfColorEnum.Transparent) {
      sliderColor = explicitBorder;
    } else {
      const variant = this.colorVariantComputed();
      switch (variant) {
        case AlfColorVariantEnum.Primary: sliderColor = AlfColorEnum.Primary; break;
        case AlfColorVariantEnum.Success: sliderColor = AlfColorEnum.Success; break;
        case AlfColorVariantEnum.Danger: sliderColor = AlfColorEnum.Danger; break;
        case AlfColorVariantEnum.Warning: sliderColor = AlfColorEnum.Warning; break;
        case AlfColorVariantEnum.Info: sliderColor = AlfColorEnum.Info; break;
        case AlfColorVariantEnum.Light: sliderColor = AlfColorEnum.Gray300; break;
        case AlfColorVariantEnum.Dark: sliderColor = AlfColorEnum.Gray900; break;
        default: sliderColor = AlfColorEnum.Secondary;
      }
    }
    styles += `--alf-tabs-slider-color: ${sliderColor};`;

    // 2. Lógica para variante Crystal (Glassmorphism)
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
   * Busca otros contenedores de pestañas dentro de este para detectar si somos el último nivel.
   */
  protected readonly nestedContainers = contentChildren(forwardRef(() => AlfTabsContainerComponent), { descendants: true });

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
  protected readonly visualPrefix = visualprefixEnum.TabsContainer;
  protected readonly tabs = contentChildren(AlfTabComponent, { descendants: false });
  protected readonly headerScrollRef = viewChild<ElementRef<HTMLDivElement>>('headerScroll');
  protected readonly headerMetrics = signal({ canLeft: false, canRight: false });
  public readonly activeIndex = signal<number>(0);
  protected readonly buttonRefs = viewChildren(AlfButton, { read: ElementRef });
  protected readonly sliderRef = viewChild<ElementRef<HTMLDivElement>>('slider');
  private resizeObserver?: ResizeObserver;
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
      const activeTab = this.tabs()[this.activeIndex()];
      if (activeTab) activeTab.reportHeight();
    });
  }

  public readonly contentContainer = viewChild<ElementRef<HTMLDivElement>>('contentContainer');
  public readonly ghostRef = viewChild<ElementRef<HTMLDivElement>>('ghost');

  public readonly onTabHeightMeasured = (height: number, startHeightOverride?: number): void => {
    if (!this.isFluidHeight()) {
      this.containerHeight.set('auto');
      return;
    }

    const ghost = this.ghostRef()?.nativeElement;
    const endHeight = height;

    if (!ghost) {
      this.containerHeight.set(`${endHeight}px`);
      return;
    }

    const startHeight = startHeightOverride ?? ghost.offsetHeight;

    if (startHeight === 0 || this.containerHeight() === 'auto' || Math.abs(startHeight - endHeight) < 1) {
      this.containerHeight.set(`${endHeight}px`);
      return;
    }

    this.isAnimating.set(true);

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

      if (this.parentTab) {
        this.parentTab.reportHeight();
      }
    };
  };

  protected updateScrollMetrics(): void {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    this.headerMetrics.set({
      canLeft: scrollLeft > 1,
      canRight: scrollLeft + clientWidth < scrollWidth - 1
    });

    this.updateSlider(false);
  }

  public scrollLeft(): void {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: -200, behavior: 'smooth' });
  }

  public scrollRight(): void {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: 200, behavior: 'smooth' });
  }

  protected onScroll(): void {
    this.updateScrollMetrics();
  }

  public updateSlider(animate: boolean = true): void {
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
  }

  protected readonly animateSlider = effect(() => {
    this.activeIndex();
    this.buttonRefs();

    untracked(() => {
      this.updateSlider();
    });
  });

  public readonly navigationTabs = computed(() => {
    const containerColorVariant = this.colorVariantComputed();

    return this.tabs().map((tabInstance) => {
      const tab = tabInstance as any;
      const tabLabel = tab.finalLabel();
      const tabInputConfig = tab.inputConfig() ?? {};

      const resolvedVariant = tab.colorVariant() ?? tabInputConfig.colorVariant ?? containerColorVariant ?? AlfColorVariantEnum.Secondary;
      
      const baseColor = resolvedVariant.toString().split('Outline')[0].split('Soft')[0].split('Crystal')[0].split('3D')[0].toLowerCase();
      
      const MAP: Record<string, AlfColorEnum> = {
        'primary': AlfColorEnum.Blue050,
        'secondary': AlfColorEnum.Gray050,
        'success': AlfColorEnum.Green050,
        'danger': AlfColorEnum.Red050,
        'warning': AlfColorEnum.Yellow050,
        'info': AlfColorEnum.Cyan050,
        'light': AlfColorEnum.Gray050,
        'dark': AlfColorEnum.Gray100
      };

      const hoverBg = MAP[baseColor] ?? AlfColorEnum.Gray050;

      const configuration: AlfButtonInterface = {
        ...tabInputConfig,
        label: tabLabel,
        iconLeft: tab.iconLeft() ?? tabInputConfig.iconLeft,
        iconRight: tab.iconRight() ?? tabInputConfig.iconRight,
        colorVariant: resolvedVariant,
        backgrounds: {
          default: { backgroundColor: AlfColorEnum.Transparent },
          hover: { backgroundColor: hoverBg },
          active: { backgroundColor: hoverBg }
        },
        typography: {
          default: {
            ...tabInputConfig.typography?.default,
            fontWeight: tabInputConfig.typography?.default?.fontWeight ?? AlfFontWeightEnum.SemiBold
          }
        },
        border: {
          default: {
            ...tabInputConfig.border?.default,
            borderRadius: tabInputConfig.border?.default?.borderRadius ?? AlfRadiusEnum.None
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
    if (!anim) return '';
    const declarations: string[] = [];
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
