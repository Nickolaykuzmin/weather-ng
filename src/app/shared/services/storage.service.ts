import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private localStorageService: LocalStorageService) {}

  getDataFromLocalStorage<T>(key: string): T {
    return JSON.parse(this.localStorageService.get(key));
  }

  setDataToLocalStorage<T>(key: string, value: any) {
    this.localStorageService.set(key, JSON.stringify(value));
  }
}
