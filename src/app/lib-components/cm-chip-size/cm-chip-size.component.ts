import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-chip-size',
  templateUrl: './cm-chip-size.component.html',
  styleUrls: ['./cm-chip-size.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmChipSizeComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmChip = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHIP');

  public isElevation03a: boolean = false;
  public isElevation03b: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
