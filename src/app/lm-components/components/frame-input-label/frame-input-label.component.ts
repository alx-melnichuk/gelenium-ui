import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {
  CN_LABEL_CSS,
  CN_LABEL_HTML,
  CN_LABEL_OUTLINED,
  CN_LABEL_SHOW_SOURCE,
  CN_LABEL_STANDARD,
  CN_LABEL_TS,
  CN_LABEL_UNDERLINE,
} from '../constants';

@Component({
  selector: 'app-frame-input-label',
  templateUrl: './frame-input-label.component.html',
  styleUrls: ['./frame-input-label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameInputLabelComponent {
  @Input()
  public labelShowSource = CN_LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = CN_LABEL_OUTLINED;
  @Input()
  public labelUnderline = CN_LABEL_UNDERLINE;
  @Input()
  public labelStandard = CN_LABEL_STANDARD;
  @Input()
  public labelHtml = CN_LABEL_HTML;
  @Input()
  public labelTs = CN_LABEL_TS;
  @Input()
  public labelCss = CN_LABEL_CSS;

  public formGroup03: FormGroup = new FormGroup({
    input03a: new FormControl('', []),
    input03b: new FormControl('Hello World', []),
  });
  public exterior03 = 'outlined';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
