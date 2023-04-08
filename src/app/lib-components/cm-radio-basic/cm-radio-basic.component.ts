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

  public urlCmRadio = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_RADIOBUTTON');

  isShowBasic01 = true; // 01
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

  // Page: Attributes02a
  isShowAttributes02a = true; // 02abc
  public fruits02a: string[] = ['apple', 'apricot', 'banana'];
  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl(this.fruits02a[0], []),
    model02b: new FormControl(this.fruits02a[0], []),
  });

  // Page: Attributes02e
  isShowAttributes02e = true; // 02efg
  public fruits02e: string[] = ['apple', 'apricot', 'banana'];
  public control02e = {
    model02e: new FormControl(this.fruits02e[0], []),
    model02f: new FormControl(this.fruits02e[0], []),
    model02g: new FormControl(null, []),
  };
  public formGroup02e: FormGroup = new FormGroup(this.control02e);

  // Page: Attributes02m  position
  isShowAttributes02m = true; // 02mhik Position
  public formGroup02m: FormGroup = new FormGroup({
    model02m: new FormControl('top', []),
  });

  // Page: Attributes02p GlnRadioGroup
  isShowAttributes02p = true; // 02pmnopq GlnRadioGroup
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

  // Page: Size03
  isShowSize03 = true; // 03
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

  // Page: Palette07
  public urlPlRadio = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_RADIOBUTTON');
  isShowPalette07a = true; // 07a
  public isDisabled07a = false;
  public formGroup07a: FormGroup = new FormGroup({
    model07a: new FormControl('primary1', []),
    model07b: new FormControl('danger1', []),
    model07c: new FormControl('success1', []),
    model07d: new FormControl('info1', []),
    model07e: new FormControl('warning1', []),
    model07f: new FormControl('customer1', []),
  });

  isShowPalette07i = true; // 07i
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

  isShowPalette07q = true; // 07q
  public isDisabled07q = false;
  public formGroup07q: FormGroup = new FormGroup({
    model07q: new FormControl('primary1', []),
    model07r: new FormControl('secondary1', []),
    model07s: new FormControl('success1', []),
    model07t: new FormControl('default1', []),
    model07u: new FormControl('pink1', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // setTimeout(() => {
    //   this.formGroup01.controls['model01a'].setValue(this.fruits01a[1]);
    // }, 4000);
  }

  public getValue(event: Event): string {
    return (event.target as HTMLInputElement)?.value;
  }
  log(event: any): void {
    // console.log((text.target as HTMLInputElement).value);
    console.log(event);
  }
}
