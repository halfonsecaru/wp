import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AlfAutocompleteComponent } from './alf-autocomplete';
import { AlfSelectOption } from './interfaces/alf-auto-complete-options-interface';

// ─── Constants ───────────────────────────────────────────────────────────────

const COUNTRIES: AlfSelectOption[] = [
  { value: 'es', label: 'España' },
  { value: 'fr', label: 'Francia' },
  { value: 'de', label: 'Alemania' },
  { value: 'pt', label: 'Portugal', disabled: true },
];

// ─── Host wrapper ─────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [AlfAutocompleteComponent],
  template: `
    <alf-autocomplete
      [options]="options"
      [label]="label"
      [isLoading]="isLoading"
      [disabled]="disabled"
      (optionSelected)="lastSelected = $event"
    />
  `,
})
class HostComponent {
  options: AlfSelectOption[] = COUNTRIES;
  label = 'País';
  isLoading = false;
  disabled = false;
  lastSelected: AlfSelectOption | null = null;
}

// ─── Fixture factory ──────────────────────────────────────────────────────────

async function createFixture(overrides: Partial<HostComponent> = {}): Promise<{
  fixture: ComponentFixture<HostComponent>;
  host: HostComponent;
  comp: AlfAutocompleteComponent;
}> {
  const fixture = TestBed.createComponent(HostComponent);
  const host = fixture.componentInstance;
  Object.assign(host, overrides);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  const comp = fixture.debugElement
    .query(By.directive(AlfAutocompleteComponent))
    .componentInstance as AlfAutocompleteComponent;
  return { fixture, host, comp };
}

// ─── Suite ───────────────────────────────────────────────────────────────────

describe('AlfAutocompleteComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
  });

  // ── Basic creation ──────────────────────────────────────────────────────

  it('should create the autocomplete component', async () => {
    const { comp } = await createFixture();
    expect(comp).toBeTruthy();
  });

  it('should render the inner alf-input', async () => {
    const { fixture } = await createFixture();
    const input = fixture.debugElement.query(By.css('alf-input'));
    expect(input).toBeTruthy();
  });

  // ── Panel opens/closes ─────────────────────────────────────────────────

  it('should not show the dropdown panel initially', async () => {
    const { fixture } = await createFixture();
    const panel = fixture.debugElement.query(By.css('alf-auto-complete-panel'));
    expect(panel).toBeNull();
  });

  it('should open the dropdown panel on onInputFocus', async () => {
    const { fixture, comp } = await createFixture();
    comp.onInputFocus();
    fixture.detectChanges();
    const panel = fixture.debugElement.query(By.css('alf-auto-complete-panel'));
    expect(panel).toBeTruthy();
  });

  it('should close the dropdown panel after onInputBlur delay', async () => {
    const { fixture, comp } = await createFixture();
    comp.onInputFocus();
    fixture.detectChanges();
    vi.useFakeTimers();
    comp.onInputBlur();
    fixture.detectChanges();
    await vi.runAllTimersAsync();
    fixture.detectChanges();
    const panel = fixture.debugElement.query(By.css('alf-auto-complete-panel'));
    expect(panel).toBeNull();
    vi.useRealTimers();
  });

  // ── Option filtering ────────────────────────────────────────────────────

  it('should show all options when filterText is empty', async () => {
    const { comp } = await createFixture();
    expect(comp.filteredOptionsComputed().length).toBe(COUNTRIES.length);
  });

  it('should filter options by label (case-insensitive)', async () => {
    const { comp, fixture } = await createFixture();
    comp.onInputValueChange('espan');
    fixture.detectChanges();
    const filtered = comp.filteredOptionsComputed();
    expect(filtered.length).toBe(1);
    expect(filtered[0].value).toBe('es');
  });

  it('should filter options ignoring accents (NFD normalization)', async () => {
    const { comp, fixture } = await createFixture();
    comp.onInputValueChange('Espana'); // without tilde
    fixture.detectChanges();
    const filtered = comp.filteredOptionsComputed();
    expect(filtered.length).toBe(1);
    expect(filtered[0].label).toBe('España');
  });

  it('should return empty array when no option matches', async () => {
    const { comp, fixture } = await createFixture();
    comp.onInputValueChange('ZZZ_NO_MATCH');
    fixture.detectChanges();
    expect(comp.filteredOptionsComputed().length).toBe(0);
  });

  // ── Selection ───────────────────────────────────────────────────────────

  it('should set selectedOption and emit optionSelected on selection', async () => {
    const { comp, fixture } = await createFixture();
    comp.onInputFocus();
    fixture.detectChanges();
    const selectedSpy = vi.fn();
    comp.optionSelected.subscribe(selectedSpy);
    comp.onOptionSelected(COUNTRIES[0]);
    fixture.detectChanges();
    expect(comp.selectedOption()).toEqual(COUNTRIES[0]);
    expect(comp.filterText()).toBe('España');
    expect(selectedSpy).toHaveBeenCalledWith(COUNTRIES[0]);
  });

  it('should clear selectedOption when filterText changes away from selected label', async () => {
    const { comp, fixture } = await createFixture();
    comp.onOptionSelected(COUNTRIES[0]);
    fixture.detectChanges();
    comp.onInputValueChange('Otro texto');
    fixture.detectChanges();
    expect(comp.selectedOption()).toBeNull();
  });

  // ── Clear ───────────────────────────────────────────────────────────────

  it('should reset filterText and selectedOption on onInputClear', async () => {
    const { comp, fixture } = await createFixture();
    comp.onOptionSelected(COUNTRIES[1]);
    fixture.detectChanges();
    comp.onInputClear();
    fixture.detectChanges();
    expect(comp.filterText()).toBe('');
    expect(comp.selectedOption()).toBeNull();
  });

  // ── isLoading ───────────────────────────────────────────────────────────

  it('should expose isLoading=true on the component instance', async () => {
    const { comp } = await createFixture({ isLoading: true });
    expect(comp.isLoading()).toBe(true);
  });

  it('should start with dropdown closed when isLoading=true', async () => {
    const { comp } = await createFixture({ isLoading: true });
    // dropdown never opened (no focus triggered), should stay closed
    expect(comp.isDropdownOpen()).toBe(false);
  });

  // ── Disabled ────────────────────────────────────────────────────────────

  it('disabledComputed() should be true when disabled prop is true', async () => {
    const { comp } = await createFixture({ disabled: true });
    expect((comp as any).disabledComputed()).toBe(true);
  });

  it('disabledComputed() should be false when disabled prop is false', async () => {
    const { comp } = await createFixture({ disabled: false });
    expect((comp as any).disabledComputed()).toBe(false);
  });

  // ── Options fallback ─────────────────────────────────────────────────────

  it('should fall back to empty array when options input is empty and no config', async () => {
    const { comp } = await createFixture({ options: [] });
    expect(comp.filteredOptionsComputed().length).toBe(0);
  });

  it('should use direct options when provided', async () => {
    const { comp } = await createFixture({ options: COUNTRIES });
    expect(comp.filteredOptionsComputed().length).toBe(COUNTRIES.length);
  });

  // ── Icon shown as prefix when option selected ───────────────────────────

  it('should expose selected option icon as prefix', async () => {
    const optWithIcon: AlfSelectOption = { value: 'x', label: 'X', icon: '⭐' };
    const { comp, fixture } = await createFixture({ options: [optWithIcon] });
    comp.onOptionSelected(optWithIcon);
    fixture.detectChanges();
    expect((comp as any).prefixComputed()).toBe('⭐');
  });

  it('should return undefined prefix when no selected option with icon', async () => {
    const { comp } = await createFixture();
    expect((comp as any).prefixComputed()).toBeUndefined();
  });
});
