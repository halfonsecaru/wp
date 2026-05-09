# AI Usage Guide: AlfButtons (Nuevo)

Este documento describe como extender y usar `alf-buttons` de forma segura desde un asistente de IA.

## Arquitectura actual

- Componente: `alfcomponents/components/simple/alf-buttons/alf-buttons.ts`
- Base: `AlfBaseButtonConfiguration` + `AlfBaseConfiguration`
- Plantilla: `alf-buttons.html` (render button o anchor)
- Estilos: `alf-buttons.scss` (variables `--alf-btn-*`)

El motor visual no depende de clases utilitarias externas. Prioriza `inputConfig` y las entradas directas para resolver estilos y estados.

## Flujo recomendado para configuraciones

1. Para botones de catalogo, usa `getAlfPredefinedButton(...)`.
2. Para customizaciones, mezcla sobre el objeto resultante:
   - `label`
   - `iconLeft` / `iconRight`
   - `displayAndLayout`, `typography`, `textStyle`, etc.
3. Evita hardcodear estilos inline fuera del sistema visual.

Ejemplo:

```ts
const base = getAlfPredefinedButton(DefaultButtonKeys.Warning, {
  visualType: AlfButtonVisualTypeEnum.Ghost,
  lang: 'es',
});

const config = {
  ...base,
  label: 'Revisar',
};
```

## i18n

- Fuente i18n: `i18n/alf-button.i18n.ts`
- `getAlfPredefinedButton(...)` ya resuelve label traducido.
- Si se envia `label` manual, ese valor pisa el traducido.

## Eventos y comportamiento

- Outputs disponibles:
  - `onClick`
  - `onHoverEnter`
  - `onHoverLeave`
- Debounce:
  - Input: `debounceTime`
  - Logica: ignora clicks dentro del umbral usando `Date.now()`.
- Smart blur:
  - En click de puntero (`event.detail > 0`) hace `blur()` para no dejar foco visual.

## Reglas para cambios de codigo

- No romper consistencia de `Light`: el texto debe mantenerse estable en hover/active.
- Si agregas un visual type nuevo, actualizar:
  - `default-visual.ts`
  - demo viewer
  - tests del componente
- Mantener imports por alias `@alfcomponents/...`.

## Tests minimos esperados

- Render `button` por defecto.
- Render `a` cuando hay `link`.
- Emision de `onClick`, `onHoverEnter`, `onHoverLeave`.
- Debounce activo y desactivado.
- i18n con `lang` explicito y con idioma de navegador.

Comandos utiles:

```bash
npx vitest run alfcomponents/components/simple/alf-buttons/alf-buttons.spec.ts
npx vitest run alfcomponents/components/simple/alf-buttons/alf-button-predefined.spec.ts
```

---
Referencia tecnica para agentes IA y mantenimiento del componente.
