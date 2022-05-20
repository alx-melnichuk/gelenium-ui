import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from 'src/app/lib-core/constants/constants';

const CN_MODE01 = 'mode01';

@Component({
  selector: 'app-auto-focuse-basic',
  templateUrl: './auto-focuse-basic.component.html',
  styleUrls: ['./auto-focuse-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoFocuseBasicComponent implements OnInit {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public currentMode01 = '';

  public control01a = {
    mode01a: new FormControl('surname', []),
  };
  public formGroup01a: FormGroup = new FormGroup(this.control01a);

  public control01b = {
    input01surname: new FormControl('surname', []),
    input01name: new FormControl('name', []),
    input01patronymic: new FormControl('patronymic', []),
  };
  public formGroup01b: FormGroup = new FormGroup(this.control01b);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.currentMode01 = this.getPrm(location.href, CN_MODE01);
    this.control01a.mode01a.setValue(this.currentMode01, { emitEvent: false });
  }

  // ** Public API **

  public doChangeMode01(): void {
    // const url2 = location.origin + location.pathname + hash2;
    // console.log('url2=', url2);
    // const s1 = this.removePrm(location.href, 'demo3', '90');
    const prmValue = this.control01a.mode01a.value;
    console.log(`doChangeMode01() prmValue=${prmValue}`);
    const href = this.removePrm(location.href, CN_MODE01, prmValue);
    console.log(`href=${href}`);
    location.href = href;
  }

  private getPrm(url: string, prmName: string): string {
    let result = '';
    if (!!url && !!prmName) {
      const buff = url.split('?');
      const prms = buff.length > 1 ? buff[1].split('&') : [];
      for (let i = 0; i < prms.length; i++) {
        const prm = prms[i];
        const data = prm ? prm.split('=') : [];
        if (data.length > 1 && prmName === data[0]) {
          result = data[1] || '';
          break;
        }
      }
    }
    return result;
  }

  private removePrm(url: string, prmName: string, prmValue: string): string {
    let result = url;
    if (!!url && !!prmName) {
      let isChange = false;
      const buff = url.split('?');
      const prms = buff.length > 1 ? buff[1].split('&') : [];
      if (buff.length > 1) {
        result = buff[0] + '?';
        for (let i = 0; i < prms.length; i++) {
          const data = prms[i] ? prms[i].split('=') : [];
          if (data.length > 1) {
            let value = data[1] || '';
            if (data[0] === prmName) {
              value = prmValue;
              isChange = true;
            }
            result += (i > 0 ? '&' : '') + data[0] + '=' + value;
          }
        }
      }
      if (!isChange) {
        const ch1 = prms.length === 0 ? '?' : '';
        result += (prms.length > 0 ? '&' : ch1) + prmName + '=' + prmValue;
      }
    }
    return result;
  }
}
