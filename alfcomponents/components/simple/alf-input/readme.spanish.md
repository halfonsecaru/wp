# AlfInput

`AlfInput` es un componente de campo de texto altamente personalizable, moderno y reactivo para Angular 18+ construido íntegramente sobre la nueva arquitectura de **Signals**. Implementa `ControlValueAccessor` para integrarse a la perfección con los formularios de Angular.

## Características
- **Impulsado por Signals**: Utiliza `input()`, `model()`, `output()` y `computed()` para una detección de cambios `OnPush` ultrarrápida.
- **Integración con Formularios**: Totalmente compatible con Formularios Reactivos y Formularios Basados en Plantillas.
- **Apariencias**: Soporta tres diseños nativos (`Outline`, `Fill` y `Standard`).
- **Variantes de Color Dinámicas**: Compatible con todas las paletas y variantes de color (Solid, Soft, Outline, 3D, Gradient, Ghost) a través de un motor de estilos interno inteligente.
- **Complementos Integrados**: Botón para alternar visibilidad de contraseña, botón de limpiar, contador de caracteres y manejo de textos de ayuda/error.
- **Proyección Avanzada**: Inyecta iconos, desplegables o HTML personalizado directamente en la estructura del input mediante `[alfPrefix]` y `[alfSuffix]`.

## Ejemplo de Uso

### Input Básico
```html
<alf-input 
  label="Nombre de Usuario"
  placeholder="Introduce tu usuario"
  [(value)]="miSignal"
  [appearance]="AlfInputAppearanceEnum.Outline">
</alf-input>
```

### Con Prefijo y Formularios
```html
<alf-input 
  label="Número de Teléfono"
  [formControl]="phoneCtrl">
  <div alfPrefix>🇪🇸 +34</div>
  <button alfSuffix>Llamar</button>
</alf-input>
```

### Usando el Objeto de Configuración
En lugar de pasar bindings individuales, puedes pasar un objeto de configuración `AlfInputInterface` completo:
```html
<alf-input [config]="inputConfig()"></alf-input>
```
```typescript
inputConfig = signal<AlfInputInterface>({
  label: 'Contraseña',
  inputType: AlfInputTypeEnum.Password,
  showPasswordToggle: true,
  clearable: true,
  helperText: 'Debe tener al menos 8 caracteres'
});
```

## API

### Entradas (Inputs)
- `config` (`AlfInputInterface`): Un objeto maestro de configuración.
- `label` (`string`): La etiqueta flotante o estática para el input.
- `placeholder` (`string`): Texto de marcador de posición.
- `type` (`AlfInputTypeEnum | string`): Tipo de input HTML (ej. text, password, email).
- `appearance` (`AlfInputAppearanceEnum`): Outline, Fill o Standard.
- `clearable` (`boolean`): Muestra un icono de limpiar (X) cuando el input tiene valor.
- `showPasswordToggle` (`boolean`): Muestra un icono de ojo para alternar la visibilidad de la contraseña.
- `showCharCounter` (`boolean`): Muestra un conteo de caracteres (requiere `maxLength`).
- `debounceTime` (`number`): Retrasa la emisión del evento `onInput`.
- `isLoading` (`boolean`): Superpone un spinner centrado con fondo transparente sobre el input.

### Modelos (Models)
- `value` (`model<string>`): Señal de valor vinculable en dos direcciones.

### Salidas (Outputs)
- `onInput` (`string`): Se emite después de que el usuario escribe (respeta `debounceTime`).
- `onClear` (`void`): Se emite cuando se hace clic en el icono de limpiar.

## Espacios de Proyección (Slots)
Puedes utilizar la proyección de contenido estándar de Angular para colocar elementos personalizados dentro del input:
- `<ng-content select="[alfPrefix]"></ng-content>`
- `<ng-content select="[alfSuffix]"></ng-content>`
