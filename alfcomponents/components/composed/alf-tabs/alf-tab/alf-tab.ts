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
  ElementRef
} from '@angular/core';
import { AlfBaseComponent } from '@alfcomponents/base';
import { AlfTabInterface } from '../interfaces/alf-tabs.interface';
import { AlfTabsComponent } from '../alf-tabs';
import { AlfButton, AlfButtonInterface } from '@alfcomponents/components';
import { AlfAriaRoleEnum, AlfButtonVisualTypeEnum } from '@alfcomponents/enums';

/**
 * AlfTabComponent
 * Representa la pestaña individual (cabecera).
 * Ahora soporta también el contenido anidado (API estilo Material).
 */
@Component({
  selector: 'alf-tab',
  standalone: true,
  imports: [AlfButton],
  templateUrl: './alf-tab.html',
  styleUrl: './alf-tab.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.alf-tab--active]': 'isActive()',
    '[class.alf-tab--disabled]': 'resolvedConfigComputed()?.disabled'
  }
})
export class AlfTabComponent extends AlfBaseComponent<AlfTabInterface> {
  /** Referencia al coordinador padre */
  private readonly parent = inject(AlfTabsComponent);
  public readonly hostElement = inject(ElementRef);

  /** 
   * Índice de esta pestaña. 
   * Si no se provee, el padre lo asignará automáticamente (Auto-indexing).
   */
  readonly indexInput = input<number | undefined>(undefined, { alias: 'index' });
  
  /** Señal interna para el índice (manejada por el padre si es necesario) */
  protected readonly internalIndex = signal<number>(0);
  
  /** El índice efectivo prioriza el input manual */
  readonly effectiveIndex = computed(() => this.indexInput() ?? this.internalIndex());

  /** Captura el contenido anidado si el usuario lo pone dentro de la etiqueta alf-tab */
  readonly contentTemplate = viewChild<TemplateRef<any>>('contentTemplate');

  /** Miembro abstracto obligatorio de AlfBaseComponent */
  protected override readonly resolvedPredefined: Signal<AlfTabInterface | undefined> = signal(undefined).asReadonly();

  /** Determina si esta pestaña es la activa */
  readonly isActive = computed(() => this.parent.activeIndex() === this.effectiveIndex());

  /** Exponemos la configuración de forma pública para el coordinador padre */
  readonly configComputed = this.resolvedConfigComputed;

  /** 
   * Transforma la configuración de AlfTab en la configuración de AlfButton.
   */
  /** 
   * Transforma la configuración de AlfTab en la configuración de AlfButton.
   * En modo Master, forzamos un look "Ghost" explícito para evitar rastro de grises.
   */
  readonly buttonConfigComputed = computed<AlfButtonInterface>(() => {
    const config = this.resolvedConfigComputed() || { label: 'Tab' };
    const isMaster = this.parent.configComputed()?.visualType === 'master';

    // Si es Master, forzamos el modo Ghost y reseteamos variables críticas de fondo y radio
    if (isMaster) {
      return {
        ...config,
        visualType: AlfButtonVisualTypeEnum.Ghost,
        customStyle: {
          ...config.customStyle,
          '--alf-bg-color': 'transparent',
          '--alf-bg-color-hover': 'rgba(0, 0, 0, 0.04)',
          '--alf-brd-radius': '0',
          '--alf-shd-val': 'none',
          '--alf-shd-val-hover': 'none'
        },
        aria: {
          role: AlfAriaRoleEnum.Tab,
          ariaSelected: this.isActive()
        }
      };
    }

    // Configuración normal para el resto de variantes
    return {
      ...config,
      aria: {
        role: AlfAriaRoleEnum.Tab,
        ariaSelected: this.isActive()
      }
    };
  });

  /** Selecciona esta pestaña a través del coordinador padre */
  selectTab(): void {
    if (!this.resolvedConfigComputed()?.disabled) {
      this.parent.selectTabByIndex(this.effectiveIndex());
    }
  }

  /** Método público para que el padre asigne el índice automático */
  setAutoIndex(idx: number): void {
    if (this.indexInput() === undefined) {
      this.internalIndex.set(idx);
    }
  }

  /** Determina si el panel asociado debe estar visible hoy */
  readonly shouldPanelBeVisible = computed(() => this.isActive() || this.isExiting());

  constructor() {
    super();
    this.setupAnimationTrigger(this.isActive);
  }
}
