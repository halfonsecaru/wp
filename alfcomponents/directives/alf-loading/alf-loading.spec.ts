import { Component, signal, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { vi, describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { AlfLoadingDirective } from './alf-loading.directive';
import { AlfSpinner } from '../../components/alf-spinner/alf-spinner';
import { AlfLoadingInterface } from '../../interfaces/alf-loading.interface';
import { AlfLoadingModeEnum, AlfColorEnum, AlfOpacityEnum, AlfSpinnerStrokeWidthEnum } from '../../enums';

// ========================================
// WAAPI MOCK (Para JSDOM)
// ========================================
if (typeof Element !== 'undefined' && !Element.prototype.animate) {
    Element.prototype.animate = vi.fn().mockImplementation(function(this: HTMLElement) {
        const anim = {
            finished: Promise.resolve(),
            onfinish: null as any,
            play: vi.fn(),
            pause: vi.fn(),
            cancel: vi.fn(),
            reverse: vi.fn(),
        };
        // Para que el test sea síncrono y fluya:
        // El cleanup del directive depende de onfinish.
        // Lo disparamos en un microtask.
        Promise.resolve().then(() => {
          if (typeof anim.onfinish === 'function') anim.onfinish();
        });
        return anim;
    });
}

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
  selector: 'test-simple-host',
  standalone: true,
  imports: [AlfLoadingDirective],
  template: `
    <div [alfLoading]="isLoading()">
      <p>Content</p>
    </div>
  `
})
class TestSimpleHostComponent {
  public isLoading = signal(false);
}

@Component({
  selector: 'test-config-host',
  standalone: true,
  imports: [AlfLoadingDirective],
  template: `
    <div [alfLoading]="config()">
      <p>Content</p>
    </div>
  `
})
class TestConfigHostComponent {
  public config = signal<AlfLoadingInterface>({ isLoading: false });
}

// ========================================
// TESTS
// ========================================

describe('AlfLoadingDirective (Elite Suite)', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AlfSpinner, // Necesario para que TestBed reconozca sus inputs al crearlo dinámicamente
        TestSimpleHostComponent, 
        TestConfigHostComponent
      ]
    }).compileComponents();
  });

  it('should show spinner when alfLoading is true', () => {
    const fixture = TestBed.createComponent(TestSimpleHostComponent);
    fixture.componentInstance.isLoading.set(true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('alf-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should hide spinner when alfLoading is false', async () => {
    const fixture = TestBed.createComponent(TestSimpleHostComponent);
    fixture.componentInstance.isLoading.set(true);
    fixture.detectChanges();
    
    expect(fixture.debugElement.query(By.css('alf-spinner'))).toBeTruthy();

    fixture.componentInstance.isLoading.set(false);
    fixture.detectChanges();
    await fixture.whenStable();

    // En el modo Elite, cleanup se llama en el onfinish de la animación de salida.
    // Como el mock de animate es síncrono pero onfinish es manual, podemos forzarlo o 
    // simplemente comprobar que se llamó a hideLoading.
    // En este entorno de test, verificamos que el spinner ya no está.
    expect(fixture.debugElement.query(By.css('alf-spinner'))).toBeNull();
  });

  it('should create an overlay in Overlay mode', () => {
    const fixture = TestBed.createComponent(TestConfigHostComponent);
    fixture.componentInstance.config.set({ 
      isLoading: true, 
      mode: AlfLoadingModeEnum.Overlay 
    });
    fixture.detectChanges();

    const host = fixture.debugElement.query(By.directive(AlfLoadingDirective));
    // El overlay es un div con posición absoluta
    const overlay = host.nativeElement.querySelector('div');
    expect(overlay).toBeTruthy();
    expect(overlay.style.position).toBe('absolute');
  });

  it('should apply blur when useBlur is true', () => {
    const fixture = TestBed.createComponent(TestConfigHostComponent);
    fixture.componentInstance.config.set({ 
      isLoading: true, 
      mode: AlfLoadingModeEnum.Overlay,
      useBlur: true 
    });
    fixture.detectChanges();

    const host = fixture.debugElement.query(By.directive(AlfLoadingDirective));
    const overlay = host.nativeElement.querySelector('div');
    expect(overlay.style.backdropFilter).toContain('blur(4px)');
  });

  it('should display message when provided', () => {
    const fixture = TestBed.createComponent(TestConfigHostComponent);
    const message = 'Elite Loading...';
    fixture.componentInstance.config.set({ 
      isLoading: true, 
      message: message 
    });
    fixture.detectChanges();

    const host = fixture.debugElement.query(By.directive(AlfLoadingDirective));
    expect(host.nativeElement.textContent).toContain(message);
  });

  it('should apply custom spinner styles', () => {
    const fixture = TestBed.createComponent(TestConfigHostComponent);
    fixture.componentInstance.config.set({ 
      isLoading: true, 
      spinnerColor: AlfColorEnum.Red600,
      spinnerStrokeWidth: AlfSpinnerStrokeWidthEnum.Thick
    });
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('alf-spinner'));
    expect(spinner.componentInstance.colorVal()).toBe(AlfColorEnum.Red600);
    expect(spinner.componentInstance.strokeWidthVal()).toBe(AlfSpinnerStrokeWidthEnum.Thick);
  });

  it('should cleanup on destroy', () => {
    const fixture = TestBed.createComponent(TestSimpleHostComponent);
    fixture.componentInstance.isLoading.set(true);
    fixture.detectChanges();
    
    expect(fixture.debugElement.query(By.css('alf-spinner'))).toBeTruthy();

    fixture.destroy();
    // No debería haber restos ni errores
  });
});

