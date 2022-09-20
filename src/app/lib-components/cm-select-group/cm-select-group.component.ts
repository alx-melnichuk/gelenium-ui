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
} from '../../lib-core/constants';
import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-select-group',
  templateUrl: './cm-select-group.component.html',
  styleUrls: ['./cm-select-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSelectGroupComponent {
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

  public urlCmSelect = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_COMPONENTS_SELECT');

  public exterior04a = 'outlined';

  public tubers = ['potato', 'jerusalem artichoke', 'sweet potato', 'cassava', 'tuberous nasturtium'];
  public cabbage = ['white cabbage', 'portuguese cabbage', 'japanese cabbage', 'kohlrabi', 'broccoli'];
  public salad = ['leaf parsley', 'mustard leaf', 'spinach', 'chard (leaf beet)', 'vegetable fennel'];

  public control04a = {
    model04a: new FormControl(this.tubers[1], []),
  };
  public formGroup04a: FormGroup = new FormGroup(this.control04a);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
