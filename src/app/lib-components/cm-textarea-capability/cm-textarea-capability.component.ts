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
  selector: 'app-cm-textarea-capability',
  templateUrl: './cm-textarea-capability.component.html',
  styleUrls: ['./cm-textarea-capability.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmTextareaCapabilityComponent {
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

  public urlCmTextarea = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_COMPONENTS_TEXTAREA');

  public text1 = 'line 1\nline 2';
  public text2 = this.text1 + '\nline 3\nline 4\nline 5';
  public formGroup04: FormGroup = new FormGroup({
    model04a: new FormControl(this.text1, []),
    model04b: new FormControl(this.text2, []),
    model04c: new FormControl(this.text1, []),
    model04d: new FormControl(this.text2, []),
  });
  public exterior04 = 'outlined';
}
