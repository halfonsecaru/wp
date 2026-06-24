import { Component, computed, input, output, ChangeDetectionStrategy } from '@angular/core';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { createSolidComponentSoftBackground, create3dComponentSolidText, createSolidComponent, deepMergeStates } from '@alfcomponents/components/base/bases.directive';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum } from '@alfcomponents/enums';
import { AlfSelectOption } from '../interfaces/alf-auto-complete-options-interface';
import {
  AlfBackgroundsInterface,
  AlfBackgroundsBaseInterface,
  AlfBorderInterface,
  AlfBorderBaseInterface,
  AlfTextStyleInterface,
  AlfTextStyleStateBaseInterface,
  AlfTransitionInterface,
  AlfTransitionBaseInterface,
  AlfAnimateCssInterface,
  AlfOutlineInterface,
  AlfOutlineBaseInterface,
  AlfTypographyInterface,
  AlfTypographyBaseInterface
} from '@alfcomponents/interfaces';

@Component({
  selector: 'alf-auto-complete-panel',
  imports: [...ALF_CORE_DIRECTIVES],
  templateUrl: './alf-auto-complete-panel.html',
  styleUrl: './alf-auto-complete-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfAutoCompletefPanel {



  // ── 1. Constants & View Queries ───────────────────────────────────────────
  protected readonly cssVarPrefix: string = visualprefixEnum.Autocomplete as string;
  protected readonly classPrefix: string = visualprefixEnum.AutocompletePanelPrefix as string;


  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  protected readonly alfPrefix = input<string>(visualprefixEnum.Autocomplete as string);
  protected readonly variant = input<AlfColorVariantEnum>();
  protected readonly disabled = input<boolean>();
  protected readonly background = input<AlfBackgroundsInterface | AlfBackgroundsBaseInterface>();
  protected readonly alfBorder = input<AlfBorderInterface | AlfBorderBaseInterface>();
  protected readonly alfOutline = input<AlfOutlineInterface | AlfOutlineBaseInterface>();
  protected readonly alfTypography = input<AlfTypographyInterface | AlfTypographyBaseInterface>();
  protected readonly alfTextStyle = input<AlfTextStyleInterface | AlfTextStyleStateBaseInterface>();
  protected readonly alfTransition = input<AlfTransitionInterface | AlfTransitionBaseInterface>();
  protected readonly alfAnimations = input<AlfAnimateCssInterface>();
  protected readonly isExiting = input<boolean>(false);
  protected readonly isFocused = input<boolean>(false);
  protected readonly options = input<AlfSelectOption[]>();

  // ── 3. Outputs and state signals ────────────────────────────────────────────────────────
  public readonly optionSelected = output<AlfSelectOption>();

  // ── 4. Internal State (Signals & Variables) ─────────────────────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: this.classPrefix });

  protected getVariantColor = computed(() => {
    return this.variant() ?? AlfColorVariantEnum.SecondaryOutline;
  });

  protected readonly backgroundComputed = computed(() => {
    return deepMergeStates(this.predefinedConfig().backgrounds, this.background());
  });

  protected readonly animationsComputed = computed(() => {
    const anims = this.alfAnimations();
    return {
      ...anims,
      duration: anims?.duration ?? '350ms'
    };
  });

  protected readonly borderComputed = computed(() => {
    return deepMergeStates(this.predefinedConfig().border, this.alfBorder());
  });

  protected readonly outlineComputed = computed(() => {
    return deepMergeStates(this.predefinedConfig().outline, this.alfOutline());
  });

  protected readonly typographyComputed = computed(() => {
    return deepMergeStates(this.predefinedConfig().typography, this.alfTypography());
  });

  protected readonly textStyleComputed = computed(() => {
    return deepMergeStates(this.predefinedConfig().textStyle, this.alfTextStyle());
  });

  protected readonly transitionComputed = computed(() => {
    return deepMergeStates(this.predefinedConfig().transition, this.alfTransition());
  });


  protected readonly groupedOptions = computed(() => {
    const opts = this.options() || [];
    const groups: { name: string | null; options: AlfSelectOption[] }[] = [];

    opts.forEach(opt => {
      const groupName = opt.group || null;
      let existingGroup = groups.find(g => g.name === groupName);
      if (!existingGroup) {
        existingGroup = { name: groupName, options: [] };
        groups.push(existingGroup);
      }
      existingGroup.options.push(opt);
    });

    return groups;
  });

  protected selectOption(option: AlfSelectOption): void {
    this.optionSelected.emit(option);
  }

  protected readonly predefinedConfig = computed(() => {
    let currentVariant = this.getVariantColor() ?? AlfColorVariantEnum.SecondaryOutline;
    let vStr = currentVariant.toString();

    // Si la variante es Ghost o Crystal, obtenemos su equivalente Soft (ej. ghost-primary -> soft-primary)
    // para obtener el mismo tono suave y claro de color, pero de forma 100% sólida y opaca.
    if (vStr.includes('ghost-') || vStr.includes('crystal-') || vStr === 'transparent') {
      const baseColor = vStr.split('-')[1];
      if (baseColor) {
        const softVariantValue = `soft-${baseColor}`;
        const matchedSoft = Object.values(AlfColorVariantEnum).find(v => v === softVariantValue);
        if (matchedSoft) {
          currentVariant = matchedSoft;
          vStr = currentVariant.toString();
        }
      } else if (vStr === 'transparent') {
        currentVariant = AlfColorVariantEnum.Standard;
        vStr = currentVariant.toString();
      }
    }

    let comp;
    if (vStr.includes('soft-')) {
      comp = createSolidComponentSoftBackground(currentVariant);
    } else if (vStr.includes('depth-')) {
      comp = create3dComponentSolidText(currentVariant);
    } else {
      comp = createSolidComponent(currentVariant);
    }

    if (
      !vStr.includes('outline-') &&
      !vStr.includes('ghost-') &&
      !vStr.includes('soft-') &&
      !vStr.includes('crystal-') &&
      vStr !== 'transparent' &&
      vStr !== 'Default') {

      if (comp.textStyle) {
        // Heredar cada estado de color directamente de textStyle,
        // para que hover/active del panel sigan el mismo comportamiento que el input.
        comp.typography = {
          default:  { color: comp.textStyle.default?.color },
          hover:    { color: comp.textStyle.hover?.color   ?? comp.textStyle.default?.color },
          focus:    { color: comp.textStyle.focus?.color   ?? comp.textStyle.default?.color },
          active:   { color: comp.textStyle.active?.color  ?? comp.textStyle.default?.color },
          disabled: { color: comp.textStyle.disabled?.color ?? comp.textStyle.default?.color },
        };
      }

    }

    return {
      backgrounds: comp.background,
      border: comp.border,
      padding: comp.padding,
      textStyle: comp.textStyle,
      typography: comp.typography,
      shadows: comp.shadows,
      outline: comp.outline,
      transition: comp.transition
    };
  });


}
