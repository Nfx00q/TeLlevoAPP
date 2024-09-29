import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminIncidentPage } from './admin-incident.page';

describe('AdminIncidentPage', () => {
  let component: AdminIncidentPage;
  let fixture: ComponentFixture<AdminIncidentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIncidentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
