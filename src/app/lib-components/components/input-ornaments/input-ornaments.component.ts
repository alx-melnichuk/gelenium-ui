import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlnFrameConfig } from 'projects/gelenium-ui/src/lib/_interfaces/gln-frame-config.interface';
import { GlnOrnamAlign, GlnOrnamAlignUtil } from 'projects/gelenium-ui/src/lib/_interfaces/gln-ornam-align.interface';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from 'src/app/lib-core/constants/constants';

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

  public minLength05 = 3;
  public maxLength05 = 15;
  public controls05 = {
    input05a: new FormControl('', []),
    input05b: new FormControl('thirty', []),
    input05c: new FormControl('one', [Validators.required, Validators.minLength(this.minLength05), Validators.maxLength(this.maxLength05)]),
    input05d: new FormControl('', [Validators.required, Validators.minLength(this.minLength05), Validators.maxLength(this.maxLength05)]),
    input05e: new FormControl('thirty', [Validators.required]),
    input05f: new FormControl('thirty', [Validators.required]),
    input05g: new FormControl('thirty', [Validators.required]),
    input05h: new FormControl('thirty', [Validators.required]),
    input05i: new FormControl('', [Validators.required]),
    input05j: new FormControl('test', []),
    input05k: new FormControl('test', []),
  };
  public formGroup05: FormGroup = new FormGroup(this.controls05);
  public exterior05 = 'outlined';
  public isBtnEyeCrossed05e = false;
  public isBtnEyeCrossed05f = false;
  public isBtnEyeCrossed05g = false;
  public isBtnEyeCrossed05h = false;
  public config05h: GlnFrameConfig = {
    ornamRgAlign: GlnOrnamAlign.baseline,
  };
  public ornamLfAlign05 = 'default';
  public ornamRgAlign05 = 'default';

  public config05: GlnFrameConfig = {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.changeConfig05(this.convert(this.ornamLfAlign05), this.convert(this.ornamRgAlign05));
  }

  public convert(ornamAlign: string | null): GlnOrnamAlign {
    return GlnOrnamAlignUtil.convert(ornamAlign) || GlnOrnamAlign.default;
  }

  public changeConfig05(ornamLfAlign: GlnOrnamAlign | undefined, ornamRgAlign: GlnOrnamAlign | undefined): void {
    this.config05 = { ornamLfAlign, ornamRgAlign };
  }
}
