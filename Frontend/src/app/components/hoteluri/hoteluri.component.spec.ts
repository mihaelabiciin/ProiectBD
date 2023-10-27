import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteluriComponent } from './hoteluri.component';

describe('HoteluriComponent', () => {
  let component: HoteluriComponent;
  let fixture: ComponentFixture<HoteluriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoteluriComponent]
    });
    fixture = TestBed.createComponent(HoteluriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
