import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfColorVariantEnum } from '@alfcomponents/enums';
import { AlfSelectOption } from '@alfcomponents/components/composed/alf-autocomplete/interfaces/alf-auto-complete-options-interface';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfComponentTypeEnum } from '@alfcomponents/components/base/enum/AlfComponentType.enum';
import { AlfSelectPanelOptionComponent } from '../alf-select-panel-option/alf-select-panel-option';

@Component({
  selector: 'alf-select-panel',
  standalone: true,
  imports: [...ALF_CORE_DIRECTIVES, AlfSelectPanelOptionComponent],
  templateUrl: './alf-select-panel.html',
  styleUrl: './alf-select-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfSelectPanelComponent extends AlfBaseDirectives {
  // ── 1. Constants & View Queries ───────────────────────────────────────────
  protected readonly cssVarPrefix: string = visualprefixEnum.Select as string;
  protected readonly classPrefix: string = 'alf-select-panel';

  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  protected readonly alfPrefix = input<string>(visualprefixEnum.Select as string);
  protected readonly options = input<AlfSelectOption[]>();
  protected readonly multiple = input<boolean>(false);
  protected readonly searchable = input<boolean>(false);
  public readonly searchTerm = model<string>('');

  // ── 3. Outputs and state signals ─────────────────────────────────────────
  public readonly optionSelected = output<AlfSelectOption>();
  public readonly onMouseEnter = output<void>();
  public readonly onMouseLeave = output<void>();

  // ── 4. Internal State (Signals & Variables) ───────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: this.classPrefix });

  protected readonly groupedOptions = computed(() => {
    const opts = this.options() || [];
    const groups: { name: string | null; options: AlfSelectOption[] }[] = [];

    opts.forEach((opt) => {
      const groupName = opt.group || null;
      let existingGroup = groups.find((group) => group.name === groupName);

      if (!existingGroup) {
        existingGroup = { name: groupName, options: [] };
        groups.push(existingGroup);
      }

      existingGroup.options.push(opt);
    });

    return groups;
  });

  constructor() {
    super();
    this.initialization(this.cssVarPrefix, this.classPrefix, AlfComponentTypeEnum.SelectPanel);
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

  protected selectOption(option: AlfSelectOption): void {
    this.optionSelected.emit(option);
  }

  protected handleSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}