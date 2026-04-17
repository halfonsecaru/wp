import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlfButton } from './alf-button';
import { AlfButtonVisualTypeEnum, AlfFontFamilyEnum, AlfRadiusEnum } from '../../enums';
import { DefaultButtonKeys } from './enums/defaultButtonKeys.interface';

describe('AlfButton', () => {
    let component: AlfButton;
    let fixture: ComponentFixture<AlfButton>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AlfButton]
        }).compileComponents();

        fixture = TestBed.createComponent(AlfButton);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // ========================================
    // 1. CREACIÓN Y POLIMORFISMO
    // ========================================
    describe('Creation & Polymorphism', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should render as a <button> by default', () => {
            const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
            expect(buttonEl).toBeTruthy();
            expect(fixture.debugElement.query(By.css('a.alf-btn'))).toBeFalsy();
        });

        it('should render as an <a> tag when link is provided', async () => {
            fixture.componentRef.setInput('link', { url: 'https://google.com', target: '_blank' });
            fixture.detectChanges();
            await fixture.whenStable();

            const anchorEl = fixture.debugElement.query(By.css('a.alf-btn'));
            expect(anchorEl).toBeTruthy();
            expect(anchorEl.nativeElement.getAttribute('href')).toBe('https://google.com');
            expect(anchorEl.nativeElement.getAttribute('target')).toBe('_blank');
            expect(fixture.debugElement.query(By.css('button.alf-btn'))).toBeFalsy();
        });
    });

    // ========================================
    // 2. CONFIGURACIÓN Y SEÑALES
    // ========================================
    describe('Configuration & Signals', () => {
        it('should apply predefined labels', async () => {
            fixture.componentRef.setInput('predefined', DefaultButtonKeys.Accept);
            fixture.detectChanges();
            await fixture.whenStable();

            const textEl = fixture.debugElement.query(By.css('.alf-btn__text'));
            // Label for "accept" is usually in i18n, but we check presence
            expect(textEl).toBeTruthy();
        });

        it('should allow label override', async () => {
            fixture.componentRef.setInput('predefined', DefaultButtonKeys.Accept);
            fixture.componentRef.setInput('label', 'Custom Label');
            fixture.detectChanges();
            await fixture.whenStable();

            const textEl = fixture.debugElement.query(By.css('.alf-btn__text'));
            expect(textEl.nativeElement.textContent.trim()).toBe('Custom Label');
        });

        it('should hide icon when hideIcon is true', async () => {
            fixture.componentRef.setInput('predefined', DefaultButtonKeys.Info);
            fixture.componentRef.setInput('hideIcon', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const iconEl = fixture.debugElement.query(By.css('.alf-btn__icon'));
            expect(iconEl).toBeFalsy();
        });

        it('should render left icon when provided', async () => {
            fixture.componentRef.setInput('predefined', DefaultButtonKeys.Accept);
            fixture.detectChanges();
            await fixture.whenStable();

            const iconEl = fixture.debugElement.query(By.css('.alf-btn__icon--left'));
            expect(iconEl).toBeTruthy();
            expect(iconEl.nativeElement.textContent).toBeDefined(); // Should have unicode icon
        });

        it('should fallback to Light variant if undefined is passed as predefined', async () => {
            fixture.componentRef.setInput('predefined', 'NON_EXISTENT_KEY');
            fixture.detectChanges();
            await fixture.whenStable();

            // Light variant label in predefined is "Light" or similar
            expect((component as any).labelComputed().toLowerCase()).toBe('light');
        });
    });

    // ========================================
    // 3. ESTADOS Y COMPORTAMIENTO
    // ========================================
    describe('States & Behavior', () => {
        it('should show spinner when loading is true', async () => {
            fixture.componentRef.setInput('loading', { isLoading: true });
            fixture.detectChanges();
            await fixture.whenStable();

            const spinnerEl = fixture.debugElement.query(By.css('alf-spinner'));
            expect(spinnerEl).toBeTruthy();
            
            // Content should be hidden
            const contentEl = fixture.debugElement.query(By.css('.alf-btn__content'));
            expect(contentEl.nativeElement.style.visibility).toBe('hidden');
        });

        it('should disable the button when loading is true', async () => {
            fixture.componentRef.setInput('loading', { isLoading: true });
            fixture.detectChanges();
            await fixture.whenStable();

            const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
            expect(buttonEl.nativeElement.disabled).toBe(true);
        });

        it('should emit onClick when clicked', () => {
            const onClickSpy = vi.fn();
            (component.onClick as any).subscribe(onClickSpy);

            const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
            buttonEl.nativeElement.click();

            expect(onClickSpy).toHaveBeenCalled();
        });

        it('should emit hover events', () => {
            const onEnterSpy = vi.fn();
            const onLeaveSpy = vi.fn();
            (component.onHoverEnter as any).subscribe(onEnterSpy);
            (component.onHoverLeave as any).subscribe(onLeaveSpy);

            // Trigger events on the fixture debugElement (the host component)
            fixture.debugElement.triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));
            expect(onEnterSpy).toHaveBeenCalled();

            fixture.debugElement.triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));
            expect(onLeaveSpy).toHaveBeenCalled();
        });

        it('should apply aria-label attribute', async () => {
            fixture.componentRef.setInput('label', 'Accessibility Test');
            fixture.detectChanges();
            await fixture.whenStable();

            const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
            expect(buttonEl.nativeElement.getAttribute('aria-label')).toBe('Accessibility Test');
        });
    });

    // ========================================
    // 4. GEEK MODE (FRIKIBUTTONS)
    // ========================================
    describe('Geek Mode (Special Overrides)', () => {
        it('should apply Matrix specialized font and shadows', async () => {
            fixture.componentRef.setInput('predefined', DefaultButtonKeys.Matrix);
            fixture.detectChanges();
            await fixture.whenStable();

            const styles = (component as any).styleVariablesComputed();
            expect(styles['--alf-txt-family']).toContain('monospace');
            expect(styles['--alf-shd-val']).toContain('color-mix');
        });

        it('should apply Cyber specialized border radius (None)', async () => {
            fixture.componentRef.setInput('predefined', DefaultButtonKeys.Cyber);
            fixture.detectChanges();
            await fixture.whenStable();

            const styles = (component as any).styleVariablesComputed();
            expect(styles['--alf-brd-radius']).toBe(AlfRadiusEnum.None);
        });

        it('should apply Jedi specialized glow shadows', async () => {
            fixture.componentRef.setInput('predefined', DefaultButtonKeys.Jedi);
            fixture.detectChanges();
            await fixture.whenStable();

            const styles = (component as any).styleVariablesComputed();
             // Jedi uses glow shadows in the factory
            expect(styles['--alf-shd-val']).toBeDefined();
        });

        it('should apply Zen specialized large border radius', async () => {
            fixture.componentRef.setInput('predefined', DefaultButtonKeys.Zen);
            fixture.detectChanges();
            await fixture.whenStable();

            const styles = (component as any).styleVariablesComputed();
            expect(styles['--alf-brd-radius']).toBe(AlfRadiusEnum.Xl3);
        });

        it('should apply correct classes for Text visual variant', async () => {
            fixture.componentRef.setInput('visualType', AlfButtonVisualTypeEnum.Text);
            fixture.detectChanges();
            await fixture.whenStable();

            const buttonEl = fixture.debugElement.query(By.css('.alf-btn--text'));
            expect(buttonEl).toBeTruthy();
        });
    });

    // ========================================
    // 5. ELITE FEATURES (A11Y, DEBOUNCE, BLUR)
    // ========================================
    describe('Elite Features', () => {
        it('should scale spinner size based on button size', async () => {
            fixture.componentRef.setInput('loading', { isLoading: true });
            fixture.componentRef.setInput('size', 'xl');
            fixture.detectChanges();
            await fixture.whenStable();

            const spinnerEl = fixture.debugElement.query(By.css('alf-spinner'));
            // In xl, spinnerSizeComputed returns 24px
            expect(spinnerEl.componentInstance.sizeVal()).toBe('24px');

            fixture.componentRef.setInput('size', 'xs');
            fixture.detectChanges();
            await fixture.whenStable();
            expect(spinnerEl.componentInstance.sizeVal()).toBe('12px');
        });

        it('should have a11y attributes when loading', async () => {
            fixture.componentRef.setInput('loading', { isLoading: true });
            fixture.detectChanges();
            await fixture.whenStable();

            const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
            expect(buttonEl.nativeElement.getAttribute('aria-busy')).toBe('true');
            expect(buttonEl.nativeElement.getAttribute('aria-live')).toBe('polite');
        });

        it('should debounce clicks when debounceTime is set', async () => {
            fixture.componentRef.setInput('debounceTime', 500);
            const onClickSpy = vi.fn();
            (component.onClick as any).subscribe(onClickSpy);

            const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
            
            // Multiple rapid clicks
            buttonEl.nativeElement.click();
            buttonEl.nativeElement.click();
            buttonEl.nativeElement.click();

            // Should only have been called once due to threshold check (time is 0 for all 3 practically in same tick)
            expect(onClickSpy).toHaveBeenCalledTimes(1);
        });

        it('should NOT debounce clicks when debounceTime is 0', async () => {
            fixture.componentRef.setInput('debounceTime', 0);
            const onClickSpy = vi.fn();
            (component.onClick as any).subscribe(onClickSpy);

            const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
            
            buttonEl.nativeElement.click();
            buttonEl.nativeElement.click();

            expect(onClickSpy).toHaveBeenCalledTimes(2);
        });
    });
});


