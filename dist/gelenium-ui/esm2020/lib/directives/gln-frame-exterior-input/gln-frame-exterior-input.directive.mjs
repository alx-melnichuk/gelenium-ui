import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { GlnFrameExterior, GlnFrameExteriorUtil } from '../../gln-frame/gln-frame-exterior.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';
import * as i0 from "@angular/core";
export class GlnFrameExteriorInputDirective {
    constructor(hostRef) {
        this.hostRef = hostRef;
        this.glnFrameExteriorInputChange = new EventEmitter();
        this.exterior = GlnFrameExteriorUtil.create(null);
        this.elementRef = this.hostRef;
        // ** Implementation of the GlnSizePrepareData interface. (start) **
        this.getExterior = () => {
            return this.exterior;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.getBorderRadius = (frameSizeValue, lineHeight) => {
            let result = null;
            const radius = frameSizeValue > 0 && (this.exterior === GlnFrameExterior.outlined || this.exterior === GlnFrameExterior.underline)
                ? NumberUtil.roundTo100(frameSizeValue / 10) + 'px'
                : null;
            if (this.exterior === GlnFrameExterior.outlined) {
                result = radius;
            }
            else if (this.exterior === GlnFrameExterior.underline) {
                result = radius !== null ? radius + ' ' + radius + ' 0px 0px' : null;
            }
            else if (this.exterior === GlnFrameExterior.standard) {
                result = null;
            }
            return result;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.getPaddingHor = (frameSizeValue, lineHeight) => {
            let value = null;
            if (this.exterior === GlnFrameExterior.outlined) {
                value = NumberUtil.roundTo100(0.25 * frameSizeValue);
            }
            else if (this.exterior === GlnFrameExterior.underline) {
                value = NumberUtil.roundTo100(0.21428 * frameSizeValue);
            }
            else if (this.exterior === GlnFrameExterior.standard) {
                value = 0;
            }
            if (value !== null) {
                // paddingHor
                const pdLfRgShr = NumberUtil.roundTo100(2 * value * 1.33);
                HtmlElemUtil.setProperty(this.elementRef, '--glnfre-pd-shr', NumberUtil.str(pdLfRgShr)?.concat('px'));
            }
            return value !== null ? { left: value, right: value } : null;
        };
        this.getPaddingVer = (frameSizeValue, lineHeight) => {
            let result = null;
            const param = frameSizeValue > 0 && lineHeight > 0 ? frameSizeValue - lineHeight : null;
            if (param != null) {
                if (this.exterior === GlnFrameExterior.outlined) {
                    const value = param / 2;
                    result = { top: value, bottom: value };
                }
                else if (this.exterior === GlnFrameExterior.underline || this.exterior === GlnFrameExterior.standard) {
                    result = { top: param * 0.75, bottom: param * 0.25 };
                }
            }
            if (result !== null) {
                // paddingVer
                const translateY = this.translateY(this.exterior, frameSizeValue, lineHeight);
                HtmlElemUtil.setProperty(this.elementRef, '--glnfre-trn-y', NumberUtil.str(translateY)?.concat('px'));
                const translateY2 = this.translate2Y(this.exterior, frameSizeValue, lineHeight);
                HtmlElemUtil.setProperty(this.elementRef, '--glnfre-trn2-y', NumberUtil.str(translateY2)?.concat('px'));
            }
            return result;
        };
    }
    ngOnChanges(changes) {
        if (changes['glnFrameExteriorInputElementRef']) {
            this.elementRef = this.glnFrameExteriorInputElementRef || this.hostRef;
        }
        if (changes['glnFrameExteriorInput']) {
            const exteriorInp = GlnFrameExteriorUtil.convert(this.glnFrameExteriorInput || null);
            const exterior = GlnFrameExteriorUtil.create(exteriorInp);
            this.exterior = exterior;
            this.glnFrameExteriorInputChange.emit();
        }
    }
    // ** Implementation of the GlnSizePrepareData interface. (finish) **
    // ** Private API **
    // Determines the y transform value at the shrink position (top).
    translateY(exterior, frameSizeValue, lineHeight) {
        let result = null;
        if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
            result = NumberUtil.roundTo100(lineHeight * 0.25);
            if (exterior === GlnFrameExterior.standard) {
                result = NumberUtil.roundTo100((frameSizeValue * 0.75 - lineHeight * 1.27) * 0.4);
            }
            else if (exterior === GlnFrameExterior.outlined) {
                result = NumberUtil.roundTo100((-0.75 * lineHeight) / 2);
            }
            else if (exterior === GlnFrameExterior.underline) {
                result = NumberUtil.roundTo100((frameSizeValue * 0.757 - lineHeight * 1.257) * 0.45);
            }
        }
        return result;
    }
    // Determines the y transform value at the unshrink position (in the middle).
    translate2Y(exterior, frameSizeValue, lineHeight) {
        let result = null;
        if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
            result = NumberUtil.roundTo100((frameSizeValue - lineHeight) * (GlnFrameExterior.standard === exterior ? 0.75 : 0.5));
        }
        return result;
    }
}
GlnFrameExteriorInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorInputDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
GlnFrameExteriorInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnFrameExteriorInputDirective, selector: "[glnFrameExteriorInput]", inputs: { glnFrameExteriorInput: "glnFrameExteriorInput", glnFrameExteriorInputElementRef: "glnFrameExteriorInputElementRef" }, outputs: { glnFrameExteriorInputChange: "glnFrameExteriorInputChange" }, exportAs: ["glnFrameExteriorInput"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnFrameExteriorInput]',
                    exportAs: 'glnFrameExteriorInput',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { glnFrameExteriorInput: [{
                type: Input
            }], glnFrameExteriorInputElementRef: [{
                type: Input
            }], glnFrameExteriorInputChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWZyYW1lLWV4dGVyaW9yLWlucHV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZGlyZWN0aXZlcy9nbG4tZnJhbWUtZXh0ZXJpb3ItaW5wdXQvZ2xuLWZyYW1lLWV4dGVyaW9yLWlucHV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQU83RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQU10RCxNQUFNLE9BQU8sOEJBQThCO0lBWXpDLFlBQW1CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBTDFDLGdDQUEyQixHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXZFLGFBQVEsR0FBcUIsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELGVBQVUsR0FBNEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQWdCMUQsb0VBQW9FO1FBRTdELGdCQUFXLEdBQUcsR0FBa0IsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBQ0YsNkRBQTZEO1FBQ3RELG9CQUFlLEdBQUcsQ0FBQyxjQUFzQixFQUFFLFVBQWtCLEVBQWlCLEVBQUU7WUFDckYsSUFBSSxNQUFNLEdBQWtCLElBQUksQ0FBQztZQUNqQyxNQUFNLE1BQU0sR0FDVixjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxnQkFB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VUFBeUI7UUFDckcsSUFBSSxNQUFNLEdBQWtCLElBQUksQ0FBQztRQUNqQyxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksY0FBYyxHQUFHLENBQUMsSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ2hFLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3ZIO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7MkhBakhVLDhCQUE4QjsrR0FBOUIsOEJBQThCOzJGQUE5Qiw4QkFBOEI7a0JBSjFDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFLHVCQUF1QjtpQkFDbEM7aUdBR1EscUJBQXFCO3NCQUQzQixLQUFLO2dCQUdDLCtCQUErQjtzQkFEckMsS0FBSztnQkFJRywyQkFBMkI7c0JBRG5DLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEdsbkZyYW1lU2l6ZVBhZGRpbmdIb3JSZXMsXG4gIEdsbkZyYW1lU2l6ZVBhZGRpbmdWZXJSZXMsXG4gIEdsbkZyYW1lU2l6ZVByZXBhcmUsXG59IGZyb20gJy4uL2dsbi1mcmFtZS1zaXplL2dsbi1mcmFtZS1zaXplLXByZXBhcmUuaW50ZXJmYWNlJztcbmltcG9ydCB7IEdsbkZyYW1lRXh0ZXJpb3IsIEdsbkZyYW1lRXh0ZXJpb3JVdGlsIH0gZnJvbSAnLi4vLi4vZ2xuLWZyYW1lL2dsbi1mcmFtZS1leHRlcmlvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSHRtbEVsZW1VdGlsIH0gZnJvbSAnLi4vLi4vX3V0aWxzL2h0bWwtZWxlbS51dGlsJztcbmltcG9ydCB7IE51bWJlclV0aWwgfSBmcm9tICcuLi8uLi9fdXRpbHMvbnVtYmVyLnV0aWwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZ2xuRnJhbWVFeHRlcmlvcklucHV0XScsXG4gIGV4cG9ydEFzOiAnZ2xuRnJhbWVFeHRlcmlvcklucHV0Jyxcbn0pXG5leHBvcnQgY2xhc3MgR2xuRnJhbWVFeHRlcmlvcklucHV0RGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBHbG5GcmFtZVNpemVQcmVwYXJlIHtcbiAgQElucHV0KClcbiAgcHVibGljIGdsbkZyYW1lRXh0ZXJpb3JJbnB1dDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDsgLy8gR2xuRnJhbWVFeHRlcmlvclR5cGVcbiAgQElucHV0KClcbiAgcHVibGljIGdsbkZyYW1lRXh0ZXJpb3JJbnB1dEVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+IHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgZ2xuRnJhbWVFeHRlcmlvcklucHV0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGV4dGVyaW9yOiBHbG5GcmFtZUV4dGVyaW9yID0gR2xuRnJhbWVFeHRlcmlvclV0aWwuY3JlYXRlKG51bGwpO1xuICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4gPSB0aGlzLmhvc3RSZWY7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGhvc3RSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2dsbkZyYW1lRXh0ZXJpb3JJbnB1dEVsZW1lbnRSZWYnXSkge1xuICAgICAgdGhpcy5lbGVtZW50UmVmID0gdGhpcy5nbG5GcmFtZUV4dGVyaW9ySW5wdXRFbGVtZW50UmVmIHx8IHRoaXMuaG9zdFJlZjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2dsbkZyYW1lRXh0ZXJpb3JJbnB1dCddKSB7XG4gICAgICBjb25zdCBleHRlcmlvcklucCA9IEdsbkZyYW1lRXh0ZXJpb3JVdGlsLmNvbnZlcnQodGhpcy5nbG5GcmFtZUV4dGVyaW9ySW5wdXQgfHwgbnVsbCk7XG4gICAgICBjb25zdCBleHRlcmlvciA9IEdsbkZyYW1lRXh0ZXJpb3JVdGlsLmNyZWF0ZShleHRlcmlvcklucCk7XG4gICAgICB0aGlzLmV4dGVyaW9yID0gZXh0ZXJpb3I7XG4gICAgICB0aGlzLmdsbkZyYW1lRXh0ZXJpb3JJbnB1dENoYW5nZS5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgLy8gKiogSW1wbGVtZW50YXRpb24gb2YgdGhlIEdsblNpemVQcmVwYXJlRGF0YSBpbnRlcmZhY2UuIChzdGFydCkgKipcblxuICBwdWJsaWMgZ2V0RXh0ZXJpb3IgPSAoKTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZXJpb3I7XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgcHVibGljIGdldEJvcmRlclJhZGl1cyA9IChmcmFtZVNpemVWYWx1ZTogbnVtYmVyLCBsaW5lSGVpZ2h0OiBudW1iZXIpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgICBsZXQgcmVzdWx0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCByYWRpdXMgPVxuICAgICAgZnJhbWVTaXplVmFsdWUgPiAwICYmICh0aGlzLmV4dGVyaW9yID09PSBHbG5GcmFtZUV4dGVyaW9yLm91dGxpbmVkIHx8IHRoaXMuZXh0ZXJpb3IgPT09IEdsbkZyYW1lRXh0ZXJpb3IudW5kZXJsaW5lKVxuICAgICAgICA/IE51bWJlclV0aWwucm91bmRUbzEwMChmcmFtZVNpemVWYWx1ZSAvIDEwKSArICdweCdcbiAgICAgICAgOiBudWxsO1xuICAgIGlmICh0aGlzLmV4dGVyaW9yID09PSBHbG5GcmFtZUV4dGVyaW9yLm91dGxpbmVkKSB7XG4gICAgICByZXN1bHQgPSByYWRpdXM7XG4gICAgfSBlbHNlIGlmICh0aGlzLmV4dGVyaW9yID09PSBHbG5GcmFtZUV4dGVyaW9yLnVuZGVybGluZSkge1xuICAgICAgcmVzdWx0ID0gcmFkaXVzICE9PSBudWxsID8gcmFkaXVzICsgJyAnICsgcmFkaXVzICsgJyAwcHggMHB4JyA6IG51bGw7XG4gICAgfSBlbHNlIGlmICh0aGlzLmV4dGVyaW9yID09PSBHbG5GcmFtZUV4dGVyaW9yLnN0YW5kYXJkKSB7XG4gICAgICByZXN1bHQgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gIHB1YmxpYyBnZXRQYWRkaW5nSG9yID0gKGZyYW1lU2l6ZVZhbHVlOiBudW1iZXIsIGxpbmVIZWlnaHQ6IG51bWJlcik6IEdsbkZyYW1lU2l6ZVBhZGRpbmdIb3JSZXMgfCBudWxsID0+IHtcbiAgICBsZXQgdmFsdWU6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAgIGlmICh0aGlzLmV4dGVyaW9yID09PSBHbG5GcmFtZUV4dGVyaW9yLm91dGxpbmVkKSB7XG4gICAgICB2YWx1ZSA9IE51bWJlclV0aWwucm91bmRUbzEwMCgwLjI1ICogZnJhbWVTaXplVmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5leHRlcmlvciA9PT0gR2xuRnJhbWVFeHRlcmlvci51bmRlcmxpbmUpIHtcbiAgICAgIHZhbHVlID0gTnVtYmVyVXRpbC5yb3VuZFRvMTAwKDAuMjE0MjggKiBmcmFtZVNpemVWYWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmV4dGVyaW9yID09PSBHbG5GcmFtZUV4dGVyaW9yLnN0YW5kYXJkKSB7XG4gICAgICB2YWx1ZSA9IDA7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgLy8gcGFkZGluZ0hvclxuICAgICAgY29uc3QgcGRMZlJnU2hyID0gTnVtYmVyVXRpbC5yb3VuZFRvMTAwKDIgKiB2YWx1ZSAqIDEuMzMpO1xuICAgICAgSHRtbEVsZW1VdGlsLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZiwgJy0tZ2xuZnJlLXBkLXNocicsIE51bWJlclV0aWwuc3RyKHBkTGZSZ1Nocik/LmNvbmNhdCgncHgnKSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCA/IHsgbGVmdDogdmFsdWUsIHJpZ2h0OiB2YWx1ZSB9IDogbnVsbDtcbiAgfTtcblxuICBwdWJsaWMgZ2V0UGFkZGluZ1ZlciA9IChmcmFtZVNpemVWYWx1ZTogbnVtYmVyLCBsaW5lSGVpZ2h0OiBudW1iZXIpOiBHbG5GcmFtZVNpemVQYWRkaW5nVmVyUmVzIHwgbnVsbCA9PiB7XG4gICAgbGV0IHJlc3VsdDogR2xuRnJhbWVTaXplUGFkZGluZ1ZlclJlcyB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IHBhcmFtID0gZnJhbWVTaXplVmFsdWUgPiAwICYmIGxpbmVIZWlnaHQgPiAwID8gZnJhbWVTaXplVmFsdWUgLSBsaW5lSGVpZ2h0IDogbnVsbDtcbiAgICBpZiAocGFyYW0gIT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuZXh0ZXJpb3IgPT09IEdsbkZyYW1lRXh0ZXJpb3Iub3V0bGluZWQpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJhbSAvIDI7XG4gICAgICAgIHJlc3VsdCA9IHsgdG9wOiB2YWx1ZSwgYm90dG9tOiB2YWx1ZSB9O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmV4dGVyaW9yID09PSBHbG5GcmFtZUV4dGVyaW9yLnVuZGVybGluZSB8fCB0aGlzLmV4dGVyaW9yID09PSBHbG5GcmFtZUV4dGVyaW9yLnN0YW5kYXJkKSB7XG4gICAgICAgIHJlc3VsdCA9IHsgdG9wOiBwYXJhbSAqIDAuNzUsIGJvdHRvbTogcGFyYW0gKiAwLjI1IH07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcbiAgICAgIC8vIHBhZGRpbmdWZXJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZVkgPSB0aGlzLnRyYW5zbGF0ZVkodGhpcy5leHRlcmlvciwgZnJhbWVTaXplVmFsdWUsIGxpbmVIZWlnaHQpO1xuICAgICAgSHRtbEVsZW1VdGlsLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZiwgJy0tZ2xuZnJlLXRybi15JywgTnVtYmVyVXRpbC5zdHIodHJhbnNsYXRlWSk/LmNvbmNhdCgncHgnKSk7XG5cbiAgICAgIGNvbnN0IHRyYW5zbGF0ZVkyID0gdGhpcy50cmFuc2xhdGUyWSh0aGlzLmV4dGVyaW9yLCBmcmFtZVNpemVWYWx1ZSwgbGluZUhlaWdodCk7XG4gICAgICBIdG1sRWxlbVV0aWwuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLCAnLS1nbG5mcmUtdHJuMi15JywgTnVtYmVyVXRpbC5zdHIodHJhbnNsYXRlWTIpPy5jb25jYXQoJ3B4JykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vICoqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBHbG5TaXplUHJlcGFyZURhdGEgaW50ZXJmYWNlLiAoZmluaXNoKSAqKlxuXG4gIC8vICoqIFByaXZhdGUgQVBJICoqXG5cbiAgLy8gRGV0ZXJtaW5lcyB0aGUgeSB0cmFuc2Zvcm0gdmFsdWUgYXQgdGhlIHNocmluayBwb3NpdGlvbiAodG9wKS5cbiAgcHVibGljIHRyYW5zbGF0ZVkoZXh0ZXJpb3I6IEdsbkZyYW1lRXh0ZXJpb3IgfCBudWxsLCBmcmFtZVNpemVWYWx1ZTogbnVtYmVyLCBsaW5lSGVpZ2h0OiBudW1iZXIgfCBudWxsKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgbGV0IHJlc3VsdDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKGV4dGVyaW9yICE9IG51bGwgJiYgZnJhbWVTaXplVmFsdWUgPiAwICYmIGxpbmVIZWlnaHQgIT0gbnVsbCkge1xuICAgICAgcmVzdWx0ID0gTnVtYmVyVXRpbC5yb3VuZFRvMTAwKGxpbmVIZWlnaHQgKiAwLjI1KTtcbiAgICAgIGlmIChleHRlcmlvciA9PT0gR2xuRnJhbWVFeHRlcmlvci5zdGFuZGFyZCkge1xuICAgICAgICByZXN1bHQgPSBOdW1iZXJVdGlsLnJvdW5kVG8xMDAoKGZyYW1lU2l6ZVZhbHVlICogMC43NSAtIGxpbmVIZWlnaHQgKiAxLjI3KSAqIDAuNCk7XG4gICAgICB9IGVsc2UgaWYgKGV4dGVyaW9yID09PSBHbG5GcmFtZUV4dGVyaW9yLm91dGxpbmVkKSB7XG4gICAgICAgIHJlc3VsdCA9IE51bWJlclV0aWwucm91bmRUbzEwMCgoLTAuNzUgKiBsaW5lSGVpZ2h0KSAvIDIpO1xuICAgICAgfSBlbHNlIGlmIChleHRlcmlvciA9PT0gR2xuRnJhbWVFeHRlcmlvci51bmRlcmxpbmUpIHtcbiAgICAgICAgcmVzdWx0ID0gTnVtYmVyVXRpbC5yb3VuZFRvMTAwKChmcmFtZVNpemVWYWx1ZSAqIDAuNzU3IC0gbGluZUhlaWdodCAqIDEuMjU3KSAqIDAuNDUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIC8vIERldGVybWluZXMgdGhlIHkgdHJhbnNmb3JtIHZhbHVlIGF0IHRoZSB1bnNocmluayBwb3NpdGlvbiAoaW4gdGhlIG1pZGRsZSkuXG4gIHB1YmxpYyB0cmFuc2xhdGUyWShleHRlcmlvcjogR2xuRnJhbWVFeHRlcmlvciB8IG51bGwsIGZyYW1lU2l6ZVZhbHVlOiBudW1iZXIsIGxpbmVIZWlnaHQ6IG51bWJlciB8IG51bGwpOiBudW1iZXIgfCBudWxsIHtcbiAgICBsZXQgcmVzdWx0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgICBpZiAoZXh0ZXJpb3IgIT0gbnVsbCAmJiBmcmFtZVNpemVWYWx1ZSA+IDAgJiYgbGluZUhlaWdodCAhPSBudWxsKSB7XG4gICAgICByZXN1bHQgPSBOdW1iZXJVdGlsLnJvdW5kVG8xMDAoKGZyYW1lU2l6ZVZhbHVlIC0gbGluZUhlaWdodCkgKiAoR2xuRnJhbWVFeHRlcmlvci5zdGFuZGFyZCA9PT0gZXh0ZXJpb3IgPyAwLjc1IDogMC41KSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==