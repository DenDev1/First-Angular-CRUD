// attendance.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {

  private apiUrl = 'http://localhost:3000/api/attendance'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Method to send new attendance data to the backend
  saveAttendance(attendance: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, attendance);  // Ensure proper type annotation
  }

  updateAttendance(staff: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/attendance/update/${staff}`, data);
  }
  
// attendance.service.ts (Angular service)


deleteAttendanceByStaff(staff: string): Observable<any> {
  const url = `http://localhost:3000/api/attendance/${staff}`;
  console.log('DELETE request sent to:', url); // Debugging log
  return this.http.delete(url);
}




}