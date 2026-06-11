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



  protected readonly resolvedStage = computed(() => {
    const config = this.alfAnimations();
    if (!config) return undefined;
    return this.isExiting() ? config.exitStage : (config.enterStage || config.type);
  });

  protected readonly resolvedClasses = computed(() => {
    const stage = this.resolvedStage();
    if (!stage) return [];
    
    let stageStr = typeof stage === 'string' ? stage : (stage as AlfAnimateCssStateInterface).name || (stage as AlfAnimateCssStateInterface).type;
    if (!stageStr || stageStr === 'none') return [];
    
    const classes = ['animate__animated'];
    if (stageStr.includes('animate__')) {
      classes.push(...stageStr.split(' ').filter(c => c.trim()));
    } else {
      classes.push(`animate__${stageStr}`);
    }
    
    const config = this.alfAnimations();
    if (config?.infinite && !this.isExiting()) {
      classes.push('animate__infinite');
    }
    
    return Array.from(new Set(classes)); // Ensure unique
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

  private previousClasses: string[] = [];

  private readonly _effect = effect(() => {
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    // Handle class substitution for Animate.css
    const newClasses = this.resolvedClasses();
    
    // Remove old classes that are not in newClasses
    this.previousClasses.forEach(cls => {
      if (!newClasses.includes(cls)) el.classList.remove(cls);
    });
    
    // Add new classes
    newClasses.forEach(cls => {
      if (!this.previousClasses.includes(cls)) el.classList.add(cls);
    });
    
    this.previousClasses = [...newClasses];

    // Handle CSS variables
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
