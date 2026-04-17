# 🚀 CHECKLIST DE IMPLEMENTACIÓN: COMPONENTES ÉLITE (ALF-SYSTEM)

Este documento es la guía paso a paso para crear un componente desde cero con el estándar de calidad "Élite" establecido con `AlfButton`. Síguelo en orden secuencial.

---

## 🏗️ FASE 1: SCALING (Andamiaje y Estructura)

#### 1.1 Generación CLI
- [ ] Ejecutar: `ng generate component components/alf-[nombre] --project=alf-components --export --style=scss`
- [ ] Verificar que se ha añadido al `public-api.ts`.
- [ ] Eliminar `CommonModule` del decorador del componente si no se necesitan Pipes heredados.

#### 1.2 Estructura de Directorios
- [ ] Crear carpeta `interfaces/` y archivo `alf-[nombre].interface.ts`.
- [ ] Crear carpeta `enums/` y archivos `alf-[nombre]-visual-type.enum.ts` y `default[Nombre]Keys.enum.ts`.
- [ ] Crear carpeta `predefined/` y archivo `alf-[nombre].predefined.ts`.
- [ ] Crear carpeta `i18n/` y archivo `alf-[nombre].i18n.ts`.
- [ ] **Composed Only**: Si tiene sub-componentes (ej: AlfTab), crear su propia carpeta interna con el mismo estándar o como sub-directorio.

---

## 📜 FASE 2: CONTRACTS (La Verdad Tipada)

#### 2.1 Interface Base
- [ ] Definir `Alf[Nombre]Interface` en `interfaces/`.
- [ ] Asegurar que extiende de las propiedades base si aplica o que es determinística.

#### 2.2 Enums de Control
- [ ] Definir `Default[Nombre]Keys` con las claves semánticas (ej: `Accept`, `Cancel`).
- [ ] Definir `Alf[Nombre]VisualTypeEnum` (ej: `Solid`, `Ghost`, `3D`).

---

## 🧬 FASE 3: DNA (Fábrica de Predefinidos)

Configuración en `alf-[nombre].predefined.ts` usando el patrón de 3 pasos:

- [ ] **Paso 1: Identidades (ADN)**: Crear el mapa `Record<string, AlfIdentity>` con colores y metadatos base.
- [ ] **Paso 2: Constructor Maestro**: Crear la función `getAlfPredefined[Nombre]` que inyecta el `VisualType`.
- [ ] **Paso 3: Overrides**: Aplicar lógica condicional para variantes especiales (estilo Friki/Geek Mode).

---

## 🧠 FASE 4: BRAIN (Lógica TypeScript Élite)

#### 4.1 Herencia y Rigor Técnico
- [ ] Extender de `AlfBaseComponent<Alf[Nombre]Interface>`.
- [ ] Usar `ChangeDetectionStrategy.OnPush`.
- [ ] Usar `ViewEncapsulation.None` (recomendado para librerías de componentes).

#### 4.2 Bridge Inputs (Vitest Ready)
- [ ] Implementar `@Input()` con setters que alimenten señales internas:
  ```typescript
  @Input('predefined') set predefined(v: Alf[Nombre]Interface | string) { this.predefinedInput.set(v); }
  protected readonly predefinedInput = signal<Alf[Nombre]Interface | string>(DefaultKeys.Base);
  ```

#### 4.3 Signals y Reactividad
- [ ] Implementar `resolvedPredefined = computed(...)` para alimentar el motor de `AlfBaseComponent`.
- [ ] Usar `output<T>()` en lugar de `EventEmitter` para eventos modernos.
- [ ] Usar Arrow Functions en todos los métodos y `HostListeners`.

---

## 🎨 FASE 5: AESTHETICS (SCSS y Mixins)

#### 5.1 Conexión Global
- [ ] Añadir import: `@use '../../../styles/mixins' as *;` (Verificar profundidad de `../`).
- [ ] Usar el prefijo `alf-` en el selector CSS base.

#### 5.2 Mixins Automáticos
- [ ] Incluir los mixins dinámicos que consumen las CSS Variables inyectadas por el componente:
  ```scss
  .alf-[nombre] {
    @include alf-padding();
    @include alf-backgrounds();
    @include alf-border();
    @include alf-typography();
    // ...
  }
  ```

#### 5.3 Responsiveness & Touch
- [ ] Asegurar compatibilidad fluida con **Mobile, Tablet y PC**.
- [ ] Implementar gestos touch (ej: swipe) si el componente lo requiere.
- [ ] Verificar áreas de interacción táctil (min 44px).

---

## 🧪 FASE 6: QUALITY (Testing)

#### 6.1 Suite de Vitest
- [ ] Crear `.spec.ts` básico con `TestBed`.
- [ ] Verificar renderizado de variantes predefinidas.
- [ ] Verificar reactividad de Signals al cambiar inputs.

---

## 📖 FASE 7: DOCS (Heredando el Conocimiento)

- [ ] Crear `README.spanish.md` (Documentación clara sin emojis).
- [ ] Crear `README.english.md`.
- [ ] **CRÍTICO**: Crear `ia_usage.md` en inglés explicando a futuras IAs cómo usar el componente y sus interfaces.

---

## 🚀 PROPÓSITO: CONSISTENCIA ÉLITE
> [!TIP]
> Si el componente no pasa este checklist, no es un componente Élite. La consistencia es lo que hace que esta librería sea superior a las profesionales.
