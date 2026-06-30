import {
  Component,
  ChangeDetectionStrategy,
  input,
  model,
  signal,
  computed,
  inject,
  ElementRef,
  output,
  effect,
  OnDestroy,
  DOCUMENT,
} from '@angular/core';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfInput } from '@alfcomponents/components/simple/alf-input/alf-input';
import { AlfInputAppearanceEnum, AlfAnimationTypeEnum } from '@alfcomponents/enums';
import { AlfAnimateCssInterface } from '@alfcomponents/interfaces';
import { AlfValidationResult } from '@alfcomponents/shared';
import { AlfSelectOption } from '../alf-autocomplete/interfaces/alf-auto-complete-options-interface';
import { AlfSelectPanelComponent } from "./components/alf-select-panel/alf-select-panel";

@Component({
  selector: 'alf-select',
  standalone: true,
  imports: [AlfInput, ...ALF_CORE_DIRECTIVES, AlfSelectPanelComponent],
  templateUrl: './alf-select.html',
  styleUrls: ['./alf-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class AlfSelectComponent extends AlfBaseDirectives implements OnDestroy {
  // ── 1. Constants & Injections ───────────────────────────────────────────
  protected readonly cssVarPrefix: string = visualprefixEnum.Select as string;
  protected readonly classPrefix: string = visualprefixEnum.SelectClass as string;

  protected readonly hostRef = inject(ElementRef);
  private readonly document = inject(DOCUMENT);
  private currentTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly documentClickListener = (event: MouseEvent) => this.onDocumentClick(event);

  // ── 2. View & Content Queries ───────────────────────────────────────────


  // ── 3. Inputs, Models & Outputs ─────────────────────────────────────────
  public readonly id = input<string>();
  public readonly value = model<any>();
  public readonly loading = input<boolean>(false);
  public readonly options = input<AlfSelectOption[]>([]);
  public readonly label = input<string>();
  public readonly placeholder = input<string>();
  public readonly searchable = input<boolean>(false);
  public readonly clearable = input<boolean>(false);
  public readonly clearOnClick = input<boolean>(false);
  public readonly multiple = input<boolean>(false);
  public readonly appearance = input<AlfInputAppearanceEnum>(AlfInputAppearanceEnum.Outline);
  public readonly helperText = input<string>();
  public readonly readonly = input<boolean>(false);
  public readonly prefix = input<string>();
  public readonly suffix = input<string>();
  public readonly autocomplete = input<string>();
  public readonly autofocus = input<boolean>(false);
  public readonly required = input<boolean | undefined>(undefined);
  public readonly maxLength = input<number>();
  public readonly minLength = input<number>();
  public readonly min = input<number>();
  public readonly max = input<number>();
  public readonly pattern = input<string>();
  public readonly validators = input<((v: any) => AlfValidationResult)[]>([]);
  public readonly error = input<string | boolean | undefined>(undefined);

  public readonly optionsSelected = output<AlfSelectOption | AlfSelectOption[] | null>();

  // ── 4. Internal State ───────────────────────────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: visualprefixEnum.SelectInternalId });
  protected searchTerm = signal('');
  protected inputValue = signal<string>('');
  protected isPanelExiting = signal<boolean>(false);
  public readonly isPanelOpen = signal<boolean>(false);
  public readonly selectedOption = signal<AlfSelectOption | null>(null);
  public readonly selectedOptions = signal<AlfSelectOption[]>([]);
  private isInteractingWithPanel = signal<boolean>(false);

  // ── 5. Computed State ───────────────────────────────────────────────────
  protected readonly idComputed = computed(() => this.id() ?? this.internalId);
  protected readonly filteredOptions = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const opts = this.options();
    const selectedValues = this.multiple()
      ? new Set(this.selectedOptions().map(o => o.value))
      : new Set();

    let filteredOpts = opts;
    if (term) {
      filteredOpts = opts.filter(opt =>
        (opt.label || '').toLowerCase().includes(term)
      );
    }

    return filteredOpts.map(opt => ({
      ...opt,
      selected: selectedValues.has(opt.value)
    }));
  });

  protected readonly panelAnimations = computed(() => {
    const userAnimations = this.animations();
    const defaultAnimations: AlfAnimateCssInterface = {
      enterStage: AlfAnimationTypeEnum.FadeIn,
      exitStage: AlfAnimationTypeEnum.FadeOut,
      duration: '500ms'
    };
    // Merge user animations with defaults
    return userAnimations ? { ...defaultAnimations, ...userAnimations } : defaultAnimations;
  });

  // ── 5.1. Effects ──────────────────────────────────────────────────────────
  private readonly syncValueEffect = effect(() => {
    const val = this.value();
    if (val === null || val === undefined) {
      this.selectedOption.set(null);
      this.selectedOptions.set([]);
      this.inputValue.set('');
    } else if (Array.isArray(val)) {
      // Multi-select
      this.selectedOption.set(null);
      this.selectedOptions.set(val);
      this.inputValue.set(val.map(o => o.label).join(', '));
    } else {
      // Single-select
      this.selectedOption.set(val);
      this.selectedOptions.set([]);
      this.inputValue.set(val?.label || '');
    }
  }, { allowSignalWrites: true });

  // ── 6. Constructor ──────────────────────────────────────────────────────
  constructor() {
    super();
    this.document.addEventListener('click', this.documentClickListener);
  }

  // ── 7. Lifecycle Hooks ───────────────────────────────────────────────────
  public ngOnDestroy(): void {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    this.document.removeEventListener('click', this.documentClickListener);
  }

  // ── 8. Public Methods (AlfSelectParentInterface) ─────────────────────────

  public onInputClick(): void {
    if (!this.isPanelOpen() && !this.disabled() && !this.readonly()) {
      this.isPanelExiting.set(false);
      this.isPanelOpen.set(true);
    }
  }

  public onInputFocus(event: FocusEvent): void {
    if (!this.isPanelOpen() && !this.disabled() && !this.readonly()) {
      this.isPanelExiting.set(false);
      this.isPanelOpen.set(true);
    }
  }

  public onInputBlur(event: FocusEvent): void {
    // No hacemos nada aquí; el HostListener se encargará de cerrar el panel al hacer clic fuera
  }

  public onOptionSelected(option: AlfSelectOption): void {
    if (this.multiple()) {
      // Multi-select mode
      const currentSelected = this.selectedOptions();
      const isSelected = currentSelected.some(o => o.value === option.value);

      let newSelected: AlfSelectOption[];
      if (isSelected) {
        newSelected = currentSelected.filter(o => o.value !== option.value);
      } else {
        newSelected = [...currentSelected, option];
      }

      this.selectedOptions.set(newSelected);
      this.value.set(newSelected); // Store complete option objects in value
      this.inputValue.set(newSelected.map(o => o.label).join(', '));
      this.optionsSelected.emit(newSelected); // Emit full array for multi-select
      // Don't close panel in multi-select mode
    } else {
      // Single-select mode
      this.selectedOption.set(option);
      this.inputValue.set(option.label || '');
      this.value.set(option); // Store complete option object in value
      this.optionsSelected.emit(option); // Emit single option for single-select
      this.isPanelExiting.set(true);
      // Clear previous timeout if exists
      if (this.currentTimeout) clearTimeout(this.currentTimeout);
      this.currentTimeout = setTimeout(() => {
        this.isPanelOpen.set(false);
        this.isPanelExiting.set(false);
        this.currentTimeout = null;
      }, this.getAnimationDurationMs());
    }
  }

  public onPanelMouseEnter(): void {
    this.isInteractingWithPanel.set(true);
  }

  public onPanelMouseLeave(): void {
    this.isInteractingWithPanel.set(false);
  }

  public onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    const clickedInsideComponent = this.hostRef.nativeElement.contains(targetElement);
    if (!clickedInsideComponent && this.isPanelOpen()) {
      this.isPanelExiting.set(true);
      // Clear previous timeout if exists
      if (this.currentTimeout) clearTimeout(this.currentTimeout);
      this.currentTimeout = setTimeout(() => {
        if (this.isPanelExiting()) {
          this.isPanelOpen.set(false);
          this.isPanelExiting.set(false);
        }
        this.currentTimeout = null;
      }, this.getAnimationDurationMs());
    }
  }

  public onInputClear(): void {
    this.selectedOption.set(null);
    this.selectedOptions.set([]);
    this.inputValue.set('');

    // Set value to null (single) or empty array (multi)
    if (this.multiple()) {
      this.value.set([]);
      this.optionsSelected.emit([]);
    } else {
      this.value.set(null);
      this.optionsSelected.emit(null);
    }
  }

  // ── 8. Protected Methods ─────────────────────────────────────────────────

  private getAnimationDurationMs(): number {
    const durationStr = this.panelAnimations()?.duration || '500ms';
    if (durationStr.endsWith('ms')) {
      return parseFloat(durationStr) || 500;
    }
    if (durationStr.endsWith('s')) {
      return (parseFloat(durationStr) || 0.5) * 1000;
    }
    return parseFloat(durationStr) || 500;
  }

  // ── 9. Lifecycle ─────────────────────────────────────────────────────────

}
