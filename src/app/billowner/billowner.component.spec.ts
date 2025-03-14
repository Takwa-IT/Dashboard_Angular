import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillownerComponent } from './billowner.component';

describe('BillownerComponent', () => {
  let component: BillownerComponent;
  let fixture: ComponentFixture<BillownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillownerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
