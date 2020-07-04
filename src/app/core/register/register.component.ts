import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/shared/directives/forbidden-name.directive';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('btnCloseModal') btnCloseModal;

  registerForm: FormGroup;
  isLoading = false;
  error = '';
  
  constructor(private fb: FormBuilder, private authService: AuthService) { }


  ngOnInit(): void {
    // this.registerForm = new FormGroup({
    //   name: new FormControl('', [Validators.required, forbiddenNameValidator(/admin/i)]),
    //   email: new FormControl('', Validators.required),
    //   mobile: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   social: new FormGroup({
    //     facebook: new FormControl(),
    //     twitter: new FormControl()
    //   })
    // });

    this.registerForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      mobile: this.fb.control('', Validators.required),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      social: this.fb.group({
        facebook: this.fb.control(''),
        twitter: this.fb.control('')
      })
    });

    // this.registerForm = this.fb.group({
    //   name: ['', Validators.required],
    //   email: ['', Validators.required],
    //   mobile: ['', Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   social: this.fb.group({
    //     facebook: [''],
    //     twitter: ['']
    //   })
    // });

    // this.registerForm = this.fb.group({
    //   name: this.fb.control('', Validators.required),
    //   email: this.fb.control('', Validators.required),
    //   mobile: this.fb.array([
    //     this.fb.control('', Validators.required)
    //   ]),
    //   password: this.fb.control('', [Validators.required, Validators.minLength(6)])
    // });

    setTimeout(() => {
      // this.registerForm.setValue({
      //   name: 'giang',
      //   mobile: '0949348386',
      //   email: 'giangtm.nd@gmail.com',
      //   password: '123456'
      // });
      // this.registerForm.patchValue({
      //   name: 'giang',
      //   email: 'giangtm.nd@gmail.com'
      // });
    }, 3000);
  }

  closeModal(): void {
    this.registerForm.reset();
  }

  get mobile() {
    return this.registerForm.get('mobile') as FormArray;
  }

  addMoreMobile() {
    this.mobile.push(this.fb.control('', Validators.required));
  }

  removeMobile(index: number) {
    this.mobile.removeAt(index);
  }
  
  register(): void {
    // console.log(this.registerForm.value);
    // this.btnCloseModal.nativeElement.click();
    if (!this.registerForm.valid) {
      return;
    }
    this.isLoading = true;
    this.authService.signup(
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.name,
      this.registerForm.value.mobile).subscribe(
      resData => {
        this.isLoading = false;
        this.btnCloseModal.nativeElement.click();
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }
}
