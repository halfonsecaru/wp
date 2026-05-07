import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AlfInput } from '@alfcomponents/components/simple/alf-input/alf-input';
import { AlfInputInterface } from '@alfcomponents/components/simple/alf-input/interfaces/alf-input.interface';
import { AlfColorVariantEnum, AlfInputAdornmentEnum, AlfInputAppearanceEnum, AlfInputTypeEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-input-viewer',
  standalone: true,
  imports: [AlfInput],
  templateUrl: './alf-input-viewer.html',
  styleUrl: './alf-input-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfInputViewer {
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;
  public readonly AlfInputAdornmentEnum = AlfInputAdornmentEnum;
  public readonly AlfInputAppearanceEnum = AlfInputAppearanceEnum;
  public readonly AlfInputTypeEnum = AlfInputTypeEnum;

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
  protected readonly s8 = signal('Light Mode');

}