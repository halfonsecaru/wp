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
      
      expect(component.variant()).toBe(AlfColorVariantEnum.Primary);
    });

    it('should resolve Success variant correctly', () => {
      fixture.componentRef.setInput('variant', AlfColorVariantEnum.Success);
      fixture.detectChanges();
      
      expect(component.variant()).toBe(AlfColorVariantEnum.Success);
    });

    it('should resolve Primary3D variant correctly', () => {
      fixture.componentRef.setInput('variant', AlfColorVariantEnum.Primary3D);
      fixture.detectChanges();
      
      expect(component.variant()).toBe(AlfColorVariantEnum.Primary3D);
    });

    it('should resolve GradientPurple variant correctly', () => {
      fixture.componentRef.setInput('variant', AlfColorVariantEnum.GradientPurple);
      fixture.detectChanges();
      
      expect(component.variant()).toBe(AlfColorVariantEnum.GradientPurple);
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

  describe('Class bindings and visual states', () => {
    it('should not have alf-sw--checked by default', () => {
      const container = fixture.nativeElement.querySelector('.alf-sw');
      expect(container.classList.contains('alf-sw--checked')).toBe(false);
    });

    it('should add alf-sw--checked class when checked is true', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();
      const container = fixture.nativeElement.querySelector('.alf-sw');
      expect(container.classList.contains('alf-sw--checked')).toBe(true);
    });

    it('should add alf-sw--disabled class when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const container = fixture.nativeElement.querySelector('.alf-sw');
      expect(container.classList.contains('alf-sw--disabled')).toBe(true);
    });

    it('should add alf-sw--outline class when variant is an outline variant', () => {
      fixture.componentRef.setInput('variant', AlfColorVariantEnum.SecondaryOutline);
      fixture.detectChanges();
      const container = fixture.nativeElement.querySelector('.alf-sw');
      expect(container.classList.contains('alf-sw--outline')).toBe(true);
    });

    it('should not add alf-sw--outline class when variant is a solid variant', () => {
      fixture.componentRef.setInput('variant', AlfColorVariantEnum.Secondary);
      fixture.detectChanges();
      const container = fixture.nativeElement.querySelector('.alf-sw');
      expect(container.classList.contains('alf-sw--outline')).toBe(false);
    });
  });
});
