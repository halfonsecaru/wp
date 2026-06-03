# AlfCard - Componente de Tarjeta Élite

Componente de tarjeta standalone de alto rendimiento diseñado para Angular 21. Implementa el **Elite Visual Engine**, con subcomponentes anidados para una distribución estructural robusta (título, cuerpo, acciones e imagen), interactividad polimórfica (enlaces/botones), y un sistema de temas dinámicos impulsado por variables CSS.

## Características Clave

- **Layout de Componentes Anidados**: Slots organizados mediante subcomponentes (`alf-card-title`, `alf-card-body`, `alf-card-actions`, `alf-card-img`).
- **Estados Interactivos**: Soporta configuraciones de `clickable` y `href`, añadiendo sombras de elevación premium, transiciones de escala al hover, desfases en estado activo y anillos de enfoque.
- **Accesibilidad y Enfoque**: Implementa roles ARIA dinámicos (`article`, `button`, `link`), indexación de tabulación por teclado y listeners para disparadores con Espacio/Enter.
- **Escudo de Propagación de Clics**: Ignora automáticamente los clics en la tarjeta cuando provienen de botones o enlaces de acción internos.
- **Temas Dinámicos**: Utiliza `AlfColorEnum` con variables CSS para una integración instantánea del tema.
- **Zoneless Ready**: Optimizado para arquitecturas de Angular sin Zone.js.

## Uso Básico

```html
<alf-card [colorVariant]="AlfColorVariantEnum.PrimaryOutline" [clickable]="true" (onClick)="onCardClick($event)">
  <alf-card-img src="https://picsum.photos/seed/card/600/300" alt="Imagen Demo"></alf-card-img>
  <alf-card-title><h3>Título de Ejemplo</h3></alf-card-title>
  <alf-card-body>
    <p>Este es el contenido principal del cuerpo de la tarjeta.</p>
  </alf-card-body>
  <alf-card-actions>
    <alf-button [colorVariant]="AlfColorVariantEnum.Primary" (onClick)="$event.stopPropagation(); accept()">
      Aceptar
    </alf-button>
  </alf-card-actions>
</alf-card>
```

## API del Componente

### Inputs Principales de la Tarjeta

| Input | Tipo | Descripción |
|---|---|---|
| `inputConfig` | `AlfCardConfigInterface` | Objeto de configuración completa de la tarjeta. |
| `colorVariant` | `AlfColorVariantEnum` | Variante de color (Primary, Secondary, Success, etc. y sus versiones Outlined). |
| `clickable` | `boolean` | Si es true, convierte la tarjeta en una estructura interactiva tipo botón. |
| `href` | `string` | URL de destino si la tarjeta actúa como enlace. |
| `target` | `string` | Destino del enlace (`_self`, `_blank`). |

### Outputs Principales de la Tarjeta

| Output | Tipo | Descripción |
|---|---|---|
| `onClick` | `MouseEvent` | Se dispara al hacer clic en la tarjeta (no se dispara mediante los botones de acción internos). |

---
Parte del ecosistema **Alfonizer Design System**.
