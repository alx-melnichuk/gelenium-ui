import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { GlnFrameExterior, GlnFrameSize, GlnSelectConfig, GLN_SELECT_CONFIG } from 'gelenium-ui';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../../lib-core/constants/constants';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

const glnSelectConfigDefault: GlnSelectConfig = {
  exterior: GlnFrameExterior.underline,
  frameSize: GlnFrameSize.wide,
  panelClass: 'sc-panel',
  visibleSize: 7,
};

@Component({
  selector: 'app-select-config',
  templateUrl: './select-config.component.html',
  styleUrls: ['./select-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_SELECT_CONFIG, useValue: glnSelectConfigDefault }],
})
export class SelectConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlSelect = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_SELECT');
  public urlFrame2 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME2');

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
