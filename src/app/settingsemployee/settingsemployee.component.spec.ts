import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsemployeeComponent } from './settingsemployee.component';

describe('SettingsemployeeComponent', () => {
  let component: SettingsemployeeComponent;
  let fixture: ComponentFixture<SettingsemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsemployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
