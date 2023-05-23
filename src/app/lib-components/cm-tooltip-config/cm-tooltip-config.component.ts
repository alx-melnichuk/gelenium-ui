import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnTooltipConfig, GLN_TOOLTIP_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnTooltipConfigDefault: GlnTooltipConfig = {
  classes: 'ttcf-panel',
  isArrow: true,
  isNoTransform: true,
  position: 'bottom-start',
};

@Component({
  selector: 'app-cm-tooltip-config',
  templateUrl: './cm-tooltip-config.component.html',
  styleUrls: ['./cm-tooltip-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_TOOLTIP_CONFIG, useValue: glnTooltipConfigDefault }],
})
export class CmTooltipConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmTooltip = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_TOOLTIP');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
