import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public uname!: any;
  public password!: any;

  allStudentsData: any = [];
  UserName: any;
  constructor(
    public http: HttpClient,
    private crud: CrudService,
    private router: Router,
    private toastr: ToastrService,

    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      uname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.getAllUserDetails();
  }

  getAllUserDetails() {
    this.crud.getUserdetails().subscribe((data) => {
      console.log('data has come');
      console.log(data);

      data.forEach((element: any) => {
        this.allStudentsData.push({
          UserName: element.UserName,
        });
        console.log(this.allStudentsData.UserName);
      });
    });
  }
  submitForm() {
    if (this.loginForm.invalid) {
      this.toastr.info('Please enter both username and password');

      return;
    }

    this.http.get<any>('http://localhost:1000/registeredStudents').subscribe(
      (result: any[]) => {
        const user = result.find((x: any) => {
          return (
            x.uname == this.loginForm.value.uname &&
            x.password == this.loginForm.value.password
          );
        });

        if (user) {
          this.toastr.success('Login sucessfully !!');
          localStorage.setItem('userData', JSON.stringify(user));
          this.router.navigate(['/allstudents']);
        } else {
          this.toastr.warning('Invalid username or password');
        }
      },
      (err: any) => {
        alert('Something went wrong');
        this.router.navigate(['/login']);
      }
    );
    if (this.uname == 'admin' && this.password == '123456') {
      this.toastr.success('Admin Login Sucessfully !!');
      this.toastr.success('Welcome to admin panel');
      this.router.navigate(['/admin']);
    }
  }

  register() {
    this.toastr.info('Fill the fields to register');
    this.router.navigate(['/register']);
  }
}
