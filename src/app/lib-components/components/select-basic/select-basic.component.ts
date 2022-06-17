import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from 'src/app/lib-core/constants/constants';

@Component({
  selector: 'app-select-basic',
  templateUrl: './select-basic.component.html',
  styleUrls: ['./select-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public formGroup01: FormGroup = new FormGroup({
    input01a: new FormControl(null, []),
    input01b: new FormControl('', []),
    input01c: new FormControl('', []),
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public demoPet = '';
}
