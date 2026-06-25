import { Directive, ElementRef, Renderer2, inject, Input, effect, computed, signal } from '@angular/core';
import { AlfRippleInterface } from '../../interfaces/alf-ripple.interface';
import { AlfColorEnum, AlfColorVariantEnum } from '@alfcomponents/enums';
import { resolveAlfColorVariant } from '@alfcomponents/shared';
/**
 * Resuelve matemáticamente el color base ideal para el efecto Ripple, asegurando
 * siempre un contraste óptimo (WCAG) sobre el fondo de la variante elegida.
 *
 * @param input Variante actual.
 * @returns El color calculado para la expansión del Ripple.
 */
export const visualRippleColorBase = (input: { type: AlfColorVariantEnum }): AlfColorEnum => {
    const resolved = resolveAlfColorVariant(input.type);
    const variantName = resolved.toLowerCase();

    const isOutline = variantName.includes('outline');
    const isSoft = variantName.includes('soft');
    const isGhost = variantName.includes('ghost');
    const isCrystal = variantName.includes('crystal');

    // 1. CASO: Fondos Claros o Transparentes (Outline, Soft, Ghost, Crystal)
    // El ripple debe ser oscuro y del color de la variante para contraste.
    if (isOutline || isSoft || isGhost || isCrystal) {
        const baseColor = variantName.split('-').pop() || '';
        switch (baseColor) {
            case 'primary': return AlfColorEnum.Blue700;
            case 'success': return AlfColorEnum.Green700;
            case 'danger': return AlfColorEnum.Red700;
            case 'warning': return AlfColorEnum.Orange800;
            case 'info': return AlfColorEnum.Cyan800;
            default: return AlfColorEnum.Gray700;
        }
    }

    // 2. CASO: Fondos Sólidos Claros (Light, White, Warning, Info)
    // El ripple debe ser oscuro (Gris o color profundo).
    const isLightVariant =
        variantName.includes('light') ||
        variantName.includes('white') ||
        variantName.includes('warning') ||
        variantName.includes('info');

    if (isLightVariant) {
        return AlfColorEnum.Gray700;
    }

    // 3. CASO: Fondos Sólidos Oscuros (Primary, Success, Danger, Dark, Secondary, 3D)
    // En fondos oscuros, un ripple oscuro no se ve. Usamos Blanco (la directiva aplica 0.35 opacity).
    return AlfColorEnum.White;
};


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

    const ALF_RIPPLE_DEFAULT: AlfRippleInterface = {
      color: AlfColorEnum.White,
      duration: 1000,
      enabled: true
    };

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

      const computedStyle = (typeof window !== 'undefined' && window.getComputedStyle) ? window.getComputedStyle(element) : null;
      if (computedStyle && computedStyle.position === 'static') {
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
