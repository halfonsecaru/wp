import { Directive, ElementRef, Renderer2, inject, Input, effect, computed, signal } from '@angular/core';
import { AlfRippleInterface } from '../../interfaces/alf-ripple.interface';
import { ALF_RIPPLE_DEFAULT } from '../../base/defaultVariants';


/**
 * Directiva AlfRipple "Pure Silk"
 * ✅ Animación de 1000ms ultra suave.
 * ✅ Escalado dinámico para cubrir toda la superficie.
 */
@Directive({
  selector: '[alfRipple]',
  standalone: true
})
export class AlfRippleDirective {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  private readonly _config = signal<boolean | AlfRippleInterface>(true);

  @Input()
  public set alfRipple(value: boolean | AlfRippleInterface | '') {
    if (value === '') {
      this._config.set(true);
    } else {
      this._config.set(value);
    }
  }

  private readonly cfg = computed<AlfRippleInterface>(() => {
    const val = this._config();
    if (val === true) return ALF_RIPPLE_DEFAULT;
    if (val === false) return { enabled: false };
    return { ...ALF_RIPPLE_DEFAULT, ...val };

  });

  private readonly clickEffect = effect((onCleanup) => {
    const element = this.el.nativeElement;
    element.addEventListener('mousedown', this.handleRippleClick);
    onCleanup(() => element.removeEventListener('mousedown', this.handleRippleClick));
  });

  private handleRippleClick = (event: MouseEvent): void => {
    const config = this.cfg();
    if (!config.enabled) return;
    this.createRipple(event);
  };

  private createRipple = (event: MouseEvent): void => {
    const element = this.el.nativeElement;
    const config = this.cfg();
    const rect = element.getBoundingClientRect();
    
    // Diámetro basado en la diagonal para asegurar cobertura total
    const diameter = Math.sqrt(rect.width ** 2 + rect.height ** 2) * 2;
    const radius = diameter / 2;

    const color = config.color || 'rgba(0,0,0,0.1)';

    let rippleHost = element.querySelector('.alf-ripple-host');
    if (!rippleHost) {
      rippleHost = this.renderer.createElement('div');
      this.renderer.addClass(rippleHost, 'alf-ripple-host');
      this.renderer.setStyle(rippleHost, 'position', 'absolute');
      this.renderer.setStyle(rippleHost, 'inset', '0');
      this.renderer.setStyle(rippleHost, 'overflow', 'hidden');
      this.renderer.setStyle(rippleHost, 'border-radius', 'inherit');
      this.renderer.setStyle(rippleHost, 'pointer-events', 'none');
      this.renderer.setStyle(rippleHost, 'z-index', '0');

      if (window.getComputedStyle(element).position === 'static') {
        this.renderer.setStyle(element, 'position', 'relative');
      }
      this.renderer.appendChild(element, rippleHost);
    }

    const circle = this.renderer.createElement('span');
    const x = event.clientX - rect.left - radius;
    const y = event.clientY - rect.top - radius;

    this.renderer.setStyle(circle, 'width', `${diameter}px`);
    this.renderer.setStyle(circle, 'height', `${diameter}px`);
    this.renderer.setStyle(circle, 'left', `${x}px`);
    this.renderer.setStyle(circle, 'top', `${y}px`);
    this.renderer.setStyle(circle, 'position', 'absolute');
    this.renderer.setStyle(circle, 'border-radius', '50%');
    this.renderer.setStyle(circle, 'background-color', color);
    this.renderer.setStyle(circle, 'pointer-events', 'none');
    this.renderer.appendChild(rippleHost, circle);

    // Animación de 1000ms con curva de Seda Suprema (Ultra Suave)
    const anim = circle.animate([
      { transform: 'scale(0)', opacity: 0.35 },
      { transform: 'scale(1)', opacity: 0 }
    ], {
      duration: config.duration || 1000,
      easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)', // Curva balanceada de alta gama
      fill: 'forwards'
    });

    anim.onfinish = () => circle.remove();
  };
}
