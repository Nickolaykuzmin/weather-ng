import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_KEY } from '../models/constants';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private errorHandlerService: ErrorHandlerService, private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newParams = new HttpParams({fromString: req.params.toString()});

    newParams = newParams.append('units', 'imperial');
    newParams = newParams.append('appid', API_KEY);

    const authReq = req.clone({
      params: newParams,
    });

    return next.handle(authReq).pipe(
      tap(
        (event) => {
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) this.toastr.error('Unauthorized');

            if (err.error) {
             this.toastr.error(err.error.message)
            }
          }
        },
      ),
    );
  }
}
