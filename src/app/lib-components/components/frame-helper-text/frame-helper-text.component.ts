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
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-frame-helper-text',
  templateUrl: './frame-helper-text.component.html',
  styleUrls: ['./frame-helper-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameHelperTextComponent {
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

  public urlFrame1 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME1');

  public formGroup04: FormGroup = new FormGroup({
    model04a: new FormControl('William', []),
    model04b: new FormControl('Anderson', []),
    model04c: new FormControl('Charlotte', []),
    model04d: new FormControl('Robinson', []),
  });
  public exterior04 = 'outlined';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
