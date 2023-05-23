import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-radio-attributes',
  templateUrl: './cm-radio-attributes.component.html',
  styleUrls: ['./cm-radio-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmRadioAttributesComponent {
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

  public fruits02a: string[] = ['apple', 'apricot', 'banana'];
  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl(this.fruits02a[0], []),
    model02b: new FormControl(this.fruits02a[0], []),
  });

  public fruits02e: string[] = ['apple', 'apricot', 'banana'];
  public control02e = {
    model02e: new FormControl(this.fruits02e[0], []),
    model02f: new FormControl(this.fruits02e[0], []),
    model02g: new FormControl(null, []),
  };
  public formGroup02e: FormGroup = new FormGroup(this.control02e);

  public formGroup02m: FormGroup = new FormGroup({
    model02m: new FormControl('top', []),
  });

  public isDisabled02p = false;
  public isNoAnimation02p = false;
  public isNoHover02p = false;
  public isNoRipple02p = false;
  public isReadOnly02p = false;
  public isSizeMiddle02p = false;
  public isPositionStart02p = false;
  public isDirCol02p = false;

  public fruits02p: string[] = ['kiwi', 'orange', 'lemon'];
  public formGroup02p: FormGroup = new FormGroup({
    model02p: new FormControl(this.fruits02p[0], []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
