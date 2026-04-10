# alf-button

Componente de botón altamente personalizable, accesible y basado en Angular Signals (Angular 21).

## 📋 API Reference

### Inputs

Propiedades de entrada directas mediante Angular Signals:

| Nombre | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `config` | `AlfButtonInterface` | `Tema 'ACCEPT'` | Configuración maestra reactiva (estilos, props, comportamiento). |

### Eventos (@Output)

| Nombre    | Tipo         | Descripción                         |
| --------- | ------------ | ----------------------------------- |
| `clicked` | `MouseEvent` | Emitido al hacer click en el botón. |

---

## 🛠️ AlfButtonInterface (Estructura Completa)

Esta interfaz extiende la jerarquía global de la librería. A continuación se desglosan **todas** las propiedades disponibles, incluyendo las heredadas.

### 1. Propiedades Específicas del Botón
| Propiedad | Tipo                                          | Descripción                                             |
| --------- | --------------------------------------------- | ------------------------------------------------------- |
| `type`    | `AlfButtonTypeEnum`                           | Tipo HTML: `Button`, `Submit`, `Reset`.                 |
| `id`      | `number`                                      | ID único para identificación en formularios o tracking. |
| `link`    | `{ url: string; target?: AlfLinkTargetEnum }` | Configuración para renderizar como enlace.              |

### 2. Comportamiento Base (AlfBaseComponentInterface)
| Propiedad    | Tipo                  | Descripción                                                              |
| ------------ | --------------------- | ------------------------------------------------------------------------ |
| `variant`    | `AlfColorVariantEnum` | Tema de color predefinido (Primary, Success, Danger, Ghost, Soft, etc.). |
| `size`       | `AlfFontSizeEnum`     | Tamaño del botón (Xs, Sm, Base, Lg, Xl, etc.).                           |
| `disabled`   | `boolean \| Signal`   | Deshabilita el botón desde la configuración.                             |
| `loading`    | `boolean \| Signal`   | Muestra spinner de carga y deshabilita interacción.                      |

| `ripple`     | `boolean`             | Efecto ripple al hacer click (Material Design).                          |
| `label`      | `string`              | Texto del botón.                                                         |
| `animation`  | `object`              | `{ type: Enum, duration?: ms, delay?: ms }`.                             |

### 3. Estilos Visuales Detallados (AlfBaseStylesInterface)
Estas propiedades soportan estados: **default**, **hover**, **active** y **focus**.

#### A. Border & Radius (`border` & `outline`)
| Propiedad      | Descripción                                             |
| -------------- | ------------------------------------------------------- |
| `borderWidth`  | Grosor general o específico (Top, Right, Bottom, Left). |
| `borderStyle`  | Tipo: Solid, Dashed, Dotted, Double, None.              |
| `borderColor`  | Color del borde (Hereda de AlfColorEnum).               |
| `borderRadius` | Redondeo general o específico de esquinas.              |

#### B. Transformaciones 2D/3D (`transform`)
| Propiedad        | Descripción                                     |
| ---------------- | ----------------------------------------------- |
| `translateX/Y/Z` | Desplazamiento en los ejes.                     |
| `scaleX/Y/Z`     | Escala (ej: 1.1 para agrandar en hover).        |
| `rotate/X/Y/Z`   | Rotación en grados.                             |
| `skewX/Y`        | Inclinación.                                    |
| `perspective`    | Profundidad para efectos 3D.                    |
| `filter`         | Filtros CSS como `blur()`, `brightness()`, etc. |
| `backdropFilter` | Filtros para el fondo tras el elemento.         |

#### C. Layout & Display (`displayAndLayout`)
| Propiedad        | Descripción                                 |
| ---------------- | ------------------------------------------- |
| `display`        | Block, Inline, Flex, Grid, None.            |
| `position`       | Relative, Absolute, Fixed, Sticky.          |
| `width / height` | Dimensiones fijas o relativas.              |
| `minWidth / Max` | Límites de tamaño.                          |
| `zIndex`         | Orden de apilamiento vertical.              |
| `gap`            | Espaciado entre elementos flex/grid.        |
| `overflow`       | Control de recortes (Hidden, Scroll, Auto). |
| `aspectRatio`    | Relación de aspecto (ej: '1/1').            |

#### D. Sombras (`shadows`)
| Propiedad    | Descripción                                    |
| ------------ | ---------------------------------------------- |
| `boxShadow`  | Sombra exterior o interior (`boxShadowInset`). |
| `textShadow` | Sombra aplicada al texto del label.            |
| `dropShadow` | Filtro de sombra para formas irregulares.      |

#### E. Espaciado (`padding` & `margin`)
| Propiedad | Descripción                                       |
| --------- | ------------------------------------------------- |
| `padding` | Espacio interno (general o por lados T, R, B, L). |
| `margin`  | Espacio externo (general o por lados T, R, B, L). |

#### F. Colores de Fondo y Texto (`backgroundStyle`)
| Propiedad         | Descripción                |
| ----------------- | -------------------------- |
| `color`           | Color del texto del botón. |
| `backgroundColor` | Fondo del botón.           |

#### G. Propiedades Directas de Estilo
- `cursor`: Tipo de puntero (`Pointer`, `Grab`, `NotAllowed`).
- `opacity`: Transparencia (0.0 a 1.0).
- `pointerEvents`: Habilita/Deshabilita clicks a nivel CSS.
- `resize`: Permite redimensionar manualmente (`None`, `Both`).
- `scrollBehavior`: `Auto` o `Smooth`.

### 4. Propiedades Globales (AllPropertiesInterface)
| Propiedad     | Tipo                                  | Descripción                                  |
| ------------- | ------------------------------------- | -------------------------------------------- |
| `prefix`      | `AlfIconsUnicodeIconEnum \| string`   | Icono antes del texto.                       |
| `suffix`      | `AlfIconsUnicodeIconEnum \| string`   | Icono después del texto.                     |
| `tooltip`     | `AlfTooltipConfigInterface \| string` | Texto o configuración completa del tooltip.  |
| `ariaLabel`   | `string`                              | Texto para lectores de pantalla.             |
| `customClass` | `string`                              | Clases CSS adicionales.                      |
| `customStyle` | `Record<string, string>`              | Objeto de estilos CSS inline personalizados. |

---

## 🚀 Uso Básico

```typescript
import { AlfButton } from 'alf-components';
import { AlfColorVariantEnum } from 'alf-components';

@Component({
  imports: [AlfButton],
  template: `
    <alf-button [config]="buttonConfig" (clicked)="onButtonClick($event)">
      Guardar
    </alf-button>
  `
})
export class MyComponent {
  buttonConfig = signal({
    variant: AlfColorVariantEnum.Primary,
    label: 'Guardar'
  });

  onButtonClick = (event: MouseEvent): void => {
    console.log('Button clicked!', event);
  };
}
```

## 🎨 Variantes Predefinidas

La librería incluye configuraciones predefinidas listas para usar:

```typescript
import { AlfDefaultSolidButtons, AlfDefaultOutlineButtons, AlfDefaultGhostButtons } from 'alf-components';

// Botones Solid
const acceptBtn = AlfDefaultSolidButtons()['ACCEPT'];
const cancelBtn = AlfDefaultSolidButtons()['CANCEL'];
const deleteBtn = AlfDefaultSolidButtons()['DELETE'];

// Botones Outline
const primaryOutline = AlfDefaultOutlineButtons()['PRIMARY'];

// Botones Ghost
const primaryGhost = AlfDefaultGhostButtons()['PRIMARY'];
```

## 🔗 Botón como Enlace

```typescript
const linkButtonConfig = {
  label: 'Ir a Google',
  link: {
    url: 'https://google.com',
    target: AlfLinkTargetEnum.Blank // Nueva pestaña
  }
};
```

---

## 🌍 Theming Global
Este componente soporta tematización dinámica a través del `ALF_THEME` token.
- **Paleta de Colores**: Los colores se generan como variables CSS nativas (`--alf-color-primary`).
- **Variantes**: Hereda configuraciones del tema global si no se sobrescriben localmente.
- **Deep Merge**: La configuración del componente se fusiona inteligentemente con el tema (puedes sobrescribir solo un `padding-top` y mantener el resto del estilo del tema).

---

## ♿ Accesibilidad

El componente cumple con los estándares W3C ARIA:
- Uso automático de `aria-label` cuando se proporciona.
- `aria-disabled="true"` cuando el botón está deshabilitado.
- `aria-busy="true"` durante el estado de carga.
- Soporte completo para navegación por teclado (`Tab`, `Enter`, `Space`).
- Efecto ripple visual proporciona feedback de interacción.
