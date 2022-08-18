import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../lib-core/constants';
import { UrlPalette } from '../../lib-palette/lib-palette.constants';

@Component({
  selector: 'app-pl-input-basic',
  templateUrl: './pl-input-basic.component.html',
  styleUrls: ['./pl-input-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlInputBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = LABEL_OUTLINED;
  @Input()
  public labelUnderline = LABEL_UNDERLINE;
  @Input()
  public labelStandard = LABEL_STANDARD;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlPlInput = '/' + UrlPalette.get('URL_PALETTE') + '/' + UrlPalette.get('URL_INPUT');

  public exterior01a = 'outlined';
  public control01a = {
    model01a: new FormControl(null, []),
    model01b: new FormControl(null, []),
    model01c: new FormControl('Hello World', []),
    model01d: new FormControl('Hello World', []),
  };
  public formGroup01a: FormGroup = new FormGroup(this.control01a);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
