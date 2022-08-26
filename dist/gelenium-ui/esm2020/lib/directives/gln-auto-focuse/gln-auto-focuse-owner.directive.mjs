import { ContentChildren, Directive } from '@angular/core';
import { GlnAutoFocuseDirective } from './gln-auto-focuse.directive';
import * as i0 from "@angular/core";
export class GlnAutoFocuseOwnerDirective {
    constructor(hostRef) {
        this.hostRef = hostRef;
    }
    ngAfterContentInit() {
        const elem = this.list.toArray();
        for (let i = 0; i < elem.length; i++) {
            elem[i]?.setIsHasOwner(true);
        }
    }
    ngAfterViewInit() {
        const elem = this.list.toArray();
        let elemAutoFocuse = null;
        for (let i = 0; i < elem.length && !elemAutoFocuse; i++) {
            if (elem[i] && elem[i].isAutoFocuse) {
                elemAutoFocuse = elem[i];
            }
        }
        if (elemAutoFocuse !== null) {
            Promise.resolve().then(() => {
                elemAutoFocuse?.focuseElement();
            });
        }
    }
}
GlnAutoFocuseOwnerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseOwnerDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
GlnAutoFocuseOwnerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnAutoFocuseOwnerDirective, selector: "[glnAutoFocuseOwner]", queries: [{ propertyName: "list", predicate: GlnAutoFocuseDirective, descendants: true }], exportAs: ["glnAutoFocuseOwner"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseOwnerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnAutoFocuseOwner]',
                    exportAs: 'glnAutoFocuseOwner',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { list: [{
                type: ContentChildren,
                args: [GlnAutoFocuseDirective, { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWF1dG8tZm9jdXNlLW93bmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZGlyZWN0aXZlcy9nbG4tYXV0by1mb2N1c2UvZ2xuLWF1dG8tZm9jdXNlLW93bmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW1DLGVBQWUsRUFBRSxTQUFTLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBRW5ILE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQU1yRSxNQUFNLE9BQU8sMkJBQTJCO0lBSXRDLFlBQW1CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQUcsQ0FBQztJQUVoRCxrQkFBa0I7UUFDdkIsTUFBTSxJQUFJLEdBQTZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFTSxlQUFlO1FBQ3BCLE1BQU0sSUFBSSxHQUE2QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNELElBQUksY0FBYyxHQUFrQyxJQUFJLENBQUM7UUFDekQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkQsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRTtnQkFDbkMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtTQUNGO1FBQ0QsSUFBSSxjQUFjLEtBQUssSUFBSSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUMxQixjQUFjLEVBQUUsYUFBYSxFQUFFLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O3dIQTFCVSwyQkFBMkI7NEdBQTNCLDJCQUEyQixpRkFDckIsc0JBQXNCOzJGQUQ1QiwyQkFBMkI7a0JBSnZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLG9CQUFvQjtpQkFDL0I7aUdBR1EsSUFBSTtzQkFEVixlQUFlO3VCQUFDLHNCQUFzQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgR2xuQXV0b0ZvY3VzZURpcmVjdGl2ZSB9IGZyb20gJy4vZ2xuLWF1dG8tZm9jdXNlLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tnbG5BdXRvRm9jdXNlT3duZXJdJyxcbiAgZXhwb3J0QXM6ICdnbG5BdXRvRm9jdXNlT3duZXInLFxufSlcbmV4cG9ydCBjbGFzcyBHbG5BdXRvRm9jdXNlT3duZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihHbG5BdXRvRm9jdXNlRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIHB1YmxpYyBsaXN0ITogUXVlcnlMaXN0PEdsbkF1dG9Gb2N1c2VEaXJlY3RpdmU+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBob3N0UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW06IEdsbkF1dG9Gb2N1c2VEaXJlY3RpdmVbXSA9IHRoaXMubGlzdC50b0FycmF5KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlbGVtW2ldPy5zZXRJc0hhc093bmVyKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZWxlbTogR2xuQXV0b0ZvY3VzZURpcmVjdGl2ZVtdID0gdGhpcy5saXN0LnRvQXJyYXkoKTtcbiAgICBsZXQgZWxlbUF1dG9Gb2N1c2U6IEdsbkF1dG9Gb2N1c2VEaXJlY3RpdmUgfCBudWxsID0gbnVsbDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW0ubGVuZ3RoICYmICFlbGVtQXV0b0ZvY3VzZTsgaSsrKSB7XG4gICAgICBpZiAoZWxlbVtpXSAmJiBlbGVtW2ldLmlzQXV0b0ZvY3VzZSkge1xuICAgICAgICBlbGVtQXV0b0ZvY3VzZSA9IGVsZW1baV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbGVtQXV0b0ZvY3VzZSAhPT0gbnVsbCkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGVsZW1BdXRvRm9jdXNlPy5mb2N1c2VFbGVtZW50KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==