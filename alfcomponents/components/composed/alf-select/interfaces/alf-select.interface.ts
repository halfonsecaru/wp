import { AlfInputAppearanceEnum } from '@alfcomponents/enums';
import { AlfBaseCommonConfigInterface } from '@alfcomponents/interfaces';
import { InjectionToken } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { AlfSelectOption } from '../../alf-autocomplete/interfaces/alf-auto-complete-options-interface';

export interface AlfSelectInterface extends AlfBaseCommonConfigInterface {
    id?: string;
    value?: any;
    name?: string;
    prefix?: string;
    suffix?: string;
    options?: AlfSelectOption[];
    placeholder?: string;
    searchable?: boolean;
    clearable?: boolean;
    multiple?: boolean;
    maxSelections?: number;
    selectVariant?: AlfInputAppearanceEnum;
    virtualScroll?: boolean;
    groupBy?: string;
    label?: string;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    readonly?: boolean;
    validators?: ValidatorFn[];
    loading?: boolean;
}
