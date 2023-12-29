import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeRestaurantsHotelsComponent } from './see-restaurants-hotels.component';

describe('SeeRestaurantsHotelsComponent', () => {
  let component: SeeRestaurantsHotelsComponent;
  let fixture: ComponentFixture<SeeRestaurantsHotelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeRestaurantsHotelsComponent]
    });
    fixture = TestBed.createComponent(SeeRestaurantsHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
