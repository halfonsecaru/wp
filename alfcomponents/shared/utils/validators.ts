/**
 * Colección de expresiones regulares estándar para validaciones
 */
export const ALF_REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  NUMBER: /^[0-9]*$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
};

/**
 * Tipo para el resultado de una validación
 */
export interface AlfValidationResult {
  isValid: boolean;
  code?: string;
  error?: string; // Mantener por compatibilidad o mensajes ad-hoc
}

/**
 * Validador de Campo Requerido
 */
export const alfRequiredValidator = (value: string): AlfValidationResult => {
  const isValid = value !== undefined && value !== null && value.toString().trim() !== '';
  return {
    isValid,
    code: 'validatorRequired'
  };
};

/**
 * Validador de Longitud Máxima
 */
export const alfMaxLengthValidator = (max: number) => (value: string): AlfValidationResult => {
  if (!value) return { isValid: true };
  const isValid = value.length <= max;
  return {
    isValid,
    code: 'validatorMaxLength'
  };
};

/**
 * Validador de Email
 */
export const alfEmailValidator = (value: string): AlfValidationResult => {
  if (!value) return { isValid: true };
  
  const isValid = ALF_REGEX.EMAIL.test(value);
  return {
    isValid,
    code: 'validatorEmail'
  };
};

/**
 * Validador de Longitud Mínima
 */
export const alfMinLengthValidator = (min: number) => (value: string): AlfValidationResult => {
  if (!value) return { isValid: true };
  const isValid = value.length >= min;
  return {
    isValid,
    code: 'validatorMinLength'
  };
};

/**
 * Validador de Valor Mínimo (Números)
 */
export const alfMinValidator = (min: number) => (value: string): AlfValidationResult => {
  if (!value) return { isValid: true };
  const num = parseFloat(value);
  const isValid = !isNaN(num) && num >= min;
  return {
    isValid,
    code: 'validatorMin'
  };
};

/**
 * Validador de Valor Máximo (Números)
 */
export const alfMaxValidator = (max: number) => (value: string): AlfValidationResult => {
  if (!value) return { isValid: true };
  const num = parseFloat(value);
  const isValid = !isNaN(num) && num <= max;
  return {
    isValid,
    code: 'validatorMax'
  };
};

/**
 * Validador de URL
 */
export const alfUrlValidator = (value: string): AlfValidationResult => {
  if (!value) return { isValid: true };
  const isValid = ALF_REGEX.URL.test(value);
  return {
    isValid,
    code: 'validatorUrl'
  };
};

/**
 * Validador de Patrón (Regex)
 */
export const alfPatternValidator = (pattern: string | RegExp) => (value: string): AlfValidationResult => {
  if (!value) return { isValid: true };
  const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
  const isValid = regex.test(value);
  return {
    isValid,
    code: 'validatorPattern'
  };
};

