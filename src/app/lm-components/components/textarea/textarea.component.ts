import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { URL_FRAME_INPUT, URL_ROOT } from '../../constants/url.constants';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements AfterViewInit {
  public showNum = '';
  public urlFrameInput = '/' + URL_ROOT + '/' + URL_FRAME_INPUT;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // eslint-disable-next-line no-restricted-syntax
    console.time('TextareaComponent');
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('TextareaComponent');
  }
}
