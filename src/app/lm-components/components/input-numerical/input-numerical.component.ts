import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  selector: 'app-input-numerical',
  templateUrl: './input-numerical.component.html',
  styleUrls: ['./input-numerical.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumericalComponent {
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

  public formGroup04: FormGroup = new FormGroup({
    input04a: new FormControl('', []),
    input04b: new FormControl('', []),
    input04c: new FormControl('', []),
    input04d: new FormControl('-12345678901234567890', []),
    input04e: new FormControl('12345678901234567890.12', []),
    input04f: new FormControl('123456789012.12', []),
    input04g: new FormControl('between 3 and 6', []),

    input05e: new FormControl('12345678901234567890.12', []),
    input05f: new FormControl('123456789012.12', []),
    input05g: new FormControl('between 3 and 6', []),
  });
  public exterior04 = 'outlined';
  public exterior05 = 'outlined';

  public demo1 = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  public doInput2(event: any): void {
    console.log('doInput2() value="' + this.formGroup04.controls.input04c.value + '" cancelBubble=', event.cancelBubble); // TODO del;
  }
}
