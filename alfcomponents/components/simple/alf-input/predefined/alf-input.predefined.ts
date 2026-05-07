import {
  AlfColorVariantEnum,
  AlfColorEnum,
  AlfDisplayEnum,
  AlfOverflowEnum,
  AlfCssPositionEnum,
  AlfAlignItemsEnum,
  AlfRemEnum,
  AlfOpacityEnum,
  AlfPointerEventsEnum,
  AlfRadiusEnum,
  AlfCursorEnum,
  AlfInputAppearanceEnum,
  AlfPxEnum,
  AlfBorderStyleEnum,
  AlfPercentageEnum,
} from '@alfcomponents/enums';
import { resolveVariantDefinitions } from '@alfcomponents/base/variantes/main-variants-selection';
import { AlfInputInterface } from '../interfaces/alf-input.interface';
import { buildBorderColor, buildBackgroundColor, buildSoftBackgroundColor } from '@alfcomponents/base';
import { AlfBackgroundsInterface, AlfBorderInterface } from '@alfcomponents/interfaces';

/**
 * Configuración base por defecto para el componente alf-input.
 * Centraliza paddings, radios y comportamientos reactivos.
 */
export const ALF_INPUT_DEFAULT: AlfInputInterface = {
  cursor: AlfCursorEnum.Text,
  // Solo paddings horizontales. La altura se controla por minHeight.
  displayAndLayout: {
    default: {
      display: AlfDisplayEnum.Flex,
      width: AlfPercentageEnum.Full,
      height: AlfPxEnum.Px50,
      position: AlfCssPositionEnum.Relative,
      alignItems: AlfAlignItemsEnum.Center,
      overflow: AlfOverflowEnum.Visible,
    },
  }
};

/**
 * 1
 * Factory Élite para Inputs.
 * Resuelve la variante y aplica la apariencia solicitada.
 */
export const getAlfInputDefaultConfig = (
  variant: AlfColorVariantEnum = AlfColorVariantEnum.Default,
  appearance: AlfInputAppearanceEnum = AlfInputAppearanceEnum.Outline
): AlfInputInterface => {

  const isStandard = appearance === AlfInputAppearanceEnum.Standard;
  const isFill = appearance === AlfInputAppearanceEnum.Fill;


  const defaultConfig = buildAppearanceConfiguration(variant, appearance);

  return {
    ...defaultConfig
  }
};


/**
 * 2
 * Genera la configuración unificada para cualquier apariencia de AlfInput.
 * Esto reduce masivamente el código duplicado y centraliza la lógica visual.
 */
const buildAppearanceConfiguration = (
  variant: AlfColorVariantEnum,
  appearance: AlfInputAppearanceEnum
): AlfInputInterface => {

  const isFill = appearance === AlfInputAppearanceEnum.Fill;
  const isStandard = appearance === AlfInputAppearanceEnum.Standard;

  return {
    ...ALF_INPUT_DEFAULT,

    displayAndLayout: (isFill || isStandard) ? {
      default: { ...ALF_INPUT_DEFAULT.displayAndLayout?.default, alignItems: AlfAlignItemsEnum.End },
      hover: { ...ALF_INPUT_DEFAULT.displayAndLayout?.hover, alignItems: AlfAlignItemsEnum.End },
      focus: { ...ALF_INPUT_DEFAULT.displayAndLayout?.focus, alignItems: AlfAlignItemsEnum.End },
      active: { ...ALF_INPUT_DEFAULT.displayAndLayout?.active, alignItems: AlfAlignItemsEnum.End },
      disabled: { ...ALF_INPUT_DEFAULT.displayAndLayout?.disabled, alignItems: AlfAlignItemsEnum.End },
    } : ALF_INPUT_DEFAULT.displayAndLayout,

    backgrounds: { ...generateBackgrounds(isStandard, isFill, variant) },
    border: { ...generateBorders(isStandard, isFill, variant) },
    customStyle: (isFill || isStandard)
      ? '--alf-inner-align: flex-end; --alf-inner-pb: 5px; --alf-label-top: 70%; --alf-label-float-top: 12px; --alf-label-float-left: 1rem;'
      : '--alf-inner-align: center;'
  };
};

// DEFAULT DEFINITIONS INITIALIZERS

const generateBackgrounds = (isStandard: boolean, isFill: boolean, variant: AlfColorVariantEnum) => {

  if (isStandard) {
    return {
      default: { backgroundColor: AlfColorEnum.Transparent },
      hover: { backgroundColor: AlfColorEnum.Transparent },
      focus: { backgroundColor: AlfColorEnum.Transparent },
      active: { backgroundColor: AlfColorEnum.Transparent },
      disabled: { backgroundColor: AlfColorEnum.Transparent },
    }
  }

  return buildSoftBackgroundColor(variant);
}

const generateBorders = (isStandard: boolean, isFill: boolean, variant: AlfColorVariantEnum) => {
  const isOutline = !isStandard && !isFill;

  // 1. Geometría base por apariencia
  const geometryBase = (isStandard || isFill) ? {
    borderWidth: AlfPxEnum.None,
    borderTopWidth: AlfPxEnum.None,
    borderLeftWidth: AlfPxEnum.None,
    borderRightWidth: AlfPxEnum.None,
    borderBottomWidth: AlfPxEnum.Px015,
    borderRadius: AlfRadiusEnum.None,
    borderTopLeftRadius: AlfRadiusEnum.None,
    borderTopRightRadius: AlfRadiusEnum.None,
    borderBottomLeftRadius: AlfRadiusEnum.None,
    borderBottomRightRadius: AlfRadiusEnum.None,
  } : {
    borderWidth: AlfPxEnum.Px015,
    borderRadius: AlfRadiusEnum.Lg,
  };

  // 2. Cargamos los colores de la variante
  let borderColorDefined: AlfBorderInterface = buildBorderColor(variant);

  // 3. Cruzamos colores con geometría y estados reactivos
  borderColorDefined = {
    ...borderColorDefined,
    default: {
      ...borderColorDefined.default,
      ...geometryBase
    },
    hover: {
      ...borderColorDefined.hover,
      ...geometryBase,
      ...((isStandard || isFill) ? { borderBottomWidth: AlfPxEnum.Px015 } : {})
    },
    focus: {
      ...borderColorDefined.focus,
      ...geometryBase,
      ...((isStandard || isFill) ? { borderBottomWidth: AlfPxEnum.Px015 } : {})
    },
    active: {
      ...borderColorDefined.active,
      ...geometryBase,
      ...((isStandard || isFill) ? { borderBottomWidth: AlfPxEnum.Px015 } : {})
    },
    disabled: {
      ...borderColorDefined.disabled,
      ...geometryBase,
    }
  };

  return borderColorDefined;
}
