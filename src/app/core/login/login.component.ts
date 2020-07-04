import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('btnCloseModal') btnCloseModal;

  invalidUser = false;
  subscription: Subscription;

  error = '';
  isLoading = false;
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
  }

  login(loginForm): void {
    if (!loginForm.valid) {
      return;
    }
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.isLoading = true;
    this.subscription = this.authService.login(email, password).subscribe(
      resData => {
        this.isLoading = false;
        this.btnCloseModal.nativeElement.click();
        this.authService.navigateAfterLogin();
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }

  closeModal(loginForm): void {
    // this.invalidUser = false;

    loginForm.reset();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
