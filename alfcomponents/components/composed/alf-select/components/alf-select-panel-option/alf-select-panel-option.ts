import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfColorVariantEnum } from '@alfcomponents/enums';
import { AlfSelectOption } from '@alfcomponents/components/composed/alf-autocomplete/interfaces/alf-auto-complete-options-interface';
import { AlfCheckbox } from '@alfcomponents/components/simple/alf-checkbox/alf-checkbox';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfComponentTypeEnum } from '@alfcomponents/components/base/enum/AlfComponentType.enum';

@Component({
  selector: 'alf-select-panel-option',
  standalone: true,
  imports: [...ALF_CORE_DIRECTIVES, AlfCheckbox],
  templateUrl: './alf-select-panel-option.html',
  styleUrls: ['./alf-select-panel-option.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfSelectPanelOptionComponent extends AlfBaseDirectives {
  // ── 1. Constants & View Queries ───────────────────────────────────────────
  protected readonly cssVarPrefix: string = visualprefixEnum.SelectPanelOption as string;
  protected readonly classPrefix: string = visualprefixEnum.SelectPanelOptionClass;

  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  protected readonly option = input.required<AlfSelectOption>();
  protected readonly multiple = input<boolean>(false);

  // ── 3. Outputs and state signals ─────────────────────────────────────────
  public readonly optionClicked = output<AlfSelectOption>();

  // ── 4. Internal State (Signals & Variables) ───────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: this.classPrefix });

  protected readonly isSelected = computed(() => this.option().selected);
  protected readonly isDisabled = computed(() => this.option().disabled);

  constructor() {
    super();
    this.initialization(this.cssVarPrefix, this.classPrefix, AlfComponentTypeEnum.SelectPanelOption);
  }

  // Sobrescribimos getEffectiveVariant para manejar ghost/crystal/transparent
  protected override getEffectiveVariant(): AlfColorVariantEnum | undefined {
    const originalVariant = this.variant();
    if (!originalVariant) return undefined;

    const vStr = originalVariant.toString();

    if (vStr.includes('ghost-') || vStr.includes('crystal-')) {
      const baseColor = vStr.split('-')[1];
      if (baseColor) {
        const softVariant = `soft-${baseColor}` as AlfColorVariantEnum;
        if (Object.values(AlfColorVariantEnum).includes(softVariant)) {
          return softVariant;
        }
      }
    }

    if (vStr === 'transparent') {
      return AlfColorVariantEnum.Standard;
    }

    return originalVariant;
  }

  protected handleClick(): void {
    if (!this.isDisabled()) {
      this.optionClicked.emit(this.option());
    }
  }
}
