import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GlnSelectConfig } from 'gelenium-ui';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../../lib-core/constants/constants';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-select-attributes',
  templateUrl: './select-attributes.component.html',
  styleUrls: ['./select-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAttributesComponent {
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

  public urlSelect = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_SELECT');

  public fruits = ['mango', 'lemon', 'orange', 'kiwi']; // , 'mango2', 'lemon2', 'orange2', 'kiwi2', 'mango3', 'lemon3', 'orange3', 'kiwi3'];

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
    model02h: new FormControl(this.fruits[0], []),
  };
  public formGroup02b: FormGroup = new FormGroup(this.control02b);

  public exterior02c = 'outlined';
  public control02c = {
    model02i: new FormControl(this.fruits[0], []),
    model02j: new FormControl(this.fruits[0], []),
    model02k: new FormControl([this.fruits[0], this.fruits[1]], []),
    model02l: new FormControl([this.fruits[0], this.fruits[1]], []),
  };
  public formGroup02c: FormGroup = new FormGroup(this.control02c);

  public exterior02z = 'outlined';
  public control02z = {
    model02z: new FormControl([] /* this.fruits[0] */, []),
  };
  public formGroup02z: FormGroup = new FormGroup(this.control02z);

  priz = false;
  config: GlnSelectConfig = {
    // noLabel: true,
    // noAnimation: true,
    isNoRipple: true,
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    // setTimeout(() => {
    //   console.log(`priz = true;`);
    //   this.priz = true;
    //   this.changeDetectorRef.markForCheck();
    // }, 4000);
  }

  public capitalizeFirstLetter(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }

  log(name: string): void {
    console.log(`${name}() `); // , ' target=', event.target, ' relatedTarget=', event.relatedTarget, ' event=', event);
  }

  // @HostListener('mousedown', ['$event'])
  // public mousedownHandling(event: Event): void {
  //   console.log(`mousedownHost() event=`, event);
  // }
  // @HostListener('mouseup', ['$event'])
  // public mouseupHandling(event: Event): void {
  //   console.log(`mouseupHost() event=`, event);
  // }
}
