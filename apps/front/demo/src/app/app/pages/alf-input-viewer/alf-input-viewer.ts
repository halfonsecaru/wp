import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlfInput } from '@alfcomponents/components';
import { AlfColorVariantEnum, AlfInputAppearanceEnum } from '@alfcomponents/enums';

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
  public readonly AlfInputAppearanceEnum = AlfInputAppearanceEnum;

  public readonly valOutline = signal<string>('');
  public readonly valFill = signal<string>('');
  public readonly valStandard = signal<string>('');
  
  public readonly valPassword = signal<string>('');
  public readonly valEmail = signal<string>('');

  public readonly valDisabled = signal<string>('No se puede editar');
  public readonly valReadonly = signal<string>('Solo lectura');

  public readonly valHelper = signal<string>('');
  public readonly valError = signal<string>('usuario_invalido!');

  public readonly solidVariants: readonly AlfColorVariantEnum[] = [
    AlfColorVariantEnum.Primary,
    AlfColorVariantEnum.Secondary,
    AlfColorVariantEnum.Success,
    AlfColorVariantEnum.Danger,
    AlfColorVariantEnum.Warning,
    AlfColorVariantEnum.Info,
    AlfColorVariantEnum.Dark,
    AlfColorVariantEnum.Light
  ];

  private readonly valueStates: Map<string, any> = new Map<string, any>();

  public readonly getValue = (style: string, variant: string): any => {
    const key = `${style}-${variant}`;
    if (!this.valueStates.has(key)) {
      this.valueStates.set(key, signal(''));
    }
    return this.valueStates.get(key);
  };
}
