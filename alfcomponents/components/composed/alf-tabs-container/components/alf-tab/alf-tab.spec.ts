import { describe, beforeEach, it, expect } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlfTabComponent } from './alf-tab';

describe('AlfTabComponent', () => {
  let component: AlfTabComponent;
  let fixture: ComponentFixture<AlfTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlfTabComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

