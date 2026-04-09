# Sistema de Iconos Angular (Unicode, SVG, IMG)

Este paquete contiene un sistema de iconos flexible para Angular, que permite representar iconos mediante:

- Unicode (emojis, caracteres especiales)
- SVG (usando `<symbol>` y `<use>`)
- Imágenes (PNG, JPG...)

---

## 🛠️ Instalación

1. **Copia los archivos** del paquete en tu proyecto Angular.
2. **Asegúrate de tener tus iconos SVG en `/assets/icons/`** o donde prefieras, y que los `IMG` también estén en esa ruta.
3. **Importa `IconsComponent`** en el componente donde lo necesites (es standalone).

---

## 🧩 Estructura

- `icon-types.ts`: Enum para los tipos de icono (`unicode`, `svg`, `img`)
- `font-size.enum.ts`: Enum de tamaños disponibles
- `icon.interface.ts`: Interfaz principal de icono
- `unicode.enum.ts`: Enum de nombres de icono
- `icons-unicode.ts`: Lista de iconos tipo Unicode
- `icons-svg.ts`: Lista de iconos SVG
- `icons-img.ts`: Lista de iconos IMG
- `find-icon-by-enum.ts`: Función para buscar cualquier icono por su nombre
- `icons.component.ts`: Componente para renderizar un icono automáticamente
- `icons.component.html`: Plantilla que decide qué mostrar según el tipo

---

## 🚀 Uso básico

### 1. Crear un icono desde el Enum

```ts
import { findIconByEnum } from './find-icon-by-enum';
import { UnicodeEnum } from './unicode.enum';

const icon = findIconByEnum(UnicodeEnum.search);
```

### 2. Usar el componente

```html
<app-icons [iconEnum]="UnicodeEnum.search"></app-icons>
```

> El componente detecta si debe renderizar un Unicode, un SVG o una imagen.

---

## 📌 Ejemplo con botón

```ts
interface ButtonInterface {
  label: string;
  icon: IconInterface;
  action: () => void;
}
```

```html
<ng-container [ngSwitch]="button.icon.type">
  <span *ngSwitchCase="'unicode'">{{ button.icon.value }}</span>
  <img *ngSwitchCase="'img'" [src]="'/assets/icons/' + button.icon.value" width="24" height="24" />
  <svg *ngSwitchCase="'svg'" width="24" height="24">
    <use [attr.xlink:href]="'#' + button.icon.value"></use>
  </svg>
</ng-container>
```

---

## 📂 Organización sugerida

```
src/
  app/
    shared/
      icons/
        icon-types.ts
        icon.interface.ts
        font-size.enum.ts
        unicode.enum.ts
        icons-unicode.ts
        icons-svg.ts
        icons-img.ts
        find-icon-by-enum.ts
        icons.component.ts
        icons.component.html
```

---

## 🧪 Añadir un nuevo icono

1. Añádelo al `UnicodeEnum`
2. Crea su entrada en `icons-unicode`, `icons-svg` o `icons-img`
3. Si es un SVG, asegúrate de tener el `<symbol>` con su ID en el sprite

---

## 🧾 Licencia

Uso libre. Hecho con ❤️ para desarrolladores Angular.