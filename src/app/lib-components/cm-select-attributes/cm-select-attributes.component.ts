import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  public urlCmSelect = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_SELECT');

  public fruits = ['mango', 'lemon', 'orange', 'kiwi'];

  public exterior02a = 'outlined';
  public formGroup02a: FormGroup = new FormGroup({
    model02a: new FormControl(null, []),
    model02b: new FormControl(this.fruits[0], [Validators.required]),
    model02c: new FormControl(this.fruits[0], []),
    model02d: new FormControl(this.fruits[0], []),
  });

  public exterior02b = 'outlined';
  public control02b = {
    model02e: new FormControl(null, []),
    model02f: new FormControl(null, [Validators.required]),
    model02g: new FormControl(this.fruits[0], []),
  };
  public formGroup02b: FormGroup = new FormGroup(this.control02b);

  public fruitsC = ['mango', 'ripe lemon', 'gorgeous orange', 'succulent watermelon'];
  public exterior02c = 'outlined';
  public control02c = {
    model02i: new FormControl(null, []),
    model02j: new FormControl(null, []),
    model02k: new FormControl(null, []),
    model02l: new FormControl(null, []),
  };
  public formGroup02c: FormGroup = new FormGroup(this.control02c);

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
  public exterior02d = 'outlined';
  public control02d = {
    model02m: new FormControl([this.flowers[1], this.flowers[3], this.flowers[4]], []),
    model02n: new FormControl([], []),
    model02o: new FormControl([], []),
  };
  public formGroup02d: FormGroup = new FormGroup(this.control02d);

  public exterior02e = 'outlined';
  public isNoLabel02e = false;
  public control02e = {
    model02p: new FormControl([this.flowers[1], this.flowers[3], this.flowers[4]], []),
    model02q: new FormControl([this.flowers[1], this.flowers[3], this.flowers[4]], []),
    model02r: new FormControl([this.flowers[1], this.flowers[3], this.flowers[4]], []),
  };
  public formGroup02e: FormGroup = new FormGroup(this.control02e);
  // GlnFrameConfig
  public config02p = { frameSizeValue: 57 };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
