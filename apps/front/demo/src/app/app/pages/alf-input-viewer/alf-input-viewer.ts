import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { AlfInput } from '@alfcomponents/components/simple/alf-input/alf-input';
import { AlfBorderInterface, AlfBorderBaseInterface } from '@alfcomponents/interfaces';
import { AlfColorEnum, AlfPxEnum, AlfRadiusEnum, AlfBorderStyleEnum, AlfColorVariantEnum, AlfInputColorVariantEnum, AlfInputAdornmentEnum, AlfInputAppearanceEnum, AlfInputTypeEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-input-viewer',
  standalone: true,
  imports: [CommonModule, AlfInput, JsonPipe],
  templateUrl: './alf-input-viewer.html',
  styleUrl: './alf-input-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfInputViewer {
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;
  public readonly AlfInputColorVariantEnum = AlfInputColorVariantEnum;
  public readonly AlfInputAdornmentEnum = AlfInputAdornmentEnum;
  public readonly AlfInputAppearanceEnum = AlfInputAppearanceEnum;
  public readonly AlfInputTypeEnum = AlfInputTypeEnum;

  // Enums for Border Configuration
  public readonly AlfColorEnum = AlfColorEnum;
  public readonly AlfPxEnum = AlfPxEnum;
  public readonly AlfRadiusEnum = AlfRadiusEnum;
  public readonly AlfBorderStyleEnum = AlfBorderStyleEnum;

  protected readonly val0 = signal('');
  protected readonly val1 = signal('Juan Pérez');
  protected readonly val2 = signal('');
  protected readonly val3 = signal('1234');
  protected readonly val4 = signal('secret');
  protected readonly val5 = signal('');


  // Solid Signals
  protected readonly s1 = signal('Juan');
  protected readonly s2 = signal('666777888');
  protected readonly s3 = signal('Hecho');
  protected readonly s4 = signal('Error');
  protected readonly s5 = signal('Cuidado');
  protected readonly s6 = signal('Info');
  protected readonly s7 = signal('Dark Mode');

  // --- Playground Signals (Border Interface) ---
  protected readonly playgroundBorder = signal<AlfBorderInterface>({
    default: { 
      borderWidth: AlfPxEnum.Px2, 
      borderStyle: AlfBorderStyleEnum.Solid, 
      borderColor: AlfColorEnum.Primary, 
      borderRadius: AlfRadiusEnum.Xl 
    },
    hover: { borderColor: AlfColorEnum.Info },
    focus: { borderColor: AlfColorEnum.Danger },
    active: { borderColor: AlfColorEnum.Success },
    disabled: { borderColor: AlfColorEnum.Gray400 }
  });

  /** Actualiza una propiedad específica de un estado del borde */
  public updateBorder(state: keyof AlfBorderInterface, prop: keyof AlfBorderBaseInterface, value: string): void {
    this.playgroundBorder.update(prev => ({
      ...prev,
      [state]: {
        ...(prev[state] || {}),
        [prop]: value as any 
      }
    }));
  }

}