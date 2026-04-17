import { Directive, ElementRef, Renderer2, inject, Input, OnDestroy, signal } from '@angular/core';
import { AlfColorVariantEnum, AlfPositionEnum, AlfColorEnum, AlfZIndexEnum, AlfRadiusEnum, AlfShadowEnum } from '../../enums';

/**
 * Interfaz de configuración para el Tooltip.
 */
export interface AlfTooltipConfig {
  readonly text?: string;
  readonly variant?: AlfColorVariantEnum;
  readonly position?: AlfPositionEnum;
  readonly delay?: number;
}

/**
 * Directiva AlfTooltipText para mostrar etiquetas de texto ligeras.
 * Versión Élite: Sin dependencias de SCSS, animaciones WAAPI nativas y rigor técnico estricto.
 */
@Directive({
  selector: '[alfTooltipText]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class AlfTooltipTextDirective implements OnDestroy {
  // Inyecciones modernas (Fix para NG0202 en Vitest)
  private readonly _el = inject(ElementRef<HTMLElement>);
  private readonly _renderer = inject(Renderer2);

  /**
   * Puente para compatibilidad con Vitest/JIT.
   * Alimenta el signal privado '_config'.
   */
  @Input({ transform: (v: AlfTooltipConfig | string) => typeof v === 'string' ? { text: v } : v })
  set alfTooltipText(value: AlfTooltipConfig) {
    this._config.set(value);
  }

  private readonly _config = signal<AlfTooltipConfig | null>(null);

  private _tooltipElement: HTMLElement | null = null;
  private _showTimeout: ReturnType<typeof setTimeout> | null = null;

  // Constantes de estilo estandarizadas (Enums)
  private readonly _OFFSET = 6;
  private readonly _DEFAULT_DELAY = 150;
  private readonly _Z_INDEX = AlfZIndexEnum.Max;
  private readonly _RADIUS = AlfRadiusEnum.Md;
  private readonly _SHADOW = AlfShadowEnum.Lg;
  private readonly _UNIQUE_ID = `alf-tooltip-${Math.random().toString(36).substring(2, 9)}`;

  /**
   * Maneja la entrada del ratón con retardo configurable.
   */
  protected readonly onMouseEnter = (): void => {
    const config = this._config();
    if (!config?.text?.trim()) return;

    const delay = config.delay ?? this._DEFAULT_DELAY;

    this._showTimeout = setTimeout(() => {
      this.show();
    }, delay);
  };

  /**
   * Maneja la salida del ratón limpiando timeouts y ocultando el elemento.
   */
  protected readonly onMouseLeave = (): void => {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }
    this.hide();
  };

  /**
   * Aplica estilos programáticos usando Enums y tokens de diseño.
   */
  private readonly applyTooltipStyles = (variant: AlfColorVariantEnum = AlfColorVariantEnum.Dark): void => {
    if (!this._tooltipElement) return;

    const styles: Record<string, string> = {
      'position': 'fixed',
      'padding': '6px 12px',
      'border-radius': this._RADIUS,
      'font-size': '13px',
      'font-weight': '500',
      'z-index': this._Z_INDEX,
      'pointer-events': 'none',
      'box-shadow': this._SHADOW,
      'white-space': 'nowrap',
      'opacity': '0',
      'transform': 'scale(0.9)',
    };

    const colorMap: Record<string, { bg: string; color: string }> = {
      'primary': { bg: AlfColorEnum.Red600, color: AlfColorEnum.White },
      'secondary': { bg: AlfColorEnum.Gray600, color: AlfColorEnum.White },
      'success': { bg: AlfColorEnum.Green600, color: AlfColorEnum.White },
      'danger': { bg: AlfColorEnum.Red600, color: AlfColorEnum.White },
      'warning': { bg: AlfColorEnum.Yellow400, color: AlfColorEnum.Black },
      'info': { bg: AlfColorEnum.Blue600, color: AlfColorEnum.White },
      'light': { bg: AlfColorEnum.Gray100, color: AlfColorEnum.Gray800 },
      'dark': { bg: AlfColorEnum.Black, color: AlfColorEnum.White },
    };

    const variantStr = (variant as string).replace(/^(outline-|ghost-|soft-|crystal-|depth-)/, '');
    const colors = colorMap[variantStr] || colorMap['dark'];

    styles['background'] = colors.bg;
    styles['color'] = colors.color;

    Object.entries(styles).forEach(([prop, val]) => {
      this._renderer.setStyle(this._tooltipElement, prop, val);
    });
  };

  /**
   * Crea y muestra el tooltip con animación WAAPI nativa.
   */
  private readonly show = (): void => {
    const config = this._config();
    if (!config) return;

    this._tooltipElement = this._renderer.createElement('div');
    this._renderer.setAttribute(this._tooltipElement, 'id', this._UNIQUE_ID);
    this._renderer.setAttribute(this._tooltipElement, 'role', 'tooltip');
    this._renderer.setProperty(this._tooltipElement, 'textContent', config.text);

    this._renderer.setAttribute(this._el.nativeElement, 'aria-describedby', this._UNIQUE_ID);

    this.applyTooltipStyles(config.variant);
    this._renderer.appendChild(document.body, this._tooltipElement);
    this.positionTooltip(config.position || AlfPositionEnum.Top);

    this._tooltipElement?.animate([
      { opacity: 0, transform: 'scale(0.9) translateY(4px)' },
      { opacity: 1, transform: 'scale(1) translateY(0)' }
    ], {
      duration: 200,
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      fill: 'forwards'
    });
  };

  /**
   * Oculta y destruye el tooltip.
   */
  private readonly hide = (): void => {
    if (!this._tooltipElement) return;

    this._renderer.removeAttribute(this._el.nativeElement, 'aria-describedby');

    const anim = this._tooltipElement.animate([
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(0.95)' }
    ], {
      duration: 150,
      easing: 'ease-in',
      fill: 'forwards'
    });

    anim.onfinish = () => {
      if (this._tooltipElement) {
        this._renderer.removeChild(document.body, this._tooltipElement);
        this._tooltipElement = null;
      }
    };
  };

  /**
   * Posicionamiento preciso relativo al viewport.
   */
  private readonly positionTooltip = (position: AlfPositionEnum): void => {
    if (!this._tooltipElement) return;

    const hostRect = this._el.nativeElement.getBoundingClientRect();
    const tooltipRect = this._tooltipElement.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case AlfPositionEnum.Top:
        top = hostRect.top - tooltipRect.height - this._OFFSET;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case AlfPositionEnum.Bottom:
        top = hostRect.bottom + this._OFFSET;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case AlfPositionEnum.Left:
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - this._OFFSET;
        break;
      case AlfPositionEnum.Right:
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + this._OFFSET;
        break;
    }

    const padding = 8;
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));

    this._renderer.setStyle(this._tooltipElement, 'top', `${top}px`);
    this._renderer.setStyle(this._tooltipElement, 'left', `${left}px`);
  };

  ngOnDestroy(): void {
    if (this._showTimeout) clearTimeout(this._showTimeout);

    // Limpieza síncrona inmediata para evitar fugas en destrucción
    if (this._tooltipElement) {
      if (this._tooltipElement.parentNode) {
        this._renderer.removeChild(document.body, this._tooltipElement);
      }
      this._tooltipElement = null;
    }
  }

}
