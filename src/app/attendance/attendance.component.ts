import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import * as bootstrap from 'bootstrap';  // Import Bootstrap JS


export interface PeriodicElement {
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

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
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
  
      // Add the new element to the data array
      this.dataSource.data.push(element);
      this.dataSource = new MatTableDataSource(this.dataSource.data); // Refresh the data
  
      // Hide the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('createModal')!);
      modal?.hide();
    } else {
      console.log('Form is invalid');
    }
  }

  saveChanges() {
    if (this.elementForm.invalid) {
      return;
    }
  
    const index = this.dataSource.data.findIndex(
      (item: PeriodicElement) => item.staff === this.selectedElement.staff
    );
  
    if (index !== -1) {
      // Only apply DatePipe to date fields (day and schedule)
      this.dataSource.data[index] = {
        ...this.elementForm.value,
        day: this.datePipe.transform(this.elementForm.value.day, 'MM/dd/yy')!,
        schedule: this.datePipe.transform(this.elementForm.value.schedule, 'MM/dd/yy')!,
        // Convert time strings to Date objects so DatePipe can format them
        timeIn: this.convertTimeToDate(this.elementForm.value.timeIn),
        timeOut: this.convertTimeToDate(this.elementForm.value.timeOut),
        overtimeIn: this.convertTimeToDate(this.elementForm.value.overtimeIn),
        overtimeOut: this.convertTimeToDate(this.elementForm.value.overtimeOut),
        mealIn: this.convertTimeToDate(this.elementForm.value.mealIn),
        mealOut: this.convertTimeToDate(this.elementForm.value.mealOut)
      };
  
      this.dataSource.data = [...this.dataSource.data];
    }
  
    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal')!);
    modal?.hide();
  }

  // Helper method to convert time string to Date object
  convertTimeToDate(time: string): Date {
    const timeParts = time.split(':');
    const date = new Date();
    date.setHours(Number(timeParts[0]), Number(timeParts[1]), 0, 0); // Set hours and minutes
    return date;
  }

  deleteElement(element: PeriodicElement) {
    const index = this.dataSource.data.indexOf(element);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
