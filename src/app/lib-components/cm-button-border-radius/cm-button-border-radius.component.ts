import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnFrameSizeUtil } from 'gelenium-ui';

import { BTN_CONTAINED, BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';
import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-cm-button-border-radius',
  templateUrl: './cm-button-border-radius.component.html',
  styleUrls: ['./cm-button-border-radius.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmButtonBorderRadiusComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;
  @Input()
  public labelContained = BTN_CONTAINED;
  @Input()
  public labelOutlined = BTN_OUTLINED;
  @Input()
  public labelText = BTN_TEXT;

  public urlCmButton = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_COMPONENTS_BUTTON');

  public routerLink = this.urlCmButton;

  public exterior04a = 'outlined';
  public borderRadius = 50;
  public isAddPadding04a = true;
  public labelPdRatio = 0.4;

  public exterior04b = 'outlined';
  public isAddPadding04b = true;
  public radiusRatio = 0.3;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public getLabel(exterior: string): string {
    return exterior ? exterior.substring(0, 1).toUpperCase() + exterior.substring(1) : '';
  }
  public getSize(frameSize: string | null): number {
    return GlnFrameSizeUtil.getValue(GlnFrameSizeUtil.convert(frameSize)) ?? 0;
  }
  public getRadius(frameSize: string | null, radiusRatio: number): number {
    return Math.round((this.getSize(frameSize) * radiusRatio * 100) / 100);
  }
}
