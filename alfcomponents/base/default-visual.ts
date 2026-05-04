import { AlfColorVariantEnum } from '@alfcomponents/enums';
import { MainVisualStyleInterface } from '@alfcomponents/interfaces';
import { resolveVariantDefinitions } from './variantes/main-variants-selection';

/**
 * Fábrica principal de estilos visuales.
 * Resuelve cualquier configuración basada en variantes individuales.
 * Delega toda la lógica pesada en el motor de variantes unificado (Elite).
 */
export const resolveDefaultVisual = (
  colorVariant?: AlfColorVariantEnum
): MainVisualStyleInterface => {
  
  // 1. Resolver la variante final (Default por defecto)
  const targetVariant = colorVariant || AlfColorVariantEnum.Default;

  // 2. Obtener la definición completa del motor Élite
  // El motor garantiza que todas las dimensiones (bg, border, typo, etc.) estén pobladas.
  return resolveVariantDefinitions(targetVariant) as MainVisualStyleInterface;
};
