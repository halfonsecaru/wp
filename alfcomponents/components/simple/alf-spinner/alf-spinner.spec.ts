import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AlfSpinner } from './alf-spinner';
import { AlfSpinnerStrokeWidthEnum } from '../../enums';

describe('AlfSpinner', () => {
  let component: AlfSpinner;
  let fixture: ComponentFixture<AlfSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfSpinner]
    }).compileComponents();

    fixture = TestBed.createComponent(AlfSpinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ========================================
  // CREACIÓN BÁSICA
  // ========================================

  describe('Basic Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render an SVG element', () => {
      const svg = fixture.debugElement.query(By.css('svg'));
      expect(svg).toBeTruthy();
    });

    it('should have the spinner icon class on SVG', () => {
      const svg = fixture.debugElement.query(By.css('svg.alf-spinner-icon'));
      expect(svg).toBeTruthy();
    });

    it('should render a circle element inside SVG', () => {
      const circle = fixture.debugElement.query(By.css('circle'));
      expect(circle).toBeTruthy();
    });

    it('should have the spinner circle class', () => {
      const circle = fixture.debugElement.query(By.css('circle.alf-spinner-circle'));
      expect(circle).toBeTruthy();
    });
  });

  // ========================================
  // SVG ATTRIBUTES
  // ========================================

  describe('SVG Attributes', () => {
    it('should have viewBox attribute on SVG', () => {
      const svg = fixture.debugElement.query(By.css('svg'));
      expect(svg.nativeElement.getAttribute('viewBox')).toBe('0 0 24 24');
    });

    it('should have correct cx attribute on circle', () => {
      const circle = fixture.debugElement.query(By.css('circle'));
      expect(circle.nativeElement.getAttribute('cx')).toBe('12');
    });

    it('should have correct cy attribute on circle', () => {
      const circle = fixture.debugElement.query(By.css('circle'));
      expect(circle.nativeElement.getAttribute('cy')).toBe('12');
    });

    it('should have correct r (radius) attribute on circle', () => {
      const circle = fixture.debugElement.query(By.css('circle'));
      expect(circle.nativeElement.getAttribute('r')).toBe('10');
    });

    it('should have fill="none" on circle', () => {
      const circle = fixture.debugElement.query(By.css('circle'));
      expect(circle.nativeElement.getAttribute('fill')).toBe('none');
    });

    it('should have stroke="currentColor" on circle', () => {
      const circle = fixture.debugElement.query(By.css('circle'));
      expect(circle.nativeElement.getAttribute('stroke')).toBe('currentColor');
    });

    it('should have default stroke-width from enum', () => {
      const circle = fixture.debugElement.query(By.css('circle'));
      expect(circle.nativeElement.getAttribute('stroke-width')).toBe(AlfSpinnerStrokeWidthEnum.Base);
    });
  });

  // ========================================
  // HOST ELEMENT
  // ========================================

  describe('Host Element', () => {
    it('should have a native element', () => {
      expect(fixture.nativeElement).toBeTruthy();
    });

    it('should contain the SVG directly', () => {
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });
});

// ========================================
// INTEGRATION WITH PARENT COMPONENT
// ========================================

@Component({
  selector: 'test-host-spinner',
  standalone: true,
  imports: [AlfSpinner],
  template: `
    <div class="container" style="position: relative; width: 100px; height: 100px;">
      <alf-spinner></alf-spinner>
    </div>
  `
})
class TestHostSpinnerComponent { }

@Component({
  selector: 'test-host-spinner-colored',
  standalone: true,
  imports: [AlfSpinner],
  template: `
    <div class="container" style="position: relative; width: 50px; height: 50px; color: red;">
      <alf-spinner></alf-spinner>
    </div>
  `
})
class TestHostSpinnerColoredComponent { }

describe('AlfSpinner - Host Integration', () => {

  it('should render inside a parent container', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostSpinnerComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostSpinnerComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const spinner = fixture.debugElement.query(By.css('alf-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should render inside a colored container', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostSpinnerColoredComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostSpinnerColoredComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const spinner = fixture.debugElement.query(By.css('alf-spinner'));
    expect(spinner).toBeTruthy();

    const circle = fixture.debugElement.query(By.css('circle'));
    expect(circle.nativeElement.getAttribute('stroke')).toBe('currentColor');
  });

  it('should contain SVG inside parent', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostSpinnerComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostSpinnerComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const svg = fixture.debugElement.query(By.css('.container alf-spinner svg'));
    expect(svg).toBeTruthy();
  });
});
