import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsownerComponent } from './settingsowner.component';

describe('SettingsownerComponent', () => {
  let component: SettingsownerComponent;
  let fixture: ComponentFixture<SettingsownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsownerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
