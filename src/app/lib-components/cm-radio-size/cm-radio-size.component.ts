import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-radio-size',
  templateUrl: './cm-radio-size.component.html',
  styleUrls: ['./cm-radio-size.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmRadioSizeComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmRadio = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_RADIOBUTTON');

  public fruits03a: string[] = ['apple', 'apricot', 'banana'];
  public formGroup03a: FormGroup = new FormGroup({
    model03a: new FormControl(this.fruits03a[0], []),
    model03b: new FormControl(this.fruits03a[0], []),
    model03c: new FormControl(this.fruits03a[0], []),
    model03d: new FormControl(this.fruits03a[0], []),
    model03e: new FormControl(this.fruits03a[0], []),
    model03f: new FormControl(this.fruits03a[0], []),
    model03g: new FormControl(this.fruits03a[0], []),
    model03h: new FormControl(this.fruits03a[0], []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
