import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  selector: 'app-pl-select-bootstrap',
  templateUrl: './pl-select-bootstrap.component.html',
  styleUrls: ['./pl-select-bootstrap.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlSelectBootstrapComponent {
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

  public urlPlSelect = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_SELECT');

  public fruits = ['mango', 'lemon', 'orange', 'kiwi'];
  public control02a = {
    model02a: new FormControl(null, []),
    model02b: new FormControl(null, []),
    model02c: new FormControl(this.fruits[1], []),
    model02d: new FormControl(this.fruits[1], []),
  };
  public formGroup02a: FormGroup = new FormGroup(this.control02a);
  // GlnSelectConfig
  public config02a = {
    exterior: 'outlined',
    frameSize: 'short',
    isPlaceholder: true,
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
