import { 
  Component, 
  input, 
  computed, 
  signal, 
  model, 
  effect, 
  inject, 
  ElementRef, 
  viewChild, 
  TemplateRef, 
  ViewContainerRef, 
  EmbeddedViewRef,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum, AlfCursorEnum } from '@alfcomponents/enums';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfAutocompleteConfigInterface, AlfSelectOption } from './interfaces/alf-autocomplete.interface';
import { getAlfDefaultConfig } from '@alfcomponents/shared/functions/generateStyles';
import { ALF_AUTOCOMPLETE_DEFAULT } from './predefined/alf-autocomplete.predefined';
import { AlfInput } from '../../simple/alf-input/alf-input';

@Component({
  selector: 'alf-autocomplete',
  standalone: true,
  imports: [AlfInput],
  templateUrl: './alf-autocomplete.html',
  styleUrl: './alf-autocomplete.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfAutocompleteComponent extends AlfBaseConfiguration<AlfAutocompleteConfigInterface> implements OnDestroy {

  // ==========================================
  // 1. Effects
  // ==========================================
  private readonly syncValueEffect = effect(() => {
    const configValue = this.resolvedConfig()?.value;
    if (configValue !== undefined && this.value() !== configValue) {
      this.value.set(configValue);
    }
  });

  private readonly chevronAnimEffect = effect(() => {
    const open = this.isOpen();
    if (!this.hasChevronAnimated) {
      this.hasChevronAnimated = true;
      return;
    }
    const icon = this.elementRef.nativeElement.querySelector('.alf-input__suffix-icon') as HTMLElement;
    if (!icon) return;
    icon.animate(
      [
        { transform: open ? 'rotate(0deg)' : 'rotate(180deg)' },
        { transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }
      ],
      { duration: 250, fill: 'forwards', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
    );
  });

  // ==========================================
  // 2. Attributes (Properties, Injections)
  // ==========================================
  protected override readonly visualPrefix: string = visualprefixEnum.Autocomplete;
  protected override readonly componentType = AlfComponentTypeEnum.Autocomplete;
  private readonly internalId = generateUniqueId({ prefix: visualprefixEnum.AutocompleteInternalId });
  private readonly elementRef = inject(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private hasChevronAnimated: boolean = false;
  private overlayRef: EmbeddedViewRef<any> | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private scrollDispose: (() => void) | null = null;

  // ==========================================
  // 3. Signals (Inputs, Models, State)
  // ==========================================
  public override readonly colorVariant = input<AlfColorVariantEnum>();
  public override readonly inputConfig = input<AlfAutocompleteConfigInterface>(undefined, { alias: 'config' });
  public readonly value = model<any>(null);
  protected readonly panelTemplate = viewChild<TemplateRef<any>>('panelTemplate');
  public readonly isOpen = signal<boolean>(false);
  public readonly focusedIndex = signal<number>(-1);
  public readonly searchTerm = signal<string>('');

  // ==========================================
  // 4. Computed
  // ==========================================
  protected readonly predefinedConfigComputed = computed(() => {
    const rawV = this.colorVariant() ?? this.inputConfig()?.colorVariant;
    return getAlfDefaultConfig(rawV, this.componentType, ALF_AUTOCOMPLETE_DEFAULT, this.inputConfig() ?? {});
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

  protected readonly filteredOptions = computed(() => {
    const config = this.resolvedConfig();
    const options = config.options || [];
    const term = this.searchTerm().trim().toLowerCase();

    if (!config.searchable || !term) {
      return options;
    }

    return options.filter(opt =>
      this.normalizeText(opt.label).includes(this.normalizeText(term))
    );
  });

  protected readonly inputValueComputed = computed<string>(() => {
    const val = this.value();
    if (!val && val !== 0) {
      return '';
    }
    const options = this.resolvedConfig().options || [];
    if (Array.isArray(val)) {
      return options
        .filter(opt => val.includes(opt.value))
        .map(opt => opt.label)
        .join(', ');
    } else {
      const selected = options.find(opt => opt.value === val);
      return selected ? selected.label : String(val);
    }
  });

  protected readonly inputTriggerConfigComputed = computed<any>(() => {
    const c = this.resolvedConfig();
    return {
      label: c.label,
      placeholder: c.placeholder,
      helperText: c.helperText,
      error: c.error,
      disabled: c.disabled,
      readonly: true,
      required: c.required,
      loading: c.loading,
      prefix: c.prefix,
      suffix: c.suffix || '▼',
      customClass: c.customClass,
      colorVariant: c.colorVariant,
      appearance: c.appearance,
    };
  });

  protected readonly searchInputConfigComputed = computed<any>(() => {
    return {
      placeholder: 'Buscar...',
      clearable: true,
      size: 'sm'
    };
  });

  // ==========================================
  // 5. Lifecycle Hooks
  // ==========================================
  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.closeDropdown();
  }

  // ==========================================
  // 6. Functions (Arrow Functions)
  // ==========================================
  protected readonly onTriggerClick = (): void => {
    if (this.resolvedConfig().disabled) return;
    this.toggleDropdown();
  };

  protected readonly onTriggerKeydown = (event: KeyboardEvent): void => {
    if (this.resolvedConfig().disabled) return;

    if (!this.isOpen()) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
        this.openDropdown();
        event.preventDefault();
      }
      return;
    }

    const options = this.filteredOptions();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex.update(idx => (idx < options.length - 1) ? idx + 1 : 0);
        this.scrollToOption(this.focusedIndex());
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex.update(idx => (idx > 0) ? idx - 1 : options.length - 1);
        this.scrollToOption(this.focusedIndex());
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.focusedIndex() >= 0 && options[this.focusedIndex()]) {
          this.selectOption(options[this.focusedIndex()]);
        }
        break;

      case 'Escape':
      case 'Tab':
        this.closeDropdown();
        break;
    }
  };

  protected readonly onSearchTermChange = (val: string): void => {
    this.searchTerm.set(val);
    this.focusedIndex.set(0);
  };

  protected readonly selectOption = (option: AlfSelectOption): void => {
    if (option.disabled) return;

    const config = this.resolvedConfig();

    if (config.multiple) {
      const currentValue = this.value() || [];
      const valueArray = Array.isArray(currentValue) ? currentValue : [];
      const index = valueArray.findIndex(v => v === option.value);

      if (index >= 0) {
        valueArray.splice(index, 1);
      } else {
        if (!config.maxSelections || valueArray.length < config.maxSelections) {
          valueArray.push(option.value);
        }
      }

      this.value.set([...valueArray]);

      if (config.maxSelections && valueArray.length >= config.maxSelections) {
        this.closeDropdown();
      }
    } else {
      this.value.set(option.value);
    }

    if (!config.multiple) {
      this.closeDropdown();
    }
  };

  protected readonly toggleDropdown = (): void => {
    if (this.isOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  };

  private readonly openDropdown = (): void => {
    if (this.isOpen()) return;
    this.isOpen.set(true);
    this.searchTerm.set('');

    const val = this.value();
    const opts = this.filteredOptions();
    const idx = opts.findIndex(o => o.value === val);
    this.focusedIndex.set(idx >= 0 ? idx : -1);

    this.createOverlay();

    if (idx >= 0) {
      this.scrollToOption(idx);
    }
  };

  protected readonly closeDropdown = (): void => {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.focusedIndex.set(-1);
    this.destroyOverlay();
  };

  private readonly createOverlay = (): void => {
    this.destroyOverlay();

    const template = this.panelTemplate();
    if (!template) return;

    this.overlayRef = this.viewContainerRef.createEmbeddedView(template);
    const rootNode = this.overlayRef.rootNodes[0] as HTMLElement;
    if (!rootNode) return;

    document.body.appendChild(rootNode);
    this.updateOverlayPosition();

    if (typeof window !== 'undefined') {
      const handler = (): void => this.updateOverlayPosition();
      window.addEventListener('scroll', handler, true);
      window.addEventListener('resize', handler);
      window.addEventListener('mousedown', this.onDocumentClick);

      this.scrollDispose = (): void => {
        window.removeEventListener('scroll', handler, true);
        window.removeEventListener('resize', handler);
        window.removeEventListener('mousedown', this.onDocumentClick);
      };

      const inputEl = this.getHostInput();
      if (inputEl) {
        this.resizeObserver = new ResizeObserver((): void => this.updateOverlayPosition());
        this.resizeObserver.observe(inputEl);
      }
    }
  };

  private readonly onDocumentClick = (event: MouseEvent): void => {
    if (this.overlayRef && this.overlayRef.rootNodes[0].contains(event.target as Node)) {
      return;
    }
    const host = this.elementRef.nativeElement;
    if (host.contains(event.target as Node)) {
      return;
    }
    this.closeDropdown();
  };

  private readonly destroyOverlay = (): void => {
    if (this.scrollDispose) {
      this.scrollDispose();
      this.scrollDispose = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.overlayRef) {
      const rootNode = this.overlayRef.rootNodes[0] as HTMLElement;
      if (rootNode && rootNode.parentNode) {
        rootNode.parentNode.removeChild(rootNode);
      }
      this.overlayRef.destroy();
      this.overlayRef = null;
    }
  };

  private readonly updateOverlayPosition = (): void => {
    if (!this.overlayRef || !this.overlayRef.rootNodes[0]) return;
    const rootNode = this.overlayRef.rootNodes[0] as HTMLElement;
    const inputEl = this.getHostInput();

    if (!inputEl) {
      this.destroyOverlay();
      return;
    }

    const rect = inputEl.getBoundingClientRect();
    const dropdownHeight = rootNode.offsetHeight || 200;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

    rootNode.style.position = 'absolute';
    rootNode.style.left = `${rect.left + window.scrollX}px`;
    rootNode.style.width = `${rect.width}px`;
    rootNode.style.minWidth = '200px';
    rootNode.style.zIndex = '1000';

    if (showAbove) {
      const topPos = (rect.top + scrollY) - dropdownHeight;
      rootNode.style.top = `${topPos}px`;
      rootNode.classList.add('alf-panel-above');
      rootNode.classList.remove('alf-panel-below');
    } else {
      const topPos = rect.bottom + scrollY;
      rootNode.style.top = `${topPos}px`;
      rootNode.classList.add('alf-panel-below');
      rootNode.classList.remove('alf-panel-above');
    }
  };

  private readonly getHostInput = (): HTMLElement | null => {
    return this.elementRef.nativeElement.querySelector('alf-input');
  };

  private readonly normalizeText = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  private readonly scrollToOption = (index: number): void => {
    if (typeof document === 'undefined') return;
    requestAnimationFrame((): void => {
      const activeEl = document.getElementById(`alf-option-${index}`);
      if (activeEl && typeof activeEl.scrollIntoView === 'function') {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    });
  };
}
