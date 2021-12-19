import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { URL_FRAME_INPUT, URL_ROOT } from '../../constants/url.constants';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  public showNum = '05';
  public urlFrameInput = '/' + URL_ROOT + '/' + URL_FRAME_INPUT;
}
