import { Directive, ElementRef, Renderer2, inject, Input, effect, computed, signal } from '@angular/core';
import { AlfColorEnum } from '../../enums';
import { AlfRippleInterface } from '../../interfaces/alf-ripple.interface';
import { ALF_RIPPLE_MATERIAL } from '../../predefined/alf-ripple.predefined';

/**
 * Directiva AlfRipple para efectos de pulsación (Material Design)
 * ✅ Standalone, Zoneless Ready & Signal Driven
 * 
 * Usa @Input() como puente JIT → signal() interno.
 * Motivo: input() signals no se resuelven en JIT (Vitest).
 */
@Directive({
  selector: '[alfRipple]',
  standalone: true
})
export class AlfRippleDirective {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  /**
   * Signal interno que almacena la configuración reactiva.
   */
  private readonly _config = signal<boolean | AlfRippleInterface>(true);

  /**
   * Input decorador como puente JIT → Signal.
   * Compatible con compilación JIT (Vitest) y AOT (producción).
   */
  @Input()
  public set alfRipple(value: boolean | AlfRippleInterface | '') {
    // Si el valor es una cadena vacía (uso directo del atributo), tratar como true
    if (value === '') {
      this._config.set(true);
    } else {
      this._config.set(value);
    }
  }

  /** Normaliza la configuración dinámica aplicando el preset Material */
  private readonly cfg = computed<AlfRippleInterface>(() => {
    const val = this._config();
    
    if (val === true) return ALF_RIPPLE_MATERIAL;
    if (val === false) return { enabled: false };
    
    // Si es un objeto, fusionamos con el preset por defecto
    return { ...ALF_RIPPLE_MATERIAL, ...val };
  });

  /**
   * Efecto reactivo para la escucha de eventos (Injection Context).
   */
  private readonly clickEffect = effect((onCleanup) => {
    const element = this.el.nativeElement;
    element.addEventListener('click', this.handleRippleClick);
    onCleanup(() => element.removeEventListener('click', this.handleRippleClick));
  });

  /**
   * Manejador del evento click (Independiente para evitar nesting)
   */
  private handleRippleClick = (event: MouseEvent): void => {
    const config = this.cfg();
    if (!config.enabled) return;
    this.createRipple(event);
  };

  /**
   * Lógica de creación del ripple con WAAPI
   */
  private createRipple = (event: MouseEvent): void => {
    const element = this.el.nativeElement;
    const config = this.cfg();
    
    const rect = element.getBoundingClientRect();
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

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
      
      const currentPos = window.getComputedStyle(element).position;
      if (currentPos === 'static') {
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
    this.renderer.setStyle(circle, 'pointer-events', 'none');
    
    this.renderer.setStyle(circle, 'background-color', config.color || AlfColorEnum.Black);
    this.renderer.appendChild(rippleHost, circle);

    const anim = circle.animate([
      { transform: 'scale(0)', opacity: 0.35 },
      { transform: `scale(${config.scale || 4})`, opacity: config.opacity ?? 0 }
    ], {
      duration: config.duration || 600,
      easing: 'linear',
      fill: 'forwards'
    });

    anim.onfinish = () => circle.remove();
  };
}
