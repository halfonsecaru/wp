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

    fixture.debugElement.triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));
    fixture.debugElement.triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));

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
});
