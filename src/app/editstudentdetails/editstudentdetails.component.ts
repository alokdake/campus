import { Component } from '@angular/core';
import { CrudService } from '../crud.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editstudentdetails',
  templateUrl: './editstudentdetails.component.html',
  styleUrl: './editstudentdetails.component.scss',
})
export class EditstudentdetailsComponent {
  userId!: string;
  user: any;
  userData: any;
  studentdata: any;
  singleUserDetails: any;
  message!: string;
  url!: string | ArrayBuffer | null;

  public profilePic: any;
  loggedInUserName: any;
  userdata: any;
  constructor(
    private crud: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.studentdata = [this.userData];
    this.userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    this.loggedInUserName = this.userdata.uname;
    console.log(this.studentdata);
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      console.log(this.userId);
      this.crud.getUserById(this.userId).subscribe((data: any) => {
        this.singleUserDetails = data;
        console.log(this.singleUserDetails);
      });
    });
  }
  update() {
    console.log('Method clicked');
    var studentModel = {
      name: this.singleUserDetails.name,
      uname: this.singleUserDetails.uname,
      email: this.singleUserDetails.email,
      phone: this.singleUserDetails.phone,
      enrollmentno: this.singleUserDetails.enrollmentno,
      rollno: this.singleUserDetails.rollno,
      branch: this.singleUserDetails.branch,
      bloodgroup: this.singleUserDetails.bloodgroup,
      address: this.singleUserDetails.address,
      pincode: this.singleUserDetails.pincode,
      city: this.singleUserDetails.city,
      profilePic: this.singleUserDetails.profilePic,
      password: this.singleUserDetails.password,
      conformPassword: this.singleUserDetails.conformPassword,
    };
    console.log(studentModel);

    this.crud.update(this.userId, studentModel).subscribe((res) => {
      console.log('Data Updated Sucessfully', res);
      this.toastr.success('Details Updated !!');
      this.router.navigate(['/allstudents']);
    });
  }

  selectFile(event: any) {
    var imageType = event.target.files[0].type;

    if (imageType.match(/image\/*/) == null) {
      this.message = 'only images you can add';
      return;
    }

    var imageReader = new FileReader();
    imageReader.readAsDataURL(event.target.files[0]);

    imageReader.onload = (_event) => {
      this.message = '';
      this.url = imageReader.result;
      console.log(this.url);
      this.singleUserDetails.profilePic = imageReader.result;
      console.log(this.profilePic);
    };
  }
  logout() {
    this.toastr.info('Log Out Sucessfully');
    this.router.navigate(['/login']);
  }
}
