import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  signal,
  output,
} from '@angular/core';
import { AlfColorVariantEnum, AlfCursorEnum, AlfSizeEnum, AlfInputAppearanceEnum, AlfAnimationTypeEnum, AlfColorEnum } from '@alfcomponents/enums';
import { AlfAutocompleteConfigInterface } from './interfaces/alf-autocomplete.interface';
import { AlfInput } from '../../simple/alf-input/alf-input';
import { AlfAnimateCssInterface, AlfBackgroundsBaseInterface, AlfBackgroundsInterface, AlfBackgroundsStyleInterface, AlfBorderBaseInterface, AlfBorderInterface, AlfDisplayAndLayoutBaseInterface, AlfDisplayAndLayoutInterface, AlfMarginBaseInterface, AlfMarginInterface, AlfOutlineBaseInterface, AlfOutlineInterface, AlfPaddingBaseInterface, AlfPaddingInterface, AlfRippleInterface, AlfShadowsBaseInterface, AlfShadowsInterface, AlfTextStyleInterface, AlfTextStyleStateBaseInterface, AlfTransformBaseInterface, AlfTransformInterface, AlfTransitionBaseInterface, AlfTransitionInterface, AlfTypographyBaseInterface, AlfTypographyInterface } from '@alfcomponents/interfaces';
import { AlfTooltipConfig } from '@alfcomponents/directives';
import { AlfValidationResult } from '@alfcomponents/shared';
import { deepMergeStates, expandToAllStates } from '@alfcomponents/components/base/bases.directive';
import { visualRippleColorBase } from '@alfcomponents/base';

import { AlfSelectOption } from './interfaces/alf-auto-complete-options-interface';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfAutoCompletefPanel } from './al-auto-completef-panel/alf-auto-complete-panel';

// ****************************************************
// ************ Interfaces ******************
// ****************************************************

// ****************************************************
// *** Predefined Functions (Switch Pattern) **********
// ****************************************************
@Component({
  selector: 'alf-autocomplete',
  standalone: true,
  imports: [AlfInput, AlfAutoCompletefPanel, ...ALF_CORE_DIRECTIVES],
  templateUrl: './alf-autocomplete.html',
  styleUrl: './alf-autocomplete.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class AlfAutocompleteComponent {
  // Estas son para el componente alf-autocomplete, no se heredan //
  public readonly isLoading = input<boolean>(false);
  // ------------------------------------------------------------ //


  protected readonly config = input<AlfAutocompleteConfigInterface>(undefined, { alias: 'config' });
  protected readonly tooltip = input<string | AlfTooltipConfig>();
  protected readonly ripple = input<boolean | AlfRippleInterface | undefined>(undefined);
  protected readonly cursor = input<AlfCursorEnum>(AlfCursorEnum.None);
  protected readonly size = input<AlfSizeEnum>(AlfSizeEnum.MD);
  protected readonly customClass = input<string | undefined>(undefined);
  protected readonly customStyle = input<string | undefined>(undefined);
  protected readonly elevated = input<boolean>(false);
  // ── 2. State Inputs ──────────────────────────────────────────────────────
  protected readonly variant = input<AlfColorVariantEnum>(undefined);
  protected readonly disabled = input<boolean>(false);
  // ── 3. Visual Style Inputs ───────────────────────────────────────────────
  public readonly background = input<AlfBackgroundsInterface | AlfBackgroundsBaseInterface | undefined>(undefined);
  public readonly border = input<AlfBorderInterface | AlfBorderBaseInterface | undefined>(undefined);
  public readonly outline = input<AlfOutlineInterface | AlfOutlineBaseInterface | undefined>(undefined);
  public readonly shadows = input<AlfShadowsInterface | AlfShadowsBaseInterface | undefined>(undefined);


  public readonly margin = input<AlfMarginInterface | AlfMarginBaseInterface | undefined>(undefined);
  public readonly padding = input<AlfPaddingInterface | AlfPaddingBaseInterface | undefined>(undefined);
  public readonly typography = input<AlfTypographyInterface | AlfTypographyBaseInterface | undefined>(undefined);
  public readonly textStyle = input<AlfTextStyleInterface | AlfTextStyleStateBaseInterface | undefined>(undefined);
  public readonly transform = input<AlfTransformInterface | AlfTransformBaseInterface | undefined>(undefined);
  public readonly transition = input<AlfTransitionInterface | AlfTransitionBaseInterface | undefined>(undefined);
  public readonly displayAndLayout = input<AlfDisplayAndLayoutInterface | AlfDisplayAndLayoutBaseInterface | undefined>(undefined);
  public readonly animations = input<AlfAnimateCssInterface | undefined>(undefined);

  // Only input
  public readonly isExiting = input<boolean>(false);
  public readonly required = input<boolean | undefined>(undefined);
  public readonly maxLength = input<number>();
  public readonly minLength = input<number>();
  public readonly min = input<number>();
  public readonly max = input<number>();
  public readonly pattern = input<string>();
  public readonly label = input<string>();
  public readonly placeholder = input<string>();
  public readonly helperText = input<string>();
  public readonly prefix = input<string>();
  public readonly suffix = input<string>();
  public readonly autocomplete = input<string>();
  public readonly clearable = input<boolean>();
  public readonly clearOnClick = input<boolean>();
  public readonly autofocus = input<boolean>();
  public readonly readonly = input<boolean>();
  public readonly appearance = input<AlfInputAppearanceEnum>();
  public readonly validators = input<((v: any) => AlfValidationResult)[]>([]);
  public readonly error = input<string | boolean | undefined>(undefined);
  public readonly options = input<AlfSelectOption[]>([]);

  protected readonly optionsComputed = computed(() => {
    return this.options()?.length ? this.options() : (this.config()?.options ?? []);
  })

  protected readonly shadowsComputed = computed(() => {
    return deepMergeStates(this.config()?.shadows, this.shadows());
  })

  protected readonly outlineComputed = computed(() => {
    return deepMergeStates(this.config()?.outline, this.outline());
  })

  protected readonly borderComputed = computed(() => {
    return deepMergeStates(this.config()?.border, expandToAllStates(this.border()));
  })

  protected readonly backgroundComputed = computed(() => {
    return deepMergeStates(this.config()?.backgrounds, expandToAllStates(this.background()));
  })

  protected readonly marginComputed = computed(() => {
    return deepMergeStates(this.config()?.margin, this.margin());
  })

  protected readonly paddingComputed = computed(() => {
    return deepMergeStates(this.config()?.padding, expandToAllStates(this.padding()));
  })

  protected readonly typographyComputed = computed(() => {
    return deepMergeStates(this.config()?.typography, this.typography());
  })

  protected readonly textStyleComputed = computed(() => {
    return deepMergeStates(this.config()?.textStyle, this.textStyle());
  })

  protected readonly transformComputed = computed(() => {
    return deepMergeStates(this.config()?.transform, this.transform());
  })

  protected readonly transitionComputed = computed(() => {
    return deepMergeStates(this.config()?.transition, this.transition());
  })

  protected readonly displayAndLayoutComputed = computed(() => {
    return deepMergeStates(this.config()?.displayAndLayout, this.displayAndLayout());
  })

  protected readonly animationsComputed = computed(() => {
    const defaults: AlfAnimateCssInterface = {
      enterStage: AlfAnimationTypeEnum.FadeIn,
      exitStage: AlfAnimationTypeEnum.FadeOut,
    };
    const c1 = this.config()?.animations || {};
    const c2 = this.animations() || {};
    const merged = { ...defaults, ...c1, ...c2 };
    return merged as AlfAnimateCssInterface;
  })

  protected readonly tooltipComputed = computed(() => {
    return (this.tooltip() ?? this.config()?.tooltip) as string | AlfTooltipConfig;
  })

  protected readonly cursorComputed = computed(() => {
    return (this.cursor() ?? this.config()?.cursor) as AlfCursorEnum;
  })

  protected readonly sizeComputed = computed(() => {
    return (this.size() ?? this.config()?.size) as AlfSizeEnum;
  })

  protected readonly customClassComputed = computed(() => {
    return (this.customClass() ?? this.config()?.customClass) as string | undefined;
  })

  protected readonly customStyleComputed = computed(() => {
    return (this.customStyle() ?? this.config()?.customStyle) as string | undefined;
  })

  protected readonly elevatedComputed = computed(() => {
    return (this.elevated() ?? this.config()?.elevated) as boolean;
  })

  protected readonly variantComputed = computed(() => {
    return (this.variant() ?? this.config()?.variant) as AlfColorVariantEnum;
  })

  protected readonly disabledComputed = computed(() => {
    return (this.disabled() ?? this.config()?.disabled) as boolean;
  })

  protected readonly rippleComputed = computed<boolean | AlfRippleInterface>(() => {
    const rip = this.ripple() ?? this.config()?.ripple;
    if (rip === false) return false;

    const variant = this.variantComputed() ?? AlfColorVariantEnum.SecondaryOutline;
    const color = visualRippleColorBase({
      type: variant,
    });

    const baseRippleConf: AlfRippleInterface = {
      color: color,
    };
    if (rip === undefined || rip === true) return baseRippleConf;
    return { ...baseRippleConf, ...rip };
  });

  protected readonly requiredComputed = computed(() => {
    return (this.required() ?? this.config()?.required);
  })

  protected readonly maxLengthComputed = computed(() => {
    return (this.maxLength() ?? this.config()?.maxLength);
  })

  protected readonly minLengthComputed = computed(() => {
    return (this.minLength() ?? this.config()?.minLength);
  })

  protected readonly minComputed = computed(() => {
    return (this.min() ?? this.config()?.min);
  })

  protected readonly maxComputed = computed(() => {
    return (this.max() ?? this.config()?.max);
  })

  protected readonly patternComputed = computed(() => {
    return (this.pattern() ?? this.config()?.pattern);
  })

  protected readonly validatorsComputed = computed(() => {
    return (this.validators() ?? this.config()?.validators);
  })

  protected readonly errorComputed = computed(() => {
    return (this.error() ?? this.config()?.error);
  })

  protected readonly labelComputed = computed(() => {
    return (this.label() ?? this.config()?.label);
  })

  protected readonly placeholderComputed = computed(() => {
    return (this.placeholder() ?? this.config()?.placeholder);
  })

  protected readonly helperTextComputed = computed(() => {
    return (this.helperText() ?? this.config()?.helperText);
  })

  protected readonly prefixComputed = computed(() => {
    const selectedIcon = this.selectedOption()?.icon;
    if (selectedIcon) {
      return selectedIcon;
    }
    return (this.prefix() ?? this.config()?.prefix);
  })

  protected readonly suffixComputed = computed(() => {
    return (this.suffix() ?? this.config()?.suffix);
  })

  protected readonly autocompleteComputed = computed(() => {
    return (this.autocomplete() ?? this.config()?.autocomplete);
  })

  protected readonly clearableComputed = computed(() => {
    return (this.clearable() ?? this.config()?.clearable);
  })

  protected readonly clearOnClickComputed = computed(() => {
    return (this.clearOnClick() ?? this.config()?.clearOnClick);
  })

  protected readonly autofocusComputed = computed(() => {
    return (this.autofocus() ?? this.config()?.autofocus);
  })

  protected readonly readonlyComputed = computed(() => {
    return (this.readonly() ?? this.config()?.readonly);
  })

  protected readonly appearanceComputed = computed(() => {
    return (this.appearance() ?? this.config()?.appearance);
  })

  // ── Core states (Signals) ──
  public readonly selectedOption = signal<AlfSelectOption | null>(null);
  public readonly filterText = signal<string>('');
  public readonly isDropdownOpen = signal<boolean>(false);
  public readonly isExitingPanel = signal<boolean>(false);

  // ── Outputs ──
  public readonly optionSelected = output<AlfSelectOption>();

  private normalize(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  protected readonly filteredOptionsComputed = computed(() => {
    const text = this.filterText();
    const opts = this.optionsComputed() || [];
    if (!text) {
      return opts;
    }
    const normalizedText = this.normalize(text);
    return opts.filter(opt => {
      const normalizedLabel = this.normalize(opt.label || '');
      return normalizedLabel.includes(normalizedText);
    });
  });

  public onInputValueChange(val: string): void {
    this.filterText.set(val);
    if (this.selectedOption() && this.selectedOption()?.label !== val) {
      this.selectedOption.set(null);
    }
  }

  public onInputFocus(): void {
    this.isExitingPanel.set(false);
    this.isDropdownOpen.set(true);
  }

  private getAnimationDurationMs(): number {
    const durationStr = this.animationsComputed()?.duration || '200ms';
    if (durationStr.endsWith('ms')) {
      return parseFloat(durationStr) || 200;
    }
    if (durationStr.endsWith('s')) {
      return (parseFloat(durationStr) || 0.2) * 1000;
    }
    return parseFloat(durationStr) || 200;
  }

  public onInputBlur(): void {
    this.isExitingPanel.set(true);
    // Delay slightly to allow option click event to fire before closing the dropdown
    setTimeout(() => {
      // Only close if we are still in exiting state (hasn't been refocused)
      if (this.isExitingPanel()) {
        this.isDropdownOpen.set(false);
        this.isExitingPanel.set(false);
      }
    }, this.getAnimationDurationMs());
  }

  public onOptionSelected(option: AlfSelectOption): void {
    this.selectedOption.set(option);
    this.filterText.set(option.label || '');
    this.optionSelected.emit(option);
    this.isExitingPanel.set(true);
    setTimeout(() => {
      this.isDropdownOpen.set(false);
      this.isExitingPanel.set(false);
    }, this.getAnimationDurationMs());
  }

  public onInputClear(): void {
    this.selectedOption.set(null);
    this.filterText.set('');
  }
}
