import { AfterViewInit, Component, OnDestroy, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private loaderService: LoaderService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
  ) {}

  ngAfterViewInit() {
    this.loaderService
      .httpProgress()
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: boolean) => {
        status ? this.spinner.show() : this.spinner.hide();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
