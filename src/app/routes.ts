import { Routes } from '@angular/router';
import { ForecastComponent } from './pages/forecast/forecast.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'forecast', loadChildren: () => import('./pages/forecast/forecast.module').then(r => r.ForecastModule) },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
