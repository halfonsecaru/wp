import { AlfInputTypeEnum } from '@alfcomponents/enums';

/**
 * Determina si el label debe flotar hacia arriba.
 * Flota cuando hay foco, cuando hay valor, o cuando el tipo es number (siempre muestra placeholder).
 */
export const shouldLabelFloat = (
  focused: boolean,
  value: string,
  type?: AlfInputTypeEnum,
): boolean => focused || value.length > 0 || type === AlfInputTypeEnum.Number;

/**
 * Resuelve el atributo type HTML real para el elemento input nativo.
 * El tipo 'textarea' no es un type HTML válido, se trata como elemento separado.
 */
export const resolveInputTypeAttr = (type?: AlfInputTypeEnum): string => {
  if (!type || type === AlfInputTypeEnum.Textarea) return 'text';
  return type;
};
