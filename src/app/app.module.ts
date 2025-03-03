import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import {MatTreeModule} from '@angular/material/tree';

import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceService } from './Services/Attendance.Service';  // Your attendance service
@NgModule({
  declarations: [
    AppComponent,

    AttendanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Add this to enable HTTP request
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatStepperModule,
    MatRadioModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSidenavModule,
    MatTreeModule,
    RouterModule.forRoot([]),
  ],
  providers: [AttendanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
