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
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-select-ornaments',
  templateUrl: './select-ornaments.component.html',
  styleUrls: ['./select-ornaments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOrnamentsComponent {
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

  public exterior06a = 'outlined';

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
  public isUncode06a = false;
  public isUncode06b = false;
  public control06a = {
    model06a: new FormControl([], []),
    model06b: new FormControl([], []),
  };
  public formGroup06a: FormGroup = new FormGroup(this.control06a);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
