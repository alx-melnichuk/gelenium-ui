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

  isShowBasic01 = true;
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
  isShowAttributes02a = false; // true; // 02abcde,
  public fruits02a: string[] = ['kiwi', 'orange', 'lemon'];
  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl(this.fruits02a[0], []),
    model02b: new FormControl(this.fruits02a[0], []),
    model02c: new FormControl(this.fruits02a[0], []),
  });

  // Page: Attributes02f
  isShowAttributes02f = false; // true; // 02fghij
  public fruits02f: string[] = ['mango', 'mandarin', 'peach'];
  public formGroup02f: FormGroup = new FormGroup({
    model02f: new FormControl(this.fruits02f[0], []),
    model02g: new FormControl(this.fruits02f[0], []),
    model02h: new FormControl(this.fruits02f[0], []),
  });

  data02a = false;

  // Page: Size03
  isShowSize03 = false; // true; // 02abcde ,
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

  // model02f= {{ formGroup02f.controls['model02f'].value }}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // setTimeout(() => {
    //   this.formGroup01.controls['model01a'].setValue(this.fruits01a[1]);
    // }, 4000);
  }

  public getValue(event: Event): string {
    return (event.target as HTMLInputElement)?.value;
  }
  log(text: Event): void {
    console.log((text.target as HTMLInputElement).value);
  }
}
