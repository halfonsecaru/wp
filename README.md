# 🚀 ALFONIZER ECOSYSTEM - DOCUMENTACIÓN MAESTRA

Este documento contiene la verdad única sobre la arquitectura, estándares y operativa del proyecto **Alfonizer**, tras la reciente limpieza y optimización de la estructura.

---

## 🏗️ Estructura del Proyecto (Ecosistema de Librerías)
El proyecto se centra actualmente en un potente ecosistema de librerías compartidas y un sistema de diseño propio:

- **`alfcomponents/`**: Núcleo del sistema de diseño. Contiene los componentes y, sobre todo, la extensa arquitectura de **Enums** que garantiza la consistencia visual.
- **`libs/shared/`**: Interfaces, entidades e información común compartida entre todo el ecosistema.
- **`libs/nestjs/`**: Utilidades, decoradores, configuraciones de Swagger y lógica común para servicios Backend basados en NestJS.
- **`libs/angular/`**: Utilidades y servicios específicos para el ecosistema Frontend de Angular.
- **`scripts/`**: Automatización para instalaciones, compilación de librerías y gestión del proyecto.

> **Nota**: Las carpetas `apps/` se reservan para las aplicaciones finales (web/api) que consumen estas librerías.

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
2. **Modularidad**: La lógica debe residir preferiblemente en las librerías (`libs/`) para ser reutilizable.
3. **Seguridad de Tipos**: Utilizar las interfaces de `libs/shared/interfaces` para cualquier definición de datos.
4. **Seguridad de Dependencias**: Respetar los `overrides` del `package.json` (especialmente las versiones parcheadas de Axios y Vite).
