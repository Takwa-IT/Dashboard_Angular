import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsinfosownerComponent } from './clientsinfosowner.component';

describe('ClientsinfosownerComponent', () => {
  let component: ClientsinfosownerComponent;
  let fixture: ComponentFixture<ClientsinfosownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsinfosownerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsinfosownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
