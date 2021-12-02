import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { URL_COMPONENTS, URL_FRAME_INPUT } from '../../lm-components.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  public showNum = '05';
  public urlFrameInput = '/' + URL_COMPONENTS + '/' + URL_FRAME_INPUT;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
