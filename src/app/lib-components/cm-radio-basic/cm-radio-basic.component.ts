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
  public fruits: string[] = ['banana', 'kiwi', 'orange']; // , 'pear'];
  public data01a: string = this.fruits[0];

  public formGroup01: FormGroup = new FormGroup({
    model01a: new FormControl(this.fruits[0], []),
  });

  isShowAttributes02a = true; // 02abcde
  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl(this.fruits[0], []),
    model02b: new FormControl(this.fruits[0], []),
    model02c: new FormControl(this.fruits[0], []),
  });

  isShowAttributes02f = true; // 02fghij
  public formGroup02f: FormGroup = new FormGroup({
    model02f: new FormControl(this.fruits[0], []),
    model02g: new FormControl(this.fruits[0], []),
    model02h: new FormControl(this.fruits[0], []),
  });

  data02a = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // setTimeout(() => {
    //   this.controls01.model01a.setValue(this.fruits[1]);
    // }, 4000);
  }

  public getValue(event: Event): string {
    return (event.target as HTMLInputElement)?.value;
  }
  log(text: Event): void {
    console.log((text.target as HTMLInputElement).value);
  }
}
