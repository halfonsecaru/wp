import { Component, HostListener, computed, input, model, output } from '@angular/core';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfCheckboxInterface } from './interfaces/alf-checkbox.interface';
import { AlfCheckboxVariantEnum, AlfColorVariantEnum, AlfIconsUnicodeIconEnum, AlfSizeEnum } from '@alfcomponents/enums';
import { ALF_CHECKBOX_DEFAULT, getAlfCheckboxDefaultConfig } from './predefined/alf-checkbox.predefined';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';

@Component({
  selector: 'alf-checkbox',
  standalone: true,
  imports: [AlfTooltipTextDirective, AlfRippleDirective],
  templateUrl: './alf-checkbox.html',
  styleUrl: './alf-checkbox.scss',
})
export class AlfCheckbox extends AlfBaseConfiguration<AlfCheckboxInterface> {
  // **** General Configuration **** //
  protected override readonly visualPrefix = visualprefixEnum.Checkbox;
  protected readonly internalId = generateUniqueId({ prefix: 'alf-cb' });

  // **** Inputs & Models **** //
  /** Choosing a predefined style (Primary, Secondary, OutlinePrimary, etc.) */
  public readonly variant = input<string | AlfColorVariantEnum>(undefined, { alias: 'variant' });

  /** Direct user configuration. */
  public override readonly inputConfig = input<AlfCheckboxInterface>(ALF_CHECKBOX_DEFAULT, { alias: 'config' });

  /** Two-way binding for the checked state */
  public readonly checked = model<boolean>(false);
  /** Two-way binding for the indeterminate state */
  public readonly indeterminate = model<boolean>(false);

  /** Visual style (Elegant, Standard, Moving) */
  public readonly checkboxStyle = input<AlfCheckboxVariantEnum>();
  /** Label text */
  public readonly label = input<string>();
  /** Checkbox size */
  public readonly size = input<AlfSizeEnum>();

  // **** Computed Properties **** //
  /**
   * Configuración predefinida basada en la variante elegida.
   */
  protected readonly predefinedConfig = computed(() => {
    const v = this.variant();
    if (!v) return ALF_CHECKBOX_DEFAULT;

    let variantEnum = AlfColorVariantEnum.Transparent;
    if (typeof v === 'string') {
      const normalized = v.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      const key = normalized.charAt(0).toUpperCase() + normalized.slice(1);
      variantEnum = (AlfColorVariantEnum as any)[key] ?? AlfColorVariantEnum.Secondary;
    } else {
      variantEnum = v;
    }

    return getAlfCheckboxDefaultConfig(variantEnum);
  });

  protected readonly finalConfig = computed(() => {
    const variantConfig = this.predefinedConfig();
    const input = this.inputConfig();
    
    // Si no hay input manual o el input es el default sin cambios (shallow check)
    if (!input || input === ALF_CHECKBOX_DEFAULT) return variantConfig;

    // Mezcla simple de primer nivel
    return {
      ...variantConfig,
      ...input
    };
  });

  // Override the resolvedConfig of the base class to use our finalConfig.
  public override readonly resolvedConfig = this.finalConfig;

  /** Resolves the visual style */
  public readonly checkboxStyleComputed = computed(() => 
    this.checkboxStyle() ?? this.resolvedConfig()?.checkboxStyle ?? AlfCheckboxVariantEnum.Elegant
  );

  /** Resolves the label text */
  public readonly labelComputed = computed(() => 
    this.label() ?? this.resolvedConfig()?.label ?? ''
  );

  /** Resolves the label position */
  public readonly labelPositionComputed = computed(() => 
    this.resolvedConfig()?.labelPosition ?? 'after'
  );

  /** Resolves the size */
  public readonly sizeComputed = computed(() => 
    this.size() ?? this.resolvedConfig()?.size ?? AlfSizeEnum.MD
  );

  /** Resolves if it's disabled */
  public readonly isDisabled = computed(() => 
    this.disabledComputed()
  );

  /** Icon to display inside the box */
  public readonly displayIcon = computed(() => {
    if (this.indeterminate()) return '−';
    return this.resolvedConfig()?.iconSelected || AlfIconsUnicodeIconEnum.CheckMark;
  });

  // **** Outputs **** //
  /** Emits when the checked state changes */
  public readonly onCheckedChange = output<boolean>();

  // **** Handlers **** //
  @HostListener('click', ['$event'])
  public onHostClick = (event: Event): void => {
    if (this.isDisabled()) return;
    event.preventDefault();
    this.toggle();
  };

  /** Toggles the checked state */
  public readonly toggle = (): void => {
    if (this.isDisabled()) return;
    
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.indeterminate.set(false);
    this.onCheckedChange.emit(newValue);
  };

  /** Accessibility keyboard handler */
  public readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.isDisabled()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  };
}
