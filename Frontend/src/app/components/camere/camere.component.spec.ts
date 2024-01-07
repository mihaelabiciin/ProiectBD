import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamereComponent } from './camere.component';

describe('CamereComponent', () => {
  let component: CamereComponent;
  let fixture: ComponentFixture<CamereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamereComponent]
    });
    fixture = TestBed.createComponent(CamereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
