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
  selector: 'app-input-attributes',
  templateUrl: './input-attributes.component.html',
  styleUrls: ['./input-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAttributesComponent {
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

  public formGroup02: FormGroup = new FormGroup({
    input02a: new FormControl('', []),
    input02b: new FormControl('Hello World', [Validators.required]),
    input02c: new FormControl('Hello World', []),
    input02d: new FormControl('Hello World', []),
    input02e: new FormControl('', []),
    input02f: new FormControl('Hello World', []),
    input02g: new FormControl('', []),
    input02h: new FormControl('', []),
    input02i: new FormControl('Hello World', []),
    input02j: new FormControl('', []),
    input02k: new FormControl('', []),
    input02l: new FormControl('#000000', []),
    input02m: new FormControl('', []),
    input02n: new FormControl('', []),
  });
  public exterior02 = 'outlined';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
