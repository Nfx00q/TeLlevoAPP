import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminViajesPage } from './admin-viajes.page';

describe('AdminViajesPage', () => {
  let component: AdminViajesPage;
  let fixture: ComponentFixture<AdminViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
