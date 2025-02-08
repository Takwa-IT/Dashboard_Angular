import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsclientComponent } from './settingsclient.component';

describe('SettingsclientComponent', () => {
  let component: SettingsclientComponent;
  let fixture: ComponentFixture<SettingsclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsclientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
