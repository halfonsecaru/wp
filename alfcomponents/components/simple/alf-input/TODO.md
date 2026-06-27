# TODO: Refactorización de AlfInput

Este documento detalla todos los pasos necesarios para llevar a cabo la refactorización del componente `AlfInput`, eliminando el objeto `config` y alineándolo con el motor visual de directivas base (`AlfBaseDirectives`) de la misma manera que se realizó en `AlfCheckbox` y `AlfRadioButton`.

---

## 1. Componente TypeScript (`alf-input.ts`)

- [ ] **Eliminación Total de `inputConfig` (alias `'config'`)**:
  Eliminar el input config y su tipo asociado `AlfInputInterface`. Todas las propiedades de configuración visual o funcional deben ser recibidas exclusivamente como inputs planos directos.

- [ ] **Eliminación de `generatedComponent`**:
  Eliminar por completo el computed `generatedComponent` y las dependencias de `generatedComponentFunction`:
  ```typescript
  // ELIMINAR:
  protected readonly generatedComponent = computed(() => { ... });
  ```

- [ ] **Migración de Computeds a Inputs Planos**:
  Ajustar todos los computed reactivos para que dependan únicamente de los inputs planos del componente en lugar de recurrir a fallbacks en `inputConfig()`:
  * `idComputed`
  * `labelComputed`
  * `placeholderComputed`
  * `forceFloatComputed`
  * `inputTypeComputed`
  * `helperTextComputed`
  * `appearanceComputed`
  * `prefixComputed`
  * `suffixComputed`
  * `stepComputed`
  * `autofocusComputed`
  * `autocompleteComputed`
  * `clearableComputed`
  * `clearOnClickComputed`
  * `showPasswordToggleComputed`
  * `showCharCounterComputed`

- [ ] **Remoción de Wrapper de Validación/Error Local**:
  Alinear la lógica de estilos de error (`calculateErrorBorder`, `calculateErrorTextStyle`, `calculateErrorBackground`) para ver si pueden ser simplificados o gestionados directamente por la directiva base o selectores SCSS locales.

- [ ] **Simplificación del Constructor y CVA**:
  * Remover cualquier referencia a `inputConfig` dentro de `getControlConfig()`, simplificando este método o eliminándolo si no es necesario.
  * Modificar `getControlValue` y handlers para utilizar inputs planos.

---

## 2. Plantilla HTML (`alf-input.html`)

- [ ] **Eliminar Referencias a Computeds Auxiliares / Config**:
  Asegurarse de que el HTML lee directamente los inputs planos o los computed limpios, sin pasar por propiedades procedentes de `inputConfig()`.

---

## 3. Limpieza de Funciones Externas (`alf-input-functions.ts`)

- [ ] **Depuración del archivo de funciones**:
  Evaluar qué funciones de `alf-input-functions.ts` pueden eliminarse por completo al no requerir el mapeo de `generatedComponentFunction`.

---

## 4. Documentación y Pruebas

- [ ] **Actualizar Pruebas Unitarias (`alf-input.spec.ts`)**:
  Alinear los tests unitarios para que pasen las propiedades directamente por inputs planos en lugar de instanciar el objeto de configuración antiguo `config`.

- [ ] **Actualizar `ia_usage.md`**:
  Reescribir la guía de uso de IA para `AlfInput`, mostrando ejemplos prácticos donde cada propiedad se pasa de forma plana.

- [ ] **Actualizar `README.english.md` y `README.spanish.md`**:
  * Eliminar la documentación de la interfaz obsoleta `AlfInputInterface`.
  * Explicar todas las opciones y variantes a nivel de inputs directos del componente.
