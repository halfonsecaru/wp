# TODO: Réplica de Casilla en AlfRadioButton

Este documento detalla todos los pasos necesarios para llevar a cabo la réplica exacta de las mejoras, estructura y comportamiento visual del componente `AlfCheckbox` en el componente `AlfRadioButton`.

---

## 1. Directiva Base (`bases.directive.ts`)

La directiva central ya ha sido optimizada para ambos componentes. No obstante, asegúrate de verificar los siguientes puntos:

- [ ] **Configuración de Border Radius (`buildColorBorderConfig`)**:
  Verifica que el `border-radius` dinámico para `AlfComponentTypeEnum.RadioButton` se resuelva de forma centralizada según el estilo visual del componente (`elegant` vs `standard`).
  * *Elegant*: Debería resolver a `AlfRadiusEnum.Full` (círculo).
  * *Standard*: Debería resolver a `AlfRadiusEnum.Sm` (caja redondeada suave).
  ```typescript
  case AlfComponentTypeEnum.RadioButton:
      resolvedRadius = String(cbStyle) === 'standard' ? AlfRadiusEnum.Sm : AlfRadiusEnum.Full;
      break;
  ```

---

## 2. Componente TypeScript (`alf-radio-button.ts`)

- [ ] **Eliminación Total de `config` / `inputConfig`**:
  Elimina el input `inputConfig` (alias `'config'`) y su interfaz asociada `AlfRadioButtonInterface`. A partir de ahora, todas las propiedades deben recibirse de forma plana y directa (siguiendo el mismo patrón limpio que `AlfCheckbox`):
  * **Eliminar**:
    ```typescript
    public readonly inputConfig = input<AlfRadioButtonInterface>(undefined, { alias: 'config' });
    ```

- [ ] **Refactorización de Señales Computadas**:
  Actualiza todas las señales computed para que lean directamente de los inputs planos del componente en lugar de buscar fallbacks en `inputConfig()`:
  * `idComputed`:
    ```typescript
    protected readonly idComputed = computed(() => this.id() ?? this.internalId);
    ```
  * `labelComputed`:
    ```typescript
    protected readonly labelComputed = computed<string | null>(() => {
      const explicitLabel = this.label() ?? this.labelText();
      if (explicitLabel) return explicitLabel;

      const internalLabel = this._label();
      if (internalLabel) return internalLabel;

      const pref = this.predefined();
      if (pref) return getAlfRadioButtonLabel(pref as keyof AlfRadioButtonI18nLabels);

      return '';
    });
    ```
  * `radioButtonStyleComputed`:
    ```typescript
    public readonly radioButtonStyleComputed = computed<AlfRadioButtonVariantEnum>(
      () => this.radioButtonStyle() ?? AlfRadioButtonVariantEnum.Elegant
    );
    ```
  * `labelPositionComputed`:
    ```typescript
    public readonly labelPositionComputed = computed<'before' | 'after'>(
      () => this.labelPosition() ?? 'after'
    );
    ```
  * `sizeComputed`:
    ```typescript
    public readonly sizeComputed = computed<AlfSizeEnum>(
      () => (this.size() as AlfSizeEnum) ?? AlfSizeEnum.MD
    );
    ```

- [ ] **Simplificación de `predefinedConfig`**:
  Ajusta `predefinedConfig` para que utilice los inputs planos directamente (`this.variant()` y `this.radioButtonStyleComputed()`):
  ```typescript
  protected readonly predefinedConfig = computed(() => {
    const currentVariant = this.variant() ?? AlfColorVariantEnum.SecondaryOutline;
    const vStr = currentVariant.toString();
    const style = this.radioButtonStyleComputed();
    
    // ... lógica de resolución de comp ...
  });
  ```

- [ ] **Alineación del CVA y Getters**:
  * Elimina el método `getControlConfig()` ya que no existe un objeto `config` que combinar con la directiva base.
  * Cambia `getControlValue()` para leer inputs planos:
    ```typescript
    protected getControlValue = (): string => {
      return this._label() ?? this.label() ?? '';
    }
    ```

- [ ] **Alineación del Constructor**:
  Asegúrate de que el constructor inicializa correctamente el tipo de componente como `RadioButton`:
  ```typescript
  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.RadioButton);
    this.initialization(visualprefixEnum.RadioButton, visualprefixEnum.Radio, AlfComponentTypeEnum.RadioButton);
  }
  ```

---

## 3. Plantilla HTML (`alf-radio-button.html`)

- [ ] **Aislamiento del Ripple Effect**:
  Mueve la directiva `[alfRipple]` del contenedor principal al contenedor visual interno.
  * **Correcto**: Colocar `[alfRipple]="rp !== undefined ? rp : null"` en el contenedor circular del radio:
    ```html
    <!-- Contenedor Visual (Circle) -->
    <div class="alf-rb-circle" [alfRipple]="rp !== undefined ? rp : null">
      <div class="alf-rb-ripple-bg"></div>
      <div class="alf-rb-dot"></div>
    </div>
    ```

- [ ] **Estructura Segura de Descripciones y Helpers**:
  Alinea la sección de helper text y errores con el patrón seguro migrado en Checkbox (removiendo lecturas de `inputConfig`):
  ```html
  @let helper = $safeNavigationMigration(helperText()); 
  @let errorMsg = $safeNavigationMigration(error()); 
  @if (helper || errorMsg) {
    <div [id]="idRadio + '-description'" class="alf-rb-description">
      @if (errorMsg) {
        <span class="alf-rb-error">{{ errorMsg }}</span>
      } @else {
        <span class="alf-rb-helper">{{ helper }}</span>
      }
    </div>
  }
  ```

---

## 4. Hojas de Estilo SCSS (`alf-radio-button.scss`)

- [ ] **Alineación con el Prefijo de Directiva**:
  Asegúrate de que el `.scss` del radio button utiliza `@include alf-transition;` en sus elementos interactivos, ya que la directiva base propaga de forma transparente los tiempos de `0s` y `150ms` de forma nativa.

---

## 5. Visor de Demostración (`alf-radio-button-viewer`)

- [ ] **Limpieza de Variantes Redundantes**:
  Elimina la propiedad `variant` de los ejemplos estándar e iniciales para verificar que el fallback por defecto (`SecondaryOutline`) se aplique correctamente.
- [ ] **Estandarización de Inicialización de Grupos**:
  Para prevenir efectos visuales en el primer renderizado al cambiar de sección, inicializa los estados reactivos de los grupos a `'none'` en `alf-radio-button-viewer.ts`:
  ```typescript
  public readonly selectedStyleGroup = signal<string>('none');
  public readonly selectedLabelPosGroup = signal<string>('none');
  public readonly selectedSolidElegantGroup = signal<string>('none');
  ...
  ```

---

## 6. Documentación (`ia_usage.md` y `READMEs`)

Tanto para **AlfCheckbox** como para **AlfRadioButton**, se deben actualizar los manuales y documentaciones de desarrollo para reflejar la eliminación del objeto `config` y la promoción del uso de inputs planos directos.

- [ ] **Actualizar `ia_usage.md`**:
  * Eliminar referencias a `inputConfig` o `config` y ejemplos asociados.
  * Añadir ejemplos limpios donde se usen directamente `[variant]`, `[label]`, `[disabled]`, etc.
  * *Ubicación Checkbox*: `alfcomponents/components/simple/alf-checkbox/ia_usage.md`
  * *Ubicación Radio*: `alfcomponents/components/simple/alf-radio-button/ia_usage.md`

- [ ] **Actualizar `README.english.md` y `README.spanish.md`**:
  * Eliminar interfaces como `AlfRadioButtonInterface` o `AlfCheckboxInterface` que han quedado obsoletas.
  * Documentar la tabla de propiedades directamente sobre inputs individuales.
  * *Ubicación Checkbox*: `alfcomponents/components/simple/alf-checkbox/README.*.md`
  * *Ubicación Radio*: `alfcomponents/components/simple/alf-radio-button/README.*.md`
