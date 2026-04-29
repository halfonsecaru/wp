# AlfCheckbox

Componente de checkbox élite para la librería AlfComponents. Ofrece un diseño premium con múltiples variantes visuales, animaciones fluidas y soporte completo para internacionalización.

## Características

- 3 Estilos de Interacción: Elegant (Neumórfico), Standard (Limpio), Moving (Expansivo).
- 5 Familias Visuales: Solid, Outlined, Standard, Soft, Crystal.
- Soporte para Two-way binding (`checked`, `indeterminate`).
- Sistema de validación (helperText, error).
- Soporte multilingüe y accesibilidad WAI-ARIA.

## Uso Básico

```html
<alf-checkbox 
  [(checked)]="isChecked"
  label="Acepto los términos"
  variant="SolidPrimary"
>
</alf-checkbox>
```

## Propiedades

| Propiedad | Tipo | Descripción |
|---|---|---|
| `variant` | `string \| AlfColorVariantEnum` | Variante de color y estilo (ej: 'OutlineSuccess') |
| `config` | `AlfCheckboxInterface` | Configuración completa del componente |
| `checked` | `boolean` (model) | Estado de selección |
| `indeterminate` | `boolean` (model) | Estado indeterminado |
| `checkboxStyle` | `AlfCheckboxVariantEnum` | Estilo visual: Elegant, Standard, Moving |
| `label` | `string` | Texto de la etiqueta |
| `size` | `AlfSizeEnum` | Tamaño: Sm, Md, Lg, Xl |
| `disabled` | `boolean` | Deshabilita el componente |

## Estilos de Interacción

1. **Elegant**: Diseño circular con efectos de profundidad neumórfica.
2. **Standard**: Diseño cuadrado tradicional con transiciones suaves.
3. **Moving**: El checkbox se expande para envolver el texto al ser seleccionado.

## Familias de Variantes

- **Solid**: Fondo relleno y borde sólido.
- **Outlined**: Borde sólido y fondo transparente.
- **Standard**: Sin bordes, estilo minimalista.
- **Soft**: Fondo pastel muy suave sin bordes.
- **Crystal**: Efecto traslúcido tipo cristal sin bordes.
