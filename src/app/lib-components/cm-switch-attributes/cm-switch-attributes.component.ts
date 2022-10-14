import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-switch-attributes',
  templateUrl: './cm-switch-attributes.component.html',
  styleUrls: ['./cm-switch-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSwitchAttributesComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmSwitch = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SWITCH');

  public data02a = true;
  public data02b = true;
  public formGroup02a: FormGroup = new FormGroup({
    model02b: new FormControl(true, []),
    model02c: new FormControl(true, []),
    model02d: new FormControl(true, []),
    model02e: new FormControl(true, []),
  });
  public formGroup02b: FormGroup = new FormGroup({
    model02f: new FormControl(true, []),
    model02g: new FormControl(true, []),
    model02h: new FormControl(true, []),
    model02i: new FormControl(true, []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
