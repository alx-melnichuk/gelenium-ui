import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../../lib-core/constants';

@Component({
  selector: 'app-input-basic',
  templateUrl: './input-basic.component.html',
  styleUrls: ['./input-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public formGroup01: FormGroup = new FormGroup({
    model01a: new FormControl('', []),
    model01b: new FormControl('', []),
    model01c: new FormControl('', []),
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
