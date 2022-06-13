import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-frame-palette3',
  templateUrl: './frame-palette3.component.html',
  styleUrls: ['./frame-palette3.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FramePalette3Component {
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

  public minLength06c = 5;
  public controls06c = {
    input06k: new FormControl('', []),
    input06l: new FormControl('Hello World', [Validators.required]),
    input06m: new FormControl('Hello World', []),
    input06n: new FormControl('Hello World', []),
    input06o: new FormControl('demo', [Validators.required, Validators.minLength(this.minLength06c)]),
    input06p: new FormControl('Hello World', []),
  };
  public formGroup06c: FormGroup = new FormGroup(this.controls06c);
  public exterior06c = 'outlined';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
