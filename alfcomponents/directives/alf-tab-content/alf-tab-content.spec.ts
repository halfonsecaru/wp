import { Component, TemplateRef, signal } from '@angular/core';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AlfTabContentDirective } from './alf-tab-content';

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
  imports: [AlfTabContentDirective],
  template: `
    <ng-template alfTabContent="home">
      <div class="home-content">Home Content</div>
    </ng-template>
    <ng-template alfTabContent="profile">
      <div>Profile</div>
    </ng-template>
  `
})
class TestHostComponent { }

@Component({
  standalone: true,
  imports: [AlfTabContentDirective],
  template: `
    <ng-template [alfTabContent]="tabId()">
      <div class="dynamic-content">Dynamic Content</div>
    </ng-template>
  `
})
class TestDynamicHostComponent {
  public tabId = signal('initial');
}

// ========================================
// TESTS
// ========================================

describe('AlfTabContentDirective (Elite Suite)', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TestDynamicHostComponent]
    }).compileComponents();
  });

  it('should be discovered on ng-template using By.directive', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const nodes = fixture.debugElement.queryAllNodes(By.directive(AlfTabContentDirective));
    expect(nodes.length).toBe(2);
    
    const firstDir = nodes[0].injector.get(AlfTabContentDirective);
    expect(firstDir.tabId()).toBe('home');
  });

  it('should support dynamic updates of the tabId', async () => {
    const fixture = TestBed.createComponent(TestDynamicHostComponent);
    fixture.detectChanges();

    const node = fixture.debugElement.queryAllNodes(By.directive(AlfTabContentDirective))[0];
    const directive = node.injector.get(AlfTabContentDirective);
    
    expect(directive.tabId()).toBe('initial');

    // Actualizamos usando señales (evita NG0100)
    fixture.componentInstance.tabId.set('updated');
    fixture.detectChanges();

    expect(directive.tabId()).toBe('updated');
  });

  it('should beStandalone and have TemplateRef', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    
    const node = fixture.debugElement.queryAllNodes(By.directive(AlfTabContentDirective))[0];
    const directive = node.injector.get(AlfTabContentDirective);
    
    expect(directive.templateRef).toBeInstanceOf(TemplateRef);
  });
});
