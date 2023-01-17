import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-spinner-basic',
  templateUrl: './cm-spinner-basic.component.html',
  styleUrls: ['./cm-spinner-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSpinnerBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmSpinner = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_SPINNER');

  // Page: "Attributes" 02
  public isNoAnimation02a: boolean = true;
  public isExternal02a: boolean = false;

  // Page: "ItemSize" 03
  public isNoAnimation03a: boolean = true;

  // Page: "Palette" 04
  public isNoAnimation04a: boolean = true;

  // Page: "Customization" 05
  public isNoAnimation05a: boolean = true;

  // Page: "Feature" 06
  public control06a = {
    model06a: new FormControl(null, []),
    model06b: new FormControl(null, []),
    model06c: new FormControl(null, []),
    model06d: new FormControl(null, []),
  };
  public formGroup06a: FormGroup = new FormGroup(this.control06a);
  public isShowSpinner06a: boolean = false;
  public isShowSpinner06b: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  // Page: "Feature" 06
  public setShowSpinnerForBlock() {
    this.isShowSpinner06a = true;
    setTimeout(() => {
      this.isShowSpinner06a = false;
      this.changeDetectorRef.markForCheck();
    }, 8000);
  }

  public setShowSpinnerForScreen() {
    this.isShowSpinner06b = true;
    setTimeout(() => {
      this.isShowSpinner06b = false;
      this.changeDetectorRef.markForCheck();
    }, 8000);
  }
}
