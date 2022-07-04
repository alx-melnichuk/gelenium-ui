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
} from '../../../lib-core/constants/constants';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-frame-attributes',
  templateUrl: './frame-attributes.component.html',
  styleUrls: ['./frame-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameAttributesComponent {
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

  public urlFrame = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME');

  public exterior02a = 'outlined';
  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl(null, []),
    model02b: new FormControl('Hello World', [Validators.required]),
    model02c: new FormControl('Hello World', []),
    model02d: new FormControl('Hello World', []),
  });

  public exterior02b = 'outlined';
  public control02b = {
    model02e: new FormControl(null, []),
    model02f: new FormControl(null, []),
    model02g: new FormControl('Hello World', []),
  };
  public formGroup02b: FormGroup = new FormGroup(this.control02b);

  public exterior02c = 'outlined';
  public formGroup02c: FormGroup = new FormGroup({
    model02h: new FormControl('Hello World', []),
    model02i: new FormControl('Hello World', []),
    model02j: new FormControl('Hello World', []),
  });

  public config02 = {
    frameSizeValue: 57,
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
