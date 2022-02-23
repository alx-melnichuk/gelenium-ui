import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrameSize } from 'projects/lib-geranium/src/lib/_interfaces/frame-size.interface';
import { GrnFrameInputConfig } from 'projects/lib-geranium/src/lib/_interfaces/grn-frame-input-config.interface';
import { InputExterior } from 'projects/lib-geranium/src/lib/_interfaces/input-exterior.interface';

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
  selector: 'app-input-attributes',
  templateUrl: './input-attributes.component.html',
  styleUrls: ['./input-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAttributesComponent {
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
    input02a: new FormControl('', []),
    input02b: new FormControl('Hello World', [Validators.required]),
    input02c: new FormControl('Hello World', []),
    input02d: new FormControl('Hello World', []),
    input02e: new FormControl('', []),
    input02f: new FormControl('Hello World', []),
    input02g: new FormControl('', []),
    input02h: new FormControl('', []),
    input02i: new FormControl('Hello World', []),
    input02j: new FormControl('', []),
    input02k: new FormControl('', []),
    input02l: new FormControl('#000000', []),
    input02m: new FormControl('', []),
    input02n: new FormControl('', []),
  });
  public exterior02 = 'outlined';
  // public exterior02 = 'underline';
  // public exterior02 = 'standard';

  public config02 = '';
  public config02a: GrnFrameInputConfig = {
    exterior: InputExterior.underline,
  };
  public config02b: GrnFrameInputConfig = {
    frameSize: FrameSize.wide,
  };
  public config02c: GrnFrameInputConfig = {
    frameSizeValue: 56,
  };
  public config02d: GrnFrameInputConfig = {
    isLabelShrink: true,
  };
  public config02e: GrnFrameInputConfig = {
    hiddenLabel: true,
  };
  public config02f: GrnFrameInputConfig = {
    labelPd: 40,
  };
  public config: GrnFrameInputConfig = { exterior: InputExterior.underline };
  // public config02f: GrnFrameInputConfig = {
  //   exterior?: InputExterior;
  //   frameSize?: FrameSize;
  //   frameSizeValue?: number;
  //   isLabelShrink?: boolean;
  //   hiddenLabel?: boolean;
  //   labelPd?: number; // px
  //   ornamLfAlign?: OrnamAlign;
  //   ornamRgAlign?: OrnamAlign;
  // };
  public isRequired = false;
  public isError = false;

  public isConfig = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public getConfig(config02: string): GrnFrameInputConfig | null {
    let result = null;
    if ('config02a' === config02) {
      result = this.config02a;
    } else if ('config02b' === config02) {
      result = this.config02b;
    } else if ('config02c' === config02) {
      result = this.config02c;
    } else if ('config02d' === config02) {
      result = this.config02d;
    } else if ('config02e' === config02) {
      result = this.config02e;
    } else if ('config02f' === config02) {
      result = this.config02f;
    }
    return result;
  }
}
