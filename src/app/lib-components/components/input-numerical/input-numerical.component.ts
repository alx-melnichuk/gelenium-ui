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
  selector: 'app-input-numerical',
  templateUrl: './input-numerical.component.html',
  styleUrls: ['./input-numerical.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumericalComponent {
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
  public urlRegexMatch = '/' + 'directives' + '/' + 'regex-match';

  public formGroup04: FormGroup = new FormGroup({
    model04a: new FormControl('', []),
    model04b: new FormControl('', []),
    model04c: new FormControl('', []),
    model04d: new FormControl('-12345678901234567890', []),
    model04e: new FormControl('12345678901234567890.12', []),
    model04f: new FormControl('123456789012.12', []),
    model04g: new FormControl('between 3 and 6', []),
  });
  public exterior04 = 'outlined';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
