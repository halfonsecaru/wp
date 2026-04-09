import { Component, input, computed } from '@angular/core';
import { 
  AlfColorEnum, 
  AlfSpinnerStrokeWidthEnum,
  AlfPxEnum,
  AlfRemEnum,
  AlfPercentageEnum
} from '../../enums';

/**
 * Componente de spinner de carga reutilizable
 * Se adapta automáticamente al tamaño de su contenedor o escala según parámetros.
 */
@Component({
  selector: 'alf-spinner',
  standalone: true,
  template: `
    @let s = sizeVal();
    @let c = color();
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
              [attr.stroke-width]="strokeWidth()" />
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
    '[style.color]': 'color()',
  },
})
export class AlfSpinner {
  public readonly size = input<AlfPxEnum | AlfRemEnum | AlfPercentageEnum | undefined>(undefined);
  public readonly color = input<AlfColorEnum | undefined>(undefined);
  public readonly strokeWidth = input<AlfSpinnerStrokeWidthEnum>(AlfSpinnerStrokeWidthEnum.Base);

  protected readonly sizeVal = computed(() => {
    const s = this.size();
    if (s === undefined || s === null) return null;
    return s.toString();
  });
}
