import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  selector: 'app-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGroupComponent {
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

  public exterior04a = 'outlined';

  public tubers = ['potato', 'sweet potato', 'cassava', 'artichoke'];
  public roots = ['beet', 'carrot', 'turnip', 'radish'];
  public cabbage = ['white cabbage', 'kohlrabi', 'broccoli'];
  public salad = ['salad', 'leaf parsley', 'sorrel', 'spinach'];

  public control04a = {
    model04a: new FormControl(null, []),
  };
  public formGroup04a: FormGroup = new FormGroup(this.control04a);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
