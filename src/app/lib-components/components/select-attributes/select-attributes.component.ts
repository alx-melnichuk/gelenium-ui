import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from 'src/app/lib-core/constants/constants';

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

  public exterior02 = 'outlined';
  public fruits = ['Mango', 'Lemon', 'Orange', 'Kiwi'];

  public model02a = null;
  public model02b = this.fruits[1];
  public model02c = this.fruits[1];
  public model02d = this.fruits[1];
  public model02e = null;
  public model02f = this.fruits[1];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
