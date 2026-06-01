import { describe, beforeEach, it, expect } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AlfTabsContainerComponent } from './alf-tabs-container';
import { AlfTabComponent } from './components/alf-tab/alf-tab';

@Component({
  standalone: true,
  imports: [AlfTabsContainerComponent, AlfTabComponent],
  template: `
    <alf-tabs-container [(activeIndex)]="activeIndex">
      <alf-tab tabName="Tab 1" label="Tab One">
        <p>Content 1</p>
      </alf-tab>
      <alf-tab tabName="Tab 2" label="Tab Two">
        <p>Content 2</p>
      </alf-tab>
      <alf-tab tabName="Tab 3" label="Tab Three" [disabled]="true">
        <p>Content 3</p>
      </alf-tab>
    </alf-tabs-container>
  `
})
class TestHostComponent {
  activeIndex = 0;
}

describe('AlfTabsContainerComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let containerComponent: AlfTabsContainerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, AlfTabsContainerComponent, AlfTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    const containerEl = fixture.debugElement.query(By.directive(AlfTabsContainerComponent));
    containerComponent = containerEl.componentInstance;
  });

  it('should create the tabs container and display all tabs', () => {
    const containerEl = fixture.debugElement.query(By.css('.alf-tabs-container'));
    expect(containerEl).toBeTruthy();

    const buttons = fixture.debugElement.queryAll(By.css('.alf-tab-header-button'));
    expect(buttons.length).toBe(3);
    expect(buttons[0].nativeElement.textContent.trim()).toBe('Tab One');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('Tab Two');
    expect(buttons[2].nativeElement.textContent.trim()).toBe('Tab Three');
  });

  it('should initialize with activeIndex from the parent host', () => {
    const activeTabButton = fixture.debugElement.query(By.css('.alf-tab-header-button.alf-tab-active'));
    expect(activeTabButton).toBeTruthy();
    expect(activeTabButton.nativeElement.textContent.trim()).toBe('Tab One');
    expect(containerComponent.activeIndex()).toBe(0);
  });

  it('should change active tab when a tab button is clicked', async () => {
    const buttons = fixture.debugElement.queryAll(By.css('.alf-tab-header-button'));
    
    // Click the second tab
    buttons[1].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(containerComponent.activeIndex()).toBe(1);
    expect(hostComponent.activeIndex).toBe(1);

    const activeTabButton = fixture.debugElement.query(By.css('.alf-tab-header-button.alf-tab-active'));
    expect(activeTabButton.nativeElement.textContent.trim()).toBe('Tab Two');
  });

  it('should NOT change tab or select when clicking a disabled tab button', async () => {
    const buttons = fixture.debugElement.queryAll(By.css('.alf-tab-header-button'));
    expect(buttons[2].nativeElement.disabled).toBe(true);

    // Click the third (disabled) tab
    buttons[2].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    // activeIndex should remain 0
    expect(containerComponent.activeIndex()).toBe(0);
  });

  it('should navigate tabs on touch/swipe gestures', () => {
    const contentEl = fixture.debugElement.query(By.css('.alf-tabs-content-container')).nativeElement;

    // Simulate swipe left (next tab)
    const touchStartEventNext = new TouchEvent('touchstart', {
      touches: [{ clientX: 300, clientY: 100 } as any]
    });
    const touchEndEventNext = new TouchEvent('touchend', {
      changedTouches: [{ clientX: 100, clientY: 100 } as any]
    });

    contentEl.dispatchEvent(touchStartEventNext);
    contentEl.dispatchEvent(touchEndEventNext);
    fixture.detectChanges();

    expect(containerComponent.activeIndex()).toBe(1); // Goes from index 0 to index 1 (Tab 2) successfully

    // Simulate swipe right (previous tab)
    const touchStartEventPrev = new TouchEvent('touchstart', {
      touches: [{ clientX: 100, clientY: 100 } as any]
    });
    const touchEndEventPrev = new TouchEvent('touchend', {
      changedTouches: [{ clientX: 300, clientY: 100 } as any]
    });

    contentEl.dispatchEvent(touchStartEventPrev);
    contentEl.dispatchEvent(touchEndEventPrev);
    fixture.detectChanges();

    expect(containerComponent.activeIndex()).toBe(0);
  });
});

@Component({
  standalone: true,
  imports: [AlfTabsContainerComponent, AlfTabComponent],
  template: `
    <alf-tabs-container 
      [(activeIndex)]="activeIndex" 
      [orientation]="orientation"
      [keyboardActivation]="keyboardActivation"
      (tabClose)="onClose($event)"
    >
      @for (tab of list; track tab.name) {
        <alf-tab [tabName]="tab.name" [label]="tab.label" [closable]="tab.closable">
          <p>{{ tab.content }}</p>
        </alf-tab>
      }
    </alf-tabs-container>
  `
})
class TestHostAdvancedComponent {
  activeIndex = 0;
  orientation: 'horizontal' | 'vertical' = 'horizontal';
  keyboardActivation: 'automatic' | 'manual' = 'automatic';
  list = [
    { name: 't1', label: 'T One', content: 'C1', closable: true },
    { name: 't2', label: 'T Two', content: 'C2', closable: false },
    { name: 't3', label: 'T Three', content: 'C3', closable: true }
  ];
  lastClosedIndex = -1;
  onClose(index: number) {
    this.lastClosedIndex = index;
  }
}

describe('AlfTabsContainerComponent Advanced Features', () => {
  let hostComponent: TestHostAdvancedComponent;
  let fixture: ComponentFixture<TestHostAdvancedComponent>;
  let containerComponent: AlfTabsContainerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostAdvancedComponent, AlfTabsContainerComponent, AlfTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostAdvancedComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    const containerEl = fixture.debugElement.query(By.directive(AlfTabsContainerComponent));
    containerComponent = containerEl.componentInstance;
  });

  it('should support closable tabs rendering cross icon', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.alf-tab-header-button'));
    
    // First tab (closable: true) should have a close button
    const closeBtn1 = buttons[0].query(By.css('.alf-tab-close-btn'));
    expect(closeBtn1).toBeTruthy();

    // Second tab (closable: false) should NOT have a close button
    const closeBtn2 = buttons[1].query(By.css('.alf-tab-close-btn'));
    expect(closeBtn2).toBeFalsy();
  });

  it('should emit tabClose when close icon is clicked', async () => {
    const buttons = fixture.debugElement.queryAll(By.css('.alf-tab-header-button'));
    const closeBtn1 = buttons[0].query(By.css('.alf-tab-close-btn')).nativeElement;

    closeBtn1.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(hostComponent.lastClosedIndex).toBe(0);
  });

  it('should handle circular keyboard navigation with ArrowRight/ArrowLeft (automatic activation)', async () => {
    const buttons = fixture.debugElement.queryAll(By.css('.alf-tab-header-button'));
    const firstButton = buttons[0].nativeElement;

    // Press ArrowRight on first tab button
    const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    firstButton.dispatchEvent(arrowRightEvent);
    fixture.detectChanges();
    await fixture.whenStable();

    // With automatic activation, index should move to 1
    expect(containerComponent.activeIndex()).toBe(1);

    // Press End on second tab button to jump to last tab
    const endEvent = new KeyboardEvent('keydown', { key: 'End' });
    buttons[1].nativeElement.dispatchEvent(endEvent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(containerComponent.activeIndex()).toBe(2);
  });

@Component({
  standalone: true,
  imports: [AlfTabsContainerComponent, AlfTabComponent],
  template: `
    <alf-tabs-container orientation="vertical">
      <alf-tab tabName="t1" label="T One">
        <p>C1</p>
      </alf-tab>
    </alf-tabs-container>
  `
})
class TestHostVerticalComponent {}

  it('should support vertical orientation', async () => {
    const verticalFixture = TestBed.createComponent(TestHostVerticalComponent);
    verticalFixture.detectChanges();
    await verticalFixture.whenStable();

    const containerEl = verticalFixture.debugElement.query(By.css('.alf-tabs-container'));
    expect(containerEl.nativeElement.classList.contains('alf-tabs-container--vertical')).toBe(true);
  });
});

