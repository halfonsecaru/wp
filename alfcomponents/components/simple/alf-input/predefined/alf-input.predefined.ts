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
} from '@alfcomponents/enums';
import { resolveVariantDefinitions } from '@alfcomponents/base/variantes/main-variants-selection';
import { AlfInputInterface } from '../interfaces/alf-input.interface';

/**
 * Configuración base por defecto para el componente alf-input.
 * Centraliza paddings, radios y comportamientos reactivos.
 */
export const ALF_INPUT_DEFAULT: AlfInputInterface = {
  cursor: AlfCursorEnum.Text,
  appearance: AlfInputAppearanceEnum.Outline,
  // displayAndLayout: {
    // default: {
    //   display: AlfDisplayEnum.Flex,
    //   position: AlfCssPositionEnum.Relative,
    //   alignItems: AlfAlignItemsEnum.Center,
    //   minHeight: AlfRemEnum.Rem35,
    //   overflow: AlfOverflowEnum.Visible,
    //   overflowX: AlfOverflowEnum.Visible,
    //   overflowY: AlfOverflowEnum.Visible
    // },
  //   disabled: {
  //     opacity: AlfOpacityEnum.Opacity55,
  //     pointerEvents: AlfPointerEventsEnum.None
  //   }
  // },
  // padding: {
  //   default: { paddingLeft: AlfRemEnum.Rem075, paddingRight: AlfRemEnum.Rem075 },
  //   hover:   { paddingLeft: AlfRemEnum.Rem075, paddingRight: AlfRemEnum.Rem075 },
  //   focus:   { paddingLeft: AlfRemEnum.Rem075, paddingRight: AlfRemEnum.Rem075 },
  //   active:  { paddingLeft: AlfRemEnum.Rem075, paddingRight: AlfRemEnum.Rem075 },
  //   disabled:{ paddingLeft: AlfRemEnum.Rem075, paddingRight: AlfRemEnum.Rem075 }
  // },
  // border: {
  //   default:  { borderRadius: AlfRadiusEnum.Md },
  //   hover:    { borderRadius: AlfRadiusEnum.Md },
  //   focus:    { borderRadius: AlfRadiusEnum.Md },
  //   active:   { borderRadius: AlfRadiusEnum.Md },
  //   disabled: { borderRadius: AlfRadiusEnum.Md }
  // },
  // backgrounds: {
  //   default: { backgroundColor: AlfColorEnum.Transparent },
  //   hover: { backgroundColor: AlfColorEnum.Transparent },
  //   active: { backgroundColor: AlfColorEnum.Transparent },
  //   focus: { backgroundColor: AlfColorEnum.Transparent },
  //   disabled: { backgroundColor: AlfColorEnum.Transparent }
  // },
  customStyle: `
    --alf-inp-label-color: var(--alf-inp-text-color, revert);
    --alf-inp-label-float-scale: 0.75;
    --alf-inp-label-top: 50%;
    --alf-inp-label-float-top: 0.375rem;
    --alf-inp-content-inline-start: var(--alf-inp-padding-left, var(--alf-inp-padding-x, 0.75rem));
    --alf-inp-prefix-width: 2.25rem;
    --alf-inp-prefix-font-size: var(--alf-inp-typography-font-size, 1rem);
  `
};

/**
 * Factory Élite para Inputs.
 * Resuelve la variante y aplica el "blindaje" estático y de transparencia.
 */
export const getAlfInputDefaultConfig = (
  variant: AlfColorVariantEnum = AlfColorVariantEnum.Default,
  appearance: AlfInputAppearanceEnum = AlfInputAppearanceEnum.Outline
): AlfInputInterface => {
  return ;
  const visualBase = resolveVariantDefinitions(variant);
  
  // Determinamos si es Outline (ya sea por enum explícito o por nombre de variante)
  const isOutline = appearance === AlfInputAppearanceEnum.Outline || 
                    (appearance === undefined && (
                      variant.toString().toLowerCase().includes('outline') || 
                      variant.toString().toLowerCase().includes('ghost') ||
                      variant === AlfColorVariantEnum.Default
                    ));

  const isFill = appearance === AlfInputAppearanceEnum.Fill;
  const isStandard = appearance === AlfInputAppearanceEnum.Standard;

  return {
    ...visualBase,
    ...ALF_INPUT_DEFAULT,
    colorVariant: variant,
    appearance: appearance,
    
    // 1. GESTIÓN DE FONDOS
    backgrounds: {
      ...visualBase.backgrounds,
      ...(isOutline || isStandard ? {
        default: { ...visualBase.backgrounds?.default, backgroundColor: AlfColorEnum.Transparent },
        hover: { ...visualBase.backgrounds?.hover, backgroundColor: AlfColorEnum.Transparent },
        active: { ...visualBase.backgrounds?.active, backgroundColor: AlfColorEnum.Transparent },
        focus: { ...visualBase.backgrounds?.focus, backgroundColor: AlfColorEnum.Transparent },
        disabled: { ...visualBase.backgrounds?.disabled, backgroundColor: AlfColorEnum.Transparent }
      } : isFill ? {
        // En Fill usamos un fondo sutil si no viene uno definido
        default: { backgroundColor: AlfColorEnum.Gray100, ...visualBase.backgrounds?.default },
        hover: { backgroundColor: AlfColorEnum.Gray200, ...visualBase.backgrounds?.hover },
      } : {})
    },

    // 2. GESTIÓN DE BORDES Y RADIOS
    border: {
      ...visualBase.border,
      default:  { 
        ...visualBase.border?.default,
        ...(isStandard ? {
          borderWidth: AlfPxEnum.None,
          borderBottomWidth: AlfPxEnum.Px1,
          borderBottomStyle: AlfBorderStyleEnum.Solid,
          borderBottomColor: visualBase.border?.default?.borderColor ?? AlfColorEnum.Gray400,
          borderRadius: AlfRadiusEnum.None
        } : isFill ? {
          borderWidth: AlfPxEnum.None,
          borderBottomWidth: AlfPxEnum.Px1,
          borderBottomStyle: AlfBorderStyleEnum.Solid,
          borderBottomColor: visualBase.border?.default?.borderColor ?? AlfColorEnum.Gray400,
          borderTopLeftRadius: AlfRadiusEnum.Md,
          borderTopRightRadius: AlfRadiusEnum.Md,
          borderBottomLeftRadius: AlfRadiusEnum.None,
          borderBottomRightRadius: AlfRadiusEnum.None,
        } : {
          ...ALF_INPUT_DEFAULT.border?.default
        })
      },
      hover: { 
        ...visualBase.border?.hover,
        ...(isStandard || isFill ? {
          borderBottomWidth: AlfPxEnum.Px2,
        } : {
          ...ALF_INPUT_DEFAULT.border?.hover
        })
      },
      focus: {
        ...visualBase.border?.focus,
        borderColor: visualBase.typography?.default?.color ?? visualBase.border?.default?.borderColor,
        ...(isStandard || isFill ? {
          borderBottomWidth: AlfPxEnum.Px2,
          borderBottomColor: visualBase.typography?.default?.color ?? AlfColorEnum.Primary
        } : {
          ...ALF_INPUT_DEFAULT.border?.focus
        })
      },
      disabled: { ...visualBase.border?.disabled, ...ALF_INPUT_DEFAULT.border?.disabled },
    },

    // 3. GESTIÓN DE PADDING
    padding: {
      ...visualBase.padding,
      ...ALF_INPUT_DEFAULT.padding,
      ...(isStandard ? {
        default: { paddingLeft: AlfPxEnum.None, paddingRight: AlfPxEnum.None },
        hover: { paddingLeft: AlfPxEnum.None, paddingRight: AlfPxEnum.None },
        focus: { paddingLeft: AlfPxEnum.None, paddingRight: AlfPxEnum.None },
      } : {})
    },

    // 4. GESTIÓN DE LAYOUT
    displayAndLayout: {
      ...visualBase.displayAndLayout,
      ...ALF_INPUT_DEFAULT.displayAndLayout,
      default: {
        ...visualBase.displayAndLayout?.default,
        ...ALF_INPUT_DEFAULT.displayAndLayout?.default,
        display: isOutline ? AlfDisplayEnum.Block : AlfDisplayEnum.Flex
      }
    }
  };
};
