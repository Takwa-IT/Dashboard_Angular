import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccsettingsComponent } from './accsettings.component';

describe('AccsettingsComponent', () => {
  let component: AccsettingsComponent;
  let fixture: ComponentFixture<AccsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccsettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
