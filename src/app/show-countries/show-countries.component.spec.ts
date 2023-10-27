import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCountriesComponent } from './show-countries.component';

describe('ShowCountriesComponent', () => {
  let component: ShowCountriesComponent;
  let fixture: ComponentFixture<ShowCountriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCountriesComponent]
    });
    fixture = TestBed.createComponent(ShowCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
