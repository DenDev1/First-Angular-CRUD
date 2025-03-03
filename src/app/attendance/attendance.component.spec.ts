import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceComponent} from './attendance.component';

describe('AttendanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceComponent]
    });
    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
