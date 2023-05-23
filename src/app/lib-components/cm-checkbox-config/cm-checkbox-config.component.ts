import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { GlnCheckboxConfig, GLN_CHECKBOX_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnCheckboxConfigDefault: GlnCheckboxConfig = {
  isNoRipple: true,
  position: 'start',
};

@Component({
  selector: 'app-cm-checkbox-config',
  templateUrl: './cm-checkbox-config.component.html',
  styleUrls: ['./cm-checkbox-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_CHECKBOX_CONFIG, useValue: glnCheckboxConfigDefault }],
})
export class CmCheckboxConfigComponent {
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

  public formGroup08: FormGroup = new FormGroup({
    model08a: new FormControl(true, []),
    model08b: new FormControl(true, []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
