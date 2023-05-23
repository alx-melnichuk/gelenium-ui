import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { BTN_CONTAINED, BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-pl-checkbox-material-ui',
  templateUrl: './pl-checkbox-material-ui.component.html',
  styleUrls: ['./pl-checkbox-material-ui.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlCheckboxMaterialUiComponent {
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

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlPlCheckbox = this.baseRef + '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_CHECKBOX');

  public isDisabled04i: boolean = false;
  public isIndeterm04i: boolean = false;
  public formGroup04i: FormGroup = new FormGroup({
    model04i: new FormControl(true, []),
    model04j: new FormControl(true, []),
    model04k: new FormControl(true, []),
    model04l: new FormControl(true, []),
    model04m: new FormControl(true, []),
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
