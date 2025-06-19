import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoCotizacionComponent } from './carrito-cotizacion.component';

describe('CarritoCotizacionComponent', () => {
  let component: CarritoCotizacionComponent;
  let fixture: ComponentFixture<CarritoCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoCotizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
