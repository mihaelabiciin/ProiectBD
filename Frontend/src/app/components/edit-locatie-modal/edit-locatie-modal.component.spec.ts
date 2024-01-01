import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocatieModalComponent } from './edit-locatie-modal.component';

describe('EditLocatieModalComponent', () => {
  let component: EditLocatieModalComponent;
  let fixture: ComponentFixture<EditLocatieModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLocatieModalComponent]
    });
    fixture = TestBed.createComponent(EditLocatieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
