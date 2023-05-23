import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-switch-palette',
  templateUrl: './cm-switch-palette.component.html',
  styleUrls: ['./cm-switch-palette.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSwitchPaletteComponent {
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

  public formGroup04: FormGroup = new FormGroup({
    model04a: new FormControl(true, []),
    model04b: new FormControl(true, []),
    model04c: new FormControl(true, []),
    model04d: new FormControl(true, []),
    model04e: new FormControl(true, []),
    model04f: new FormControl(true, []),
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
