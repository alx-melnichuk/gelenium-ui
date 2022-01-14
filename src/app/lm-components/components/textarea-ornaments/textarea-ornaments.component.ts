import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GrnFrameInputConfig } from 'projects/lib-geranium/src/lib/interfaces/grn-frame-input-config.interface';
import { OrnamAlign } from 'projects/lib-geranium/src/lib/interfaces/ornam-align.interface';

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
  selector: 'app-textarea-ornaments',
  templateUrl: './textarea-ornaments.component.html',
  styleUrls: ['./textarea-ornaments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaOrnamentsComponent {
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

  public controls05 = {
    input05a: new FormControl('', []),
    input05b: new FormControl('First line\nSecond line', []),
    input05c: new FormControl('', []),
    input05d: new FormControl('', []),
  };
  public formGroup05: FormGroup = new FormGroup(this.controls05);
  public exterior05 = 'outlined';
  public isBtnEye05c = false;
  public isBtnEye05d = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  public configBaseline: GrnFrameInputConfig = {
    ornamLfAlign: OrnamAlign.baseline,
    ornamRgAlign: OrnamAlign.baseline,
  };
}
