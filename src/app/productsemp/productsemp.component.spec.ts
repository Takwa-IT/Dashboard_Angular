import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsempComponent } from './productsemp.component';

describe('ProductsempComponent', () => {
  let component: ProductsempComponent;
  let fixture: ComponentFixture<ProductsempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsempComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
