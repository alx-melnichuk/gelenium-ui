import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-hint-or-error-basic',
  templateUrl: './cm-hint-or-error-basic.component.html',
  styleUrls: ['./cm-hint-or-error-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmHintOrErrorBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmHintOrError =
    this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_HINT_OR_ERROR');

  public controls01 = {
    model01a: new FormControl('is', []),
    model01b: new FormControl('demo', []),
  };
  public formGroup01: FormGroup = new FormGroup(this.controls01);
  public isDisabled01 = false;
  public isFocusInput01a = false;
  public isFocusInput01b = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public changeIsDisabled(isDisabled01: boolean): boolean {
    if (isDisabled01) {
      this.formGroup01.disable();
    } else {
      this.formGroup01.enable();
    }
    return isDisabled01;
  }
}
