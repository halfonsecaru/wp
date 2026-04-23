import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, signal } from '@angular/core';
import { AlfTabsComponent } from './alf-tabs';
import { AlfTabComponent } from './alf-tab/alf-tab';
import { AlfTabContentComponent } from './alf-tab-content/alf-tab-content';

// ========================================
// HOST DE PRUEBAS: Modo Manual (alf-tab + alf-tab-content separados)
// ========================================
@Component({
  standalone: true,
  imports: [AlfTabsComponent, AlfTabComponent, AlfTabContentComponent],
  template: `
    <alf-tabs [activeIndex]="activeIndex" (activeIndexChange)="onActiveIndexChange($event)" (tabChange)="onTabChange($event)" [defineComponent]="{ behavior: { animationDuration: 0 } }">
      <alf-tab [index]="0" [defineComponent]="{ label: 'Tab 1' }"></alf-tab>
      <alf-tab [index]="1" [defineComponent]="{ label: 'Tab 2' }"></alf-tab>
      <alf-tab [index]="2" [defineComponent]="{ label: 'Tab 3' }"></alf-tab>
      
      <alf-tab-content [index]="0">Content 1</alf-tab-content>
      <alf-tab-content [index]="1">Content 2</alf-tab-content>
      <alf-tab-content [index]="2">Content 3</alf-tab-content>
    </alf-tabs>
  `
})
class TestHostManualComponent {
  activeIndex = 0;
  onTabChange = vi.fn();
  onActiveIndexChange(idx: number) {
    this.activeIndex = idx;
  }
}

// ========================================
// HOST DE PRUEBAS: Modo Anidado (contenido dentro de alf-tab)
// ========================================
@Component({
  standalone: true,
  imports: [AlfTabsComponent, AlfTabComponent],
  template: `
    <alf-tabs [activeIndex]="activeIndex" (activeIndexChange)="onActiveIndexChange($event)" [defineComponent]="{ behavior: { animationDuration: 0 } }">
      <alf-tab [defineComponent]="{ label: 'Nested 1' }">Nested Content 1</alf-tab>
      <alf-tab [defineComponent]="{ label: 'Nested 2' }">Nested Content 2</alf-tab>
    </alf-tabs>
  `
})
class TestHostNestedComponent {
  activeIndex = 0;
  onActiveIndexChange(idx: number) {
    this.activeIndex = idx;
  }
}

// ========================================
// HOST DE PRUEBAS: Tabs con disabled
// ========================================
@Component({
  standalone: true,
  imports: [AlfTabsComponent, AlfTabComponent, AlfTabContentComponent],
  template: `
    <alf-tabs [activeIndex]="activeIndex" (activeIndexChange)="onActiveIndexChange($event)" [defineComponent]="{ behavior: { animationDuration: 0 } }">
      <alf-tab [index]="0" [defineComponent]="{ label: 'Normal' }"></alf-tab>
      <alf-tab [index]="1" [defineComponent]="{ label: 'Disabled', disabled: true }"></alf-tab>
      
      <alf-tab-content [index]="0">Content Normal</alf-tab-content>
      <alf-tab-content [index]="1">Content Disabled</alf-tab-content>
    </alf-tabs>
  `
})
class TestHostDisabledComponent {
  activeIndex = 0;
  onActiveIndexChange(idx: number) {
    this.activeIndex = idx;
  }
}

// ============================================================
// SELECTOR CORRECTO: El template de alf-tab usa <div class="alf-tab__header">,
// NO un <button>. Todos los queries deben usar '.alf-tab__header'.
// ============================================================
const TAB_HEADER_SELECTOR = '.alf-tab__header';

describe('AlfTabs (Composed)', () => {
  let fixture: ComponentFixture<TestHostManualComponent>;
  let hostComponent: TestHostManualComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostManualComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostManualComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ========================================
  // 1. CREACIÓN Y ESTRUCTURA
  // ========================================
  describe('Creation & Structure', () => {
    it('should create the host and tabs component', () => {
      const tabsEl = fixture.debugElement.query(By.directive(AlfTabsComponent));
      expect(tabsEl).toBeTruthy();
    });

    it('should render correct number of tab headers', () => {
      const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
      expect(headers.length).toBe(3);
    });

    it('should render correct number of content panels', () => {
      const contents = fixture.debugElement.queryAll(By.directive(AlfTabContentComponent));
      expect(contents.length).toBe(3);
    });

    it('should render the tab labels correctly', () => {
      const labels = fixture.debugElement.queryAll(By.css('.alf-tab__label'));
      expect(labels[0].nativeElement.textContent.trim()).toBe('Tab 1');
      expect(labels[1].nativeElement.textContent.trim()).toBe('Tab 2');
      expect(labels[2].nativeElement.textContent.trim()).toBe('Tab 3');
    });

    it('should have a tablist nav element', () => {
      const nav = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(nav).toBeTruthy();
    });

    it('should have an aria-live region for announcements', () => {
      const liveRegion = fixture.debugElement.query(By.css('.alf-tabs__aria-live'));
      expect(liveRegion).toBeTruthy();
      expect(liveRegion.nativeElement.getAttribute('aria-live')).toBe('polite');
    });

    it('should have a sliding indicator element', () => {
      const indicator = fixture.debugElement.query(By.css('.alf-tabs__indicator'));
      expect(indicator).toBeTruthy();
    });
  });

  // ========================================
  // 2. ESTADO ACTIVO Y CONTENIDO
  // ========================================
  describe('Active State & Content', () => {
    it('should show the active content and hide others', () => {
      const manualContents = fixture.debugElement.queryAll(By.directive(AlfTabContentComponent));
      expect(manualContents[0].componentInstance.isActive()).toBe(true);
      expect(manualContents[1].componentInstance.isActive()).toBe(false);
      expect(manualContents[2].componentInstance.isActive()).toBe(false);
    });

    it('should mark the first tab header as active by default', () => {
      const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
      expect(headers[0].componentInstance.isActive()).toBe(true);
      expect(headers[1].componentInstance.isActive()).toBe(false);
    });

    it('should change tab on click', async () => {
      const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
      const secondTabHeader = headers[1].query(By.css(TAB_HEADER_SELECTOR));
      
      secondTabHeader.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(hostComponent.activeIndex).toBe(1);
      expect(hostComponent.onTabChange).toHaveBeenCalledWith(1);
    });

    it('should update content visibility after tab change', async () => {
      const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
      headers[2].query(By.css(TAB_HEADER_SELECTOR)).nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const manualContents = fixture.debugElement.queryAll(By.directive(AlfTabContentComponent));
      expect(manualContents[0].componentInstance.isActive()).toBe(false);
      expect(manualContents[1].componentInstance.isActive()).toBe(false);
      expect(manualContents[2].componentInstance.isActive()).toBe(true);
    });

    it('should emit tabChange output on selection', async () => {
      const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
      headers[1].query(By.css(TAB_HEADER_SELECTOR)).nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(hostComponent.onTabChange).toHaveBeenCalledWith(1);
    });
  });

  // ========================================
  // 3. ACCESIBILIDAD (ARIA)
  // ========================================
  describe('Accessibility (ARIA)', () => {
    it('should set role="tab" on each tab header', () => {
      const tabHeaders = fixture.debugElement.queryAll(By.css(TAB_HEADER_SELECTOR));
      tabHeaders.forEach(header => {
        expect(header.nativeElement.getAttribute('role')).toBe('tab');
      });
    });

    it('should update ARIA selected state on headers', async () => {
      const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
      const header0 = headers[0].query(By.css(TAB_HEADER_SELECTOR)).nativeElement;
      const header1 = headers[1].query(By.css(TAB_HEADER_SELECTOR)).nativeElement;

      expect(header0.getAttribute('aria-selected')).toBe('true');
      expect(header1.getAttribute('aria-selected')).toBe('false');

      header1.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(header0.getAttribute('aria-selected')).toBe('false');
      expect(header1.getAttribute('aria-selected')).toBe('true');
    });

    it('should set aria-controls on tab headers linking to panel IDs', () => {
      const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
      const contents = fixture.debugElement.queryAll(By.directive(AlfTabContentComponent));

      headers.forEach((header, i) => {
        const ariaControls = header.query(By.css(TAB_HEADER_SELECTOR)).nativeElement.getAttribute('aria-controls');
        const panelId = contents[i].query(By.css('[role="tabpanel"]'))?.nativeElement?.getAttribute('id');
        if (panelId) {
          expect(ariaControls).toBe(panelId);
        }
      });
    });

    it('should set tabindex on tab headers', () => {
      const tabHeaders = fixture.debugElement.queryAll(By.css(TAB_HEADER_SELECTOR));
      tabHeaders.forEach(header => {
        const tabindex = header.nativeElement.getAttribute('tabindex');
        expect(tabindex).toBe('0');
      });
    });

    it('should announce tab change in aria-live region', async () => {
      const liveRegion = fixture.debugElement.query(By.css('.alf-tabs__aria-live')).nativeElement;
      const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
      
      headers[1].query(By.css(TAB_HEADER_SELECTOR)).nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(liveRegion.textContent).toContain('Tab 2');
      expect(liveRegion.textContent).toContain('seleccionada');
    });
  });

  // ========================================
  // 4. NAVEGACIÓN POR TECLADO
  // ========================================
  describe('Keyboard Navigation', () => {
    it('should navigate to last tab with End', async () => {
      const tabsEl = fixture.debugElement.query(By.directive(AlfTabsComponent));
      tabsEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(hostComponent.activeIndex).toBe(2);
    });

    it('should not go below 0 with ArrowLeft when at first tab (non-circular)', async () => {
      const tabsEl = fixture.debugElement.query(By.directive(AlfTabsComponent));
      tabsEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(hostComponent.activeIndex).toBe(0);
    });

    it('should not exceed max with ArrowRight when at last tab (non-circular)', async () => {
      hostComponent.activeIndex = 2;
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const tabsEl = fixture.debugElement.query(By.directive(AlfTabsComponent));
      tabsEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(hostComponent.activeIndex).toBe(2);
    });

    it('should support circular navigation when enabled', async () => {
      const tabsEl = fixture.debugElement.query(By.directive(AlfTabsComponent));
      tabsEl.componentInstance.defineComponent = { behavior: { circularNavigation: true, animationDuration: 0 } };
      hostComponent.activeIndex = 2; // Last tab
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      // ArrowRight on last tab -> back to 0
      tabsEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(hostComponent.activeIndex).toBe(0);

      // ArrowLeft on 0 -> back to last
      tabsEl.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      
      expect(hostComponent.activeIndex).toBe(2);
    });

    it('should select tab via Enter key on header', async () => {
      const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
      const secondHeader = headers[1].query(By.css(TAB_HEADER_SELECTOR));
      
      secondHeader.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(hostComponent.activeIndex).toBe(1);
    });

    it('should select tab via Space key on header', async () => {
      const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
      const secondHeader = headers[1].query(By.css(TAB_HEADER_SELECTOR));
      
      secondHeader.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(hostComponent.activeIndex).toBe(1);
    });
  });

  // ========================================
  // 5. ÍNDICES Y AUTO-INDEXING
  // ========================================
  describe('Indexing', () => {
    it('should assign unique panel IDs to each tab', () => {
      const tabsComp = fixture.debugElement.query(By.directive(AlfTabsComponent)).componentInstance as AlfTabsComponent;
      const id0 = tabsComp.getPanelId(0);
      const id1 = tabsComp.getPanelId(1);
      const id2 = tabsComp.getPanelId(2);

      expect(id0).not.toBe(id1);
      expect(id1).not.toBe(id2);
      expect(id0).toContain('panel-0');
      expect(id1).toContain('panel-1');
    });

    it('should assign unique tab IDs', () => {
      const tabsComp = fixture.debugElement.query(By.directive(AlfTabsComponent)).componentInstance as AlfTabsComponent;
      const id0 = tabsComp.getTabId(0);
      const id1 = tabsComp.getTabId(1);

      expect(id0).not.toBe(id1);
      expect(id0).toContain('tab-0');
    });
  });
});

// ============================================================
// MODO ANIDADO (Contenido dentro de <alf-tab>)
// ============================================================
describe('AlfTabs (Nested Mode)', () => {
  let fixture: ComponentFixture<TestHostNestedComponent>;
  let hostComponent: TestHostNestedComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostNestedComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostNestedComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render nested tabs without alf-tab-content', () => {
    const tabsEl = fixture.debugElement.query(By.directive(AlfTabsComponent));
    expect(tabsEl).toBeTruthy();

    const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
    expect(headers.length).toBe(2);
  });

  it('should detect nested mode when no manual contents exist', () => {
    const tabsComp = fixture.debugElement.query(By.directive(AlfTabsComponent)).componentInstance as AlfTabsComponent;
    expect(tabsComp.isNestedModeComputed()).toBe(true);
  });

  it('should auto-index tabs when no explicit index is provided', () => {
    const tabs = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
    expect(tabs[0].componentInstance.effectiveIndex()).toBe(0);
    expect(tabs[1].componentInstance.effectiveIndex()).toBe(1);
  });

  it('should change nested tab on click', async () => {
    const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
    headers[1].query(By.css(TAB_HEADER_SELECTOR)).nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(hostComponent.activeIndex).toBe(1);
    expect(headers[0].componentInstance.isActive()).toBe(false);
    expect(headers[1].componentInstance.isActive()).toBe(true);
  });
});

// ============================================================
// TABS CON DISABLED
// ============================================================
describe('AlfTabs (Disabled State)', () => {
  let fixture: ComponentFixture<TestHostDisabledComponent>;
  let hostComponent: TestHostDisabledComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostDisabledComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostDisabledComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not change to a disabled tab on click', async () => {
    const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
    headers[1].query(By.css(TAB_HEADER_SELECTOR)).nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    // Should remain at 0 since tab 1 is disabled
    expect(hostComponent.activeIndex).toBe(0);
  });

  it('should apply disabled class and tabindex -1 to disabled tabs', () => {
    const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
    const disabledHeader = headers[1].query(By.css(TAB_HEADER_SELECTOR)).nativeElement;

    expect(disabledHeader.classList.contains('alf-tab__header--disabled')).toBe(true);
    expect(disabledHeader.getAttribute('tabindex')).toBe('-1');
  });

  it('should apply alf-tab--disabled host class', () => {
    const headers = fixture.debugElement.queryAll(By.directive(AlfTabComponent));
    expect(headers[1].nativeElement.classList.contains('alf-tab--disabled')).toBe(true);
  });
});
