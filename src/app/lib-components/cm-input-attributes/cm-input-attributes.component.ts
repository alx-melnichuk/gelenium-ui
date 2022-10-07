import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../lib-core/constants';

@Component({
  selector: 'app-cm-input-attributes',
  templateUrl: './cm-input-attributes.component.html',
  styleUrls: ['./cm-input-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmInputAttributesComponent {
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

  public urlCmInput = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_INPUT');
  public urlCmFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');

  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl('', []),
    model02b: new FormControl('Hello World', [Validators.required]),
    model02c: new FormControl('Hello World', []),
    model02d: new FormControl('Hello World', []),
    model02e: new FormControl('', []),
    model02f: new FormControl(null, []),
  });
  public exterior02a = 'outlined';

  public control02c = {
    model02i: new FormControl(null, []),
    model02j: new FormControl(null, []),
    model02k: new FormControl('Hello World', []),
    model02l: new FormControl(null, []),
  };
  public formGroup02c: FormGroup = new FormGroup(this.control02c);
  public exterior02c = 'outlined';

  public control02d = {
    model02m: new FormControl(null, []),
    model02n: new FormControl('#000000'),
    model02o: new FormControl(null, []),
    model02p: new FormControl(null, []),
  };
  public formGroup02d: FormGroup = new FormGroup(this.control02d);
  public exterior02d = 'outlined';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
