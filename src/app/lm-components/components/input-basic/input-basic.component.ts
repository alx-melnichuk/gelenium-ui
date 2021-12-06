import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CN_LABEL_CSS, CN_LABEL_HTML, CN_LABEL_SHOW_SOURCE, CN_LABEL_TS } from 'src/app/constants/labels';

@Component({
  selector: 'app-input-basic',
  templateUrl: './input-basic.component.html',
  styleUrls: ['./input-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputBasicComponent {
  @Input()
  public labelShowSource = CN_LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = CN_LABEL_HTML;
  @Input()
  public labelTs = CN_LABEL_TS;
  @Input()
  public labelCss = CN_LABEL_CSS;

  public formGroup01: FormGroup = new FormGroup({
    input01a: new FormControl('', []),
    input01b: new FormControl('', []),
    input01c: new FormControl('', []),
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
