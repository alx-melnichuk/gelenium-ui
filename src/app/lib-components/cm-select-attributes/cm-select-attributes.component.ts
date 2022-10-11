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
  selector: 'app-cm-select-attributes',
  templateUrl: './cm-select-attributes.component.html',
  styleUrls: ['./cm-select-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSelectAttributesComponent {
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

  public urlCmSelect = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SELECT');

  public fruits = ['mango', 'lemon', 'orange', 'kiwi'];

  public exterior02a = 'outlined';
  public control02a = {
    model02a: new FormControl(null, []),
    model02b: new FormControl(this.fruits[0], [Validators.required]),
    model02c: new FormControl(this.fruits[0], []),
    model02d: new FormControl(this.fruits[0], []),
    model02e: new FormControl(null, []),
    model02f: new FormControl(null, []),
  };
  public formGroup02a: FormGroup = new FormGroup(this.control02a);

  public fruitsB = ['mango', 'ripe lemon', 'gorgeous orange', 'succulent watermelon'];
  public exterior02b = 'outlined';
  public control02b = {
    model02i: new FormControl(null, []),
    model02j: new FormControl(null, []),
    model02k: new FormControl(null, []),
    model02l: new FormControl(null, []),
  };
  public formGroup02b: FormGroup = new FormGroup(this.control02b);
  public fruitsC = ['orange', 'grapefruit', 'lemon', 'clementine', 'mandarin', 'mineola', 'pomelo', 'ponkan', 'poncirus', 'citron'];

  public flowers = [
    'rose',
    'carnation',
    'tulip',
    'chamomile',
    'daffodil',
    'gerbera',
    'orchid',
    'lilac',
    'gardenia',
    'jasmine',
    'magnolia',
    'hyacinth',
  ];
  public exterior02c = 'outlined';
  public control02c = {
    model02m: new FormControl([this.flowers[1], this.flowers[3], this.flowers[4]], []),
    model02n: new FormControl([], []),
    model02o: new FormControl([], []),
  };
  public formGroup02c: FormGroup = new FormGroup(this.control02c);

  public exterior02e = 'outlined';
  public hideLabel02e = false;
  public control02e = {
    model02p: new FormControl([this.flowers[1], this.flowers[3], this.flowers[4]], []),
    model02q: new FormControl([this.flowers[1], this.flowers[3], this.flowers[4]], []),
    model02r: new FormControl([this.flowers[1], this.flowers[3], this.flowers[4]], []),
  };
  public formGroup02e: FormGroup = new FormGroup(this.control02e);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
