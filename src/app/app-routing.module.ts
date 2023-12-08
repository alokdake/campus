import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllstudentsComponent } from './allstudents/allstudents.component';
import { ViewstudentdetailsComponent } from './viewstudentdetails/viewstudentdetails.component';
import { EditstudentdetailsComponent } from './editstudentdetails/editstudentdetails.component';
import { AdminComponent } from './admin/admin.component';
import { EditstudentdetailsbyadminComponent } from './editstudentdetailsbyadmin/editstudentdetailsbyadmin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'allstudents', component: AllstudentsComponent },
  { path: 'viewstudentdetails', component: ViewstudentdetailsComponent },
  {
    path: 'editstudentdetails/:userId',
    component: EditstudentdetailsComponent,
  },
  { path: 'admin', component: AdminComponent },
  {
    path: 'editstudentdetailsbyadmin/:userId',
    component: EditstudentdetailsbyadminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
