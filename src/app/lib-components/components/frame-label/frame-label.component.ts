import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../../lib-core/constants/constants';

@Component({
  selector: 'app-frame-label',
  templateUrl: './frame-label.component.html',
  styleUrls: ['./frame-label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameLabelComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = LABEL_OUTLINED;
  @Input()
  public labelUnderline = LABEL_UNDERLINE;
  @Input()
  public labelStandard = LABEL_STANDARD;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public exterior03 = 'outlined';
  public formGroup03a: FormGroup = new FormGroup({
    input03a: new FormControl('', []),
  });
  public formGroup03b: FormGroup = new FormGroup({
    input03b: new FormControl('Hello World', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
