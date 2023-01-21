import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnSpinnerConfig, GLN_SPINNER_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnSpinnerConfigDefault: GlnSpinnerConfig = {
  size: 'short',
};

@Component({
  selector: 'app-cm-spinner-basic',
  templateUrl: './cm-spinner-basic.component.html',
  styleUrls: ['./cm-spinner-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [{ provide: GLN_SPINNER_CONFIG, useValue: glnSpinnerConfigDefault }],
})
export class CmSpinnerBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmSpinner = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SPINNER');

  // Page: "Attributes" 02
  public isNoAnimation02a: boolean = true;
  public isNoPulsate02a: boolean = false;
  public isExternal02a: boolean = false;

  // Page: "ItemSize" 03
  public isNoAnimation03a: boolean = true;
  public isNoAnimation03b: boolean = true;

  // Page: "Palette" 04
  public isNoAnimation04a: boolean = true;

  // Page: "Customization" 05
  public isNoAnimation05a: boolean = true;

  // Page: "Config" 08
  public isNoAnimation08a: boolean = true;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}