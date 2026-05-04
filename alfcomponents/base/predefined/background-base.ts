import { AlfBackgroundsBaseInterface } from "@alfcomponents/interfaces";
import { 
  AlfColorEnum, 
  AlfBackgroundAttachmentEnum, 
  AlfBackgroundClipEnum, 
  AlfBackgroundRepeatEnum, 
  AlfBackgroundSizeEnum,
  AlfPositionEnum
} from "@alfcomponents/enums";

/**
 * Configuración base para fondos (Backgrounds).
 * Define un estado neutro y transparente por defecto.
 */
export const defaultBackgroundBase: AlfBackgroundsBaseInterface = {
  backgroundColor: AlfColorEnum.Transparent,
  backgroundImage: 'none',
  backgroundSize: AlfBackgroundSizeEnum.Auto,
  backgroundPosition: AlfPositionEnum.TopLeft,
  backgroundRepeat: AlfBackgroundRepeatEnum.NoRepeat,
  backgroundAttachment: AlfBackgroundAttachmentEnum.Scroll,
  backgroundClip: AlfBackgroundClipEnum.BorderBox
};
