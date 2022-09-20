import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { UrlParamUtil } from 'gelenium-ui';

import { UrlUtil } from '../../lib-core/utils/url.util';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../lib-core/constants';

const CN_EXTERIOR = 'exterior';

@Component({
  selector: 'app-cm-frame-feature',
  templateUrl: './cm-frame-feature.component.html',
  styleUrls: ['./cm-frame-feature.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmFrameFeatureComponent implements OnInit {
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

  public urlCmFrame = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_COMPONENTS_FRAME');

  public exterior08a = 'outlined';

  public model08a = 'Hello World';
  public model08b = 'Hello World';

  public model08c = 'Hello World';
  public noAnm08c = true;

  public model08d = 'Hello World';
  public noAnm08d = true;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public ngOnInit(): void {
    const exteriorStr = UrlParamUtil.getPrm(location.href, CN_EXTERIOR) || this.exterior08a;
    if (exteriorStr !== this.exterior08a) {
      this.doChangeExterior(exteriorStr);
      this.exterior08a = exteriorStr;
    }
  }

  public doChangeExterior(exteriorStr: string): void {
    location.href = UrlParamUtil.addPrm(location.href, CN_EXTERIOR, exteriorStr);
  }
}
