/**
 * Interfaz para representar una Provincia.
 */
export interface ProvinceInterface {
  /** Identificador único de la provincia */
  readonly id: number;
  /** Nombre completo de la provincia */
  readonly name: string;
  /** ID del país al que pertenece */
  readonly countryId: number;
}

