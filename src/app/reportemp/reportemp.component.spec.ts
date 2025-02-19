import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportempComponent } from './reportemp.component';

describe('ReportempComponent', () => {
  let component: ReportempComponent;
  let fixture: ComponentFixture<ReportempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportempComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
