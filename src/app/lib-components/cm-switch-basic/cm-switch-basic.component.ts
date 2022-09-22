import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-switch-basic',
  templateUrl: './cm-switch-basic.component.html',
  styleUrls: ['./cm-switch-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSwitchBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmSwitch = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SWITCH');

  public formGroup01: FormGroup = new FormGroup({
    model01a: new FormControl(true, []),
    model01b: new FormControl(false, []),
    model01c: new FormControl(true, []),
    model01d: new FormControl(false, []),
  });

  // Attributes
  public formGroup02: FormGroup = new FormGroup({
    model02a: new FormControl(true, []),
    model02b: new FormControl(false, []),
  });

  // Size
  public formGroup03: FormGroup = new FormGroup({
    model03a: new FormControl(true, []),
    model03b: new FormControl(true, []),
    model03c: new FormControl(true, []),
    model03d: new FormControl(true, []),
    model03e: new FormControl(true, []),
    model03f: new FormControl(true, []),
  });

  // Color
  public formGroup04: FormGroup = new FormGroup({
    model04a: new FormControl(true, []),
    model04b: new FormControl(true, []),
    model04c: new FormControl(true, []),
    model04d: new FormControl(true, []),
    model04e: new FormControl(true, []),
  });
  public demoModel02c = true; // #
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // setTimeout(() => {
    //   this.formGroup02b.controls['model03a'].setValue(false);
    // }, 2000);
    // setTimeout(() => {
    //   this.formGroup02b.controls['model03a'].setValue(true);
    // }, 4000);
  }

  public log(text: string, event?: any): void {
    let value = '';
    let checked = '';
    if (!!event && event instanceof Event) {
      value = (event.target as any)['value'];
      checked = (event.target as any)['checked'];
    }
    console.log(`${text}`, event, ` ${value} ${checked}`);
  }
}
