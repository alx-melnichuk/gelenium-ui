import { take } from 'rxjs/operators';
import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import * as i0 from "@angular/core";
export class GlnBasisFrame {
    constructor(uniqueIdCounter, prefix, hostRef, renderer, changeDetectorRef, ngZone) {
        this.prefix = prefix;
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.id = '';
        this.writeValueInit = new EventEmitter();
        this.disabled = null; // Binding attribute "isDisabled".
        this.error = null; // Binding attribute "isError".
        this.isWriteValueInit = null;
        this.labelShrink = null; // Binding attribute "isLabelShrink".
        this.noAnimation = null; // Binding attribute "isNoAnimation".
        this.noLabel = null; // Binding attribute "isNoLabel".
        this.readOnly = null; // Binding attribute "isReadOnly".
        this.required = null; // Binding attribute "isRequired".
        this.valueInit = null; // Binding attribute "isValueInit".
        // ** ControlValueAccessor - start **
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.onChange = () => { };
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.onTouched = () => { };
        this.id = `${prefix}-${uniqueIdCounter}`;
        if (!prefix) {
            console.warn('The "prefix" parameter is not defined, and therefore the "id" value is not unique.');
        }
    }
    ngOnChanges(changes) {
        if (changes['isDisabled']) {
            this.disabled = BooleanUtil.init(this.isDisabled);
            this.setDisabledState(!!this.disabled);
        }
        if (changes['isError']) {
            this.error = BooleanUtil.init(this.isError);
        }
        if (changes['isLabelShrink']) {
            this.labelShrink = BooleanUtil.init(this.isLabelShrink);
        }
        if (changes['isNoAnimation']) {
            this.noAnimation = BooleanUtil.init(this.isNoAnimation);
        }
        if (changes['isNoLabel']) {
            this.noLabel = BooleanUtil.init(this.isNoLabel);
        }
        if (changes['isReadOnly']) {
            this.readOnly = BooleanUtil.init(this.isReadOnly);
        }
        if (changes['isRequired']) {
            this.required = BooleanUtil.init(this.isRequired);
        }
        if (changes['isValueInit']) {
            this.valueInit = BooleanUtil.init(this.isValueInit);
        }
    }
    ngOnInit() {
        HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    }
    ngAfterContentInit() {
        // If 'IsValueInit' is specified and 'FormControlName' is not used, then enable the event on the second call to the 'WriteValue'.
        this.isWriteValueInit = this.valueInit && !this.hostRef.nativeElement.hasAttribute('formcontrolname');
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    writeValue(value) {
        if (this.isWriteValueInit) {
            this.isWriteValueInit = null;
            this.changeDetectorRef.markForCheck();
            // ValueAccessor.writeValue is being called twice, first time with a phantom null value
            // https://github.com/angular/angular/issues/14988
            // The zone will become stable when the component finishes rendering. And only after that execute the callback.
            // This helps to avoid animation spurious effects.
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                this.writeValueInit.emit();
                this.changeDetectorRef.markForCheck();
            });
        }
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    }
    // ** ControlValueAccessor - finish **
    // ** Public API **
    markForCheck() {
        this.changeDetectorRef.markForCheck();
    }
    getBoolean(value) {
        return BooleanUtil.init(value);
    }
}
GlnBasisFrame.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnBasisFrame, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
GlnBasisFrame.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnBasisFrame, inputs: { id: "id", isDisabled: "isDisabled", isError: "isError", isLabelShrink: "isLabelShrink", isNoAnimation: "isNoAnimation", isNoLabel: "isNoLabel", isReadOnly: "isReadOnly", isRequired: "isRequired", isValueInit: "isValueInit" }, outputs: { writeValueInit: "writeValueInit" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnBasisFrame, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: undefined }, { type: undefined }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { id: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isError: [{
                type: Input
            }], isLabelShrink: [{
                type: Input
            }], isNoAnimation: [{
                type: Input
            }], isNoLabel: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], isRequired: [{
                type: Input
            }], isValueInit: [{
                type: Input
            }], writeValueInit: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWJhc2lzLWZyYW1lLmNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ2VsZW5pdW0tdWkvc3JjL2xpYi9fY2xhc3Nlcy9nbG4tYmFzaXMtZnJhbWUuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFHTCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEdBR1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFHeEQsTUFBTSxPQUFnQixhQUFhO0lBaUNqQyxZQUNFLGVBQXVCLEVBQ2hCLE1BQWMsRUFDZCxPQUFnQyxFQUM3QixRQUFtQixFQUNuQixpQkFBb0MsRUFDcEMsTUFBYztRQUpqQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDN0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFyQ25CLE9BQUUsR0FBRyxFQUFFLENBQUM7UUFtQk4sbUJBQWMsR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRSxhQUFRLEdBQW1CLElBQUksQ0FBQyxDQUFDLGtDQUFrQztRQUNuRSxVQUFLLEdBQW1CLElBQUksQ0FBQyxDQUFDLCtCQUErQjtRQUM3RCxxQkFBZ0IsR0FBbUIsSUFBSSxDQUFDO1FBQ3hDLGdCQUFXLEdBQW1CLElBQUksQ0FBQyxDQUFDLHFDQUFxQztRQUN6RSxnQkFBVyxHQUFtQixJQUFJLENBQUMsQ0FBQyxxQ0FBcUM7UUFDekUsWUFBTyxHQUFtQixJQUFJLENBQUMsQ0FBQyxpQ0FBaUM7UUFDakUsYUFBUSxHQUFtQixJQUFJLENBQUMsQ0FBQyxrQ0FBa0M7UUFDbkUsYUFBUSxHQUFtQixJQUFJLENBQUMsQ0FBQyxrQ0FBa0M7UUFDbkUsY0FBUyxHQUFtQixJQUFJLENBQUMsQ0FBQyxtQ0FBbUM7UUFxRDVFLHFDQUFxQztRQUVyQyxnRUFBZ0U7UUFDekQsYUFBUSxHQUEyQixHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDbkQsZ0VBQWdFO1FBQ3pELGNBQVMsR0FBZSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFoRHRDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxNQUFNLElBQUksZUFBZSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0ZBQW9GLENBQUMsQ0FBQztTQUNwRztJQUNILENBQUM7SUFFTSxXQUFXLENBQUMsT0FBc0I7UUFDdkMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0M7UUFDRCxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDakQ7UUFDRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNuRDtRQUNELElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDO0lBRU0sUUFBUTtRQUNiLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVNLGtCQUFrQjtRQUN2QixpSUFBaUk7UUFDakksSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN4RyxDQUFDO0lBUUQsb0pBQW9KO0lBQzdJLFVBQVUsQ0FBQyxLQUFVO1FBQzFCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3RDLHVGQUF1RjtZQUN2RixrREFBa0Q7WUFDbEQsK0dBQStHO1lBQy9HLGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsaUhBQWlIO0lBQzFHLGdCQUFnQixDQUFDLEVBQU87UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELGlIQUFpSDtJQUMxRyxpQkFBaUIsQ0FBQyxFQUFPO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELHNDQUFzQztJQUV0QyxtQkFBbUI7SUFFWixZQUFZO1FBQ2pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRU0sVUFBVSxDQUFDLEtBQTBDO1FBQzFELE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDOzswR0FsSW1CLGFBQWE7OEZBQWIsYUFBYTsyRkFBYixhQUFhO2tCQURsQyxTQUFTO3dOQUdELEVBQUU7c0JBRFIsS0FBSztnQkFHQyxVQUFVO3NCQURoQixLQUFLO2dCQUdDLE9BQU87c0JBRGIsS0FBSztnQkFHQyxhQUFhO3NCQURuQixLQUFLO2dCQUdDLGFBQWE7c0JBRG5CLEtBQUs7Z0JBR0MsU0FBUztzQkFEZixLQUFLO2dCQUdDLFVBQVU7c0JBRGhCLEtBQUs7Z0JBR0MsVUFBVTtzQkFEaEIsS0FBSztnQkFHQyxXQUFXO3NCQURqQixLQUFLO2dCQUlHLGNBQWM7c0JBRHRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCb29sZWFuVXRpbCB9IGZyb20gJy4uL191dGlscy9ib29sZWFuLnV0aWwnO1xuXG5pbXBvcnQgeyBIdG1sRWxlbVV0aWwgfSBmcm9tICcuLi9fdXRpbHMvaHRtbC1lbGVtLnV0aWwnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHbG5CYXNpc0ZyYW1lIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KClcbiAgcHVibGljIGlkID0gJyc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpc0Rpc2FibGVkOiBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgQElucHV0KClcbiAgcHVibGljIGlzRXJyb3I6IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaXNMYWJlbFNocmluazogc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpc05vQW5pbWF0aW9uOiBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgQElucHV0KClcbiAgcHVibGljIGlzTm9MYWJlbDogc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpc1JlYWRPbmx5OiBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgQElucHV0KClcbiAgcHVibGljIGlzUmVxdWlyZWQ6IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaXNWYWx1ZUluaXQ6IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSB3cml0ZVZhbHVlSW5pdDogRXZlbnRFbWl0dGVyPCgpID0+IHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbiB8IG51bGwgPSBudWxsOyAvLyBCaW5kaW5nIGF0dHJpYnV0ZSBcImlzRGlzYWJsZWRcIi5cbiAgcHVibGljIGVycm9yOiBib29sZWFuIHwgbnVsbCA9IG51bGw7IC8vIEJpbmRpbmcgYXR0cmlidXRlIFwiaXNFcnJvclwiLlxuICBwdWJsaWMgaXNXcml0ZVZhbHVlSW5pdDogYm9vbGVhbiB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgbGFiZWxTaHJpbms6IGJvb2xlYW4gfCBudWxsID0gbnVsbDsgLy8gQmluZGluZyBhdHRyaWJ1dGUgXCJpc0xhYmVsU2hyaW5rXCIuXG4gIHB1YmxpYyBub0FuaW1hdGlvbjogYm9vbGVhbiB8IG51bGwgPSBudWxsOyAvLyBCaW5kaW5nIGF0dHJpYnV0ZSBcImlzTm9BbmltYXRpb25cIi5cbiAgcHVibGljIG5vTGFiZWw6IGJvb2xlYW4gfCBudWxsID0gbnVsbDsgLy8gQmluZGluZyBhdHRyaWJ1dGUgXCJpc05vTGFiZWxcIi5cbiAgcHVibGljIHJlYWRPbmx5OiBib29sZWFuIHwgbnVsbCA9IG51bGw7IC8vIEJpbmRpbmcgYXR0cmlidXRlIFwiaXNSZWFkT25seVwiLlxuICBwdWJsaWMgcmVxdWlyZWQ6IGJvb2xlYW4gfCBudWxsID0gbnVsbDsgLy8gQmluZGluZyBhdHRyaWJ1dGUgXCJpc1JlcXVpcmVkXCIuXG4gIHB1YmxpYyB2YWx1ZUluaXQ6IGJvb2xlYW4gfCBudWxsID0gbnVsbDsgLy8gQmluZGluZyBhdHRyaWJ1dGUgXCJpc1ZhbHVlSW5pdFwiLlxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHVuaXF1ZUlkQ291bnRlcjogbnVtYmVyLFxuICAgIHB1YmxpYyBwcmVmaXg6IHN0cmluZyxcbiAgICBwdWJsaWMgaG9zdFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgbmdab25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgdGhpcy5pZCA9IGAke3ByZWZpeH0tJHt1bmlxdWVJZENvdW50ZXJ9YDtcbiAgICBpZiAoIXByZWZpeCkge1xuICAgICAgY29uc29sZS53YXJuKCdUaGUgXCJwcmVmaXhcIiBwYXJhbWV0ZXIgaXMgbm90IGRlZmluZWQsIGFuZCB0aGVyZWZvcmUgdGhlIFwiaWRcIiB2YWx1ZSBpcyBub3QgdW5pcXVlLicpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2lzRGlzYWJsZWQnXSkge1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IEJvb2xlYW5VdGlsLmluaXQodGhpcy5pc0Rpc2FibGVkKTtcbiAgICAgIHRoaXMuc2V0RGlzYWJsZWRTdGF0ZSghIXRoaXMuZGlzYWJsZWQpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snaXNFcnJvciddKSB7XG4gICAgICB0aGlzLmVycm9yID0gQm9vbGVhblV0aWwuaW5pdCh0aGlzLmlzRXJyb3IpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snaXNMYWJlbFNocmluayddKSB7XG4gICAgICB0aGlzLmxhYmVsU2hyaW5rID0gQm9vbGVhblV0aWwuaW5pdCh0aGlzLmlzTGFiZWxTaHJpbmspO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snaXNOb0FuaW1hdGlvbiddKSB7XG4gICAgICB0aGlzLm5vQW5pbWF0aW9uID0gQm9vbGVhblV0aWwuaW5pdCh0aGlzLmlzTm9BbmltYXRpb24pO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snaXNOb0xhYmVsJ10pIHtcbiAgICAgIHRoaXMubm9MYWJlbCA9IEJvb2xlYW5VdGlsLmluaXQodGhpcy5pc05vTGFiZWwpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snaXNSZWFkT25seSddKSB7XG4gICAgICB0aGlzLnJlYWRPbmx5ID0gQm9vbGVhblV0aWwuaW5pdCh0aGlzLmlzUmVhZE9ubHkpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snaXNSZXF1aXJlZCddKSB7XG4gICAgICB0aGlzLnJlcXVpcmVkID0gQm9vbGVhblV0aWwuaW5pdCh0aGlzLmlzUmVxdWlyZWQpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snaXNWYWx1ZUluaXQnXSkge1xuICAgICAgdGhpcy52YWx1ZUluaXQgPSBCb29sZWFuVXRpbC5pbml0KHRoaXMuaXNWYWx1ZUluaXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBIdG1sRWxlbVV0aWwudXBkYXRlSWZNaXNzaW5nKHRoaXMucmVuZGVyZXIsIHRoaXMuaG9zdFJlZiwgJ2lkJywgdGhpcy5pZCk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIElmICdJc1ZhbHVlSW5pdCcgaXMgc3BlY2lmaWVkIGFuZCAnRm9ybUNvbnRyb2xOYW1lJyBpcyBub3QgdXNlZCwgdGhlbiBlbmFibGUgdGhlIGV2ZW50IG9uIHRoZSBzZWNvbmQgY2FsbCB0byB0aGUgJ1dyaXRlVmFsdWUnLlxuICAgIHRoaXMuaXNXcml0ZVZhbHVlSW5pdCA9IHRoaXMudmFsdWVJbml0ICYmICF0aGlzLmhvc3RSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpO1xuICB9XG5cbiAgLy8gKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgLSBzdGFydCAqKlxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbiAgcHVibGljIG9uQ2hhbmdlOiAodmFsOiB1bmtub3duKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbiAgcHVibGljIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlcywgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1dyaXRlVmFsdWVJbml0KSB7XG4gICAgICB0aGlzLmlzV3JpdGVWYWx1ZUluaXQgPSBudWxsO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIC8vIFZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZSBpcyBiZWluZyBjYWxsZWQgdHdpY2UsIGZpcnN0IHRpbWUgd2l0aCBhIHBoYW50b20gbnVsbCB2YWx1ZVxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTQ5ODhcbiAgICAgIC8vIFRoZSB6b25lIHdpbGwgYmVjb21lIHN0YWJsZSB3aGVuIHRoZSBjb21wb25lbnQgZmluaXNoZXMgcmVuZGVyaW5nLiBBbmQgb25seSBhZnRlciB0aGF0IGV4ZWN1dGUgdGhlIGNhbGxiYWNrLlxuICAgICAgLy8gVGhpcyBoZWxwcyB0byBhdm9pZCBhbmltYXRpb24gc3B1cmlvdXMgZWZmZWN0cy5cbiAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy53cml0ZVZhbHVlSW5pdC5lbWl0KCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlcywgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgLSBmaW5pc2ggKipcblxuICAvLyAqKiBQdWJsaWMgQVBJICoqXG5cbiAgcHVibGljIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHVibGljIGdldEJvb2xlYW4odmFsdWU6IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB8IG51bGwge1xuICAgIHJldHVybiBCb29sZWFuVXRpbC5pbml0KHZhbHVlKTtcbiAgfVxuXG4gIC8vICoqIFByaXZhdGUgQVBJICoqXG59XG4iXX0=