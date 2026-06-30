# Componente AlfCard (Élite Composed)

`AlfCard` es un componente de tarjeta modular, flexibe y de alto rendimiento diseñado para Angular 22. Totalmente integrado con el motor **Omni-Reactive** sobre arquitectura de Signals nativas y preparado para aplicaciones Zoneless.

## 🌟 Características Clave

- **Basado en Signals Nativas**: Impulsado por `input()`, `model()` y `computed()` para un rendimiento y detección de cambios ultra rápidos.
- **Subcomponentes Modulares**: Estructura tus tarjetas limpiamente utilizando `<alf-card-img>`, `<alf-card-title>`, `<alf-card-body>`, `<alf-card-actions>`, `<alf-card-header>` y `<alf-card-footer>`.
- **Integración con Omni-Reactive Engine**: El contenedor principal gestiona el fondo y las sombras de la variante, mientras que los subcomponentes adaptan su texto de forma cromáticamente transparente e inteligente.
- **Ajuste Automático de Imágenes**: El subcomponente `<alf-card-img>` hereda automáticamente los radios de borde superiores (`borderTopLeftRadius` y `borderTopRightRadius`) definidos en `border.ts` para un encaje suave e impecable.

## 🧱 Estructura de Subcomponentes

La tarjeta se compone de las siguientes etiquetas hijas combinables:
- `<alf-card>` (Contenedor raíz con variante y elevación)
- `<alf-card-img>` (Cabecera de imagen con recorte de bordes automático)
- `<alf-card-title>` (Título formateado y centrado)
- `<alf-card-body>` (Cuerpo de texto o contenido principal)
- `<alf-card-actions>` (Contenedor de botones o acciones de pie)

## 🚀 Ejemplos de Uso

### Tarjeta Estándar con Botones de Acción
```html
<alf-card>
  <alf-card-img src="/assets/landscape.jpg" alt="Foto de Portada" />
  <alf-card-title>Minimalist Product Edition</alf-card-title>
  <alf-card-body>
    Confeccionada con materiales orgánicos de alta calidad. Diseñada para ofrecer máxima comodidad y durabilidad.
  </alf-card-body>
  <alf-card-actions style="justify-content: space-between; align-items: center;">
    <span style="font-size: 1.25rem; font-weight: 800;">$49.00</span>
    <alf-button [variant]="AlfColorVariantEnum.Primary">Añadir al carrito</alf-button>
  </alf-card-actions>
</alf-card>
```

### Variante Temática Cromática (ej. Success)
```html
<alf-card [variant]="AlfColorVariantEnum.Success" [elevated]="true">
  <alf-card-title>Operación Exitosa</alf-card-title>
  <alf-card-body>
    Los datos se han sincronizado correctamente con el servidor central.
  </alf-card-body>
  <alf-card-actions style="justify-content: flex-end;">
    <alf-button [variant]="AlfColorVariantEnum.Light">Aceptar</alf-button>
  </alf-card-actions>
</alf-card>
```

## 📋 Referencia de la API (`<alf-card>`)

| Propiedad | Tipo | Descripción |
|---|---|---|
| `variant` | `AlfColorVariantEnum \| string` | Variante de color y temática cromática de la tarjeta. |
| `elevated` | `boolean` | Agrega sombra de elevación a la tarjeta (por defecto `true`). |
| `id` | `input<string>` | Identificador único opcional. |
| `helperText` | `input<string>` | Texto de ayuda o accesibilidad. |
| `disabled` | `input<boolean>` | Estado deshabilitado reactivo de la tarjeta y sus subcomponentes. |

---
Parte del ecosistema **Alfonizer Design System**.
