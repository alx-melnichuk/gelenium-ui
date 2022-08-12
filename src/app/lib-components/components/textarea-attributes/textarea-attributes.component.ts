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
  selector: 'app-textarea-attributes',
  templateUrl: './textarea-attributes.component.html',
  styleUrls: ['./textarea-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaAttributesComponent {
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
    model02a: new FormControl('', []),
    model02b: new FormControl('Hello World', [Validators.required]),
    model02c: new FormControl('Hello World', []),
    model02d: new FormControl('Hello World', []),
    model02e: new FormControl('', []),
    model02f: new FormControl('Hello World', []),
  });
  public exterior02 = 'outlined';
  public cntRows = 2;
}
