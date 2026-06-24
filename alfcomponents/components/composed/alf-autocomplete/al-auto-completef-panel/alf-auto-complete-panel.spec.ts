import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AlfAutoCompletefPanel } from './alf-auto-complete-panel';
import { AlfSelectOption } from '../interfaces/alf-auto-complete-options-interface';
import { AlfColorVariantEnum } from '@alfcomponents/enums';

// ─── Constants ───────────────────────────────────────────────────────────────

const SIMPLE_OPTIONS: AlfSelectOption[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
];

const GROUPED_OPTIONS: AlfSelectOption[] = [
  { value: 'es', label: 'España',  group: 'Europa' },
  { value: 'fr', label: 'Francia', group: 'Europa' },
  { value: 'us', label: 'USA',     group: 'América' },
];

// ─── Host wrapper factory ─────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [AlfAutoCompletefPanel],
  template: `
    <alf-auto-complete-panel
      [options]="options"
      [variant]="variant"
      [disabled]="disabled"
      [isExiting]="isExiting"
      (optionSelected)="lastSelected = $event"
    />
  `,
})
class HostComponent {
  options: AlfSelectOption[] = SIMPLE_OPTIONS;
  variant: AlfColorVariantEnum | undefined = undefined;
  disabled = false;
  isExiting = false;
  lastSelected: AlfSelectOption | null = null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function createFixture(options?: Partial<HostComponent>): Promise<{
  fixture: ComponentFixture<HostComponent>;
  host: HostComponent;
  panelComp: AlfAutoCompletefPanel;
}> {
  const fixture = TestBed.createComponent(HostComponent);
  const host = fixture.componentInstance;
  if (options) Object.assign(host, options);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  const panelComp = fixture.debugElement
    .query(By.directive(AlfAutoCompletefPanel))
    .componentInstance as AlfAutoCompletefPanel;
  return { fixture, host, panelComp };
}

// ─── Suite ───────────────────────────────────────────────────────────────────

describe('AlfAutoCompletefPanel', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
  });

  // ── Basic creation ──────────────────────────────────────────────────────

  it('should create the panel component', async () => {
    const { fixture } = await createFixture();
    const panel = fixture.debugElement.query(By.directive(AlfAutoCompletefPanel));
    expect(panel).toBeTruthy();
  });

  // ── Options rendering ───────────────────────────────────────────────────

  it('should render all provided options', async () => {
    const { fixture } = await createFixture();
    const items = fixture.debugElement.queryAll(By.css('.alf-autocomplete-option'));
    expect(items.length).toBe(SIMPLE_OPTIONS.length);
  });

  it('should render option labels correctly', async () => {
    const { fixture } = await createFixture();
    const items = fixture.debugElement.queryAll(By.css('.alf-autocomplete-option'));
    const labels = items.map(el => el.nativeElement.textContent.trim());
    expect(labels).toContain('Alpha');
    expect(labels).toContain('Beta');
    expect(labels).toContain('Gamma');
  });

  it('should show empty state when no options provided', async () => {
    const { fixture } = await createFixture({ options: [] });
    const empty = fixture.debugElement.query(By.css('.alf-autocomplete-empty'));
    expect(empty).toBeTruthy();
    expect(empty.nativeElement.textContent).toContain('Sin resultados');
  });

  // ── Disabled option ─────────────────────────────────────────────────────

  it('should mark disabled options with the CSS modifier class', async () => {
    const { fixture } = await createFixture();
    const disabledItems = fixture.debugElement.queryAll(
      By.css('.alf-autocomplete-option--disabled'),
    );
    expect(disabledItems.length).toBe(1);
  });

  it('should NOT emit optionSelected when a disabled option is clicked', async () => {
    const { fixture, panelComp } = await createFixture();
    const spy = vi.fn();
    panelComp.optionSelected.subscribe(spy);
    const disabledItem = fixture.debugElement.query(
      By.css('.alf-autocomplete-option--disabled'),
    );
    disabledItem.nativeElement.click();
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  // ── Selection ───────────────────────────────────────────────────────────

  it('should emit optionSelected with the correct option on click', async () => {
    const { fixture, panelComp } = await createFixture();
    const spy = vi.fn();
    panelComp.optionSelected.subscribe(spy);
    const items = fixture.debugElement.queryAll(By.css('.alf-autocomplete-option'));
    items[0].nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(SIMPLE_OPTIONS[0]);
  });

  // ── Grouping ────────────────────────────────────────────────────────────

  it('should render group headers when options have groups', async () => {
    const { fixture } = await createFixture({ options: GROUPED_OPTIONS });
    const headers = fixture.debugElement.queryAll(By.css('.alf-autocomplete-group-header'));
    expect(headers.length).toBe(2);
    const texts = headers.map(h => h.nativeElement.textContent.trim());
    expect(texts).toContain('Europa');
    expect(texts).toContain('América');
  });

  it('should not render group headers when options have no group', async () => {
    const { fixture } = await createFixture({ options: SIMPLE_OPTIONS });
    const headers = fixture.debugElement.queryAll(By.css('.alf-autocomplete-group-header'));
    expect(headers.length).toBe(0);
  });

  // ── groupedOptions computed ──────────────────────────────────────────────

  it('groupedOptions() should produce one group with name=null for ungrouped options', async () => {
    const { panelComp } = await createFixture({ options: SIMPLE_OPTIONS });
    const grouped = (panelComp as any).groupedOptions();
    expect(grouped.length).toBe(1);
    expect(grouped[0].name).toBeNull();
    expect(grouped[0].options.length).toBe(SIMPLE_OPTIONS.length);
  });

  it('groupedOptions() should produce correct groups from grouped options', async () => {
    const { panelComp } = await createFixture({ options: GROUPED_OPTIONS });
    const grouped = (panelComp as any).groupedOptions();
    expect(grouped.length).toBe(2);
    const europeGroup = grouped.find((g: any) => g.name === 'Europa');
    expect(europeGroup?.options.length).toBe(2);
  });

  // ── Disabled container class ─────────────────────────────────────────────

  it('should add --disabled modifier class to container when disabled=true', async () => {
    const { fixture } = await createFixture({ disabled: true });
    const container = fixture.debugElement.query(By.css('.alf-ac-p--disabled'));
    expect(container).toBeTruthy();
  });

  it('should NOT have --disabled modifier class when disabled=false', async () => {
    const { fixture } = await createFixture({ disabled: false });
    const container = fixture.debugElement.query(By.css('.alf-ac-p--disabled'));
    expect(container).toBeNull();
  });

  // ── Variant defaults ─────────────────────────────────────────────────────

  it('should fall back to SecondaryOutline when no variant is provided', async () => {
    const { panelComp } = await createFixture();
    expect((panelComp as any).getVariantColor()).toBe(AlfColorVariantEnum.SecondaryOutline);
  });

  it('should render correctly with a solid variant', async () => {
    const { fixture } = await createFixture({ variant: AlfColorVariantEnum.Primary });
    const panel = fixture.debugElement.query(By.directive(AlfAutoCompletefPanel));
    expect(panel).toBeTruthy();
  });

  it('should map ghost variant to its soft equivalent internally', async () => {
    const { panelComp } = await createFixture({ variant: AlfColorVariantEnum.GhostPrimary });
    const config = (panelComp as any).predefinedConfig();
    expect(config).toBeTruthy();
  });

  // ── Scroll container ─────────────────────────────────────────────────────

  it('should render the outer container with class alf-ac-p', async () => {
    const { fixture } = await createFixture();
    const container = fixture.debugElement.query(By.css('.alf-ac-p'));
    expect(container).toBeTruthy();
  });

  // ── Animation config ─────────────────────────────────────────────────────

  it('should default animation duration to 350ms when none is provided', async () => {
    const { panelComp } = await createFixture();
    const anims = (panelComp as any).animationsComputed();
    expect(anims.duration).toBe('350ms');
  });
});
