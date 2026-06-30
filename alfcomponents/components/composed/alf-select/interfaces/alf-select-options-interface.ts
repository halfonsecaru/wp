import { AlfSelectOption } from "../../alf-autocomplete/interfaces/alf-auto-complete-options-interface";

export interface AlfAutoCompleteOption extends AlfSelectOption {
    /** Si la opción está seleccionada */
    selected?: boolean;
}
