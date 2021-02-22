import { Routes } from '@angular/router';
import { ForecastComponent } from './pages/forecast/forecast.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'forecast/:zipcode', component: ForecastComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
