import { AlfColorEnum, AlfPercentageEnum, AlfPxEnum, AlfRemEnum, AlfSpinnerStrokeWidthEnum } from '@alfcomponents/enums';
import { Component, Input, signal, computed } from '@angular/core';

/**
 * @component AlfSpinner
 * @description Componente de spinner de carga reutilizable.
 * Versión Élite: Máxima compatibilidad JIT/Vitest y Rigor Técnico.
 */
@Component({
  selector: 'alf-spinner',
  standalone: true,
  template: `
    @let s = sizeVal();
    @let c = colorVal();
    <svg class="alf-spinner-icon" 
         viewBox="0 0 24 24" 
         [style.width]="s" 
         [style.height]="s"
         [style.color]="c">
      <circle class="alf-spinner-circle" 
              cx="12" 
              cy="12" 
              r="10" 
              fill="none" 
              [attr.stroke]="c || 'currentColor'"
              [attr.stroke-width]="strokeWidthVal()" />
    </svg>
  `,
  styles: [`
    :host {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 60%;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .alf-spinner-icon {
      width: 100%;
      height: 100%;
      animation: spin 1s linear infinite;
      filter: brightness(1.1) drop-shadow(0 0 1px currentColor);
    }
    .alf-spinner-circle {
      stroke: currentColor;
      stroke-dasharray: 45 200;
      stroke-linecap: round;
    }
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
  `],
  host: {
    '[style.width]': 'sizeVal()',
    '[style.height]': 'sizeVal()',
    '[style.color]': 'colorVal()',
  },
})
export class AlfSpinner {
  /**
   * Puente para compatibilidad con Vitest/JIT.
   */
  @Input()
  public set size(value: AlfPxEnum | AlfRemEnum | AlfPercentageEnum | undefined) {
    this._size.set(value);
  }

  @Input()
  public set color(value: AlfColorEnum | undefined) {
    this._color.set(value);
  }

  @Input()
  public set strokeWidth(value: AlfSpinnerStrokeWidthEnum) {
    this._strokeWidth.set(value);
  }

  // Signals internos
  private readonly _size = signal<AlfPxEnum | AlfRemEnum | AlfPercentageEnum | undefined>(undefined);
  private readonly _color = signal<AlfColorEnum | undefined>(undefined);
  private readonly _strokeWidth = signal<AlfSpinnerStrokeWidthEnum>(AlfSpinnerStrokeWidthEnum.Base);

  // Exponemos signals para el componente y tests
  public readonly sizeVal = computed(() => {
    const s = this._size();
    return (s === undefined || s === null) ? null : s.toString();
  });

  public readonly colorVal = this._color.asReadonly();
  public readonly strokeWidthVal = this._strokeWidth.asReadonly();
}

