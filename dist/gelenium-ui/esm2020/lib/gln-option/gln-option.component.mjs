import { ChangeDetectionStrategy, Component, HostListener, Inject, Input, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GLN_OPTION_GROUP } from './gln-option-group.interface';
import { GLN_OPTION_PARENT } from './gln-option-parent.interface';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../gln-touch-ripple/gln-touch-ripple.component";
let uniqueIdCounter = 0;
export class GlnOptionComponent {
    constructor(hostRef, renderer, changeDetectorRef, parent, group) {
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.parent = parent;
        this.group = group;
        this.id = `glnop-${uniqueIdCounter++}`;
        this.checkmark = false;
        this.formControl = new FormControl();
        this.formGroup = new FormGroup({ checkinfo: this.formControl });
        this.marked = false;
        this.multiple = false;
        HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'role', 'option');
    }
    doClick() {
        if (this.parent && !this.disabled) {
            this.parent.optionSelection(this);
        }
    }
    ngOnChanges(changes) {
        if (changes['isDisabled']) {
            this.disabled = BooleanUtil.init(this.isDisabled);
            this.setDisabled(this.disabled ?? this.group?.disabled);
        }
    }
    ngOnInit() {
        HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
        this.setMultiple(this.parent?.multiple || null);
        this.setCheckmark(this.parent?.checkmark || null);
        if (this.disabled === undefined) {
            this.setDisabled(this.group?.disabled);
        }
        this.setSelected(!!this.selected);
    }
    // ** Public API **
    getTextContent() {
        return (this.hostRef.nativeElement.textContent || '').trim();
    }
    getTrustHtml() {
        return (this.contentRef.nativeElement.innerHTML || '').trim();
    }
    /** Check or uncheck "checkmark". */
    setCheckmark(value) {
        if (this.checkmark !== !!value && (!!value === false || this.multiple)) {
            this.checkmark = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-checkmark', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'che', value ? '' : null);
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Check or uncheck disabled. */
    setDisabled(value) {
        if (this.disabled !== !!value) {
            this.disabled = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-disabled', '' + !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'tabindex', value ? null : '0');
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Check or uncheck marking. */
    setMarked(value) {
        if (this.marked !== !!value) {
            this.marked = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-marked', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'mar', value ? '' : null);
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Check or uncheck multiple. */
    setMultiple(value) {
        if (this.multiple !== value) {
            this.multiple = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-multiple', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'mul', value ? '' : null);
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Check or uncheck selected. */
    setSelected(value) {
        if (this.selected !== !!value) {
            this.selected = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-selected', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'sel', value ? '' : null);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-selected', '' + !!value);
            this.formControl.setValue(value);
            this.changeDetectorRef.markForCheck();
        }
    }
}
GlnOptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: GLN_OPTION_PARENT, optional: true }, { token: GLN_OPTION_GROUP, optional: true }], target: i0.ɵɵFactoryTarget.Component });
GlnOptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnOptionComponent, selector: "gln-option", inputs: { id: "id", isDisabled: "isDisabled", value: "value" }, host: { listeners: { "click": "doClick()" } }, viewQueries: [{ propertyName: "contentRef", first: true, predicate: ["contentRef"], descendants: true, static: true }], exportAs: ["glnOption"], usesOnChanges: true, ngImport: i0, template: "<span *ngIf=\"checkmark\"\n  glno-chbox-wrap\n  class=\"gln-checkbox-wrap\"\n  [formGroup]=\"formGroup\">\n  <input type=\"checkbox\"\n    glno-chbox\n    class=\"gln-checkbox\"\n    formControlName=\"checkinfo\" />\n</span>\n<div #contentRef\n  glno-label\n  class=\"gln-option-label\">\n  <ng-content></ng-content>\n</div>\n\n<gln-touch-ripple *ngIf=\"!disabled && !group?.disabled && !parent?.noRipple\">\n</gln-touch-ripple>", styles: ["gln-option{align-items:center;-webkit-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent;background-color:transparent;box-sizing:border-box;color:inherit;cursor:pointer;display:flex;justify-content:flex-start;outline:0px;padding:.375em 1em;position:relative;text-decoration:none;-webkit-user-select:none;user-select:none;--glntr-ripple-cl: hsla(var(--gln-default-h), var(--gln-default-s), var(--gln-default-l), .1)}gln-option>[mul]>input{cursor:inherit}gln-option[dis]{opacity:.38;pointer-events:none;cursor:default}gln-option:not([dis]):hover{text-decoration:none}gln-option:not([dis]):hover:not([mar]){background-color:hsla(var(--gln-default-h),var(--gln-default-s),80%,.2)}gln-option:not([dis])[mar]:not([sel]){background-color:hsla(var(--gln-default-h),var(--gln-default-s),50%,.2)}gln-option:not([dis])[sel]:not([mar]){background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.08)}gln-option:not([dis])[sel][mar]{background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.2)}gln-option:not([dis])[sel]:hover{background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.12)}gln-option>[glno-chbox-wrap]{margin-right:9px}gln-option>[glno-chbox-wrap]>input{cursor:inherit}gln-option>[glno-label]{flex-grow:1;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i3.GlnTouchRippleComponent, selector: "gln-touch-ripple", inputs: ["id", "isCenter"], exportAs: ["glnTouchRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-option', exportAs: 'glnOption', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<span *ngIf=\"checkmark\"\n  glno-chbox-wrap\n  class=\"gln-checkbox-wrap\"\n  [formGroup]=\"formGroup\">\n  <input type=\"checkbox\"\n    glno-chbox\n    class=\"gln-checkbox\"\n    formControlName=\"checkinfo\" />\n</span>\n<div #contentRef\n  glno-label\n  class=\"gln-option-label\">\n  <ng-content></ng-content>\n</div>\n\n<gln-touch-ripple *ngIf=\"!disabled && !group?.disabled && !parent?.noRipple\">\n</gln-touch-ripple>", styles: ["gln-option{align-items:center;-webkit-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent;background-color:transparent;box-sizing:border-box;color:inherit;cursor:pointer;display:flex;justify-content:flex-start;outline:0px;padding:.375em 1em;position:relative;text-decoration:none;-webkit-user-select:none;user-select:none;--glntr-ripple-cl: hsla(var(--gln-default-h), var(--gln-default-s), var(--gln-default-l), .1)}gln-option>[mul]>input{cursor:inherit}gln-option[dis]{opacity:.38;pointer-events:none;cursor:default}gln-option:not([dis]):hover{text-decoration:none}gln-option:not([dis]):hover:not([mar]){background-color:hsla(var(--gln-default-h),var(--gln-default-s),80%,.2)}gln-option:not([dis])[mar]:not([sel]){background-color:hsla(var(--gln-default-h),var(--gln-default-s),50%,.2)}gln-option:not([dis])[sel]:not([mar]){background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.08)}gln-option:not([dis])[sel][mar]{background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.2)}gln-option:not([dis])[sel]:hover{background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.12)}gln-option>[glno-chbox-wrap]{margin-right:9px}gln-option>[glno-chbox-wrap]>input{cursor:inherit}gln-option>[glno-label]{flex-grow:1;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GLN_OPTION_PARENT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GLN_OPTION_GROUP]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], value: [{
                type: Input
            }], contentRef: [{
                type: ViewChild,
                args: ['contentRef', { static: true }]
            }], doClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLW9wdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL2dsbi1vcHRpb24vZ2xuLW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL2dsbi1vcHRpb24vZ2xuLW9wdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBR1IsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFrQixNQUFNLDhCQUE4QixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBbUIsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7QUFFbkYsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBVXhCLE1BQU0sT0FBTyxrQkFBa0I7SUFtQjdCLFlBQ1MsT0FBZ0MsRUFDL0IsUUFBbUIsRUFDbkIsaUJBQW9DLEVBQ0UsTUFBdUIsRUFDeEIsS0FBcUI7UUFKM0QsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ0UsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFDeEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUF0QjdELE9BQUUsR0FBRyxTQUFTLGVBQWUsRUFB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SyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1RSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDOzsrR0E5R1Usa0JBQWtCLHNHQXVCUCxpQkFBaUIsNkJBQ2pCLGdCQUFnQjttR0F4QjNCLGtCQUFrQix1VUNsQy9CLDhhQWdCbUI7MkZEa0JOLGtCQUFrQjtrQkFSOUIsU0FBUzsrQkFDRSxZQUFZLFlBQ1osV0FBVyxpQkFHTixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzswQkF5QjVDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsaUJBQWlCOzswQkFDcEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxnQkFBZ0I7NENBdEIvQixFQUFFO3NCQURSLEtBQUs7Z0JBR0MsVUFBVTtzQkFEaEIsS0FBSztnQkFHQyxLQUFLO3NCQURYLEtBQUs7Z0JBSUMsVUFBVTtzQkFEaEIsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQXNCbEMsT0FBTztzQkFEYixZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBCb29sZWFuVXRpbCB9IGZyb20gJy4uL191dGlscy9ib29sZWFuLnV0aWwnO1xuaW1wb3J0IHsgSHRtbEVsZW1VdGlsIH0gZnJvbSAnLi4vX3V0aWxzL2h0bWwtZWxlbS51dGlsJztcblxuaW1wb3J0IHsgR0xOX09QVElPTl9HUk9VUCwgR2xuT3B0aW9uR3JvdXAgfSBmcm9tICcuL2dsbi1vcHRpb24tZ3JvdXAuaW50ZXJmYWNlJztcbmltcG9ydCB7IEdMTl9PUFRJT05fUEFSRU5ULCBHbG5PcHRpb25QYXJlbnQgfSBmcm9tICcuL2dsbi1vcHRpb24tcGFyZW50LmludGVyZmFjZSc7XG5cbmxldCB1bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnbG4tb3B0aW9uJyxcbiAgZXhwb3J0QXM6ICdnbG5PcHRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vZ2xuLW9wdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dsbi1vcHRpb24uY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEdsbk9wdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgcHVibGljIGlkID0gYGdsbm9wLSR7dW5pcXVlSWRDb3VudGVyKyt9YDtcbiAgQElucHV0KClcbiAgcHVibGljIGlzRGlzYWJsZWQ6IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBwdWJsaWMgdmFsdWU6IHVua25vd24gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnRSZWYnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwdWJsaWMgY29udGVudFJlZiE6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIHB1YmxpYyBjaGVja21hcmsgPSBmYWxzZTtcbiAgcHVibGljIGRpc2FibGVkOiBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgcHVibGljIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBwdWJsaWMgZm9ybUdyb3VwOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHsgY2hlY2tpbmZvOiB0aGlzLmZvcm1Db250cm9sIH0pO1xuICBwdWJsaWMgbWFya2VkID0gZmFsc2U7XG4gIHB1YmxpYyBtdWx0aXBsZSA9IGZhbHNlO1xuICBwdWJsaWMgc2VsZWN0ZWQ6IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBob3N0UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChHTE5fT1BUSU9OX1BBUkVOVCkgcHVibGljIHBhcmVudDogR2xuT3B0aW9uUGFyZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoR0xOX09QVElPTl9HUk9VUCkgcHVibGljIGdyb3VwOiBHbG5PcHRpb25Hcm91cFxuICApIHtcbiAgICBIdG1sRWxlbVV0aWwuc2V0QXR0cih0aGlzLnJlbmRlcmVyLCB0aGlzLmhvc3RSZWYsICdyb2xlJywgJ29wdGlvbicpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBwdWJsaWMgZG9DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYXJlbnQgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMucGFyZW50Lm9wdGlvblNlbGVjdGlvbih0aGlzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydpc0Rpc2FibGVkJ10pIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBCb29sZWFuVXRpbC5pbml0KHRoaXMuaXNEaXNhYmxlZCk7XG4gICAgICB0aGlzLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQgPz8gdGhpcy5ncm91cD8uZGlzYWJsZWQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBIdG1sRWxlbVV0aWwudXBkYXRlSWZNaXNzaW5nKHRoaXMucmVuZGVyZXIsIHRoaXMuaG9zdFJlZiwgJ2lkJywgdGhpcy5pZCk7XG4gICAgdGhpcy5zZXRNdWx0aXBsZSh0aGlzLnBhcmVudD8ubXVsdGlwbGUgfHwgbnVsbCk7XG4gICAgdGhpcy5zZXRDaGVja21hcmsodGhpcy5wYXJlbnQ/LmNoZWNrbWFyayB8fCBudWxsKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldERpc2FibGVkKHRoaXMuZ3JvdXA/LmRpc2FibGVkKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTZWxlY3RlZCghIXRoaXMuc2VsZWN0ZWQpO1xuICB9XG5cbiAgLy8gKiogUHVibGljIEFQSSAqKlxuXG4gIHB1YmxpYyBnZXRUZXh0Q29udGVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQgfHwgJycpLnRyaW0oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUcnVzdEh0bWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMuY29udGVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVySFRNTCB8fCAnJykudHJpbSgpO1xuICB9XG4gIC8qKiBDaGVjayBvciB1bmNoZWNrIFwiY2hlY2ttYXJrXCIuICovXG4gIHB1YmxpYyBzZXRDaGVja21hcmsodmFsdWU6IGJvb2xlYW4gfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2ttYXJrICE9PSAhIXZhbHVlICYmICghIXZhbHVlID09PSBmYWxzZSB8fCB0aGlzLm11bHRpcGxlKSkge1xuICAgICAgdGhpcy5jaGVja21hcmsgPSAhIXZhbHVlO1xuICAgICAgSHRtbEVsZW1VdGlsLnNldENsYXNzKHRoaXMucmVuZGVyZXIsIHRoaXMuaG9zdFJlZiwgJ2dsbi1jaGVja21hcmsnLCAhIXZhbHVlKTtcbiAgICAgIEh0bWxFbGVtVXRpbC5zZXRBdHRyKHRoaXMucmVuZGVyZXIsIHRoaXMuaG9zdFJlZiwgJ2NoZScsIHZhbHVlID8gJycgOiBudWxsKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG4gIC8qKiBDaGVjayBvciB1bmNoZWNrIGRpc2FibGVkLiAqL1xuICBwdWJsaWMgc2V0RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgIT09ICEhdmFsdWUpIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSAhIXZhbHVlO1xuICAgICAgSHRtbEVsZW1VdGlsLnNldENsYXNzKHRoaXMucmVuZGVyZXIsIHRoaXMuaG9zdFJlZiwgJ2dsbi1kaXNhYmxlZCcsICEhdmFsdWUpO1xuICAgICAgSHRtbEVsZW1VdGlsLnNldEF0dHIodGhpcy5yZW5kZXJlciwgdGhpcy5ob3N0UmVmLCAnZGlzJywgdmFsdWUgPyAnJyA6IG51bGwpO1xuICAgICAgSHRtbEVsZW1VdGlsLnNldEF0dHIodGhpcy5yZW5kZXJlciwgdGhpcy5ob3N0UmVmLCAnYXJpYS1kaXNhYmxlZCcsICcnICsgISF2YWx1ZSk7XG4gICAgICBIdG1sRWxlbVV0aWwuc2V0QXR0cih0aGlzLnJlbmRlcmVyLCB0aGlzLmhvc3RSZWYsICd0YWJpbmRleCcsIHZhbHVlID8gbnVsbCA6ICcwJyk7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuICAvKiogQ2hlY2sgb3IgdW5jaGVjayBtYXJraW5nLiAqL1xuICBwdWJsaWMgc2V0TWFya2VkKHZhbHVlOiBib29sZWFuIHwgbnVsbCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtlZCAhPT0gISF2YWx1ZSkge1xuICAgICAgdGhpcy5tYXJrZWQgPSAhIXZhbHVlO1xuICAgICAgSHRtbEVsZW1VdGlsLnNldENsYXNzKHRoaXMucmVuZGVyZXIsIHRoaXMuaG9zdFJlZiwgJ2dsbi1tYXJrZWQnLCAhIXZhbHVlKTtcbiAgICAgIEh0bWxFbGVtVXRpbC5zZXRBdHRyKHRoaXMucmVuZGVyZXIsIHRoaXMuaG9zdFJlZiwgJ21hcicsIHZhbHVlID8gJycgOiBudWxsKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG4gIC8qKiBDaGVjayBvciB1bmNoZWNrIG11bHRpcGxlLiAqL1xuICBwdWJsaWMgc2V0TXVsdGlwbGUodmFsdWU6IGJvb2xlYW4gfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLm11bHRpcGxlID0gISF2YWx1ZTtcbiAgICAgIEh0bWxFbGVtVXRpbC5zZXRDbGFzcyh0aGlzLnJlbmRlcmVyLCB0aGlzLmhvc3RSZWYsICdnbG4tbXVsdGlwbGUnLCAhIXZhbHVlKTtcbiAgICAgIEh0bWxFbGVtVXRpbC5zZXRBdHRyKHRoaXMucmVuZGVyZXIsIHRoaXMuaG9zdFJlZiwgJ211bCcsIHZhbHVlID8gJycgOiBudWxsKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG4gIC8qKiBDaGVjayBvciB1bmNoZWNrIHNlbGVjdGVkLiAqL1xuICBwdWJsaWMgc2V0U2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4gfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQgIT09ICEhdmFsdWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhIXZhbHVlO1xuICAgICAgSHRtbEVsZW1VdGlsLnNldENsYXNzKHRoaXMucmVuZGVyZXIsIHRoaXMuaG9zdFJlZiwgJ2dsbi1zZWxlY3RlZCcsICEhdmFsdWUpO1xuICAgICAgSHRtbEVsZW1VdGlsLnNldEF0dHIodGhpcy5yZW5kZXJlciwgdGhpcy5ob3N0UmVmLCAnc2VsJywgdmFsdWUgPyAnJyA6IG51bGwpO1xuICAgICAgSHRtbEVsZW1VdGlsLnNldEF0dHIodGhpcy5yZW5kZXJlciwgdGhpcy5ob3N0UmVmLCAnYXJpYS1zZWxlY3RlZCcsICcnICsgISF2YWx1ZSk7XG4gICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG59XG4iLCI8c3BhbiAqbmdJZj1cImNoZWNrbWFya1wiXG4gIGdsbm8tY2hib3gtd3JhcFxuICBjbGFzcz1cImdsbi1jaGVja2JveC13cmFwXCJcbiAgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXG4gICAgZ2xuby1jaGJveFxuICAgIGNsYXNzPVwiZ2xuLWNoZWNrYm94XCJcbiAgICBmb3JtQ29udHJvbE5hbWU9XCJjaGVja2luZm9cIiAvPlxuPC9zcGFuPlxuPGRpdiAjY29udGVudFJlZlxuICBnbG5vLWxhYmVsXG4gIGNsYXNzPVwiZ2xuLW9wdGlvbi1sYWJlbFwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cblxuPGdsbi10b3VjaC1yaXBwbGUgKm5nSWY9XCIhZGlzYWJsZWQgJiYgIWdyb3VwPy5kaXNhYmxlZCAmJiAhcGFyZW50Py5ub1JpcHBsZVwiPlxuPC9nbG4tdG91Y2gtcmlwcGxlPiJdfQ==