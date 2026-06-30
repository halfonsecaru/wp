import { AlfSelectOption } from "../../alf-autocomplete/interfaces/alf-auto-complete-options-interface";

/**
 * Grupo de opciones del select
 */
export interface AlfSelectGroup {
    /** Etiqueta del grupo */
    label: string;

    /** Opciones del grupo */
    options: AlfSelectOption[];

    /** Si el grupo está deshabilitado */
    disabled?: boolean;
}
