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
} from '../../../lib-core/constants';

@Component({
  selector: 'app-regex-remove-basic',
  templateUrl: './regex-remove-basic.component.html',
  styleUrls: ['./regex-remove-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegexRemoveBasicComponent {
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

  public control01 = {
    model01a: new FormControl('123', []),
    model01b: new FormControl('Alex', []),
    model01c: new FormControl('New level 12', []),
    model01d: new FormControl('Sarah Chauncey Woolsey', []),
  };
  public formGroup01: FormGroup = new FormGroup(this.control01);
  public exterior01 = 'outlined';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
