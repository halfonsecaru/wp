# 💎 ELITE TODO PATTERN - ALFONIZER

Este documento es la plantilla maestra para la creación de nuevos componentes en el ecosistema Élite de Alfonizer. **DEBE** seguirse en cada nueva tarea.
Antes de nada leer `RULES.md`.

---

## 🔍 FASE 0: Investigación Previa (OBLIGATORIO antes de crear el TODO)

Antes de crear el archivo TODO del componente, la IA **DEBE** ejecutar estos pasos de investigación:

### Paso 1: Revisar Legacy (si existe)
- [ ] Buscar en `legacy/alf-[nombre]/` si existe una versión anterior del componente.
- [ ] Si existe, revisar **todos** los archivos: `.ts`, `.html`, `.scss`, `interfaces/`, `i18n/`, `enums/`.
- [ ] Extraer: funcionalidad, variantes visuales, propiedades de la interface, sistema i18n, y patrones SCSS.
- [ ] **El legacy es solo referencia conceptual**, NO copiar código directamente. El nuevo componente debe seguir la arquitectura actual.

### Paso 2: Analizar Componentes Existentes (Source of Truth)
- [ ] Revisar al menos **dos componentes ya implementados** en la arquitectura actual para extraer el patrón real:
  - **`alf-buttons`** (simple): Para el patrón de herencia, `@HostListener`, `output()`, `generateUniqueId`, `visualprefixEnum`, template con `@let` + concatenación de estilos.
  - **`alf-tabs-container`** (composed): Para el patrón de `variant` input, `predefinedConfig` → `finalConfig` → override `resolvedConfig`, factory function con `resolveDefaultVisual()`.
- [ ] Verificar la estructura de carpetas real: `interfaces/`, `enums/`, `predefined/`, `i18n/`, `base/` (si aplica).
- [ ] Revisar cómo se extiende `AlfBaseConfiguration<T>` y cómo se implementa la interface desde `AlfBaseCommonConfigInterface`.

### Paso 3: Preguntar al USER
- [ ] Presentar las decisiones de diseño detectadas y **preguntar dudas** antes de crear el TODO.
- [ ] Confirmar: ubicación (`simple/` vs `composed/`), variantes, herencia, i18n, ControlValueAccessor, etc.

### Paso 4: Crear el TODO
- [ ] Crear `TODO_ALF_[NOMBRE].md` en la raíz del proyecto.
- [ ] El TODO debe reflejar los patrones **reales** encontrados en los componentes existentes, NO patrones genéricos.

---

## 📜 Recordatorio de Estándares Élite (Source of Truth)

1.  **Arquitectura**: Angular 21, Standalone, **Zoneless Ready**.
2.  **Signals**: Prohibido `@Input`. Usar `input()`, `computed()`, `model()` y `signal()`.
3.  **Rigor Técnico**: Modificadores (`public/private/protected`) y `readonly` **obligatorios** en Signals y dependencias inyectadas.
4.  **Zero Callback Hell**: PROHIBIDO meter funciones dentro de funciones (ej. handlers dentro de effects). Todo a métodos independientes.
5.  **Arrow Functions**: Todo método debe ser Arrow Function (excepto los Lifecycle Hooks oficiales de Angular).
6.  **Templates**: Control Flow Moderno (`@if`, `@for`, `@let`). Prohibido `CommonModule`.
7.  **Estilos**: SCSS para estático, **WAAPI** para dinámico/interactivo. Prefijo `alf-` siempre.
8.  **Colores**: **SOLO** `AlfColorEnum`. Prohibido usar strings (`#hex`, `rgb`) en interfaces.
9.  **Timers**: Prohibido el uso de `setTimeout` o `setInterval` para sincronización de UI.
10. **Shadow DOM**: Prohibido el uso de Shadow DOM.
11. **Literal strings**: Prohibido el uso de strings literales en templates. usar siempre enums.
12. **Templates**: Prohibido el uso de CommonModule, Standalone mandatory.

---

## 📋 Plantilla Maestra de Tareas (TODO)

### 🚀 FASE 1: Cimientos y Contrato (Punto de Control Obligatorio)
- [ ] **Generación CLI**: Ejecutar `ng generate component components/[simple|composed]/alf-[nombre] --project=alf-components --export --style=scss`.
- [ ] **Estructura Élite**: Crear carpetas `interfaces/`, `enums/`, `predefined/`, `i18n/` y `utils/`.
- [ ] **Visual Prefix**: Añadir entrada al enum `visualprefixEnum` en `@alfcomponents/shared` (ej. `Checkbox = 'alf-cb'`).
- [ ] **[STOP] Contrato de Datos**: Crear el archivo en `interfaces/` extendiendo `AlfBaseCommonConfigInterface` y **esperar a que el USER defina el contrato** antes de programar lógica.

### ⚙️ FASE 2: Configuración y Factory
- [ ] **Enums**: Definir tipos semánticos en `enums/` (locales al componente).
- [ ] **Factory Pattern**: Implementar `predefined/[nombre].predefined.ts` con:
  - `ALF_[NOMBRE]_DEFAULT` → Configuración base por defecto.
  - `getAlf[Nombre]DefaultConfig(variantName?: string)` → Función factory que resuelve variantes (`OutlinePrimary`, `SolidSuccess`, `CrystalDanger`, etc.).
  - Usar `resolveDefaultVisual()` de `@alfcomponents/base` para la resolución central de estilos.
- [ ] **i18n**: Crear `i18n/[nombre]-i18n.ts` con:
  - Interface de labels.
  - Traducciones para los 7 idiomas: `es`, `en`, `fr`, `de`, `it`, `pt`, `ru`.
  - Funciones `get[Nombre]Labels()` y `get[Nombre]Label()` usando `createLanguageMap`, `getLabelsForCurrentLanguage`, `getLabelsForLanguage` de `alfcomponents/i18n/i18n-utils.ts`.
- [ ] **Base Component**: Configurar la herencia de `AlfBaseConfiguration<T>`:
  - `visualPrefix = visualprefixEnum.[Nombre]`.
  - `internalId = generateUniqueId({ prefix: '[nombre]' })`.

### 🧠 FASE 3: Lógica de Clase (TypeScript)
- [ ] **Orden de Miembros**: `Effects` -> `Attributes` -> `Signals` -> `Computed` -> `Lifecycle` -> `Functions`.
- [ ] **Input `variant`**: Input directo de tipo `string | AlfColorVariantEnum` para seleccionar variante predefinida (patrón tabs-container).
- [ ] **Cadena de configuración** (patrón tabs-container):
  - `predefinedConfig = computed(() => getAlf[Nombre]DefaultConfig(variant()))`.
  - `finalConfig = computed(() => variant() ? predefinedConfig() : inputConfig() ?? DEFAULT)`.
  - `override resolvedConfig = finalConfig` (sobreescribe la clase base).
  - `override inputConfig = input<Interface>(DEFAULT, { alias: 'config' })`.
- [ ] **Inputs/Models/Outputs**: Definir signals específicos del componente.
- [ ] **Computed derivados**: Resolver propiedades con cadena de prioridad: input directo → config → default.
- [ ] **Handlers**: Implementar toda la lógica como Arrow Functions independientes con `@HostListener` cuando aplique.
- [ ] **Bridge Pattern**: Implementar setters para compatibilidad con compilación JIT (Vitest).

### 🎨 FASE 4: Template y Estética Premium
- [ ] **HTML Purista**: Implementar vista con Control Flow `@if/@for/@switch` y variables `@let`.
  - **Bloque `@let` al inicio del template** con todas las variables (patrón alf-buttons.html): tooltip, ripple, cursor, isDisabled, todos los estilos visuales (backgrounds, border, displayAndLayout, margin, outline, padding, shadows, typography, textStyle, transform, animations), customClass, customStyle.
  - **`[style]`**: Concatenar todos los estilos visuales en un solo binding (patrón botón línea 47/75).
  - **`[class]`**: Concatenar clase base + customClass + animationsClass.
  - **Directivas**: `[alfTooltipText]`, `[alfRipple]`.
- [ ] **SCSS Reactivo**: 
  - [ ] Importar `@use '../../../styles/mixins' as *;` para acceder al sistema visual.
  - [ ] Aplicar mixins de variables CSS en el selector principal (ej. `@include alf-border-css-vars('--alf-prefix', 0.25rem, '&.disabled');`) para vincular el componente al motor de estilos.
  - [ ] Aplicar mixins base (`@include alf-transition`) y variables CSS con prefijo del componente.
- [ ] **WAAPI**: Inyectar animaciones interactivas (Ripple, transiciones dinámicas) vía TS.

### 📄 FASE 5: Calidad, Integración y Documentación
- [ ] **Unit Tests**: Crear suite en `.spec.ts` validando estados y accesibilidad.
- [ ] **Demo Viewer**: Añadir una página de ejemplos en la app de demo con todas las variantes (Outline, Solid, Crystal) y casos de uso reales.
  - [ ] **No Demo Hover**: Ensure demo containers (cards, sections, items) do NOT have hover effects, shadows, or transforms on hover. Focus the interactivity ONLY on the component itself.
- [ ] **Documentación Triple**:

  - `README.english.md` (Manual de uso, sin emojis).
  - `README.spanish.md` (Manual de uso, sin emojis).
  - `ia_usage.md` (Guía técnica para IAs en inglés).
- [ ] **Exportación**: Añadir al `public-api.ts` de la librería.
