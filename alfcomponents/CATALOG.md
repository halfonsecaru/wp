# 🤖 ALFCOMPONENTS — CATÁLOGO IA

> **INSTRUCCIÓN**: Antes de crear CUALQUIER componente UI, consulta este catálogo.  
> Si un componente ya existe aquí, ÚSALO. No inventes componentes nuevos.  
> Importa siempre desde `alfcomponents` o la ruta relativa correspondiente.

---

## 📍 Ruta Base

```
alfcomponents/
├── components/       → Componentes visuales (alf-spinner, ...)
├── directives/       → Directivas (alfRipple, alfLoading, ...)
├── enums/            → Todos los tipos enum (AlfColorEnum, AlfPxEnum, ...)
├── interfaces/       → Interfaces de configuración
├── predefined/       → Configuraciones predefinidas
└── index.ts          → Public API (re-exports)
```

---

## 🔧 REGLA DE IMPORTACIÓN

```typescript
// ✅ CORRECTO — Importar desde alfcomponents
import { AlfRippleDirective } from 'alfcomponents/directives/ripple/ripple';
import { AlfSpinner } from 'alfcomponents/components/alf-spinner/alf-spinner';
import { AlfColorEnum, AlfPxEnum } from 'alfcomponents/enums';
import { AlfRippleInterface } from 'alfcomponents/interfaces';

// ❌ INCORRECTO — No crear componentes duplicados
// No crear tu propio spinner, ripple, loading, etc.
```

---

## 📦 COMPONENTES DISPONIBLES

---

### `alf-spinner` — Spinner de Carga

📁 `alfcomponents/components/alf-spinner/alf-spinner.ts`

**Tipo**: Component  
**Selector**: `<alf-spinner>`  
**Standalone**: ✅

#### Inputs

| Input | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `size` | `AlfPxEnum \| AlfRemEnum \| AlfPercentageEnum \| undefined` | `undefined` (auto) | Tamaño del spinner |
| `color` | `AlfColorEnum \| undefined` | `undefined` (hereda) | Color del spinner |
| `strokeWidth` | `AlfSpinnerStrokeWidthEnum` | `Base` | Grosor del trazo |

#### Outputs

Ninguno.

#### Uso

```html
<!-- Básico (hereda tamaño y color del padre) -->
<alf-spinner />

<!-- Con tamaño y color -->
<alf-spinner [size]="AlfPxEnum.Px32" [color]="AlfColorEnum.Primary" />

<!-- Con grosor personalizado -->
<alf-spinner [strokeWidth]="AlfSpinnerStrokeWidthEnum.Thick" />
```

```typescript
import { AlfSpinner } from 'alfcomponents/components/alf-spinner/alf-spinner';

@Component({
  imports: [AlfSpinner],
  template: `<alf-spinner [color]="AlfColorEnum.Primary" />`
})
```

#### Notas

- Se posiciona absoluto centrado dentro de su padre.
- El padre DEBE tener `position: relative`.

---

### `alfRipple` — Efecto Ripple (Material Design)

📁 `alfcomponents/directives/ripple/alf-ripple.directive.ts`

**Tipo**: Directive  
**Selector**: `[alfRipple]`  
**Standalone**: ✅

#### Input

| Input | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `alfRipple` | `boolean \| AlfRippleInterface` | `true` (Material Preset) | Configuración del ripple |

#### `AlfRippleInterface`

```typescript
interface AlfRippleInterface {
  enabled?: boolean;       // default: true
  color?: AlfColorEnum;    // default: AlfColorEnum.Black
  duration?: number;       // default: 450 (Material Preset)
  opacity?: number;        // default: 0 (opacidad final)
  scale?: number;          // default: 4 (multiplicador)
}
```

#### Outputs

Ninguno.

#### Uso

```html
<!-- Básico (Usa preset ALF_RIPPLE_MATERIAL por defecto) -->
<button alfRipple>Click me</button>

<!-- Con configuración personalizada (se fusiona con el preset) -->
<button [alfRipple]="{ color: AlfColorEnum.Primary }">
  Styled Ripple
</button>

<!-- Deshabilitado -->
<button [alfRipple]="false">No ripple</button>
```

```typescript
import { AlfRippleDirective } from 'alfcomponents/directives/ripple/alf-ripple.directive';

@Component({
  imports: [AlfRippleDirective],
  template: `<div alfRipple class="card">Clickable card</div>`
})
```

#### Notas

- **Preset por defecto**: Si no recibe nada o recibe `true`, aplica `ALF_RIPPLE_MATERIAL` (color negro, 450ms, escala 4).
- El padre obtiene `position: relative` automáticamente si es `static`.
- Animación auto-contenida con WAAPI (no necesita CSS global).

---

### `alfLoading` — Directiva de Carga

📁 `alfcomponents/directives/alf-loading/alf-loading.directive.ts`

**Tipo**: Directive  
**Selector**: `[alfLoading]`  
**Standalone**: ✅

#### Inputs

| Input | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `alfLoading` | `boolean \| AlfLoadingInterface` | `false` | Activa/desactiva el spinner |
| `alfLoadingThickness` | `AlfSpinnerStrokeWidthEnum \| undefined` | `undefined` | Grosor del spinner |

#### `AlfLoadingInterface`

```typescript
interface AlfLoadingInterface {
  isLoading: boolean;
  mode?: AlfLoadingModeEnum;              // 'inline' | 'overlay'
  spinnerColor?: AlfColorEnum;
  spinnerSize?: AlfPxEnum | AlfRemEnum;
  spinnerStrokeWidth?: AlfSpinnerStrokeWidthEnum;
}
```

#### Outputs

Ninguno.

#### Uso

```html
<!-- Básico con boolean -->
<div [alfLoading]="isLoading()">
  Contenido que se carga...
</div>

<!-- Con configuración avanzada -->
<div [alfLoading]="{ isLoading: loading(), spinnerColor: AlfColorEnum.Primary, mode: AlfLoadingModeEnum.Overlay }">
  Contenido
</div>

<!-- Con grosor personalizado -->
<div [alfLoading]="loading()" [alfLoadingThickness]="AlfSpinnerStrokeWidthEnum.Thick">
  Contenido
</div>
```

```typescript
import { AlfLoadingDirective } from 'alfcomponents/directives/alf-loading/alf-loading.directive';

@Component({
  imports: [AlfLoadingDirective],
  template: `<div [alfLoading]="isLoading()">...</div>`
})
```

#### Notas

- Inyecta un `<alf-spinner>` dinámicamente dentro del elemento.
- El elemento recibe `position: relative` y `pointer-events: none` mientras carga.
- Al desactivar, restaura el estado original.

---

### `alfPopover` — Popover / Tooltip Dinámico

📁 `alfcomponents/directives/popover/popover.ts`

**Tipo**: Directive  
**Selector**: `[alfPopover]`  
**Standalone**: ✅

#### Input

| Input | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `alfPopover` | `AlfPopoverConfig` | **Required** | Configuración del popover |

#### `AlfPopoverConfig`

```typescript
interface AlfPopoverConfig {
  text?: string;               // Texto simple
  template?: TemplateRef<any>; // Template personalizado
  component?: Type<any>;       // Componente dinámico
  componentInputs?: Record<string, any>;
  position?: AlfPositionEnum;  // default: Auto
  trigger?: 'hover' | 'click'; // default: hover
  delay?: number;              // default: 300ms
  maxWidth?: string;           // default: 500px
  backgroundColor?: AlfColorEnum;
  color?: AlfColorEnum;
}
```

#### Uso

```html
<!-- Básico con texto -->
<button [alfPopover]="{ text: 'Información adicional' }">Hover me</button>

<!-- Con template y posición -->
<ng-template #popTemplate>
  <div class="p-4">Contenido complejo</div>
</ng-template>
<div [alfPopover]="{ template: popTemplate, position: AlfPositionEnum.Right }">
  Right Popover
</div>

<!-- Trigger click -->
<button [alfPopover]="{ text: 'Cerrar al hacer click fuera', trigger: 'click' }">
  Click me
</button>
```

```typescript
import { AlfPopover } from 'alfcomponents/directives/popover/popover';
import { AlfPositionEnum, AlfColorEnum } from 'alfcomponents/enums';

@Component({
  imports: [AlfPopover],
  template: `<button [alfPopover]="{ text: 'Hola' }">Test</button>`
})
```

#### Notas

- **Posicionamiento inteligente**: Soporta `AlfPositionEnum.Auto` (detecta espacio automáticamente).
- **Animaciones**: Usa WAAPI para transiciones suaves.
- **Trigger 'hover'**: Incluye delay de seguridad para evitar flickering al mover el cursor al popover.
- **A11y**: Gestiona automáticamente `aria-expanded`, `aria-controls` y `role`.

---

## 🎨 ENUMS PRINCIPALES (Referencia Rápida)

| Enum | Uso | Ejemplo |
|------|-----|---------|
| `AlfColorEnum` | Colores | `.Primary`, `.Red500`, `.Black`, `.White` |
| `AlfPxEnum` | Tamaños en px | `.Px4`, `.Px8`, `.Px16`, `.Px32` |
| `AlfRemEnum` | Tamaños en rem | `.Rem1`, `.Rem2`, `.Rem4` |
| `AlfPercentageEnum` | Porcentajes | `.P25`, `.P50`, `.P100` |
| `AlfSizeEnum` | Tallas genéricas | `.Sm`, `.Md`, `.Lg`, `.Xl` |
| `AlfRadiusEnum` | Border radius | `.Sm`, `.Md`, `.Lg`, `.Full` |
| `AlfShadowEnum` | Box shadows | `.Sm`, `.Md`, `.Lg`, `.Xl` |
| `AlfFontSizeEnum` | Tamaños de fuente | `.Xs`, `.Sm`, `.Base`, `.Lg`, `.Xl` |
| `AlfFontWeightEnum` | Pesos de fuente | `.Light`, `.Normal`, `.Bold` |
| `AlfSpinnerStrokeWidthEnum` | Grosor spinner | `.Thin`, `.Base`, `.Thick` |
| `AlfLoadingModeEnum` | Modo de carga | `.Inline`, `.Overlay` |

> **REGLA**: TODOS los colores deben usar `AlfColorEnum`. Strings directos (hex, rgb) están PROHIBIDOS.

---

## ⚠️ RESTRICCIONES PARA LA IA

1. **No crear componentes que ya existen**. Consulta este catálogo primero.
2. **No usar strings para colores**. Solo `AlfColorEnum`.
3. **No usar strings para tamaños**. Usar los Enums de Px, Rem, Percentage.
4. **Cada componente es standalone**. Importar directamente en `imports: [...]`.
5. **Seguir RULES.md** para las reglas de código (modificadores de acceso, signals, etc.).
6. **Consultar las interfaces** en `alfcomponents/interfaces/` para ver todas las opciones de configuración disponibles.

---

## 📝 CÓMO AÑADIR UN COMPONENTE NUEVO A ESTE CATÁLOGO

Al crear un nuevo componente en alfcomponents, añadir una sección aquí con:

1. **Ruta del archivo**
2. **Tipo** (Component / Directive / Pipe)
3. **Selector**
4. **Tabla de Inputs** (nombre, tipo, default, descripción)
5. **Tabla de Outputs** (nombre, tipo, descripción)
6. **Ejemplo de uso** (HTML + TypeScript import)
7. **Notas** (comportamiento especial, requisitos)
