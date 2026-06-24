# Componente AlfCard

`AlfCard` es un componente de tarjeta modular, premium y flexible diseñado para Angular 18+ sobre la arquitectura de **Signals**. Está totalmente integrado con el motor visual de estilos Élite, aplicando de forma reactiva bordes, sombras, difuminados de cristal (glassmorphism) y gradientes en base a la variante seleccionada.

## Características
- **Basado en Signals**: Utiliza las reactivas Signals de Angular (`input()`, `computed()`) para un rendimiento y detección de cambios ultra rápidos.
- **Subcomponentes Modulares**: Estructura tus tarjetas utilizando `<alf-card-img>`, `<alf-card-title>`, `<alf-card-body>`, y `<alf-card-actions>`.
- **Estilos de Variantes Premium**: Soporta múltiples modalidades de diseño: Sólido, Outline, Soft, Ghost, Cristal (Glassmorphism), Profundidad 3D y Degradados.
- **Interactividad**: Responde de manera fluida y fluida a los estados hover, focus, active y disabled.

## Estructura de Subcomponentes
La tarjeta se compone de las siguientes etiquetas hijas:
- `alf-card` (Contenedor raíz)
- `alf-card-img` (Contenedor de la imagen de cabecera)
- `alf-card-title` (Título en negrita y centrado)
- `alf-card-body` (Contenido de descripción o cuerpo principal)
- `alf-card-actions` (Footer para botones o enlaces de acción)

## Ejemplos de Uso

### Tarjeta Sólida Básica
```html
<alf-card variant="primary">
  <alf-card-img src="/assets/landscape.png" alt="Header Image" />
  <alf-card-title>Destino Increíble</alf-card-title>
  <alf-card-body>
    Disfruta de un viaje maravilloso a los rincones más visualmente impactantes y exclusivos del mundo.
  </alf-card-body>
  <alf-card-actions>
    <button style="background: transparent; border: none; font-weight: 600; cursor: pointer; color: inherit;">Leer Más</button>
  </alf-card-actions>
</alf-card>
```

### Variante Cristal (Glassmorphism)
```html
<alf-card variant="crystal-primary" [elevated]="true">
  <alf-card-title>Efecto Glassmorphism</alf-card-title>
  <alf-card-body>
    Se renderiza con un elegante difuminado de fondo (backdrop-filter) y bordes translúcidos.
  </alf-card-body>
</alf-card>
```

## Referencia de la API

### Entradas (Inputs) de `<alf-card>`
- `config` (`AlfCardConfigInterface`): Objeto maestro de configuración.
- `variant` (`AlfColorVariantEnum | string`): Variante de color y temática de la tarjeta.
- `elevated` (`boolean`): Agrega una sombra elegante (drop-shadow) a la tarjeta (por defecto `true`).
- `helperText` (`string`): Texto de ayuda o accesibilidad.
- `disabled` (`boolean`): Desactiva visualmente e interactivamente la tarjeta.
