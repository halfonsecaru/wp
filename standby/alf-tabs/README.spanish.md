# AlfTabs - Documentación de Usuario

El componente `AlfTabs` es un orquestador Élite diseñado para gestionar la navegación por pestañas con un rendimiento máximo y una experiencia de usuario fluida. Soporta transiciones animadas, navegación por teclado, gestos táctiles y un sistema de "Master Indicator" deslizante.

## Arquitectura Tri-Componente

Para una máxima flexibilidad, el sistema se divide en tres piezas:
1.  **alf-tabs**: El contenedor principal que coordina el estado y la animación.
2.  **alf-tab**: La cabecera (botón) de cada pestaña.
3.  **alf-tab-content**: El panel que contiene la información a mostrar.

## Modos de Uso

### 1. Proyección de Contenido (Altamente Flexible)
Este es el modo recomendado. Permite total control sobre el contenido y su estructura.

```html
<alf-tabs [(activeIndex)]="miTabActiva">
  <!-- Cabeceras -->
  <alf-tab [index]="0" [defineComponent]="{ label: 'General', prefix: '⚙️' }"></alf-tab>
  <alf-tab [index]="1" [defineComponent]="{ label: 'Perfil', prefix: '👤' }"></alf-tab>

  <!-- Paneles -->
  <alf-tab-content [index]="0">
    <h3>Configuración General</h3>
    <p>Contenido de la pestaña 1...</p>
  </alf-tab-content>

  <alf-tab-content [index]="1" [lazy]="true">
    <h3>Perfil de Usuario</h3>
    <p>Contenido cargado de forma perezosa...</p>
  </alf-tab-content>
</alf-tabs>
```

### 2. Configuración Dinámica (Factory Pattern)
Puedes usar configuraciones predefinidas para aplicar estilos y comportamientos complejos de forma instantánea.

```html
<alf-tabs [predefined]="'sidebar'" [(activeIndex)]="activeTab">
  <!-- Los paneles siguen requiriendo proyección -->
  <alf-tab-content [index]="0">Dashboard</alf-tab-content>
  <alf-tab-content [index]="1">Reportes</alf-tab-content>
</alf-tabs>
```

## Características Élite

- **Master Mode**: Un indicador deslizante que se adapta suavemente al tamaño de la cabecera activa.
- **Scroll Inteligente**: Si las pestañas desbordan el contenedor, aparecen flechas de navegación automáticas que solo se muestran si hay contenido hacia el que desplazarse.
- **Navegación por Teclado**: Soporte completo para `ArrowLeft`, `ArrowRight`, `Home` y `End`.
- **Gestos Táctiles**: Soporte nativo para cambio de pestaña mediante swipe (deslizar) en dispositivos móviles.
- **Zoneless Ready**: Implementado con Signals de Angular 21 para un rendimiento óptimo sin Zone.js.

## API de Referencia

### Inputs
- `activeIndex`: (Model) Índice de la pestaña activa (admite binding bidireccional).
- `position`: (AlfTabsPositionEnum) Posición de las cabeceras [Top, Bottom, Left, Right].
- `predefined`: (AlfTabsInterface | string) Configuración preestablecida.

### Outputs
- `tabChange`: Se emite cuando el índice de la pestaña cambia (útil para auditoría o carga de datos).

---

Desarrollado con ❤️ para el ecosistema Alfonizer.
