import { AlfColorVariantEnum, AlfCursorEnum } from '@alfcomponents/enums';
import { AlfAnimateCssInterface } from './alf-animations.interface';
import { AlfBackgroundsInterface } from './alf-backgrounds.interface';
import { AlfBorderInterface } from './alf-border.interface';
import { AlfDisplayAndLayoutInterface } from './alf-display-and-layout.interface';
import { AlfMarginInterface } from './alf-margin.interface';
import { AlfOutlineInterface } from './alf-outline.interface';
import { AlfPaddingInterface } from './alf-padding.interface';
import { AlfShadowsInterface } from './alf-shadows.interface';
import { AlfTextStyleInterface } from './alf-text-style.interface';
import { AlfTransformInterface } from './alf-transform.interface';
import { AlfTypographyInterface } from './alf-typography.interface';

/**
 * Propiedades comunes para la configuración de componentes visuales Alfonizer.
 * Sirve como base para el tipado fuerte de configuraciones reactivas.
 */
export interface AlfBaseCommonConfigInterface {
  readonly colorVariant?: AlfColorVariantEnum;
  readonly cursor?: AlfCursorEnum;
  readonly disabled?: boolean;
  readonly backgrounds?: AlfBackgroundsInterface;
  readonly border?: AlfBorderInterface;
  readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
  readonly margin?: AlfMarginInterface;
  readonly outline?: AlfOutlineInterface;
  readonly padding?: AlfPaddingInterface;
  readonly shadows?: AlfShadowsInterface;
  readonly textStyle?: AlfTextStyleInterface;
  readonly transform?: AlfTransformInterface;
  readonly typography?: AlfTypographyInterface;
  readonly animations?: AlfAnimateCssInterface;
  readonly customClass?: string;
  readonly customStyle?: string;
}
