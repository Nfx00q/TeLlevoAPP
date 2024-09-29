import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPanelStsPage } from './admin-panel-sts.page';

describe('AdminPanelStsPage', () => {
  let component: AdminPanelStsPage;
  let fixture: ComponentFixture<AdminPanelStsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelStsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
