import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hint-or-error',
  templateUrl: './hint-or-error.component.html',
  styleUrls: ['./hint-or-error.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintOrErrorComponent implements AfterViewInit {
  public showNum = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // eslint-disable-next-line no-restricted-syntax
    console.time('HintOrErrorComponent');
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('HintOrErrorComponent');
  }
}
