# alf-spinner

Componente de spinner/loader de carga reutilizable. Se adapta automáticamente al tamaño de su contenedor padre y hereda el color del contexto.

## 📦 Importación

```typescript
import { AlfSpinner } from 'alf-components';
```

## 🚀 Uso Básico

```html
<!-- Spinner básico dentro de un contenedor -->
<div style="position: relative; width: 50px; height: 50px;">
  <alf-spinner></alf-spinner>
</div>
```

**Importante**: El contenedor padre debe tener `position: relative` (o `absolute`/`fixed`) para que el spinner se centre correctamente.

## 📋 Características

- ✅ **Sin configuración** - Funciona out of the box
- ✅ **Adaptativo** - Se ajusta al 60% del tamaño del contenedor padre
- ✅ **Hereda color** - Usa `currentColor` para heredar el color del contexto
- ✅ **Animación suave** - Rotación infinita de 1 segundo
- ✅ **Centrado automático** - Se posiciona en el centro del contenedor
- ✅ **Ligero** - SVG puro, sin dependencias

## 📝 Ejemplos

### Spinner en un botón

```html
<button class="btn" style="position: relative; min-height: 40px;">
  @if (isLoading()) {
    <alf-spinner></alf-spinner>
  } @else {
    Guardar
  }
</button>
```

### Spinner de página completa

```html
<div class="loading-overlay" style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;">
  <div style="position: relative; width: 60px; height: 60px;">
    <alf-spinner></alf-spinner>
  </div>
</div>
```

### Spinner con color personalizado

```html
<!-- El spinner heredará el color azul -->
<div style="position: relative; width: 40px; height: 40px; color: #3b82f6;">
  <alf-spinner></alf-spinner>
</div>

<!-- El spinner heredará el color rojo -->
<div style="position: relative; width: 40px; height: 40px; color: #ef4444;">
  <alf-spinner></alf-spinner>
</div>
```

### Spinner en una card

```html
<div class="card" style="position: relative; min-height: 200px;">
  @if (loading()) {
    <alf-spinner></alf-spinner>
  } @else {
    <div class="card-content">
      <!-- Contenido -->
    </div>
  }
</div>
```

### Uso con alf-button

El componente `alf-button` ya integra `alf-spinner` internamente cuando se activa el estado `loading`:

```html
<alf-button [config]="{ label: 'Guardar', loading: isLoading() }"></alf-button>
```

## 🎨 Personalización

### Cambiar tamaño

El spinner ocupa el 60% del contenedor padre. Para cambiar el tamaño, ajusta el contenedor:

```html
<!-- Spinner pequeño (30px) -->
<div style="position: relative; width: 30px; height: 30px;">
  <alf-spinner></alf-spinner>
</div>

<!-- Spinner grande (80px) -->
<div style="position: relative; width: 80px; height: 80px;">
  <alf-spinner></alf-spinner>
</div>
```

### Cambiar color

El spinner usa `currentColor`, por lo que hereda el color del texto del contenedor:

```scss
.my-container {
  position: relative;
  width: 50px;
  height: 50px;
  color: #8b5cf6; // El spinner será violeta
}
```

### Cambiar velocidad (override CSS)

```scss
// En tu archivo de estilos global
alf-spinner .alf-spinner-icon {
  animation-duration: 0.5s; // Más rápido
  // o
  animation-duration: 2s; // Más lento
}
```

### Cambiar grosor del trazo

```scss
alf-spinner .alf-spinner-circle {
  stroke-width: 2; // Más fino
  // o
  stroke-width: 5; // Más grueso
}
```

## 🔧 Estructura Interna

```html
<!-- Estructura del componente -->
<alf-spinner>
  <svg class="alf-spinner-icon" viewBox="0 0 24 24">
    <circle class="alf-spinner-circle" 
            cx="12" cy="12" r="10" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="3" />
  </svg>
</alf-spinner>
```

### Clases CSS

| Clase                 | Elemento        | Descripción                                             |
| --------------------- | --------------- | ------------------------------------------------------- |
| `:host`               | `<alf-spinner>` | Contenedor principal, posicionamiento absoluto centrado |
| `.alf-spinner-icon`   | `<svg>`         | SVG con animación de rotación                           |
| `.alf-spinner-circle` | `<circle>`      | Círculo del spinner                                     |

## ♿ Accesibilidad

Para mejorar la accesibilidad, considera agregar un texto oculto para lectores de pantalla:

```html
<div style="position: relative; width: 50px; height: 50px;" role="status">
  <alf-spinner></alf-spinner>
  <span class="sr-only">Cargando...</span>
</div>
```

```scss
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## 📁 Estructura del Componente

```
shared/components/alf-spinner/
├── alf-spinner.ts        # Componente principal
├── alf-spinner.html      # Template SVG
├── alf-spinner.scss      # Estilos y animación
├── alf-spinner.spec.ts   # Tests unitarios
└── README.md             # Esta documentación
```

## 🧪 Testing

```bash
# Ejecutar tests del spinner
npm test -- --filter="AlfSpinner"
```

Tests incluidos:
- Creación básica
- Atributos SVG correctos
- Integración con componente padre
- Herencia de color

## 📄 Licencia

MIT
