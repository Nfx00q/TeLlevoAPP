import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriversLoginPage } from './drivers-login.page';

describe('DriversLoginPage', () => {
  let component: DriversLoginPage;
  let fixture: ComponentFixture<DriversLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
