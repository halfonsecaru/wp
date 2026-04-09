# HeaderComponent

Componente de cabecera principal para la aplicación web (desktop/tablet).

- Muestra el nombre de la app centrado en un `<h1>`.
- Recibe el título por input (`@Input() title: string`).
- Incluye lógica para mostrar/ocultar el menú lateral y el menú móvil.
- Estilos minimalistas y coherentes con el diseño global.

## Uso

```html
<app-header [title]="nombreApp"></app-header>
```
