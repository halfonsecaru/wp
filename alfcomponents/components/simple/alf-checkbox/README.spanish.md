# AlfCheckbox - Componente de Checkbox Élite

Componente de checkbox standalone de alto rendimiento, diseñado para Angular 21. Totalmente integrado con el **Elite Visual Engine** y optimizado para arquitecturas Zoneless mediante el uso intensivo de Signals.

## Características Principales

- **Signals Nativos**: Utiliza `input()`, `model()` y `computed()` para una reactividad pura y eficiente.
- **Elite Visual Engine**: Colores, ripples y bordes gestionados centralmente desde `defaultVariants.ts`.
- **Modos Visuales**: Soporte para estilos `Elegant` (redondeado/circular) y `Standard` (cuadrado).
- **Estado Indeterminado**: Soporte completo para estados "mixed" (útil en árboles de selección).
- **Temas Dinámicos**: Implementado con `AlfColorEnum` y variables CSS para cambios de tema instantáneos.
- **Accesibilidad**: Gestión completa de ARIA y soporte de teclado (Espacio/Enter).

## Uso Básico

```html
<alf-checkbox
  [(checked)]="isAccepted"
  [label]="'Acepto los términos'"
  [variant]="AlfColorVariantEnum.Primary"
/>
```

### Uso con Configuración Integral
```typescript
import { getAlfCheckboxDefaultConfig } from './predefined/alf-checkbox.predefined';

config = getAlfCheckboxDefaultConfig(AlfColorVariantEnum.Success);
```
```html
<alf-checkbox [config]="config" />
```

## API del Componente

| Propiedad | Tipo | Descripción |
|---|---|---|
| `checked` | `model<boolean>` | Binding bidireccional del estado marcado. |
| `indeterminate` | `model<boolean>` | Binding bidireccional del estado indeterminado. |
| `label` | `input<string>` | Texto de la etiqueta. |
| `checkboxStyle` | `AlfCheckboxVariantEnum` | Estilo visual (`Elegant` o `Standard`). |
| `size` | `AlfSizeEnum` | Escala de dimensiones (XS a 2XL). |
| `disabled` | `input<boolean>` | Estado deshabilitado. |
| `error` | `input<string>` | Mensaje de error reactivo. |

## Refactorización Élite
Este componente ha sido migrado a la arquitectura de "Motor Centralizado", lo que garantiza que sus colores y comportamientos sean 100% consistentes con otros componentes como `AlfButton`.

---
Parte del ecosistema **Alfonizer Design System**.
