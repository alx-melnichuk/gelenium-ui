import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UrlParamUtil } from 'gelenium-ui';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../../lib-core/constants/constants';

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

  public ngOnInit(): void {
    this.mode = UrlParamUtil.getPrm(location.href, CN_MODE) || this.mode;
    this.mode1a = UrlParamUtil.getPrm(location.href, CN_MODE1A) || this.mode1a;
    this.mode1b = UrlParamUtil.getPrm(location.href, CN_MODE1B) || this.mode1b;
    this.doChangeMode(this.mode);
  }

  // ** Public API **

  public doChangeMode(mode: string): void {
    if (mode === MODE_A) {
      this.formGroup01a.enable();
      this.formGroup01b.disable();
      location.href = UrlParamUtil.removePrm(location.href, CN_MODE1B);
      location.href = UrlParamUtil.addPrm(location.href, CN_MODE, this.mode);
      location.href = UrlParamUtil.addPrm(location.href, CN_MODE1A, this.mode1a);
      this.changeDetectorRef.markForCheck();
    } else if (mode === MODE_B) {
      this.formGroup01a.disable();
      this.formGroup01b.enable();
      location.href = UrlParamUtil.removePrm(location.href, CN_MODE1A);
      location.href = UrlParamUtil.addPrm(location.href, CN_MODE, this.mode);
      location.href = UrlParamUtil.addPrm(location.href, CN_MODE1B, this.mode1b);
      this.changeDetectorRef.markForCheck();
    }
  }

  public doChangeMode1a(mode1a: string): void {
    location.href = UrlParamUtil.addPrm(location.href, CN_MODE1A, mode1a);
  }

  public doChangeMode1b(mode1b: string): void {
    location.href = UrlParamUtil.addPrm(location.href, CN_MODE1B, mode1b);
  }
}
