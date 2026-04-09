# 📜 ALFONIZER - REGLAS DE ORO (ESTÁNDARES DE ÉLITE)

Este documento es la **fuente de verdad absoluta** para el desarrollo en este proyecto. Cualquier IA o desarrollador debe seguir estas reglas sin excepción para mantener la calidad y el rigor técnico.

---

## 🏗️ 1. Arquitectura y Tecnologías
- **Core**: Angular 21 (Oficial).
- **Paradigma**: Standalone Components, Zoneless Ready.
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

## 📄 5. Templates y HTML (Angular 21 Purista)
- **Control Flow Moderno**: 
  - ✅ SOLO usar `@if`, `@for`, `@switch` y `@let`.
  - ❌ PROHIBIDO `*ngIf`, `*ngFor`, `*ngSwitch`.
- **Variables Locales**: 
  - ✅ Usar `@let` para limpiar el template y evitar llamadas repetitivas a signals/funciones.
- **Directivas Prohibidas (Deprecated/Legacy)**:
  - ❌ PROHIBIDO `CommonModule` (solo usar si se requieren Pipes como `DatePipe`).
  - ❌ PROHIBIDO `*ngTemplateOutlet` (Usar `@let` o duplicación explícita).
  - ❌ PROHIBIDO `[ngClass]` → Usar `[class.nombre]="condicion()"`.
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
