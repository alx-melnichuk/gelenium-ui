import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-frame-input',
  templateUrl: './frame-input.component.html',
  styleUrls: ['./frame-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameInputComponent implements OnInit, AfterViewInit {
  public showNum = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // eslint-disable-next-line no-restricted-syntax
    console.time('start time');
  }

  ngOnInit(): void {
    console.timeLog('start time');
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('start time');
  }
}
