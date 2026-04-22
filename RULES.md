# 📜 ALFONIZER - REGLAS DE ORO (ESTÁNDARES DE ÉLITE)

Este documento es la **fuente de verdad absoluta** para el desarrollo en este proyecto. Cualquier IA o desarrollador debe seguir estas reglas sin excepción para mantener la calidad y el rigor técnico.

---

## 🏗️ 1. Arquitectura y Tecnologías
- **Core**: Angular 21 (Oficial).
- **Paradigma**: Standalone Components, Zoneless Ready.
- **Iniciativa Prohibida (REGLA DE ORO)**: 
  - ❌ **PROHIBIDO** hacer absolutamente nada que el USER no pida explícitamente. 
  - ❌ **PROHIBIDO** añadir propiedades, objetos (ej. `premium`) o lógica "por cuenta propia" que no haya sido solicitada.
- **Estilos**: Estrategia Dual.
  - **SCSS**: Para estilos estáticos y layout base.
  - **WAAPI (Web Animations API)**: Prioridad absoluta para animaciones dinámicas e interactivas (Ripple, Inyecciones, etc.) para mantener los componentes "Auto-Contenidos" (Self-Contained).

## 🔒 2. Rigor Técnico y Visibilidad (IMPERATIVO)
- **Modificadores de Acceso**: NUNCA dejar una variable o método sin modificador. 
  - ✅ Usar `public`, `private` o `protected` en TODO.
- **Inmutabilidad de Propiedades**: 
  - ✅ Usar `readonly` en todos los **Signals** (`input`, `computed`, `model`, `signal`).
  - ✅ Usar `readonly` en todas las **Dependencias Inyectadas** (`inject(ElementRef)`, etc.).

## ⚛️ 3. Signals y Reactividad (Angular 21)
- **Signals**: Uso obligatorio de `input()`, `computed()`, `signal()` y `model()`.
- **@Input**: ❌ PROHIBIDO el uso de `@Input()` tradicional.
  - ⚠️ **EXCEPCIÓN Vitest/JIT**: `input()` signals NO se resuelven en compilación JIT (Vitest). En componentes/directivas testeados con Vitest, usar el patrón puente: `@Input() set prop(v) { this._signal.set(v); }` + `private readonly _signal = signal(default);`. La lógica reactiva (`computed`, `effect`) consume el `signal()` interno.
- **Effects**: 
  - ✅ Declarar `effect()` **OBLIGATORIAMENTE** como propiedad de clase.
  - ❌ PROHIBIDO declarar efectos dentro de constructores o métodos (e.g. `this.init()`).

## 🧹 4. Calidad de Código (Clean Code - TypeScript)
- **Funciones Flecha (Arrow Functions)**: 
  - ✅ Todo método de clase DEBE ser una Arrow Function para asegurar el contexto de `this`.
  - ❌ PROHIBIDO el uso de la palabra reservada `function` en lógica de clase.
- **No Anidación (Zero Callback Hell)**: 
  - ✅ PROHIBIDO meter funciones dentro de funciones (e.g. handlers dentro de effects).
  - ✅ Extraer toda la lógica y manejadores a métodos de clase independientes.
- **Legibilidad (Human Readable)**:
  - ✅ PROHIBIDO escribir código ininteligible o excesivamente complejo sin necesidad.
  - ✅ El código DEBE ser completamente legible y auto-explicativo para un humano. Priorizar la claridad sobre trucos de sintaxis oscuros.
  - ❌ PROHIBIDO "Hacks" o "Guarrerías técnicas". Priorizar cimientos sólidos y excelencia técnica sobre soluciones rápidas o "mágicas".

## 📄 5. Templates y HTML (Angular 21 Purista)
- **Control Flow Moderno**: 
  - ✅ SOLO usar `@if`, `@for`, `@switch` y `@let`.
  - ❌ PROHIBIDO `*ngIf`, `*ngFor`, `*ngSwitch`.
- **Variables Locales**: 
  - ✅ Usar `@let` para limpiar el template y evitar llamadas repetitivas a signals/funciones.
- **Directivas Prohibidas (Deprecated/Legacy)**:
  - ❌ PROHIBIDO `CommonModule` (solo usar si se requieren Pipes como `DatePipe`).
  - ❌ PROHIBIDO `*ngTemplateOutlet` (Usar `@let` o duplicación explícita).
    - ❌ PROHIBIDO `[ngStyle]` → Usar `@let` para generar el string y `[style]="string"`.
- **Formularios**: 
  - ❌ PROHIBIDO `[(ngModel)]` → Usar `[value]="v()"` y `(input)="v.set($event)"` o `model()`.

## 🎨 6. Diseño y Estandarización
- **Nomenclatura**: Prefijo obligatorio `alf-` para componentes y directivas.
- **Colores**: 
  - ✅ SOLO usar `AlfColorEnum`.
  - ❌ PROHIBIDO ABSOLUTAMENTE el uso de `string` (hex, rgb) en las interfaces de color.
  - Si un color no existe, se añade al Enum.

## 🧪 7. Testing (Vitest + Angular)
- **Entorno JSDOM**:
  - ⚠️ JSDOM **valida valores CSS**. Los valores de `AlfColorEnum` que son clases Tailwind (e.g. `'red-500'`) son rechazados por JSDOM como valores inválidos de `background-color`.
  - ✅ En tests que verifican estilos inline, usar colores CSS válidos del enum: `White`, `Black`, `Transparent`.
  - ✅ O verificar mediante spies (`Renderer2`, `setProperty`) en vez de leer `element.style`.
- **TestBed**: Usar workaround Regla #439 (`initTestEnvironment`) para Vitest.

---

**Nota para la IA**: Lee este archivo al inicio de cada tarea. Si el código generado viola alguna de estas reglas, se considera un error crítico.

### REGLAS INMUTABLES ###
- 1) REGLA #0: COMUNICACIÓN CONCISA
    - **Sé breve y directo**. No me estreses con explicaciones largas.
    - Confirma acciones con frases cortas. Evita listas de checkmarks y resúmenes extensos.
    - Si algo sale mal, arréglalo y sigue adelante.
- 2) SOLO ANGULAR 21 OFICIAL
    - ✅ SOLO características OFICIALES de Angular 21 - CONSULTA la documentación si no sabes algo
    - ❌ NO inventes sintaxis - ❌ NO uses características deprecated
    - 🔍 VERIFICA en docs oficiales antes de implementar - Si tienes dudas, PREGUNTA
- 3) REUTILIZAR componentes existentes
    - ✅ REUTILIZAR componentes existentes - Antes de crear un nuevo componente, verifica si ya existe uno que cumpla la función requerida. Reutiliza componentes siempre que sea posible para mantener la coherencia y reducir la duplicación de código.   
- 4) ❌ PROHIBIDO USAR:
    - ❌ NO usar librerías externas (ej. Lodash, Moment.js, etc.)
    - ❌ NO usar características experimentales o en desuso
    - ❌ NO usar sintaxis personalizada o no estándar
    - ❌ *ngIf="x" → @if (x) { }
    - ❌ *ngFor="let i of items" → @for (i of items; track i.id) { }
    - ❌ *ngSwitch="v" → @switch (v) { }
    - ❌ [ngStyle]="css" → @let s = CSSUTILS.customCssToString(css); <div [style]="s">
    - ❌ [(ngModel)]="v" → [value]="v()" (input)="v.set($event)"
    - ❌ [ngStyle]="css" → @let s = CSSUTILS.customCssToString(css); <div [style]="s">
    - ❌ Si existe una interface de entrada no poner nunca variable: interface | string | number, solo la interface es valida. No poner nunca: interface | string | number, solo la interface es valida.
-  5) Usar siempre WAAPI para animaciones y no css.
-  6) Usar `@use`** en lugar de `@import` (Sass moderno).
-  7) Los arreglos de problemas visuales (overflow, tamaños, responsividad) SIEMPRE se hacen en el componente de la librería, NO se toca nada fuera del comopnente. Si un componente tiene un problema de overflow, tamaño o responsividad, se debe arreglar en los archivos `.scss` del componente mismo (ej: `alf-code.scss`, `alf-tabs.scss`).
-  8) SINTAXIS ANGULAR 21 MODERNA - ELIMINAR DIRECTIVAS DEPRECATED
   - **PROHIBIDO usar directivas deprecated de Angular**:
     - ❌ `*ngTemplateOutlet` → Duplicar contenido explícitamente o usar @let
     - ❌ `CommonModule` → Solo importar si se usan pipes (DatePipe, CurrencyPipe, etc.)
   - **Regla de imports en componentes**:
     - ✅ Solo importar lo que realmente se usa
     - ✅ Si usas `@if`, `@for`, `@switch` → NO necesitas `CommonModule`
   - **Refactorización de templates**:
     - Priorizar claridad y sintaxis moderna sobre DRY en templates pequeños
   - **Verificación obligatoria**: Al crear o modificar componentes, revisar que:
     1. No se usen directivas deprecated
     2. Solo se importen módulos/directivas realmente utilizados
     3. Se use sintaxis de control flow moderna (@if, @for, @switch, @let)
- 9) Prefijos y Nomenclatura
    - **PREFIJO OBLIGATORIO**: Todos los componentes deben usar el prefijo `alf-`
    - Ejemplo: `alf-button`, `alf-input`, `alf-card`, etc.
    - Los selectores de componentes siempre deben comenzar con `alf-`
- 10) Estilos
    - **SCSS**: Usar SCSS como preprocesador de estilos (NO usar CSS ni LESS)
    - Todos los archivos de estilos deben tener extensión `.scss`
    - **Unidades**: Priorizar siempre el uso de `%` sobre `vh` o `vw` para dimensiones y layouts siempre que sea posible.
    - **Transiciones (ESTÁNDAR ÉLITE)**: OBLIGATORIO usar el mixin `@include alf-transition;` en el selector principal de cada componente para garantizar una fluidez uniforme de **700ms**.
    - **Rigor en Mixins Reactivos**: OBLIGATORIO actualizar todas las propiedades individuales (ej. `border-top-left-radius`, `padding-top`) dentro de los estados `:hover`, `:active` y `:focus` de los mixins base. Esto evita bloqueos de especificidad y garantiza que las transiciones funcionen siempre.
- 11) Enums
    - **Nombre de archivo**: Puede incluir `.enum` o `.interface` según sea necesario.
    - **Contenido**: Usar `export enum NombreEnum`
      ```typescript
      // Archivo: color.ts
      export enum ColorEnum {
        Primary = 'primary',
        Secondary = 'secondary',
      }
      ```
- 12) Interfaces
    - **Contenido**: Usar `export interface NombreInterface`
- 13) Generación de Código
    - **USO OBLIGATORIO DE CLI**: Todo código debe generarse usando Angular CLI
    - Nunca crear archivos manualmente, siempre usar comandos `ng generate`
    - Comandos principales:
      - `ng generate component <nombre> --prefix=alf` - Para componentes
      - `ng generate service <nombre>` - Para servicios
      - `ng generate module <nombre>` - Para módulos
      - `ng generate directive <nombre> --prefix=alf` - Para directivas
      - `ng generate pipe <nombre>` - Para pipes
- 14) Convenciones de Estructura de Componentes
    - Cada componente debe respetar la siguiente estructura (basada en el estándar Élite):
      - `[nombre].ts` - Componente principal
      - `[nombre].html` - Vista del componente
      - `[nombre].scss` - Estilos específicos
      - `[nombre].spec.ts` - Tests unitarios
      - `README.english.md` y `README.spanish.md` - Documentación para usuarios (sin emoticonos)
      - `ia_usage.md` - Documentación técnica en inglés para IA
      - **interfaces/** - Carpeta con definiciones de interfaces
      - **enums/** - Carpeta con enumeraciones
      - **utils/** o **i18n/** - Carpetas para utilidades o traducciones (si aplica)
      - **predefined/** - Carpeta con configuraciones de diseño predeterminadas (Factory Pattern)
- 15) Workflow de Desarrollo Élite
    1. **Generación**: `ng generate component components/alf-[nombre] --project=alf-components --export --style=scss`
    2. **Estructura**: Crear carpetas `interfaces/`, `enums/`, `predefined/` e `i18n/` (o `utils/`).
    3. **Contratos**: Definir interfaces y enums (respetando reglas 11 y 12 de nomenclatura).
    4. **Factory Pattern**: Crear la configuración base y variantes en `predefined/[nombre].predefined.ts`.
    5. **Lógica Élite**: Heredar de `AlfBaseComponent`, usar @Input con setters hacia signals y @Output moderno.
    6. **Estilos**: SCSS para estático, WAAPI (en TS) para dinámico/interactivo.
    7. **Calidad**: Escribir suite de tests unitarios en `.spec.ts`.
    8. **Documentación Dual**: Crear `README.english.md`, `README.spanish.md` (sin emojis) e `ia_usage.md` (inglés para IA).
    9. **Integración**: Exportar en el `public-api.ts` correspondiente.
    10. **Validación**: Ejecutar build y verificar integridad de los tests.
- 16) y adapta esto tambien 
    1. **SIEMPRE** verifica este archivo antes de crear componentes
    2. **NUNCA** olvides el prefijo `alf-` en componentes y directivas
    3. **SIEMPRE** usa Angular CLI para generar código
    4. **NUNCA** crees archivos manualmente (excepto configuración)
    5. Mantén este archivo actualizado con nuevas reglas o componentes
- 17) MODIFICADORES DE ACCESO Y RIGOR TÉCNICO
    1- **MODIFICADORES OBLIGATORIOS**: NUNCA dejar una variable o método sin modificador. 
    2- Usar `public`, `private` o `protected` SIEMPRE.
    3- **NO ANIDAR FUNCIONES**: 
    4- PROHIBIDO meter funciones dentro de funciones (e.g. handlers dentro de effects). 
    5- Extraer toda la lógica a métodos de clase (Arrow Functions) independientes.
    6- **READONLY OBLIGATORIO**: 
    7- Usar `readonly` en todos los **Signals** (`input`, `computed`, `model`, `signal`).
    8- Usar `readonly` en todas las **Dependencias Inyectadas** (`inject(ElementRef)`).
    9- **Arrow Functions**: NUNCA usar la palabra reservada `function` ni métodos de clase tradicionales. SIEMPRE arrow functions para evitar problemas de contexto (`this`).
    10- Templates - @let para Variables Locales e input signals
    11- Abrir Simple Browser de VS Code

- 18) PROHIBICIÓN ABSOLUTA DE TIMERS IMPERATIVOS
    - ❌ **EVITAR A TODA COSTA** el uso de `setTimeout` o `setInterval`.
    - Toda la reactividad y sincronización del DOM debe manejarse mediante Signals (`effect()`, `computed()`), eventos nativos (`animationend`, `transitionend`), promesas nativas (WAAPI `.onfinish`) o los ciclos de vida y directivas modernas de Angular. El uso de retardos artificiales con `setTimeout` es síntoma de mala arquitectura o de un hack inestable.

- 19) CICLOS DE VIDA: PROHIBIDO USAR ARROW FUNCTIONS
    - ❌ **PROHIBIDO** definir ciclos de vida de Angular (`ngOnInit`, `ngAfterViewInit`, `ngOnDestroy`, `ngOnChanges`, etc.) como Arrow Functions.
    - Angular detecta los lifecycle hooks a través de la cadena de prototipos. Las Arrow Functions definidas como propiedades de clase (`public readonly ngAfterViewInit = () => {}`) son propiedades de instancia que Angular **NO puede detectar**, causando que el hook nunca se ejecute.
    - ✅ **OBLIGATORIO** usar métodos regulares para todos los ciclos de vida:
      ```typescript
      // ✅ CORRECTO
      ngAfterViewInit(): void { ... }
      ngOnDestroy(): void { ... }
      
      // ❌ INCORRECTO - Angular NO los detecta
      public readonly ngAfterViewInit = (): void => { ... };
      public readonly ngOnDestroy = (): void => { ... };
      ```

#########################
# 💎 PRINCIPIOS ULTRA-IMPORTANTES (FILOSOFÍA ÉLITE)
- **DRY ABSOLUTO (Don't Repeat Yourself)**: Si lo vas a usar dos veces, extráelo. Si está en CSS y puede estar en una variable inyectada, muévelo a la lógica de señales.
- **ESTÉTICA MINIMALISTA**: Menos es más. Diseños limpios, sin ruido visual, pero que se sientan "premium" mediante micro-interacciones (Ripple, WAAPI).
- **LEGIBILIDAD HUMANA**: El código debe ser leíble por un humano como si fuera un libro. Priorizar claridad sobre "scripts inteligentes" pero oscuros.

#########################

**🎯 Si tienes dudas: 1) Revisa esta memoria, 2) Busca ejemplos existentes, 3) Consulta Angular docs, 4) PREGUNTA**

**⚠️ RECORDATORIO: Lee TODO antes de actuar. No inventes sintaxis. LO MAS IMPORTANTE ES NO USAR FUNCIONES DENTRO DE FUNCIONES, ASI EVITAMOS EL CALLBACK HELL.
Hay que tener en cuenta que si se le indica, hay que agregar el form igual que se ha hecho en el alf-checkbox.
**