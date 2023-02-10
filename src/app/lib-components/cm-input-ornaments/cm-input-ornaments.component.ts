import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../lib-core/constants';

@Component({
  selector: 'app-cm-input-ornaments',
  templateUrl: './cm-input-ornaments.component.html',
  styleUrls: ['./cm-input-ornaments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmInputOrnamentsComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = LABEL_OUTLINED;
  @Input()
  public labelUnderline = LABEL_UNDERLINE;
  @Input()
  public labelStandard = LABEL_STANDARD;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmInput = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_INPUT');

  public minLength05 = 3;
  public maxLength05 = 15;
  public controls05 = {
    model05a: new FormControl('', []),
    model05b: new FormControl('thirty', []),
    model05c: new FormControl('one', [Validators.required, Validators.minLength(this.minLength05), Validators.maxLength(this.maxLength05)]),
    model05d: new FormControl('', [Validators.required, Validators.minLength(this.minLength05), Validators.maxLength(this.maxLength05)]),
    model05e: new FormControl('thirty', [Validators.required]),
    model05f: new FormControl('thirty', [Validators.required]),
    model05g: new FormControl('thirty', [Validators.required]),
    model05h: new FormControl('thirty', [Validators.required]),
    model05i: new FormControl('', [Validators.required]),
    model05j: new FormControl('test', []),
    model05k: new FormControl('test', []),
  };
  public formGroup05: FormGroup = new FormGroup(this.controls05);
  public exterior05 = 'outlined';
  public isBtnEyeCrossed05e = false;
  public isBtnEyeCrossed05f = false;
  public isBtnEyeCrossed05g = false;
  public isBtnEyeCrossed05h = false;
  public config05h = {
    ornamRgAlign: 'baseline',
  };
  public ornamLfAlign05 = 'default';
  public ornamRgAlign05 = 'default';

  public config05 = {
    ornamLfAlign: this.ornamLfAlign05,
    ornamRgAlign: this.ornamRgAlign05,
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public changeConfig05(ornamLfAlign: string | undefined, ornamRgAlign: string | undefined): void {
    this.config05 = {
      ornamLfAlign: ornamLfAlign || 'default',
      ornamRgAlign: ornamRgAlign || 'default',
    };
  }
  public toStr(value: number): string {
    return String(value);
  }
  public toNum(value: any): number {
    return Number(value);
  }
}
