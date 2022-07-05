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
  selector: 'app-frame-size',
  templateUrl: './frame-size.component.html',
  styleUrls: ['./frame-size.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameSizeComponent {
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

  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl('Demo Size Short', []),
    model02b: new FormControl('Demo Size Small', []),
    model02c: new FormControl('Demo Size Middle', []),
    model02d: new FormControl('Demo Size Wide', []),
    model02e: new FormControl('Demo Size Large', []),
    model02f: new FormControl('Demo Size Huge', []),
  });
  public exterior02a = 'outlined';
  public isNoLabel02a = false;

  public formGroup02b: FormGroup = new FormGroup({
    model02g: new FormControl('Demo Size Config', []),
    model02h: new FormControl('Demo Size Config', []),
    model02i: new FormControl('Demo Size Config', []),
  });
  public exterior02b = 'outlined';
  public isNoLabel02b = false;

  // GlnFrameConfig
  public config02g = {
    frameSizeValue: 57,
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
