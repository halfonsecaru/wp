# AlfTooltipTextDirective

Directiva Élite para mostrar tooltips flotantes ultraligeros con variantes de color y posicionamiento inteligente.

## 📋 API Reference

### Selector

```html
<element [alfTooltipText]="config">
```

### Input

| Nombre           | Tipo                                  | Descripción                               |
| ---------------- | ------------------------------------- | ----------------------------------------- |
| `alfTooltipText` | `AlfTooltipConfig \| string` | Configuración o texto simple del tooltip. |

---

## 🛠️ AlfTooltipConfig

| Propiedad  | Tipo                  | Default | Descripción                                         |
| ---------- | --------------------- | ------- | --------------------------------------------------- |
| `text`     | `string`              | -       | Texto a mostrar en el tooltip.                      |
| `variant`  | `AlfColorVariantEnum` | `Dark`  | Variante de color (Primary, Success, Danger, etc.). |
| `position` | `AlfPositionEnum`     | `Top`   | Posición: `Top`, `Bottom`, `Left`, `Right`.         |
| `delay`    | `number`              | `150`   | Delay en ms antes de mostrar.                       |

---

## 🚀 Uso

### Texto Simple

```html
<button [alfTooltipText]="'Guardar cambios'">💾</button>
```

### Con Configuración

```html
<button [alfTooltipText]="{
  text: 'Eliminar registro',
  variant: AlfColorVariantEnum.Danger,
  position: AlfPositionEnum.Bottom,
  delay: 500
}">🗑️</button>
```

### En TypeScript

```typescript
import { AlfTooltipTextDirective } from 'alf-components';

@Component({
  imports: [AlfTooltipTextDirective],
  template: `<button [alfTooltipText]="tooltipConfig">Hover me</button>`
})
export class MyComponent {
  tooltipConfig = {
    text: 'Información importante',
    variant: AlfColorVariantEnum.Info,
    position: AlfPositionEnum.Right
  };
}
```

## 🎨 Variantes de Color

Todas las variantes usan el sistema de colores estandarizado mediante `AlfColorEnum`.

| Variante    | Descripción                       |
| ----------- | --------------------------------- |
| `Primary`   | Color Primario del sistema        |
| `Secondary` | Gris neutro                       |
| `Success`   | Verde éxito                       |
| `Danger`    | Rojo error                        |
| `Warning`   | Amarillo advertencia              |
| `Info`      | Azul información                  |
| `Light`     | Fondo claro                       |
| `Dark`      | Fondo oscuro (default)            |

## ✨ Características Élite

- 🚀 **WAAPI Powered**: Animaciones nativas de alto rendimiento sin CSS.
- 🎨 **Enum-Driven**: Estilos consistentes con el resto del ecosistema.
- ⚛️ **Signal-Based**: Arquitectura reactiva compatible con Zoneless.
- ♿ **A11y**: Gestión automática de `aria-describedby` y roles.
- 🔧 **Zero SCSS**: Sin dependencias de archivos de estilo externos.

