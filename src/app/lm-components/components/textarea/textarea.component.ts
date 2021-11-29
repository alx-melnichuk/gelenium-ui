import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { URL_COMPONENTS, URL_FRAME_INPUT } from '../../lm-components.interface';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  public showNum = '';
  public urlFrameInput = '/' + URL_COMPONENTS + '/' + URL_FRAME_INPUT;
}
