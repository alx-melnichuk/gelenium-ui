import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { GlnSwitchConfig, GlnSwitchPosition, GLN_SWITCH_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnSwitchConfigDefault: GlnSwitchConfig = {
  isNoRipple: true,
  position: GlnSwitchPosition.start,
};

@Component({
  selector: 'app-cm-switch-config',
  templateUrl: './cm-switch-config.component.html',
  styleUrls: ['./cm-switch-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_SWITCH_CONFIG, useValue: glnSwitchConfigDefault }],
})
export class CmSwitchConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmSwitch = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SWITCH');

  public formGroup06: FormGroup = new FormGroup({
    model06a: new FormControl(true, []),
    model06b: new FormControl(true, []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
