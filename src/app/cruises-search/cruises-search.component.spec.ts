import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruisesSearchComponent } from './cruises-search.component';

describe('CruisesSearchComponent', () => {
  let component: CruisesSearchComponent;
  let fixture: ComponentFixture<CruisesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruisesSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruisesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
