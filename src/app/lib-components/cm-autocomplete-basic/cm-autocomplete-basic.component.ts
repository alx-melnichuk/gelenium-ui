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
  selector: 'app-cm-autocomplete-basic',
  templateUrl: './cm-autocomplete-basic.component.html',
  styleUrls: ['./cm-autocomplete-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmAutocompleteBasicComponent {
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

  // Block "Basic".
  public control01 = {
    model01a: new FormControl(null, []),
    model01b: new FormControl(null, []),
    model01c: new FormControl(null, []),
    model01d: new FormControl(null, []),
  };
  public formGroup01: FormGroup = new FormGroup(this.control01);

  // Block "Attributes".
  // prettier-ignore
  public fruitsB = [
    'mango', 'ripe lemon', 'gorgeous orange',
    'african cherry orange', 'succulent watermelon'
  ];
  // attributes-supported01
  public exterior02b = 'outlined';
  public control02b = {
    model02e: new FormControl(null, []),
    model02f: new FormControl(null, []),
    model02g: new FormControl(null, []),
  };
  public formGroup02b: FormGroup = new FormGroup(this.control02b);

  // attributes-supported02
  public exterior02c = 'outlined';
  public control02c = {
    model02h: new FormControl(null, []),
    model02i: new FormControl(null, []),
    model02j: new FormControl(null, []),
  };
  public formGroup02c: FormGroup = new FormGroup(this.control02c);

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

  // attributes-supported03
  public exterior02d = 'outlined';

  public control02d = {
    model02n: new FormControl(null, []),
    model02o: new FormControl(null, []),
    model02p: new FormControl(null, []),
    model02q: new FormControl(null, []),
  };

  public formGroup02d: FormGroup = new FormGroup(this.control02d);

  // #old
  public formGroup0: FormGroup = new FormGroup({
    model0a: new FormControl('', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    console.log('#');
  }

  // Block "Attributes".
  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }

  public doInput(event: Event): void {
    console.log(`doInput() event.value=`, (event.target as any).value);
  }

  public handlerInput(event: any): void {
    console.log(event.target.value);
  }
  public log(eventTarget: any): void {
    console.log(eventTarget.value);
  }
}
