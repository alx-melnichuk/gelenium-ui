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
  selector: 'app-cm-textarea-validation',
  templateUrl: './cm-textarea-validation.component.html',
  styleUrls: ['./cm-textarea-validation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmTextareaValidationComponent {
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

  public minLength03b = 3;
  public controls03 = {
    model03a: new FormControl(null, []),
    model03b: new FormControl(null, []),
    model03c: new FormControl('Hello World', []),
  };
  public formGroup03: FormGroup = new FormGroup(this.controls03);
  public exterior03 = 'outlined';
}
