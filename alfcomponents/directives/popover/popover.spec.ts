import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { Component, signal } from '@angular/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AlfPopover, AlfPopoverConfig } from './popover';

// ========================================
// WORKAROUND INICIALIZACIÓN TESTBED (Regla #439)
// ========================================
try { 
  const testBed = getTestBed();
  if (!testBed.platform) {
    testBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()); 
  }
} catch (e) { }

// ========================================
// MOCK PARA WEB ANIMATIONS API MEJORADO
// ========================================
if (typeof window !== 'undefined' && !HTMLElement.prototype.animate) {
  HTMLElement.prototype.animate = vi.fn().mockImplementation(() => {
    const animation = {
      _onfinish: null as any,
      get onfinish() { return this._onfinish; },
      set onfinish(cb: any) { 
        this._onfinish = cb;
        // Forzamos la ejecución asíncrona para simular el final de la animación
        setTimeout(() => { if (this._onfinish) this._onfinish(); }, 0);
      },
      finished: Promise.resolve(),
      cancel: vi.fn(),
      play: vi.fn()
    };
    return animation;
  }) as any;
}

@Component({
  selector: 'test-host-popover',
  standalone: true,
  imports: [AlfPopover],
  template: `
    <button id="trigger" [alfPopover]="config()">Hover me</button>
  `
})
class TestHostPopoverComponent {
  public config = signal<AlfPopoverConfig>({ text: 'Popover Content', trigger: 'hover' });
}

describe('AlfPopover Directive', () => {
  let fixture: ComponentFixture<TestHostPopoverComponent>;
  let component: TestHostPopoverComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostPopoverComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    // Limpieza profunda de popovers huérfanos
    document.querySelectorAll('[id^="alf-popover-"]').forEach(el => el.remove());
  });

  it('should show popover on hover after delay', async () => {
    const trigger = fixture.debugElement.query(By.css('#trigger'));
    
    trigger.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')).toBeFalsy();

    vi.advanceTimersByTime(350);
    fixture.detectChanges();
    
    // Procesar el setTimeout(0) del mock de animación
    vi.runOnlyPendingTimers(); 

    const popover = document.querySelector('[role="tooltip"]');
    expect(popover).toBeTruthy();
    expect(popover?.textContent).toContain('Popover Content');
  });

  it('should hide popover on mouseleave after short delay', async () => {
    const trigger = fixture.debugElement.query(By.css('#trigger'));
    
    // 1. Mostrar
    trigger.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(350);
    vi.runOnlyPendingTimers();
    fixture.detectChanges();
    expect(document.querySelector('[role="tooltip"]')).toBeTruthy();

    // 2. Salir
    trigger.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    
    // Delay de lógica (100ms)
    vi.advanceTimersByTime(150);
    fixture.detectChanges();
    
    // Forzamos la ejecución del mock de animación
    vi.runOnlyPendingTimers();
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')).toBeFalsy();
  });

  it('should respect click trigger', async () => {
    component.config.set({ text: 'Click Popover', trigger: 'click' });
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('#trigger'));
    
    // Click para mostrar
    trigger.nativeElement.click();
    fixture.detectChanges();
    
    vi.advanceTimersByTime(100);
    vi.runOnlyPendingTimers();
    fixture.detectChanges();
    
    expect(document.querySelector('[role="dialog"]')).toBeTruthy();

    // Click para ocultar
    trigger.nativeElement.click();
    fixture.detectChanges();
    
    vi.advanceTimersByTime(200);
    vi.runOnlyPendingTimers();
    fixture.detectChanges();
    
    expect(document.querySelector('[role="dialog"]')).toBeFalsy();
  });
});
