import {
  AlfPxEnum,
  AlfRemEnum,
  AlfBorderStyleEnum,
  AlfColorEnum,
  AlfRadiusEnum
} from '../enums';

/**
 * Propiedades de borde y contorno para un estado específico
 */
export interface AlfBorderBaseInterface {
  // ===== BORDER WIDTH =====
  /**
   * Ancho del borde en todos los lados
   * @example AlfPxEnum.Px2 
   */
  borderWidth?: AlfPxEnum | AlfRemEnum;

  /** Ancho del borde superior */
  borderTopWidth?: AlfPxEnum | AlfRemEnum;

  /** Ancho del borde derecho */
  borderRightWidth?: AlfPxEnum | AlfRemEnum;

  /** Ancho del borde inferior */
  borderBottomWidth?: AlfPxEnum | AlfRemEnum;

  /** Ancho del borde izquierdo */
  borderLeftWidth?: AlfPxEnum | AlfRemEnum;

  // ===== BORDER STYLE =====
  /**
   * Estilo del borde en todos los lados
   * @example AlfBorderStyleEnum.Solid 
   */
  borderStyle?: AlfBorderStyleEnum;

  /** Estilo del borde superior */
  borderTopStyle?: AlfBorderStyleEnum;

  /** Estilo del borde derecho */
  borderRightStyle?: AlfBorderStyleEnum;

  /** Estilo del borde inferior */
  borderBottomStyle?: AlfBorderStyleEnum;

  /** Estilo del borde izquierdo */
  borderLeftStyle?: AlfBorderStyleEnum;

  // ===== BORDER COLOR =====
  /** Color del borde en todos los lados */
  borderColor?: AlfColorEnum;

  /** Color del borde superior */
  borderTopColor?: AlfColorEnum;

  /** Color del borde derecho */
  borderRightColor?: AlfColorEnum;

  /** Color del borde inferior */
  borderBottomColor?: AlfColorEnum;

  /** Color del borde izquierdo */
  borderLeftColor?: AlfColorEnum;

  // ===== BORDER RADIUS =====
  /**
   * Radio del borde en todas las esquinas
   * @example AlfRadiusEnum.Md 
   */
  borderRadius?: AlfRadiusEnum | AlfRemEnum;

  /** Radio de la esquina superior izquierda */
  borderTopLeftRadius?: AlfRadiusEnum | AlfRemEnum;

  /** Radio de la esquina superior derecha */
  borderTopRightRadius?: AlfRadiusEnum | AlfRemEnum;

  /** Radio de la esquina inferior derecha */
  borderBottomRightRadius?: AlfRadiusEnum | AlfRemEnum;

  /** Radio de la esquina inferior izquierda */
  borderBottomLeftRadius?: AlfRadiusEnum | AlfRemEnum;

  // ===== OUTLINE (Contorno exterior) =====
  /** 
   * Ancho del contorno (no ocupa espacio en el layout) 
   * @example AlfPxEnum.Px2 
   */
  outlineWidth?: AlfPxEnum | AlfRemEnum;

  /** 
   * Estilo del contorno 
   * @example AlfBorderStyleEnum.Solid 
   */
  outlineStyle?: AlfBorderStyleEnum;

  /** Color del contorno */
  outlineColor?: AlfColorEnum;

  /** 
   * Desplazamiento del contorno respecto al borde 
   * @example AlfPxEnum.Px2 
   */
  outlineOffset?: AlfPxEnum | AlfRemEnum;

  // ===== BOX SIZING =====
  /** 
   * Define cómo se calcula el tamaño del elemento (incluyendo bordes o no) 
   * @example 'border-box' 
   */
  boxSizing?: 'border-box' | 'content-box';

  /** Clase CSS personalizada delegada al elemento */
  customCssClass?: string | string[];

  /** 
   * Estilos CSS en línea personalizados 
   * @example [{ 'border-image': 'none' }] 
   */
  customCssStyle?: Record<string, string>[];
}

/**
 * Interface para estilos de bordes con soporte de estados
 */
export interface AlfBorderInterface {
  /**
   * Estilos base aplicados por defecto al componente.
   */
  default?: AlfBorderBaseInterface;

  /**
   * Estilos aplicados cuando el puntero del usuario está sobre el elemento.
   */
  hover?: AlfBorderBaseInterface;

  /**
   * Estilos aplicados cuando el elemento recibe el foco.
   */
  focus?: AlfBorderBaseInterface;

  /**
   * Estilos aplicados cuando el componente se encuentra en estado deshabilitado.
   */
  disabled?: AlfBorderBaseInterface;

  /**
   * Estilos aplicados cuando el componente está activo (en click).
   */
  active?: AlfBorderBaseInterface;
}
