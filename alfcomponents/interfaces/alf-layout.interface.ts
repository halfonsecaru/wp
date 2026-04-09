import {
  AlfPxEnum,
  AlfRemEnum,
  AlfPercentageEnum,
  AlfDisplayEnum,
  AlfOverflowEnum,
  AlfVisibilityEnum,
  AlfZIndexEnum,
  AlfCssPositionEnum
} from '../enums';

/**
 * Propiedades de diseño y dimensiones para un estado específico
 */
export interface AlfLayoutBaseInterface {
  // ===== DISPLAY & VISIBILITY =====
  /** 
   * Modelo de visualización CSS 
   * @example AlfDisplayEnum.Flex 
   */
  display?: AlfDisplayEnum;

  /** 
   * Visibilidad del elemento 
   * @example AlfVisibilityEnum.Visible 
   */
  visibility?: AlfVisibilityEnum;

  /** 
   * Control de desbordamiento general 
   * @example AlfOverflowEnum.Auto 
   */
  overflow?: AlfOverflowEnum;

  /** Control de desbordamiento horizontal */
  overflowX?: AlfOverflowEnum;

  /** Control de desbordamiento vertical */
  overflowY?: AlfOverflowEnum;

  // ===== DIMENSIONS (Width) =====
  /** 
   * Ancho del elemento 
   * @example AlfPxEnum.Px320 | AlfPercentageEnum.Full 
   */
  width?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Ancho mínimo */
  minWidth?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Ancho máximo */
  maxWidth?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  // ===== DIMENSIONS (Height) =====
  /** 
   * Altura del elemento 
   * @example AlfRemEnum.Rem10 | AlfPercentageEnum.Percent50 
   */
  height?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Altura mínima */
  minHeight?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Altura máxima */
  maxHeight?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  // ===== SPACING (Padding) =====
  /** Padding en todos los lados */
  padding?: AlfPxEnum | AlfRemEnum;
  /** Padding superior */
  paddingTop?: AlfPxEnum | AlfRemEnum;
  /** Padding derecho */
  paddingRight?: AlfPxEnum | AlfRemEnum;
  /** Padding inferior */
  paddingBottom?: AlfPxEnum | AlfRemEnum;
  /** Padding izquierdo */
  paddingLeft?: AlfPxEnum | AlfRemEnum;

  // ===== SPACING (Margin) =====
  /** Margen en todos los lados */
  margin?: AlfPxEnum | AlfRemEnum | 'auto';
  /** Margen superior */
  marginTop?: AlfPxEnum | AlfRemEnum | 'auto';
  /** Margen derecho */
  marginRight?: AlfPxEnum | AlfRemEnum | 'auto';
  /** Margen inferior */
  marginBottom?: AlfPxEnum | AlfRemEnum | 'auto';
  /** Margen izquierdo */
  marginLeft?: AlfPxEnum | AlfRemEnum | 'auto';

  // ===== POSITIONING =====
  /** 
   * Tipo de posicionamiento 
   * @example AlfCssPositionEnum.Absolute 
   */
  position?: AlfCssPositionEnum;

  /** Nivel de profundidad @example AlfZIndexEnum.Overlay */
  zIndex?: AlfZIndexEnum;

  /** Distancia superior (top) */
  top?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;
  /** Distancia derecha (right) */
  right?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;
  /** Distancia inferior (bottom) */
  bottom?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;
  /** Distancia izquierda (left) */
  left?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  // ===== CUSTOM =====
  /** Clase CSS personalizada delegada al elemento */
  customCssClass?: string | string[];

  /** Estilos CSS en línea personalizados @example [{ 'aspect-ratio': '1/1' }] */
  customCssStyle?: Record<string, string>[];
}

/**
 * Interface para diseño y dimensiones con soporte de estados
 */
export interface AlfLayoutInterface {
  /** Estilos base aplicados por defecto al componente */
  default?: AlfLayoutBaseInterface;

  /** Estilos aplicados en hover */
  hover?: AlfLayoutBaseInterface;

  /** Estilos aplicados cuando recibe el foco */
  focus?: AlfLayoutBaseInterface;

  /** Estilos aplicados en estado deshabilitado */
  disabled?: AlfLayoutBaseInterface;
}
