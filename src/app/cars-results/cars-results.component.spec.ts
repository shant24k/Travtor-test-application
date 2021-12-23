import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsResultsComponent } from './cars-results.component';

describe('CarsResultsComponent', () => {
  let component: CarsResultsComponent;
  let fixture: ComponentFixture<CarsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
