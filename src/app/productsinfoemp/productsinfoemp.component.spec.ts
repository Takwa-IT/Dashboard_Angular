import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsinfoempComponent } from './productsinfoemp.component';

describe('ProductsinfoempComponent', () => {
  let component: ProductsinfoempComponent;
  let fixture: ComponentFixture<ProductsinfoempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsinfoempComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsinfoempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
