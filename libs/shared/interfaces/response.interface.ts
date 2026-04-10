/**
 * Interfaz universal para las respuestas de la API.
 * Garantiza una estructura consistente entre el Backend y el Frontend.
 *
 * @template T - Tipo de los datos contenidos en 'data' y 'error'. Por defecto 'any'.
 *
 * @example
 * ```typescript
 * // Uso básico con tipado fuerte:
 * const response: ResponseInterface<UserInterface> = {
 *   statusCode: 200,
 *   message: 'Usuario encontrado',
 *   timestamps: '2026-04-09T...',
 *   path: '/api/users/1',
 *   error: null,
 *   data: { id: 1, name: 'Alf' } // Aquí 'data' tiene autocompletado de UserInterface
 * };
 * ```
 */
export interface ResponseInterface<T = any> {
  /** Código de estado HTTP de la operación */
  readonly statusCode: number;
  /** Mensaje descriptivo del resultado */
  readonly message: string;
  /** ISO String del momento exacto de la respuesta */
  readonly timestamps: string;
  /** Endpoint que originó la respuesta */
  readonly path: string;
  /** Información detallada sobre el error, si existe */
  readonly error: T | null;
  /** Datos devueltos por la operación */
  readonly data: T | null;
}