import {
  Component,
  input,
  computed,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  output,
  inject,
  ElementRef,
} from '@angular/core';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum, AlfCursorEnum } from '@alfcomponents/enums';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfCardConfigInterface } from './interfaces/alf-card.interface';
import { getAlfDefaultConfig } from '@alfcomponents/shared/functions/generateStyles';
import { ALF_CARD_DEFAULT } from './predefined/alf-card.predefined';

@Component({
  selector: 'alf-card',
  standalone: true,
  imports: [],
  templateUrl: './alf-card.html',
  styleUrl: './alf-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCardComponent extends AlfBaseConfiguration<AlfCardConfigInterface> {

  // ==========================================
  // 1. Attributes (Properties, Injections)
  // ==========================================
  protected override readonly visualPrefix: string = visualprefixEnum.Card;
  protected override readonly componentType = AlfComponentTypeEnum.Card;
  private readonly internalId = generateUniqueId({ prefix: visualprefixEnum.CardInternalId });
  private readonly el = inject(ElementRef);

  // ==========================================
  // 2. Signals & Inputs
  // ==========================================
  public override readonly colorVariant = input<AlfColorVariantEnum>();
  public override readonly inputConfig = input<AlfCardConfigInterface>(undefined, { alias: 'config' });

  /** Whether the card is clickable and behaves as a button */
  public readonly clickable = input<boolean>(false);
  /** Anchor link URL if the card should act as a link */
  public readonly href = input<string | undefined>();
  /** Target attribute for the anchor link */
  public readonly target = input<string>('_self');

  // ==========================================
  // 3. Outputs
  // ==========================================
  public readonly onClick = output<MouseEvent>();

  // ==========================================
  // 4. Computed
  // ==========================================
  protected readonly predefinedConfigComputed = computed(() => {
    const rawV = this.colorVariant() ?? this.inputConfig()?.colorVariant;
    const hasVariant = rawV && rawV !== AlfColorVariantEnum.Default && rawV !== AlfColorVariantEnum.Transparent;

    const defaultStyles = { ...ALF_CARD_DEFAULT };
    if (hasVariant) {
      delete defaultStyles.backgrounds;
      delete defaultStyles.border;
      delete defaultStyles.shadows;
    }

    return getAlfDefaultConfig(rawV, this.componentType, defaultStyles, this.inputConfig() ?? {});
  });

  protected override readonly colorVariantComputed = computed(() => {
    return this.predefinedConfigComputed()?.colorVariant;
  });

  protected override readonly cursorComputed = computed(() => {
    if (this.disabledComputed()) return AlfCursorEnum.NotAllowed;
    if (this.clickable() || this.href()) return AlfCursorEnum.Pointer;
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

  // ==========================================
  // 5. Host Bindings
  // ==========================================
  @HostBinding('class')
  get hostClass(): string {
    const custom = this.customClassComputed();
    const disabledClass = this.disabledComputed() ? ' alf-card--disabled' : '';
    const interactiveClass = (this.clickable() || !!this.href()) ? ' alf-card--interactive' : '';
    return `alf-card${disabledClass}${interactiveClass} ${custom}`.trim();
  }

  @HostBinding('attr.id')
  get hostId(): string {
    return this.containerId();
  }

  @HostBinding('style')
  get hostStyle(): string {
    return this.combinedStyles();
  }

  @HostBinding('attr.role')
  get hostRole(): string {
    if (this.href()) return 'link';
    if (this.clickable()) return 'button';
    return 'article';
  }

  @HostBinding('attr.tabindex')
  get hostTabIndex(): number | null {
    if (this.disabledComputed()) return -1;
    if (this.clickable() || this.href()) return 0;
    return null;
  }

  // ==========================================
  // 6. Host Listeners / Handlers
  // ==========================================
  @HostListener('click', ['$event'])
  public onHostClick(event: MouseEvent): void {
    if (this.disabledComputed()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    // Ignore clicks bubbling from interactive children inside the card
    const target = event.target as HTMLElement;
    const interactiveDescendant = target.closest('button, a, alf-button, [role="button"]');
    if (interactiveDescendant && interactiveDescendant !== this.el.nativeElement) {
      return;
    }

    this.onClick.emit(event);

    if (this.href()) {
      const url = this.href()!;
      const tgt = this.target();
      if (tgt === '_blank') {
        window.open(url, '_blank', 'noopener noreferrer');
      } else {
        window.location.href = url;
      }
    }
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  public onHostKeydown(event: KeyboardEvent): void {
    if (this.disabledComputed()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (this.clickable() || this.href()) {
      event.preventDefault();
      // Simulate click
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      this.onHostClick(clickEvent);
    }
  }

  constructor() {
    super();
  }
}
