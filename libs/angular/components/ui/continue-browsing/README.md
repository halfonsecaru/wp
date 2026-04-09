# containerObjectsComponent

Componente standalone Angular 20 (zoneless) para mostrar una grilla horizontal de productos, inspirado en "Continúa donde lo dejaste" de Amazon.

## Características

- **Standalone**: No requiere módulo, se importa directamente.
- **Zoneless**: Compatible con apps sin zone.js, usa signals para reactividad.
- **Servicio mock**: Los datos se obtienen de un servicio local (`ContinueBrowsingService`) preparado para backend futuro.
- **Grilla responsive**: Visual moderno y adaptable.
- **Navegación**: Al hacer click en una imagen, navega al detalle del producto (`/product/:id`).

## Estructura de archivos

```
continue-browsing/
  ├─ container-objects.component.ts
  ├─ container-objects.component.html
  ├─ container-objects.component.scss
  ├─ continue-browsing.service.ts
  └─ README.md
```

## Uso

1. **Importa el componente donde lo necesites:**

```typescript
import { containerObjectsComponent } from 'path-to-libs/angular/components/ui/continue-browsing/container-objects.component';
```

2. **Añádelo a tu template:**

```html
<container-objects></container-objects>
```

3. **Asegúrate de tener el Router configurado** para que la navegación a `/product/:id` funcione.

## Servicio de datos

- El servicio `ContinueBrowsingService` expone una signal reactiva con productos mock:

```typescript
products = signal([
  { id: 1, imageUrl: '...' },
  ...
]);
```

- Puedes sustituirlo fácilmente por una llamada HTTP en el futuro.

## Personalización

- Modifica los estilos en `container-objects.component.scss` para adaptar la grilla a tu diseño.
- Cambia el mock de productos en el servicio según tus necesidades.

---

**100% Angular 20, standalone, zoneless y listo para producción.**
