import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum } from '@alfcomponents/enums';
import { AlfCardConfigInterface } from './interfaces/alf-card.interface';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { deepMergeStates } from '@alfcomponents/components/base/default/functions';
import { AlfComponentTypeEnum } from '@alfcomponents/components/base/enum/AlfComponentType.enum';

@Component({
  selector: 'alf-card',
  standalone: true,
  imports: [
    ...ALF_CORE_DIRECTIVES,
  ],
  templateUrl: './alf-card.html',
  styleUrl: './alf-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCardComponent extends AlfBaseDirectives {

  // ── 1. Constants & View Queries ───────────────────────────────────────────
  protected readonly cssVarPrefix: string = visualprefixEnum.Card as string;
  protected readonly classPrefix: string = visualprefixEnum.CardPrefix as string;

  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  public readonly id = input<string>();
  public readonly inputConfig = input<AlfCardConfigInterface>(undefined, { alias: 'config' });
  public readonly helperText = input<string>();
  override readonly elevated = input<boolean>(true);

  // ── 3. Internal State (Signals & Variables) ─────────────────────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: this.classPrefix });
  
  // ── 4. Computed State (Derived from Inputs & State) ───────────────────────
  protected readonly idComputed = computed(() => this.id() ?? this.inputConfig()?.id ?? this.internalId);
  protected readonly helperTextComputed = computed(() => this.helperText() ?? this.inputConfig()?.helperText);


  protected readonly predefinedConfig = computed(() => {
    const currentVariant = this.variant() ?? AlfColorVariantEnum.SecondaryOutline;
    const vStr = currentVariant.toString();

    let comp;
    if (vStr.includes('soft-')) {
      comp = this.createSolidComponentSoftBackground(currentVariant);
    } else if (vStr.includes('depth-')) {
      comp = this.create3dComponentSolidText(currentVariant);
    } else {
      comp = this.createSolidComponent(currentVariant);
    }

    return {
      backgrounds: comp.background,
      border: comp.border,
      padding: comp.padding,
      textStyle: comp.textStyle,
      shadows: comp.shadows,
    };
  });

  // ── 5. Constructor ────────────────────────────────────────────────────────
  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.Card);
    this.initialization(visualprefixEnum.CardPrefix, visualprefixEnum.CardClass, AlfComponentTypeEnum.Card);
  }

  // ── 6. Control Value Accessor / Core Override ─────────────────────────────
  protected override getControlValue = (): any => {
    return undefined;
  };

  protected override getControlType(): string {
    return AlfComponentTypeEnum.Card;
  }

  protected override getControlConfig() {
    return deepMergeStates(this.predefinedConfig(), this.inputConfig());
  }
}
