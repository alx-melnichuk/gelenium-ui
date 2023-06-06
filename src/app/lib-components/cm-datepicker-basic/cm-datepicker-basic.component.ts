import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-datepicker-basic',
  templateUrl: './cm-datepicker-basic.component.html',
  styleUrls: ['./cm-datepicker-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmDatepickerBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  // Page: Basic01
  isShowBasic01 = false;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmDatepicker = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_DATEPICKER');

  public control01 = {
    model01a: new FormControl(null, []),
    model01b: new FormControl(null, []),
    model01c: new FormControl(null, []),
  };
  public formGroup01: FormGroup = new FormGroup(this.control01);

  // Page: Attrib02
  isShowAttrib02 = false;

  // Page Calendar
  public urlCmCalendar = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_DATEPICKER');
  public urlPlCalendar = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_DATEPICKER');
  // Page: Basic
  isShowClnBasic = true;
  // Page: Attr01
  isShowClnAttr01 = true;
  // Page: CellSize
  isShowClnCellSize = false;

  isDisabled01a = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
