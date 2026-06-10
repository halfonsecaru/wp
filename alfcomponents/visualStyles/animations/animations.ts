import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfAnimateCssInterface, AlfAnimateCssStateInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfAnimations]',
  standalone: true,
})
export class AlfAnimationsDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfAnimations = input<AlfAnimateCssInterface | undefined>(undefined);
  public readonly alfPrefix     = input<string>('--alf');
  public readonly isExiting     = input<boolean>(false);

  private parseAnimationName(val: string | undefined): string | undefined {
    if (!val || val === 'none') return undefined;
    if (val.includes('animate__')) {
      const parts = val.split(' ');
      const animPart = parts.find(p => p.startsWith('animate__') && p !== 'animate__animated' && p !== 'animate__infinite');
      if (animPart) return animPart.replace('animate__', '');
    }
    return val;
  }

  protected readonly resolvedStage = computed(() => {
    const config = this.alfAnimations();
    if (!config) return undefined;
    return this.isExiting() ? config.exitStage : (config.enterStage || config.type);
  });

  protected readonly resolvedName = computed(() => {
    const stage = this.resolvedStage();
    if (!stage) return undefined;
    if (typeof stage === 'string') return this.parseAnimationName(stage);
    const state = stage as AlfAnimateCssStateInterface;
    return this.parseAnimationName(state.name || state.type);
  });

  protected readonly resolvedDuration = computed(() => {
    const stage  = this.resolvedStage();
    const config = this.alfAnimations();
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).duration) {
      return (stage as AlfAnimateCssStateInterface).duration;
    }
    return config?.duration;
  });

  protected readonly resolvedDelay = computed(() => {
    const stage  = this.resolvedStage();
    const config = this.alfAnimations();
    if (this.isExiting()) return '0s';
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).delay) {
      return (stage as AlfAnimateCssStateInterface).delay;
    }
    return config?.delay;
  });

  protected readonly resolvedIterationCount = computed(() => {
    const stage  = this.resolvedStage();
    const config = this.alfAnimations();
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).iterationCount) {
      return (stage as AlfAnimateCssStateInterface).iterationCount;
    }
    if (config?.infinite && !this.isExiting()) return 'infinite';
    return config?.iterationCount;
  });

  protected readonly resolvedTimingFunction = computed(() => {
    const stage  = this.resolvedStage();
    const config = this.alfAnimations();
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).timingFunction) {
      return (stage as AlfAnimateCssStateInterface).timingFunction;
    }
    return config?.timingFunction;
  });

  protected readonly resolvedFillMode = computed(() => {
    const stage  = this.resolvedStage();
    const config = this.alfAnimations();
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).fillMode) {
      return (stage as AlfAnimateCssStateInterface).fillMode;
    }
    return config?.fillMode || 'both';
  });

  protected readonly resolvedDirection = computed(() => {
    const stage  = this.resolvedStage();
    const config = this.alfAnimations();
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).direction) {
      return (stage as AlfAnimateCssStateInterface).direction;
    }
    return config?.direction;
  });

  private readonly SUFFIXES = [
    '-animations-duration', '-animations-delay', '-animations-iteration-count',
    '-animations-timing-function', '-animations-fill-mode', '-animations-direction',
  ];

  private readonly _effect = effect(() => {
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    this.SUFFIXES.forEach(s => el.style.removeProperty(`${p}${s}`));

    const set = (prop: string, val: string | number | undefined) => {
      if (val != null) el.style.setProperty(prop, String(val));
    };

    set(`${p}-animations-duration`,        this.resolvedDuration());
    set(`${p}-animations-delay`,           this.resolvedDelay());
    set(`${p}-animations-iteration-count`, this.resolvedIterationCount());
    set(`${p}-animations-timing-function`, this.resolvedTimingFunction());
    set(`${p}-animations-fill-mode`,       this.resolvedFillMode());
    set(`${p}-animations-direction`,       this.resolvedDirection());
  });
}
