import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { GlnFrameSizeUtil } from '../../gln-frame/gln-frame-size.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';
import * as i0 from "@angular/core";
export class GlnFrameSizeDirective {
    constructor(hostRef) {
        this.hostRef = hostRef;
        this.glnFrameSizeChange = new EventEmitter();
        this.frameSizeValue = 0;
        this.lineHeight = 0;
        this.elementRef = this.hostRef;
        this.paddingVerHorRes = null;
        this.isBeforeInit = true;
    }
    ngOnChanges(changes) {
        if (this.isBeforeInit) {
            this.isBeforeInit = false;
        }
        if (changes['glnFrameSizeElementRef']) {
            this.elementRef = this.glnFrameSizeElementRef || this.hostRef;
        }
        if (this.lineHeight === 0) {
            this.lineHeight = this.getLineHeight(this.hostRef);
        }
        let isModify = !!changes['glnFrameSizeLabelPd'] || !!changes['glnFrameSizeModify'];
        if (changes['glnFrameSize'] || changes['glnFrameSizeValue']) {
            const frameSizeValueOld = this.frameSizeValue;
            const frameSize = GlnFrameSizeUtil.convert(this.glnFrameSize || null);
            this.frameSizeValue = GlnFrameSizeUtil.getValue(frameSize) || this.glnFrameSizeValue || 0;
            const isModifySize = this.frameSizeValue !== frameSizeValueOld;
            isModify = !isModify && isModifySize ? isModifySize : isModify;
        }
        if (isModify) {
            this.updatePaddingVerAndHor();
        }
    }
    // ** Public API **
    updatePaddingVerAndHor() {
        if (this.isBeforeInit) {
            return;
        }
        this.modifyBorderRadius();
        const paddingHor = this.modifyHorizontalPadding();
        const paddingVer = this.modifyverticalPadding();
        if (paddingHor !== null && paddingVer !== null) {
            this.paddingVerHorRes = {
                ...paddingHor,
                ...paddingVer,
                ...{
                    frameSizeValue: this.frameSizeValue,
                    lineHeight: this.lineHeight,
                    exterior: this.glnFrameSizePrepare?.getExterior() || '',
                },
            };
            this.glnFrameSizeChange.emit(this.paddingVerHorRes);
        }
    }
    // ** Private API **
    getLineHeight(elem) {
        let result = 0;
        if (elem && elem.nativeElement) {
            // Get the line height from the style set.
            const lineHeightPx = getComputedStyle(elem.nativeElement).getPropertyValue('line-height');
            result = Number(lineHeightPx.replace('px', ''));
        }
        return result;
    }
    modifyBorderRadius() {
        let borderRadius = null;
        if (this.frameSizeValue > 0 && this.lineHeight > 0) {
            borderRadius = this.glnFrameSizePrepare?.getBorderRadius(this.frameSizeValue, this.lineHeight) || null;
        }
        HtmlElemUtil.setProperty(this.elementRef, '--glnfrs-br-rd', borderRadius);
    }
    modifyHorizontalPadding() {
        let paddingHorRes = null;
        if (this.frameSizeValue > 0 && this.lineHeight > 0) {
            if (this.glnFrameSizeLabelPd) {
                paddingHorRes = { left: this.glnFrameSizeLabelPd, right: this.glnFrameSizeLabelPd };
            }
            else {
                paddingHorRes = this.glnFrameSizePrepare?.getPaddingHor(this.frameSizeValue, this.lineHeight) || null;
            }
        }
        const left = paddingHorRes && paddingHorRes.left !== null ? paddingHorRes.left : null;
        HtmlElemUtil.setProperty(this.elementRef, '--glnfrs-pd-lf', NumberUtil.str(left)?.concat('px'));
        const right = paddingHorRes && paddingHorRes.right !== null ? paddingHorRes.right : null;
        HtmlElemUtil.setProperty(this.elementRef, '--glnfrs-pd-rg', NumberUtil.str(right)?.concat('px'));
        return paddingHorRes;
    }
    modifyverticalPadding() {
        let paddingVerRes = null;
        if (this.frameSizeValue > 0 && this.lineHeight > 0) {
            paddingVerRes = this.glnFrameSizePrepare?.getPaddingVer(this.frameSizeValue, this.lineHeight) || null;
            const top = paddingVerRes && paddingVerRes.top !== null ? paddingVerRes.top : null;
            HtmlElemUtil.setProperty(this.elementRef, '--glnfrs-pd-tp', NumberUtil.str(top)?.concat('px'));
            const bottom = paddingVerRes && paddingVerRes?.bottom !== null ? paddingVerRes.bottom : null;
            HtmlElemUtil.setProperty(this.elementRef, '--glnfrs-pd-bt', NumberUtil.str(bottom)?.concat('px'));
        }
        return paddingVerRes;
    }
}
GlnFrameSizeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameSizeDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
GlnFrameSizeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnFrameSizeDirective, selector: "[glnFrameSize]", inputs: { glnFrameSize: "glnFrameSize", glnFrameSizeValue: "glnFrameSizeValue", glnFrameSizeLabelPd: "glnFrameSizeLabelPd", glnFrameSizeElementRef: "glnFrameSizeElementRef", glnFrameSizePrepare: "glnFrameSizePrepare", glnFrameSizeModify: "glnFrameSizeModify" }, outputs: { glnFrameSizeChange: "glnFrameSizeChange" }, exportAs: ["glnFrameSize"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameSizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnFrameSize]',
                    exportAs: 'glnFrameSize',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { glnFrameSize: [{
                type: Input
            }], glnFrameSizeValue: [{
                type: Input
            }], glnFrameSizeLabelPd: [{
                type: Input
            }], glnFrameSizeElementRef: [{
                type: Input
            }], glnFrameSizePrepare: [{
                type: Input
            }], glnFrameSizeModify: [{
                type: Input
            }], glnFrameSizeChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWZyYW1lLXNpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ2VsZW5pdW0tdWkvc3JjL2xpYi9kaXJlY3RpdmVzL2dsbi1mcmFtZS1zaXplL2dsbi1mcmFtZS1zaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUU3RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQU81RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQU10RCxNQUFNLE9BQU8scUJBQXFCO0lBd0JoQyxZQUFtQixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQVQxQyx1QkFBa0IsR0FBK0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0RixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsZUFBVSxHQUE0QixJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ25ELHFCQUFnQixHQUF3QyxJQUFJLENBQUM7UUFFNUQsaUJBQVksR0FBRyxJQUFJLENBQUM7SUFFMEIsQ0FBQztJQUVoRCxXQUFXLENBQUMsT0FBc0I7UUFDdkMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxPQUFPLENBQUMsd0JBQXdCLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQy9EO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFB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O3NCQUR6QixLQUFLO2dCQUdDLHNCQUFzQjtzQkFENUIsS0FBSztnQkFHQyxtQkFBbUI7c0JBRHpCLEtBQUs7Z0JBR0Msa0JBQWtCO3NCQUR4QixLQUFLO2dCQUlHLGtCQUFrQjtzQkFEMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgR2xuRnJhbWVTaXplVXRpbCB9IGZyb20gJy4uLy4uL2dsbi1mcmFtZS9nbG4tZnJhbWUtc2l6ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtcbiAgR2xuRnJhbWVTaXplUGFkZGluZ0hvclJlcyxcbiAgR2xuRnJhbWVTaXplUGFkZGluZ1ZlckhvclJlcyxcbiAgR2xuRnJhbWVTaXplUGFkZGluZ1ZlclJlcyxcbiAgR2xuRnJhbWVTaXplUHJlcGFyZSxcbn0gZnJvbSAnLi9nbG4tZnJhbWUtc2l6ZS1wcmVwYXJlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBIdG1sRWxlbVV0aWwgfSBmcm9tICcuLi8uLi9fdXRpbHMvaHRtbC1lbGVtLnV0aWwnO1xuaW1wb3J0IHsgTnVtYmVyVXRpbCB9IGZyb20gJy4uLy4uL191dGlscy9udW1iZXIudXRpbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tnbG5GcmFtZVNpemVdJyxcbiAgZXhwb3J0QXM6ICdnbG5GcmFtZVNpemUnLFxufSlcbmV4cG9ydCBjbGFzcyBHbG5GcmFtZVNpemVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2xuRnJhbWVTaXplOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2xuRnJhbWVTaXplVmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnbG5GcmFtZVNpemVMYWJlbFBkOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2xuRnJhbWVTaXplRWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4gfCBudWxsIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2xuRnJhbWVTaXplUHJlcGFyZTogR2xuRnJhbWVTaXplUHJlcGFyZSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnbG5GcmFtZVNpemVNb2RpZnk6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGdsbkZyYW1lU2l6ZUNoYW5nZTogRXZlbnRFbWl0dGVyPEdsbkZyYW1lU2l6ZVBhZGRpbmdWZXJIb3JSZXM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBmcmFtZVNpemVWYWx1ZSA9IDA7XG4gIHB1YmxpYyBsaW5lSGVpZ2h0ID0gMDtcbiAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+ID0gdGhpcy5ob3N0UmVmO1xuICBwdWJsaWMgcGFkZGluZ1ZlckhvclJlczogR2xuRnJhbWVTaXplUGFkZGluZ1ZlckhvclJlcyB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgaXNCZWZvcmVJbml0ID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaG9zdFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0JlZm9yZUluaXQpIHtcbiAgICAgIHRoaXMuaXNCZWZvcmVJbml0ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydnbG5GcmFtZVNpemVFbGVtZW50UmVmJ10pIHtcbiAgICAgIHRoaXMuZWxlbWVudFJlZiA9IHRoaXMuZ2xuRnJhbWVTaXplRWxlbWVudFJlZiB8fCB0aGlzLmhvc3RSZWY7XG4gICAgfVxuICAgIGlmICh0aGlzLmxpbmVIZWlnaHQgPT09IDApIHtcbiAgICAgIHRoaXMubGluZUhlaWdodCA9IHRoaXMuZ2V0TGluZUhlaWdodCh0aGlzLmhvc3RSZWYpO1xuICAgIH1cbiAgICBsZXQgaXNNb2RpZnkgPSAhIWNoYW5nZXNbJ2dsbkZyYW1lU2l6ZUxhYmVsUGQnXSB8fCAhIWNoYW5nZXNbJ2dsbkZyYW1lU2l6ZU1vZGlmeSddO1xuICAgIGlmIChjaGFuZ2VzWydnbG5GcmFtZVNpemUnXSB8fCBjaGFuZ2VzWydnbG5GcmFtZVNpemVWYWx1ZSddKSB7XG4gICAgICBjb25zdCBmcmFtZVNpemVWYWx1ZU9sZCA9IHRoaXMuZnJhbWVTaXplVmFsdWU7XG4gICAgICBjb25zdCBmcmFtZVNpemUgPSBHbG5GcmFtZVNpemVVdGlsLmNvbnZlcnQodGhpcy5nbG5GcmFtZVNpemUgfHwgbnVsbCk7XG4gICAgICB0aGlzLmZyYW1lU2l6ZVZhbHVlID0gR2xuRnJhbWVTaXplVXRpbC5nZXRWYWx1ZShmcmFtZVNpemUpIHx8IHRoaXMuZ2xuRnJhbWVTaXplVmFsdWUgfHwgMDtcbiAgICAgIGNvbnN0IGlzTW9kaWZ5U2l6ZSA9IHRoaXMuZnJhbWVTaXplVmFsdWUgIT09IGZyYW1lU2l6ZVZhbHVlT2xkO1xuICAgICAgaXNNb2RpZnkgPSAhaXNNb2RpZnkgJiYgaXNNb2RpZnlTaXplID8gaXNNb2RpZnlTaXplIDogaXNNb2RpZnk7XG4gICAgfVxuICAgIGlmIChpc01vZGlmeSkge1xuICAgICAgdGhpcy51cGRhdGVQYWRkaW5nVmVyQW5kSG9yKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gKiogUHVibGljIEFQSSAqKlxuXG4gIHB1YmxpYyB1cGRhdGVQYWRkaW5nVmVyQW5kSG9yKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzQmVmb3JlSW5pdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1vZGlmeUJvcmRlclJhZGl1cygpO1xuICAgIGNvbnN0IHBhZGRpbmdIb3I6IEdsbkZyYW1lU2l6ZVBhZGRpbmdIb3JSZXMgfCBudWxsID0gdGhpcy5tb2RpZnlIb3Jpem9udGFsUGFkZGluZygpO1xuICAgIGNvbnN0IHBhZGRpbmdWZXI6IEdsbkZyYW1lU2l6ZVBhZGRpbmdWZXJSZXMgfCBudWxsID0gdGhpcy5tb2RpZnl2ZXJ0aWNhbFBhZGRpbmcoKTtcbiAgICBpZiAocGFkZGluZ0hvciAhPT0gbnVsbCAmJiBwYWRkaW5nVmVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnBhZGRpbmdWZXJIb3JSZXMgPSB7XG4gICAgICAgIC4uLnBhZGRpbmdIb3IsXG4gICAgICAgIC4uLnBhZGRpbmdWZXIsXG4gICAgICAgIC4uLntcbiAgICAgICAgICBmcmFtZVNpemVWYWx1ZTogdGhpcy5mcmFtZVNpemVWYWx1ZSxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiB0aGlzLmxpbmVIZWlnaHQsXG4gICAgICAgICAgZXh0ZXJpb3I6IHRoaXMuZ2xuRnJhbWVTaXplUHJlcGFyZT8uZ2V0RXh0ZXJpb3IoKSB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICB0aGlzLmdsbkZyYW1lU2l6ZUNoYW5nZS5lbWl0KHRoaXMucGFkZGluZ1ZlckhvclJlcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gKiogUHJpdmF0ZSBBUEkgKipcblxuICBwcml2YXRlIGdldExpbmVIZWlnaHQoZWxlbTogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pOiBudW1iZXIge1xuICAgIGxldCByZXN1bHQgPSAwO1xuICAgIGlmIChlbGVtICYmIGVsZW0ubmF0aXZlRWxlbWVudCkge1xuICAgICAgLy8gR2V0IHRoZSBsaW5lIGhlaWdodCBmcm9tIHRoZSBzdHlsZSBzZXQuXG4gICAgICBjb25zdCBsaW5lSGVpZ2h0UHggPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0ubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnbGluZS1oZWlnaHQnKTtcbiAgICAgIHJlc3VsdCA9IE51bWJlcihsaW5lSGVpZ2h0UHgucmVwbGFjZSgncHgnLCAnJykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBtb2RpZnlCb3JkZXJSYWRpdXMoKTogdm9pZCB7XG4gICAgbGV0IGJvcmRlclJhZGl1czogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKHRoaXMuZnJhbWVTaXplVmFsdWUgPiAwICYmIHRoaXMubGluZUhlaWdodCA+IDApIHtcbiAgICAgIGJvcmRlclJhZGl1cyA9IHRoaXMuZ2xuRnJhbWVTaXplUHJlcGFyZT8uZ2V0Qm9yZGVyUmFkaXVzKHRoaXMuZnJhbWVTaXplVmFsdWUsIHRoaXMubGluZUhlaWdodCkgfHwgbnVsbDtcbiAgICB9XG4gICAgSHRtbEVsZW1VdGlsLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZiwgJy0tZ2xuZnJzLWJyLXJkJywgYm9yZGVyUmFkaXVzKTtcbiAgfVxuXG4gIHByaXZhdGUgbW9kaWZ5SG9yaXpvbnRhbFBhZGRpbmcoKTogR2xuRnJhbWVTaXplUGFkZGluZ0hvclJlcyB8IG51bGwge1xuICAgIGxldCBwYWRkaW5nSG9yUmVzOiBHbG5GcmFtZVNpemVQYWRkaW5nSG9yUmVzIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKHRoaXMuZnJhbWVTaXplVmFsdWUgPiAwICYmIHRoaXMubGluZUhlaWdodCA+IDApIHtcbiAgICAgIGlmICh0aGlzLmdsbkZyYW1lU2l6ZUxhYmVsUGQpIHtcbiAgICAgICAgcGFkZGluZ0hvclJlcyA9IHsgbGVmdDogdGhpcy5nbG5GcmFtZVNpemVMYWJlbFBkLCByaWdodDogdGhpcy5nbG5GcmFtZVNpemVMYWJlbFBkIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWRkaW5nSG9yUmVzID0gdGhpcy5nbG5GcmFtZVNpemVQcmVwYXJlPy5nZXRQYWRkaW5nSG9yKHRoaXMuZnJhbWVTaXplVmFsdWUsIHRoaXMubGluZUhlaWdodCkgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbGVmdCA9IHBhZGRpbmdIb3JSZXMgJiYgcGFkZGluZ0hvclJlcy5sZWZ0ICE9PSBudWxsID8gcGFkZGluZ0hvclJlcy5sZWZ0IDogbnVsbDtcbiAgICBIdG1sRWxlbVV0aWwuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLCAnLS1nbG5mcnMtcGQtbGYnLCBOdW1iZXJVdGlsLnN0cihsZWZ0KT8uY29uY2F0KCdweCcpKTtcbiAgICBjb25zdCByaWdodCA9IHBhZGRpbmdIb3JSZXMgJiYgcGFkZGluZ0hvclJlcy5yaWdodCAhPT0gbnVsbCA/IHBhZGRpbmdIb3JSZXMucmlnaHQgOiBudWxsO1xuICAgIEh0bWxFbGVtVXRpbC5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYsICctLWdsbmZycy1wZC1yZycsIE51bWJlclV0aWwuc3RyKHJpZ2h0KT8uY29uY2F0KCdweCcpKTtcblxuICAgIHJldHVybiBwYWRkaW5nSG9yUmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBtb2RpZnl2ZXJ0aWNhbFBhZGRpbmcoKTogR2xuRnJhbWVTaXplUGFkZGluZ1ZlclJlcyB8IG51bGwge1xuICAgIGxldCBwYWRkaW5nVmVyUmVzOiBHbG5GcmFtZVNpemVQYWRkaW5nVmVyUmVzIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKHRoaXMuZnJhbWVTaXplVmFsdWUgPiAwICYmIHRoaXMubGluZUhlaWdodCA+IDApIHtcbiAgICAgIHBhZGRpbmdWZXJSZXMgPSB0aGlzLmdsbkZyYW1lU2l6ZVByZXBhcmU/LmdldFBhZGRpbmdWZXIodGhpcy5mcmFtZVNpemVWYWx1ZSwgdGhpcy5saW5lSGVpZ2h0KSB8fCBudWxsO1xuICAgICAgY29uc3QgdG9wID0gcGFkZGluZ1ZlclJlcyAmJiBwYWRkaW5nVmVyUmVzLnRvcCAhPT0gbnVsbCA/IHBhZGRpbmdWZXJSZXMudG9wIDogbnVsbDtcbiAgICAgIEh0bWxFbGVtVXRpbC5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYsICctLWdsbmZycy1wZC10cCcsIE51bWJlclV0aWwuc3RyKHRvcCk/LmNvbmNhdCgncHgnKSk7XG4gICAgICBjb25zdCBib3R0b20gPSBwYWRkaW5nVmVyUmVzICYmIHBhZGRpbmdWZXJSZXM/LmJvdHRvbSAhPT0gbnVsbCA/IHBhZGRpbmdWZXJSZXMuYm90dG9tIDogbnVsbDtcbiAgICAgIEh0bWxFbGVtVXRpbC5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYsICctLWdsbmZycy1wZC1idCcsIE51bWJlclV0aWwuc3RyKGJvdHRvbSk/LmNvbmNhdCgncHgnKSk7XG4gICAgfVxuICAgIHJldHVybiBwYWRkaW5nVmVyUmVzO1xuICB9XG59XG4iXX0=