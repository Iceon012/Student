import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDataComponent } from './enrollment-data.component';

describe('EnrollmentDataComponent', () => {
  let component: EnrollmentDataComponent;
  let fixture: ComponentFixture<EnrollmentDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentDataComponent]
    });
    fixture = TestBed.createComponent(EnrollmentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
