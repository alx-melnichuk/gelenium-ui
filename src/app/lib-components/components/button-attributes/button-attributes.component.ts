import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { LABEL_CSS, LABEL_HTML, LABEL_TS } from 'src/app/lib-core/constants/constants';

@Component({
  selector: 'app-button-attributes',
  templateUrl: './button-attributes.component.html',
  styleUrls: ['./button-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonAttributesComponent {
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
