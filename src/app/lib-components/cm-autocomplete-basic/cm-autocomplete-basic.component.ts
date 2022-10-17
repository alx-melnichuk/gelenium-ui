import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

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
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmAutocomplete = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_AUTOCOMPLETE');

  // prettier-ignore
  public fruits = [
    'apple'     , 'apricot'  , 'avocado'   , 'banana'    , 'black currant',
    'blackberry', 'blueberry', 'cherry'    , 'coconut'   , 'cranberry'    ,
    'dragonfruit', 'fig'     , 'goji berry', 'grape'     , 'grapefruit'   ,
    'grapes'    , 'guava'    , 'iwi'       , 'jackfruit' , 'jamun'        ,
    'jujube'    , 'lemon'    , 'lime'      , 'longan'    , 'loquat'       ,
    'lychee'    , 'mandarin' , 'mango'     , 'melon'     , 'mulberry'     ,
    'nectarine' , 'olive'    , 'orange'    , 'palm fruit', 'papaya'       ,
    'passion fruit', 'peach' , 'pear'      , 'persimmon' , 'pineapple'    ,
    'plum'  , 'pomegranate', 'prickly pear', 'pumpkin'   , 'quince'       ,
    'raspberry', 'red currant', 'sapodilla', 'satsuma'   , 'strawberry'   ,
    'sweet lemon', 'tamarind', 'tangerine' , 'watermelon'
  ];

  public formGroup01: FormGroup = new FormGroup({
    model01a: new FormControl('', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public doInput(event: Event): void {
    console.log(`doInput() event.value=`, (event.target as any).value);
  }
}
