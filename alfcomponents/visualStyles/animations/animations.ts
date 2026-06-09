import { Directive, input, computed } from '@angular/core';
import { AlfAnimateCssInterface, AlfAnimateCssStateInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfAnimations]',
  standalone: true,
  host: {
    '[style.--alf-anim-name]': 'this.resolvedName() ?? undefined',
    '[style.--alf-anim-duration]': 'this.resolvedDuration() ?? undefined',
    '[style.--alf-anim-delay]': 'this.resolvedDelay() ?? undefined',
    '[style.--alf-anim-iteration-count]': 'this.resolvedIterationCount() ?? undefined',
    '[style.--alf-anim-timing-function]': 'this.resolvedTimingFunction() ?? undefined',
    '[style.--alf-anim-fill-mode]': 'this.resolvedFillMode() ?? undefined',
    '[style.--alf-anim-direction]': 'this.resolvedDirection() ?? undefined',
  }
})
export class AlfAnimationsDirective {
  public readonly alfAnimations = input<AlfAnimateCssInterface | undefined>(undefined);
  public readonly isExiting = input<boolean>(false);

  private parseAnimationName(val: string | undefined): string | undefined {
    if (!val || val === 'none') return undefined;
    // Extract animate__fadeIn -> fadeIn
    if (val.includes('animate__')) {
      const parts = val.split(' ');
      const animPart = parts.find(p => p.startsWith('animate__') && p !== 'animate__animated' && p !== 'animate__infinite');
      if (animPart) {
        return animPart.replace('animate__', '');
      }
    }
    // Extract alf-anim-textGlow -> alf-anim-textGlow
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
    if (typeof stage === 'string') {
      return this.parseAnimationName(stage);
    }
    const state = stage as AlfAnimateCssStateInterface;
    return this.parseAnimationName(state.name || state.type);
  });

  protected readonly resolvedDuration = computed(() => {
    const stage = this.resolvedStage();
    const config = this.alfAnimations();
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).duration) {
      return (stage as AlfAnimateCssStateInterface).duration;
    }
    return config?.duration;
  });

  protected readonly resolvedDelay = computed(() => {
    const stage = this.resolvedStage();
    const config = this.alfAnimations();
    // Only apply delay on enter to allow exit to play immediately
    if (this.isExiting()) return '0s';
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).delay) {
      return (stage as AlfAnimateCssStateInterface).delay;
    }
    return config?.delay;
  });

  protected readonly resolvedIterationCount = computed(() => {
    const stage = this.resolvedStage();
    const config = this.alfAnimations();
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).iterationCount) {
      return (stage as AlfAnimateCssStateInterface).iterationCount;
    }
    if (config?.infinite && !this.isExiting()) return 'infinite';
    return config?.iterationCount;
  });

  protected readonly resolvedTimingFunction = computed(() => {
    const stage = this.resolvedStage();
    const config = this.alfAnimations();
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).timingFunction) {
      return (stage as AlfAnimateCssStateInterface).timingFunction;
    }
    return config?.timingFunction;
  });

  protected readonly resolvedFillMode = computed(() => {
    const stage = this.resolvedStage();
    const config = this.alfAnimations();
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).fillMode) {
      return (stage as AlfAnimateCssStateInterface).fillMode;
    }
    return config?.fillMode || 'both';
  });

  protected readonly resolvedDirection = computed(() => {
    const stage = this.resolvedStage();
    const config = this.alfAnimations();
    if (stage && typeof stage !== 'string' && (stage as AlfAnimateCssStateInterface).direction) {
      return (stage as AlfAnimateCssStateInterface).direction;
    }
    return config?.direction;
  });
}
