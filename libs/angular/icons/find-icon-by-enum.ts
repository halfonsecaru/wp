import { IconInterface } from './icon.interface';
import { iconsUnicode } from './icons-unicode';
import { iconsSvg } from './icons-svg';
import { UnicodeEnum } from './unicode.enum';

export const findIconByEnum = (name: UnicodeEnum): IconInterface | undefined => {
  return [...iconsUnicode, ...iconsSvg].find(icon => icon.name === name);
};