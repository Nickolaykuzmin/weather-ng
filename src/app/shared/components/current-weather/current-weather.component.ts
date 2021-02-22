import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { weatherTypes } from '../../models/constants';
import { SingleWeather } from '../../models/interfaces/single-weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent implements OnInit {
  @Input() weather: SingleWeather;
  @Input() weatherIdx: number;
  @Input() zipCode: number;
  @Output() removeWeather: EventEmitter<number> = new EventEmitter<number>();

  weatherTypes = weatherTypes;
  constructor() {}

  ngOnInit(): void {}
}
