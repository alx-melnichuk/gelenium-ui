import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GlnFrameConfig, GlnFrameOrnamAlign, GlnFrameOrnamAlignUtil } from 'gelenium-ui';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../../lib-core/constants';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-input-ornaments',
  templateUrl: './input-ornaments.component.html',
  styleUrls: ['./input-ornaments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOrnamentsComponent {
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

  public urlInput = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_INPUT');

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
  public config05h: GlnFrameConfig = {
    ornamRgAlign: GlnFrameOrnamAlign.baseline,
  };
  public ornamLfAlign05 = 'default';
  public ornamRgAlign05 = 'default';

  public config05: GlnFrameConfig = {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.changeConfig05(this.convert(this.ornamLfAlign05), this.convert(this.ornamRgAlign05));
  }

  public convert(ornamAlign: string | null): GlnFrameOrnamAlign {
    return GlnFrameOrnamAlignUtil.convert(ornamAlign) || GlnFrameOrnamAlign.default;
  }

  public changeConfig05(ornamLfAlign: GlnFrameOrnamAlign | undefined, ornamRgAlign: GlnFrameOrnamAlign | undefined): void {
    this.config05 = { ornamLfAlign, ornamRgAlign };
  }

  public toStr(value: number): string {
    return String(value);
  }
  public toNum(value: any): number {
    return Number(value);
  }
}
