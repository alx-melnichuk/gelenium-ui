import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-frame-input-palette',
  templateUrl: './frame-input-palette.component.html',
  styleUrls: ['./frame-input-palette.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameInputPaletteComponent {
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

  public minLength06e = 5;
  public controls06 = {
    input06a: new FormControl('', []),
    input06b: new FormControl('Hello World', [Validators.required]),
    input06c: new FormControl('Hello World', []),
    input06d: new FormControl('Hello World', []),
    input06e: new FormControl('demo', [Validators.required, Validators.minLength(this.minLength06e)]),
    input06f: new FormControl('Hello World', []),
    input06g: new FormControl('Hello World', [Validators.required]),
    input06h: new FormControl('', [Validators.required]),
    input06i: new FormControl('Hello World', []),
  };
  public formGroup06: FormGroup = new FormGroup(this.controls06);
  public exterior06 = 'outlined';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
