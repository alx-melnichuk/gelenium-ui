import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { BTN_FILLED, BTN_OUTLINED, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-chip-basic',
  templateUrl: './cm-chip-basic.component.html',
  styleUrls: ['./cm-chip-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmChipBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;
  @Input()
  public labelOutlined = BTN_OUTLINED; // Only page: "Attributes02a"
  @Input()
  public labelFilled = BTN_FILLED; // Only page: "Attributes02a"

  public urlCmChip = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHIP');

  isShowBasic = true; // false;
  isShowAttributes02a = true; // false;
  isShowSize03a = true; // false;
  isShowOrnaments05a = true; // false;

  // Page: "Size"
  public isDeletable03a: boolean = false;
  public isDeletable03b: boolean = false;

  // Page: "Pallete"
  public isDeletable06a: boolean = false;
  public isElevation06a: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public log(text: string): void {
    console.log(text);
  }

  public showMsg(text: string): void {
    alert(text);
  }
}
