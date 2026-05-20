import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { ChangeDetectionStrategy, Component, computed, input, model, output, ViewEncapsulation } from '@angular/core';
import { AlfSwitchInterface } from './interfaces/alf-switch.interface';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum } from '@alfcomponents/enums/alf-color-variant.enum';
import { AlfSizeEnum } from '@alfcomponents/enums/alf-size.enum';
import { AlfLabelsPositionEnum } from '@alfcomponents/enums';
import { getAlfSwitchDefaultConfig } from './predefined/alf-switch.predefined';

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
  protected override readonly visualPrefix: string = visualprefixEnum.Switch;
  protected readonly internalId: string = generateUniqueId({ prefix: 'alf-sw' });

  // B) Inputs & Models
  public readonly variant = input<AlfColorVariantEnum | undefined>(undefined);
  public override readonly inputConfig = input<AlfSwitchInterface>(undefined, { alias: 'config' });
  
  public readonly size = input<AlfSizeEnum | undefined>(undefined);
  public readonly switchStyle = input<'standard' | 'elegant' | undefined>(undefined);
  public readonly labelText = input<string | undefined>(undefined);
  public readonly helperText = input<string | undefined>(undefined);
  public readonly error = input<string | undefined>(undefined);
  public readonly labelPosition = input<AlfLabelsPositionEnum | undefined>(undefined);

  /** Two-way binding for the checked state */
  public readonly checked = model<boolean>(false, { alias: 'checked' });

  // C) Events
  public readonly onCheckedChange = output<boolean>();

  // D) Centralized Config Resolution
  public readonly finalConfig = computed<AlfSwitchInterface>(() => {
    const rawV = (this.colorVariant() ?? this.variant() ?? this.inputConfig()?.colorVariant) as string;
    
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
      ...getAlfSwitchDefaultConfig(v),
      ...this.inputConfig(),
    };

    return {
      ...cfg,
      switchStyle: this.switchStyle() ?? cfg?.switchStyle,
      labelText: this.labelText() ?? cfg?.labelText,
      helperText: this.helperText() ?? cfg?.helperText,
      error: this.error() ?? cfg?.error,
      labelPosition: this.labelPosition() ?? cfg?.labelPosition,
      checked: this.checked(),
      disabled: this.disabled() ?? cfg?.disabled,
    };
  });

  /** Syncs with AlfBaseConfiguration resolvedConfig */
  public override readonly resolvedConfig = this.finalConfig;

  public readonly configComputed = this.finalConfig;

  // E) Métodos
  public readonly toggle = (): void => {
    if (this.disabledComputed()) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onCheckedChange.emit(newValue);
  };

  protected readonly onLabelClick = (event: Event): void => {
    if (this.disabledComputed()) return;
    event.preventDefault();
    this.toggle();
  };

  protected readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.disabledComputed()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  };
}
