import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDashPage } from './user-dash.page';

describe('UserDashPage', () => {
  let component: UserDashPage;
  let fixture: ComponentFixture<UserDashPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
