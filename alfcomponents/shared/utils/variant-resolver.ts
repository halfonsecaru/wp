import { AlfColorVariantEnum } from '@alfcomponents/enums';

/**
 * Resuelve un valor (string o enum) a una variante de AlfColorVariantEnum.
 * Soporta búsqueda por valor y por clave (case-insensitive).
 */
export const resolveAlfColorVariant = (v: any): AlfColorVariantEnum => {
  if (!v) return AlfColorVariantEnum.Default;
  
  if (typeof v === 'string') {
    // 1. Buscamos si el string ya es un VALOR del Enum (ej: "crystal-primary")
    const values = Object.values(AlfColorVariantEnum) as string[];
    if (values.includes(v)) return v as AlfColorVariantEnum;

    // 2. Buscamos por CLAVE de forma insensible a mayúsculas o guiones (ej: "PrimaryCrystal")
    const keys = Object.keys(AlfColorVariantEnum);
    const cleanV = v.toLowerCase().replace(/[-_]/g, '');
    let foundKey = keys.find(k => k.toLowerCase().replace(/[-_]/g, '') === cleanV);

    // 3. Soporte para orden invertido con guión (ej: "success-crystal" -> "crystal-success")
    if (!foundKey && v.includes('-')) {
      const parts = v.split('-');
      if (parts.length === 2) {
        const reversed = `${parts[1]}-${parts[0]}`;
        if (values.includes(reversed)) {
          return reversed as AlfColorVariantEnum;
        }
      }
    }

    if (foundKey) {
      return (AlfColorVariantEnum as any)[foundKey];
    }

    return AlfColorVariantEnum.Default;
  }
  return v;
};
