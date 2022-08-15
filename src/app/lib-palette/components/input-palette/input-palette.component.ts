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
} from '../../../lib-core/constants';

@Component({
  selector: 'app-input-palette',
  templateUrl: './input-palette.component.html',
  styleUrls: ['./input-palette.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPaletteComponent {
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

  public exterior02a = 'outlined';
  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl(null, []),
    model02b: new FormControl(null /*'Hello World'*/, [Validators.required]),
    model02c: new FormControl('Hello World', []),
    model02d: new FormControl('Hello World', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
