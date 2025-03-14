import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillonfosownerComponent } from './billonfosowner.component';

describe('BillonfosownerComponent', () => {
  let component: BillonfosownerComponent;
  let fixture: ComponentFixture<BillonfosownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillonfosownerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillonfosownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
