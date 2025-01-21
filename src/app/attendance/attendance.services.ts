import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = 'http://localhost:5000/api/attendance';  // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  // Get all attendance records
  getAttendance(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Add a new attendance record
  addAttendance(attendance: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, attendance);
  }

  // Update an attendance record
  updateAttendance(staff: string, attendance: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${staff}`, attendance);
  }

  // Delete an attendance record
  deleteAttendance(staff: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${staff}`);
  }
}
