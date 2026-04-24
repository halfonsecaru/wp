import { AlfBaseInterface, AlfAnimateCssInterface } from '@alfcomponents/interfaces';
import { AlfTabsPositionEnum, AlfTabsVisualTypeEnum } from '../enums/alf-tabs-visual-type.enum';
import { AlfAnimationTypeEnum, AlfColorEnum, AlfButtonVisualTypeEnum, AlfColorVariantEnum } from '@alfcomponents/enums';
import { AlfButtonInterface } from '../../../simple/alf-button/interfaces/alf-button.interface';

/**
 * AlfTabInterface
 * Define la configuración de una pestaña individual (Cabecera).
 */
export interface AlfTabInterface extends AlfBaseInterface {
  /** Identificador único para vincular con AlfTabContent (opcional, si no se usa orden) */
  id?: string;
  
  /** Texto legible de la pestaña */
  label: string;

  /** Jerarquía visual del botón (Solid, Ghost, Text, etc.) */
  visualType?: AlfButtonVisualTypeEnum;
  
  /** Habilitar efecto ripple (por defecto true) */
  ripple?: boolean;
  
  /** Estilos y clases personalizadas para el botón */
  customStyle?: Record<string, string>;
  customClass?: string | string[];

  /** Configuración predefinida de variante si aplica */
  predefined?: AlfColorVariantEnum;

  /** Configuración de identidad de botón específica para esta pestaña (Override local) */
  tabConfiguration?: AlfButtonInterface;

  /** Color personalizado para el efecto ripple */
  rippleColor?: AlfColorEnum;
  
  /** Icono o texto a mostrar antes del label */
  prefix?: string;
  
  /** Icono o texto a mostrar después del label */
  suffix?: string;
  
  /** Pequeño indicador numérico o de texto sobre la pestaña */
  badge?: string | number;
  
  /** Estado de interacción */
  disabled?: boolean;
  
  /** Control de renderizado/visibilidad */
  hidden?: boolean;

  /** Configuración de animación Animate.css para su panel asociado */
  animations?: AlfAnimateCssInterface;
}

/**
 * AlfTabContentInterface
 * Define la configuración del área de contenido/panel.
 */
export interface AlfTabContentInterface extends AlfBaseInterface {
  /** Identificador único para vincular con AlfTab (opcional) */
  id?: string;
  
  /** Controla si el contenido se renderiza de forma diferida (lazy) */
  lazy?: boolean;
  
  /** Índice de tabulación para accesibilidad (default: "0") */
  tabIndex?: string;
  
  /** Configuración de animación Animate.css */
  animations?: AlfAnimateCssInterface;
}

/**
 * AlfTabsInterface
 * Define la configuración maestra del contenedor de pestañas.
 */
export interface AlfTabsInterface extends AlfBaseInterface {
  /** Color de marca del componente */
  brandColor?: { 
    color :AlfColorEnum;
    type: AlfColorVariantEnum
  }

  /** Lista de pestañas a renderizar (opcional si se usa ng-content) */
  tabs?: AlfTabInterface[];
  
  /** Índice de la pestaña activa (support two-way binding) */
  activeIndex?: number;
  
  /** Posición del header respecto al contenido */
  position?: AlfTabsPositionEnum;
  
  /** Estilo visual de las pestañas */
  visualType?: AlfTabsVisualTypeEnum;

  /** Configuración visual de los elementos del header */
  tabsConfiguration?: {
    /** Configuración específica para los botones/tabs (Source of Truth) */
    tabConfiguration?: AlfButtonInterface;
  };
  
  /** Configuración de comportamiento y animaciones globales */
  behavior?: {
    /** Habilitar flechas de scroll cuando hay overflow */
    showScrollArrows?: boolean;
    /** Navegación circular con teclado */
    circularNavigation?: boolean;
    /** Habilitar gestos táctiles (swipe) en móviles (default: true) */
    enableSwipe?: boolean;
    /** Umbral de sensibilidad para el swipe (0.1 a 0.5, default: 0.2) */
    swipeThreshold?: number;
    /** Duración de la transición en ms */
    animationDuration?: number;
    /** Animación por defecto para los paneles */
    defaultAnimations?: AlfAnimateCssInterface;
  };

  /** Configuración por defecto para todos los paneles de contenido */
  defaultContentConfig?: AlfTabContentInterface;
}
