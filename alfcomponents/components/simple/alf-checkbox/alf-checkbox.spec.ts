import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlfCheckbox } from './alf-checkbox';
import { AlfCheckboxVariantEnum, AlfSizeEnum } from '@alfcomponents/enums';

describe('AlfCheckbox', () => {
  let component: AlfCheckbox;
  let fixture: ComponentFixture<AlfCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfCheckbox]
    }).compileComponents();

    fixture = TestBed.createComponent(AlfCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle checked state on click', () => {
    const hostElement = fixture.nativeElement as HTMLElement;
    hostElement.click();
    expect(component.checked()).toBe(true);

    hostElement.click();
    expect(component.checked()).toBe(false);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    hostElement.click();
    expect(component.checked()).toBe(false);
  });

  it('should reset indeterminate when toggled', () => {
    component.indeterminate.set(true);
    fixture.detectChanges();

    component.toggle();
    expect(component.checked()).toBe(true);
    expect(component.indeterminate()).toBe(false);
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
    it('should resolve StandardPrimary correctly', () => {
      fixture.componentRef.setInput('variant', 'standard-primary');
      fixture.detectChanges();
      
      const config = (component as any).resolvedConfig();
      expect(config.visualType).toBe('text');
      expect(config.backgrounds.default.backgroundColor).toBe('transparent');
    });

    it('should resolve SoftSuccess correctly', () => {
      fixture.componentRef.setInput('variant', 'soft-success');
      fixture.detectChanges();
      
      const config = (component as any).resolvedConfig();
      expect(config.visualType).toBe('soft');
      expect(config.backgrounds.default.backgroundColor).toContain('color-mix');
    });

    it('should resolve CrystalInfo correctly', () => {
      fixture.componentRef.setInput('variant', 'crystal-info');
      fixture.detectChanges();
      
      const config = (component as any).resolvedConfig();
      expect(config.visualType).toBe('crystal');
      expect(config.backgrounds.default.backgroundColor).toContain('color-mix');
      expect(config.border.default.borderWidth).toBe('0px');
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
      
      const errorContainer = hostElement.querySelector('.alf-cb-error');
      expect(errorContainer).toBeTruthy();
    });
  });
});

