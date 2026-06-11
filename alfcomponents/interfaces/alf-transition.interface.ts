export interface AlfTransitionBaseInterface {
  /**
   * Duración de la transición.
   * @example '300ms', '0.5s'
   */
  duration?: string;

  /**
   * Curva de animación (timing function).
   * @example 'ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)'
   */
  timingFunction?: string;

  /**
   * Retraso antes de iniciar la transición.
   * @example '100ms'
   */
  delay?: string;

  /**
   * Propiedades a las que se aplica la transición.
   * Por defecto suele ser 'all' o propiedades específicas separadas por comas.
   * @example 'transform, background-color'
   */
  property?: string;
}

export interface AlfTransitionInterface {
  /**
   * Transición por defecto (se aplica cuando se sale de un estado como hover hacia default).
   */
  default?: AlfTransitionBaseInterface;

  /**
   * Transición al entrar en el estado hover.
   */
  hover?: AlfTransitionBaseInterface;

  /**
   * Transición al entrar en el estado focus.
   */
  focus?: AlfTransitionBaseInterface;

  /**
   * Transición al entrar en el estado active.
   */
  active?: AlfTransitionBaseInterface;

  /**
   * Transición al entrar en el estado disabled.
   */
  disabled?: AlfTransitionBaseInterface;
}
