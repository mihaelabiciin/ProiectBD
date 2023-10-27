import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatiiComponent } from './locatii.component';

describe('LocatiiComponent', () => {
  let component: LocatiiComponent;
  let fixture: ComponentFixture<LocatiiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocatiiComponent]
    });
    fixture = TestBed.createComponent(LocatiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
