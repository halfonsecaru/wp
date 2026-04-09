import { ColorsEnum } from '../enums/colors.enum';
import { FontFamiliEnum } from '../enums/fontFamili.enum';
import { WidthOptionsEnum } from '../enums/widthOptions.enum';
import { IconInterface } from '../icons/icon.interface';


export interface MainMenuInterface {
  text: string;
  id: number;
  routerLink?: string;
  unicode?: IconInterface;
  subMenu?: MainMenuInterface[];
  position?: number;
  fontDefaultColor?: ColorsEnum;
  fontOffColor?: ColorsEnum;
  fontOnColor?: ColorsEnum;
  HoverOffColor?: ColorsEnum;
  HoverOnColor?: ColorsEnum;
  fontColor?: ColorsEnum;
  inconWidth?: WidthOptionsEnum;
  fontFamili?: FontFamiliEnum;
  roles: string[]; // Usar string[] para roles, puedes cambiarlo por un enum si lo prefieres
}
