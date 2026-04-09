/**
 * Interface para reglas de validación de campos de entrada (Inputs)
 */
export interface AlfValidationInterface {
  /** 
   * Longitud máxima permitida 
   */
  maxLength?: number;

  /** 
   * Longitud mínima requerida 
   */
  minLength?: number;

  /** 
   * Expresión regular para validar el formato del contenido 
   * @example '^[0-9]*$' (Solo números)
   */
  pattern?: string;

  /** 
   * Valor máximo permitido (para campos numéricos o fechas) 
   */
  max?: number | string;

  /** 
   * Valor mínimo permitido (para campos numéricos o fechas) 
   */
  min?: number | string;

  /** 
   * Indica si el campo es obligatorio 
   */
  required?: boolean;
}
