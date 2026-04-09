import { IconTypeEnum } from './icon-types';
import { FontSizeEnum } from './font-size.enum';
import { UnicodeEnum } from './unicode.enum';

export interface IconInterface {
  name: UnicodeEnum;
  type: IconTypeEnum;
  value: string;
  fontSize: FontSizeEnum;
  routerLink?: string;
  text?: string;
}