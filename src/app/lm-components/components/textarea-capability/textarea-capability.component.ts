import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  selector: 'app-textarea-capability',
  templateUrl: './textarea-capability.component.html',
  styleUrls: ['./textarea-capability.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaCapabilityComponent {
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

  public text1 = 'line 1\nline 2';
  public text2 = this.text1 + '\nline 3\nline 4\nline 5';
  public formGroup04: FormGroup = new FormGroup({
    input04a: new FormControl(this.text1, []),
    input04b: new FormControl(this.text2, []),
    input04c: new FormControl(this.text1, []),
    input04d: new FormControl(this.text2, []),
  });
  public exterior04 = 'outlined';
}
