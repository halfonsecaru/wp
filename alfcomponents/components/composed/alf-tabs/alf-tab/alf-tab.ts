import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
  Signal,
  signal,
  contentChild,
  TemplateRef,
  viewChild,
  ElementRef,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlfBaseComponent } from '@alfcomponents/base';
import { AlfTabInterface } from '../interfaces/alf-tabs.interface';
import { AlfRippleDirective } from '@alfcomponents/directives';
import { AlfAriaRoleEnum, AlfButtonVisualTypeEnum, AlfIconsUnicodeIconEnum, AlfThemeEnum, AlfColorVariantEnum, AlfColorEnum, AlfShadowEnum, AlfBorderStyleEnum, AlfPxEnum } from '@alfcomponents/enums';
import { AlfTabsVisualTypeEnum } from '../enums/alf-tabs-visual-type.enum';
import { ALF_TABS_TOKEN } from '../tokens';
import { BASIC_IDENTITIES } from '../../../../predefined/intefaces-basic/basic-colors';

/**
 * AlfTabComponent
 * Representa la pestaña individual (cabecera).
 * Ahora soporta también el contenido anidado (API estilo Material).
 */
@Component({
  selector: 'alf-tab',
  standalone: true,
  imports: [AlfRippleDirective],
  templateUrl: './alf-tab.html',
  styleUrl: './alf-tab.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.alf-tab--active]': 'isActive()',
    '[class.alf-tab--solid]': 'isSolidComputed()',
    '[class.alf-tab--disabled]': 'resolvedConfigComputed()?.disabled'
  }
})
export class AlfTabComponent extends AlfBaseComponent<AlfTabInterface> {
  /** Referencia al coordinador padre (Broken circle via Token) */
  private readonly parent = inject(ALF_TABS_TOKEN);
  public readonly hostElement = inject(ElementRef);

  /** IDs para accesibilidad (gestionados por el padre) */
  public readonly tabId = signal<string | null>(null);
  public readonly panelId = signal<string | null>(null);

  /** 
   * Índice de esta pestaña. 
   * Si no se provee, el padre lo asignará automáticamente (Auto-indexing).
   */
  public readonly indexInput = input<number | undefined>(undefined, { alias: 'index' });

  /** Señal interna para el índice (manejada por el padre si es necesario) */
  protected readonly internalIndex = signal<number>(0);

  /** El índice efectivo prioriza el input manual */
  public readonly effectiveIndex = computed(() => this.indexInput() ?? this.internalIndex());

  /** Captura el contenido anidado si el usuario lo pone dentro de la etiqueta alf-tab */
  public readonly contentTemplate = viewChild<TemplateRef<any>>('contentTemplate');
  public readonly header = viewChild<ElementRef<HTMLElement>>('header');

  /** 
   * Miembro abstracto obligatorio de AlfBaseComponent.
   * Resolución de la Identidad Cromática Basal (Factory Pattern).
   */
  protected override readonly resolvedPredefined: Signal<AlfTabInterface | undefined> = computed(() => {
    const theme = this.globalTheme().theme;
    const parentConfig = this.parent.configComputed();

    // 1. Detección de Variante (Herencia jerárquica: Local -> Parent Config Object -> Parent Input Legacy)
    const variant = this.variantInput()
      || this.defineComponentInput()?.predefined
      || parentConfig?.brandColor?.type
      || (parentConfig as any)?.variant
      || AlfColorVariantEnum.Primary;

    // 2. ADN de la variante para contrastes e iconos
    const adn = BASIC_IDENTITIES[theme][variant as AlfColorVariantEnum] || BASIC_IDENTITIES[theme][AlfColorVariantEnum.Primary];
    
    // 3. Color de marca (Nuevo Source of Truth: Prioridad al color explícito del padre)
    const baseBrand = parentConfig?.brandColor?.color || adn.brand || AlfColorEnum.Primary;

    const isDark = theme === AlfThemeEnum.Dark;
    const defaultTextColor = isDark ? AlfColorEnum.Gray400 : AlfColorEnum.Gray600;

    const isSolid = parentConfig?.tabsConfiguration?.tabConfiguration?.visualType === AlfButtonVisualTypeEnum.Solid;

    // 2. Construir la base estética de "Pestaña Élite"
    const baseIdentiy: AlfTabInterface = {
      label: 'Tab',
      predefined: variant, // Vital para el color del slider
      backgrounds: {
        default: { backgroundColor: isSolid ? `color-mix(in srgb, ${baseBrand} 10%, transparent)` as AlfColorEnum : AlfColorEnum.Transparent }, 
        hover: { backgroundColor: `color-mix(in srgb, ${baseBrand} ${isSolid ? '20%' : '10%'}, transparent)` as AlfColorEnum },
        active: { backgroundColor: `color-mix(in srgb, ${baseBrand} ${isSolid ? '30%' : '10%'}, transparent)` as AlfColorEnum }
      },
      typography: {
        default: { color: isSolid ? adn.contrast : defaultTextColor },
        active: { color: isSolid ? adn.contrast : baseBrand }, // El texto activo toma el color de marca
        hover: { color: isSolid ? adn.contrast : baseBrand } 
      },
      shadows: {
        default: { boxShadow: AlfShadowEnum.None },
        hover: { boxShadow: AlfShadowEnum.None },
        active: { boxShadow: AlfShadowEnum.None }
      },
      border: {
        default: {
          borderWidth: isSolid ? AlfPxEnum.Px1 : AlfPxEnum.None,
          borderColor: isSolid ? `color-mix(in srgb, ${baseBrand} 20%, transparent)` as AlfColorEnum : AlfColorEnum.Transparent,
          borderStyle: isSolid ? AlfBorderStyleEnum.Solid : undefined
        }
      },
      ripple: true,
      // Ripple más lento y elegante
      rippleColor: `color-mix(in srgb, ${baseBrand} 20%, transparent)` as AlfColorEnum,
      prefix: adn.icon
    };

    // 3. Cascada de Mezcla (ADN -> Config Global Padre -> Config Local)
    return {
      ...baseIdentiy,
      ...parentConfig?.tabsConfiguration?.tabConfiguration,
      ...this.defineComponentInput()?.tabConfiguration
    };
  });

  /** Determina si esta pestaña es la activa */
  public readonly isActive = computed(() => this.parent.activeIndex() === this.effectiveIndex());

  /** Exponemos la configuración de forma pública para el coordinador padre */
  public readonly configComputed = this.resolvedConfigComputed;

  /** Determina si es una variante sólida para aplicar lógica de mezcla de colores */
  public readonly isSolidComputed = computed(() => {
    const parentConfig = this.parent.configComputed();
    return parentConfig?.tabsConfiguration?.tabConfiguration?.visualType === AlfButtonVisualTypeEnum.Solid;
  });

  /** Determina el tipo visual heredado del padre para aplicar clases de identidad */
  public readonly visualTypeComputed = computed(() => this.parent.configComputed()?.visualType || AlfTabsVisualTypeEnum.Underline);

  /** 
   * Configuración completa del Ripple.
   * Empaqueta el estado y el color para el directivo alfRipple.
   */
  public readonly rippleConfig = computed(() => {
    const config = this.resolvedConfigComputed();
    const enabled = config?.ripple ?? true;

    if (!enabled) return false;

    return {
      enabled: true,
      color: config?.rippleColor,
      duration: 1500
    };
  });

  /** 
   * Configuración refinada para el Header nativo.
   */
  public readonly headerConfigComputed = computed(() => {
    const config = this.resolvedConfigComputed() || { label: 'Tab' };

    return {
      ...config,
      role: AlfAriaRoleEnum.Tab,
      ariaSelected: this.isActive()
    };
  });

  /** Selecciona esta pestaña a través del coordinador padre */
  public readonly selectTab = (): void => {
    if (!this.resolvedConfigComputed()?.disabled) {
      this.parent.selectTabByIndex(this.effectiveIndex());
    }
  };

  /** Método público para que el padre asigne el índice automático */
  public readonly setAutoIndex = (idx: number): void => {
    if (this.indexInput() === undefined) {
      this.internalIndex.set(idx);
    }
  };

  /** Determina si el panel asociado debe estar visible hoy */
  public readonly shouldPanelBeVisible = computed(() => this.isActive() || this.isExiting());

  constructor() {
    super();
    this.setupAnimationTrigger(this.isActive);
  }
}
