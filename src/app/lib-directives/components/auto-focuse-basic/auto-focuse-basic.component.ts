import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from 'src/app/lib-core/constants/constants';

const MODE_A = 'A';
const MODE_B = 'B';

const CN_MODE = 'mode';
const CN_MODE1A = 'mode1a';
const CN_MODE1B = 'mode1b';

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

  public mode = MODE_A;

  public mode1a = 'surname';

  public formGroup01a: FormGroup = new FormGroup({
    surname01a: new FormControl('surname', []),
    name01a: new FormControl('name', []),
    patronymic01a: new FormControl('patronymic', []),
  });

  public mode1b = 'surname';

  public formGroup01b: FormGroup = new FormGroup({
    surname01b: new FormControl('surname', []),
    name01b: new FormControl('name', []),
    patronymic01b: new FormControl('patronymic', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.mode = this.getPrm(location.href, CN_MODE) || this.mode;
    this.mode1a = this.getPrm(location.href, CN_MODE1A) || this.mode1a;
    this.mode1b = this.getPrm(location.href, CN_MODE1B) || this.mode1b;
    this.doChangeMode(this.mode);
  }

  // ** Public API **

  public doChangeMode(mode: string): void {
    if (mode === MODE_A) {
      this.formGroup01a.enable();
      this.formGroup01b.disable();
      location.href = this.removePrm(location.href, CN_MODE1B);
      location.href = this.addPrm(location.href, CN_MODE, this.mode);
      location.href = this.addPrm(location.href, CN_MODE1A, this.mode1a);
      this.changeDetectorRef.markForCheck();
    } else if (mode === MODE_B) {
      this.formGroup01a.disable();
      this.formGroup01b.enable();
      location.href = this.removePrm(location.href, CN_MODE1A);
      location.href = this.addPrm(location.href, CN_MODE, this.mode);
      location.href = this.addPrm(location.href, CN_MODE1B, this.mode1b);
      this.changeDetectorRef.markForCheck();
    }
  }

  public doChangeMode1a(mode1a: string): void {
    location.href = this.addPrm(location.href, CN_MODE1A, mode1a);
  }

  public doChangeMode1b(mode1b: string): void {
    location.href = this.addPrm(location.href, CN_MODE1B, mode1b);
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

  private addPrm(url: string, prmName: string, prmValue: string): string {
    let result = url;
    if (!!url && !!prmName) {
      let isChange = false;
      const buff = url.split('?');
      const prms = buff.length > 1 ? buff[1].split('&') : [];
      if (buff.length > 1) {
        result = buff[0] + '?';
        let j = 0;
        for (let i = 0; i < prms.length; i++) {
          const data = prms[i] ? prms[i].split('=') : [];
          if (data.length > 1) {
            let value = data[1] || '';
            if (data[0] === prmName) {
              value = prmValue;
              isChange = true;
            }
            result += (j > 0 ? '&' : '') + data[0] + '=' + value;
            j++;
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

  private removePrm(url: string, prmName: string): string {
    let result = url;
    if (!!url && !!prmName) {
      const buff = url.split('?');
      const prms = buff.length > 1 ? buff[1].split('&') : [];
      if (buff.length > 1) {
        result = buff[0] + '?';
        for (let i = 0; i < prms.length; i++) {
          const data = prms[i] ? prms[i].split('=') : [];
          if (data.length > 1) {
            const value = data[1] || '';
            if (data[0] === prmName) {
              continue;
            }
            result += (i > 0 ? '&' : '') + data[0] + '=' + value;
          }
        }
      }
    }
    return result;
  }
}
