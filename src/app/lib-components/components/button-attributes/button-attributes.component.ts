import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { BTN_CONTAINED, BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../../lib-core/constants';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-button-attributes',
  templateUrl: './button-attributes.component.html',
  styleUrls: ['./button-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonAttributesComponent {
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

  public urlButton1 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_BUTTON1');

  public routerLink = this.urlButton1;
  public exterior02a = 'outlined';
  public fragment02a = 'attribute-link02a';
  public fragment02b = 'attribute-link02b';
  public fragment02c = 'attribute-link02c';
  public fragment02d = 'attribute-link02d';
  public fragment02e = 'attribute-link02e';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public getLabel(exterior: string): string {
    return exterior ? exterior.substring(0, 1).toUpperCase() + exterior.substring(1) : '';
  }
}
