# Componente AlfAutocomplete (Élite Composed)

`AlfAutocomplete` es un componente de autocompletado y selección modular, flexible y de alto rendimiento diseñado para Angular 22. Totalmente integrado con el motor **Omni-Reactive** sobre arquitectura de Signals nativas y preparado para aplicaciones Zoneless.

## 🌟 Características Clave

- **Basado en Signals Nativas**: Impulsado por `input()`, `model()`, `signal()` y `computed()` para un filtrado ultra rápido y sin zonas.
- **Filtrado Inteligente con Tolerancia a Acentos**: Normalización automática NFD para que la búsqueda ignore tildes y mayúsculas/minúsculas.
- **Desplegable Animado Reactivo**: Panel emergente flotante (`<alf-auto-complete-panel>`) sincronizado con los tokens de color y transiciones visuales de la variante seleccionada.
- **Soporte de Variantes Completo**: Mismas variantes cromáticas que `AlfInput` (Solid, Outline, Ghost, Soft, Crystal, 3D, Gradient).

## 🚀 Ejemplos de Uso

### Autocompletado Básico
```html
<alf-autocomplete
  label="Selecciona un país"
  [options]="countries"
  [variant]="AlfColorVariantEnum.Primary"
/>
```

### Autocompletado con Limpiado y Apariencia Personalizada
```html
<alf-autocomplete
  label="Búsqueda de clientes"
  [options]="clientOptions"
  [clearable]="true"
  [appearance]="AlfInputAppearanceEnum.Outline"
  [variant]="AlfColorVariantEnum.Success"
  (optionSelected)="handleClientSelect($event)"
/>
```

## 📋 Referencia de la API (`<alf-autocomplete>`)

| Propiedad | Tipo | Descripción |
|---|---|---|
| `options` | `input<AlfSelectOption[]>` | Lista de opciones para autocompletado (`label`, `value`, `icon`, `group`). |
| `variant` | `AlfColorVariantEnum \| string` | Variante de color y temática cromática del campo y el panel. |
| `appearance` | `AlfInputAppearanceEnum` | Apariencia visual del input (`standard` o `outline`). |
| `label` | `input<string>` | Etiqueta flotante o descriptiva del input. |
| `placeholder` | `input<string>` | Texto de sugerencia interior. |
| `clearable` | `input<boolean>` | Permite limpiar la selección mediante botón dedicado. |
| `disabled` | `input<boolean>` | Estado deshabilitado reactivo. |
| `isLoading` | `input<boolean>` | Muestra el estado de carga mediante spinner integrado. |

## 🔔 Eventos (*Outputs*)

| Evento | Tipo | Descripción |
|---|---|---|
| `optionSelected` | `output<AlfSelectOption>` | Emite la opción seleccionada por el usuario. |

---
Parte del ecosistema **Alfonizer Design System**.
