import { AlfButtonTypeEnum } from '../../../../shared/enums/button-type';
import { AlfLinkTargetEnum } from '../../../../shared/enums/link-target';
import { AllPropertiesInterface } from '../../../../shared/interfaces/all-properties';
import { AlfAriaInterface } from '../../../../shared/interfaces/aria';

/**
 * Interface para la configuración del componente alf-button
 * 
 * Esta interface define las propiedades específicas del botón que NO están
 * incluidas en AllPropertiesInterface (propiedades compartidas).
 * 
 * @extends AllPropertiesInterface - Hereda propiedades comunes (variant, size, disabled, etc.)
 */
export interface AlfButtonInterface extends Omit<AllPropertiesInterface, 'responsive'>, AlfAriaInterface {

  // ========================================
  // COMPORTAMIENTO (Behavior Properties)
  // ========================================

  /**
   * Tipo HTML del botón
   * Define el comportamiento nativo del elemento button
   * 
   * @default AlfButtonTypeEnum.Button
   * @example
   * ```typescript
   * type: AlfButtonTypeEnum.Submit  // Para formularios
   * type: AlfButtonTypeEnum.Reset   // Para resetear formularios
   * type: AlfButtonTypeEnum.Button  // Botón genérico (default)
   * ```
   */
  type?: AlfButtonTypeEnum;

  /**
   * ID único del botón
   * Útil para identificación en formularios, tracking o testing
   * 
   * @example
   * ```typescript
   * id: 123
   * ```
   */
  id?: number;


  // ========================================
  // ENLACE (Link Properties)
  // ========================================

  /**
   * Configuración del enlace si el botón actúa como link
   * Cuando se define, el botón se renderiza como <a> en lugar de <button>
   * 
   * @example
   * ```typescript
   * // Enlace externo en nueva pestaña
   * link: {
   *   url: 'https://example.com',
   *   target: AlfLinkTargetEnum.Blank
   * }
   * 
   * // Enlace interno en la misma pestaña
   * link: {
   *   url: '/dashboard',
   *   target: AlfLinkTargetEnum.Self
   * }
   * ```
   */
  link?: {
    /**
     * URL del enlace
     * Puede ser una URL absoluta o relativa
     * 
     * @example
     * ```typescript
     * url: 'https://example.com'        // Absoluta
     * url: '/dashboard'                 // Relativa
     * url: '#section'                   // Ancla
     * ```
     */
    url: string;

    /**
     * Dónde abrir el enlace
     * 
     * @default AlfLinkTargetEnum.Self
     * @example
     * ```typescript
     * target: AlfLinkTargetEnum.Blank  // Nueva pestaña
     * target: AlfLinkTargetEnum.Self   // Misma pestaña (default)
     * target: AlfLinkTargetEnum.Parent // Frame padre
     * target: AlfLinkTargetEnum.Top    // Ventana principal
     * ```
     */
    target?: AlfLinkTargetEnum;
  };
}
