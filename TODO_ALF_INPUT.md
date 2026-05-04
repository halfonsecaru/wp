# TODO: ALF-INPUT COMPONENT

> **Patrón**: `ELITE_TODO_PATTERN.md`
> **Referencia funcional (solo conceptual)**: `Desktop/extra/.../simple/alf-input`
> **Source of Truth arquitectura**: `alf-buttons` + `alf-checkbox` (workspace)

---

## FASE 0: Investigación (COMPLETADA)

### Funcionalidades del legacy (referencia conceptual)
- Variantes visuales: `Outlined`, `Filled`, `Standard`
- Label flotante animado (float cuando hay foco o valor)
- Tipos de input: `text`, `email`, `password`, `number`, `search`, `textarea`
- Icono prefijo y sufijo
- Toggle de password (mostrar/ocultar)
- Botón de limpiar (clearable)
- Contador de caracteres (`showCharCounter` + `maxLength`)
- Texto de ayuda (`helperText`) y mensaje de error (`error`)
- Estado `loading` (spinner en sufijo)
- Estado `readonly` y `disabled`
- Debounce en la emisión del valor
- Auto-resize del textarea
- Soporte `required`, `pattern`, `min`, `max`, `step`, `autocomplete`
- ARIA completo

### Patrón real del workspace
- **`alf-checkbox`**: `variant` input → `predefinedConfig` → `finalConfig` → `override resolvedConfig`. Inputs directos con prioridad.
- **`alf-buttons`**: Template `@let` al inicio, `[style]` concatenado, `[alfRipple]`, `[alfTooltipText]`, `@HostListener`.

---

## FASE 1: Cimientos y Contrato [STOP]

### 1.1 CLI
- [x] `ng generate component components/simple/alf-input --project=alf-components --export --style=scss`

### 1.2 Estructura Elite
- [x] Crear: `interfaces/`, `enums/`, `predefined/`, `i18n/`, `utils/`

### 1.3 Visual Prefix
- [x] Añadir a `visualprefixEnum` en `@alfcomponents/shared`:
  ```typescript
  Input = '--alf-inp'
  ```

### 1.4 [COMPLETADA] — Contratos de Datos

**`enums/alf-input-variant.enum.ts`**:
```typescript
export enum AlfInputVariantEnum {
  Outlined = 'outlined',
  Filled = 'filled',
  Standard = 'standard',
}
```

**`enums/alf-input-type.enum.ts`**:
```typescript
export enum AlfInputTypeEnum {
  Text = 'text',
  Email = 'email',
  Password = 'password',
  Number = 'number',
  Search = 'search',
  Tel = 'tel',
  Url = 'url',
  Textarea = 'textarea',
}
```

**`interfaces/alf-input.interface.ts`** (extiende `AlfBaseCommonConfigInterface`):
```typescript
export interface AlfInputInterface extends AlfBaseCommonConfigInterface {
  /** Tipo de input */
  inputType?: AlfInputTypeEnum;
  /** Variante visual */
  inputVariant?: AlfInputVariantEnum;
  /** Label flotante */
  label?: string;
  /** Placeholder (visible cuando label flota) */
  placeholder?: string;
  /** Icono prefijo (Unicode) */
  prefix?: AlfIconsUnicodeIconEnum;
  /** Icono sufijo (Unicode) */
  suffix?: AlfIconsUnicodeIconEnum;
  /** Mensaje de error */
  error?: string;
  /** Texto de ayuda */
  helperText?: string;
  /** Campo requerido */
  required?: boolean;
  /** Solo lectura */
  readonly?: boolean;
  /** Estado loading */
  loading?: boolean;
  /** Mostrar botón limpiar */
  clearable?: boolean;
  /** Toggle para password */
  showPasswordToggle?: boolean;
  /** Mostrar contador de caracteres */
  showCharCounter?: boolean;
  /** Longitud máxima */
  maxLength?: number;
  /** Longitud mínima */
  minLength?: number;
  /** min (number) */
  min?: number;
  /** max (number) */
  max?: number;
  /** step (number) */
  step?: number;
  /** pattern (regex string) */
  pattern?: string;
  /** name del input */
  name?: string;
  /** autocomplete nativo */
  autocomplete?: string;
  /** Filas para textarea */
  rows?: number;
  /** Auto-resize textarea */
  autoResize?: boolean;
  /** Debounce en ms (0 = sin debounce) */
  debounceTime?: number;
  /** ID manual (si no se genera automático) */
  id?: string;
}
```

> **[STOP]**: Validar contrato con USER antes de continuar.

---

## FASE 2: Configuración y Factory

### 2.1 Utils
**`utils/alf-input.utils.ts`**:
```typescript
// Devuelve true si el label debe flotar
export const shouldLabelFloat = (
  focused: boolean, value: string, type?: AlfInputTypeEnum
): boolean => focused || value.length > 0 || type === AlfInputTypeEnum.Number;

// Devuelve el type HTML real ('text' para Textarea)
export const getInputType = (type?: AlfInputTypeEnum): string =>
  type === AlfInputTypeEnum.Textarea ? 'text' : (type ?? 'text');
```

### 2.2 Factory Pattern
**`predefined/alf-input.predefined.ts`**:
```typescript
export const ALF_INPUT_DEFAULT: AlfInputInterface = {
  inputType: AlfInputTypeEnum.Text,
  inputVariant: AlfInputVariantEnum.Outlined,
  required: false,
  readonly: false,
  loading: false,
  clearable: false,
  showPasswordToggle: true,
  showCharCounter: false,
  autoResize: false,
  debounceTime: 0,
  rows: 3,
  autocomplete: 'off',
};

export const getAlfInputDefaultConfig = (
  variant: string | AlfColorVariantEnum
): AlfInputInterface => ({
  ...ALF_INPUT_DEFAULT,
  predefined: resolveDefaultVisual(variant),
});
```

Variantes: `SolidPrimary/Success/Danger/Warning/Info/Dark`,
`OutlinedPrimary/Secondary/Success/Danger`, `CrystalPrimary/Secondary`.

### 2.3 i18n
**`i18n/alf-input.i18n.ts`**:
```typescript
export interface AlfInputI18nLabels {
  clearAriaLabel: string;
  showPassword: string;
  hidePassword: string;
  loading: string;
}
// Idiomas: es, en, fr, de, it, pt, ru
// Usar createLanguageMap + getLabelsForCurrentLanguage de @alfcomponents/i18n/i18n-utils
export const getInputLabels = (lang?: SupportedLanguage): AlfInputI18nLabels => { ... };
export const getInputLabel = (key: keyof AlfInputI18nLabels, lang?: SupportedLanguage): string => { ... };
```

### 2.4 Base Setup
```typescript
protected override readonly visualPrefix = visualprefixEnum.Input;
protected readonly internalId = generateUniqueId({ prefix: 'alf-inp' });
```

---

## FASE 3: Lógica de Clase

### Orden: Effects → Attributes → Signals → Computed → Lifecycle → Functions

### 3.1 Effects (propiedades de clase)
```typescript
// Auto-resize del textarea (usa viewChild, NO setTimeout)
private readonly autoResizeEffect = effect(() => {
  const val = this.value();
  const cfg = this.resolvedConfig();
  const el = this.inputElement();
  if (cfg?.autoResize && el) this.applyAutoResize(el.nativeElement);
});
```

### 3.2 Signals

**Variante/config** (patrón checkbox):
```typescript
public readonly variant = input<string | AlfColorVariantEnum>(undefined, { alias: 'variant' });
public override readonly inputConfig = input<AlfInputInterface>(ALF_INPUT_DEFAULT, { alias: 'config' });
```

**Model two-way**:
```typescript
public readonly value = model<string>('');
```

**Internos**:
```typescript
protected readonly isFocused = signal<boolean>(false);
protected readonly isPasswordVisible = signal<boolean>(false);
private readonly pendingValue = signal<string | null>(null);
private debounceTimerId: ReturnType<typeof setTimeout> | null = null;
```

**ViewChild**:
```typescript
protected readonly inputElement = viewChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('inputRef');
```

### 3.3 Computed

**Cadena config** (patrón checkbox):
```typescript
protected readonly predefinedConfig = computed(() => {
  const v = this.variant();
  return v ? getAlfInputDefaultConfig(v) : ALF_INPUT_DEFAULT;
});

protected readonly finalConfig = computed(() => {
  const v = this.variant();
  const cfg = this.inputConfig();
  const base = v ? getAlfInputDefaultConfig(v) : ALF_INPUT_DEFAULT;
  if (!cfg || cfg === ALF_INPUT_DEFAULT) return base;
  return { ...base, ...cfg };
});

protected override readonly resolvedConfig = this.finalConfig;
```

**Derivados**:
```typescript
protected readonly isDisabled = computed(() => this.disabledComputed());
protected readonly isReadonly = computed(() => this.resolvedConfig()?.readonly ?? false);
protected readonly isLoading = computed(() => this.resolvedConfig()?.loading ?? false);

protected readonly inputId = computed(() =>
  this.resolvedConfig()?.id ?? this.internalId
);

protected readonly shouldFloat = computed(() =>
  shouldLabelFloat(this.isFocused(), this.value(), this.resolvedConfig()?.inputType)
);

protected readonly inputTypeAttr = computed(() => {
  const type = this.resolvedConfig()?.inputType;
  if (type === AlfInputTypeEnum.Password && this.isPasswordVisible()) return 'text';
  return getInputType(type);
});

protected readonly isTextarea = computed(() =>
  this.resolvedConfig()?.inputType === AlfInputTypeEnum.Textarea
);

protected readonly showClear = computed(() => {
  const cfg = this.resolvedConfig();
  return cfg?.clearable && this.value().length > 0 && !this.isDisabled() && !this.isReadonly() && !this.isLoading();
});

protected readonly showPasswordToggle = computed(() => {
  const cfg = this.resolvedConfig();
  return cfg?.inputType === AlfInputTypeEnum.Password && cfg?.showPasswordToggle !== false;
});

protected readonly showCharCounter = computed(() => {
  const cfg = this.resolvedConfig();
  return cfg?.showCharCounter && cfg?.maxLength !== undefined;
});

protected readonly hasSuffix = computed(() =>
  !!this.resolvedConfig()?.suffix || this.showPasswordToggle() || this.showClear() || this.isLoading()
);

protected readonly variantClass = computed(() =>
  'alf-input--' + (this.resolvedConfig()?.inputVariant ?? AlfInputVariantEnum.Outlined)
);

// Labels i18n
protected readonly clearLabel = computed(() => getInputLabel('clearAriaLabel'));
protected readonly showPwdLabel = computed(() => getInputLabel('showPassword'));
protected readonly hidePwdLabel = computed(() => getInputLabel('hidePassword'));
```

### 3.4 Outputs
```typescript
public readonly onFocus = output<FocusEvent>();
public readonly onBlur = output<FocusEvent>();
public readonly onInput = output<string>();
public readonly onClear = output<void>();
```

### 3.5 Handlers (Arrow Functions)
```typescript
protected handleInput = (event: Event): void => {
  const val = (event.target as HTMLInputElement).value;
  const debounce = this.resolvedConfig()?.debounceTime ?? 0;
  if (debounce > 0) {
    this.pendingValue.set(val);
  } else {
    this.value.set(val);
    this.onInput.emit(val);
  }
};

protected handleFocus = (event: FocusEvent): void => {
  this.isFocused.set(true);
  this.onFocus.emit(event);
};

protected handleBlur = (event: FocusEvent): void => {
  this.isFocused.set(false);
  this.onBlur.emit(event);
};

protected focusInput = (): void => {
  const el = this.inputElement();
  if (el && !this.isDisabled()) el.nativeElement.focus();
};

protected clear = (event: MouseEvent): void => {
  event.stopPropagation();
  this.value.set('');
  this.onClear.emit();
  this.focusInput();
};

protected togglePassword = (event: MouseEvent): void => {
  event.stopPropagation();
  this.isPasswordVisible.update(v => !v);
};

private applyAutoResize = (el: HTMLElement): void => {
  const textarea = el as HTMLTextAreaElement;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
};

// Efecto de debounce — usar effect() con onCleanup
// (declarado en 3.1 como propiedad de clase)
private readonly debounceEffect = effect((onCleanup) => {
  const pending = this.pendingValue();
  const time = this.resolvedConfig()?.debounceTime ?? 0;
  if (pending !== null && time > 0) {
    this.debounceTimerId = setTimeout(() => {
      this.value.set(pending);
      this.onInput.emit(pending);
      this.pendingValue.set(null);
    }, time);
    onCleanup(() => {
      if (this.debounceTimerId) clearTimeout(this.debounceTimerId);
    });
  }
});
```

### 3.6 Bridge Pattern (Vitest/JIT)
```typescript
@Input() set variantBridge(v: string | AlfColorVariantEnum) {
  this._variantSignal.set(v);
}
private readonly _variantSignal = signal<string | AlfColorVariantEnum | undefined>(undefined);
```

---

## FASE 4: Template y Estética Premium

### 4.1 HTML — Bloque @let al inicio

```html
@let cfg = resolvedConfig();
@let id = inputId();
@let isDisabled = isDisabled();
@let isReadonly = isReadonly();
@let isLoading = isLoading();
@let floating = shouldFloat();
@let textarea = isTextarea();
@let inputType = inputTypeAttr();
@let variantCls = variantClass();
@let showClear = showClear();
@let showPwd = showPasswordToggle();
@let showCounter = showCharCounter();
@let hasSuffix = hasSuffix();
@let pwdVisible = isPasswordVisible();
@let val = value();
@let tooltip = tooltipComputed();
@let bgStyle = createBackgroundsStyle();
@let borderStyle = createBorderStyle();
@let paddingStyle = createPaddingStyle();
@let shadowStyle = createShadowsStyle();
@let typographyStyle = createTypographyStyle();
@let animClass = animationsClassComputed();
@let customClass = customClassComputed();
@let customStyle = customStyleComputed();
@let clearLbl = clearLabel();
@let showLbl = showPwdLabel();
@let hideLbl = hidePwdLabel();
```

Estructura:
```html
<div
  [attr.id]="id + '-wrapper'"
  [alfTooltipText]="tooltip"
  [style]="bgStyle + borderStyle + paddingStyle + shadowStyle + typographyStyle + customStyle"
  [class]="'alf-input ' + variantCls + ' ' + animClass + ' ' + customClass"
  [class.alf-input--focused]="isFocused()"
  [class.alf-input--disabled]="isDisabled"
  [class.alf-input--readonly]="isReadonly"
  [class.alf-input--error]="cfg?.error"
  [class.alf-input--loading]="isLoading"
  (click)="focusInput()"
>
  <!-- Prefix icon -->
  @if (cfg?.prefix) {
    <span class="alf-input__prefix">{{ cfg.prefix }}</span>
  }

  <!-- Field wrapper -->
  <div class="alf-input__field-wrap">
    @if (textarea) {
      <textarea
        #inputRef
        [id]="id"
        [name]="cfg?.name || ''"
        [value]="val"
        [disabled]="isDisabled"
        [readonly]="isReadonly"
        [required]="cfg?.required || false"
        [attr.maxlength]="cfg?.maxLength ?? null"
        [attr.minlength]="cfg?.minLength ?? null"
        [rows]="cfg?.rows ?? 3"
        [placeholder]="floating ? (cfg?.placeholder || '') : ''"
        [style.resize]="cfg?.autoResize ? 'none' : 'both'"
        class="alf-input__field alf-input__field--textarea"
        [class.alf-input__field--has-suffix]="hasSuffix"
        [attr.aria-label]="cfg?.ariaLabel || cfg?.label"
        [attr.aria-invalid]="cfg?.error ? 'true' : null"
        [attr.aria-describedby]="cfg?.error || cfg?.helperText ? id + '-desc' : null"
        (input)="handleInput($event)"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
      ></textarea>
    } @else {
      <input
        #inputRef
        [id]="id"
        [type]="inputType"
        [name]="cfg?.name || ''"
        [value]="val"
        [disabled]="isDisabled"
        [readonly]="isReadonly"
        [required]="cfg?.required || false"
        [attr.maxlength]="cfg?.maxLength ?? null"
        [attr.minlength]="cfg?.minLength ?? null"
        [attr.min]="cfg?.min ?? null"
        [attr.max]="cfg?.max ?? null"
        [attr.step]="cfg?.step ?? null"
        [attr.pattern]="cfg?.pattern ?? null"
        [attr.autocomplete]="cfg?.autocomplete ?? 'off'"
        [placeholder]="floating ? (cfg?.placeholder || '') : ''"
        class="alf-input__field"
        [class.alf-input__field--has-suffix]="hasSuffix"
        [attr.aria-label]="cfg?.ariaLabel || cfg?.label"
        [attr.aria-invalid]="cfg?.error ? 'true' : null"
        [attr.aria-describedby]="cfg?.error || cfg?.helperText ? id + '-desc' : null"
        (input)="handleInput($event)"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
      />
    }

    <!-- Floating label -->
    @if (cfg?.label) {
      <label
        [for]="id"
        class="alf-input__label"
        [class.alf-input__label--float]="floating"
        [class.alf-input__label--has-prefix]="!!cfg?.prefix"
      >
        {{ cfg.label }}
        @if (cfg?.required) { <span class="alf-input__required">*</span> }
      </label>
    }

    <!-- Outlined fieldset (solo variant Outlined) -->
    @if (cfg?.inputVariant === AlfInputVariantEnum.Outlined || !cfg?.inputVariant) {
      <fieldset class="alf-input__fieldset" aria-hidden="true">
        <legend class="alf-input__legend" [class.alf-input__legend--float]="floating && cfg?.label">
          <span>{{ cfg?.label }}@if (cfg?.required) { * }</span>
        </legend>
      </fieldset>
    }
  </div>

  <!-- Suffix area -->
  <div class="alf-input__suffix-area">
    @if (isLoading) {
      <span class="alf-input__spinner" role="status" [attr.aria-label]="'loading'">
        <span class="alf-input__spinner-circle"></span>
      </span>
    } @else {
      @if (showClear) {
        <button
          class="alf-input__suffix-btn alf-input__clear-btn"
          type="button"
          tabindex="-1"
          [attr.aria-label]="clearLbl"
          (click)="clear($event)"
        >✕</button>
      }
      @if (showPwd) {
        <button
          class="alf-input__suffix-btn alf-input__pwd-toggle"
          type="button"
          tabindex="-1"
          [attr.aria-label]="pwdVisible ? hideLbl : showLbl"
          (click)="togglePassword($event)"
        >{{ pwdVisible ? '🙈' : '👁' }}</button>
      } @else if (cfg?.suffix && !showClear) {
        <span class="alf-input__suffix-icon">{{ cfg.suffix }}</span>
      }
    }
  </div>
</div>

<!-- Footer: error / helperText / counter -->
@if (cfg?.error || cfg?.helperText || showCounter) {
  <div class="alf-input__footer">
    @if (cfg?.error || cfg?.helperText) {
      <span
        [id]="id + '-desc'"
        class="alf-input__helper"
        [class.alf-input__helper--error]="cfg?.error"
      >{{ cfg?.error || cfg?.helperText }}</span>
    }
    @if (showCounter) {
      <span
        class="alf-input__counter"
        [class.alf-input__counter--error]="cfg?.maxLength && val.length > cfg.maxLength"
      >{{ val.length }}/{{ cfg?.maxLength }}</span>
    }
  </div>
}
```

### 4.2 SCSS
```scss
@use '../../../styles/mixins' as *;

:host { display: block; width: 100%; }

.alf-input {
  @include alf-border-css-vars('--alf-inp', 0.375rem, '&.alf-input--disabled');
  @include alf-transition;
  position: relative;
  display: flex;
  align-items: center;
  cursor: text;

  &--disabled  { opacity: 0.5; pointer-events: none; cursor: not-allowed; }
  &--readonly  { cursor: default; }
  &--error     { /* color error via CSS vars */ }
  &--focused   { /* outline/border focus */ }

  // Variantes
  &--outlined  { /* border completo + fieldset */ }
  &--filled    { /* fondo + solo border-bottom */ }
  &--standard  { /* solo border-bottom */ }

  &__field-wrap { position: relative; flex: 1; display: flex; }
  &__field {
    width: 100%; background: transparent; border: none; outline: none;
    font: inherit; padding: 1.25rem 0.75rem 0.375rem;
    &--textarea { resize: vertical; }
    &--has-suffix { padding-right: 2.5rem; }
  }
  &__label {
    position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%);
    pointer-events: none; transition: all 0.2s ease;
    &--float { top: 0.375rem; transform: none; font-size: 0.75em; }
    &--has-prefix { left: 2.5rem; }
  }
  &__required { color: currentColor; margin-left: 0.15em; }
  &__fieldset {
    position: absolute; inset: -5px 0 0; border: inherit;
    border-radius: inherit; pointer-events: none; padding: 0 0.5rem;
  }
  &__legend { padding: 0; height: 0; font-size: 0.75em; visibility: hidden;
    &--float span { padding: 0 0.25rem; }
  }
  &__prefix  { padding-left: 0.75rem; display: flex; align-items: center; }
  &__suffix-area { display: flex; align-items: center; padding-right: 0.5rem; gap: 0.25rem; }
  &__suffix-btn  { background: none; border: none; cursor: pointer; padding: 0.25rem; display: flex; align-items: center; }
  &__suffix-icon { display: flex; align-items: center; }
  &__spinner { display: flex; align-items: center; }
  &__spinner-circle { /* CSS spinner animado (solo estático, sin WAAPI ya que es continuo) */ }

  &__footer { display: flex; justify-content: space-between; padding: 0.25rem 0.75rem 0; font-size: 0.75em; }
  &__helper { flex: 1; &--error { /* color error */ } }
  &__counter { &--error { /* color error */ } }
}
```

### 4.3 WAAPI (TypeScript)
```typescript
private readonly el = inject(ElementRef);

// Focus ring (border glow al hacer focus)
private animateFocusIn = (): void => {
  this.el.nativeElement.animate(
    [{ boxShadow: '0 0 0 0px currentColor' }, { boxShadow: '0 0 0 3px currentColor' }],
    { duration: 150, easing: 'ease-out', fill: 'forwards' }
  );
};

private animateFocusOut = (): void => {
  this.el.nativeElement.animate(
    [{ boxShadow: '0 0 0 3px currentColor' }, { boxShadow: '0 0 0 0px currentColor' }],
    { duration: 150, easing: 'ease-in', fill: 'forwards' }
  );
};

// Label float (alternativa WAAPI si CSS transition no es suficiente)
// Invocar desde handleFocus/handleBlur si se requiere
```

---

## FASE 5: Calidad, Integración y Documentación

### 5.1 Tests (suite mínima)
- [ ] Creación sin errores con config default
- [ ] `value` model two-way funciona
- [ ] `handleInput` actualiza `value` sin debounce
- [ ] `handleInput` con `debounceTime > 0` usa debounce
- [ ] `clear()` resetea value y emite `onClear`
- [ ] `togglePassword()` alterna `isPasswordVisible`
- [ ] `shouldFloat` es true cuando hay valor o foco
- [ ] `showClear` solo es true cuando clearable + value + !disabled + !readonly
- [ ] `showPasswordToggle` solo cuando type=Password
- [ ] `showCharCounter` solo cuando `showCharCounter + maxLength`
- [ ] Disabled: sin interacciones
- [ ] Variantes Outlined/Filled/Standard generan clase correcta
- [ ] Textarea: `isTextarea` computed true
- [ ] ARIA: `aria-invalid` true cuando hay error
- [ ] Error muestra texto de error en footer

### 5.2 Demo Page `/demo/alf-input`
1. Variantes: Outlined, Filled, Standard
2. Tipos: Text, Email, Password, Number, Search, Textarea
3. Estados: Disabled, Readonly, Loading, Error, HelperText
4. Funcionalidades: Clearable, PasswordToggle, CharCounter, Debounce, AutoResize
5. Prefix/Suffix icons
6. Con variantes de color: SolidPrimary, OutlinedPrimary, CrystalPrimary

> Contenedores de demo SIN hover effects, sombras ni transforms.

### 5.3 Documentación Triple
- [ ] `README.english.md` — sin emojis
- [ ] `README.spanish.md` — sin emojis
- [ ] `ia_usage.md` — técnico en inglés para IAs

### 5.4 Exportación `public-api.ts`
```typescript
export * from './lib/components/simple/alf-input/alf-input';
export * from './lib/components/simple/alf-input/interfaces/alf-input.interface';
export * from './lib/components/simple/alf-input/enums/alf-input-variant.enum';
export * from './lib/components/simple/alf-input/enums/alf-input-type.enum';
export * from './lib/components/simple/alf-input/predefined/alf-input.predefined';
export * from './lib/components/simple/alf-input/i18n/alf-input.i18n';
export * from './lib/components/simple/alf-input/utils/alf-input.utils';
```

---

## Checklist Final
- [ ] Sin `@Input()` tradicionales
- [ ] `readonly` en signals e inyectados
- [ ] Métodos = Arrow Functions
- [ ] Sin funciones anidadas
- [ ] Sin strings literales en template
- [ ] Sin `CommonModule` / directivas deprecated
- [ ] Selector `alf-input` con prefijo `alf-`
- [ ] Animaciones en WAAPI, NO en CSS (excepto spinner continuo)
- [ ] Build sin errores
- [ ] Tests Vitest pasan
- [ ] Docs sin emojis
