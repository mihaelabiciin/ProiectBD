import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitatiComponent } from './activitati.component';

describe('ActivitatiComponent', () => {
  let component: ActivitatiComponent;
  let fixture: ComponentFixture<ActivitatiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitatiComponent]
    });
    fixture = TestBed.createComponent(ActivitatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
