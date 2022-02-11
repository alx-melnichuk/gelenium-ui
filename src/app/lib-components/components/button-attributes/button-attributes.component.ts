import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import {
  BTN_CONTAINED,
  BTN_OUTLINED,
  BTN_TEXT,
  LABEL_CSS,
  LABEL_HTML,
  LABEL_SHOW_SOURCE,
  LABEL_TS,
} from 'src/app/lib-core/constants/constants';

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

  public exterior02 = 'contained';
  public routerLink = '/components/button';
  public fragment1 = 'attribute1';
  public fragment2 = 'attribute2';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public getLabel(exterior: string): string {
    return exterior ? exterior.substring(0, 1).toUpperCase() + exterior.substring(1) : '';
  }
}
