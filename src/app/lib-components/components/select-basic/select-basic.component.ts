import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from 'src/app/lib-core/constants/constants';

@Component({
  selector: 'app-select-basic',
  templateUrl: './select-basic.component.html',
  styleUrls: ['./select-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBasicComponent implements OnInit {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public formGroup01: FormGroup = new FormGroup({
    // input01a: new FormControl(null, []),
    input01a: new FormControl('item03', []),
    // input01a: new FormControl(['item03'], []), // isMultiple
    input01b: new FormControl('', []),
    input01c: new FormControl('', []),
  });

  public nativeSelect = '';
  public text1 = 't1';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.formGroup01.controls['input01a'].setValue(['item03']);
    //   this.changeDetectorRef.markForCheck();
    // }, 4000);
  }

  doChange(event: any): void {
    console.log(`doChange()`, event); // TODO del;
  }
  doInput(event: any): void {
    console.log(`doInput()`, event); // TODO del;
  }
}
