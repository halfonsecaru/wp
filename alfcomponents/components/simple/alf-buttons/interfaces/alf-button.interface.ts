import { 
  AlfButtonTypeEnum, 
  AlfColorVariantEnum,
  AlfIconsUnicodeIconEnum 
} from "@alfcomponents/enums";
import { 
  AlfBackgroundsInterface, 
  AlfBorderInterface, 
  AlfDisplayAndLayoutInterface, 
  AlfMarginInterface, 
  AlfPaddingInterface, 
  AlfShadowsInterface, 
  AlfTextStyleInterface, 
  AlfTypographyInterface, 
  AlfAnimateCssInterface,
  AlfRippleInterface 
} from "@alfcomponents/interfaces";

export interface ButtonLink {
  url: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

export interface AlfButtonInterface {
  readonly id?: string;
  readonly label?: string;
  readonly type?: AlfButtonTypeEnum;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly colorVariant?: AlfColorVariantEnum;
  readonly link?: ButtonLink;
  readonly debounceTime?: number;
  
  // Iconos
  readonly iconLeft?: string | AlfIconsUnicodeIconEnum;
  readonly iconRight?: string | AlfIconsUnicodeIconEnum;
  
  // Overrides visuales
  readonly backgrounds?: AlfBackgroundsInterface;
  readonly border?: AlfBorderInterface;
  readonly margin?: AlfMarginInterface;
  readonly padding?: AlfPaddingInterface;
  readonly shadows?: AlfShadowsInterface;
  readonly textStyle?: AlfTextStyleInterface;
  readonly typography?: AlfTypographyInterface;
  readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
  readonly animations?: AlfAnimateCssInterface;
  readonly ripple?: boolean | AlfRippleInterface;
}
