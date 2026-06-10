import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { AlfButton } from './alf-button';
import { beforeEach, describe, expect, it, vi } from 'vitest';

try {
  const testBed = getTestBed();
  if (!testBed.platform) {
    testBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  }
} catch (e) { }

describe('AlfButton', () => {
  let component: AlfButton;
  let fixture: ComponentFixture<AlfButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfButton],
    }).compileComponents();

    fixture = TestBed.createComponent(AlfButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renderiza como button por defecto', () => {
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-button'));
    const anchorEl = fixture.debugElement.query(By.css('a.alf-button'));

    expect(buttonEl).toBeTruthy();
    expect(anchorEl).toBeFalsy();
  });

  it('renderiza como anchor cuando se pasa link', () => {
    fixture.componentRef.setInput('link', { url: 'https://angular.dev', target: '_blank' });
    fixture.detectChanges();

    const anchorEl = fixture.debugElement.query(By.css('a.alf-button'));
    const buttonEl = fixture.debugElement.query(By.css('button.alf-button'));

    expect(anchorEl).toBeTruthy();
    expect(anchorEl.nativeElement.getAttribute('href')).toBe('https://angular.dev');
    expect(anchorEl.nativeElement.getAttribute('target')).toBe('_blank');
    expect(buttonEl).toBeFalsy();
  });

  it('emite onClick al hacer click', () => {
    fixture.detectChanges();
    const onClickSpy = vi.fn();
    (component.onClick as any).subscribe(onClickSpy);

    const buttonEl = fixture.debugElement.query(By.css('button.alf-button'));
    buttonEl.nativeElement.click();

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('emite onHoverEnter y onHoverLeave', () => {
    fixture.detectChanges();
    const onEnterSpy = vi.fn();
    const onLeaveSpy = vi.fn();
    (component.onHoverEnter as any).subscribe(onEnterSpy);
    (component.onHoverLeave as any).subscribe(onLeaveSpy);

    const buttonEl = fixture.debugElement.query(By.css('.alf-button'));
    buttonEl.triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));
    buttonEl.triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));

    expect(onEnterSpy).toHaveBeenCalledTimes(1);
    expect(onLeaveSpy).toHaveBeenCalledTimes(1);
  });

  it('aplica debounce cuando debounceTime > 0', () => {
    fixture.componentRef.setInput('debounceTime', 500);
    fixture.detectChanges();

    const onClickSpy = vi.fn();
    (component.onClick as any).subscribe(onClickSpy);

    const nowSpy = vi.spyOn(Date, 'now');
    nowSpy.mockReturnValueOnce(1000);
    nowSpy.mockReturnValueOnce(1100);
    nowSpy.mockReturnValueOnce(1300);

    const buttonEl = fixture.debugElement.query(By.css('button.alf-button'));
    buttonEl.nativeElement.click();
    buttonEl.nativeElement.click();
    buttonEl.nativeElement.click();

    expect(onClickSpy).toHaveBeenCalledTimes(1);
    nowSpy.mockRestore();
  });

  it('no aplica debounce cuando debounceTime = 0', () => {
    fixture.componentRef.setInput('debounceTime', 0);
    fixture.detectChanges();

    const onClickSpy = vi.fn();
    (component.onClick as any).subscribe(onClickSpy);

    const buttonEl = fixture.debugElement.query(By.css('button.alf-button'));
    buttonEl.nativeElement.click();
    buttonEl.nativeElement.click();

    expect(onClickSpy).toHaveBeenCalledTimes(2);
  });

  it('genera un id único por defecto y aplica id personalizado', () => {
    fixture.detectChanges();
    const buttonEl = fixture.debugElement.query(By.css('.alf-button'));
    expect(buttonEl.nativeElement.getAttribute('id')).toContain('-alf-btn-id');

    fixture.componentRef.setInput('id', 'mi-custom-id');
    fixture.detectChanges();
    expect(buttonEl.nativeElement.getAttribute('id')).toBe('mi-custom-id');
  });

  it('maneja el estado de carga (loading) sin destruir el contenido', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const contentEl = fixture.debugElement.query(By.css('.alf-button__content'));
    const loaderEl = fixture.debugElement.query(By.css('.alf-button__loader-overlay'));
    const spinnerEl = fixture.debugElement.query(By.css('.alf-button__spinner'));

    expect(contentEl.nativeElement.classList.contains('alf-button__content--hidden')).toBe(true);
    expect(loaderEl).toBeTruthy();
    expect(spinnerEl).toBeTruthy();

    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const loaderElAfter = fixture.debugElement.query(By.css('.alf-button__loader-overlay'));
    expect(loaderElAfter).toBeFalsy();
  });

  it('aplica el estado bloqueado (disabled)', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('.alf-button'));
    expect(buttonEl.nativeElement.disabled).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('alf-button--disabled')).toBe(true);
  });
});
