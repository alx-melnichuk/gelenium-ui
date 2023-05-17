import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-checkbox-attributes',
  templateUrl: './cm-checkbox-attributes.component.html',
  styleUrls: ['./cm-checkbox-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmCheckboxAttributesComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmCheckbox = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHECKBOX');

  public data02a = true;
  public data02b = true;
  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl(true, []),
    model02b: new FormControl(true, []),
    model02c: new FormControl(true, []),
  });

  public control02d = {
    model02d: new FormControl(true, []),
    model02e: new FormControl(true, []),
    model02f: new FormControl(null, []),
  };
  public formGroup02d: FormGroup = new FormGroup(this.control02d);

  public formGroup02h: FormGroup = new FormGroup({
    model02h: new FormControl(true, []),
    model02i: new FormControl(false, []),
    model02j: new FormControl(true, []),
    model02k: new FormControl(false, []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
