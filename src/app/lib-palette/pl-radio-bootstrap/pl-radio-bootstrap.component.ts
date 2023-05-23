import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-pl-radio-bootstrap',
  templateUrl: './pl-radio-bootstrap.component.html',
  styleUrls: ['./pl-radio-bootstrap.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlRadioBootstrapComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlPlRadio = this.baseRef + '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_RADIOBUTTON');

  public isDisabled07i = false;
  public formGroup07i: FormGroup = new FormGroup({
    model07i: new FormControl('primary1', []),
    model07j: new FormControl('secondary1', []),
    model07k: new FormControl('success1', []),
    model07l: new FormControl('danger1', []),
    model07m: new FormControl('warning1', []),
    model07n: new FormControl('info1', []),
    model07o: new FormControl('dark1', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
