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
} from '../../../lib-core/constants/constants';

@Component({
  selector: 'app-select-attributes',
  templateUrl: './select-attributes.component.html',
  styleUrls: ['./select-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAttributesComponent {
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

  public fruits = ['mango', 'lemon', 'orange', 'kiwi'];

  public exterior02a = 'outlined';
  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl(null, []),
    model02b: new FormControl([] /*null*/ /*this.fruits[1]*/, [Validators.required]),
    model02c: new FormControl(this.fruits[1], []),
    model02d: new FormControl(this.fruits[1], []),
  });

  public exterior02b = 'outlined';
  public control02b = {
    model02e: new FormControl(null, []),
    model02f: new FormControl(null, [Validators.required]),
    model02g: new FormControl(this.fruits[1], []),
    model02h: new FormControl(this.fruits[1], []),
  };
  public formGroup02b: FormGroup = new FormGroup(this.control02b);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
