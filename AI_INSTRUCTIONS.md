# 🚀 ALFONIZER ECOSYSTEM - AI MASTER INSTRUCTIONS

> [!IMPORTANT]
> **REGLA CARDINAL: NO REALIZAR NINGUNA ACCIÓN SIN QUE EL USUARIO LO ORDENE EXPLÍCITAMENTE.**
> Se debe esperar siempre la instrucción directa antes de modificar archivos, crear nuevos componentes o realizar investigaciones profundas.

Este documento contiene la verdad única del proyecto Alfonizer.

> **🔥 PASO 1**: Lee **`RULES.md`** — Estándares de código obligatorios.  
> **🔥 PASO 2**: Lee **`alfcomponents/CATALOG.md`** — Catálogo de componentes disponibles. **NO crees componentes que ya existen.**

---

## 🏗️ Estructura del Proyecto (Ecosistema de Librerías)
El proyecto se centra actualmente en un potente ecosistema de librerías compartidas y un sistema de diseño propio:

- **`alfcomponents/`**: Núcleo del sistema de diseño. Contiene los componentes y, sobre todo, la extensa arquitectura de **Enums** que garantiza la consistencia visual.
- **`libs/shared/`**: Interfaces, entidades e información común compartida entre todo el ecosistema.
- **`libs/nestjs/`**: Utilidades, decoradores, configuraciones de Swagger y lógica común para servicios Backend basados en NestJS.
- **`libs/angular/`**: Utilidades y servicios específicos para el ecosistema Frontend de Angular.
- **`scripts/`**: Automatización para instalaciones, compilación de librerías y gestión del proyecto.

> **Nota**: Las carpetas `apps/` se reservan para las aplicaciones finales (web/api) que consumen estas librerías. Actualmente, el corazón del proyecto reside en `/libs` y `/alfcomponents`.

---

## 🎨 AlfComponents: Estándares de Diseño y Enums
**REGLA DE ORO PARA IA Y DESARROLLADORES:** Queda prohibido el uso de valores "mágicos" (strings o números hardcodeados) para estilos. Se debe utilizar siempre la arquitectura de Enums de `alfcomponents/enums`.

### Enums Críticos Disponibles:
- **Espaciado y Medidas**: `AlfPxEnum` (pixeles), `AlfRemEnum` (unidades relativas).
- **Colores y Variantes**: `AlfColorEnum` (paleta completa), `AlfColorVariantEnum` (estados semánticos).
- **Tipografía**: `AlfFontSizeEnum`, `AlfFontWeightEnum`, `AlfLineHeightEnum`.
- **Layout**: `AlfDisplayEnum`, `AlfFlexDirectionEnum`, `AlfJustifyContentEnum`.
- **Otros**: `AlfRadiusEnum` (bordes), `AlfShadowEnum` (sombras), `AlfSizeEnum` (talle camiseta).

---

## 🛠️ Comandos Operativos Esenciales
Usa estos comandos para gestionar el proyecto desde la raíz:

- **Instalación Segura**: `npm run installnode` (Instala dependencias con los parches de seguridad aplicados).
- **Compilación de Librerías**: `node scripts/build-libs.js` (Genera el `dist` de todas las librerías).
- **Reparación de Tipos**: `npx tsc -b` (Si hay problemas de compilación en las librerías).
- **Base de Datos**: `docker-compose up -d postgres` (Lanza la infraestructura necesaria).

---

## 🤖 Contexto para la Inteligencia Artificial
Para cualquier tarea en este repositorio, la IA debe seguir estas pautas:
1. **Consistencia Visual**: Antes de proponer un estilo, buscar el enum equivalente en `alfcomponents/enums`.
2. **Diseño Programático (Zero SCSS First)**: Priorizar el uso de TypeScript y Enums para definir estilos dinámicos (colores, sombras, radios). El SCSS solo se usa para variables base o layouts globales de Tailwind.
3. **Modularidad**: La lógica debe residir preferiblemente en las librerías (`libs/`) para ser reutilizable.
4. **Seguridad de Tipos**: Utilizar las interfaces de `libs/shared/interfaces` para cualquier definición de datos. Evitar `any` y preferir genéricos `<T>`.
5. **Autonomía (Self-Contained)**: Obligatorio usar **Web Animations API (WAAPI)** en el TypeScript para efectos dinámicos (entrada/salida, hover, focos).
6. **Rigor Técnico Obligatorio**: 
   - SIEMPRE usar modificadores de acceso (`public`, `private`, `protected`).
   - SIEMPRE usar `readonly` para servicios e inyecciones.
   - SIEMPRE usar **Arrow Functions** para lógica de clase para evitar problemas de contexto `this`.
   - **Bridge Pattern**: Para inputs reactivos, usar la combinación `@Input() setter` + `private signal` para garantizar compatibilidad con Vitest y compilación JIT.


---

## 🌍 Sistema i18n - ALF Components
Sistema de internacionalización integrado para labels predefinidos de componentes.

### 📋 Idiomas Soportados
- **Primarios**: `es` (Español - Default), `en` (English).
- **Extendidos**: `fr`, `de`, `it`, `pt`, `ru`.

### 🚀 Uso Básico
```typescript
import { getLabelsForCurrentLanguage } from '@libs/shared/helpers/i18n.helper';

// Detección automática según el navegador
const labels = getLabelsForCurrentLanguage(COMPONENT_LANGUAGE_MAP);
```

### 📦 Componentes con i18n
Cada componente (`alf-button`, `alf-checkbox`, `alf-input`, `alf-autocomplete`) expone funciones para obtener y forzar labels:

| Función | Propósito |
| :--- | :--- |
| `getXxxLabel()` | Obtener un label específico. |
| `getXxxLabels()` | Obtener todas las traducciones del componente. |
| `setXxxLanguage()` | Establecer idioma global para el componente. |
| `getCurrentXxxLanguage()` | Obtener idioma actual configurado. |
| `detectBrowserLanguage()` | Detectar idioma del navegador. |

### 🎯 Uso con Botones Predefinidos
Los botones predefinidos (`AlfDefaultSolidButtons`) usan automáticamente i18n:
```typescript
import { AlfDefaultSolidButtons, setButtonLanguage } from 'alf-components';

setButtonLanguage('es'); // Cambiar a español
const buttons = AlfDefaultSolidButtons(); // buttons.ACCEPT.label = "Aceptar"
```

