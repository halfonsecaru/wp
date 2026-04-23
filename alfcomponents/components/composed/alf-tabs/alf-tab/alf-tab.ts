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
import { AlfBaseComponent } from '@alfcomponents/base';
import { AlfTabInterface } from '../interfaces/alf-tabs.interface';
import { AlfRippleDirective } from '@alfcomponents/directives';
import { AlfAriaRoleEnum, AlfButtonVisualTypeEnum, AlfIconsUnicodeIconEnum, AlfThemeEnum, AlfColorVariantEnum, AlfColorEnum, AlfShadowEnum, AlfBorderStyleEnum, AlfPxEnum, AlfRadiusEnum } from '@alfcomponents/enums';
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

  /** IDs para accesibilidad (vinculados al sistema del padre) */
  public readonly tabId = computed(() => this.parent.getTabId(this.effectiveIndex()));
  public readonly panelId = computed(() => this.parent.getPanelId(this.effectiveIndex()));

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

  /** 
   * Miembro abstracto obligatorio de AlfBaseComponent.
   * Resolución de la Identidad Cromática Basal (Factory Pattern).
   */
  protected override readonly resolvedPredefined: Signal<AlfTabInterface | undefined> = computed(() => {
    const theme = this.globalTheme().theme;
    const parentConfig = this.parent.configComputed();

    // Herencia de variante: Prioridad local -> Variante del padre -> Primary (Fallback)
    const variant = this.variantInput()
      || (this.defineComponentInput() as any)?.variant
      || parentConfig?.tabsConfiguration?.tabConfiguration?.variant
      || this.parent.variantInput()
      || parentConfig?.predefined
      || AlfColorVariantEnum.Primary;

    // 1. Obtener ADN desde BASIC_IDENTITIES (Source of Truth)
    const adn = BASIC_IDENTITIES[theme][variant] || BASIC_IDENTITIES[theme][AlfColorVariantEnum.Primary];

    const isDark = theme === AlfThemeEnum.Dark;
    const defaultTextColor = isDark ? AlfColorEnum.Gray400 : AlfColorEnum.Gray600;

    const isSolid = parentConfig?.tabsConfiguration?.tabConfiguration?.visualType === AlfButtonVisualTypeEnum.Solid;

    // 2. Construir la base estética de "Pestaña Élite"
    const baseIdentiy: AlfTabInterface = {
      label: 'Tab',
      predefined: variant, // Vital para el color del slider
      border: {
        default: {
          borderRadius: AlfRadiusEnum.None,
          borderBottomWidth: isSolid ? AlfPxEnum.Px1 : AlfPxEnum.None,
          borderTopWidth: AlfPxEnum.None,
          borderLeftWidth: AlfPxEnum.None,
          borderRightWidth: AlfPxEnum.None,
          borderColor: isSolid ? `color-mix(in srgb, ${adn.brand} 20%, transparent)` as AlfColorEnum : AlfColorEnum.Transparent,
          borderStyle: isSolid ? AlfBorderStyleEnum.Solid : undefined
        }
      },
      backgrounds: {
        default: { backgroundColor: isSolid ? `color-mix(in srgb, ${adn.brand} 10%, transparent)` as AlfColorEnum : AlfColorEnum.Transparent }, 
        hover: { backgroundColor: `color-mix(in srgb, ${adn.brand} ${isSolid ? '20%' : '10%'}, transparent)` as AlfColorEnum }, // Hover: 20% si es solid
        active: { backgroundColor: `color-mix(in srgb, ${adn.brand} ${isSolid ? '30%' : '10%'}, transparent)` as AlfColorEnum } // Activo: 30% si es solid
      },
      typography: {
        default: { color: isSolid ? adn.contrast : defaultTextColor }, // Reactivo al tema global
        active: { color: isSolid ? adn.brand : undefined }, // En solid activo (30% bg), usamos el brand color para el texto
        hover: { color: isSolid ? adn.contrast : adn.brand } // Cambia al color de marca en hover
      },
      shadows: {
        default: { boxShadow: AlfShadowEnum.None },
        hover: { boxShadow: AlfShadowEnum.None },
        active: { boxShadow: AlfShadowEnum.None }
      },
      ripple: true,
      // Ripple más lento y elegante (color-mix con mucha transparencia)
      rippleColor: `color-mix(in srgb, ${adn.ripple} 20%, transparent)` as AlfColorEnum,
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
