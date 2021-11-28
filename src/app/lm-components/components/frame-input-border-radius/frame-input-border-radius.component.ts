import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';

import { URL_COMPONENTS, URL_FRAME_INPUT } from '../../lm-components.interface';

import {
  CN_LABEL_CSS,
  CN_LABEL_HTML,
  CN_LABEL_OUTLINED,
  CN_LABEL_SHOW_SOURCE,
  CN_LABEL_STANDARD,
  CN_LABEL_TS,
  CN_LABEL_UNDERLINE,
} from '../constants';

@Component({
  selector: 'app-frame-input-border-radius',
  templateUrl: './frame-input-border-radius.component.html',
  styleUrls: ['./frame-input-border-radius.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameInputBorderRadiusComponent {
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

  public formGroup05: FormGroup = new FormGroup({
    input05a: new FormControl('Demo Size Short', []),
    input05b: new FormControl('Demo Size Small', []),
    input05c: new FormControl('Demo Size Middle', []),
    input05d: new FormControl('Demo Size Wide', []),
    input05e: new FormControl('Demo Size Large', []),
    input05f: new FormControl('Demo Size Huge', []),
  });
  public exterior05 = 'outlined';
  public isHiddenLabel = false;
  public borderRadius = 50;
  public urlFrameInput = '/' + URL_COMPONENTS + '/' + URL_FRAME_INPUT;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @HostBinding('style')
  public get getClass(): string | null {
    return '--ibr-border-radius: ' + this.borderRadius + ';';
  }

  public inputBorderRadius(event: MatSliderChange): void {
    if (!!event && event.value != null) {
      this.borderRadius = event.value;
    }
  }
}
