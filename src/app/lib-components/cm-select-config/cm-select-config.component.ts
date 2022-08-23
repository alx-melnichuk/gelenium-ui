import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { GlnFrameExterior, GlnFrameSize, GlnSelectConfig, GLN_SELECT_CONFIG } from 'gelenium-ui';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';
import { UrlUtil } from '../../lib-core/utils/url.util';

const glnSelectConfigDefault: GlnSelectConfig = {
  exterior: GlnFrameExterior.underline,
  frameSize: GlnFrameSize.wide,
  backdropClass: 'sc-backdrop',
  isMultiple: true,
  overlayPanelClass: ['sc-overlay-panel'],
  panelClass: ['sc-panel'],
  visibleSize: 6,
};

@Component({
  selector: 'app-cm-select-config',
  templateUrl: './cm-select-config.component.html',
  styleUrls: ['./cm-select-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_SELECT_CONFIG, useValue: glnSelectConfigDefault }],
})
export class CmSelectConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmFrame = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');
  public urlCmSelect = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_SELECT');

  public salad = [
    'lettuce (lettuce)',
    'leaf parsley',
    'mustard leaf',
    'swans',
    'sorrel',
    'spinach',
    'purslane',
    'chard (leaf beet)',
    'vegetable fennel',
    'arugula',
    'cucumber grass',
    'nettles',
  ];
  public control08a = {
    model08a: new FormControl([], []),
  };
  public formGroup08a: FormGroup = new FormGroup(this.control08a);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
