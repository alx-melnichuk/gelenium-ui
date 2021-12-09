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
} from 'src/app/constants/labels';

@Component({
  selector: 'app-regex-match-basic',
  templateUrl: './regex-match-basic.component.html',
  styleUrls: ['./regex-match-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegexMatchBasicComponent {
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

  public control01 = {
    input01a: new FormControl('', []),
    input01b: new FormControl('-1234567890123456.12345', []),
    input01c: new FormControl('-12345678901234567890', []),
    input01d: new FormControl('12345678901234567890.12', []),
    input01e: new FormControl('123456789012.12', []),
    input01f: new FormControl('123456789012', []),
    input01g: new FormControl('123456789012.12', []),
  };
  public formGroup01: FormGroup = new FormGroup(this.control01);
  public exterior01 = 'outlined';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
