import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { URL_FRAME_INPUT, URL_ROOT } from '../../constants/url.constants';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  public showNum = '';
  public urlFrameInput = '/' + URL_ROOT + '/' + URL_FRAME_INPUT;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
