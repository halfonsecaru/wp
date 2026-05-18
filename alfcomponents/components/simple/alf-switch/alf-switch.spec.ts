import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlfSwitch } from './alf-switch';
import { AlfColorVariantEnum, AlfSizeEnum } from '@alfcomponents/enums';

describe('AlfSwitch', () => {
  let component: AlfSwitch;
  let fixture: ComponentFixture<AlfSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfSwitch]
    }).compileComponents();

    fixture = TestBed.createComponent(AlfSwitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle checked state on click', () => {
    component.toggle();
    expect(component.checked()).toBe(true);

    component.toggle();
    expect(component.checked()).toBe(false);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.toggle();
    expect(component.checked()).toBe(false);
  });

  it('should emit onCheckedChange when toggled', () => {
    const spy = vi.fn();
    component.onCheckedChange.subscribe(spy);

    component.toggle();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should handle keyboard events (Space)', () => {
    const event = new KeyboardEvent('keydown', { key: ' ' });
    const spy = vi.spyOn(component, 'toggle');
    
    (component as any).onInputKeydown(event);
    expect(spy).toHaveBeenCalled();
  });

  describe('Elite Variants', () => {
    it('should resolve Primary variant correctly', () => {
      fixture.componentRef.setInput('variant', AlfColorVariantEnum.Primary);
      fixture.detectChanges();
      
      const config = (component as any).resolvedConfig();
      expect(config.colorVariant).toBe(AlfColorVariantEnum.Primary);
    });

    it('should resolve Success variant correctly', () => {
      fixture.componentRef.setInput('variant', AlfColorVariantEnum.Success);
      fixture.detectChanges();
      
      const config = (component as any).resolvedConfig();
      expect(config.colorVariant).toBe(AlfColorVariantEnum.Success);
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
      
      const errorContainer = hostElement.querySelector('.alf-sw-error');
      expect(errorContainer).toBeTruthy();
    });
  });
});
