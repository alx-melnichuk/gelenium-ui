import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';
import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-select-basic',
  templateUrl: './cm-select-basic.component.html',
  styleUrls: ['./cm-select-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSelectBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmSelect = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_SELECT');

  public control01 = {
    model01a: new FormControl(null, []),
    model01b: new FormControl(null, []),
    model01c: new FormControl(null, []),
  };
  public formGroup01: FormGroup = new FormGroup(this.control01);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
