import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxLocalStorageModule } from 'ngx-localstorage';

import { AppComponent } from './app.component';
import { routes } from './routes';
import { CurrentWeatherComponent } from './shared/components/current-weather/current-weather.component';
import { SearchByCodeComponent } from './shared/components/search-by-code/search-by-code.component';
import { ApiInterceptor } from './shared/interceptors/api.interceptor';
import { localStorageConfig } from './shared/models/constants';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { StorageService } from './shared/services/storage.service';
import { ToastrModule } from 'ngx-toastr';
import { ForecastComponent } from './pages/forecast/forecast.component';
import { HomeComponent } from './pages/home/home.component';
import { WeatherService } from './shared/services/weather.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxLocalStorageModule.forRoot(localStorageConfig),
    AlertModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    SearchByCodeComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    HomeComponent,
  ],
  providers: [
    ErrorHandlerService,
    StorageService,
    WeatherService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
