import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { AuthUser } from 'src/app/shared/models/auth-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginBtn') loginBtn;

  user: AppUser;
  isLoggedInUser = false;
  isAdmin = false;
  private unsubscribeAll: Subject<any>;
  authUser: AuthUser;
  isAuthenticated = false;


  notifys = [
    {
      content: 'Từ 29/2/2020, Tiki miễn phí giao tiêu chuẩn cho đơn hàng từ 250k, áp dụng phí 19k cho đơn hàng dưới 250k.',
      date: '28/02/2020'
    },
    {
      content: 'Từ 29/2/2020, Tiki miễn phí giao tiêu chuẩn cho đơn hàng từ 250k, áp dụng phí 19k cho đơn hàng dưới 250k.',
      date: '28/02/2020'
    }
  ];
  cartCount = 0;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.unsubscribeAll = new Subject<any>() ;
    this.authService.authUser.pipe(
      takeUntil(this.unsubscribeAll),
      switchMap(authUser => {
        this.authUser = authUser;
        this.isAuthenticated = !!authUser;
        if (authUser) {
          return this.authService.getUserRoles(authUser.id);
        }
        return of(null);
      })
    ).subscribe(roles => {
      if (roles) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });

    this.authService.showLogin.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(res => {
      if (res) {
        this.loginBtn.nativeElement.click();
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
