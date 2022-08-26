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
} from '../../lib-core/constants';
import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-frame-helper-text',
  templateUrl: './cm-frame-helper-text.component.html',
  styleUrls: ['./cm-frame-helper-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmFrameHelperTextComponent {
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

  public urlCmFrame = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');

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
