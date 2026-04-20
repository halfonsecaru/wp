import { AlfBaseInterface, AlfAnimateCssInterface } from '@alfcomponents/interfaces';
import { AlfTabsPositionEnum, AlfTabsVisualTypeEnum } from '../enums/alf-tabs-visual-type.enum';
import { AlfAnimationTypeEnum, AlfColorEnum, AlfButtonVisualTypeEnum } from '@alfcomponents/enums';

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

  /** Configuración predefinida de botón si aplica */
  predefined?: string;
  
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
  brandColor?: AlfColorEnum;

  /** Lista de pestañas a renderizar (opcional si se usa ng-content) */
  tabs?: AlfTabInterface[];
  
  /** Índice de la pestaña activa (support two-way binding) */
  activeIndex?: number;
  
  /** Posición del header respecto al contenido */
  position?: AlfTabsPositionEnum;
  
  /** Estilo visual de las pestañas */
  visualType?: AlfTabsVisualTypeEnum;
  
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
