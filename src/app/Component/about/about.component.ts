import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as bootstrap from 'bootstrap';  // Import Bootstrap JS\
import { DatePipe } from '@angular/common';



export interface PeriodicElement {
  
  staff: string;
  day: Date;
  schedule: Date;
  timeIn: string;
  timeOut: string;
  mealIn: string;
  mealOut: string;
}


// Load saved data from localStorage or initialize with an empty array
const ELEMENT_DATA: PeriodicElement[] = JSON.parse(localStorage.getItem('ELEMENT_DATA') || '[]');


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [DatePipe]
})
export class AboutComponent implements OnInit {
  displayedColumns: string[] = [
    'staff',
    'day',
    'schedule',
    'timeIn',
    'timeOut',
    'mealIn',
    'mealOut',
    'actions'
  ];
  
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selectedElement: {
    staff: string;
    day: Date;
    schedule: Date;
    timeIn: string;
    timeOut: string;
    mealIn: string;
    mealOut: string;
  } = {
    staff: '',
    day: new Date(),
    schedule: new Date(),
    timeIn: '',
    timeOut: '',
    mealIn: '',
    mealOut: ''
  };
  

  ngOnInit(): void {}

  openEditModal(element: any) {
    this.selectedElement = { ...element };  // Clone element data
    const modal = new bootstrap.Modal(document.getElementById('editModal')!);
    modal.show();
  }
  
 
  openCreateModal() {
    // Reset the form with default values for the new structure
    this.selectedElement = {
      staff: '',
      day: new Date(),
      schedule: new Date(),
      timeIn: '',
      timeOut: '',
      mealIn: '',
      mealOut: ''
    };
    const modal = new bootstrap.Modal(document.getElementById('createModal')!);
    modal.show();
  }
 
  
  
  saveChanges() {
  if (!this.selectedElement) {
    console.error('Wala tay selected element para i-update');
    return;
  }

  console.log('Selected Element to update:', this.selectedElement);

  // Normalize selected staff (case-insensitive, remove leading/trailing spaces)
  const selectedStaff = this.selectedElement.staff.trim().toLowerCase();

  // I-log ang existing staff sa dataSource para ma-check ang input
  console.log('Selected Staff:', selectedStaff);

  // Search for index using a case-insensitive and trimmed match for staff
  const index = this.dataSource.data.findIndex(item => {
    return item.staff.trim().toLowerCase() === selectedStaff;
  });

  console.log('Index found:', index);

  if (index !== -1) {
    // Kung nakita ang index, i-update ang selected element
    this.dataSource.data[index] = { ...this.selectedElement };  // Replace old data with updated data
    ELEMENT_DATA[index] = { ...this.selectedElement };           // Update the ELEMENT_DATA array

    // Force update to the table by re-assigning the data
    this.dataSource.data = [...this.dataSource.data];  // Trigger Angular change detection

    console.log('Changes saved:', this.selectedElement);
  } else {
    console.error('Wala niyong element para i-update:', this.selectedElement);
  }

  // Close the modal after saving
  const modal = bootstrap.Modal.getInstance(document.getElementById('editModal')!);
  modal?.hide();
}

  
  saveNewElement() {
    // Add the new element to the data source and ELEMENT_DATA
    this.dataSource.data.push({ ...this.selectedElement });
    this.dataSource.data = [...this.dataSource.data]; // Refresh the table

    // Update ELEMENT_DATA and persist it in localStorage
    ELEMENT_DATA.push({ ...this.selectedElement });
    localStorage.setItem('ELEMENT_DATA', JSON.stringify(ELEMENT_DATA));

    // Hide the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('createModal')!);
    modal?.hide();
  }
  deleteElement(element: any) {
    const index = this.dataSource.data.indexOf(element);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1); // Remove from the data source
      this.dataSource = new MatTableDataSource(this.dataSource.data); // Refresh the data source to update the view
    }
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


