/**
 * Interface AlfTransitionsBaseInterface
 * Representa las propiedades básicas para controlar la transición reactiva de un estado.
 */
export interface AlfTransitionsBaseInterface {
  /**
   * Duración de la transición (ej. '700ms', '0.2s', '2s').
   * @default '700ms'
   */
  transitionDuration?: string;

  /**
   * Curva de aceleración (ej. 'ease-in-out', 'linear', 'cubic-bezier(0.4, 0, 0.2, 1)').
   * @default 'cubic-bezier(0.4, 0, 0.2, 1)'
   */
  transitionTiming?: string;
}

/**
 * Interface AlfTransitionsInterface
 * Contenedor completo para el manejo de transiciones en múltiples estados interactivos.
 * Sigue la arquitectura dictada de: default, hover, active, focus, disabled.
 */
export interface AlfTransitionsInterface {
  default?: AlfTransitionsBaseInterface;
  hover?: AlfTransitionsBaseInterface;
  active?: AlfTransitionsBaseInterface;
  focus?: AlfTransitionsBaseInterface;
  disabled?: AlfTransitionsBaseInterface;
}
