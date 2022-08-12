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
} from '../../../lib-core/constants';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-select-trigger',
  templateUrl: './select-trigger.component.html',
  styleUrls: ['./select-trigger.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTriggerComponent {
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

  public urlSelect = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_SELECT');

  public exterior05a = 'outlined';

  public salad = [
    'lettuce (lettuce)',
    'leaf parsley',
    'mustard leaf',
    'swans',
    'sorrel',
    'spinach',
    'purslane',
    'chard (leaf beet)',
    'vegetable fennel',
    'arugula',
    'cucumber grass',
    'nettles',
  ];

  public control05a = {
    model05a: new FormControl([this.salad[0], this.salad[1]], []),
  };
  public formGroup05a: FormGroup = new FormGroup(this.control05a);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
