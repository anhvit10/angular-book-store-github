import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, exhaustMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.authUser.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq).pipe(
          tap(event => {
            if (event.type === HttpEventType.Response) {
              console.log(event.body);
            }
          })
        );
      })
    );
  }

  
}
