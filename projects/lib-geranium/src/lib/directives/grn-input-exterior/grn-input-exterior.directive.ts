import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import {
  GrnSizePaddingHorRes,
  GrnSizePaddingVerRes,
  GrnSizePrepareData,
  GRN_SIZE_PREPARE_DATA,
} from '../../_interfaces/grn-size-prepare-data.interface';
import { InputExterior, InputExteriorUtil } from '../../_interfaces/input-exterior.interface';

@Directive({
  selector: '[grnInputExterior]',
  exportAs: 'grnInputExterior',
  providers: [{ provide: GRN_SIZE_PREPARE_DATA, useExisting: GrnInputExteriorDirective }],
})
export class GrnInputExteriorDirective implements OnChanges, GrnSizePrepareData {
  @Input()
  public grnInputExterior: string | null = null; // InputExteriorType

  @Output()
  readonly grnInputExteriorChange: EventEmitter<void> = new EventEmitter();

  public innExterior: InputExterior | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnInputExterior) {
      const exteriorInp = InputExteriorUtil.convert(this.grnInputExterior);
      const exterior = InputExteriorUtil.create(exteriorInp);
      if (this.innExterior !== exterior) {
        this.innExterior = exterior;
      }
      this.grnInputExteriorChange.emit();
    }
  }

  // ** Implementation of the GrnSizePrepareData interface. (start) **

  public getExterior = (): string | null => {
    return this.grnInputExterior;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getBorderRadius = (frameSizeValue: number, lineHeight: number): string | null => {
    let result: string | null = null;
    const radius =
      frameSizeValue > 0 && (this.innExterior === InputExterior.outlined || this.innExterior === InputExterior.underline)
        ? Math.round((frameSizeValue / 10) * 100) / 100 + 'px'
        : null;
    if (this.innExterior === InputExterior.outlined) {
      result = radius;
    } else if (this.innExterior === InputExterior.underline) {
      result = radius !== null ? radius + ' ' + radius + ' 0px 0px' : null;
    } else if (this.innExterior === InputExterior.standard) {
      result = null;
    }
    return result;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getPaddingHor = (frameSizeValue: number, lineHeight: number): GrnSizePaddingHorRes | null => {
    const ratio1 = this.innExterior === InputExterior.outlined ? 0.25 : null;
    const ratio2 = this.innExterior === InputExterior.underline ? 0.21428 : null;
    const ratio = ratio1 || ratio2;
    const value = ratio ? Math.round(ratio * frameSizeValue * 100) / 100 : null;
    return value !== null ? { left: value, right: value } : null;
  };

  public getPaddingVer = (frameSizeValue: number, lineHeight: number): GrnSizePaddingVerRes | null => {
    let result: GrnSizePaddingVerRes | null = null;
    const param = frameSizeValue > 0 && lineHeight > 0 ? frameSizeValue - lineHeight : null;
    if (param != null) {
      if (this.innExterior === InputExterior.outlined) {
        const value = param / 2;
        result = { top: value, bottom: value };
      } else if (this.innExterior === InputExterior.underline || this.innExterior === InputExterior.standard) {
        result = { top: param * 0.75, bottom: param * 0.25 };
      }
    }
    return result;
  };

  // ** Implementation of the GrnSizePrepareData interface. (finish) **
}
