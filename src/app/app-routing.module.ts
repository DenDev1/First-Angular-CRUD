import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';

//importing components 
import { AboutComponent } from './Component/about/about.component';
import { ContactComponent } from './Component/contact/contact.component';
import { TimeKeepingComponent } from './time-keeping/time-keeping.component';
import { HeaderComponent } from './header/header.component';
import { AttendanceComponent } from './attendance/attendance.component';

const routes: Routes = [
  {path: '', component:TimeKeepingComponent, pathMatch:'full' },
  {path: 'about', component:AboutComponent, pathMatch: 'full'},
  {path: 'contact', component:ContactComponent, pathMatch: 'full'},
  {path: 'header', component:HeaderComponent, pathMatch: 'full'},
  {path: 'attendance', component:AttendanceComponent, pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
