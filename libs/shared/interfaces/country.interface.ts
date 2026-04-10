import { ProvinceInterface } from './province.interface';

/**
 * Interfaz para representar un País.
 */
export interface CountryInterface {
  /** Identificador único del país */
  readonly id: number;
  /** Nombre completo del país */
  readonly name: string;
  /** Código internacional del país (ej. 'ES', 'MX') */
  readonly code: string;
  /** Lista de provincias asociadas a este país (opcional) */
  readonly provinces?: readonly ProvinceInterface[];
}