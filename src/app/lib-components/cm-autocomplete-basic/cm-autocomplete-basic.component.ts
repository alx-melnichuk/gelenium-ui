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

  // Block "attributes-supported03"
  public exterior02d = 'outlined';

  public control02d = {
    model02k: new FormControl(null, []),
    model02l: new FormControl(null, []),
    model02m: new FormControl(null, []),
    model02n: new FormControl(null, []),
  };

  public formGroup02d: FormGroup = new FormGroup(this.control02d);

  // attributes-supported04
  public exterior02e = 'outlined';

  public control02e = {
    model02p: new FormControl(null, []),
    model02q: new FormControl(null, []),
    model02r: new FormControl(null, []),
    // model02s: new FormControl(null, []),
  };

  public formGroup02e: FormGroup = new FormGroup(this.control02e);

  // Block "Asynchrony"
  public exterior03c = 'outlined';

  public control03c = {
    model03a: new FormControl(null, []),
    model03b: new FormControl(null, []),
  };

  public formGroup03c: FormGroup = new FormGroup(this.control03c);
  public value03a: string[] = [];
  public value03b: string[] = [];

  public exterior03d = 'outlined';

  public control03d = {
    model03c: new FormControl(null, []),
    model03d: new FormControl(null, []),
  };

  public formGroup03d: FormGroup = new FormGroup(this.control03d);
  public value03c$: Subject<string[] | null> = new BehaviorSubject<string[] | null>([]);
  public value03c: Observable<string[] | null> = this.value03c$.asObservable();
  public value03d$: Subject<string[] | null> = new BehaviorSubject<string[] | null>([]);
  public value03d: Observable<string[] | null> = this.value03d$.asObservable();

  // Block "Feature"
  public control07a = {
    model07a: new FormControl(null, []),
    model07b: new FormControl(null, []),
  };
  public formGroup07a: FormGroup = new FormGroup(this.control07a);
  public value07a$: Subject<string[] | null> = new BehaviorSubject<string[] | null>([]);
  public value07a: Observable<string[] | null> = this.value07a$.asObservable();
  public value07b: string[] = [];

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
  }

  // Block "Attributes".
  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }

  // Block "Feature"

  public filtered(list: string[] | null, value: string | null): string[] {
    const valueStr = (value || '').toLowerCase();
    const result: string[] = (!!value && list?.filter((item) => item.toLowerCase().includes(valueStr))) || [];
    console.log(`CMAB.filtered(${value}) res.length=${result.length}`); // #
    return list?.filter((item) => item.toLowerCase().includes(valueStr)) || [];
  }

  public filteredAsyn(list: string[] | null, value: string | null, result$: Subject<string[] | null>): void {
    const this2 = this;
    result$.next(null);
    console.log(`CMAB.filteredAsyn(${value}) Loading: true`); // #
    setTimeout(() => {
      const result: string[] = this2.filtered(list, value);
      console.log(`CMAB.filteredAsyn("${value}")=${result.length}  Loading: false`); // #
      result$.next(result);
    }, 700);
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
