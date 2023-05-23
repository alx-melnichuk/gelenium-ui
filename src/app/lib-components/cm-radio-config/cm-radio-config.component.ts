import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { GlnRadioButtonConfig, GLN_RADIO_BUTTON_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnRadioButtonConfigDefault: GlnRadioButtonConfig = {
  isNoRipple: true,
  position: 'start',
};

@Component({
  selector: 'app-cm-radio-config',
  templateUrl: './cm-radio-config.component.html',
  styleUrls: ['./cm-radio-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_RADIO_BUTTON_CONFIG, useValue: glnRadioButtonConfigDefault }],
})
export class CmRadioConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmRadio = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_RADIOBUTTON');

  public fruits08a: string[] = ['kiwi', 'orange', 'lemon'];
  public formGroup08a: FormGroup = new FormGroup({
    model08a: new FormControl(this.fruits08a[0], []),
    model08b: new FormControl(this.fruits08a[0], []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
