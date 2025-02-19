import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsinfosempComponent } from './clientsinfosemp.component';

describe('ClientsinfosempComponent', () => {
  let component: ClientsinfosempComponent;
  let fixture: ComponentFixture<ClientsinfosempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsinfosempComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsinfosempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
