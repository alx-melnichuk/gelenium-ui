import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GrnFrameInputConfig } from 'projects/lib-geranium/src/lib/interfaces/grn-frame-input-config.interface';
import { OrnamAlign, OrnamAlignUtil } from 'projects/lib-geranium/src/lib/interfaces/ornam-align.interface';

import {
  CN_LABEL_CSS,
  CN_LABEL_HTML,
  CN_LABEL_OUTLINED,
  CN_LABEL_SHOW_SOURCE,
  CN_LABEL_STANDARD,
  CN_LABEL_TS,
  CN_LABEL_UNDERLINE,
} from 'src/app/constants/labels';

@Component({
  selector: 'app-input-ornaments',
  templateUrl: './input-ornaments.component.html',
  styleUrls: ['./input-ornaments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOrnamentsComponent {
  @Input()
  public labelShowSource = CN_LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = CN_LABEL_OUTLINED;
  @Input()
  public labelUnderline = CN_LABEL_UNDERLINE;
  @Input()
  public labelStandard = CN_LABEL_STANDARD;
  @Input()
  public labelHtml = CN_LABEL_HTML;
  @Input()
  public labelTs = CN_LABEL_TS;
  @Input()
  public labelCss = CN_LABEL_CSS;

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
  public config05h: GrnFrameInputConfig = {
    ornamRgAlign: OrnamAlign.baseline,
  };
  public ornamLfAlign05 = 'baseline';
  public ornamRgAlign05 = 'baseline';

  public config05: GrnFrameInputConfig = {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.changeConfig05(this.convert(this.ornamLfAlign05), this.convert(this.ornamRgAlign05));
  }

  public convert(ornamAlign: string | null): OrnamAlign {
    return OrnamAlignUtil.convert(ornamAlign) || OrnamAlign.default;
  }

  public changeConfig05(ornamLfAlign: OrnamAlign | undefined, ornamRgAlign: OrnamAlign | undefined): void {
    this.config05 = { ornamLfAlign, ornamRgAlign };
  }
}
