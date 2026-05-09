import { describe, it, expect } from 'vitest';
import { getAlfPredefinedButton } from './predefined/alf-button.predefined';
import { DefaultButtonKeys } from './enums/defaultButtonKeys.interface';
import { AlfColorVariantEnum } from '@alfcomponents/enums';

describe('AlfButtonPredefined', () => {
    it('should create an Accept button with Primary color by default', () => {
        const button = getAlfPredefinedButton(DefaultButtonKeys.Accept);
        expect(button.label).toBe('Accept');
        expect(button.colorVariant).toBe(AlfColorVariantEnum.Primary);
    });

    it('should create an Accept button with PrimaryOutline color when styleKind is outlined', () => {
        const button = getAlfPredefinedButton(DefaultButtonKeys.Accept, { styleKind: 'outlined' });
        expect(button.colorVariant).toBe(AlfColorVariantEnum.PrimaryOutline);
    });

    it('should create a Danger button with Danger color by default', () => {
        const button = getAlfPredefinedButton(DefaultButtonKeys.Danger);
        expect(button.colorVariant).toBe(AlfColorVariantEnum.Danger);
    });

    it('should create a Danger button with DangerOutline color when styleKind is outlined', () => {
        const button = getAlfPredefinedButton(DefaultButtonKeys.Danger, { styleKind: 'outlined' });
        expect(button.colorVariant).toBe(AlfColorVariantEnum.DangerOutline);
    });

    it('should create a Light button with Light color by default', () => {
        const button = getAlfPredefinedButton(DefaultButtonKeys.Light);
        expect(button.colorVariant).toBe(AlfColorVariantEnum.Light);
    });
});
