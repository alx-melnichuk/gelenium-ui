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

  // Page: Attributes02abc
  isShowAttributes02a = true;
  public data02a = true;
  public data02b = true;
  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl(true, []),
    model02b: new FormControl(true, []),
    model02c: new FormControl(true, []),
  });

  isShowAttributes02d = true; // defg
  public control02d = {
    model02d: new FormControl(true, []),
    model02e: new FormControl(true, []),
    model02f: new FormControl(null, []),
  };
  public formGroup02d: FormGroup = new FormGroup(this.control02d);

  // Page: Attributes02hijklm
  isShowAttributes02h = true;
  public formGroup02h: FormGroup = new FormGroup({
    model02h: new FormControl(true, []),
    model02i: new FormControl(false, []),
    model02j: new FormControl(true, []),
    model02k: new FormControl(false, []),
  });

  // Page: Size03
  isShowSize03 = true;
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

  // Page: Palette04
  isShowPalette04 = true;
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

  // Page: Config08a

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  log(text: string): void {
    console.log(text);
  }
}
