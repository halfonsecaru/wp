/**
 * Enum para estados operacionales de componentes
 * Representa el flujo de trabajo (Cargando, Éxito, Error).
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * status: AlfStatusEnum.LOADING // Muestra un spinner o estado de carga
 * ```
 */
export enum AlfStatusEnum {
  DEFAULT = 'default',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  DISABLED = 'disabled'
}
