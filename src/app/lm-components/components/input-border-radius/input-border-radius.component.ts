import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';

import {
  CN_LABEL_CSS,
  CN_LABEL_HTML,
  CN_LABEL_OUTLINED,
  CN_LABEL_SHOW_SOURCE,
  CN_LABEL_STANDARD,
  CN_LABEL_TS,
  CN_LABEL_UNDERLINE,
} from '../constants';

@Component({
  selector: 'app-input-border-radius',
  templateUrl: './input-border-radius.component.html',
  styleUrls: ['./input-border-radius.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputBorderRadiusComponent implements OnInit {
  @Input()
  public labelShowSource = CN_LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = CN_LABEL_OUTLINED;
  @Input()
  public labelUnderline = CN_LABEL_UNDERLINE;
  @Input()
  public labelStandard = CN_LABEL_STANDARD;
  @Input()
  public labelHtml = CN_LABEL_HTML;
  @Input()
  public labelTs = CN_LABEL_TS;
  @Input()
  public labelCss = CN_LABEL_CSS;

  public formGroup09: FormGroup = new FormGroup({
    input09a: new FormControl('Demo Size Short', []),
    input09b: new FormControl('Demo Size Small', []),
    input09c: new FormControl('Demo Size Middle', []),
    input09d: new FormControl('Demo Size Wide', []),
    input09e: new FormControl('Demo Size Large', []),
    input09f: new FormControl('Demo Size Huge', []),
  });
  public borderRadius = 50;

  public exterior09 = 'outlined';
  // public exterior09 = 'underline';
  // public exterior09 = 'standard';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @HostBinding('style')
  public get getClass(): string | null {
    return '--ibr-border-radius: ' + this.borderRadius + ';';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  public inputBorderRadius(event: MatSliderChange): void {
    if (!!event && event.value != null) {
      this.borderRadius = event.value;
    }
  }
}
