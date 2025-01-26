import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';

//importing components 

import { AttendanceComponent } from './attendance/attendance.component';

const routes: Routes = [

  {path: '', component:AttendanceComponent, pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
