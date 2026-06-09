import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Base } from '@alfcomponents/components';
import { AlfBackgroundsInterface, AlfBorderInterface } from '@alfcomponents/interfaces';
import {
  AlfColorEnum,
  AlfPxEnum,
  AlfBorderStyleEnum,
  AlfRadiusEnum,
} from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-base-viewer',
  standalone: true,
  imports: [Base],
  templateUrl: './alf-base-viewer.html',
  styleUrl: './alf-base-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfBaseViewer {
  public readonly demoBg: AlfBackgroundsInterface = {
    default: { backgroundColor: AlfColorEnum.Gray850 },
    hover:   { backgroundColor: AlfColorEnum.Gray800 }
  };

  public readonly demoBorder: AlfBorderInterface = {
    default: {
      borderWidth:  AlfPxEnum.Px1,
      borderStyle:  AlfBorderStyleEnum.Solid,
      borderColor:  AlfColorEnum.Gray700,
      borderRadius: AlfRadiusEnum.Lg
    },
    hover: { borderColor: AlfColorEnum.Fuchsia400 }
  };

  // customClass: clase extra definida en el SCSS del consumidor
  public readonly extraClass = 'mi-clase-personalizada';

  // customStyle: estilos inline como string CSS
  public readonly extraStyle = 'outline: 2px dashed #a78bfa; outline-offset: 4px;';
}
