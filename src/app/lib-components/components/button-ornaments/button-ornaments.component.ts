import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import {
  BTN_CONTAINED,
  BTN_OUTLINED,
  BTN_TEXT,
  LABEL_CSS,
  LABEL_HTML,
  LABEL_SHOW_SOURCE,
  LABEL_TS,
} from '../../../lib-core/constants/constants';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-button-ornaments',
  templateUrl: './button-ornaments.component.html',
  styleUrls: ['./button-ornaments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonOrnamentsComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;
  @Input()
  public labelContained = BTN_CONTAINED;
  @Input()
  public labelOutlined = BTN_OUTLINED;
  @Input()
  public labelText = BTN_TEXT;

  public urlButton2 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_BUTTON2');

  public exterior05a = 'outlined';
  public exterior05b = 'outlined';
  public exterior05c = 'outlined';
  public exterior05d = 'outlined';
  public exterior05e = 'outlined';
  public exterior05f = 'outlined';

  public routerLink = '/components/button';
  public fragment1 = 'ornaments-link1';
  public fragment2 = 'ornaments-link2';
  public fragment3 = 'ornaments-link3';
  public fragment4 = 'ornaments-link4';
  public fragment5 = 'ornaments-link5';
  public fragment6 = 'ornaments-link6';
}
