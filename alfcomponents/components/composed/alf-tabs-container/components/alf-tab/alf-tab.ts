import { Component, input, signal, computed, inject, ElementRef, viewChild, OnDestroy } from '@angular/core';
import { AlfSingleTabInterface, ALF_TABS_CONTAINER_TOKEN } from '../../interfaces/alf-tabs.interface';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfAnimateCssInterface } from '@alfcomponents/interfaces';
import { ALF_TAB_CONTENT_DEFAULT } from '../../predefined/alf-tabs-container.predefined';
import { AlfBaseButtonConfiguration } from '../../../../simple/alf-button/base/alf-base-button-configuration';

@Component({
  selector: 'alf-tab',
  standalone: true,
  imports: [],
  templateUrl: './alf-tab.html',
  styleUrl: './alf-tab.scss',
  host: {
    '[style.display]': 'isActive() || isExiting() ? "grid" : "none"',
    '[style.grid-area]': '"1/1"',
    '[style.width]': '"100%"',
    '[style.min-width]': '"0"'
  }
})
export class AlfTabComponent extends AlfBaseButtonConfiguration<AlfSingleTabInterface> implements OnDestroy {

  // ==========================================
  // 1. Effects
  // ==========================================
  // (No effects)

  // ==========================================
  // 2. Attributes (Properties, Injections)
  // ==========================================
  protected readonly visualPrefix = visualprefixEnum.TabsContent;
  public readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly container = inject(ALF_TABS_CONTAINER_TOKEN, { optional: true });
  private exitResolveFn: (() => void) | null = null;

  // ==========================================
  // 3. Signals (Inputs, Models, State)
  // ==========================================
  public override readonly inputConfig = input<AlfSingleTabInterface>(ALF_TAB_CONTENT_DEFAULT as AlfSingleTabInterface);
  public readonly tabName = input<string>('');
  public readonly expandHeight = input<boolean>(false);
  
  private readonly _isActive = signal<boolean>(false);
  public readonly isActive = this._isActive.asReadonly();
  protected readonly isExiting = signal<boolean>(false);
  public readonly parentContentAnimations = signal<AlfAnimateCssInterface | undefined>(undefined);
  
  public readonly contentInner = viewChild<ElementRef<HTMLDivElement>>('contentInner');

  // ==========================================
  // 4. Computed
  // ==========================================
  public readonly finalLabel = computed(() => this.label() || this.tabName() || this.inputConfig()?.tabName || 'Tab');

  public readonly effectiveAnimations = computed(() => {
    return this.inputConfig()?.animations || this.parentContentAnimations();
  });

  protected readonly currentAnimationClass = computed(() => {
    const anims = this.effectiveAnimations();
    if (this.isExiting()) return anims?.exitStage ?? '';
    if (this.isActive()) return anims?.enterStage ?? '';
    return '';
  });

  protected readonly animationStyle = computed(() => {
    const anim = this.effectiveAnimations();
    if (!anim) return '';
    const declarations: string[] = [];
    if (anim.duration) declarations.push(`--animate-duration: ${anim.duration};`);

    // Solo aplicamos delay en la entrada (isActive) para permitir que la salida (isExiting) sea inmediata
    const delay = (this.isActive() && !this.isExiting()) ? (anim.delay || '0s') : '0s';
    declarations.push(`--animate-delay: ${delay};`);

    return declarations.join(' ');
  });

  // ==========================================
  // 5. Lifecycle Hooks
  // ==========================================
  constructor() {
    super();
  }

  public ngOnDestroy(): void {
    if (this.exitResolveFn) {
      this.exitResolveFn();
      this.exitResolveFn = null;
    }
  }

  // ==========================================
  // 6. Functions (Arrow Functions)
  // ==========================================
  public readonly playExitAnimation = (): Promise<void> => {
    return new Promise(this.executeExitAnimation);
  };

  private readonly executeExitAnimation = (resolve: (value: void | PromiseLike<void>) => void): void => {
    const anims = this.effectiveAnimations();
    if (!anims || !anims.exitStage) {
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
    if (el) {
      el.removeEventListener('animationend', this.onExitAnimationEnd);
    }

    this.isExiting.set(false);

    if (this.exitResolveFn) {
      this.exitResolveFn();
      this.exitResolveFn = null;
    }
  };

  public readonly setActive = (active: boolean): void => {
    this._isActive.set(active);
  };

  public readonly reportHeight = (): void => {
    if (this.container) {
      this.container.onTabHeightMeasured();
    }
  };
}
