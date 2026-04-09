/**
 * Enum para el origen de carga de iconos
 * Define si el icono proviene del registro central o es un SVG directo.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * source: AlfIconSourceEnum.Svg // Cargar icono desde un archivo SVG externo
 * ```
 */
export enum AlfIconSourceEnum {
    Registry = 'registry',
    Svg = 'svg'
}
