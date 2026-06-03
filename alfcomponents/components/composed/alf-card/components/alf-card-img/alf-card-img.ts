import { Component, input, computed, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum, AlfCursorEnum } from '@alfcomponents/enums';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfCardImgConfigInterface } from './interfaces/alf-card-img.interface';

@Component({
  selector: 'alf-card-img',
  standalone: true,
  imports: [],
  templateUrl: './alf-card-img.html',
  styleUrl: './alf-card-img.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCardImgComponent extends AlfBaseConfiguration<AlfCardImgConfigInterface> {

  // ==========================================
  // 1. Attributes (Properties, Injections)
  // ==========================================
  protected override readonly visualPrefix: string = visualprefixEnum.CardImg;
  protected override readonly componentType = AlfComponentTypeEnum.Card;

  // ==========================================
  // 3. Signals (Inputs, Models, State)
  // ==========================================
  public override readonly colorVariant = input<AlfColorVariantEnum>();
  public override readonly inputConfig = input<AlfCardImgConfigInterface>(undefined, { alias: 'config' });

  /** Direct input shortcut for image src */
  public readonly src = input<string | undefined>();
  /** Direct input shortcut for image alt text */
  public readonly alt = input<string | undefined>();

  // ==========================================
  // 4. Computed
  // ==========================================
  protected override readonly colorVariantComputed = computed(() => {
    return this.colorVariant() ?? this.inputConfig()?.colorVariant;
  });

  protected override readonly cursorComputed = computed(() => {
    return this.cursor() ?? this.resolvedConfig()?.cursor ?? AlfCursorEnum.Default;
  });

  public override readonly resolvedConfig = computed(() => {
    const manual = this.inputConfig();
    return { ...manual };
  });

  public readonly resolvedSrc = computed(() => this.src() ?? this.inputConfig()?.src ?? '');
  public readonly resolvedAlt = computed(() => this.alt() ?? this.inputConfig()?.alt ?? '');

  // ==========================================
  // 5. Host Bindings
  // ==========================================
  @HostBinding('class')
  get hostClass(): string {
    return ('alf-card-img ' + this.customClassComputed()).trim();
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
