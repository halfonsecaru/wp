import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AlfRippleDirective } from './alf-ripple.directive';
import { AlfColorEnum } from '../../enums';

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
// MOCK PARA WEB ANIMATIONS API
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
// TEST HOST COMPONENTS (Con rigor técnico)
// ========================================

@Component({
  selector: 'test-host-ripple',
  standalone: true,
  imports: [AlfRippleDirective],
  template: `
    <div class="ripple-container" alfRipple style="width: 100px; height: 100px; position: relative;">
      Basic
    </div>
  `
})
class TestHostRippleComponent { }

@Component({
  selector: 'test-host-ripple-config',
  standalone: true,
  imports: [AlfRippleDirective],
  template: `
    <div class="ripple-container" [alfRipple]="config" style="width: 100px; height: 100px; position: relative;">
      Config
    </div>
  `
})
class TestHostRippleConfigComponent { 
  public readonly config = { color: AlfColorEnum.White, duration: 1000 };
}

@Component({
  selector: 'test-host-ripple-disabled',
  standalone: true,
  imports: [AlfRippleDirective],
  template: `
    <div class="ripple-container" [alfRipple]="false" style="width: 100px; height: 100px; position: relative;">
      Disabled
    </div>
  `
})
class TestHostRippleDisabledComponent { }

// ========================================
// TESTS
// ========================================

describe('AlfRippleDirective', () => {

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('Creation & Basic Logic', () => {
    it('should create a ripple host on first click', async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostRippleComponent]
      }).compileComponents();

      const fixture = TestBed.createComponent(TestHostRippleComponent);
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ripple-container'));

      // Mock dimensiones JSDOM
      Object.defineProperty(container.nativeElement, 'clientWidth', { value: 100, configurable: true });
      Object.defineProperty(container.nativeElement, 'clientHeight', { value: 100, configurable: true });
      vi.spyOn(container.nativeElement, 'getBoundingClientRect').mockReturnValue({
        left: 0, top: 0, width: 100, height: 100
      } as DOMRect);

      container.nativeElement.click();
      fixture.detectChanges();

      expect(container.nativeElement.querySelector('.alf-ripple-host')).toBeTruthy();
    });
  });

  describe('Configuration', () => {
    it('should use custom color and duration from config signal', async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostRippleConfigComponent]
      }).compileComponents();

      const fixture = TestBed.createComponent(TestHostRippleConfigComponent);
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ripple-container'));

      Object.defineProperty(container.nativeElement, 'clientWidth', { value: 100, configurable: true });
      Object.defineProperty(container.nativeElement, 'clientHeight', { value: 100, configurable: true });
      vi.spyOn(container.nativeElement, 'getBoundingClientRect').mockReturnValue({
        left: 0, top: 0, width: 100, height: 100
      } as DOMRect);

      const animateSpy = vi.spyOn(HTMLElement.prototype, 'animate');

      container.nativeElement.click();
      fixture.detectChanges();

      const span = container.nativeElement.querySelector('.alf-ripple-host span');
      // Usamos White (CSS válido) en vez de Red500 (Tailwind class, JSDOM lo rechaza)
      expect(span.style.backgroundColor).toBe(AlfColorEnum.White);

      // Verificamos duración
      expect(animateSpy).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ duration: 1000 })
      );
    });

    it('should NOT create ripple when input is false', async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostRippleDisabledComponent]
      }).compileComponents();

      const fixture = TestBed.createComponent(TestHostRippleDisabledComponent);
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ripple-container'));
      container.nativeElement.click();
      fixture.detectChanges();

      expect(container.nativeElement.querySelector('.alf-ripple-host')).toBeFalsy();
    });
  });

  describe('Cleanup', () => {
    it('should remove the ripple span after animation finishes', async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostRippleComponent]
      }).compileComponents();

      const fixture = TestBed.createComponent(TestHostRippleComponent);
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ripple-container'));
      
      Object.defineProperty(container.nativeElement, 'clientWidth', { value: 100, configurable: true });
      Object.defineProperty(container.nativeElement, 'clientHeight', { value: 100, configurable: true });
      vi.spyOn(container.nativeElement, 'getBoundingClientRect').mockReturnValue({
        left: 0, top: 0, width: 100, height: 100
      } as DOMRect);

      let onFinishCb: any;
      vi.spyOn(HTMLElement.prototype, 'animate').mockImplementation(() => {
        return {
          set onfinish(cb: any) { onFinishCb = cb; },
          finished: Promise.resolve(),
          cancel: vi.fn(),
          play: vi.fn()
        } as any;
      });

      container.nativeElement.click();
      fixture.detectChanges();

      expect(container.nativeElement.querySelector('.alf-ripple-host span')).toBeTruthy();

      if (onFinishCb) onFinishCb();
      fixture.detectChanges();

      expect(container.nativeElement.querySelector('.alf-ripple-host span')).toBeFalsy();
    });
  });
});
