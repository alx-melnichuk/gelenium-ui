import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-checkbox-basic',
  templateUrl: './cm-checkbox-basic.component.html',
  styleUrls: ['./cm-checkbox-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmCheckboxBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmCheckbox = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CHECKBOX');

  // Page: Basic01
  isShowBasic01 = true;
  public formGroup01: FormGroup = new FormGroup({
    model01a: new FormControl(true, []),
    model01b: new FormControl(false, []),
    model01c: new FormControl(true, []),
    model01d: new FormControl(true, []),
    model01e: new FormControl(false, []),
    model01f: new FormControl(false, []),
  });

  // Page: Palette04
  isShowPalette04 = false;
  public isDisabled04a: boolean = false;
  public isIndeterm04a: boolean = false;
  public formGroup04a: FormGroup = new FormGroup({
    model04a: new FormControl(true, []),
    model04b: new FormControl(true, []),
    model04c: new FormControl(true, []),
    model04d: new FormControl(true, []),
    model04e: new FormControl(true, []),
    model04f: new FormControl(true, []),
  });

  public isDisabled04i: boolean = false;
  public isIndeterm04i: boolean = false;
  public formGroup04i: FormGroup = new FormGroup({
    model04i: new FormControl(true, []),
    model04j: new FormControl(true, []),
    model04k: new FormControl(true, []),
    model04l: new FormControl(true, []),
    model04m: new FormControl(true, []),
  });

  public isDisabled04p: boolean = false;
  public isIndeterm04p: boolean = false;
  public formGroup04p: FormGroup = new FormGroup({
    model04p: new FormControl(true, []),
    model04q: new FormControl(true, []),
    model04r: new FormControl(true, []),
    model04s: new FormControl(true, []),
    model04t: new FormControl(true, []),
    model04u: new FormControl(true, []),
    model04v: new FormControl(true, []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
