import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  selector: 'app-cm-autocomplete-attributes',
  templateUrl: './cm-autocomplete-attributes.component.html',
  styleUrls: ['./cm-autocomplete-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmAutocompleteAttributesComponent {
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

  public urlCmAutocomplete = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_AUTOCOMPLETE');

  // prettier-ignore
  public fruitsB = [
    'mango', 'ripe lemon', 'gorgeous orange',
    'african cherry orange', 'succulent watermelon'
  ];
  // prettier-ignore
  public fruits = [
    'apple'     , 'apricot'  , 'avocado'   , 'banana'    , 'black currant',
    'blackberry', 'blueberry', 'cherry'    , 'coconut'   , 'cranberry'    ,
    'dragonfruit', 'fig'     , 'goji berry', 'grape'     , 'grapefruit'   ,
    'grapes'    , 'guava'    , 'iwi'       , 'jackfruit' , 'jamun'        ,
    'jujube'    , 'lemon'    , 'lime'      , 'longan'    , 'loquat'       ,
    'lychee'    , 'mandarin' , 'mango'     , 'melon'     , 'mulberry'     ,
    'nectarine' , 'kiwi'     , 'olive'     , 'orange'    , 'palm fruit'   ,
    'papaya', 'passion fruit', 'peach'     , 'pear'      , 'persimmon'    ,
    'pineapple' , 'plum'  , 'pomegranate', 'prickly pear', 'pumpkin'      ,
    'quince'    , 'raspberry', 'red currant', 'sapodilla', 'satsuma'      ,
    'strawberry','sweet lemon', 'tamarind' , 'tangerine' , 'watermelon'
  ];

  // Block "attributes-supported01"
  public exterior02b = 'outlined';
  public control02b = {
    model02a: new FormControl(null, []),
    model02b: new FormControl(null, []),
    model02c: new FormControl(null, []),
    model02d: new FormControl(null, []),
  };
  public formGroup02b: FormGroup = new FormGroup(this.control02b);

  // Block "attributes-supported02"
  public exterior02c = 'outlined';
  public control02c = {
    model02f: new FormControl(null, []),
    model02g: new FormControl(null, []),
    model02h: new FormControl(null, []),
    model02i: new FormControl(null, []),
  };
  public formGroup02c: FormGroup = new FormGroup(this.control02c);

  // Block "attributes-supported03"
  public exterior02d = 'outlined';
  public control02d = {
    model02k: new FormControl(null, []),
    model02l: new FormControl(null, []),
    model02m: new FormControl(null, []),
    model02n: new FormControl(null, []),
  };
  public formGroup02d: FormGroup = new FormGroup(this.control02d);

  // Block "attributes-supported04"
  public exterior02e = 'outlined';
  public control02e = {
    model02p: new FormControl(null, []),
    model02q: new FormControl(null, []),
    model02r: new FormControl(null, []),
    model02s: new FormControl(null, []),
    model02t: new FormControl(null, []),
  };
  public formGroup02e: FormGroup = new FormGroup(this.control02e);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
