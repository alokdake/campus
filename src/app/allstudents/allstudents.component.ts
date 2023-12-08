import { Component } from '@angular/core';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allstudents',
  templateUrl: './allstudents.component.html',
  styleUrls: ['./allstudents.component.scss'],
})
export class AllstudentsComponent {
  allstudents: any;
  students: any;
  constructor(
    private crud: CrudService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  UsersData: any = [];
  userdata: any;
  loggedInUserName: any;

  ngOnInit(): void {
    this.getAllUserDetails();
    this.userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    this.students = this.UsersData;
    this.loggedInUserName = this.userdata.uname;
  }

  getAllUserDetails() {
    this.crud.getAllUsers().subscribe((data: any) => {
      console.log(data);
      this.allstudents = data;
      console.log(this.allstudents);
    });
  }
  editUser(item: any) {
    console.log('Edit item:', item);
    localStorage.setItem('userDetails', JSON.stringify(item));
    this.router.navigate(['/editstudentdetails', item.id]);
  }

  searchBlogs(event: any) {
    console.log(event);
    let filteredBlog: any[] = [];
    if (event === '') {
      this.getAllUserDetails();
    } else {
      filteredBlog = this.allstudents.filter((res: any) => {
        let targetProduct =
          res.name.toLowerCase() +
          res.uname.toLowerCase() +
          res.branch.toLowerCase();
        let searchkey = event.toLowerCase();
        return targetProduct.includes(searchkey);
      });
      this.allstudents = filteredBlog;
    }
  }
  view(item: any) {
    console.log(item);
    localStorage.setItem('userDetails', JSON.stringify(item));
    this.router.navigate(['/viewstudentdetails']);
  }
  logout() {
    this.toastr.info('Log Out Sucessfully');
    this.router.navigate(['/login']);
  }
  deletestudent(item: any) {
    this.crud.delete(item.id).subscribe((res) => {
      this.toastr.info('Student Details Deleted');
      this.getAllUserDetails();
    });
  }
}
