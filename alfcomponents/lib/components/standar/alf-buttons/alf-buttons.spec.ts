import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlfButtons } from './alf-buttons';

describe('AlfButtons', () => {
  let component: AlfButtons;
  let fixture: ComponentFixture<AlfButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfButtons],
    }).compileComponents();

    fixture = TestBed.createComponent(AlfButtons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
