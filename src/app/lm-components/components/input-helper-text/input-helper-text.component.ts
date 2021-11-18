import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { CN_LABEL_CSS, CN_LABEL_HTML, CN_LABEL_SHOW_SOURCE, CN_LABEL_TS } from '../constants';

@Component({
  selector: 'app-input-helper-text',
  templateUrl: './input-helper-text.component.html',
  styleUrls: ['./input-helper-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputHelperTextComponent {
  @Input()
  public labelShowSource = CN_LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = CN_LABEL_HTML;
  @Input()
  public labelTs = CN_LABEL_TS;
  @Input()
  public labelCss = CN_LABEL_CSS;

  public formGroup06: FormGroup = new FormGroup({
    input06a: new FormControl('Hello World', []),
    input06b: new FormControl('Hello World', []),
    input06c: new FormControl('Hello World', []),
    input06d: new FormControl('Hello World', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
