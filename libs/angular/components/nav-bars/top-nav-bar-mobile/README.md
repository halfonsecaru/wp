# TopNavBarMobileComponent

Barra superior fija para móvil, minimalista y reutilizable.

- Muestra el nombre de la app centrado en un `<h3>`.
- Icono de menú a la derecha que emite un evento al pulsar.
- Estilos: gradiente negro, texto blanco roto, layout robusto.

## Inputs

- `nombreApp: string` — Nombre a mostrar en la barra.

## Outputs

- `menuClick` — Evento emitido al pulsar el icono de menú.

## Uso

```html
<app-top-nav-bar-mobile
  [nombreApp]="nombreApp"
  (menuClick)="sidenavOpen = true"
></app-top-nav-bar-mobile>
```
