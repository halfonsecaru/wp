import { AlfCardConfigInterface } from '../interfaces/alf-card.interface';
import { AlfCardTitleConfigInterface } from '../components/alf-card-title/interfaces/alf-card-title.interface';
import { AlfCardBodyConfigInterface } from '../components/alf-card-body/interfaces/alf-card-body.interface';
import { AlfCardActionsConfigInterface } from '../components/alf-card-actions/interfaces/alf-card-actions.interface';
import {
  AlfColorEnum,
  AlfPxEnum,
  AlfRemEnum,
  AlfBorderStyleEnum,
  AlfRadiusEnum,
  AlfShadowEnum,
  AlfDisplayEnum,
  AlfFlexDirectionEnum,
  AlfOverflowEnum,
  AlfAlignItemsEnum,
  AlfJustifyContentEnum,
} from '@alfcomponents/enums';

/**
 * Configuración por defecto para el componente card.
 */
export const ALF_CARD_DEFAULT: Partial<AlfCardConfigInterface> = {
  disabled: false,
  backgrounds: {
    default: {
      backgroundColor: AlfColorEnum.White,
    },
    disabled: {
      backgroundColor: AlfColorEnum.Gray100,
    }
  },
  border: {
    default: {
      borderWidth: AlfPxEnum.Px1,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderColor: AlfColorEnum.Gray200,
      borderRadius: AlfRadiusEnum.Xl,
    },
    disabled: {
      borderWidth: AlfPxEnum.Px1,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderColor: AlfColorEnum.Gray300,
      borderRadius: AlfRadiusEnum.Xl,
    }
  },
  shadows: {
    default: {
      boxShadow: AlfShadowEnum.Sm,
    }
  },
  displayAndLayout: {
    default: {
      display: AlfDisplayEnum.Flex,
      flexDirection: AlfFlexDirectionEnum.Column,
      overflow: AlfOverflowEnum.Hidden,
    }
  }
};

/**
 * Configuración por defecto para el título de la card.
 */
export const ALF_CARD_TITLE_DEFAULT: Partial<AlfCardTitleConfigInterface> = {
  padding: {
    default: {
      paddingTop: AlfRemEnum.Rem1,
      paddingRight: AlfRemEnum.Rem125,
      paddingBottom: AlfRemEnum.Rem05,
      paddingLeft: AlfRemEnum.Rem125,
    }
  }
};

/**
 * Configuración por defecto para el cuerpo de la card.
 */
export const ALF_CARD_BODY_DEFAULT: Partial<AlfCardBodyConfigInterface> = {
  padding: {
    default: {
      paddingTop: AlfRemEnum.Rem05,
      paddingRight: AlfRemEnum.Rem125,
      paddingBottom: AlfRemEnum.Rem05,
      paddingLeft: AlfRemEnum.Rem125,
    }
  },
  displayAndLayout: {
    default: {
      display: AlfDisplayEnum.Block,
    }
  }
};

/**
 * Configuración por defecto para las acciones de la card.
 */
export const ALF_CARD_ACTIONS_DEFAULT: Partial<AlfCardActionsConfigInterface> = {
  padding: {
    default: {
      paddingTop: AlfRemEnum.Rem075,
      paddingRight: AlfRemEnum.Rem125,
      paddingBottom: AlfRemEnum.Rem1,
      paddingLeft: AlfRemEnum.Rem125,
    }
  },
  border: {
    default: {
      borderTopWidth: AlfPxEnum.Px1,
      borderTopStyle: AlfBorderStyleEnum.Solid,
      borderTopColor: AlfColorEnum.Gray200,
    }
  },
  displayAndLayout: {
    default: {
      display: AlfDisplayEnum.Flex,
      alignItems: AlfAlignItemsEnum.Center,
      justifyContent: AlfJustifyContentEnum.Start,
    }
  }
};
