# Popover Directive

Directiva para mostrar popovers con texto, templates o componentes dinámicos.

## 📋 API Reference

### Selector

```html
<element [alfPopover]="config">
```

### Input

| Nombre       | Tipo               | Descripción                |
| ------------ | ------------------ | -------------------------- |
| `alfPopover` | `AlfPopoverConfig` | Configuración del popover. |

---

## 🛠️ AlfPopoverConfig

| Propiedad         | Tipo                  | Default   | Descripción                                         |
| ----------------- | --------------------- | --------- | --------------------------------------------------- |
| `text`            | `string`              | -         | Texto simple a mostrar.                             |
| `template`        | `TemplateRef<any>`    | -         | Template Angular a renderizar.                      |
| `component`       | `Type<any>`           | -         | Componente Angular a renderizar.                    |
| `componentInputs` | `Record<string, any>` | -         | Inputs para el componente dinámico.                 |
| `position`        | `AlfPositionEnum`     | `Auto`    | Posición: `Top`, `Bottom`, `Left`, `Right`, `Auto`. |
| `trigger`         | `'hover' \| 'click'`  | `'hover'` | Evento que abre el popover.                         |
| `delay`           | `number`              | `300`     | Delay en ms antes de mostrar (solo hover).          |
| `maxWidth`        | `string`              | `'500px'` | Ancho máximo del popover.                           |
| `backgroundColor` | `AlfColorEnum`        | `White`   | Color de fondo para el modo texto.                  |
| `color`           | `AlfColorEnum`        | `#1e293b` | Color de texto para el modo texto.                  |

---

## 🚀 Uso

### Texto Simple

```html
<button [alfPopover]="{ text: 'Información adicional' }">
  Info
</button>
```

### Con Template

```html
<button [alfPopover]="{ template: myTemplate, trigger: 'click' }">
  Ver detalles
</button>

<ng-template #myTemplate>
  <div class="p-4">
    <h3>Título</h3>
    <p>Contenido del popover...</p>
  </div>
</ng-template>
```

### Con Componente Dinámico

```typescript
import { AlfPopover } from 'alf-components';
import { MyDetailComponent } from './my-detail.component';

@Component({
  imports: [AlfPopover],
  template: `
    <span [alfPopover]="popoverConfig">
      Hover para ver detalles
    </span>
  `
})
export class MyComponent {
  popoverConfig = {
    component: MyDetailComponent,
    componentInputs: { userId: 123 },
    position: AlfPositionEnum.Bottom
  };
}
```

### Click Trigger

```html
<button [alfPopover]="{
  text: 'Click fuera para cerrar',
  trigger: 'click',
  position: AlfPositionEnum.Right
}">
  Click me
</button>
```

## 📍 Posiciones

| Posición | Descripción                                |
| -------- | ------------------------------------------ |
| `Auto`   | Detecta automáticamente la mejor posición. |
| `Top`    | Arriba del elemento.                       |
| `Bottom` | Debajo del elemento.                       |
| `Left`   | A la izquierda.                            |
| `Right`  | A la derecha.                              |

## ✨ Características

- ✅ **Contenido flexible**: Texto, templates o componentes.
- ✅ **Auto-flip**: Cambia de posición si no cabe.
- ✅ **Triggers**: `hover` o `click`.
- ✅ **Click outside**: Cierra en click trigger al hacer click fuera.
- ✅ **Hover persistente**: No se cierra al mover el cursor al popover.
- ✅ **Prism.js**: Resalta código automáticamente si está disponible.
- ✅ **Animación suave**: Fade in/out con scale.
- ✅ **Scroll-aware**: Se posiciona correctamente con scroll.

## ♿ Accesibilidad

- El popover se añade al `document.body` para evitar problemas de z-index.
- Click outside solo funciona en modo `click`.
- Los componentes dinámicos reciben sus inputs correctamente.
