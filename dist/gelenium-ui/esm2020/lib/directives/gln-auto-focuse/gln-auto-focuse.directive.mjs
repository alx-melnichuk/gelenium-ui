import { Directive, Input } from '@angular/core';
import { BooleanUtil } from '../../_utils/boolean.util';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import * as i0 from "@angular/core";
export class GlnAutoFocuseDirective {
    constructor(hostRef, renderer) {
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.glnAutoFocuse = null;
        this.autoFocuse = false;
        this.hasOwner = false;
    }
    get isAutoFocuse() {
        return this.autoFocuse;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    set isAutoFocuse(value) { }
    get isHasOwner() {
        return this.hasOwner;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    set isHasOwner(value) { }
    ngOnChanges(changes) {
        if (changes['glnAutoFocuse']) {
            this.autoFocuse = !!BooleanUtil.init(this.glnAutoFocuse != null ? '' + this.glnAutoFocuse : null);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'auto-focuse', this.autoFocuse ? '' : null);
        }
    }
    ngAfterViewInit() {
        if (!this.hasOwner && this.autoFocuse) {
            Promise.resolve().then(() => {
                this.focuseElement();
            });
        }
    }
    // ** Public API **
    focuseElement() {
        const isDisabled = this.hostRef.nativeElement.disabled;
        if (!isDisabled) {
            this.hostRef.nativeElement.focus();
        }
    }
    setIsHasOwner(isHasOwner) {
        this.hasOwner = isHasOwner;
    }
}
GlnAutoFocuseDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
GlnAutoFocuseDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnAutoFocuseDirective, selector: "[glnAutoFocuse]", inputs: { glnAutoFocuse: "glnAutoFocuse" }, exportAs: ["glnAutoFocuse"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnAutoFocuse]',
                    exportAs: 'glnAutoFocuse',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { glnAutoFocuse: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWF1dG8tZm9jdXNlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZGlyZWN0aXZlcy9nbG4tYXV0by1mb2N1c2UvZ2xuLWF1dG8tZm9jdXNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxLQUFLLEVBQW1ELE1BQU0sZUFBZSxDQUFDO0FBRWpILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBTTNELE1BQU0sT0FBTyxzQkFBc0I7SUFrQmpDLFlBQW1CLE9BQWdDLEVBQVUsUUFBbUI7UUFBN0QsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBaEJ6RSxrQkFBYSxHQUE0QixJQUFJLENBQUM7UUFFN0MsZUFBVSxHQUFHLEtBQUssQ0FBQztRQU9uQixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBTzBELENBQUM7SUFicEYsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBQ0QsZ0VBQWdFO0lBQ2hFLElBQVcsWUFBWSxDQUFDLEtBQWMsSUFBRyxDQUFDO0lBRzFDLElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUNELGdFQUFnRTtJQUNoRSxJQUFXLFVBQVUsQ0FBQyxLQUFjLElBQUcsQ0FBQztJQUlqQyxXQUFXLENBQUMsT0FBc0I7UUFDdkMsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9GO0lBQ0gsQ0FBQztJQUVNLGVBQWU7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNyQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsbUJBQW1CO0lBRVosYUFBYTtRQUNsQixNQUFNLFVBQVUsR0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWtDLENBQUMsUUFBUSxDQUFDO1FBQzdFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFTSxhQUFhLENBQUMsVUFBbUI7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDN0IsQ0FBQzs7bUhBOUNVLHNCQUFzQjt1R0FBdEIsc0JBQXNCOzJGQUF0QixzQkFBc0I7a0JBSmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGVBQWU7aUJBQzFCO3lIQUdRLGFBQWE7c0JBRG5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCb29sZWFuVXRpbCB9IGZyb20gJy4uLy4uL191dGlscy9ib29sZWFuLnV0aWwnO1xuaW1wb3J0IHsgSHRtbEVsZW1VdGlsIH0gZnJvbSAnLi4vLi4vX3V0aWxzL2h0bWwtZWxlbS51dGlsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2dsbkF1dG9Gb2N1c2VdJyxcbiAgZXhwb3J0QXM6ICdnbG5BdXRvRm9jdXNlJyxcbn0pXG5leHBvcnQgY2xhc3MgR2xuQXV0b0ZvY3VzZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnbG5BdXRvRm9jdXNlOiBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBhdXRvRm9jdXNlID0gZmFsc2U7XG4gIHB1YmxpYyBnZXQgaXNBdXRvRm9jdXNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmF1dG9Gb2N1c2U7XG4gIH1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxuICBwdWJsaWMgc2V0IGlzQXV0b0ZvY3VzZSh2YWx1ZTogYm9vbGVhbikge31cblxuICBwcml2YXRlIGhhc093bmVyID0gZmFsc2U7XG4gIHB1YmxpYyBnZXQgaXNIYXNPd25lcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oYXNPd25lcjtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG4gIHB1YmxpYyBzZXQgaXNIYXNPd25lcih2YWx1ZTogYm9vbGVhbikge31cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaG9zdFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydnbG5BdXRvRm9jdXNlJ10pIHtcbiAgICAgIHRoaXMuYXV0b0ZvY3VzZSA9ICEhQm9vbGVhblV0aWwuaW5pdCh0aGlzLmdsbkF1dG9Gb2N1c2UgIT0gbnVsbCA/ICcnICsgdGhpcy5nbG5BdXRvRm9jdXNlIDogbnVsbCk7XG4gICAgICBIdG1sRWxlbVV0aWwuc2V0QXR0cih0aGlzLnJlbmRlcmVyLCB0aGlzLmhvc3RSZWYsICdhdXRvLWZvY3VzZScsIHRoaXMuYXV0b0ZvY3VzZSA/ICcnIDogbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzT3duZXIgJiYgdGhpcy5hdXRvRm9jdXNlKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5mb2N1c2VFbGVtZW50KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyAqKiBQdWJsaWMgQVBJICoqXG5cbiAgcHVibGljIGZvY3VzZUVsZW1lbnQoKTogdm9pZCB7XG4gICAgY29uc3QgaXNEaXNhYmxlZCA9ICh0aGlzLmhvc3RSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZDtcbiAgICBpZiAoIWlzRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldElzSGFzT3duZXIoaXNIYXNPd25lcjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaGFzT3duZXIgPSBpc0hhc093bmVyO1xuICB9XG59XG4iXX0=