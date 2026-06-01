import { Component, input, computed } from '@angular/core';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum, AlfCursorEnum } from '@alfcomponents/enums';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfCardConfigInterface } from './interfaces/alf-card.interface';
import { getAlfDefaultConfig } from '@alfcomponents/shared/functions/generateStyles';
import { ALF_CARD_DEFAULT } from './predefined/alf-card.predefined';

@Component({
  selector: 'alf-card',
  standalone: true,
  imports: [],
  templateUrl: './alf-card.html',
  styleUrl: './alf-card.scss',
})
export class AlfCardComponent extends AlfBaseConfiguration<AlfCardConfigInterface> {

  // ==========================================
  // 1. Attributes (Properties, Injections)
  // ==========================================
  protected override readonly visualPrefix: string = visualprefixEnum.Card;
  protected override readonly componentType = AlfComponentTypeEnum.Card;
  private readonly internalId = generateUniqueId({ prefix: visualprefixEnum.CardInternalId });
  public override readonly colorVariant = input<AlfColorVariantEnum>();

  // ==========================================
  // 3. Signals (Inputs, Models, State)
  // ==========================================
  public override readonly inputConfig = input<AlfCardConfigInterface>(undefined, { alias: 'config' });

  // ==========================================
  // 4. Computed
  // ==========================================
  protected readonly predefinedConfigComputed = computed(() => {
    const rawV = this.colorVariant() ?? this.inputConfig()?.colorVariant;
    return getAlfDefaultConfig(rawV, this.componentType, ALF_CARD_DEFAULT, this.inputConfig() ?? {});
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
