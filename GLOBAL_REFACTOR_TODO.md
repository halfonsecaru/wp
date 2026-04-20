# 🔄 PLAN DE REFACTORIZACIÓN GLOBAL: HERENCIA Y TEMAS

Este documento centraliza las tareas pendientes para unificar el comportamiento de la herencia en toda la librería de componentes.

## 🎯 Objetivo
Que todos los componentes sigan el mismo patrón de herencia y resuelvan sus variantes (Primary, Danger, etc.) consumiendo el objeto centralizado `BASIC_IDENTITIES` de forma determinística.

## 📋 Tareas Pendientes

### 1. Refactorización de la Herencia de Objetos
- [ ] **Unificar Comportamiento**: Revisar el sistema de herencia en `AlfBaseComponent` para asegurar que el ADN cromático se inyecte de forma idéntica en todos los niveles.
- [ ] **Consumo de BASIC_IDENTITIES**: Migrar componentes existentes para que dejen de definir sus propios colores "hardcoded" y pasen a usar el mapa centralizado por tema.
- [ ] **Ajustes de Lógica**: Modificar la lógica interna de resolución de estilos (todavía pendiente de definir ciertos parámetros específicos).

### 2. Integración de Temas Extendidos
- [ ] **Validación de Temas**: Verificar que los nuevos temas (`HighContrast`, `MidnightGold`, `Cyberpunk`) se renderizan correctamente tras la refactorización de la herencia.
- [ ] **Sincronización de Variables**: Asegurar que `styleVariablesComputed` mapee correctamente todas las propiedades del ADN centralizado.

---
**Nota**: No modificar la herencia hasta que se terminen de definir los ajustes de lógica pendientes mencionados por el USER.
