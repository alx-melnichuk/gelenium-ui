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
  selector: 'app-input-palette-customization',
  templateUrl: './input-palette-customization.component.html',
  styleUrls: ['./input-palette-customization.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPaletteCustomizationComponent implements OnInit {
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

  public minLength07e = 5;
  public maxLength07e = 15;
  public controls07 = {
    input07a: new FormControl('', []),
    input07b: new FormControl('Hello World', [Validators.required]),
    input07c: new FormControl('Hello World', []),
    input07d: new FormControl('Hello World', []),
    input07e: new FormControl('demo', [
      Validators.required,
      Validators.minLength(this.minLength07e),
      Validators.maxLength(this.maxLength07e),
    ]),
    input07f: new FormControl('Hello World', []),
  };
  public formGroup07: FormGroup = new FormGroup(this.controls07);
  public exterior07 = 'outlined';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
