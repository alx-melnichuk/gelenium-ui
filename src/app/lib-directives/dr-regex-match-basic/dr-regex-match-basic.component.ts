import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../lib-core/constants';

@Component({
  selector: 'app-dr-regex-match-basic',
  templateUrl: './dr-regex-match-basic.component.html',
  styleUrls: ['./dr-regex-match-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrRegexMatchBasicComponent {
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

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlDrRegexMatch = this.baseRef + '/' + RouterConfig.get('URL_DIRECTIVES') + '/' + RouterConfig.get('URL_DIRECTIVES_REGEX_MATCH');

  public control01 = {
    model01a: new FormControl('', []),
    model01b: new FormControl('-1234567890123456.12345', []),
    model01c: new FormControl('-12345678901234567890', []),
    model01d: new FormControl('12345678901234567890.12', []),
    model01e: new FormControl('123456789012.12', []),
    model01f: new FormControl('123456789012', []),
    model01g: new FormControl('123456789012.12', []),
  };
  public formGroup01: FormGroup = new FormGroup(this.control01);
  public exterior01 = 'outlined';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
