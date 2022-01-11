import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GrnFrameInputConfig } from 'projects/lib-geranium/src/lib/interfaces/grn-frame-input-config.interface';
import { Exterior, FrameSize } from 'projects/lib-geranium/src/public-api';

import {
  CN_LABEL_CSS,
  CN_LABEL_HTML,
  CN_LABEL_OUTLINED,
  CN_LABEL_SHOW_SOURCE,
  CN_LABEL_STANDARD,
  CN_LABEL_TS,
  CN_LABEL_UNDERLINE,
} from 'src/app/constants/labels';

@Component({
  selector: 'app-frame-input-frame-size',
  templateUrl: './frame-input-frame-size.component.html',
  styleUrls: ['./frame-input-frame-size.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameInputFrameSizeComponent {
  @Input()
  public labelShowSource = CN_LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = CN_LABEL_OUTLINED;
  @Input()
  public labelUnderline = CN_LABEL_UNDERLINE;
  @Input()
  public labelStandard = CN_LABEL_STANDARD;
  @Input()
  public labelHtml = CN_LABEL_HTML;
  @Input()
  public labelTs = CN_LABEL_TS;
  @Input()
  public labelCss = CN_LABEL_CSS;

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
