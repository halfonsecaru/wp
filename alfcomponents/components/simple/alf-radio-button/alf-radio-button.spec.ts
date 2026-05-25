import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlfRadioButton } from './alf-radio-button';
import { AlfRadioButtonVariantEnum, AlfSizeEnum, AlfColorVariantEnum } from '@alfcomponents/enums';

describe('AlfRadioButton', () => {
  let component: AlfRadioButton;
  let fixture: ComponentFixture<AlfRadioButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfRadioButton]
    }).compileComponents();

    fixture = TestBed.createComponent(AlfRadioButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select when clicked and not already selected', () => {
    const hostElement = fixture.nativeElement as HTMLElement;
    hostElement.querySelector('label')?.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(true);

    // Clicking again should stay true (radio behavior)
    hostElement.querySelector('label')?.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(true);
  });

  it('should not select when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    hostElement.querySelector('label')?.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(false);
  });

  it('should emit change when selected', () => {
    const spy = vi.fn();
    component.onCheckedChange.subscribe(spy);

    component.select();
    expect(spy).toHaveBeenCalled();
  });

  it('should handle keyboard events (Space)', () => {
    const event = new KeyboardEvent('keydown', { key: ' ' });
    const spy = vi.spyOn(component, 'select');
    
    (component as any).onInputKeydown(event);
    expect(spy).toHaveBeenCalled();
  });

  describe('Elite Variants', () => {
    it('should resolve PrimaryOutline correctly', () => {
      fixture.componentRef.setInput('variant', AlfColorVariantEnum.PrimaryOutline);
      fixture.detectChanges();
      
      expect(component.isOutline()).toBe(true);
    });

    it('should resolve PrimarySoft correctly', () => {
      fixture.componentRef.setInput('variant', AlfColorVariantEnum.PrimarySoft);
      fixture.detectChanges();
      
      expect(component.isSoft()).toBe(true);
    });
  });

  describe('Validation & Messages', () => {
    it('should render helper text when provided', () => {
      fixture.componentRef.setInput('config', { helperText: 'Helper message' });
      fixture.detectChanges();
      
      const hostElement = fixture.nativeElement as HTMLElement;
      expect(hostElement.textContent).toContain('Helper message');
    });

    it('should render error text and apply error styles', () => {
      fixture.componentRef.setInput('config', { error: 'Error message' });
      fixture.detectChanges();
      
      const hostElement = fixture.nativeElement as HTMLElement;
      expect(hostElement.textContent).toContain('Error message');
      
      const errorContainer = hostElement.querySelector('.alf-rb-error');
      expect(errorContainer).toBeTruthy();
    });
  });
});
