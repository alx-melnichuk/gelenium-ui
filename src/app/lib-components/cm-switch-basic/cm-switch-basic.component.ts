import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { GlnSwitchConfig, GLN_SWITCH_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnSwitchConfigDefault: GlnSwitchConfig = {
  isNoAnimation: true, // ?: boolean | undefined;
  // isReadOnly: true, // ?: boolean | undefined;
  // isRequired: true, // ?: boolean | undefined;
  isChecked: true,
  isNoRipple: true,
};

@Component({
  selector: 'app-cm-switch-basic',
  templateUrl: './cm-switch-basic.component.html',
  styleUrls: ['./cm-switch-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [{ provide: GLN_SWITCH_CONFIG, useValue: glnSwitchConfigDefault }],
})
export class CmSwitchBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmSwitch = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SWITCH');

  public formGroup01: FormGroup = new FormGroup({
    model01a: new FormControl(true, []),
    model01b: new FormControl(false, []),
    model01c: new FormControl(true, []),
    model01d: new FormControl(false, []),
  });

  // Attributes
  public data02a = true;
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

  // Size
  public formGroup03: FormGroup = new FormGroup({
    model03a: new FormControl(true, []),
    model03b: new FormControl(true, []),
    model03c: new FormControl(true, []),
    model03d: new FormControl(true, []),
    model03e: new FormControl(true, []),
    model03f: new FormControl(true, []),
  });

  // Palette
  public formGroup04: FormGroup = new FormGroup({
    model04a: new FormControl(true, []),
    model04b: new FormControl(true, []),
    model04c: new FormControl(true, []),
    model04d: new FormControl(true, []),
    model04e: new FormControl(true, []),
  });

  // Customization
  public formGroup05: FormGroup = new FormGroup({
    model05a: new FormControl(true, []),
    model05b: new FormControl(true, []),
    model05c: new FormControl(true, []),
    model05d: new FormControl(true, []),
    model05e: new FormControl(true, []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
