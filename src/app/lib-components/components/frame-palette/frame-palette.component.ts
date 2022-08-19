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
} from '../../../lib-core/constants';
import { UrlUtil } from '../../../lib-core/utils/url.util';

@Component({
  selector: 'app-frame-palette',
  templateUrl: './frame-palette.component.html',
  styleUrls: ['./frame-palette.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FramePaletteComponent {
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

  public urlFrame2 = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');

  public minLength06a = 5;
  public controls06a = {
    model06a: new FormControl('', []),
    model06b: new FormControl('Hello World', [Validators.required]),
    model06c: new FormControl('Hello World', []),
    model06d: new FormControl('Hello World', []),
    model06e: new FormControl('demo', [Validators.required, Validators.minLength(this.minLength06a)]),
    model06f: new FormControl('Hello World', []),
  };
  public formGroup06a: FormGroup = new FormGroup(this.controls06a);
  public exterior06a = 'outlined';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
