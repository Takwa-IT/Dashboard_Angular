import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilltemplateComponent } from './billtemplate.component';

describe('BilltemplateComponent', () => {
  let component: BilltemplateComponent;
  let fixture: ComponentFixture<BilltemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilltemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilltemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
