import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-checkbox-basic',
  templateUrl: './cm-checkbox-basic.component.html',
  styleUrls: ['./cm-checkbox-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmCheckboxBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmCheckbox = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHECKBOX');

  public formGroup01: FormGroup = new FormGroup({
    model01a: new FormControl(true, []),
    model01b: new FormControl(false, []),
    model01c: new FormControl(true, []),
    model01d: new FormControl(false, []),
  });

  // Page: Attributes02abcdefgh
  isShowAttributes02a = true;

  // Page: Attributes02ijkl
  isShowAttributes02i = false;
  public formGroup02i: FormGroup = new FormGroup({
    model02i: new FormControl(true, []),
    model02j: new FormControl(false, []),
    model02k: new FormControl(true, []),
    model02l: new FormControl(false, []),
  });

  // Page: Size03a
  // Page: Ornaments05a
  // Page: Config08a

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
