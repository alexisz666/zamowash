import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPagePage } from './dashboard-page.page';

describe('DashboardPagePage', () => {
  let component: DashboardPagePage;
  let fixture: ComponentFixture<DashboardPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
