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

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmCheckbox = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHECKBOX');

  public formGroup01: FormGroup = new FormGroup({
    model01a: new FormControl(true, []),
    model01b: new FormControl(false, []),
    model01c: new FormControl(true, []),
    model01d: new FormControl(true, []),
    model01e: new FormControl(false, []),
    model01f: new FormControl(false, []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
