import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import * as bootstrap from 'bootstrap';  // Import Bootstrap JS
import { AttendanceService } from '../Services/Attendance.Service';  // Ensure path is correct

export interface PeriodicElement {
  _id?: string; // Optional because it comes from MongoDB
  staff: string;
  day: Date;
  schedule: Date;
  timeIn: string;
  timeOut: string;
  overtimeIn: string;
  overtimeOut: string;
  mealIn: string;
  mealOut: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers: [DatePipe]
})
export class AttendanceComponent implements OnInit {

  displayedColumns: string[] = [
    'staff', 'day', 'schedule', 'timeIn', 'timeOut', 
    'overtimeIn', 'overtimeOut', 'mealIn', 'mealOut', 'actions'
  ];
  
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selectedElement: PeriodicElement = {
    staff: '',
    day: new Date(),
    schedule: new Date(),
    timeIn: '',
    timeOut: '',
    mealIn: '',
    mealOut: '',
    overtimeIn: '',
    overtimeOut: ''
  };

  elementForm: FormGroup;

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private attendanceService: AttendanceService) {
    this.elementForm = this.fb.group({
      staff: ['', Validators.required],
      day: ['', Validators.required],
      schedule: ['', Validators.required],
      timeIn: ['', Validators.required],
      timeOut: ['', Validators.required],
      mealIn: ['', Validators.required],
      mealOut: ['', Validators.required],
      overtimeIn: ['', Validators.required],
      overtimeOut: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  openCreateModal() {
    this.elementForm.reset({
      staff: '',
      day: new Date(),
      schedule: new Date(),
      timeIn: '',
      timeOut: '',
      mealIn: '',
      mealOut: '',
      overtimeIn: '',
      overtimeOut: ''
    });

    const modal = new bootstrap.Modal(document.getElementById('createModal')!);
    modal.show();
  }

  openEditModal(element: PeriodicElement) {
    this.selectedElement = { ...element };  // Set the selected element for editing

    // Populate the form with the selected element's data
    this.elementForm.setValue({
      staff: this.selectedElement.staff,
      day: this.selectedElement.day,
      schedule: this.selectedElement.schedule,
      timeIn: this.selectedElement.timeIn,
      timeOut: this.selectedElement.timeOut,
      mealIn: this.selectedElement.mealIn,
      mealOut: this.selectedElement.mealOut,
      overtimeIn: this.selectedElement.overtimeIn,
      overtimeOut: this.selectedElement.overtimeOut
    });

    const modal = new bootstrap.Modal(document.getElementById('editModal')!);
    modal.show();
  }

  // attendance.component.ts

saveNewElement() {
  if (this.elementForm.valid) {
    const element = this.elementForm.value;

    // Format date fields with DatePipe
    element.day = this.datePipe.transform(element.day, 'MM/dd/yy')!;
    element.schedule = this.datePipe.transform(element.schedule, 'MM/dd/yy')!;

    // Convert time fields to Date objects
    element.timeIn = this.convertTimeToDate(element.timeIn);
    element.timeOut = this.convertTimeToDate(element.timeOut);
    element.overtimeIn = this.convertTimeToDate(element.overtimeIn);
    element.overtimeOut = this.convertTimeToDate(element.overtimeOut);
    element.mealIn = this.convertTimeToDate(element.mealIn);
    element.mealOut = this.convertTimeToDate(element.mealOut);

    console.log('Saving New Element:', element);

    // Send the data to the backend
    this.attendanceService.saveAttendance(element).subscribe(
      (response: any) => {  // Explicitly type the response
        console.log('Attendance saved:', response);
        // Add the new element to the data array
        this.dataSource.data.push(element);
        this.dataSource = new MatTableDataSource(this.dataSource.data); // Refresh the data

        // Hide the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createModal')!);
        modal?.hide();
      },
      (error: any) => {  // Explicitly type the error
        console.error('Error saving attendance:', error);
      }
    );
  } else {
    console.log('Form is invalid');
  }
}


saveChanges() {
  if (this.elementForm.invalid) {
    console.log('Form is invalid');
    return;
  }

  const updatedElement = {
    ...this.elementForm.value,
    day: this.datePipe.transform(this.elementForm.value.day, 'MM/dd/yy')!,
    schedule: this.datePipe.transform(this.elementForm.value.schedule, 'MM/dd/yy')!,
    timeIn: this.convertTimeToDate(this.elementForm.value.timeIn),
    timeOut: this.convertTimeToDate(this.elementForm.value.timeOut),
    overtimeIn: this.convertTimeToDate(this.elementForm.value.overtimeIn),
    overtimeOut: this.convertTimeToDate(this.elementForm.value.overtimeOut),
    mealIn: this.convertTimeToDate(this.elementForm.value.mealIn),
    mealOut: this.convertTimeToDate(this.elementForm.value.mealOut)
  };

  console.log('Updating element:', updatedElement);

  // Send the updated data to the backend for MongoDB update
  this.attendanceService.updateAttendance(this.selectedElement.staff, updatedElement).subscribe(
    (response: any) => {
      console.log('Attendance updated:', response);

      // Update the local data source
      const index = this.dataSource.data.findIndex(
        (item: PeriodicElement) => item.staff === this.selectedElement.staff
      );
      if (index !== -1) {
        this.dataSource.data[index] = updatedElement;
        this.dataSource.data = [...this.dataSource.data];
      }

      // Hide the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('editModal')!);
      modal?.hide();
    },
    (error: any) => {
      console.error('Error updating attendance:', error);
    }
  );
}


  // Helper method to convert time string to Date object
  convertTimeToDate(time: string): Date {
    const timeParts = time.split(':');
    const date = new Date();
    date.setHours(Number(timeParts[0]), Number(timeParts[1]), 0, 0); // Set hours and minutes
    return date;
  }

  deleteElement(element: any) {
    this.attendanceService.deleteAttendanceByStaff(element.staff).subscribe(
      (response) => {
        console.log('Record deleted successfully:', response);
        const index = this.dataSource.data.indexOf(element);
        if (index >= 0) {
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.dataSource.data);
        }
      },
      (error) => {
        console.error('Failed to delete the record:', error);
        alert('Failed to delete the record. Please try again later.');
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
