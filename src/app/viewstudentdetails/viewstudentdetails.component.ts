import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewstudentdetails',
  templateUrl: './viewstudentdetails.component.html',
  styleUrl: './viewstudentdetails.component.scss',
})
export class ViewstudentdetailsComponent {
  userData: any;
  studentdata: any;
  userdata: any;
  loggedInUserName: any;
  constructor(private router: Router, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.studentdata = [this.userData];
    this.userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    this.loggedInUserName = this.userdata.uname;
  }
  logout() {
    this.toastr.info('Log Out Sucessfully');
    this.router.navigate(['/login']);
  }
}
