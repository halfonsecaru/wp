import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { ChangeDetectionStrategy, Component, computed, input, model, output, ViewEncapsulation } from '@angular/core';
import { AlfSwitchInterface } from './interfaces/alf-switch.interface';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum } from '@alfcomponents/enums/alf-color-variant.enum';

/**
 * AlfSwitch Component
 * ✅ Elite Design System Standard.
 * ✅ Reactive Signals (input, model, computed).
 * ✅ Centralized Visual Engine Integration.
 */
@Component({
  selector: 'alf-switch',
  standalone: true,
  imports: [],
  templateUrl: './alf-switch.html',
  styleUrl: './alf-switch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlfSwitch extends AlfBaseConfiguration<AlfSwitchInterface> {
  
  // A) Generales a todo el componente
  // 1) Prefijo estático para el CSS engine (igual en todas las instancias)
  protected override readonly visualPrefix: string = visualprefixEnum.Switch;

  // 2) ID único para accesibilidad HTML (único por instancia)
  protected readonly internalId: string = generateUniqueId({ prefix: 'alf-sw' });

  // 2) Definir si el switch tiene variant, esto es para definir el color del track
  public readonly variant = input<AlfColorVariantEnum | undefined>(undefined);


  //***************************************************************************** */
  // B) Atributos de la clase
  // 1) Input de configuración principal y su computed para cambios
  public override readonly inputConfig = input<AlfSwitchInterface>(undefined, { alias: 'config' });

  public readonly configComputed = computed(() => {
    return {
      ...this.inputConfig()
    }
  })

  // 2) Comportamiento del componente
  /** Two-way binding for the checked state */
  public readonly checked = model<boolean>(false, { alias: 'checked' });

  // 3) Eventos
  /** Emitted whenever the checked state changes */
  public readonly onCheckedChange = output<boolean>();


  // 4) Métodos internos de control del componente
  /**
   * Toggles the switch state.
   */
  public readonly toggle = (): void => {
    if (this.disabledComputed()) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onCheckedChange.emit(newValue);
  };

  /** Click handler for the label wrapper */
  protected readonly onLabelClick = (event: Event): void => {
    if (this.disabledComputed()) return;
    event.preventDefault();
    this.toggle();
  };

  /** Keyboard support (Space/Enter) */
  protected readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.disabledComputed()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  };

  




}
