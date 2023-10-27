import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCountryComponent } from './show-country.component';

describe('ShowCountryComponent', () => {
  let component: ShowCountryComponent;
  let fixture: ComponentFixture<ShowCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCountryComponent]
    });
    fixture = TestBed.createComponent(ShowCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
