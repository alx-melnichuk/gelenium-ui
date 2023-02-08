import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnPaginationConfig, GLN_PAGINATION_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnPaginationConfigDefault: GlnPaginationConfig = {
  count: 11,
  countNearby: 2,
  exterior: 'outlined',
  size: 'small',
};

@Component({
  selector: 'app-cm-pagination-basic',
  templateUrl: './cm-pagination-basic.component.html',
  styleUrls: ['./cm-pagination-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [{ provide: GLN_PAGINATION_CONFIG, useValue: glnPaginationConfigDefault }],
})
export class CmPaginationBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = BTN_OUTLINED;
  @Input()
  public labelText = BTN_TEXT;

  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmPagination = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_PAGINATION');

  public isShowBasic = true;
  public isShowAttributes = true;
  public isShowSize = true;
  public isShowBorder = true;
  public isShowPalette = true;
  public isShowOrnam = true;
  public isShowConfig = true;

  // Page: "Basic" 01
  public page01a: number = 1;
  public page01b: number = 1;

  // Page: "Attributes" 02
  public exterior02a = 'outlined';
  public page02a: number = 1;
  public page02b: number = 1;
  public page02c: number = 1;
  public page02d: number = 1;
  public exterior02b = 'outlined';
  public page02f: number = 6;
  public page02g: number = 6;
  public page02h: number = 6;
  public page02i: number = 6;

  // Page: "Size" 03
  public exterior03a = 'outlined';
  public page03a: number = 1;
  public page03b: number = 1;
  public page03c: number = 1;
  public page03d: number = 1;
  public page03e: number = 1;
  public page03f: number = 1;

  public exterior03b = 'outlined';
  public page03h: number = 1;
  public page03i: number = 1;
  public page03j: number = 1;

  // Page: "Border" 04
  public exterior04a = 'outlined';
  public page04a: number = 1;
  public page04b: number = 1;

  // Page: "Ornaments" 05
  public exterior05a = 'outlined';
  public page05a: number = 1;
  public page05b: number = 1;
  public page05c: number = 1;

  // Page: "Config" 08
  public urlCmFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');
  public page08a: number = 6;
  public page08b: number = 6;

  // Page: "Palette"
  public urlPlPagination = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_PAGINATION');

  // Page: "PaletteBasic" 11
  public exterior11a = 'outlined';
  public page11a: number = 1;
  public page11b: number = 1;

  // Page: "PaletteBootstrap" 12
  public exterior12a = 'outlined';
  public page12a: number = 1;
  public page12b: number = 1;
  public page12c: number = 1;

  // Page: "PaletteMaterialUI" 13
  public page13a: number = 1;
  public page13b: number = 1;
  public page13c: number = 1;
  public page13d: number = 1;

  public page13f: number = 1;
  public page13g: number = 1;
  public page13h: number = 1;
  public page13i: number = 1;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
