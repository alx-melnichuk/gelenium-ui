import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnChipConfig, GLN_CHIP_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnChipConfigDefault: GlnChipConfig = {
  exterior: 'filled',
  isElevation: true,
  size: 'middle',
};

@Component({
  selector: 'app-cm-chip-config',
  templateUrl: './cm-chip-config.component.html',
  styleUrls: ['./cm-chip-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_CHIP_CONFIG, useValue: glnChipConfigDefault }],
})
export class CmChipConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmChip = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHIP');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
