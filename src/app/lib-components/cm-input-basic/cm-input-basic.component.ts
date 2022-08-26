import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';
import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-input-basic',
  templateUrl: './cm-input-basic.component.html',
  styleUrls: ['./cm-input-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmInputBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmInput = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_INPUT');

  public formGroup01: FormGroup = new FormGroup({
    model01a: new FormControl('', []),
    model01b: new FormControl('', []),
    model01c: new FormControl('', []),
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
