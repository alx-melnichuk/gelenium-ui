import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

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
  selector: 'app-cm-autocomplete-asynchrony',
  templateUrl: './cm-autocomplete-asynchrony.component.html',
  styleUrls: ['./cm-autocomplete-asynchrony.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmAutocompleteAsynchronyComponent {
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

  // Block "asynchrony-01"
  public exterior03c = 'outlined';
  public control03c = {
    model03a: new FormControl(null, []),
    model03b: new FormControl(null, []),
  };
  public formGroup03c: FormGroup = new FormGroup(this.control03c);
  public value03a: string[] = [];
  public value03b: string[] = [];

  // Block "asynchrony-02"
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }

  // Block "asynchrony-01", "asynchrony-02"
  public filtered(list: string[] | null, value: string | null): string[] {
    const valueStr = (value || '').toLowerCase();
    return list?.filter((item) => item.toLowerCase().includes(valueStr)) || [];
  }
  // Block "asynchrony-02"
  public filteredAsyn(list: string[] | null, value: string | null, result$: Subject<string[] | null>): void {
    const this2 = this;
    result$.next(null);
    setTimeout(() => {
      const result: string[] = this2.filtered(list, value);
      result$.next(result);
    }, 700);
  }
}
