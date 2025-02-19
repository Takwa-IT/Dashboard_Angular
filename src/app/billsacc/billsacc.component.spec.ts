import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsaccComponent } from './billsacc.component';

describe('BillsaccComponent', () => {
  let component: BillsaccComponent;
  let fixture: ComponentFixture<BillsaccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillsaccComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsaccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
