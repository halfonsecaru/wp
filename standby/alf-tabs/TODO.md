# 🚀 CHECKLIST DE IMPLEMENTACIÓN: ALF-TABS (COMPOSED)

Este documento es el TODO específico para el componente `AlfTabs`, adaptando el comportamiento del componente legado al estándar Élite de Angular 21.

---

## 🏗️ PASO 1: SCALING (Andamiaje)
- [x] Generar componente padre: `AlfTabs`
- [x] Generar cabecera hijo: `AlfTab`
- [x] Generar panel hijo: `AlfTabContent`
- [x] Crear estructura de carpetas: `interfaces/`, `enums/`, `predefined/`, `i18n/`.
- [x] Registrar proyecto `alf-components` en `angular.json`.

---

## 📜 PASO 2: CONTRACTS (Interfaces y Enums)
- [x] **Interfaces**:
    - [x] `AlfTabsInterface`: Configuración global y comportamiento.
    - [x] `AlfTabInterface`: Configuración de cabeceras.
    - [x] `AlfTabContentInterface`: Configuración de paneles.
- [x] **Enums**:
    - [x] `AlfTabsPositionEnum`: [Top, Bottom, Left, Right].
    - [x] `AlfTabsVisualTypeEnum`: [Underline, Pill, Faded, Glass, Modern].
    - [x] `DefaultTabsKeys`: [Base, Settings, Profile, etc.].

---

## 🧬 PASO 3: DNA (Fábrica de Predefinidos)
- [x] **Identidades**: Definir el ADN emocional (ej: "Sidebar" tiene posición `Left` y variante `Pill`).
- [x] **Constructor**: `getAlfPredefinedTabs` que gestione la fusión con `deepMerge`.
- [x] **Overrides**: Lógica para scroll arrows automática si el `visualType` es compacto.

---

## 🧠 PASO 4: BRAIN (Lógica Élite)
- [x] **Componente Padre (AlfTabs)**:
    - [x] Heredar de `AlfBaseComponent`.
    - [x] Implementar `model<number>()` para `activeIndex` (Two-way).
    - [x] Inyectar `ResizeObserver` y gestionar flechas de scroll.
    - [x] Sincronizar cabeceras y paneles por índice.
- [x] **Cabecera (AlfTab)**:
    - [x] Manejar estado `active` y eventos de click.
- [x] **Panel (AlfTabContent)**:
    - [x] Implementar visibilidad reactiva.
    - [x] Soportar animaciones Animate.css via `AlfAnimateCssInterface`.

---

## 🎨 PASO 5: AESTHETICS (SCSS)
- [x] Importar mixins globales: `@use '../../../styles/mixins' as *;`
- [x] Definir variables CSS específicas para las flechas de scroll (`--alf-tabs-arrow-color`).
- [x] Implementar estados CSS para las variantes de posición (flex-direction dinámico).
- [x] **Elite Polish**: Añadir gradientes de scroll y variaciones visuales (Underline, Pill, Glass).

---

## 🧪 PASO 6: QUALITY (Testing)
- [x] Test de cambio de pestaña (Output `tabChange`).
- [x] Test de accesibilidad: ¿Se actualizan los roles ARIA al navegar con teclado?
- [x] Test de scroll: ¿Aparecen las flechas cuando el contenido desborda? (Verificado por métricas de señales).

---

## 📖 PASO 7: DOCS
- [x] `README.spanish.md` / `README.english.md`.
- [x] `ia_usage.md`: Explicar cómo usar las dos vías (Configuración v.s. Proyección de contenido).

---

## 🎯 NOTAS DE REFACTORIZACIÓN (LEGACY REF)
- [x] Eliminar el uso de `generateStyleString` heredado; usar el motor de `AlfBaseComponent`.
- [x] Asegurar que el `activeIndex` sea un `model()` para soportar Two-Way binding.
- [x] Migrar el `liveMessage` (ARIA live) a una señal reactiva.
