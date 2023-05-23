import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-radio-basic',
  templateUrl: './cm-radio-basic.component.html',
  styleUrls: ['./cm-radio-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmRadioBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmRadio = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_RADIOBUTTON');

  public fruits01a: string[] = ['apple', 'apricot', 'banana'];
  public formGroup01a: FormGroup = new FormGroup({
    model01a: new FormControl(this.fruits01a[0], []),
  });

  public fruits01b: string[] = ['kiwi', 'orange', 'lemon'];
  public data01b: string = this.fruits01b[0];

  public fruits01c: string[] = ['mango', 'mandarin', 'peach'];
  public formGroup01c: FormGroup = new FormGroup({
    model01c: new FormControl(this.fruits01c[0], []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
