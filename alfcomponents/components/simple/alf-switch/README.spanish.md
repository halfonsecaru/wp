# AlfSwitch - Componente Switch de Élite

Componente switch/toggle independiente (standalone) de alto rendimiento diseñado para Angular 22. Totalmente integrado con el **Elite Visual Engine** y optimizado para arquitecturas Zoneless utilizando Signals nativas.

## Características Clave

- **Signals Nativas**: Impulsado por `input()`, `model()` y `computed()` para una reactividad pura y eficiente.
- **Elite Visual Engine**: Colores, ondas (ripples) y bordes gestionados de forma centralizada mediante `defaultVariants.ts`.
- **Estilos Visuales**: Soporte para estilos `Elegant` (redondeado/píldora) y `Standard` (cuadrado/rectangular).
- **Tematización Dinámica**: Implementado con `AlfColorEnum` y variables CSS para el cambio instantáneo de temas.
- **Accesibilidad**: Gestión completa de ARIA y soporte de teclado (Espacio/Enter).

## Uso Básico

```html
<alf-switch
  [(checked)]="isActive"
  [label]="'Habilitar notificaciones'"
  [variant]="AlfColorVariantEnum.Primary"
/>
```

### Uso con Configuración Completa
```typescript
import { getAlfSwitchDefaultConfig } from './predefined/alf-switch.predefined';

config = getAlfSwitchDefaultConfig(AlfColorVariantEnum.Success);
```
```html
<alf-switch [config]="config" />
```

## API del Componente

| Propiedad | Tipo | Descripción |
|---|---|---|
| `checked` | `model<boolean>` | Enlace bidireccional (two-way binding) para el estado activo/inactivo. |
| `label` | `input<string>` | Texto de la etiqueta del switch. |
| `switchStyle` | `'elegant' \| 'standard'` | Estilo visual (`elegant` o `standard`). |
| `size` | `AlfSizeEnum` | Escala de dimensiones (XS a 2XL). |
| `disabled` | `input<boolean>` | Estado deshabilitado. |
| `error` | `input<string>` | Mensaje de error reactivo. |

## Refactorización Élite
Este componente se ha migrado a la arquitectura de "Motor Centralizado", garantizando que sus colores y comportamientos sean 100% coherentes con otros componentes como `AlfButton`.

---
Parte del ecosistema **Alfonizer Design System**.
