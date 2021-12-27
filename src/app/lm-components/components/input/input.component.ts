import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { URL_FRAME_INPUT, URL_ROOT } from '../../constants/url.constants';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit, AfterViewInit {
  public showNum = '';
  public urlFrameInput = '/' + URL_ROOT + '/' + URL_FRAME_INPUT;
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
