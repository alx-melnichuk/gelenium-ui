import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../lib-core/constants';

@Component({
  selector: 'app-pl-input-material-ui',
  templateUrl: './pl-input-material-ui.component.html',
  styleUrls: ['./pl-input-material-ui.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlInputMaterialUiComponent {
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

  public urlPlInput = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_INPUT');

  public exterior03a = 'outlined';
  public control03a = {
    model03a: new FormControl(null, []),
    model03b: new FormControl(null, []),
    model03c: new FormControl('Hello World', []),
    model03d: new FormControl('Hello World', []),
  };
  public formGroup03a: FormGroup = new FormGroup(this.control03a);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
