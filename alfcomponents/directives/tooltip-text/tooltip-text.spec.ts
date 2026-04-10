import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AlfTooltipTextDirective, AlfTooltipConfig} from './tooltip-text';
import { AlfPositionEnum, AlfZIndexEnum } from '../../enums';

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
// MOCK PARA WEB ANIMATIONS API (WAAPI)
// ========================================
if (typeof window !== 'undefined' && !HTMLElement.prototype.animate) {
    HTMLElement.prototype.animate = vi.fn().mockImplementation(() => {
      return {
        onfinish: null as any,
        finished: Promise.resolve(),
        cancel: vi.fn(),
        play: vi.fn()
      };
    }) as any;
  }

// ========================================
// TEST HOST COMPONENTS
// ========================================

@Component({
  selector: 'test-host-string',
  standalone: true,
  imports: [AlfTooltipTextDirective],
  template: `<button [alfTooltipText]="'Simple tooltip'">Hover me</button>`
})
class TestHostStringComponent { }

@Component({
  selector: 'test-host-config',
  standalone: true,
  imports: [AlfTooltipTextDirective],
  template: `<button [alfTooltipText]="tooltipConfig">Hover me</button>`
})
class TestHostConfigComponent {
  public tooltipConfig: AlfTooltipConfig = {
    text: 'Configured tooltip',
    position: AlfPositionEnum.Bottom,
    delay: 100
  };
}

@Component({
  selector: 'test-host-empty',
  standalone: true,
  imports: [AlfTooltipTextDirective],
  template: `<button [alfTooltipText]="''">Hover me</button>`
})
class TestHostEmptyComponent { }

// ========================================
// TESTS
// ========================================

describe('AlfTooltipTextDirective (Elite Suite)', () => {

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.querySelectorAll('[role="tooltip"]').forEach(el => el.remove());
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // ----------------------------------------------------
  // CREACIÓN Y BÁSICOS
  // ----------------------------------------------------
  describe('Creation & Inputs', () => {
    it('should create with string input', async () => {
      await TestBed.configureTestingModule({ imports: [TestHostStringComponent] }).compileComponents();
      const fixture = TestBed.createComponent(TestHostStringComponent);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.directive(AlfTooltipTextDirective))).toBeTruthy();
    });

    it('should create with config object input', async () => {
      await TestBed.configureTestingModule({ imports: [TestHostConfigComponent] }).compileComponents();
      const fixture = TestBed.createComponent(TestHostConfigComponent);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.directive(AlfTooltipTextDirective))).toBeTruthy();
    });
  });

  // ----------------------------------------------------
  // VISIBILIDAD Y TIMING
  // ----------------------------------------------------
  describe('Visibility & Delay', () => {
    it('should NOT show tooltip immediately', async () => {
      await TestBed.configureTestingModule({ imports: [TestHostStringComponent] }).compileComponents();
      const fixture = TestBed.createComponent(TestHostStringComponent);
      fixture.detectChanges();
      
      fixture.debugElement.query(By.css('button')).triggerEventHandler('mouseenter', {});
      expect(document.querySelector('[role="tooltip"]')).toBeFalsy();
    });

    it('should show tooltip after default delay (150ms)', async () => {
      await TestBed.configureTestingModule({ imports: [TestHostStringComponent] }).compileComponents();
      const fixture = TestBed.createComponent(TestHostStringComponent);
      fixture.detectChanges();
      
      fixture.debugElement.query(By.css('button')).triggerEventHandler('mouseenter', {});
      await vi.advanceTimersByTimeAsync(160);
      
      expect(document.querySelector('[role="tooltip"]')).toBeTruthy();
    });

    it('should respect custom delay from config', async () => {
      await TestBed.configureTestingModule({ imports: [TestHostConfigComponent] }).compileComponents();
      const fixture = TestBed.createComponent(TestHostConfigComponent);
      fixture.componentInstance.tooltipConfig = { 
        ...fixture.componentInstance.tooltipConfig, 
        delay: 500 
      };
      fixture.detectChanges();
      
      fixture.debugElement.query(By.css('button')).triggerEventHandler('mouseenter', {});
      await vi.advanceTimersByTimeAsync(200);
      expect(document.querySelector('[role="tooltip"]')).toBeFalsy();
      
      await vi.advanceTimersByTimeAsync(310);
      expect(document.querySelector('[role="tooltip"]')).toBeTruthy();
    });
  });

  // ----------------------------------------------------
  // INTERACCIÓN Y LIMPIEZA
  // ----------------------------------------------------
  describe('Interaction & Lifecycle', () => {
    it('should hide tooltip on mouseleave', async () => {
      await TestBed.configureTestingModule({ imports: [TestHostStringComponent] }).compileComponents();
      const fixture = TestBed.createComponent(TestHostStringComponent);
      fixture.detectChanges();
      
      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('mouseenter', {});
      await vi.advanceTimersByTimeAsync(160);
      expect(document.querySelector('[role="tooltip"]')).toBeTruthy();

      // Mock de onfinish para la animación de salida
      let onFinishCb: any;
      vi.spyOn(HTMLElement.prototype, 'animate').mockImplementation(() => {
        return {
          set onfinish(cb: any) { onFinishCb = cb; },
          finished: Promise.resolve(),
          cancel: vi.fn(),
          play: vi.fn()
        } as any;
      });

      button.triggerEventHandler('mouseleave', {});
      if (onFinishCb) onFinishCb();
      fixture.detectChanges();
      
      expect(document.querySelector('[role="tooltip"]')).toBeFalsy();
    });

    it('should cleanup on destroy', async () => {
      await TestBed.configureTestingModule({ imports: [TestHostStringComponent] }).compileComponents();
      const fixture = TestBed.createComponent(TestHostStringComponent);
      fixture.detectChanges();
      
      fixture.debugElement.query(By.css('button')).triggerEventHandler('mouseenter', {});
      await vi.advanceTimersByTimeAsync(160);
      expect(document.querySelector('[role="tooltip"]')).toBeTruthy();

      fixture.destroy();
      expect(document.querySelector('[role="tooltip"]')).toBeFalsy();
    });
  });

  // ----------------------------------------------------
  // ESTILOS Y ACCESIBILIDAD
  // ----------------------------------------------------
  describe('Styling & Accessibility', () => {
    it('should apply z-index from Enum Max', async () => {
      await TestBed.configureTestingModule({ imports: [TestHostStringComponent] }).compileComponents();
      const fixture = TestBed.createComponent(TestHostStringComponent);
      fixture.detectChanges();
      
      fixture.debugElement.query(By.css('button')).triggerEventHandler('mouseenter', {});
      await vi.advanceTimersByTimeAsync(160);
      
      const tooltip = document.querySelector('[role="tooltip"]') as HTMLElement;
      expect(tooltip.style.zIndex).toBe(AlfZIndexEnum.Max);
    });

    it('should apply fixed position for precision', async () => {
      await TestBed.configureTestingModule({ imports: [TestHostStringComponent] }).compileComponents();
      const fixture = TestBed.createComponent(TestHostStringComponent);
      fixture.detectChanges();
      
      fixture.debugElement.query(By.css('button')).triggerEventHandler('mouseenter', {});
      await vi.advanceTimersByTimeAsync(160);
      
      const tooltip = document.querySelector('[role="tooltip"]') as HTMLElement;
      expect(tooltip.style.position).toBe('fixed');
    });

    it('should link host and tooltip via aria-describedby', async () => {
      await TestBed.configureTestingModule({ imports: [TestHostStringComponent] }).compileComponents();
      const fixture = TestBed.createComponent(TestHostStringComponent);
      fixture.detectChanges();
      
      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      fixture.debugElement.query(By.css('button')).triggerEventHandler('mouseenter', {});
      await vi.advanceTimersByTimeAsync(160);
      
      const tooltip = document.querySelector('[role="tooltip"]');
      const id = tooltip?.getAttribute('id');
      expect(button.getAttribute('aria-describedby')).toBe(id);
    });
  });
});
