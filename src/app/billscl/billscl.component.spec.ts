import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsclComponent } from './billscl.component';

describe('BillsclComponent', () => {
  let component: BillsclComponent;
  let fixture: ComponentFixture<BillsclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillsclComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
