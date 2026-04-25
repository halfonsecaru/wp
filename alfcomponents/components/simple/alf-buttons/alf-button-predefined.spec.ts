import { describe, expect, it, afterEach } from 'vitest';
import { getAlfPredefinedButton } from './alf-button-predefined';
import { DefaultButtonKeys } from './enums/defaultButtonKeys.interface';
import { AlfButtonVisualTypeEnum, AlfColorVariantEnum, AlfVisualPredefinedEnum } from '@alfcomponents/enums';

describe('getAlfPredefinedButton', () => {
    const originalNavigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

    afterEach(() => {
        if (originalNavigatorDescriptor) {
            Object.defineProperty(globalThis, 'navigator', originalNavigatorDescriptor);
        }
    });

    it('aplica i18n con lang explicito', () => {
        const button = getAlfPredefinedButton(DefaultButtonKeys.Accept, { lang: 'fr' });

        expect(button.label).toBe('Accepter');
        expect(button.colorVariant).toBe(AlfColorVariantEnum.Primary);
        expect(button.predefined).toBe(AlfVisualPredefinedEnum.SolidPrimary);
    });

    it('aplica i18n usando idioma del navegador cuando no se pasa lang', () => {
        Object.defineProperty(globalThis, 'navigator', {
            value: { language: 'pt-BR' },
            configurable: true,
        });

        const button = getAlfPredefinedButton(DefaultButtonKeys.Warning);
        expect(button.label).toBe('Aviso');
    });

    it('resuelve predefined outlined correctamente', () => {
        const button = getAlfPredefinedButton(DefaultButtonKeys.Dark, {
            visualType: AlfButtonVisualTypeEnum.Outlined,
            lang: 'en',
        });

        expect(button.label).toBe('Dark');
        expect(button.predefined).toBe(AlfVisualPredefinedEnum.OutlinedDark);
    });
});
