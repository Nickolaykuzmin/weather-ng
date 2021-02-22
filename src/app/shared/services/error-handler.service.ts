import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  public errorHandler$: Subject<string> = new Subject<string>();

  constructor() {}

  setMessage(message: string) {
    this.errorHandler$.next(message);
  }

  clearError() {
    this.errorHandler$.next();
    this.errorHandler$.complete();
  }
}
