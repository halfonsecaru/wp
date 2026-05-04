import { Component, computed, input, model, output, signal } from '@angular/core';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfRadioButtonInterface } from './interfaces/alf-radio-button.interface';
import { AlfRadioButtonVariantEnum, AlfColorVariantEnum, AlfSizeEnum } from '@alfcomponents/enums';
import { ALF_RADIO_BUTTON_DEFAULT, getAlfRadioButtonDefaultConfig } from './predefined/alf-radio-button.predefined';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';

@Component({
  selector: 'alf-radio-button',
  standalone: true,
  imports: [AlfTooltipTextDirective, AlfRippleDirective],
  templateUrl: './alf-radio-button.html',
  styleUrl: './alf-radio-button.scss',
})
export class AlfRadioButton extends AlfBaseConfiguration<AlfRadioButtonInterface> {
  // **** General Configuration **** //
  protected override readonly visualPrefix = visualprefixEnum.RadioButton;
  protected readonly internalId = generateUniqueId({ prefix: 'alf-rb' });

  // **** Inputs & Models **** //
  /** Choosing a predefined style (Primary, Secondary, OutlinePrimary, etc.) */
  public readonly variant = input<string | AlfColorVariantEnum>(undefined, { alias: 'variant' });

  /** Direct user configuration. */
  public override readonly inputConfig = input<AlfRadioButtonInterface>(ALF_RADIO_BUTTON_DEFAULT, { alias: 'config' });

  /** Two-way binding for the checked state */
  public readonly checked = model<boolean>(false);

  /** Associated value */
  public readonly value = input<any>(undefined);
  /** Native name attribute for grouping */
  public readonly name = input<string>(undefined);

  /** Visual style (Elegant, Standard) */
  public readonly radioButtonStyle = input<AlfRadioButtonVariantEnum>();
  /** Label text */
  public readonly label = input<string>();
  /** Radio size */
  public readonly size = input<AlfSizeEnum>();

  // **** State Signals **** //
  public readonly focused = signal<boolean>(false);
  public readonly hovered = signal<boolean>(false);

  // **** Computed Properties **** //
  /** 
   * Configuración predefinida basada en la variante elegida.
   */
  protected readonly predefinedConfig = computed(() => {
    const v = this.variant();
    if (!v) return ALF_RADIO_BUTTON_DEFAULT;

    let variantEnum = AlfColorVariantEnum.Transparent;
    if (typeof v === 'string') {
      const normalized = v.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      const key = normalized.charAt(0).toUpperCase() + normalized.slice(1);
      variantEnum = (AlfColorVariantEnum as any)[key] ?? AlfColorVariantEnum.Secondary;
    } else {
      variantEnum = v;
    }

    return getAlfRadioButtonDefaultConfig(variantEnum);
  });

  /** 
   * Single Source of Truth for configuration.
   * Merges: Individual Inputs > inputConfig Object > Predefined Variant > Default Global Config
   */
  public override readonly resolvedConfig = computed(() => {
    const variantConfig = this.predefinedConfig();
    const config = this.inputConfig();
    
    // 2. Merge all sources following priority
    const merged: AlfRadioButtonInterface = {
      ...variantConfig,
      ...config,
      // Direct inputs override everything else
      radioButtonStyle: this.radioButtonStyle() ?? config?.radioButtonStyle ?? variantConfig.radioButtonStyle,
      label: this.label() ?? config?.label ?? variantConfig.label,
      size: this.size() ?? config?.size ?? variantConfig.size,
      value: this.value() ?? config?.value ?? variantConfig.value,
      name: this.name() ?? config?.name ?? variantConfig.name,
      disabled: this.disabled() ?? config?.disabled ?? variantConfig.disabled,
    };

    return merged;
  });

  /** Resolves if it's disabled (Bridge with base class) */
  public readonly isDisabled = computed(() => 
    this.disabledComputed() || (this.resolvedConfig()?.disabled ?? false)
  );

  // **** Outputs **** //
  /** Emits when the radio button is selected. Emits its value. */
  public readonly change = output<any>();

  // **** Handlers **** //
  /** Handles the change event from the native input */
  public readonly onInputChange = (event: Event): void => {
    if (this.isDisabled()) return;
    
    // In a radio button, change only fires when it becomes checked
    this.checked.set(true);
    this.change.emit(this.value() ?? this.resolvedConfig()?.value);
  };

  /** Selects the radio button programmatically */
  public readonly select = (): void => {
    if (this.isDisabled() || this.checked()) return;
    
    this.checked.set(true);
    this.change.emit(this.value() ?? this.resolvedConfig()?.value);
  };

  /** Accessibility keyboard handler */
  public readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.isDisabled()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.select();
    }
  };
}
