import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { CN_LABEL_CSS, CN_LABEL_HTML, CN_LABEL_SHOW_SOURCE, CN_LABEL_TS } from '../constants';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputValidationComponent {
  @Input()
  public labelShowSource = CN_LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = CN_LABEL_HTML;
  @Input()
  public labelTs = CN_LABEL_TS;
  @Input()
  public labelCss = CN_LABEL_CSS;

  public formGroup03: FormGroup = new FormGroup({
    input03a: new FormControl('Hello World', []),
    input03b: new FormControl('Hello World', []),
    input03c: new FormControl('Hello World', []),
    input03d: new FormControl('Hello World', []),
    input03e: new FormControl('Hello World', []),
    input03f: new FormControl('Hello World', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
