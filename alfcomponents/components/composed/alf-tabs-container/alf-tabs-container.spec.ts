import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlfTabsContainer } from './alf-tabs-container';

describe('AlfTabsContainer', () => {
  let component: AlfTabsContainer;
  let fixture: ComponentFixture<AlfTabsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfTabsContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(AlfTabsContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
