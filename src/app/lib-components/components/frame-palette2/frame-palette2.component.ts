import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../../lib-core/constants/constants';

@Component({
  selector: 'app-frame-palette2',
  templateUrl: './frame-palette2.component.html',
  styleUrls: ['./frame-palette2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FramePalette2Component {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlFrame2 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME2');

  public controls06b = {
    model06g: new FormControl('Hello World', []),
    model06h: new FormControl('', []),
    model06i: new FormControl('Hello World', []),
    model06j: new FormControl('Hello World', []),
  };
  public formGroup06b: FormGroup = new FormGroup(this.controls06b);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
