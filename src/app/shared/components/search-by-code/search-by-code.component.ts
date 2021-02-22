import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-by-code',
  templateUrl: './search-by-code.component.html',
  styleUrls: ['./search-by-code.component.scss'],
})
export class SearchByCodeComponent implements OnInit {
  public zipCodeControl: number = null;
  @Output() addZipCode: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public onAddLocation(): void {
    if (!this.zipCodeControl) {
      return;
    }
    this.addZipCode.emit(this.zipCodeControl);
    this.zipCodeControl = null;
  }
}
