import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import { GLN_OPTION_GROUP } from '../gln-option/gln-option-group.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import * as i0 from "@angular/core";
let uniqueIdCounter = 0;
export class GlnOptionGroupComponent {
    constructor(hostRef, renderer, changeDetectorRef) {
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.id = `glnog-${uniqueIdCounter++}`;
        HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'role', 'group');
    }
    ngOnChanges(changes) {
        if (changes['isDisabled']) {
            this.setDisabled(BooleanUtil.init(this.isDisabled));
        }
    }
    ngOnInit() {
        HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
        if (this.disabled === null) {
            this.setDisabled(!!this.disabled);
        }
    }
    // ** Public API **
    /** Check or uncheck disabled. */
    setDisabled(value) {
        if (this.disabled !== !!value) {
            this.disabled = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-disabled', '' + !!value);
            this.changeDetectorRef.markForCheck();
        }
    }
}
GlnOptionGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionGroupComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GlnOptionGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnOptionGroupComponent, selector: "gln-option-group", inputs: { id: "id", isDisabled: "isDisabled", label: "label" }, providers: [{ provide: GLN_OPTION_GROUP, useExisting: GlnOptionGroupComponent }], exportAs: ["glnOptionGroup"], usesOnChanges: true, ngImport: i0, template: "<span glnog-label\n  class=\"gln-option-group-label\"\n  aria-hidden=\"true\">{{ label }} <ng-content></ng-content></span>\n<ng-content select=\"gln-option, ng-container\"></ng-content>", styles: ["gln-option-group{background-color:transparent;box-sizing:border-box;display:flex;flex-direction:column;outline:0px;--glnog--def-lb-def38: hsl(var(--gln-default-h), var(--gln-default-s), 38%)}gln-option-group[dis]{cursor:default}gln-option-group[dis]>[glnog-label]{opacity:.38}gln-option-group>[glnog-label]{color:var(--glnog--def-lb-def38);flex-grow:1;font-weight:500;overflow:hidden;padding:.375em 1em;text-align:left;text-decoration:none;text-overflow:ellipsis;-webkit-user-select:none;user-select:none;white-space:nowrap}gln-option-group>gln-option{padding-left:2em}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-option-group', exportAs: 'glnOptionGroup', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [{ provide: GLN_OPTION_GROUP, useExisting: GlnOptionGroupComponent }], template: "<span glnog-label\n  class=\"gln-option-group-label\"\n  aria-hidden=\"true\">{{ label }} <ng-content></ng-content></span>\n<ng-content select=\"gln-option, ng-container\"></ng-content>", styles: ["gln-option-group{background-color:transparent;box-sizing:border-box;display:flex;flex-direction:column;outline:0px;--glnog--def-lb-def38: hsl(var(--gln-default-h), var(--gln-default-s), 38%)}gln-option-group[dis]{cursor:default}gln-option-group[dis]>[glnog-label]{opacity:.38}gln-option-group>[glnog-label]{color:var(--glnog--def-lb-def38);flex-grow:1;font-weight:500;overflow:hidden;padding:.375em 1em;text-align:left;text-decoration:none;text-overflow:ellipsis;-webkit-user-select:none;user-select:none;white-space:nowrap}gln-option-group>gln-option{padding-left:2em}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { id: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], label: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLW9wdGlvbi1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL2dsbi1vcHRpb24tZ3JvdXAvZ2xuLW9wdGlvbi1ncm91cC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL2dsbi1vcHRpb24tZ3JvdXAvZ2xuLW9wdGlvbi1ncm91cC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxLQUFLLEVBS0wsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBa0IsZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUV4RCxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7QUFXeEIsTUFBTSxPQUFPLHVCQUF1QjtJQVVsQyxZQUFtQixPQUFnQyxFQUFVLFFBQW1CLEVBQVUsaUJBQW9DO1FBQTNHLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFSdkgsT0FBRSxHQUFHLFNBQVMsZUFBZSxFQUFFLEVBQUUsQ0FBQztRQVN2QyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVNLFdBQVcsQ0FBQyxPQUFzQjtRQUN2QyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDO0lBRU0sUUFBUTtRQUNiLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekUsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDO0lBRUQsbUJBQW1CO0lBRW5CLGlDQUFpQztJQUMxQixXQUFXLENBQUMsS0FBcUI7UUFDdEMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3hCLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1RSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDOztvSEF0Q1UsdUJBQXVCO3dHQUF2Qix1QkFBdUIsMkdBRnZCLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLENBQUMsNkVDekJsRiwyTEFHMkQ7MkZEd0I5Qyx1QkFBdUI7a0JBVG5DLFNBQVM7K0JBQ0Usa0JBQWtCLFlBQ2xCLGdCQUFnQixpQkFHWCxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNLGFBQ3BDLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyx5QkFBeUIsRUFBRSxDQUFDO3lKQUl6RSxFQUFFO3NCQURSLEtBQUs7Z0JBR0MsVUFBVTtzQkFEaEIsS0FBSztnQkFHQyxLQUFLO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdsbk9wdGlvbkdyb3VwLCBHTE5fT1BUSU9OX0dST1VQIH0gZnJvbSAnLi4vZ2xuLW9wdGlvbi9nbG4tb3B0aW9uLWdyb3VwLmludGVyZmFjZSc7XG5pbXBvcnQgeyBCb29sZWFuVXRpbCB9IGZyb20gJy4uL191dGlscy9ib29sZWFuLnV0aWwnO1xuaW1wb3J0IHsgSHRtbEVsZW1VdGlsIH0gZnJvbSAnLi4vX3V0aWxzL2h0bWwtZWxlbS51dGlsJztcblxubGV0IHVuaXF1ZUlkQ291bnRlciA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dsbi1vcHRpb24tZ3JvdXAnLFxuICBleHBvcnRBczogJ2dsbk9wdGlvbkdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dsbi1vcHRpb24tZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9nbG4tb3B0aW9uLWdyb3VwLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEdMTl9PUFRJT05fR1JPVVAsIHVzZUV4aXN0aW5nOiBHbG5PcHRpb25Hcm91cENvbXBvbmVudCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgR2xuT3B0aW9uR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgR2xuT3B0aW9uR3JvdXAge1xuICBASW5wdXQoKVxuICBwdWJsaWMgaWQgPSBgZ2xub2ctJHt1bmlxdWVJZENvdW50ZXIrK31gO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaXNEaXNhYmxlZDogc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBsYWJlbDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBob3N0UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIEh0bWxFbGVtVXRpbC5zZXRBdHRyKHRoaXMucmVuZGVyZXIsIHRoaXMuaG9zdFJlZiwgJ3JvbGUnLCAnZ3JvdXAnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2lzRGlzYWJsZWQnXSkge1xuICAgICAgdGhpcy5zZXREaXNhYmxlZChCb29sZWFuVXRpbC5pbml0KHRoaXMuaXNEaXNhYmxlZCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBIdG1sRWxlbVV0aWwudXBkYXRlSWZNaXNzaW5nKHRoaXMucmVuZGVyZXIsIHRoaXMuaG9zdFJlZiwgJ2lkJywgdGhpcy5pZCk7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0RGlzYWJsZWQoISF0aGlzLmRpc2FibGVkKTtcbiAgICB9XG4gIH1cblxuICAvLyAqKiBQdWJsaWMgQVBJICoqXG5cbiAgLyoqIENoZWNrIG9yIHVuY2hlY2sgZGlzYWJsZWQuICovXG4gIHB1YmxpYyBzZXREaXNhYmxlZCh2YWx1ZTogYm9vbGVhbiB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCAhPT0gISF2YWx1ZSkge1xuICAgICAgdGhpcy5kaXNhYmxlZCA9ICEhdmFsdWU7XG4gICAgICBIdG1sRWxlbVV0aWwuc2V0Q2xhc3ModGhpcy5yZW5kZXJlciwgdGhpcy5ob3N0UmVmLCAnZ2xuLWRpc2FibGVkJywgISF2YWx1ZSk7XG4gICAgICBIdG1sRWxlbVV0aWwuc2V0QXR0cih0aGlzLnJlbmRlcmVyLCB0aGlzLmhvc3RSZWYsICdkaXMnLCB2YWx1ZSA/ICcnIDogbnVsbCk7XG4gICAgICBIdG1sRWxlbVV0aWwuc2V0QXR0cih0aGlzLnJlbmRlcmVyLCB0aGlzLmhvc3RSZWYsICdhcmlhLWRpc2FibGVkJywgJycgKyAhIXZhbHVlKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG59XG4iLCI8c3BhbiBnbG5vZy1sYWJlbFxuICBjbGFzcz1cImdsbi1vcHRpb24tZ3JvdXAtbGFiZWxcIlxuICBhcmlhLWhpZGRlbj1cInRydWVcIj57eyBsYWJlbCB9fSA8bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuPlxuPG5nLWNvbnRlbnQgc2VsZWN0PVwiZ2xuLW9wdGlvbiwgbmctY29udGFpbmVyXCI+PC9uZy1jb250ZW50PiJdfQ==