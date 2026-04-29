# AlfCheckbox

Componente de checkbox élite para la librería AlfComponents. Ofrece un diseño premium con múltiples variantes visuales, animaciones fluidas y soporte completo para internacionalización.

## Características

- 3 Estilos Visuales: Elegant (Neumórfico), Standard (Material), Moving (Expansivo).
- Soporte para Two-way binding (`checked`, `indeterminate`).
- Sistema de variantes predefinidas (Solid, Outline, Crystal).
- Soporte multilingüe integrado.
- Accesibilidad mejorada (WAI-ARIA).

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

## Variantes Visuales

1. **Elegant**: Diseño circular con efectos de profundidad neumórfica.
2. **Standard**: Diseño cuadrado tradicional con transiciones suaves.
3. **Moving**: El checkbox se expande para envolver el texto al ser seleccionado.
