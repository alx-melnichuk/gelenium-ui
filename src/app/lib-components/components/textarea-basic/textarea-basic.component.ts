import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../../lib-core/constants/constants';

@Component({
  selector: 'app-textarea-basic',
  templateUrl: './textarea-basic.component.html',
  styleUrls: ['./textarea-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public formGroup01: FormGroup = new FormGroup({
    input01a: new FormControl('', []),
    input01b: new FormControl('', []),
    input01c: new FormControl('', []),
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
