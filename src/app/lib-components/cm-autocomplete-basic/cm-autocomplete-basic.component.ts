import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GlnAutocomplete, GlnAutocompleteConfig, GLN_AUTOCOMPLETE_CONFIG } from 'gelenium-ui';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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

const glnAutocompleteConfigDefault: GlnAutocompleteConfig = {
  panelClass: ['acc-panel'],
  position: 'end',
  visibleSize: 8,
};

@Component({
  selector: 'app-cm-autocomplete-basic',
  templateUrl: './cm-autocomplete-basic.component.html',
  styleUrls: ['./cm-autocomplete-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [{ provide: GLN_AUTOCOMPLETE_CONFIG, useValue: glnAutocompleteConfigDefault }],
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

  // Block "Feature"
  public urlCmSelect = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SELECT');
  public control06a = {
    model06a: new FormControl('', []),
  };
  public formGroup06a: FormGroup = new FormGroup(this.control06a);
  public value06a: string[] = [];

  public control06b = {
    model06b: new FormControl('', []),
  };
  public formGroup06b: FormGroup = new FormGroup(this.control06b);
  public value06b: string[] = [];

  // Block "Config"
  public control08a = {
    model08a: new FormControl(null, []),
    model08b: new FormControl(null, []),
  };
  public formGroup08a: FormGroup = new FormGroup(this.control08a);

  //
  // #old
  //
  public formGroup0: FormGroup = new FormGroup({
    model0a: new FormControl('', []),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    console.log('#');
    // Block "Feature"
    this.control06a.model06a.setValue('red cur');
    this.value06a = this.filtered2(this.fruits, this.control06a.model06a.value);
    this.control06b.model06b.setValue('red cur');
    this.value06b = this.filtered2(this.fruits, this.control06b.model06b.value);
  }

  // Block "Attributes".
  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }

  // Block "Feature"

  // Block "Feature" only
  public filtered2(list: string[] | null, value: string | null): string[] {
    const valueBuff = (value || '')
      .toLowerCase()
      .split(' ')
      .filter((word) => word.length > 0);
    console.log(`CMAB.filtered2(${value}) valueBuff.length=${valueBuff.length}`, valueBuff); // #
    const res: string[] = (!!value && list?.filter((item) => valueBuff.some((item2) => item.toLowerCase().includes(item2)))) || [];
    console.log(`CMAB.filtered2(${value}) res.length=${res.length}`); // #

    return list?.filter((item) => valueBuff.some((item2) => item.toLowerCase().includes(item2))) || [];
  }
  // old

  public log(text: string): void {
    console.log(text);
  }
  public filter(text: string | null, buff: string[]): string[] {
    console.log(`filter(${text})`);
    const cnt: number = (text || '').length;
    return buff.slice(0, cnt);
  }
}
