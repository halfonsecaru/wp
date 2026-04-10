import { AlfButtonConfig } from '../interfaces/alf-button.interface';
import { AlfColorVariantEnum, AlfSizeEnum } from '../../../../enums';

/**
 * Predefined Elite Buttons
 * Una colección de configuraciones comunes para usar con AlfButton.
 */
export const AlfDefaultButtons = {
  ACCEPT: (): AlfButtonConfig => ({
    label: 'Aceptar',
    variant: AlfColorVariantEnum.GradientPrimary,
    size: AlfSizeEnum.Medium,
    id: 'btn-accept'
  }),
  CANCEL: (): AlfButtonConfig => ({
    label: 'Cancelar',
    variant: AlfColorVariantEnum.Light,
    size: AlfSizeEnum.Medium,
    id: 'btn-cancel'
  }),
  DANGER: (): AlfButtonConfig => ({
    label: 'Eliminar',
    variant: AlfColorVariantEnum.GradientDanger,
    size: AlfSizeEnum.Medium,
    id: 'btn-delete'
  }),
  SEND: (): AlfButtonConfig => ({
    label: 'Enviar',
    variant: AlfColorVariantEnum.Primary,
    size: AlfSizeEnum.Medium,
    id: 'btn-send'
  })
} as const;
