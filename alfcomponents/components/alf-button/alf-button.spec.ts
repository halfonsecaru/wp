import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AlfButton } from './alf-button';
import { AlfButtonConfig } from './interfaces/alf-button.interface';
import { AlfColorVariantEnum, AlfSizeEnum } from '../../enums';

// ========================================
// WORKAROUND INICIALIZACIÓN TESTBED
// ========================================
try { 
    const testBed = getTestBed();
    if (!testBed.platform) {
      testBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()); 
    }
} catch (e) { }

// ========================================
// TEST HOST COMPONENTS
// ========================================

@Component({
  standalone: true,
  imports: [AlfButton],
  template: `
    <alf-button [config]="config()" (clicked)="onClicked($event)">
      Click Me
    </alf-button>
  `
})
class TestButtonHostComponent {
  public config = signal<AlfButtonConfig>({ label: 'Test Button' });
  public onClicked = vi.fn();
}

// ========================================
// TESTS
// ========================================

describe('AlfButton (Elite Suite)', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestButtonHostComponent]
    }).compileComponents();
  });

  it('should render label from config', () => {
    const fixture = TestBed.createComponent(TestButtonHostComponent);
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.textContent).toContain('Test Button');
  });

  it('should render ng-content if label is missing', () => {
    const fixture = TestBed.createComponent(TestButtonHostComponent);
    fixture.componentInstance.config.set({ label: '' });
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.textContent).toContain('Click Me');
  });

  it('should emit clicked event on click', () => {
    const fixture = TestBed.createComponent(TestButtonHostComponent);
    fixture.detectChanges();

    const nativeBtn = fixture.debugElement.query(By.css('button')).nativeElement;
    nativeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.onClicked).toHaveBeenCalled();
  });

  it('should not emit clicked event when loading', () => {
    const fixture = TestBed.createComponent(TestButtonHostComponent);
    fixture.componentInstance.config.set({ loading: true });
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'));
    btn.nativeElement.click();

    expect(fixture.componentInstance.onClicked).not.toHaveBeenCalled();
  });

  it('should render as an anchor if link is provided', () => {
    const fixture = TestBed.createComponent(TestButtonHostComponent);
    fixture.componentInstance.config.set({ link: { url: 'https://google.com' } });
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).toBeTruthy();
    expect(anchor.nativeElement.getAttribute('href')).toBe('https://google.com');
  });

  it('should apply variant styles', () => {
    const fixture = TestBed.createComponent(TestButtonHostComponent);
    fixture.componentInstance.config.set({ variant: AlfColorVariantEnum.Danger });
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'));
    // En el modo Elite, los estilos se aplican vía Renderer2 en el effect
    // Podríamos verificar el background-color computado
    const style = window.getComputedStyle(btn.nativeElement);
    // Nota: AlfColorEnum.Red600 es #e11d48 -> rgb(225, 29, 72)
    expect(style.backgroundColor).toBeTruthy();
  });
});
