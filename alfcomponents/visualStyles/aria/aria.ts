import { Directive, input } from '@angular/core';
import { AlfAriaBaseInterface } from '@alfcomponents/interfaces';

/**
 * @directive AlfAriaDirective
 * @selector [alfAria]
 *
 * Mapea el objeto `AlfAriaBaseInterface` a atributos ARIA nativos del DOM.
 * Se aplica al elemento host (el `<div>` contenedor del componente base).
 *
 * ---
 * ### 🤖 INSTRUCCIONES PARA IA
 *
 * Cuando un componente específico (ej. `alf-button`, `alf-input`) necesite
 * atributos ARIA adicionales más allá de `AlfAriaBaseInterface`, se debe:
 *
 * 1. **Extender la interfaz** apropiada (ej. `AlfAriaPopupInterface`) en
 *    `alfcomponents/interfaces/alf-aria.interface.ts`.
 *
 * 2. **Ampliar el input** del componente hijo para aceptar la interfaz extendida:
 *    ```typescript
 *    public readonly aria = input<AlfAriaInterface | AlfAriaBaseInterface | undefined>(undefined);
 *    ```
 *
 * 3. **Si se necesitan atributos ARIA de popup** (`aria-expanded`, `aria-controls`,
 *    `aria-haspopup`, `aria-activedescendant`), NO añadirlos aquí directamente.
 *    En su lugar, crear una directiva específica del componente (ej. `AlfComboboxAriaDirective`)
 *    que los gestione con lógica propia.
 *
 * 4. **Bindings actuales cubiertos por esta directiva** (base):
 *    - `role`            → `[attr.role]`
 *    - `ariaDescribedBy` → `[attr.aria-describedby]`
 *    - `ariaLabel`       → `[attr.aria-label]`
 *    - `ariaLabelledBy`  → `[attr.aria-labelledby]`
 *    - `ariaInvalid`     → `[attr.aria-invalid]`
 *    - `ariaRequired`    → `[attr.aria-required]`
 *    - `ariaSelected`    → `[attr.aria-selected]`
 *
 * 5. Si añades nuevas propiedades a `AlfAriaBaseInterface`, debes también:
 *    - Añadir el binding correspondiente en el `host` de esta directiva.
 *    - Añadir tests en `aria.spec.ts` (si existe).
 */
@Directive({
  selector: '[alfAria]',
  standalone: true,
  host: {
    '[attr.role]':              'alfAria()?.role              ?? null',
    '[attr.aria-describedby]':  'alfAria()?.ariaDescribedBy  ?? null',
    '[attr.aria-label]':        'alfAria()?.ariaLabel         ?? null',
    '[attr.aria-labelledby]':   'alfAria()?.ariaLabelledBy   ?? null',
    '[attr.aria-invalid]':      'alfAria()?.ariaInvalid       ?? null',
    '[attr.aria-required]':     'alfAria()?.ariaRequired      ?? null',
    '[attr.aria-selected]':     'alfAria()?.ariaSelected      ?? null',
  }
})
export class AlfAriaDirective {
  public readonly alfAria = input<AlfAriaBaseInterface | undefined>(undefined);
}
