import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { ButtonExterior } from 'projects/lib-geranium/src/lib/interfaces/button-exterior.interface';
import { FrameSize } from 'projects/lib-geranium/src/lib/interfaces/frame-size.interface';
import { GrnButtonConfig } from 'projects/lib-geranium/src/lib/interfaces/grn-button-config.interface';

import {
  BTN_CONTAINED,
  BTN_OUTLINED,
  BTN_TEXT,
  LABEL_CSS,
  LABEL_HTML,
  LABEL_SHOW_SOURCE,
  LABEL_TS,
} from 'src/app/lib-core/constants/constants';

@Component({
  selector: 'app-button-size',
  templateUrl: './button-size.component.html',
  styleUrls: ['./button-size.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSizeComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;
  @Input()
  public labelContained = BTN_CONTAINED;
  @Input()
  public labelOutlined = BTN_OUTLINED;
  @Input()
  public labelText = BTN_TEXT;

  public exterior03 = 'outlined';
  public routerLink = '/components/button';
  public fragment1 = 'size1';
  public fragment2 = 'size2';
  // GrnButtonConfig
  public config03 = {
    frameSizeValue: 57,
  };
  public getLabel(exterior: string): string {
    return exterior ? exterior.substring(0, 1).toUpperCase() + exterior.substring(1) : '';
  }
}
