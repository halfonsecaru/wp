import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlfSwitch } from '@alfcomponents/components/simple/alf-switch/alf-switch';

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

  public readonly checkedGreen = signal<boolean>(true);
  public readonly checkedRed = signal<boolean>(true);

  public readonly checkedPrimary = signal<boolean>(true);
  public readonly checkedSecondary = signal<boolean>(true);
  public readonly checkedSuccess = signal<boolean>(true);
  public readonly checkedDanger = signal<boolean>(true);
  public readonly checkedWarning = signal<boolean>(true);
  public readonly checkedInfo = signal<boolean>(true);
  public readonly checkedLight = signal<boolean>(true);
  public readonly checkedDark = signal<boolean>(true);

  public readonly checkedShadowSoft = signal<boolean>(false);
  public readonly checkedShadowGlow = signal<boolean>(false);
  public readonly checkedShadowNeon = signal<boolean>(false);
  public readonly checkedShadowRetro = signal<boolean>(false);
}
