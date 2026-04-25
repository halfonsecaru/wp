import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AlfTabsComponent } from './alf-tabs';
import { AlfTabComponent } from './alf-tab/alf-tab';
import { AlfTabContentComponent } from './alf-tab-content/alf-tab-content';

@Component({
  standalone: true,
  imports: [AlfTabsComponent, AlfTabComponent, AlfTabContentComponent],
  template: `
    <alf-tabs [activeIndex]="activeIndex" (activeIndexChange)="onActiveIndexChange($event)" (tabChange)="onTabChange($event)">
      <alf-tab [index]="0" [defineComponent]="{ label: 'Tab 1' }"></alf-tab>
      <alf-tab [index]="1" [defineComponent]="{ label: 'Tab 2' }"></alf-tab>
      
      <alf-tab-content [index]="0">Content 1</alf-tab-content>
      <alf-tab-content [index]="1">Content 2</alf-tab-content>
    </alf-tabs>
  `
})
class TestHostComponent {
  activeIndex = 0;
  onTabChange = vi.fn();
  onActiveIndexChange(idx: number) {
    this.activeIndex = idx;
  }
}

describe('AlfTabs (Composed)', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the host and tabs component', () => {
    const tabsEl = fixture.debugElement.query(By.directive(AlfTabsComponent));
    expect(tabsEl).toBeTruthy();
  });

  it('should render correct number of tab headers', () => {
    const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
    expect(headers.length).toBe(2);
  });

  it('should show the active content and hide others', () => {
    const manualContents = fixture.debugElement.queryAll(By.directive(AlfTabContentComponent));
    expect(manualContents[0].componentInstance.isActive()).toBe(true);
    expect(manualContents[1].componentInstance.isActive()).toBe(false);
  });

  it('should change tab on click', async () => {
    const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
    const secondTabButton = headers[1].query(By.css('button'));
    
    secondTabButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(hostComponent.activeIndex).toBe(1);
    expect(hostComponent.onTabChange).toHaveBeenCalledWith(1);
  });

  it('should navigate with keyboard (ArrowRight)', async () => {
    const tabsEl = fixture.debugElement.query(By.directive(AlfTabsComponent));
    
    tabsEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(hostComponent.activeIndex).toBe(1);
  });

  it('should navigate with keyboard (Home)', async () => {
    // Set to 1 first
    hostComponent.activeIndex = 1;
    fixture.detectChanges();
    await fixture.whenStable();
    
    const tabsEl = fixture.debugElement.query(By.directive(AlfTabsComponent));
    tabsEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    
    fixture.detectChanges();
    await fixture.whenStable();

    expect(hostComponent.activeIndex).toBe(0);
  });

  it('should support circular navigation if enabled', async () => {
    const tabsEl = fixture.debugElement.query(By.directive(AlfTabsComponent));
    hostComponent.activeIndex = 1; // Last tab
    tabsEl.componentInstance.defineComponent = { behavior: { circularNavigation: true } };
    
    fixture.detectChanges();
    await fixture.whenStable();

    // ArrowRight on last tab -> back to 0
    tabsEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(hostComponent.activeIndex).toBe(0);

    // ArrowLeft on 0 -> back to last
    tabsEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(hostComponent.activeIndex).toBe(1);
  });

  it('should update ARIA selected state on headers', async () => {
    const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
    const button0 = headers[0].query(By.css('button')).nativeElement;
    const button1 = headers[1].query(By.css('button')).nativeElement;

    expect(button0.getAttribute('aria-selected')).toBe('true');
    expect(button1.getAttribute('aria-selected')).toBe('false');

    button1.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(button0.getAttribute('aria-selected')).toBe('false');
    expect(button1.getAttribute('aria-selected')).toBe('true');
  });

  it('should announce tab change in aria-live region', async () => {
    const liveRegion = fixture.debugElement.query(By.css('.alf-tabs__aria-live')).nativeElement;
    const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
    
    headers[1].query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(liveRegion.textContent).toContain('Tab 2');
    expect(liveRegion.textContent).toContain('seleccionada');
  });
});
