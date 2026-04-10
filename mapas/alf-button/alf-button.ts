import { Component, input, output, computed, ViewEncapsulation, inject, ChangeDetectionStrategy } from '@angular/core';

import { Ripple } from '../../../shared/directives/ripple/ripple';
import { TooltipText } from '../../../shared/directives/tooltip-text/tooltip-text';
import { AlfButtonInterface } from './interfaces/alfButton';
import { generateStyleString } from '../../../shared/utils/style-utils';
import { deepMerge } from '../../../shared/utils/deep-merge';

import { AlfButtonContent } from './alf-button-content';
import { AlfDefaultSolidButtons } from '../../../default-theme/button-theme';
import { AlfThemeService } from '../../../shared/theming/alf-theme.service';
import { ALF_THEME } from '../../../shared/theming/alf-theme.token';

/**
 * Componente alf-button
 * Botón reutilizable con soporte para diferentes estados y configuraciones
 */
@Component({
  selector: 'alf-button',
  standalone: true,
  imports: [Ripple, TooltipText, AlfButtonContent],
  templateUrl: './alf-button.html',
  styleUrl: './alf-button.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlfButton {
  // ========================================
  // INPUTS - Propiedades específicas del botón
  // ========================================

  /**
   * Configuración completa del botón
   * Incluye estilos, comportamiento, iconos, etc.
   * Si no se proporciona, usa la configuración por defecto (Primary Solid)
   */
  config = input<AlfButtonInterface>(AlfDefaultSolidButtons()['ACCEPT']);

  // ========================================
  // OUTPUTS - Eventos del botón
  // ========================================

  /**
   * Evento emitido al hacer click
   */
  clicked = output<MouseEvent>();

  // ========================================
  // THEME & COMPUTED
  // ========================================

  private themeService = inject(AlfThemeService); // Inicializa las variables CSS del tema globalmente

  /**
   * Configuración efectiva fusionando el input con el tema global
   */
  protected effectiveConfig = computed(() => {
    const userInput = this.config();
    const buttonTheme = this.themeService.currentTheme().components.button;

    // Determinar variante a usar (del input o del tema por defecto)
    const variant = userInput.variant || buttonTheme.defaultVariant;

    // Obtener configuración base de la variante del tema si existe
    const themeVariantConfig = buttonTheme.variants?.[variant] || {};

    // Merge profundo: Input tiene prioridad sobre Tema y mezcla recursivamente (deep merge)
    return deepMerge(themeVariantConfig, userInput);
  });

  /**
   * Genera las variables CSS necesarias para los mixins SCSS
   * Convierte las propiedades del config en variables CSS custom properties
   */
  protected styleString = computed(() => {
    return generateStyleString(this.effectiveConfig(), 'alf-btn');
  });

  protected animationClass = computed(() => {
    const anim = this.effectiveConfig().animation;
    return anim?.in ? `alf-animation-${anim.in}` : '';
  });

  // ========================================
  // MÉTODOS - Manejadores de eventos
  // ========================================

  /**
   * Maneja el evento click del botón
   */
  protected handleClick = (event: MouseEvent): void => {
    const cfg = this.effectiveConfig();
    const isLoading = typeof cfg.loading === 'function' ? cfg.loading() : (cfg.loading ?? false);

    if (isLoading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.clicked.emit(event);
  };
}
