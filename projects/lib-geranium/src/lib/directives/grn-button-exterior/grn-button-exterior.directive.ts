import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { ButtonExterior, ButtonExteriorUtil } from '../../_interfaces/button-exterior.interface';
import {
  GrnSizePaddingHorRes,
  GrnSizePaddingVerRes,
  GrnSizePrepareData,
  GRN_SIZE_PREPARE_DATA,
} from '../../_interfaces/grn-size-prepare-data.interface';

@Directive({
  selector: '[grnButtonExterior]',
  exportAs: 'grnButtonExterior',
  providers: [{ provide: GRN_SIZE_PREPARE_DATA, useExisting: GrnButtonExteriorDirective }],
})
export class GrnButtonExteriorDirective implements OnChanges, GrnSizePrepareData {
  @Input()
  public grnButtonExterior: string | null = null; // ButtonExteriorType

  @Output()
  readonly grnButtonExteriorChange: EventEmitter<void> = new EventEmitter();

  public innExterior: ButtonExterior | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnButtonExterior) {
      const exteriorInp = ButtonExteriorUtil.convert(this.grnButtonExterior);
      const exterior = ButtonExteriorUtil.create(exteriorInp);
      if (this.innExterior !== exterior) {
        this.innExterior = exterior;
      }
      this.grnButtonExteriorChange.emit();
    }
  }

  // ** Implementation of the GrnSizePrepareData interface. (start) **

  public getExterior = (): string | null => {
    return this.grnButtonExterior;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getBorderRadius = (frameSizeValue: number, lineHeight: number): string | null => {
    const borderRadiusRatio = 0.1;
    return (frameSizeValue > 0 ? Math.round(borderRadiusRatio * frameSizeValue * 100) / 100 : 0) + 'px';
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getPaddingHor = (frameSizeValue: number, lineHeight: number): GrnSizePaddingHorRes | null => {
    const ratio = this.innExterior === ButtonExterior.contained ? 0.3636 : this.innExterior === ButtonExterior.outlined ? 0.3409 : 0.2045;
    const value = frameSizeValue > 0 ? Math.round(ratio * frameSizeValue * 100) / 100 : null;
    return value !== null ? { left: value, right: value } : null;
  };

  public getPaddingVer = (frameSizeValue: number, lineHeight: number): GrnSizePaddingVerRes | null => {
    const param = frameSizeValue > 0 && lineHeight > 0 ? (frameSizeValue - lineHeight) / 2 : null;
    const value = param === null ? null : this.innExterior === ButtonExterior.outlined ? param - 1 : param;
    return value !== null ? { top: value, bottom: value } : null;
  };

  // ** Implementation of the GrnSizePrepareData interface. (finish) **
}
