import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { locationKey } from '../../shared/models/constants';
import { SingleWeather } from '../../shared/models/interfaces/single-weather';
import { WeatherService } from '../../shared/services/weather.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef,
    private weatherService: WeatherService,
  ) {}

  public weathers: Array<SingleWeather> = [];
  public getZipCodes(): Array<number> {
    return this.storageService.getDataFromLocalStorage<Array<number>>(locationKey);
  }

  trackFn(index: number) {
    return index;
  }

  public async ngOnInit() {
    if (this.getZipCodes()) {
      const arrayOfCodesFromStorage = this.getZipCodes();

      for (let i = 0; i < arrayOfCodesFromStorage.length; i++) {
        const weatherZipCode = arrayOfCodesFromStorage[i];
        this.weathers[i] = await this.weatherService
          .getSingleWeatherByZipCode(weatherZipCode)
          .toPromise();
      }

      this.cdr.detectChanges();
    }
  }

  public async onAddLocation(zipCode: number) {
    const arrayOfCodesFromStorage = this.getZipCodes();

    if (
      arrayOfCodesFromStorage &&
      this.checkNotUniqueCodeInStorage(arrayOfCodesFromStorage, zipCode)
    ) {
      return;
    }

    const arrayOfCodes = !arrayOfCodesFromStorage
      ? [zipCode]
      : [...arrayOfCodesFromStorage, zipCode];

    try {
      const weatherSensor = await this.weatherService
        .getSingleWeatherByZipCode(zipCode)
        .toPromise();
      this.storageService.setDataToLocalStorage<string>(locationKey, arrayOfCodes);

      this.weathers = [...this.weathers, weatherSensor];
      this.cdr.detectChanges();
    } catch (_) {}
  }

  private checkNotUniqueCodeInStorage(arrayOfCodesFromStorage: Array<number>, zipCode: number) {
    return arrayOfCodesFromStorage.some((code) => code === zipCode);
  }

  public onRemoveWeather(weatherIdx: number) {
    const arrayOfCodesFromStorage = this.getZipCodes();
    this.weathers.splice(weatherIdx, 1);
    arrayOfCodesFromStorage.splice(weatherIdx, 1);
    this.storageService.setDataToLocalStorage(locationKey, arrayOfCodesFromStorage);
  }
}
