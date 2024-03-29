import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { GlnSelectConfig, GLN_SELECT_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnSelectConfigDefault: GlnSelectConfig = {
  exterior: 'outlined',
  size: 'small',
  backdropClass: 'sc-backdrop',
  isMultiple: true,
  overlayClasses: ['sc-overlay-panel'],
  classes: ['sc-panel'],
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

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmFrame = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');
  public urlCmSelect = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SELECT');

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
    model08a: new FormControl([this.salad[1]], []),
    model08b: new FormControl([this.salad[1]], []),
  };
  public formGroup08a: FormGroup = new FormGroup(this.control08a);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
