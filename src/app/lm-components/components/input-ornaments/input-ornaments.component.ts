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
} from '../constants';

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

  public minLength08 = 4;
  public maxLength08 = 15;
  public controls08 = {
    input08a: new FormControl('thirty', []),
    input08b: new FormControl('thirty', []),
    input08c: new FormControl('one', [Validators.required, Validators.minLength(this.minLength08), Validators.maxLength(this.maxLength08)]),
    input08d: new FormControl('five hundred ninety eight', [
      Validators.required,
      Validators.minLength(this.minLength08),
      Validators.maxLength(this.maxLength08),
    ]),
    input08e: new FormControl('thirty', [Validators.required]),
    input08f: new FormControl('thirty', [Validators.required]),
  };
  public formGroup08: FormGroup = new FormGroup(this.controls08);
  public exterior08 = 'outlined';
  public isBtnEyeCrossed08e = false;
  public isBtnEyeCrossed08f = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
