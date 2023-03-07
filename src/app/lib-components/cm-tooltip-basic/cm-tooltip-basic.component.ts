import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-tooltip-basic',
  templateUrl: './cm-tooltip-basic.component.html',
  styleUrls: ['./cm-tooltip-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmTooltipBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmTooltip = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_TOOLTIP');

  public isShowBasic = true;
  public isShowAttributes01 = false; // 02
  public isShowAttributes02 = false;
  public isShowAttributes03 = false;
  public isShowCustomization = false;
  public isShowFeature = false;
  // public isShowSize = false; // 03
  // Palette // 04
  // Customization // 05
  // Config // 08
  // Api // 09

  // Page: "Attributes" 01

  // Page: "Attributes" 02
  public showDelay02a: number = 600;
  public hideDelay02a: number = 600;

  // Page: "Attributes" 03
  public isDisabled03a: boolean = true;

  // Page: "Feature" 07

  // Page:

  public demo1 = false;
  public demo2 = false;
  public position1 = 'bottom';
  public positionList: string[] = [
    'bottom',
    'bottom-start',
    'bottom-end',
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
  ];

  public demo02 = 'Information-A';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    // setTimeout(() => {
    //   this.demo02 = 'Information-Demo';
    //   this.changeDetectorRef.markForCheck();
    // }, 6000);
  }

  // Page: "Attributes" 02
  public incVal(value: number, delta: number, max: number): number {
    return value + delta <= max ? value + delta : value > max ? max : value;
  }
  public decVal(value: number, delta: number, min: number): number {
    return value - delta >= min ? value - delta : value < min ? min : value;
  }

  // Page: ""

  // public inputValue(eventTarget: EventTarget | null): string {
  //   const inputElement: HTMLInputElement | undefined | null = eventTarget as HTMLInputElement;
  //   return inputElement?.value || '';
  // }
  // public converInt(size: string, defaultValue: number): number {
  //   const sizeNum: number = Number.parseInt(size);
  //   return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  // }
  public getValue(eventTarget: any): any {
    return eventTarget != null ? (eventTarget as Attr).value : '';
  }
}
