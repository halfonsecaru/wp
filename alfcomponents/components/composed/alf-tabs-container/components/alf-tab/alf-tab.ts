import {
  Component,
  input,
  signal,
  computed,
  inject,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AlfSingleTabInterface, ALF_TABS_CONTAINER_TOKEN } from '../../interfaces/alf-tabs.interface';
import { AlfAnimateCssInterface, AlfBackgroundsInterface } from '@alfcomponents/interfaces';

@Component({
  selector: 'alf-tab',
  standalone: true,
  imports: [],
  templateUrl: './alf-tab.html',
  styleUrl: './alf-tab.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    '[style.display]': 'isActive() || isExiting() ? "grid" : "none"',
    '[style.grid-area]': '"1/1"',
    '[style.width]': '"100%"',
    '[style.min-width]': '"0"',
  },
})
export class AlfTabComponent implements OnDestroy {

  // ── Injections ──────────────────────────────────────────────────────────
  public readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly container = inject(ALF_TABS_CONTAINER_TOKEN, { optional: true });
  private exitResolveFn: (() => void) | null = null;

  // ── Inputs ──────────────────────────────────────────────────────────────
  public readonly inputConfig   = input<AlfSingleTabInterface>(undefined);
  public readonly label         = input<string>('');
  public readonly tabName       = input<string>('');
  public readonly expandHeight  = input<boolean>(false);
  public readonly closable      = input<boolean>(false);
  public readonly disabled      = input<boolean>(false);
  public readonly iconLeft      = input<string | undefined>(undefined);
  public readonly iconRight     = input<string | undefined>(undefined);

  // ── State ───────────────────────────────────────────────────────────────
  private readonly _isActive              = signal<boolean>(false);
  public  readonly isActive               = this._isActive.asReadonly();
  public  readonly isExiting              = signal<boolean>(false);
  public  readonly parentContentAnimations = signal<AlfAnimateCssInterface | undefined>(undefined);
  public  readonly parentContentBackgrounds = signal<AlfBackgroundsInterface | undefined>(undefined);

  // ── Computed ─────────────────────────────────────────────────────────────
  public readonly isDisabled = computed(() =>
    this.disabled() || this.inputConfig()?.disabled || false
  );

  public readonly finalLabel = computed(() =>
    this.label() || this.inputConfig()?.tabName || 'Tab'
  );

  public readonly effectiveAnimations = computed(() =>
    this.inputConfig()?.animations || this.parentContentAnimations()
  );

  public readonly currentAnimationClass = computed(() => {
    const anims = this.effectiveAnimations();
    if (this.isExiting()) return anims?.exitStage ?? '';
    if (this.isActive())  return anims?.enterStage ?? '';
    return '';
  });

  public readonly animationStyle = computed(() => {
    const anim = this.effectiveAnimations();
    if (!anim) return '';
    const parts: string[] = [];
    if (anim.duration) parts.push(`--animate-duration: ${anim.duration};`);
    const delay = this.isActive() && !this.isExiting() ? anim.delay || '0s' : '0s';
    parts.push(`--animate-delay: ${delay};`);
    return parts.join(' ');
  });

  // ── Lifecycle ───────────────────────────────────────────────────────────
  public ngOnDestroy(): void {
    if (this.exitResolveFn) {
      this.exitResolveFn();
      this.exitResolveFn = null;
    }
  }

  // ── Public API (called by container) ────────────────────────────────────
  public readonly setActive = (active: boolean): void => {
    this._isActive.set(active);
  };

  public readonly playExitAnimation = (): Promise<void> => {
    return new Promise(this.executeExitAnimation);
  };

  public readonly reportHeight = (): void => {
    if (this.container) {
      this.container.onTabHeightMeasured();
    }
  };

  // ── Private ──────────────────────────────────────────────────────────────
  private readonly executeExitAnimation = (
    resolve: (value: void | PromiseLike<void>) => void
  ): void => {
    const anims = this.effectiveAnimations();
    if (!anims?.exitStage) {
      resolve();
      return;
    }

    this.isExiting.set(true);

    const el = this.elementRef.nativeElement.firstElementChild as HTMLElement;
    if (!el) {
      this.isExiting.set(false);
      resolve();
      return;
    }

    this.exitResolveFn = resolve as () => void;
    el.addEventListener('animationend', this.onExitAnimationEnd);
  };

  private readonly onExitAnimationEnd = (): void => {
    const el = this.elementRef.nativeElement.firstElementChild as HTMLElement;
    if (el) el.removeEventListener('animationend', this.onExitAnimationEnd);

    this.isExiting.set(false);

    if (this.exitResolveFn) {
      this.exitResolveFn();
      this.exitResolveFn = null;
    }
  };
}
