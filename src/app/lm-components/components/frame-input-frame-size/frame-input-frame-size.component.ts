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
} from 'src/app/lib-core/constants/constants';

@Component({
  selector: 'app-frame-input-frame-size',
  templateUrl: './frame-input-frame-size.component.html',
  styleUrls: ['./frame-input-frame-size.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameInputFrameSizeComponent {
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

  public formGroup02: FormGroup = new FormGroup({
    input02a: new FormControl('Demo Size Short', []),
    input02b: new FormControl('Demo Size Small', []),
    input02c: new FormControl('Demo Size Middle', []),
    input02d: new FormControl('Demo Size Wide', []),
    input02e: new FormControl('Demo Size Large', []),
    input02f: new FormControl('Demo Size Huge', []),
  });
  public exterior02 = 'outlined';
  public isHiddenLabel = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
