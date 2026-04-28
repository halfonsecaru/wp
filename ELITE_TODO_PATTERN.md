# 💎 ELITE TODO PATTERN - ALFONIZER

Este documento es la plantilla maestra para la creación de nuevos componentes en el ecosistema Élite de Alfonizer. **DEBE** seguirse en cada nueva tarea.

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
- [ ] **Generación CLI**: Ejecutar `ng generate component components/alf-[nombre] --project=alf-components --export --style=scss`.
- [ ] **Estructura Élite**: Crear carpetas `interfaces/`, `enums/`, `predefined/` y `utils/`.
- [ ] **[STOP] Contrato de Datos**: Crear el archivo en `interfaces/` y **esperar a que el USER defina el contrato** antes de programar lógica.

### ⚙️ FASE 2: Configuración y Factory
- [ ] **Enums**: Definir tipos semánticos en `enums/`.
- [ ] **Factory Pattern**: Implementar `predefined/[nombre].predefined.ts` con el `DEFAULT`.
- [ ] **Variantes Élite**: Definir explícitamente configuraciones para `Outline`, `Solid` (Soft) y `Crystal` (Glassmorphism) en la factoría.
- [ ] **Base Component**: Configurar la herencia de `AlfBaseConfiguration<T>`.

### 🧠 FASE 3: Lógica de Clase (TypeScript)
- [ ] **Orden de Miembros**: `Effects` -> `Attributes` -> `Signals` -> `Computed` -> `Lifecycle` -> `Functions`.
- [ ] **Bridge Pattern**: Implementar setters para compatibilidad con compilación JIT (Vitest).
- [ ] **Handlers**: Implementar toda la lógica como Arrow Functions independientes.

### 🎨 FASE 4: Template y Estética Premium
- [ ] **HTML Purista**: Implementar vista con Control Flow `@if/@for` y variables `@let`.
- [ ] **SCSS Reactivo**: Aplicar mixins base (`@include alf-transition`) y variables CSS.
- [ ] **WAAPI**: Inyectar animaciones interactivas (Ripple, transiciones dinámicas) vía TS.

### 📄 FASE 5: Calidad, Integración y Documentación Dual
- [ ] **Unit Tests**: Crear suite en `.spec.ts` validando estados y accesibilidad.
- [ ] **Demo Viewer**: Añadir una página de ejemplos en la app de demo con todas las variantes (Outline, Solid, Crystal) y casos de uso reales.
- [ ] **Documentación Triple**:
  - `README.english.md` (Manual de uso, sin emojis).
  - `README.spanish.md` (Manual de uso, sin emojis).
  - `ia_usage.md` (Guía técnica para IAs en inglés).
- [ ] **Exportación**: Añadir al `public-api.ts` de la librería.

