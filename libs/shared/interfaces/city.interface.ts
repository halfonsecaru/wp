/**
 * Interfaz para representar una Ciudad.
 */
export interface CityInterface {
  /** Identificador único de la ciudad */
  readonly id: number;
  /** Nombre completo de la ciudad */
  readonly name: string;
  /** Código Postal (opcional) */
  readonly cp?: number;
  /** ID de la provincia a la que pertenece (opcional) */
  readonly provinceId?: number;
}