import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { weatherTypes } from '../../shared/models/constants';
import { ForecastWeather } from '../../shared/models/interfaces/forecast-weather';
import { WeatherService } from '../../shared/services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public forecastWeather: ForecastWeather;
  public weatherTypes = weatherTypes;
  public listOfForecastDays: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          const zipCode = +params.zipcode;
          return this.weatherService.getForecastWeatherByZipCode(zipCode);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(
        (res) => {
          this.forecastWeather = res;
          this.transformForecastData(this.forecastWeather);
          this.cdr.detectChanges();
        },
        (e: HttpErrorResponse) => this.router.navigate(['/home']),
      );
  }

  private transformForecastData(forecast: ForecastWeather): void {
    this.listOfForecastDays = forecast.list.reduce((prev, current) => {
      let date = current.dt_txt.split(' ')[0];
      if (!prev[date]) prev[date] = {};
      prev[date] = {
        weatherType: current.weather[0].main,
        description: current.weather[0].description,
        dt: current.dt,
        main: current.main,
      };
      return prev;
    }, {});
  }

  trackFn(index: number) {
    return index;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
