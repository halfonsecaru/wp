import { AlfColorEnum, AlfPercentageEnum, AlfPxEnum, AlfRemEnum, AlfSpinnerStrokeWidthEnum } from '@alfcomponents/enums';
import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

/**
 * @component AlfSpinner
 * @description Componente de spinner de carga reutilizable.
 * Versión Élite: Máxima compatibilidad JIT/Vitest y Rigor Técnico.
 */
@Component({
  selector: 'alf-spinner',
  standalone: true,
  templateUrl: './alf-spinner.html',
  styleUrl: './alf-spinner.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    '[style.width]': 'sizeVal()',
    '[style.height]': 'sizeVal()',
    '[style.color]': 'colorVal()',
  },
})
export class AlfSpinner {
  public readonly size = input<AlfPxEnum | AlfRemEnum | AlfPercentageEnum | string | undefined>(undefined);
  public readonly color = input<AlfColorEnum | string | undefined>(undefined);
  public readonly strokeWidth = input<AlfSpinnerStrokeWidthEnum | string | number>(AlfSpinnerStrokeWidthEnum.Base);

  // Exponemos signals para el componente y tests
  public readonly sizeVal = computed(() => {
    const s = this.size();
    return s === undefined || s === null ? null : s.toString();
  });

  public readonly colorVal = this.color;
  public readonly strokeWidthVal = this.strokeWidth;
}
