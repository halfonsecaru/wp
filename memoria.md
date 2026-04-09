# Instrucciones del Proyecto - Librería de Componentes Angular 21

### 🔇 REGLA #0: COMUNICACIÓN CONCISA
- **Sé breve y directo**. No me estreses con explicaciones largas.
- Confirma acciones con frases cortas. Evita listas de checkmarks y resúmenes extensos.
- Si algo sale mal, arréglalo y sigue adelante.

### REGLA #1: SOLO ANGULAR 21 OFICIAL
- ✅ SOLO características OFICIALES de Angular 21 - CONSULTA la documentación si no sabes algo
- ❌ NO inventes sintaxis - ❌ NO uses características deprecated
- 🔍 VERIFICA en docs oficiales antes de implementar - Si tienes dudas, PREGUNTA
- **REUTILIZAR componentes existentes**: Antes de crear un nuevo componente, verifica si ya existe uno que cumpla la función requerida. Reutiliza componentes siempre que sea posible para mantener la coherencia y reducir la duplicación de código.

### ❌ PROHIBIDO USAR:
- ❌ NO usar librerías externas (ej. Lodash, Moment.js, etc.)
- ❌ NO usar características experimentales o en desuso
- ❌ NO usar sintaxis personalizada o no estándar
- ❌ *ngIf="x" → @if (x) { }
- ❌ *ngFor="let i of items" → @for (i of items; track i.id) { }
- ❌ *ngSwitch="v" → @switch (v) { }
- ❌ [ngStyle]="css" → @let s = CSSUTILS.customCssToString(css); <div [style]="s">
- ❌ [ngClass]="{'a': b}" → [class.a]="b()"
- ❌ [(ngModel)]="v" → [value]="v()" (input)="v.set($event)"

### ⚠️ REGLA #3: TIPOS DE COLOR - SOLO ENUMS (IMPERATIVO)
- ⛔ **PROHIBIDO ABSOLUTAMENTE**: `AlfColorEnum | string` - NUNCA usar este patrón
- ✅ **CORRECTO**: `backgroundColor?: AlfColorEnum;`
- ❌ **INCORRECTO**: `backgroundColor?: AlfColorEnum | string;`
- Esta regla aplica a TODAS las propiedades de color en interfaces:
  - `color`, `backgroundColor`, `borderColor`
  - `borderTopColor`, `borderRightColor`, `borderBottomColor`, `borderLeftColor`
  - `boxShadowColor`, `textShadowColor`, `outlineColor`
  - Propiedades de color en estados: `hover.backgroundColor`, `focus.borderColor`, etc.
- **Razón**: Mantener consistencia de tipos, aprovechando el sistema de colores por enum.
- Si se necesita un color hexadecimal específico, agregar ese valor al enum `AlfColorEnum`.

### Regla #2: ESTILOS SCSS VS ANIMACIONES WAAPI
- **Estilos Estáticos**: Todo lo que sea visual y estático (diseño, layout base) DEBE hacerse con **SCSS**.
- **Animaciones e Interactividad**: Priorizar el uso de **Web Animations API (WAAPI)** en TypeScript para efectos dinámicos (Ripple, transiciones complejas, movimientos calculados).
- **Razón**: Mantener los componentes "auto-contenidos" (Self-Contained). No depender de `@keyframes` globales para que la lógica funcione.
- **Signals**: Usar la potencia de los Signals para configurar estas animaciones dinámicamente.
- **Usar `@use`** en lugar de `@import` (Sass moderno).
- Importar: `@use '../../../styles/variables';`
- Usar variables con prefijo: `variables.$color-primary`, `variables.$font-family`

### Regla #4: ARREGLOS VISUALES EN COMPONENTES, NO EN PÁGINAS DE DEMO
- **Los arreglos de problemas visuales (overflow, tamaños, responsividad) SIEMPRE se hacen en el componente de la librería, NO en las páginas de demo.**
- Las páginas de demo solo deben mostrar cómo usar los componentes, no arreglar sus problemas.
- Si un componente tiene un problema de overflow, tamaño o responsividad, se debe arreglar en los archivos `.scss` del componente mismo (ej: `alf-code.scss`, `alf-tabs.scss`).
- Esto garantiza que el arreglo beneficie a todos los usuarios de la librería, no solo a la demo.

### Regla #5: SINTAXIS ANGULAR 21 MODERNA - ELIMINAR DIRECTIVAS DEPRECATED
- **PROHIBIDO usar directivas deprecated de Angular**:
  - ❌ `*ngTemplateOutlet` → Duplicar contenido explícitamente o usar @let
  - ❌ `CommonModule` → Solo importar si se usan pipes (DatePipe, CurrencyPipe, etc.)
- **Regla de imports en componentes**:
  - ✅ Solo importar lo que realmente se usa
  - ✅ Si no usas `*ngIf`, `*ngFor`, `*ngSwitch`, `*ngTemplateOutlet` → NO importar `CommonModule`
  - ✅ Si usas `@if`, `@for`, `@switch` → NO necesitas `CommonModule`
- **Refactorización de templates**:
  - Si tienes `<ng-template #ref>` + `*ngTemplateOutlet="ref"` → Duplicar el contenido en cada lugar donde se use
  - Priorizar claridad y sintaxis moderna sobre DRY en templates pequeños
- **Verificación obligatoria**: Al crear o modificar componentes, revisar que:
  1. No se usen directivas deprecated
  2. Solo se importen módulos/directivas realmente utilizados
  3. Se use sintaxis de control flow moderna (@if, @for, @switch, @let)

## 📋 Información General del Proyecto
Este es un proyecto de **librería de componentes Angular 21** diseñado para ser reutilizable y escalable.

## 🎯 Reglas Fundamentales del Proyecto

### Prefijos y Nomenclatura
- **PREFIJO OBLIGATORIO**: Todos los componentes deben usar el prefijo `alf-`
- Ejemplo: `alf-button`, `alf-input`, `alf-card`, etc.
- Los selectores de componentes siempre deben comenzar con `alf-`

### Estilos
- **SCSS**: Usar SCSS como preprocesador de estilos (NO usar CSS ni LESS)
- Todos los archivos de estilos deben tener extensión `.scss`
- Configurar Angular CLI para usar SCSS por defecto

### 🎨 Sistema de Colores - Estrategia Dual

La librería implementa un **sistema dual de colores** para máxima flexibilidad:

#### 1️⃣ Variables SCSS (Para estilos estáticos)
**Ubicación**: `projects/alf-components/src/lib/shared/styles/_colors.scss`

**Uso en archivos `.scss`:**
```scss
@use '@shared/styles' as styles;

.my-component {
  background-color: styles.$primary;
  color: styles.$gray-900;
  border: 1px solid styles.$blue-500;
  
  &:hover {
    background-color: styles.$blue-600;
  }
}
```

**Paleta disponible:**
- Colores tema: `$primary`, `$secondary`, `$success`, `$danger`, `$warning`, `$info`
- Familias de colores: `$gray-*`, `$red-*`, `$orange-*`, `$yellow-*`, `$lime-*`, `$green-*`, `$emerald-*`, `$teal-*`, `$cyan-*`, `$sky-*`, `$blue-*`, `$indigo-*`, `$violet-*`, `$purple-*`, `$fuchsia-*`, `$pink-*`, `$rose-*`
- Tonalidades: 050, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 999

#### 2️⃣ Enum TypeScript (Para colores dinámicos)
**Ubicación**: `projects/alf-components/src/lib/shared/enums/alf-color-rgb.ts`

**Uso en componentes TypeScript con `[attr.style]`:**
```typescript
import { alfColorRgbEnum } from '@shared/enums/alf-color-rgb';

// En el componente
protected bgColor = signal<string>(alfColorRgbEnum.Primary);

// En el template con @let
@let customStyle = `background-color: ${bgColor()}`;
<div [attr.style]="customStyle"></div>
```

**Cuándo usar cada uno:**
- ✅ **Variables SCSS** → Estilos estáticos, pseudo-clases (`:hover`, `:focus`), media queries
- ✅ **Enum TypeScript** → Colores dinámicos configurables por `@Input()`, estilos condicionales, valores calculados

**Interface para tipar colores en @Input():**
```typescript
// Crear interface para nombres de colores
export type ColorName = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 
  'gray-500' | 'blue-600' | 'red-500' | /* ... etc */;

// Uso en componente
@Input() color: ColorName = 'primary';
```

### 🎨 GeneralStyleInterface - Sistema de Estilos Tipado

La librería incluye una interface completa para definir estilos de forma tipada:

**Ubicación**: `projects/alf-components/src/lib/shared/interfaces/general-style.interface.ts`

**Uso básico:**
```typescript
import { GeneralStyleInterface, ColorEnum, SpacingEnum, RadiusEnum, ShadowEnum } from 'alf-components';
import { CSSUtils } from '@shared/utils/css-utils';

protected buttonStyle = signal<GeneralStyleInterface>({
  backgroundColor: ColorEnum.Blue500,
  color: ColorEnum.Gray050,
  padding: SpacingEnum.Px4,
  borderRadius: RadiusEnum.Md,
  boxShadow: ShadowEnum.Sm,
  cursor: CursorEnum.Pointer,
  
  // Estados
  hover: {
    backgroundColor: ColorEnum.Blue600,
    boxShadow: ShadowEnum.Md
  },
  active: {
    backgroundColor: ColorEnum.Blue700
  }
});

// En el template
@let styleString = CSSUtils.customCssToString(buttonStyle());
<button [attr.style]="styleString">Click me</button>
```

**Enums disponibles:**
- `ColorEnum` - 320+ colores (primary, gray-050 a gray-999, blue-050 a blue-999, etc.)
- `SpacingEnum` - Espaciado (Px1=4px, Px4=16px, Px8=32px, etc.)
- `BorderEnum` - Anchos de borde (None, Thin=1px, Medium=2px, Thick=4px)
- `RadiusEnum` - Border radius (None, Sm=2px, Md=6px, Lg=8px, Full=9999px)
- `FontSizeEnum` - Tamaños de fuente (Xs=12px, Base=16px, Xl=20px, etc.)
- `FontWeightEnum` - Pesos de fuente (Light=300, Normal=400, Bold=700, etc.)
- `ShadowEnum` - Sombras (None, Sm, Base, Md, Lg, Xl, Inner)
- `CursorEnum` - Tipos de cursor (Auto, Pointer, NotAllowed, Grab, etc.)

**Propiedades soportadas:**
- Bordes: `border`, `borderStyle`, `borderColor`, `borderRadius`
- Espaciado: `padding`, `margin` (y variantes Top/Right/Bottom/Left)
- Tipografía: `fontSize`, `fontWeight`, `color`, `textAlign`, `lineHeight`
- Fondo: `backgroundColor`, `backgroundImage`
- Layout: `width`, `height`, `display`, `position`, `flex`, `grid`
- Efectos: `boxShadow`, `opacity`, `transform`, `transition`
- Estados: `hover`, `focus`, `active`, `disabled`
- Custom CSS: `customCSS` para propiedades no cubiertas

**Ver documentación completa**: `projects/alf-components/src/lib/shared/interfaces/README.md`

### 📝 Convenciones de Nomenclatura de Archivos

#### Enums
- **Nombre de archivo**: Sin `.enum` en el nombre
  - ✅ **Correcto**: `color.ts`, `border.ts`, `alf-unicode.ts`
  - ❌ **Incorrecto**: `color.enum.ts`, `border.enum.ts`
- **Contenido**: Usar `export enum NombreEnum`
  ```typescript
  // Archivo: color.ts
  export enum ColorEnum {
    Primary = 'primary',
    Secondary = 'secondary',
  }
  ```

#### Interfaces
- **Nombre de archivo**: Sin `.interface` en el nombre
  - ✅ **Correcto**: `general-style.ts`
  - ❌ **Incorrecto**: `general-style.interface.ts`
- **Contenido**: Usar `export interface NombreInterface`

#### Componentes
- **Nombre de archivo**: Siempre con prefijo `alf-`
  - `alf-button.component.ts`
  - `alf-button.component.html`
  - `alf-button.component.scss`
  - `alf-button.component.spec.ts`

### 🎯 Reglas de TypeScript

#### Formato de Tipos Complejos (Partial, Pick, Omit)
**SIEMPRE** usar formato multilínea para mejor legibilidad:

✅ **CORRECTO:**
```typescript
hover?: Partial<
  Omit<
    GeneralStyleInterface, 
    'hover' | 
    'focus' | 
    'active' | 
    'disabled'
  >
>;

icon?: {
  type: string;
  position?: Partial<
    Omit<
      AlfPositionEnum, 
      AlfPositionEnum.Bottom | 
      AlfPositionEnum.Top
    >
  >;
}
```

❌ **INCORRECTO:**
```typescript
hover?: Partial<Omit<GeneralStyleInterface, 'hover' | 'focus' | 'active' | 'disabled'>>;

icon?: {
  type: string;
  position?: Partial<Omit<AlfPositionEnum, AlfPositionEnum.Bottom | AlfPositionEnum.Top>>;
}
```

**Regla**: Cada tipo genérico y cada unión de tipos (`|`) debe estar en su propia línea indentada.

### Generación de Código
- **USO OBLIGATORIO DE CLI**: Todo código debe generarse usando Angular CLI
- Nunca crear archivos manualmente, siempre usar comandos `ng generate`
- Comandos principales:
  - `ng generate component <nombre> --prefix=alf` - Para componentes
  - `ng generate service <nombre>` - Para servicios
  - `ng generate module <nombre>` - Para módulos
  - `ng generate directive <nombre> --prefix=alf` - Para directivas
  - `ng generate pipe <nombre>` - Para pipes

### Estructura del Proyecto
```
workspace/
├── .github/
│   └── copilot-instructions.md (este archivo - memoria del proyecto)
├── alf-components-library/
│   ├── projects/
│   │   └── alf-components/
│   │       ├── src/
│   │       │   ├── lib/
│   │       │   │   ├── components/
│   │       │   │   │   └── alf-button/
│   │       │   │   │       ├── alf-button.component.ts
│   │       │   │   │       ├── alf-button.component.html
│   │       │   │   │       ├── alf-button.component.scss
│   │       │   │   │       ├── alf-button.component.spec.ts
│   │       │   │   │       ├── README.md
│   │       │   │   │       ├── interfaces/
│   │       │   │   │       ├── enums/
│   │       │   │   │       ├── utils/
│   │       │   │   │       └── predefineds/
│   │       │   │   ├── services/
│   │       │   │   └── models/
│   │       │   └── public-api.ts
│   │       └── README.md
│   ├── angular.json
│   ├── package.json
│   └── README.md
└── README.md (guía general del workspace)
```

## 🔧 Configuración Angular CLI

### angular.json - Configuraciones importantes:
```json
{
  "schematics": {
    "@schematics/angular:component": {
      "style": "scss",
      "prefix": "alf"
    },
    "@schematics/angular:directive": {
      "prefix": "alf"
    }
  }
}
```

## 📦 Componentes de la Librería


### Convenciones de Componentes
1. Cada componente debe tener:
   - Archivo TypeScript (.ts) - Componente principal
   - Archivo de template HTML (.html) - Vista del componente
   - Archivo de estilos SCSS (.scss) - Estilos específicos
   - Archivo de tests (.spec.ts) - Tests unitarios
   - README.md - Documentación del componente con ejemplos de uso
   - **interfaces/** - Carpeta con definiciones de interfaces TypeScript
   - **enums/** - Carpeta con definiciones de enumeraciones
   - **utils/** - Carpeta con funciones utilitarias relacionadas al componente
   - **predefineds/** - Carpeta con configuraciones predeterminadas (si aplica)

2. Estructura completa de archivos para cada componente:
   ```
   alf-button/
   ├── alf-button.component.ts       # Componente principal
   ├── alf-button.component.html     # Template
   ├── alf-button.component.scss     # Estilos SCSS
   ├── alf-button.component.spec.ts  # Tests
   ├── README.md                     # Documentación
   ├── interfaces/                   # Interfaces del componente
   │   ├── button-config.interface.ts
   │   └── button-events.interface.ts
   ├── enums/                        # Enumeraciones
   │   ├── button-size.enum.ts
   │   ├── button-variant.enum.ts
   │   └── button-type.enum.ts
   ├── utils/                        # Utilidades
   │   └── button-helpers.ts
   └── predefineds/                  # Configuraciones por defecto
       └── button-defaults.ts
   ```

3. **Workflow de creación de componente completo**:
   - Paso 1: Generar componente con CLI: `ng generate component components/alf-nombre --project=alf-components --export`
   - Paso 2: Crear manualmente las carpetas: interfaces/, enums/, utils/, predefineds/
   - Paso 3: Crear archivos dentro de cada carpeta según necesidad
   - Paso 4: Crear README.md del componente
   - Paso 5: Exportar todo en `public-api.ts`

4. **Contenido del README.md de cada componente**:
   ```markdown
   # alf-button
   
   ## Descripción
   Breve descripción del componente
   
   ## Uso básico
   ```html
   <alf-button>Click me</alf-button>
   ```
   
   ## Propiedades (@Input)
   | Propiedad | Tipo | Default | Descripción |
   
   ## Eventos (@Output)
   | Evento | Tipo | Descripción |
   
   ## Ejemplos
   Ejemplos de uso con diferentes configuraciones
   ```

5. Exportar todos los componentes públicos en `public-api.ts`

## 🚀 Comandos Importantes

### Desarrollo
```bash
# Generar nuevo componente
ng generate component components/alf-nombre --project=alf-components --export

# DESARROLLO: Modo watch (rebuild incremental - USAR SIEMPRE)
npm run watch
# O directamente: ng build alf-components --watch --configuration development

# Compilar la librería (build completo)
ng build alf-components
```

### Testing con Vitest
```bash
# Ejecutar tests en modo watch
npm test

# Ejecutar tests con interfaz UI
npm run test:ui

# Ejecutar tests con coverage
npm run test:coverage
```

### Instalación de dependencias
```bash
npm install
```

### ⚠️ IMPORTANTE para Desarrollo
- **SIEMPRE** usa `npm run watch` al desarrollar la librería
- El modo watch hace rebuild incremental (solo compila lo que cambia)
- NO uses `npm start` para desarrollo de la librería (hace build completo cada vez)
- Mantén `npm run watch` ejecutándose en segundo plano mientras desarrollas

### ⚙️ Testing
- **Vitest** configurado para tests unitarios
- Entorno jsdom para simular DOM del navegador
- Coverage reports disponibles en carpeta `coverage/`
- Tests de componentes Angular completamente soportados

### ⚠️ Problemas Conocidos (Vitest)
- **Inicialización de TestBed**: En algunos casos, la inicialización global falla ("Need to call TestBed.initTestEnvironment() first").
  - **Workaround**: Inicializar manualmente en el `beforeEach` o al inicio del spec:
    ```typescript
    import { getTestBed } from '@angular/core/testing';
    import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
    try { getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()); } catch {}
    ```

## 📝 Reglas de Codificación

### TypeScript
- Usar tipos estrictos
- Interfaces para definir contratos
- Evitar `any`, usar tipos específicos
- Documentar con JSDoc cuando sea necesario

### HTML Templates
- Usar Angular templates syntax
- Binding de propiedades con `[property]`
- Event binding con `(event)`
- Two-way binding con `[(ngModel)]`

### SCSS
- Usar variables para colores y tamaños
- Organizar estilos con BEM o similar
- Aprovechar nesting de SCSS
- Crear mixins reutilizables cuando sea apropiado

### Accesibilidad
- Incluir atributos ARIA cuando sea necesario
- Asegurar navegación por teclado
- Contraste de colores adecuado
- Labels descriptivos

## 🔄 Workflow de Desarrollo

1. **Crear componente base**: Usar `ng generate component components/alf-nombre --project=alf-components --export --style=scss`
2. **Crear estructura de carpetas**: Crear manualmente interfaces/, enums/, utils/, predefineds/ dentro del componente
3. **Definir interfaces**: Crear archivos .interface.ts en la carpeta interfaces/
4. **Definir enums**: Crear archivos .enum.ts en la carpeta enums/
5. **Crear utilidades**: Crear archivos .ts con funciones helper en utils/
6. **Configuraciones por defecto**: Crear archivos con defaults en predefineds/
7. **Implementar lógica**: Añadir @Input(), @Output(), lógica del componente
8. **Estilos SCSS**: Implementar estilos responsivos
9. **Tests**: Escribir tests unitarios en el .spec.ts
10. **Documentación**: Crear README.md del componente con ejemplos
11. **Exportar**: Añadir todas las exports necesarias a `public-api.ts`
12. **Build**: Compilar con `ng build alf-components`

## 📚 Recursos y Referencias

### Angular 21
- [Documentación oficial Angular](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [Angular Library Guide](https://angular.io/guide/creating-libraries)

### SCSS
- [Documentación SCSS](https://sass-lang.com/documentation)
- Variables, mixins, nesting, extends

## ⚠️ IMPORTANTE - Para la IA

Cuando trabajes en este proyecto:

1. **SIEMPRE** verifica este archivo antes de crear componentes
2. **NUNCA** olvides el prefijo `alf-` en componentes y directivas
3. **SIEMPRE** usa SCSS para estilos
4. **SIEMPRE** usa Angular CLI para generar código
5. **NUNCA** crees archivos manualmente (excepto configuración)
6. Mantén este archivo actualizado con nuevas reglas o componentes
7. Consulta el README.md del proyecto para información adicional

## 📋 Estado Actual del Proyecto

- **Versión Angular**: 21
- **Prefijo**: alf-
- **Estilos**: SCSS
- **Estado**: Desarrollo activo de componentes Core.
- **Componentes Completados (10/10)**: 
  - `alf-button`
  - `alf-checkbox`
  - `alf-input`
- **Próximo Objetivo**: `alf-autocomplete` (TODO creado).
- **Roadmap**: 
  - Alcanzar ~30 componentes estandarizados.
  - Finalizar herramientas de monorepo (NX-like).
  - Integración Backend NestJS + MCP.
- **Última actualización**: 10 de enero de 2026

---

## 🎨 Skeleton de Páginas Demo

### Estructura HTML para páginas de demostración de componentes

Todas las páginas de demo de componentes deben seguir esta estructura consistente:

```html
<div class="page-container">
    <!-- HEADER -->
    <div class="page-header">
        <h1>🗂️ Nombre del Componente</h1>
        <div class="page-description-box">
            <p>Descripción breve del componente y sus capacidades principales.</p>
        </div>
    </div>
  
    <!-- SECCIÓN DE EJEMPLO -->
    @let exampleConfig = exampleData().config();
    @let exampleHtmlCode = exampleData().htmlCode;
    @let exampleTsCode = exampleData().tsCode;
    <section class="demo-section-container">
        <h2 class="section-title">🚀 Título de la Sección</h2>
        <p class="section-description">Descripción breve de lo que muestra esta sección.</p>

        <alf-card [config]="sectionCardConfig">
            <h3 class="section-description">Nombre del Ejemplo</h3>
            <alf-tabs [config]="exampleConfig">
                <ng-template alfTabContent="example">
                    <!-- Componente de ejemplo aquí -->
                </ng-template>
                <ng-template alfTabContent="html">
                    <alf-code 
                        [code]="exampleHtmlCode" 
                        language="html"
                        [showCopyButton]="true">
                    </alf-code>
                </ng-template>
                <ng-template alfTabContent="ts">
                    <alf-code 
                        [code]="exampleTsCode" 
                        language="typescript"
                        [showCopyButton]="true">
                    </alf-code>
                </ng-template>
            </alf-tabs>
            <p class="code-snippet">&lt;alf-component&gt;&lt;/alf-component&gt;</p>
        </alf-card>
    </section>
</div>
```

### Clases CSS requeridas (definidas en `styles.scss`)
- `.page-container` - Contenedor principal con padding y max-width
- `.page-header` - Cabecera centrada con título y descripción
- `.page-description-box` - Caja con gradiente para descripción principal
- `.demo-section-container` - Sección con borde azul y fondo gradiente
- `.section-title` - Título de sección (h2) en color púrpura
- `.section-description` - Descripción en cursiva sin fondo
- `.code-snippet` - Snippet de código al final del card

### Configuración del Card interior
```typescript
protected sectionCardConfig: AlfCardInterface = {
  appearance: AlfCardAppearanceEnum.Outlined,
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '12px',
  borderColor: '#e2e8f0',
  minWidth: '85%',
};
```

---

**Nota**: Este archivo sirve como memoria persistente para GitHub Copilot y cualquier IA que trabaje en este proyecto. Mantenerlo actualizado es crucial para la consistencia del código.

### 🔒 Regla #6: MODIFICADORES DE ACCESO Y RIGOR TÉCNICO
- **MODIFICADORES OBLIGATORIOS**: NUNCA dejar una variable o método sin modificador. 
  - ✅ Usar `public`, `private` o `protected` SIEMPRE.
- **NO ANIDAR FUNCIONES**: 
  - ✅ PROHIBIDO meter funciones dentro de funciones (e.g. handlers dentro de effects). 
  - ✅ Extraer toda la lógica a métodos de clase (Arrow Functions) independientes.
- **READONLY OBLIGATORIO**: 
  - ✅ Usar `readonly` en todos los **Signals** (`input`, `computed`, `model`, `signal`).
  - ✅ Usar `readonly` en todas las **Dpendencias Inyectadas** (`inject(ElementRef)`, etc.).
- **Arrow Functions**: NUNCA usar la palabra reservada `function` ni métodos de clase tradicionales. SIEMPRE arrow functions para evitar problemas de contexto (`this`).

### 🚀 Código Limpio (Ejemplo Maestro)
```typescript
export class AlfComponent {
  private readonly el = inject(ElementRef);
  public readonly config = input<Interface>(DEFAULT);
  private readonly internalSignal = signal(0);
  
  protected onClick = (): void => {
    this.internalSignal.set(1);
  };
}
```

### Funciones - SIEMPRE Arrow Functions
```typescript
// ✅ CORRECTO
protected onClick = (event: Event): void => { };
// ❌ INCORRECTO
protected onClick(event: Event): void { }
```
### Signals (Angular 21)
```typescript
// signal() - Estado mutable
protected count = signal(0);
protected name = signal('');
this.count.update(v => v + 1);
this.name.set('nuevo');

// computed() - Valores derivados
protected fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

// model() - Two-way binding con padre
protected value = model<string>('');
// Uso: <alf-input [(value)]="searchText"></alf-input>

// effect() - SOLO como propiedad de clase, NUNCA en constructor
private myEffect = effect(() => {
  console.log(this.count()); // Reacciona a cambios
});

// effect() con cleanup para eventos
private clickEffect = effect(() => {
  if (this.isOpen()) {
    const handler = (e: Event): void => { };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }
  return undefined;
});
```

### ❌ NO usar @HostListener
```typescript
// ❌ PROHIBIDO
@HostListener('document:click', ['$event'])
// ✅ CORRECTO: Usar effect() con cleanup (ver arriba)
```

### Templates - @let para Variables Locales e input signals
```html
@let customCssString = CSSUTILS.customCssToString(config.customCSS);
@let userName = user().name.toUpperCase();
<div [style]="customCssString">{{ userName }}</div>
```

---

## 🚀 Flujo de Desarrollo

### Comandos Principales
```bash
# Levantar servidor de desarrollo (compila librería + sirve demo)
npm run start

# Modo desarrollo con watch (librería + demo en paralelo)
npm run dev
```

### 🌐 Abrir Simple Browser de VS Code

**No es posible abrir el flash desde npm scripts** porque es una función interna de VS Code sin CLI.

**⚠️ REGLA IMPORTANTE**: Cuando el usuario diga "abre el browser", "levanta el servidor con browser", "levanta el servidor", o cualquier variación, **SIEMPRE ejecutar automáticamente**:
```
open_simple_browser con URL http://localhost:4200
```

**Opciones para el usuario:**
1. **Decir "abre el browser"** → Copilot lo abre automáticamente
2. **Usar comando de VS Code**: `Ctrl+Shift+P` → "Simple Browser: Show" → `http://localhost:4200`

### Reglas de Desarrollo
1. **NUNCA apagar el servidor** - El usuario lo gestiona manualmente
   - ⚠️ **NUNCA ejecutar `npm run start`** - El servidor ya está corriendo
   - ⚠️ **NUNCA ejecutar `ng build alf-components`** - No es necesario
   - El servidor en modo watch detectará los cambios y recargará automáticamente

2. **Abrir Simple Browser automáticamente** cuando el usuario lo pida:
   - Usar la herramienta `open_simple_browser` con la URL `http://localhost:4200`
   - NO preguntar, simplemente abrirlo

---

**🎯 Si tienes dudas: 1) Revisa esta memoria, 2) Busca ejemplos existentes, 3) Consulta Angular docs, 4) PREGUNTA**

**⚠️ RECORDATORIO: Lee TODO antes de actuar. No inventes sintaxis.**

LO MAS IMPORTANTE ES NO USAR FUNCIONES DENTRO DE FUNCIONES, ASI EVITAMOS EL CALLBACK HELL.
HAy que tener en cuenta que si se le indica, hay que agregar el form igual que se ha echo el el alf-checkbox


--- para crear un nuevo componente, 
1. Estructura de Archivos
Cada componente debe vivir en su propia carpeta y tener subcarpetas organizadas.

text
alf-nuevo-componente/
├── alf-nuevo-componente.ts         # Lógica (Signals, Computed)
├── alf-nuevo-componente.html       # Template (Clean code con @let)
├── alf-nuevo-componente.scss       # Estilos (Mixins, Vars, States)
├── alf-nuevo-componente.spec.ts    # Tests Unitarios completos
├── README.md                       # Documentación
├── interfaces/
│   └── alf-nuevo-componente.ts     # Interface que extiende AllPropertiesInterface
├── enums/                          # Enums específicos del componente
│   └── nuevo-componente-variant.ts
└── predefineds/                    # Configuraciones por defecto
    └── alf-nuevo-componente-defaults.ts
2. La Interface (interfaces/alf-nuevo.ts)
Clave: Debe extender de AllPropertiesInterface para heredar automáticamente todas las propiedades de estilo comunes (padding, margin, shadow, border, color, etc.).

typescript
import { AllPropertiesInterface } from '../../../../shared/interfaces/all-properties';
// 1. Extender de AllPropertiesInterface
export interface AlfNuevoInterface extends AllPropertiesInterface {
  
  // 2. Propiedades Específicas del componente
  behaviorProp?: string;
  
  // 3. Documentación JSDoc DETALLADA en cada propiedad
  /**
   * Descripción clara de qué hace esta propiedad
   * @default 'valor-default'
   */
  specificProp?: boolean;
}
1. Configuraciones por Defecto (predefineds/defaults.ts)
Define siempre un objeto base para que el componente nunca inicie "vacío".

typescript
export const ALF_NUEVO_DEFAULT: AlfNuevoInterface = {
  variant: AlfColorVariantEnum.Primary, // Variante por defecto
  size: AlfFontSizeEnum.Base,           // Tamaño por defecto
  // ... otras propiedades base
};
4. Lógica del Componente (
.ts
)
Usa input(), computed() y signals. Evita @Input() tradicional.

typescript
@Component({
  selector: 'alf-nuevo',
  standalone: true,
  imports: [NgTemplateOutlet, TooltipText, /* ...otras directivas comunes */],
  // ...
})
export class AlfNuevoComponent {
  // 1. INPUT PRINCIPAL: Configuración
  config = input<AlfNuevoInterface>(ALF_NUEVO_DEFAULT);
  
  // 2. COMPUTED para fusionar config (Predefined + User Config + Defaults)
  protected cfg = computed(() => {
    const c = this.config();
    // Lógica de merge inteligente (ver alf-input o alf-button para ejemplo)
    return { ...ALF_NUEVO_DEFAULT, ...c };
  });
  // 3. COMPUTED para generar estilos dinámicos (CRÍTICO para AllPropertiesInterface)
  protected styleString = computed(() => {
    // generateStyleString convierte el objeto de config en variables CSS (--alf-color-...)
    return generateStyleString(this.cfg(), 'alf-nuevo');
  });
  // 4. HostBinding para clases globales (como responsive)
  @HostBinding('class.responsive')
  protected get isResponsive(): boolean {
    return this.cfg().responsive ?? false;
  }
}
5. Template Limpio (
.html
)
Usa la nueva sintaxis @let de Angular 18+ para evitar llamar cfg() repetidamente y mantener el template limpio.

html
<!-- 1. Definir variables al inicio -->
@let c = cfg();
@let styles = styleString();
@let variantClass = c.variant || '';
@let animationClass = c.animation?.type ? 'alf-animation-' + c.animation.type : '';
<!-- 2. Aplicar clases y estilos dinámicos -->
<div class="alf-nuevo-container"
     [class]="variantClass + ' ' + animationClass + ' ' + (c.defaultClass || '')"
     [style]="styles" <!-- Aquí se inyectan las variables CSS generadas -->
     [AlfTooltipText]="c.tooltip || ''"> <!-- Soporte nativo de tooltip -->
  <!-- 3. Contenido condicional -->
  @if (c.loading) {
     <alf-spinner></alf-spinner> // Soporte de loading
  } @else {
     <ng-content></ng-content> // Proyección de contenido
  }
</div>
6. Estilos SCSS "Inteligentes" (
.scss
)
No escribas estilos CSS duros (color: red). Usa Variables CSS con fallbacks y los Mixins de Estados.

scss
@use '../../../shared/styles/component-states' as states; // IMPORTANTE
.alf-nuevo-container {
  // 1. Estilos base
  display: flex;
  
  // 2. MIXINS MÁGICOS (Habilitan shadow, spacing, color, border del playground)
  @include states.shadow-properties('alf-nuevo');
  @include states.spacing-properties('alf-nuevo');
  @include states.color-properties('alf-nuevo');
  // 3. Variables con fallback (generadas por generateStyleString en el .ts)
  border-radius: var(--alf-nuevo-border-radius, 4px);
  
  // 4. Estados Hover/Focus (usando mixins para soportar configs de usuario)
  &:hover {
     @include states.shadow-properties-hover('alf-nuevo');
     transform: var(--alf-transform-hover, none);
  }
}
// 5. Variantes (definidas por clases CSS)
.alf-nuevo-variant-primary { ... }
.alf-nuevo-variant-outline { ... }
7. Integración con Playground (
playground-controls.ts
)
Para que aparezca en el Playground con todas las pestañas automáticas (Border, Shadow, Padding, Colors...), debes configurarlo así:

Añadir Tipo: Agregar tu componente al enum PlaygroundComponentType.
Definir Controles Específicos: Crear función getNuevoComponentControls() que retorne solo las propiedades únicas (no margin, padding, etc., que son automáticas).
Registrar en Tabs: En 
tabsButtonDefinition
, añadir el caso:
typescript
case PlaygroundComponentType.Nuevo:
  controls = getNuevoComponentControls();
  break;
Esto generará automáticamente todas las pestañas "Common Properties", "Border", "Shadows", "Appearance" basándose en que tu componente implementa AllPropertiesInterface.

8. Tests Unitarios (
.spec.ts
)
Para estar al nivel de alf-button, tus tests deben cubrir:

Renderizado básico: ¿Se crea el componente?
Inputs: Si cambio el config, ¿cambia la clase/texto?
Eventos: ¿Emite los outputs correctamente?
Estilos: ¿Se aplican las clases de variante y tamaño?
Accesibilidad: ¿Tienen los aria-label correctos?
Contenido Proyectado: ¿Se ve lo que meto en <ng-content>?
Estados: Loading, Disabled (y si soportan Signals).
Resumen
Para hacer un componente "igual":

Extiende AllPropertiesInterface.
Usa generateStyleString en el 
.ts
.
Usa los mixins de states en (shadows, spacing, color) el 
.scss
.
Registra solo las propiedades únicas en el playground (el resto es automático).
Escribe tests probando variantes y estados.
Siguiendo paso a paso esta estructura, tendrás un componente idéntico en calidad y capacidades al alf-button.

tienes que exportar en la public-api.ts
crear un ejemplo en la demo
añadir en la demo el tab, y el router
agregar el input al playground

IMPORTANTE, ANTES DE HACER NADA REVISA EL ALF-BUTTON PARA VER COMO ESTÁ ESTRUCTURADO.