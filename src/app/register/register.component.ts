import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public http: HttpClient,
    private toastr: ToastrService
  ) {}
  public RegisterForm!: FormGroup;
  public email!: any;
  public name!: any;
  public phone!: any;
  public branch!: any;
  public enrollmentno!: any;
  public password!: any;
  public conformPassword!: any;
  public uname!: any;
  public bloodgroup!: any;
  public rollno!: any;
  public address!: any;
  public pincode!: any;
  public city!: any;
  message!: string;
  url!: string | ArrayBuffer | null;
  public profilePic = this.url;

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z].*'),
      ]),
      email: new FormControl(
        '',

        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]
      ),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
      ]),
      branch: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z].*'),
      ]),
      enrollmentno: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]),
      conformPassword: new FormControl('', [Validators.required]),
      bloodgroup: new FormControl('', [Validators.required]),
      rollno: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      uname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z].*'),
      ]),
      profilePic: new FormControl('null', [Validators.required]),
    });
  }
  get Name(): FormControl {
    return this.RegisterForm.get('name') as FormControl;
  }
  get Phone(): FormControl {
    return this.RegisterForm.get('phone') as FormControl;
  }

  get UName(): FormControl {
    return this.RegisterForm.get('uname') as FormControl;
  }
  get Branch(): FormControl {
    return this.RegisterForm.get('branch') as FormControl;
  }
  get Enrollment(): FormControl {
    return this.RegisterForm.get('enrollmentno') as FormControl;
  }

  get pass(): FormControl {
    return this.RegisterForm.get('password') as FormControl;
  }
  get confpass(): FormControl {
    return this.RegisterForm.get('conformPassword') as FormControl;
  }

  get profile(): FormControl {
    return this.RegisterForm.get('profilePic') as FormControl;
  }
  get Email(): FormControl {
    return this.RegisterForm.get('email') as FormControl;
  }
  get Blood(): FormControl {
    return this.RegisterForm.get('bloodgroup') as FormControl;
  }
  get Roll(): FormControl {
    return this.RegisterForm.get('rollno') as FormControl;
  }
  get Address(): FormControl {
    return this.RegisterForm.get('address') as FormControl;
  }
  get Pin(): FormControl {
    return this.RegisterForm.get('pincode') as FormControl;
  }
  get City(): FormControl {
    return this.RegisterForm.get('city') as FormControl;
  }

  submitform() {
    if (this.RegisterForm.invalid) {
      this.toastr.info('Please fill in all the required fields');
      return;
    }

    let registerModel = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      uname: this.uname,
      branch: this.branch,
      enrollmentno: this.enrollmentno,
      password: this.password,
      conformPassword: this.conformPassword,
      profilePic: this.profilePic,
      bloodgroup: this.bloodgroup,
      rollno: this.rollno,
      address: this.address,
      pincode: this.pincode,
      city: this.city,
    };

    console.log(registerModel);

    this.http.get<any>('http://localhost:1000/registeredStudents').subscribe(
      (result) => {
        console.log(result);
        const user = result.find((x: any) => {
          return x.email === this.RegisterForm.value.email;
        });
        if (user) {
          this.toastr.warning('User Already Exists');
        } else {
          this.http
            .post<any>(
              'http://localhost:1000/registeredStudents',
              registerModel
            )
            .subscribe((result) => {
              this.toastr.success('Registeration sucessfully !!');
              console.log(result);
              this.router.navigate(['/login']);
              this.RegisterForm.reset();
            });
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
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
      this.profilePic = imageReader.result;
    };
  }
}
