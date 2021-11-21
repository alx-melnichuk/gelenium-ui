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
  selector: 'app-textarea-attributes',
  templateUrl: './textarea-attributes.component.html',
  styleUrls: ['./textarea-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaAttributesComponent {
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

  public controls02 = {
    input02a: new FormControl('Hello World', [Validators.required]),
    input02b: new FormControl('Hello World', []),
    input02c: new FormControl('Hello World', []),
    input02d: new FormControl('Hello World', []),
    input02e: new FormControl('Hello World', []),
    input02f: new FormControl('Hello World', []),
    input02g: new FormControl('', []),
    input02h: new FormControl('', []),
    input02i: new FormControl('', [Validators.required]),
    input02j: new FormControl('Hello World', []),
    // i, j, k
  };
  public formGroup02: FormGroup = new FormGroup(this.controls02);
  public exterior02 = 'outlined';
  public minLength02 = 4;
  public maxLength02 = 15;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
