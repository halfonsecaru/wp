# AlfSwitch - Componente Switch de Élite

Componente switch/toggle independiente (*standalone*) de alto rendimiento diseñado para Angular 22. Totalmente integrado con el sistema de tokens cromáticos **Omni-Reactive** y optimizado para arquitecturas Zoneless mediante Angular Signals.

## 🌟 Características Clave

- **Signals Nativas**: Impulsado por `input()`, `model()` y `computed()` para una reactividad pura y eficiente.
- **Omni-Reactive Palette Engine**: Colores, sombras y bordes gestionados de forma dinámicamente reactiva mediante `AlfColorEnum`.
- **Variantes Visuales**: Soporte para estilos `Elegant` (redondeado/píldora) y `Standard` (rectangular).
- **Tematización Dinámica**: Integración limpia con variantes cromáticas (`primary`, `success`, `danger`, etc.).
- **Accesibilidad y Micro-interacciones**: Gestión completa de ARIA, interacción por teclado (Espacio/Enter) y transiciones fluidas de thumb y track.

## 🚀 Uso Básico

```html
<alf-switch
  [(checked)]="isActive"
  label="Habilitar notificaciones"
  [variant]="AlfColorVariantEnum.Primary"
/>
```

### Ejemplo Avanzado con Etiqueta y Variante
```html
<alf-switch
  [(checked)]="darkMode"
  label="Modo Oscuro"
  labelPosition="before"
  switchStyle="elegant"
  [variant]="AlfColorVariantEnum.Success"
  (onCheckedChange)="handleToggle($event)"
/>
```

## 📋 API del Componente

| Propiedad | Tipo | Descripción |
|---|---|---|
| `checked` | `model<boolean>` | Enlace bidireccional (*two-way binding*) para el estado activo/inactivo. |
| `label` | `input<string>` | Texto de la etiqueta del switch. |
| `labelText` | `input<string>` | Alias alternativo para la etiqueta del switch. |
| `switchStyle` | `'elegant' \| 'standard'` | Estilo visual (`elegant` o `standard`). |
| `labelPosition` | `'before' \| 'after'` | Posición de la etiqueta respecto al switch. |
| `colorSwitch` | `AlfColorEnum \| string` | Personalización directa de color para el track/thumb. |
| `variant` | `AlfColorVariantEnum` | Variante cromática principal (`primary`, `danger`, etc.). |
| `disabled` | `input<boolean>` | Deshabilita la interacción con el switch. |
| `isLoading` | `input<boolean>` | Muestra un indicador de carga integrado (`AlfSpinner`). |

## 🔔 Eventos (*Outputs*)

| Evento | Tipo | Descripción |
|---|---|---|
| `onCheckedChange` | `output<boolean>` | Emite el nuevo valor booleano tras cambiar de estado. |

---
Parte del ecosistema **Alfonizer Design System**.
