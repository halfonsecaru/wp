# 🌍 Sistema i18n - ALF Components

Sistema de internacionalización integrado para labels predefinidos de componentes.

## 📋 Idiomas Soportados

| Código | Idioma  | Estado      |
| ------ | ------- | ----------- |
| `es`   | Español | ✅           |
| `en`   | English | ✅ (Default) |

---

## 🚀 Uso Básico

### Detección Automática

Por defecto, el sistema detecta el idioma del navegador:

```typescript
import { getButtonLabel, getButtonLabels } from 'alf-components';

// Obtiene el label según el idioma del navegador
const acceptLabel = getButtonLabel('accept'); // "Aceptar" (si es ES) o "Accept" (si es EN)

// Obtiene todas las traducciones
const labels = getButtonLabels(); // { accept: 'Aceptar', cancel: 'Cancelar', ... }
```

### Forzar Idioma

```typescript
import { setButtonLanguage, getButtonLabel } from 'alf-components';

// Forzar español
setButtonLanguage('es');
console.log(getButtonLabel('accept')); // "Aceptar"

// Forzar inglés
setButtonLanguage('en');
console.log(getButtonLabel('accept')); // "Accept"
```

---

## 📦 Componentes con i18n

### alf-button

```typescript
import { 
  getButtonLabel, 
  getButtonLabels, 
  setButtonLanguage,
  ButtonI18nLabels 
} from 'alf-components';
```

**Labels disponibles:**

| Key       | Español     | English     |
| --------- | ----------- | ----------- |
| `accept`  | Aceptar     | Accept      |
| `cancel`  | Cancelar    | Cancel      |
| `warning` | Advertencia | Warning     |
| `info`    | Información | Information |
| `back`    | Volver      | Back        |
| `submit`  | Enviar      | Submit      |
| `save`    | Guardar     | Save        |
| `delete`  | Eliminar    | Delete      |
| `edit`    | Editar      | Edit        |
| `close`   | Cerrar      | Close       |
| `confirm` | Confirmar   | Confirm     |
| `loading` | Cargando... | Loading...  |

### alf-checkbox

```typescript
import { 
  getCheckboxLabel, 
  setCheckboxLanguage 
} from 'alf-components';
```

### alf-input

```typescript
import { 
  getInputLabel, 
  setInputLanguage 
} from 'alf-components';
```

### alf-autocomplete

```typescript
import { 
  getAutocompleteLabel, 
  setAutocompleteLanguage 
} from 'alf-components';
```

**Labels disponibles:**

| Key              | Español           | English          |
| ---------------- | ----------------- | ---------------- |
| `noResults`      | Sin resultados    | No results found |
| `loading`        | Cargando...       | Loading...       |
| `placeholder`    | Buscar...         | Search...        |
| `clearSelection` | Limpiar selección | Clear selection  |

---

## 🔧 API

### Funciones por Componente

Cada componente con i18n expone:

```typescript
// Obtener un label específico
getXxxLabel(key: string, lang?: 'es' | 'en'): string

// Obtener todas las traducciones
getXxxLabels(lang?: 'es' | 'en'): XxxI18nLabels

// Establecer idioma global para el componente
setXxxLanguage(lang: 'es' | 'en'): void

// Obtener idioma actual
getCurrentXxxLanguage(): 'es' | 'en'

// Detectar idioma del navegador
detectBrowserLanguage(): 'es' | 'en'
```

---

## 💡 Ejemplo: Cambiar Idioma Globalmente

```typescript
import { 
  setButtonLanguage, 
  setCheckboxLanguage, 
  setInputLanguage,
  setAutocompleteLanguage 
} from 'alf-components';

// Función para cambiar todos a español
function setGlobalLanguage(lang: 'es' | 'en') {
  setButtonLanguage(lang);
  setCheckboxLanguage(lang);
  setInputLanguage(lang);
  setAutocompleteLanguage(lang);
}

// Uso
setGlobalLanguage('es');
```

---

## 🎯 Uso con Botones Predefinidos

Los botones predefinidos (`AlfDefaultSolidButtons`) usan automáticamente i18n:

```typescript
import { AlfDefaultSolidButtons, setButtonLanguage } from 'alf-components';

// Cambiar a español antes de obtener los botones
setButtonLanguage('es');

const buttons = AlfDefaultSolidButtons();
// buttons.ACCEPT.label = "Aceptar"
// buttons.CANCEL.label = "Cancelar"
```

---

## ⚠️ Notas

1. **El idioma se detecta una vez** al iniciar y se cachea
2. **Para cambios dinámicos**, usa `setXxxLanguage()` antes de renderizar
3. **Fallback**: Si el idioma del navegador no es `es-*`, usa inglés
4. **SSR**: En servidor, siempre devuelve inglés (no hay `navigator`)

---

## 📚 Ver También

- [alf-button predefinidos](../components/simple/alf-button/README.md)
- [alf-checkbox](../components/simple/alf-checkbox/README.md)
- [alf-input](../components/simple/alf-input/README.md)
- [alf-autocomplete](../components/composed/alf-autocomplete/README.md)
