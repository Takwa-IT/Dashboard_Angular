import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductinfosComponent } from './productinfos.component';

describe('ProductinfosComponent', () => {
  let component: ProductinfosComponent;
  let fixture: ComponentFixture<ProductinfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductinfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductinfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
