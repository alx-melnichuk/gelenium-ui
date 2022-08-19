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

  public urlInput = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_INPUT');
  public urlFrame1 = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');
  public urlFrame2 = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');

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
    model02f: new FormControl(null, [Validators.required]),
    model02g: new FormControl('Hello World', []),
    model02h: new FormControl('Hello World', []),
  };
  public formGroup02b: FormGroup = new FormGroup(this.control02b);

  public exterior02c = 'outlined';
  public control02c = {
    model02i: new FormControl(null, []),
    model02j: new FormControl(null, []),
    model02k: new FormControl('Hello World', []),
    model02l: new FormControl(null, []),
  };
  public formGroup02c: FormGroup = new FormGroup(this.control02c);

  public exterior02d = 'outlined';
  public control02d = {
    model02m: new FormControl(null, []),
    model02n: new FormControl('#000000'),
    model02o: new FormControl(null, []),
    model02p: new FormControl(null, []),
  };
  public formGroup02d: FormGroup = new FormGroup(this.control02d);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
