import { Component, input, computed } from '@angular/core';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum, AlfCursorEnum } from '@alfcomponents/enums';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfAutocompleteConfigInterface } from './interfaces/alf-autocomplete.interface';
import { getAlfDefaultConfig } from '@alfcomponents/shared/functions/generateStyles';
import { ALF_AUTOCOMPLETE_DEFAULT } from './predefined/alf-autocomplete.predefined';

@Component({
  selector: 'alf-autocomplete',
  standalone: true,
  imports: [],
  templateUrl: './alf-autocomplete.html',
  styleUrl: './alf-autocomplete.scss',
})
export class AlfAutocompleteComponent extends AlfBaseConfiguration<AlfAutocompleteConfigInterface> {

  // ==========================================
  // 1. Attributes (Properties, Injections)
  // ==========================================
  protected override readonly visualPrefix: string = visualprefixEnum.Autocomplete;
  protected override readonly componentType = AlfComponentTypeEnum.Autocomplete;
  private readonly internalId = generateUniqueId({ prefix: visualprefixEnum.AutocompleteInternalId });
  public override readonly colorVariant = input<AlfColorVariantEnum>();

  // ==========================================
  // 3. Signals (Inputs, Models, State)
  // ==========================================
  public override readonly inputConfig = input<AlfAutocompleteConfigInterface>(undefined, { alias: 'config' });

  // ==========================================
  // 4. Computed
  // ==========================================
  protected readonly predefinedConfigComputed = computed(() => {
    const rawV = this.colorVariant() ?? this.inputConfig()?.colorVariant;
    return getAlfDefaultConfig(rawV, this.componentType, ALF_AUTOCOMPLETE_DEFAULT, this.inputConfig() ?? {});
  });

  protected override readonly colorVariantComputed = computed(() => {
    return this.predefinedConfigComputed()?.colorVariant;
  });

  protected override readonly cursorComputed = computed(() => {
    return this.cursor() ?? this.resolvedConfig()?.cursor ?? AlfCursorEnum.Default;
  });

  public override readonly resolvedConfig = computed(() => {
    const predefined = this.predefinedConfigComputed();
    const manual = this.inputConfig();
    const variant = this.colorVariantComputed();
    return { ...predefined, ...manual, colorVariant: variant };
  });

  public readonly containerId = computed(() =>
    this.resolvedConfig()?.id ?? this.internalId
  );

  // ==========================================
  // 5. Lifecycle Hooks
  // ==========================================
  constructor() {
    super();
  }
}
