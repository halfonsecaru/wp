import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlfSwitch } from '@alfcomponents/components/simple/alf-switch/alf-switch';
import { AlfSwitchInterface } from '@alfcomponents/components/simple/alf-switch/interfaces/alf-switch.interface';
import { AlfColorEnum, AlfColorVariantEnum, AlfLabelsPositionEnum, AlfSizeEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-switch-viewer',
  standalone: true,
  imports: [AlfSwitch],
  templateUrl: './alf-switch-viewer.html',
  styleUrl: './alf-switch-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfSwitchViewer {

  // ── Estado reactivo de los ejemplos ───────────────────────────────────────

  public readonly checkedElegant = signal<boolean>(true);
  public readonly checkedStandard = signal<boolean>(false);
  public readonly checkedBasic = signal<boolean>(false);
  public readonly checkedLabelBefore = signal<boolean>(false);
  public readonly checkedWithHelper = signal<boolean>(false);
  public readonly checkedWithError = signal<boolean>(false);

  public readonly checkedXS = signal<boolean>(false);
  public readonly checkedSM = signal<boolean>(false);
  public readonly checkedMD = signal<boolean>(false);
  public readonly checkedLG = signal<boolean>(false);
  public readonly checkedXL = signal<boolean>(false);

  public readonly checkedGreen = signal<boolean>(false);
  public readonly checkedRed = signal<boolean>(false);

  public readonly checkedPrimary = signal<boolean>(true);
  public readonly checkedSecondary = signal<boolean>(false);
  public readonly checkedSuccess = signal<boolean>(false);
  public readonly checkedDanger = signal<boolean>(false);
  public readonly checkedWarning = signal<boolean>(false);
  public readonly checkedInfo = signal<boolean>(false);
  public readonly checkedLight = signal<boolean>(false);
  public readonly checkedDark = signal<boolean>(false);

  public readonly checkedShadowSoft = signal<boolean>(false);
  public readonly checkedShadowGlow = signal<boolean>(false);
  public readonly checkedShadowNeon = signal<boolean>(false);

  // ── Configuraciones de ejemplo ────────────────────────────────────────────

  public readonly configBasic: AlfSwitchInterface = {
    labelText: 'Switch básico',
  };

  public readonly configElegant: AlfSwitchInterface = {
    switchStyle: 'elegant',
    labelText: 'Estilo elegant',
    checkedColor: AlfColorEnum.Primary,
    uncheckedColor: AlfColorEnum.Gray400,
    thumbColor: AlfColorEnum.White,
  };

  public readonly configStandard: AlfSwitchInterface = {
    switchStyle: 'standard',
    labelText: 'Estilo standard',
    checkedColor: AlfColorEnum.Primary,
  };

  public readonly configLabelBefore: AlfSwitchInterface = {
    labelText: 'Label a la izquierda',
    labelPosition: AlfLabelsPositionEnum.Before,
  };

  public readonly configWithHelper: AlfSwitchInterface = {
    labelText: 'Notificaciones push',
    helperText: 'Recibirás alertas en tiempo real',
  };

  public readonly configWithError: AlfSwitchInterface = {
    labelText: 'Campo obligatorio',
    error: 'Este campo es obligatorio',
  };

  public readonly configXS: AlfSwitchInterface = { labelText: 'XS', size: AlfSizeEnum.XS };
  public readonly configSM: AlfSwitchInterface = { labelText: 'SM', size: AlfSizeEnum.SM };
  public readonly configMD: AlfSwitchInterface = { labelText: 'MD', size: AlfSizeEnum.MD };
  public readonly configLG: AlfSwitchInterface = { labelText: 'LG', size: AlfSizeEnum.LG };
  public readonly configXL: AlfSwitchInterface = { labelText: 'XL', size: AlfSizeEnum.XL };

  public readonly configGreen: AlfSwitchInterface = {
    labelText: 'Verde cuando activo',
    checkedColor: AlfColorEnum.Green500,
    uncheckedColor: AlfColorEnum.Gray300,
  };

  public readonly configRed: AlfSwitchInterface = {
    labelText: 'Rojo cuando activo',
    checkedColor: AlfColorEnum.Red500,
  };

  public readonly configPrimary: AlfSwitchInterface = {
    labelText: 'Primary',
    colorVariant: AlfColorVariantEnum.Primary,
  };

  public readonly configSecondary: AlfSwitchInterface = {
    labelText: 'Secondary',
    colorVariant: AlfColorVariantEnum.Secondary,
  };

  public readonly configSuccess: AlfSwitchInterface = {
    labelText: 'Success',
    colorVariant: AlfColorVariantEnum.Success,
  };

  public readonly configDanger: AlfSwitchInterface = {
    labelText: 'Danger',
    colorVariant: AlfColorVariantEnum.Danger,
  };

  public readonly configWarning: AlfSwitchInterface = {
    labelText: 'Warning',
    colorVariant: AlfColorVariantEnum.Warning,
  };

  public readonly configInfo: AlfSwitchInterface = {
    labelText: 'Info',
    colorVariant: AlfColorVariantEnum.Info,
  };

  public readonly configLight: AlfSwitchInterface = {
    labelText: 'Light',
    colorVariant: AlfColorVariantEnum.Light,
  };

  public readonly configDark: AlfSwitchInterface = {
    labelText: 'Dark',
    colorVariant: AlfColorVariantEnum.Dark,
  };
}
