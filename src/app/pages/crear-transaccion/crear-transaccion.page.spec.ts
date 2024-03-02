import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearTransaccionPage } from './crear-transaccion.page';

describe('CrearTransaccionPage', () => {
  let component: CrearTransaccionPage;
  let fixture: ComponentFixture<CrearTransaccionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearTransaccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
