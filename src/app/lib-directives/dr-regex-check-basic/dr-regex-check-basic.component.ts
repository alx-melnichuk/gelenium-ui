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
  selector: 'app-dr-regex-check-basic',
  templateUrl: './dr-regex-check-basic.component.html',
  styleUrls: ['./dr-regex-check-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrRegexCheckBasicComponent {
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
  public urlDrRegexCheck = this.baseRef + '/' + RouterConfig.get('URL_DIRECTIVES') + '/' + RouterConfig.get('URL_DIRECTIVES_REGEX_CHECK');

  public control01a = {
    model01a: new FormControl('1', []),
  };
  public formGroup01a: FormGroup = new FormGroup(this.control01a);

  public exterior01b = 'outlined';
  public control01b = {
    model01b: new FormControl('', []),
    model01c: new FormControl('', []),
    model01d: new FormControl('01/0', []),
    model01e: new FormControl('01/0', []),
    model01f: new FormControl('(99', []),
  };
  public formGroup01b: FormGroup = new FormGroup(this.control01b);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
