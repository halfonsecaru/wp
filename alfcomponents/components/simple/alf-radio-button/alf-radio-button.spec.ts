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

  describe('Component Configuration', () => {
    it('should compute labelPosition correctly', () => {
      fixture.componentRef.setInput('labelPosition', 'before');
      fixture.detectChanges();
      
      expect(component.labelPositionComputed()).toBe('before');
    });

    it('should compute radioButtonStyle correctly', () => {
      fixture.componentRef.setInput('radioButtonStyle', 'standard');
      fixture.detectChanges();
      
    });

    it('should compute size correctly', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      
      expect(component.sizeComputed()).toBe('lg');
    });

    it('should compute value correctly', () => {
      fixture.componentRef.setInput('value', 'testValue');
      fixture.detectChanges();
      
      expect(component.value()).toBe('testValue');
    });

    it('should use flat inputs for radioButtonStyle and labelPosition', () => {
      fixture.componentRef.setInput('radioButtonStyle', 'elegant');
      fixture.componentRef.setInput('labelPosition', 'after');
      fixture.detectChanges();
      
      expect(component.radioButtonStyleComputed()).toBe('elegant');
      expect(component.labelPositionComputed()).toBe('after');
    });
  });

  describe('Validation & Messages', () => {
    it('should render helper text when provided', () => {
      fixture.componentRef.setInput('helperText', 'Helper message');
      fixture.detectChanges();
      
      const hostElement = fixture.nativeElement as HTMLElement;
      expect(hostElement.textContent).toContain('Helper message');
    });

    it('should render error text and apply error styles', () => {
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();
      
      const hostElement = fixture.nativeElement as HTMLElement;
      expect(hostElement.textContent).toContain('Error message');
      
      const errorContainer = hostElement.querySelector('.alf-rb-error');
      expect(errorContainer).toBeTruthy();
    });
  });
});
