import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-switch-customization',
  templateUrl: './cm-switch-customization.component.html',
  styleUrls: ['./cm-switch-customization.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSwitchCustomizationComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmSwitch = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SWITCH');

  public formGroup05: FormGroup = new FormGroup({
    model05a: new FormControl(true, []),
    model05b: new FormControl(true, []),
    model05c: new FormControl(true, []),
    model05d: new FormControl(true, []),
    model05e: new FormControl(true, []),
    model05f: new FormControl(true, []),
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
