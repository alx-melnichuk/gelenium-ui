import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-input-attributes',
  templateUrl: './input-attributes.component.html',
  styleUrls: ['./input-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAttributesComponent implements OnInit {
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

  public formGroup02: FormGroup = new FormGroup({
    input02a: new FormControl('Hello World', [Validators.required]),
    input02b: new FormControl('Hello World', []),
    input02c: new FormControl('', []),
    input02d: new FormControl('Hello World', []),
    input02e: new FormControl('', []),
    input02f: new FormControl('Hello World', []),
    input02g: new FormControl('Hello World', []),
  });
  public exterior02 = 'outlined';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
