import { Component, input, computed, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum, AlfCursorEnum } from '@alfcomponents/enums';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfCardTitleConfigInterface } from './interfaces/alf-card-title.interface';
import { getAlfDefaultConfig } from '@alfcomponents/shared/functions/generateStyles';
import { ALF_CARD_TITLE_DEFAULT } from '../../predefined/alf-card.predefined';

@Component({
  selector: 'alf-card-title',
  standalone: true,
  imports: [],
  templateUrl: './alf-card-title.html',
  styleUrl: './alf-card-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCardTitleComponent extends AlfBaseConfiguration<AlfCardTitleConfigInterface> {

  // ==========================================
  // 1. Attributes (Properties, Injections)
  // ==========================================
  protected override readonly visualPrefix: string = visualprefixEnum.CardTitle;
  protected override readonly componentType = AlfComponentTypeEnum.Card;

  // ==========================================
  // 3. Signals (Inputs, Models, State)
  // ==========================================
  public override readonly colorVariant = input<AlfColorVariantEnum>();
  public override readonly inputConfig = input<AlfCardTitleConfigInterface>(undefined, { alias: 'config' });

  // ==========================================
  // 4. Computed
  // ==========================================
  protected readonly predefinedConfigComputed = computed(() => {
    const rawV = this.colorVariant() ?? this.inputConfig()?.colorVariant;
    return getAlfDefaultConfig(rawV, this.componentType, ALF_CARD_TITLE_DEFAULT, this.inputConfig() ?? {});
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

  // ==========================================
  // 5. Host Bindings
  // ==========================================
  @HostBinding('class')
  get hostClass(): string {
    return ('alf-card-title ' + this.customClassComputed()).trim();
  }

  @HostBinding('style')
  get hostStyle(): string {
    return this.combinedStyles();
  }

  // ==========================================
  // 6. Lifecycle Hooks
  // ==========================================
  constructor() {
    super();
  }
}
