import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { GlnFrameConfig, GlnFrameOrnamAlign } from 'gelenium-ui';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../../lib-core/constants';

@Component({
  selector: 'app-textarea-ornaments',
  templateUrl: './textarea-ornaments.component.html',
  styleUrls: ['./textarea-ornaments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaOrnamentsComponent {
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

  public urlTextarea = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_TEXTAREA');

  public controls05 = {
    model05a: new FormControl('', []),
    model05b: new FormControl('First line\nSecond line', []),
    model05c: new FormControl('', []),
    model05d: new FormControl('', []),
  };
  public formGroup05: FormGroup = new FormGroup(this.controls05);
  public exterior05 = 'outlined';
  public isBtnEye05c = false;
  public isBtnEye05d = false;

  public configBaseline: GlnFrameConfig = {
    ornamRgAlign: GlnFrameOrnamAlign.baseline,
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
