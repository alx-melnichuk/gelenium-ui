import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-checkbox-size',
  templateUrl: './cm-checkbox-size.component.html',
  styleUrls: ['./cm-checkbox-size.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmCheckboxSizeComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmCheckbox = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHECKBOX');

  public formGroup03: FormGroup = new FormGroup({
    model03a: new FormControl(true, []),
    model03b: new FormControl(true, []),
    model03c: new FormControl(true, []),
    model03d: new FormControl(true, []),
    model03e: new FormControl(true, []),
    model03f: new FormControl(true, []),
    model03g: new FormControl(true, []),
    model03h: new FormControl(true, []),
    model03i: new FormControl(true, []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
