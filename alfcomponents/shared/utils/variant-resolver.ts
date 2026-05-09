import { AlfColorVariantEnum } from '@alfcomponents/enums';

/**
 * Resuelve un valor (string o enum) a una variante de AlfColorVariantEnum.
 * Soporta búsqueda por valor y por clave (case-insensitive).
 */
export const resolveAlfColorVariant = (v: any): AlfColorVariantEnum => {
  if (!v) return AlfColorVariantEnum.Default;
  
  if (typeof v === 'string') {
    // 1. Buscamos si el string ya es un VALOR del Enum (ej: "outline-primary")
    const values = Object.values(AlfColorVariantEnum) as string[];
    if (values.includes(v)) return v as AlfColorVariantEnum;

    // 2. Buscamos por CLAVE de forma insensible a mayúsculas (ej: "PrimaryOutline")
    const keys = Object.keys(AlfColorVariantEnum);
    const foundKey = keys.find(k => k.toLowerCase() === v.toLowerCase());
    
    if (foundKey) {
      return (AlfColorVariantEnum as any)[foundKey];
    }

    return AlfColorVariantEnum.Default;
  }
  return v;
};
