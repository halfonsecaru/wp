import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AlfInput } from './alf-input';
import { AlfInputTypeEnum } from '@alfcomponents/enums';

try {
  const testBed = getTestBed();
  if (!testBed.platform) {
    testBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  }
} catch (e) { }

describe('AlfInput', () => {
  let component: AlfInput;
  let fixture: ComponentFixture<AlfInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfInput],
    }).compileComponents();

    fixture = TestBed.createComponent(AlfInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar un input por defecto', () => {
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input.alf-input-element'));
    expect(inputEl).toBeTruthy();
  });



  it('debe emitir onInput cuando cambia el valor', () => {
    fixture.detectChanges();
    const onInputSpy = vi.fn();
    component.onInput.subscribe(onInputSpy);

    const inputEl = fixture.debugElement.query(By.css('input.alf-input-element')).nativeElement;
    inputEl.value = 'hola';
    inputEl.dispatchEvent(new Event('input'));

    expect(onInputSpy).toHaveBeenCalledWith('hola');
    expect(component.value()).toBe('hola');
  });

  it('debe mostrar el label y flotar cuando tiene valor', () => {
    fixture.componentRef.setInput('label', 'Usuario');
    fixture.componentRef.setInput('value', 'antonio');
    fixture.detectChanges();

    const labelEl = fixture.debugElement.query(By.css('.alf-input-label'));
    expect(labelEl.nativeElement.textContent).toContain('Usuario');
    expect(labelEl.nativeElement.classList.contains('alf-input-label--float')).toBe(true);
  });

  it('debe mostrar el botón de limpiar cuando clearable es true y tiene valor', () => {
    fixture.componentRef.setInput('config', { clearable: true });
    fixture.componentRef.setInput('value', 'algo');
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.alf-input-clear'));
    expect(clearBtn).toBeTruthy();
  });

  it('debe limpiar el valor al hacer click en el botón de limpiar', () => {
    fixture.componentRef.setInput('config', { clearable: true });
    fixture.componentRef.setInput('value', 'texto');
    fixture.detectChanges();

    const onClearSpy = vi.fn();
    component.onClear.subscribe(onClearSpy);

    const clearBtn = fixture.debugElement.query(By.css('.alf-input-clear'));
    clearBtn.nativeElement.click();

    expect(component.value()).toBe('');
    expect(onClearSpy).toHaveBeenCalled();
  });

  it('debe alternar la visibilidad de la contraseña', () => {
    fixture.componentRef.setInput('type', AlfInputTypeEnum.Password);
    fixture.detectChanges();

    const toggleBtn = fixture.debugElement.query(By.css('.alf-input-password-toggle'));
    const inputEl = fixture.debugElement.query(By.css('input.alf-input-element')).nativeElement;

    expect(inputEl.type).toBe('password');

    toggleBtn.nativeElement.click();
    fixture.detectChanges();
    expect(inputEl.type).toBe('text');

    toggleBtn.nativeElement.click();
    fixture.detectChanges();
    expect(inputEl.type).toBe('password');
  });

  it('debe aplicar debounceTime', async () => {
    vi.useFakeTimers();
    fixture.componentRef.setInput('config', { debounceTime: 500 });
    fixture.detectChanges();

    const onInputSpy = vi.fn();
    component.onInput.subscribe(onInputSpy);

    const inputEl = fixture.debugElement.query(By.css('input.alf-input-element')).nativeElement;
    inputEl.value = 'test';
    inputEl.dispatchEvent(new Event('input'));

    expect(onInputSpy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(onInputSpy).toHaveBeenCalledWith('test');
    vi.useRealTimers();
  });

  // --- NUEVOS TESTS AÑADIDOS PARA COBERTURA COMPLETA --- //

  it('debe mostrar mensaje de error cuando tiene errorComputed', () => {
    fixture.componentRef.setInput('config', { error: 'Nombre inválido' });
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('.alf-input-error'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent).toContain('Nombre inválido');
  });

  it('debe mostrar helperText cuando se define', () => {
    fixture.componentRef.setInput('helperText', 'Escribe tu nombre completo');
    fixture.detectChanges();

    const helperEl = fixture.debugElement.query(By.css('.alf-input-helper-text'));
    expect(helperEl).toBeTruthy();
    expect(helperEl.nativeElement.textContent).toContain('Escribe tu nombre completo');
  });

  it('debe mostrar el contador de caracteres si maxlength está definido', () => {
    fixture.componentRef.setInput('config', { showCharCounter: true, maxLength: 10 });
    fixture.componentRef.setInput('value', '12345');
    fixture.detectChanges();

    const counterEl = fixture.debugElement.query(By.css('.alf-input-char-counter'));
    expect(counterEl).toBeTruthy();
    expect(counterEl.nativeElement.textContent).toContain('5 / 10');
  });

  it('debe renderizar el prefix si se pasa como input', () => {
    fixture.componentRef.setInput('prefix', '€');
    fixture.detectChanges();

    const prefixEl = fixture.debugElement.query(By.css('.alf-input-prefix'));
    expect(prefixEl).toBeTruthy();
    expect(prefixEl.nativeElement.textContent).toContain('€');
  });

  it('debe propagar writeValue desde ControlValueAccessor', () => {
    component.writeValue('nuevo valor CVA');
    expect(component.value()).toBe('nuevo valor CVA');
  });

  it('debe cambiar el estado disabled a través de setDisabledState', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(By.css('input.alf-input-element')).nativeElement;
    expect(inputEl.disabled).toBe(true);
  });
});
