import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillinfoaccComponent } from './billinfoacc.component';

describe('BillinfoaccComponent', () => {
  let component: BillinfoaccComponent;
  let fixture: ComponentFixture<BillinfoaccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillinfoaccComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillinfoaccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
