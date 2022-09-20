import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { GlnFrameConfig, GlnFrameExterior, GlnFrameSize } from 'gelenium-ui';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../lib-core/constants';
import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-pl-input-bootstrap',
  templateUrl: './pl-input-bootstrap.component.html',
  styleUrls: ['./pl-input-bootstrap.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlInputBootstrapComponent {
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

  public urlPlInput = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_PALETTE_INPUT');

  public control02a = {
    model02a: new FormControl(null, []),
    model02b: new FormControl(null, []),
    model02c: new FormControl('Hello World', []),
    model02d: new FormControl('Hello World', []),
  };
  public formGroup02a: FormGroup = new FormGroup(this.control02a);

  public config02a: GlnFrameConfig = {
    exterior: GlnFrameExterior.outlined,
    frameSize: GlnFrameSize.short,
    isNoLabel: true,
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
