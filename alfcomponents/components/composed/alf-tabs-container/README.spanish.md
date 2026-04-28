# AlfTabsContainer (Élite)

El `AlfTabsContainer` es un componente de navegación avanzado diseñado para Angular 21. Ofrece una experiencia de usuario fluida con transiciones de altura automáticas, soporte para gestos táctiles y múltiples estilos visuales predefinidos.

## Características Principales

- **Arquitectura Élite**: Basado 100% en Signals y Zoneless Ready.
- **Transiciones Fluidas**: Cambio de pestañas con efecto cross-fade y ajuste de altura suave.
- **Variantes Visuales**: Soporte nativo para estilos `Outline`, `Solid` (Soft) y `Crystal` (Glassmorphism).
- **Navegación Táctil**: Soporte para gestos de "swipe" en dispositivos móviles.
- **Scroll Inteligente**: Cabecera con scroll horizontal automático y flechas de navegación si el contenido excede el ancho.

## Uso Básico

```html
<alf-tabs-container variant="OutlinePrimary">
  <alf-tab label="General" iconLeft="⚙️">
    <div class="p-4">Contenido de la pestaña General</div>
  </alf-tab>
  <alf-tab label="Seguridad" iconLeft="🔒">
    <div class="p-4">Contenido de la pestaña Seguridad</div>
  </alf-tab>
</alf-tabs-container>
```

## Atributos y Configuración

### AlfTabsContainer
- `variant`: Estilo visual predefinido. Ejemplos: `OutlinePrimary`, `SolidSuccess`, `CrystalInfo`, `OutlineDark`.
- `fluid`: (boolean) Activa o desactiva la transición de altura suave (por defecto `false`).
- `activeIndex`: (model) Índice de la pestaña activa (soporta doble enlace de datos).

### AlfTab
- `label`: Texto a mostrar en el botón de navegación.
- `iconLeft` / `iconRight`: Iconos opcionales para la pestaña.

## Estilos Visuales

- **Outline**: Borde y texto del color de la variante, fondo transparente.
- **Solid**: Fondo suave (pastel) con texto contrastado.
- **Crystal**: Efecto de cristal esmerilado con desenfoque de fondo (`backdrop-filter`).

## Notas Técnicas
Este componente utiliza el motor de animaciones WAAPI para el slider y Animate.css para las transiciones de contenido, asegurando un rendimiento óptimo sin bloquear el hilo principal.
