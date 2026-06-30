import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  signal,
  output,
} from '@angular/core';
import { AlfColorVariantEnum, AlfCursorEnum, AlfSizeEnum, AlfInputAppearanceEnum, AlfAnimationTypeEnum } from '@alfcomponents/enums';
import { AlfInput } from '../../simple/alf-input/alf-input';
import { AlfAnimateCssInterface, AlfBackgroundsBaseInterface, AlfBackgroundsInterface, AlfBorderBaseInterface, AlfBorderInterface, AlfDisplayAndLayoutBaseInterface, AlfDisplayAndLayoutInterface, AlfMarginBaseInterface, AlfMarginInterface, AlfOutlineBaseInterface, AlfOutlineInterface, AlfPaddingBaseInterface, AlfPaddingInterface, AlfRippleInterface, AlfShadowsBaseInterface, AlfShadowsInterface, AlfTextStyleInterface, AlfTextStyleStateBaseInterface, AlfTransformBaseInterface, AlfTransformInterface, AlfTransitionBaseInterface, AlfTransitionInterface, AlfTypographyBaseInterface, AlfTypographyInterface } from '@alfcomponents/interfaces';
import { AlfTooltipConfig } from '@alfcomponents/directives';
import { AlfValidationResult } from '@alfcomponents/shared';

import { AlfSelectOption } from './interfaces/alf-auto-complete-options-interface';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfAutoCompletefPanel } from './al-auto-completef-panel/alf-auto-complete-panel';

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
  public readonly animations = input<AlfAnimateCssInterface>({
    enterStage: AlfAnimationTypeEnum.FadeIn,
    exitStage: AlfAnimationTypeEnum.FadeOut,
  });

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
    const opts = this.options() || [];
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
    const durationStr = this.animations()?.duration || '200ms';
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
