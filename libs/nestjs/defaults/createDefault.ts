import { ResponseInterface } from "@libs/shared/interfaces";


/**
 * Genera una respuesta por defecto con error 501 (Not Implemented).
 * Útil para placeholders de endpoints en desarrollo.
 *
 * @returns {ResponseInterface} Objeto de respuesta estándar con estado 501.
 */
export const defaultResponse = <T = any>(): ResponseInterface<T> => {
    return {
        data: null,
        timestamps: '',
        path: '',
        error: null,
        statusCode: 501,
        message: 'Error'
    } as ResponseInterface<T>;
}

/**
 * Genera una respuesta personalizada tipada.
 *
 * @template T - Tipo de los datos de la respuesta.
 * @param {T | null} data - Datos resultantes de la operación.
 * @param {string} timestamps - ISO String del momento de la respuesta.
 * @param {string} path - Ruta del endpoint.
 * @param {any} error - Información del error si aplica.
 * @param {number} statusCode - Código HTTP resultante.
 * @param {string} message - Mensaje descriptivo.
 * @returns {ResponseInterface<T>} Objeto de respuesta estandarizado y tipado.
 */
export const customResponse = <T = any>(
    data: T | null = null,
    timestamps: string = new Date().toISOString(),
    path: string = '',
    error: any = null,
    statusCode: number = 200,
    message: string = 'Success'
): ResponseInterface<T> => {
    return {
        data,
        timestamps: timestamps,
        path,
        error,
        statusCode,
        message
    } as ResponseInterface<T>;
}
