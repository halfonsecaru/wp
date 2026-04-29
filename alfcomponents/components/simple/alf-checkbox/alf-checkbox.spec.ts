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
    
    // We call the protected method directly for testing if needed or trigger via event
    (component as any).onInputKeydown(event);
    expect(spy).toHaveBeenCalled();
  });
});
