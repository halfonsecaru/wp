# 💎 TODO: ALF-CHECKBOX (Componente Élite)

> **Ubicación**: `alfcomponents/components/simple/alf-checkbox/`
> **Referencia Legacy**: `legacy/alf-checkbox/` (solo consulta, NO reutilizar código directamente)
> **Referencia de patrón**: `alf-buttons` (simple) y `alf-tabs-container` (composed)
> **Fecha**: 2026-04-29

---

## 📌 Decisiones de Diseño

| Decisión | Valor |
|---|---|
| **Herencia** | `AlfBaseConfiguration<AlfCheckboxInterface>` (directa, sin clase base intermedia como el botón) |
| **Interface base** | Extiende `AlfBaseCommonConfigInterface` |
| **Visual Prefix** | Usar `visualprefixEnum` (añadir `Checkbox` al enum si no existe) |
| **Two-way binding** | `model()` para `checked` e `indeterminate` |
| **ControlValueAccessor** | ❌ No (de momento) |
| **Variantes de estilo visual** | `Elegant`, `Standard`, `Moving` (enum `AlfCheckboxVariantEnum` — ya existe en `alfcomponents/enums/`) |
| **Variantes predefinidas de color** | Todas las existentes: `Outline`, `Solid`, `Crystal` (via Factory + `variant` input como en tabs-container) |
| **ID** | `generateUniqueId({ prefix: 'checkbox' })` (patrón del botón) |

### Diferencia clave: Estilo Visual vs Predefinido de Color

- **`checkboxStyle`** → Define la forma/animación del checkbox (Elegant = neumórfico circular, Standard = cuadrado clásico, Moving = expansión animada). Son estilos CSS del legacy.
- **`predefined` / `colorVariant` / `variant`** → Define la paleta de colores (Primary, Success, Danger, etc.) y el tipo visual (Outline, Solid, Crystal). Viene del sistema base `AlfBaseConfiguration`.

---

## 🚀 FASE 1: Cimientos y Contrato (Punto de Control Obligatorio)

- [ ] **Generación CLI**: `ng generate component components/simple/alf-checkbox --project=alf-components --export --style=scss`
- [ ] **Estructura Élite**: Crear carpetas `interfaces/`, `enums/`, `predefined/`, `i18n/` y `utils/` dentro de `alf-checkbox/`.
- [ ] **Visual Prefix**: Añadir `Checkbox = 'alf-cb'` al enum `visualprefixEnum` en `@alfcomponents/shared` (si no existe).
- [ ] **[STOP] Contrato de Datos**: Crear `interfaces/alf-checkbox.interface.ts` y **esperar validación del USER**.

### Contrato propuesto para `AlfCheckboxInterface`

```typescript
import { AlfBaseCommonConfigInterface } from '@alfcomponents/base';
import { AlfCheckboxVariantEnum, AlfIconsUnicodeIconEnum, AlfSizeEnum } from '@alfcomponents/enums';

export interface AlfCheckboxInterface extends AlfBaseCommonConfigInterface {
  /** Estilo visual del checkbox (Elegant, Standard, Moving) */
  readonly checkboxStyle?: AlfCheckboxVariantEnum;

  /** Texto de la etiqueta */
  readonly label?: string;

  /** Posición de la etiqueta respecto al checkbox */
  readonly labelPosition?: 'before' | 'after';

  /** Tamaño del checkbox (Sm, Md, Lg, Xl) */
  readonly size?: AlfSizeEnum;

  /** Icono personalizado cuando está seleccionado */
  readonly iconSelected?: AlfIconsUnicodeIconEnum;

  /** Mensaje de error */
  readonly error?: string;

  /** Texto de ayuda debajo del checkbox */
  readonly helperText?: string;

  /** ID para accesibilidad */
  readonly id?: string;

  /** Valor asociado al checkbox */
  readonly value?: unknown;
}
```

---

## ⚙️ FASE 2: Configuración y Factory

- [ ] **Enums**: Verificar que `AlfCheckboxVariantEnum` (ya existe en `alfcomponents/enums/`) tiene los 3 estilos: `Elegant`, `Standard`, `Moving`.
- [ ] **Factory Pattern**: Crear `predefined/alf-checkbox.predefined.ts` siguiendo el patrón de **tabs-container** (`getAlfTabDefaultConfig`):
  - `ALF_CHECKBOX_DEFAULT` → Configuración base por defecto (como `ALF_TABS_CONTAINER_DEFAULT`).
  - `getAlfCheckboxDefaultConfig(variantName?: string)` → Función factory que resuelve variantes a partir de un string (ej. `'OutlinePrimary'`, `'SolidSuccess'`, `'CrystalDanger'`).
  - Usar `resolveDefaultVisual()` de `@alfcomponents/base` para la resolución central de estilos.
  - Mapeo de colores por variante (border, background, text) como hace tabs-container.
- [ ] **i18n**: Crear `i18n/checkbox-i18n.ts` siguiendo el patrón de **alf-button.i18n.ts**:
  - Interface `CheckboxI18nLabels` con labels semánticos del checkbox (acceptTerms, rememberMe, selectAll, subscribe, notifications, required, optional, agree, active, enabled, visible, public, private).
  - Traducciones para los 7 idiomas soportados: `es`, `en`, `fr`, `de`, `it`, `pt`, `ru`.
  - Funciones `getCheckboxLabels()` y `getCheckboxLabel()` usando las utilidades centralizadas de `alfcomponents/i18n/i18n-utils.ts` (`createLanguageMap`, `getLabelsForCurrentLanguage`, `getLabelsForLanguage`).
  - Referencia legacy: `legacy/alf-checkbox/i18n/checkbox-i18n.ts`.
- [ ] **Base Component**: Configurar la herencia de `AlfBaseConfiguration<AlfCheckboxInterface>`:
  - `visualPrefix = visualprefixEnum.Checkbox`.
  - `internalId = generateUniqueId({ prefix: 'checkbox' })`.

---

## 🧠 FASE 3: Lógica de Clase (TypeScript)

Seguir el patrón de **alf-buttons.ts** + **alf-tabs-container.ts**:

- [ ] **Orden de Miembros**: `Effects` → `Attributes` → `Signals` → `Computed` → `Lifecycle` → `Functions`.
- [ ] **Input `variant`**: Input directo de tipo `string | AlfColorVariantEnum` (como en tabs-container) para seleccionar variante predefinida.
- [ ] **`predefinedConfig`**: `computed()` que resuelve la configuración desde `getAlfCheckboxDefaultConfig(variant)` (patrón tabs-container).
- [ ] **`finalConfig`**: `computed()` que prioriza `variant` sobre `inputConfig` (patrón tabs-container).
- [ ] **Override `resolvedConfig`**: Sobreescribir el `resolvedConfig` de la clase base con `finalConfig` (como tabs-container línea 74).
- [ ] **`inputConfig` override**: Override con alias `'config'` y default `ALF_CHECKBOX_DEFAULT` (patrón tabs-container).
- [ ] **Signals Two-Way** (`model()`):
  - `checked = model<boolean>(false)` — Estado de selección.
  - `indeterminate = model<boolean>(false)` — Estado indeterminado.
- [ ] **Inputs específicos** (`input()`):
  - `checkboxStyle = input<AlfCheckboxVariantEnum>()` — Estilo visual directo.
  - `label = input<string>()` — Label directa.
  - `size = input<AlfSizeEnum>()` — Tamaño directo.
- [ ] **Computed derivados**:
  - `checkboxStyleComputed` → Resuelve estilo visual (input directo → config → default Elegant).
  - `labelComputed` → Resuelve label (input directo → config → fallback).
  - `sizeComputed` → Resuelve tamaño.
  - `isDisabled` → `disabledComputed()` (heredado de base) o loading.
  - `displayIcon` → Icono según estado (indeterminate = '−', checked = iconSelected o checkmark).
- [ ] **Outputs** (`output()`):
  - `onCheckedChange = output<boolean>()` — Emite cuando cambia checked.
- [ ] **Handlers (Arrow Functions)**:
  - `onHostClick` → Previene default, llama a `toggle` (con `@HostListener` como el botón).
  - `toggle` → Cambia `checked`, resetea `indeterminate`, emite output.
  - `onInputKeydown` → Accesibilidad (Space/Enter).
- [ ] **Bridge Pattern**: Si se necesitan tests Vitest, implementar setters para compatibilidad JIT.

---

## 🎨 FASE 4: Template y Estética Premium

Seguir el patrón de **alf-buttons.html** para la estructura de `@let` variables:

- [ ] **HTML Purista**: Template con `@if`, `@for`, `@switch`, `@let`. Prohibido `CommonModule`.
  - **`@let` variables al inicio** (patrón del botón): tooltip, ripple, buttonStyle (backgrounds), cursor, isDisabled, borderStyle, displayAndLayoutStyle, marginStyle, outlineStyle, paddingStyle, shadowsStyle, typographyStyle, textStyle, transformStyle, animationsStyle, animationsClass, customClass, customStyle.
  - Estructura: `div.alf-cb` → `label.alf-cb-wrapper` → `input[hidden]` + `div.alf-cb-box` + `span.alf-cb-label-text`.
  - Aplicar `[style]` concatenando todos los estilos visuales como hace el botón (línea 47/75 del template).
  - Aplicar `[class]` concatenando clase base + customClass + animationsClass.
  - Directivas: `[alfTooltipText]`, `[alfRipple]`.
  - Atributos aria: `role`, `aria-checked`, `aria-label`, `aria-describedby`, etc.
  - Descripción/error debajo: `div.alf-cb-description`.
- [ ] **SCSS**: Portar los 3 estilos visuales del legacy adaptándolos al nuevo sistema:
  - `variant-elegant` → Neumórfico circular con SVG animado.
  - `variant-standard` → Cuadrado clásico Material-like.
  - `variant-moving` → Expansión animada del box al wrapper.
  - Variables CSS con prefijo `--alf-cb-*`.
  - [ ] **Importación de Mixins**: Importar `@use '../../../styles/mixins' as *;` y aplicar los `@include alf-*-css-vars`.
  - [IMPORTANT] **Zero Overrides**: Prohibido poner `border-width`, `background-color` o `colors` fijos en las clases de variante del SCSS; deben usar siempre `var(--alf-cb-*)`.
  - Sizes: `sm` (1.2rem), `md` (1.5rem), `lg` (2rem), `xl` (2.5rem).
  - Variantes de color vía variables CSS globales (`--alf-color-primary`, etc.).
- [ ] **WAAPI**: Animaciones interactivas vía TypeScript (Ripple en el box, transiciones dinámicas de check/uncheck) si aplica.

---

## 📄 FASE 5: Calidad, Integración y Documentación

- [ ] **Unit Tests**: Crear `alf-checkbox.spec.ts` validando:
  - Toggle de estado.
  - Estado disabled.
  - Estado indeterminate.
  - Accesibilidad (aria-checked, aria-label, keyboard).
  - Variantes visuales aplicadas correctamente.
- [ ] **Demo Viewer**: Añadir página de ejemplos en la app de demo con:
  - Los 3 estilos visuales (Elegant, Standard, Moving).
  - Todas las variantes predefinidas de color (Outline, Solid, Crystal).
  - Tamaños (Sm, Md, Lg, Xl).
  - Estados (disabled, indeterminate, error, helperText).
  - Label before/after.
- [ ] **Documentación Triple**:
  - `README.english.md` — Manual de uso, sin emojis.
  - `README.spanish.md` — Manual de uso, sin emojis.
  - `ia_usage.md` — Guía técnica para IAs en inglés.
- [ ] **Exportación**: Añadir al `public-api.ts` de la librería.
