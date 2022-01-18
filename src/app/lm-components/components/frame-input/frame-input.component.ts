import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-frame-input',
  templateUrl: './frame-input.component.html',
  styleUrls: ['./frame-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameInputComponent implements AfterViewInit {
  public showNum = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // eslint-disable-next-line no-restricted-syntax
    console.time('FrameInputComponent');
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('FrameInputComponent');
  }
}
