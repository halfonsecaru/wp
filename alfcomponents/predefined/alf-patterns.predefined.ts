import { AlfPatternTypeEnum } from '../enums';

/**
 * Mapa interno de expresiones regulares
 */
const PATTERNS_MAP: Record<AlfPatternTypeEnum, string> = {
  [AlfPatternTypeEnum.Email]: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$',
  [AlfPatternTypeEnum.OnlyNumbers]: '^[0-9]*$',
  [AlfPatternTypeEnum.OnlyLetters]: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$',
  [AlfPatternTypeEnum.Phone]: '^[0-9]{9,15}$',
  [AlfPatternTypeEnum.Dni]: '^[0-9]{8}[A-Z]$',
  [AlfPatternTypeEnum.Nie]: '^[XYZ][0-9]{7}[A-Z]$',
  [AlfPatternTypeEnum.IbanEs]: '^ES[0-9]{22}$',
  [AlfPatternTypeEnum.Url]: '^(http|https):\\/\\/[^\\s$.?#].[^\\s]*$',
  [AlfPatternTypeEnum.StrongPassword]: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
};

/**
 * Obtiene una expresión regular predefinida por su tipo
 * @param type Tipo de patrón deseado (AlfPatternTypeEnum)
 * @returns El string de la expresión regular
 */
export function getAlfPattern(type: AlfPatternTypeEnum): string {
  return PATTERNS_MAP[type] || '';
}

/**
 * Exportación de los patrones para uso directo si se desea
 */
export const ALF_PATTERNS = PATTERNS_MAP;
