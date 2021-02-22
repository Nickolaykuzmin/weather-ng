import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForecastWeather } from '../models/interfaces/forecast-weather';
import { SingleWeather } from '../models/interfaces/single-weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly SINGLE_WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';
  private readonly FORECAST_FIVE_URL = 'http://api.openweathermap.org/data/2.5/forecast';

  constructor(private httpClient: HttpClient) {}

  public getSingleWeatherByZipCode(zipCode: number): Observable<SingleWeather> {
    const options = {
      params: new HttpParams().append('zip', JSON.stringify(zipCode)),
    };

    return this.httpClient
      .get<SingleWeather>(this.SINGLE_WEATHER_URL, options)
      .pipe(map((res) => ({ ...res, code: zipCode })));
  }

  public getForecastWeatherByZipCode(zipCode: number): Observable<ForecastWeather> {
    const options = {
      params: new HttpParams()
      .append('zip', JSON.stringify(zipCode)),
    };

    return this.httpClient
      .get<ForecastWeather>(this.FORECAST_FIVE_URL, options)
  }
}
