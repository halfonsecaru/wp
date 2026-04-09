# Enums de AlfComponents

Esta librería utiliza **Enums** extensivamente para garantizar la consistencia visual, la seguridad de tipos (type safety) y facilitar el mantenimiento del sistema de diseño.

## ¿Por qué Enums?

- **Consistencia**: Evita "números mágicos" o strings arbitrarios. Si usamos `AlfPxEnum.None`, todos los componentes tendrán exactamente el mismo espaciado.
- **Type Safety**: TypeScript te avisará si intentas usar un valor no permitido.
- **Auto-completado**: Tu IDE te sugerirá los valores disponibles, facilitando el desarrollo.

## Enums Principales

Los enums están organizados en `projects/alf-components/src/lib/shared/enums`.

### 🎨 Colores
- **`AlfColorEnum`**: Paleta completa de colores (Tailwind-like).
  - Incluye colores base (`White`, `Black`, `Transparent`).
  - Escalas de grises y colores semánticos (`Primary`, `Secondary`, `Success`, etc.).
- **`AlfColorVariantEnum`**: Variantes semánticas para componentes.
  - Sólidos: `Primary`, `Secondary`...
  - Outlines: `PrimaryOutline`, `SecondaryOutline`...
  - Especiales: `Ghost`, `Soft`, `Crystal`...

### 📏 Dimensiones y Espaciado
- **`AlfPxEnum`**: Valores en píxeles para bordes, anchos, altos, etc. (Renombrado de `border.ts`).
- **`AlfRemEnum`**: Valores en unidades relativas `rem` para espaciados, fuentes y tamaños.
- **`AlfSizeEnum`**: Tamaños talle camiseta (`Xs`, `Sm`, `Md`, `Lg`, `Xl`).

### 🔲 Bordes
- **`AlfBorderStyleEnum`**: Estilos de borde (`Solid`, `Dashed`, `Hidden`...).
- **`AlfRadiusEnum`**: Radios de borde (`Sm`, `Md`, `Lg`, `Full`, `None`).

### 📝 Tipografía
- **`AlfFontSizeEnum`**: Tamaños de fuente (`Xs`, `Sm`, `Base`, `Lg`...).
- **`AlfFontWeightEnum`**: Pesos de fuente (`Thin`, `Normal`, `Bold`...).
- **`AlfLineHeightEnum`**: Alturas de línea (`Tight`, `Normal`, `Relaxed`...).

### 🏗️ Layout (Flexbox & Grid)
- **`AlfDisplayEnum`**: `Flex`, `Grid`, `Block`, `None`...
- **`AlfFlexDirectionEnum`**: `Row`, `Column`, `RowReverse`...
- **`AlfJustifyContentEnum`**: `Start`, `Center`, `SpaceBetween`...
- **`AlfAlignItemsEnum`**: `Start`, `Center`, `Stretch`...
- **`AlfCssPositionEnum`**: `Absolute`, `Relative`, `Fixed`...

### 📍 Posicionamiento (Popovers/Tooltips)
- **`AlfPositionEnum`**: `Top`, `Bottom`, `LeftStart`, `RightEnd`... (Usado para placement).

## Ejemplos de Uso

### ✅ Correcto

```typescript
import { AlfButtonInterface } from 'alf-components';
import { AlfColorEnum, AlfPxEnum, AlfRadiusEnum } from 'alf-components';

const myButtonConfig: AlfButtonInterface = {
  // Usa el Enum para padding
  padding: {
    default: {
      padding: AlfPxEnum.Px16 // Valor controlado
    }
  },
  // Usa el Enum para bordes
  border: {
    default: {
      borderRadius: AlfRadiusEnum.Md, // Consistente con el sistema
      borderColor: AlfColorEnum.Blue500
    }
  }
};
```

### ❌ Incorrecto (Evitar)

```typescript
const badConfig = {
  // ⚠️ Evita strings hardcodeados si existe un Enum
  padding: {
    default: {
      padding: '16px' // No type-safe, propenso a inconsistencias
    }
  },
  border: {
    default: {
      borderRadius: '4px', // ¿Es Md? ¿Sm? Arriesgado.
      borderColor: '#3b82f6' // Usar AlfColorEnum.Blue500 es mejor
    }
  }
};
```

## Nota sobre `as any`

En raras ocasiones, si necesitas un valor totalmente personalizado que no existe en el sistema de diseño (ej. "33.5px"), podrías verte tentado a usar `as any`.
**Recomendación**: Si un valor se repite, añádelo al Enum correspondiente en lugar de usar `any`. Mantén el sistema creciendo contigo.
