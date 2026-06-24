export interface AlfSelectOption {
    /** Valor de la opción */
    value: any;

    /** Etiqueta visible de la opción */
    label: string;

    /** Si la opción está deshabilitada */
    disabled?: boolean;

    /** Icono opcional (unicode o clase CSS) */
    icon?: string;

    /** Grupo al que pertenece (para agrupación visual) */
    group?: string;

    /** Datos adicionales personalizados */
    data?: any;
}
