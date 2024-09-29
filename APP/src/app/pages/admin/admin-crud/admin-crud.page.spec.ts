import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCrudPage } from './admin-crud.page';

describe('AdminCrudPage', () => {
  let component: AdminCrudPage;
  let fixture: ComponentFixture<AdminCrudPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
