import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlfTab } from './alf-tab';

describe('AlfTab', () => {
  let component: AlfTab;
  let fixture: ComponentFixture<AlfTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfTab],
    }).compileComponents();

    fixture = TestBed.createComponent(AlfTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
