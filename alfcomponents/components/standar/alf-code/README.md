# alf-code

Componente para mostrar bloques de código con syntax highlighting usando Prism.js y tema VS Code Dark Modern, basado en Angular Signals (Angular 21).

## 📋 API Reference

### Inputs

Propiedades de entrada directas mediante Angular Signals:

| Nombre            | Tipo      | Default        | Descripción                               |
| ----------------- | --------- | -------------- | ----------------------------------------- |
| `code`            | `string`  | **Requerido**  | El código a mostrar.                      |
| `title`           | `string`  | `undefined`    | Título opcional del bloque de código.     |
| `language`        | `string`  | `'typescript'` | Lenguaje para syntax highlighting.        |
| `showLineNumbers` | `boolean` | `false`        | Mostrar números de línea.                 |
| `showCopyButton`  | `boolean` | `true`         | Mostrar botón de copiar al portapapeles.  |
| `maxLines`        | `number`  | `0`            | Número máximo de líneas (0 = sin límite). |

---

## 🛠️ Propiedades Detalladas

### 1. Propiedades Específicas del Código

| Propiedad         | Tipo      | Descripción                                                       |
| ----------------- | --------- | ----------------------------------------------------------------- |
| `code`            | `string`  | **Requerido**. El código fuente a mostrar con highlighting.       |
| `title`           | `string`  | Título que aparece en la cabecera del bloque (ej: "index.ts").    |
| `language`        | `string`  | Lenguaje de programación para Prism.js. Default: `typescript`.    |
| `showLineNumbers` | `boolean` | Si es true, muestra numeración de líneas. Default: `false`.       |
| `showCopyButton`  | `boolean` | Si es true, muestra botón para copiar código. Default: `true`.    |
| `maxLines`        | `number`  | Límite de líneas visibles. Si se excede, aparece botón "Ver más". |

### 2. Funcionalidades Internas

| Computed      | Tipo      | Descripción                                           |
| ------------- | --------- | ----------------------------------------------------- |
| `displayCode` | `string`  | Código truncado o completo según estado de expansión. |
| `isTruncated` | `boolean` | Indica si el código excede `maxLines`.                |
| `isExpanded`  | `boolean` | Estado de expansión (colapsado/expandido).            |

---

## 🚀 Uso Básico

### Instalación de Prism.js

**Requisito**: Incluir Prism.js en tu proyecto para el syntax highlighting:

```html
<!-- En index.html -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>

<!-- Añade los lenguajes que necesites -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
```

### Ejemplo Básico

```typescript
import { AlfCodeComponent } from 'alf-components';

@Component({
  imports: [AlfCodeComponent],
  template: `
    <alf-code 
      [code]="myCode" 
      language="typescript">
    </alf-code>
  `
})
export class MyComponent {
  myCode = `interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};`;
}
```

## 📝 Ejemplos por Caso de Uso

### Con Título

```html
<alf-code 
  title="user.interface.ts"
  [code]="myCode" 
  language="typescript">
</alf-code>
```

### Sin Botón de Copiar

```html
<alf-code 
  [code]="myCode" 
  [showCopyButton]="false">
</alf-code>
```

### Con Números de Línea

```html
<alf-code 
  [code]="myCode" 
  [showLineNumbers]="true">
</alf-code>
```

### Con Truncamiento

```html
<!-- Mostrar solo las primeras 10 líneas con botón "Ver más" -->
<alf-code 
  title="Large File"
  [code]="largeCodeString" 
  language="typescript"
  [maxLines]="10">
</alf-code>
```

## 🎨 Lenguajes Soportados

El componente soporta cualquier lenguaje que Prism.js soporte:

| Lenguaje   | Valor        |
| ---------- | ------------ |
| TypeScript | `typescript` |
| JavaScript | `javascript` |
| HTML       | `html`       |
| CSS        | `css`        |
| SCSS       | `scss`       |
| Python     | `python`     |
| JSON       | `json`       |
| Bash       | `bash`       |
| SQL        | `sql`        |
| Java       | `java`       |
| C#         | `csharp`     |
| Go         | `go`         |
| Rust       | `rust`       |

Para más lenguajes, ver [Prism.js Languages](https://prismjs.com/#supported-languages).

## 📋 Ejemplos por Lenguaje

### HTML

```typescript
htmlCode = `<div class="container">
  <header>
    <h1>Welcome</h1>
  </header>
  <main>
    <p>Content here</p>
  </main>
</div>`;
```

```html
<alf-code 
  title="index.html"
  [code]="htmlCode" 
  language="html">
</alf-code>
```

### SCSS

```typescript
scssCode = `.button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}`;
```

```html
<alf-code 
  [code]="scssCode" 
  language="scss">
</alf-code>
```

### JSON

```typescript
jsonData = `{
  "name": "alf-components",
  "version": "1.0.0",
  "dependencies": {
    "@angular/core": "^21.0.0"
  }
}`;
```

```html
<alf-code 
  title="package.json"
  [code]="jsonData" 
  language="json">
</alf-code>
```

## 🎨 Personalización de Estilos

El componente viene con un tema VS Code Dark Modern integrado. Las clases CSS principales son:

```scss
// Contenedor principal
.alf-code-container { }

// Cabecera con título y lenguaje
.alf-code-header { }
.alf-code-title { }
.alf-code-language { }

// Bloque de código
.alf-code-block { }

// Botón de copiar
.alf-code-copy-btn { }
.alf-code-copy-btn.copied { }

// Botón de expandir/colapsar
.alf-code-expand-btn { }
```

### Ejemplo de Personalización

```scss
// En tu archivo de estilos global o del componente
.alf-code-container {
  border-radius: 12px;
  
  .alf-code-header {
    background: #1a1a2e;
  }
  
  .alf-code-block {
    font-size: 14px;
    line-height: 1.8;
  }
}
```

## 📁 Estructura del Componente

```
alf-code/
├── alf-code.ts           # Componente principal
├── alf-code.html         # Template
├── alf-code.scss         # Estilos + tema Prism.js
├── alf-code.spec.ts      # Tests unitarios
└── README.md             # Esta documentación
```

## 💡 Tips de Rendimiento

1. **Archivos grandes**: Usa `maxLines` para mejorar el rendimiento inicial.
2. **Bundle size**: Carga solo los lenguajes de Prism.js que necesites.
3. **Temas**: Puedes cambiar el tema de Prism.js usando CDN o sobreescribiendo los estilos.
4. **HTML escapado**: El componente usa `textContent` internamente, por lo que el HTML se escapa automáticamente.

---

## ♿ Accesibilidad

El componente cumple con los estándares W3C ARIA:
- `aria-label` en el botón de copiar que cambia según el estado ("Copiar código" / "Copiado").
- Atributos `type="button"` en todos los botones para evitar submit accidental en formularios.
- Feedback visual cuando el código se copia exitosamente.
- `<pre>` y `<code>` semánticos para lectores de pantalla.
- Contraste de colores adecuado en el tema VS Code Dark Modern.

---

## 🧪 Testing

El componente tiene tests cubriendo:

- Creación y renderizado básico.
- Inputs (code, title, language, showCopyButton, showLineNumbers, maxLines).
- Funcionalidad de copiar al portapapeles.
- Truncamiento y expand/collapse.
- Integración con Prism.js.
- Edge cases (código vacío, caracteres especiales, líneas largas).

```bash
# Ejecutar tests
npm test -- --filter="AlfCodeComponent"
```
