
import { AlfLoadingInterface } from '../../interfaces/alf-loading.interface';
import {
  AlfLoadingModeEnum,
  AlfSpinnerStrokeWidthEnum,
  AlfZIndexEnum,
  AlfColorEnum,
  AlfOpacityEnum
} from '../../enums';
import { ComponentRef, Directive, effect, ElementRef, inject, Input, OnDestroy, Renderer2, signal, ViewContainerRef } from '@angular/core';
import { AlfSpinner } from '@alfcomponents/components/simple/alf-spinner/alf-spinner';

/**
 * @directive AlfLoadingDirective
 * @description Directiva de carga unificada para la librería AlfComponents.
 * Versión Élite: Máxima compatibilidad JIT/Vitest, animaciones WAAPI y rigor técnico.
 */
@Directive({
  selector: '[alfLoading]',
  standalone: true,
})
export class AlfLoadingDirective implements OnDestroy {
  // Inyecciones estrictas (Rigor Técnico)
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _el = inject(ElementRef<HTMLElement>);
  private readonly _renderer = inject(Renderer2);

  /**
   * Puente para compatibilidad con Vitest/JIT.
   */
  @Input({ alias: 'alfLoading' })
  public set configInput(value: boolean | AlfLoadingInterface) {
    this._config.set(typeof value === 'boolean' ? { isLoading: value } : value);
  }

  /**
   * Grosor opcional del trazo.
   */
  @Input({ alias: 'alfLoadingThickness' })
  public set thicknessInput(value: AlfSpinnerStrokeWidthEnum | undefined) {
    this._thickness.set(value);
  }

  // Signals internos (Arquitectura Reactiva)
  private readonly _config = signal<AlfLoadingInterface>({ isLoading: false });
  private readonly _thickness = signal<AlfSpinnerStrokeWidthEnum | undefined>(undefined);

  // Referencias de elementos creados dinámicamente
  private _spinnerRef?: ComponentRef<AlfSpinner>;
  private _overlayElement?: HTMLElement;
  private _messageElement?: HTMLElement;

  /**
   * Efecto reactivo para gestionar el DOM.
   */
  protected readonly loadingEffect = effect(() => {
    const config = this._config();
    this.toggleLoading(config.isLoading ?? false);
  });

  /**
   * Maneja la transición de estados.
   */
  private readonly toggleLoading = (isLoading: boolean): void => {
    if (isLoading) {
      this.showLoading();
    } else {
      this.hideLoading();
    }
  };

  /**
   * Crea e inyecta el entorno de carga con animaciones WAAPI.
   */
  private readonly showLoading = (): void => {
    if (this._spinnerRef || this._overlayElement) return;

    const config = this._config();
    const mode = config.mode || AlfLoadingModeEnum.Inline;
    const thickness = this._thickness() || config.spinnerStrokeWidth || AlfSpinnerStrokeWidthEnum.Base;

    // 1. Preparar el host
    this._renderer.setStyle(this._el.nativeElement, 'position', 'relative');
    this._renderer.setStyle(this._el.nativeElement, 'pointer-events', 'none');

    // 2. Crear Overlay si el modo lo requiere
    if (mode === AlfLoadingModeEnum.Overlay || mode === AlfLoadingModeEnum.Global) {
      this.createOverlay(config);
    }

    // 3. Crear el Spinner
    this._spinnerRef = this._viewContainerRef.createComponent(AlfSpinner);
    this._spinnerRef.setInput('strokeWidth', thickness);
    if (config.spinnerColor) this._spinnerRef.setInput('color', config.spinnerColor);
    if (config.spinnerSize) this._spinnerRef.setInput('size', config.spinnerSize);

    // 4. Crear Mensaje si existe
    if (config.message) {
      this.createMessage(config.message);
    }

    // 5. Ensamblaje y Animación
    const targetContainer = this._overlayElement || this._el.nativeElement;
    this._renderer.appendChild(targetContainer, this._spinnerRef.location.nativeElement);

    if (this._messageElement) {
      this._renderer.appendChild(targetContainer, this._messageElement);
    }

    this.animateEntry();
  };

  /**
   * Crea la capa de overlay programáticamente.
   */
  private readonly createOverlay = (config: AlfLoadingInterface): void => {
    this._overlayElement = this._renderer.createElement('div');
    const opacity = config.overlayOpacity || AlfOpacityEnum.Opacity60;

    const styles: Record<string, string> = {
      'position': config.mode === AlfLoadingModeEnum.Global ? 'fixed' : 'absolute',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%',
      'background': AlfColorEnum.Black,
      'opacity': '0', // Inicial para WAAPI
      'z-index': config.mode === AlfLoadingModeEnum.Global ? AlfZIndexEnum.Max : AlfZIndexEnum.Above,
      'display': 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'center',
      'gap': '12px',
      'transition': 'none',
      'overflow': 'hidden'
    };

    if (config.useBlur) {
      styles['backdrop-filter'] = 'blur(4px)';
      styles['-webkit-backdrop-filter'] = 'blur(4px)';
    }

    Object.entries(styles).forEach(([prop, val]) => {
      this._renderer.setStyle(this._overlayElement, prop, val);
    });

    this._renderer.appendChild(this._el.nativeElement, this._overlayElement);

    // Aplicar opacidad real vía WAAPI
    this._overlayElement?.animate([
      { opacity: 0 },
      { opacity: opacity } // Ya es un valor decimal string como '0.6'
    ], { duration: 250, fill: 'forwards', easing: 'ease-out' });
  };

  /**
   * Crea el elemento de texto para el mensaje.
   */
  private readonly createMessage = (text: string): void => {
    this._messageElement = this._renderer.createElement('span');
    this._renderer.setProperty(this._messageElement, 'textContent', text);

    const styles: Record<string, string> = {
      'color': AlfColorEnum.White,
      'font-size': '14px',
      'font-weight': '500',
      'margin-top': '8px',
      'text-shadow': '0 1px 2px rgba(0,0,0,0.5)',
      'max-width': '100%',
      'padding': '0 8px',
      'box-sizing': 'border-box',
      'white-space': 'nowrap',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    };

    Object.entries(styles).forEach(([prop, val]) => {
      this._renderer.setStyle(this._messageElement, prop, val);
    });
  };

  /**
   * Ejecuta animaciones de entrada WAAPI.
   */
  private readonly animateEntry = (): void => {
    const spinner = this._spinnerRef?.location.nativeElement;
    if (spinner) {
      spinner.animate([
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1 }
      ], { duration: 300, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    }
  };

  /**
   * Elimina el estado de carga con animaciones de salida.
   */
  private readonly hideLoading = (): void => {
    if (!this._spinnerRef && !this._overlayElement) return;

    this._renderer.removeStyle(this._el.nativeElement, 'pointer-events');

    const elementsToAnimate = [this._overlayElement, this._spinnerRef?.location.nativeElement].filter(Boolean) as HTMLElement[];

    if (elementsToAnimate.length === 0) {
      this.cleanup();
      return;
    }

    const fadeOut = elementsToAnimate[0].animate([
      { opacity: 1 },
      { opacity: 0 }
    ], { duration: 200, easing: 'ease-in' });

    fadeOut.onfinish = () => this.cleanup();
  };

  /**
   * Limpieza final del DOM y referencias.
   */
  private readonly cleanup = (): void => {
    if (this._spinnerRef) {
      this._spinnerRef.destroy();
      this._spinnerRef = undefined;
    }

    if (this._overlayElement) {
      if (this._overlayElement.parentNode) {
        this._renderer.removeChild(this._el.nativeElement, this._overlayElement);
      }
      this._overlayElement = undefined;
    }

    if (this._messageElement) {
      this._messageElement = undefined;
    }
  };


  ngOnDestroy(): void {
    this.cleanup();
  }
}

