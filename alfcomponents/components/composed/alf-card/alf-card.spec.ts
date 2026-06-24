import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { AlfCardComponent } from './alf-card';
import { beforeEach, describe, expect, it } from 'vitest';

try {
  const testBed = getTestBed();
  if (!testBed.platform) {
    testBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  }
} catch (e) { }

describe('AlfCardComponent', () => {
  let component: AlfCardComponent;
  let fixture: ComponentFixture<AlfCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlfCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply default id prefix and customizable id', () => {
    fixture.detectChanges();
    const cardEl = fixture.debugElement.query(By.css('.alf-card'));
    expect(cardEl.nativeElement.getAttribute('id')).toContain('alf-card');

    fixture.componentRef.setInput('id', 'my-custom-card');
    fixture.detectChanges();
    expect(cardEl.nativeElement.getAttribute('id')).toBe('my-custom-card');
  });
});
