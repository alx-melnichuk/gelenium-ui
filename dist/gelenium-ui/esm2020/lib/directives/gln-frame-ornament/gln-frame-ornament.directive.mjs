import { Directive, Input } from '@angular/core';
import { GlnFrameOrnamAlign, GlnFrameOrnamAlignUtil } from './gln-frame-ornam-align.interface';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import { NumberUtil } from '../../_utils/number.util';
import * as i0 from "@angular/core";
export const ATTR_ORN_LF = 'glnfr-orn-lf';
export const ATTR_ORN_RG = 'glnfr-orn-rg';
export class GlnFrameOrnamentDirective {
    constructor(hostRef, renderer) {
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.isInit = true;
        this.ornamentLf = null;
        this.ornamentRg = null;
        this.ornamentLfElemRef = null;
        this.ornamentRgElemRef = null;
        this.ornamentLfWidth = 0;
        this.ornamentRgWidth = 0;
    }
    ngOnChanges(changes) {
        if (this.isInit) {
            if (!this.glnFrameOrnamentAfterContent) {
                this.initialSetting(this.hostRef.nativeElement, this.glnFrameOrnamentPath || null);
            }
            this.isInit = false;
        }
        if (changes['glnFrameOrnamentLfAlign'] && this.ornamentLfElemRef) {
            this.settingOrnamentLeft(this.renderer, this.glnFrameOrnamentLfAlign || null, this.ornamentLfElemRef);
        }
        if (changes['glnFrameOrnamentRgAlign'] && this.ornamentRgElemRef) {
            this.settingOrnamentRight(this.renderer, this.glnFrameOrnamentRgAlign || null, this.ornamentRgElemRef);
        }
    }
    ngAfterContentInit() {
        if (this.glnFrameOrnamentAfterContent) {
            this.initialSetting(this.hostRef.nativeElement, this.glnFrameOrnamentPath || null);
            this.settingOrnamentLeft(this.renderer, this.glnFrameOrnamentLfAlign || null, this.ornamentLfElemRef);
            this.settingOrnamentRight(this.renderer, this.glnFrameOrnamentRgAlign || null, this.ornamentRgElemRef);
        }
        // Get the width of the ornament block.
        this.ornamentLfWidth = this.ornamentLf?.offsetWidth || 0;
        this.ornamentRgWidth = this.ornamentRg?.offsetWidth || 0;
        const elementRef = this.glnFrameOrnamentElementRef || this.hostRef;
        if (this.ornamentLfWidth > 0) {
            HtmlElemUtil.setProperty(elementRef, '--glnfro-pd-lf', NumberUtil.str(this.ornamentLfWidth)?.concat('px'));
        }
        if (this.ornamentRgWidth > 0) {
            HtmlElemUtil.setProperty(elementRef, '--glnfro-pd-rg', NumberUtil.str(this.ornamentRgWidth)?.concat('px'));
        }
    }
    // ** Private API **
    initialSetting(htmlElement, pathElement) {
        const element = HtmlElemUtil.getElementByPathClassOrTag(htmlElement, pathElement);
        if (element) {
            const elementRef = HtmlElemUtil.getElementRef(element);
            this.ornamentLf = HtmlElemUtil.getChildByAttribute(elementRef, [ATTR_ORN_LF]);
            this.ornamentLfElemRef = HtmlElemUtil.getElementRef(this.ornamentLf);
            this.ornamentRg = HtmlElemUtil.getChildByAttribute(elementRef, [ATTR_ORN_RG]);
            this.ornamentRgElemRef = HtmlElemUtil.getElementRef(this.ornamentRg);
        }
    }
    settingOrnamentLeft(renderer, ornamentLfAlign, leftElemRef) {
        if (leftElemRef) {
            const ornamLfAlign2 = GlnFrameOrnamAlignUtil.convert(ornamentLfAlign || null) || GlnFrameOrnamAlign.default;
            HtmlElemUtil.setAttr(renderer, leftElemRef, ATTR_ORN_LF, ornamLfAlign2.toString());
        }
    }
    settingOrnamentRight(renderer, ornamentRgAlign, rightElemRef) {
        if (rightElemRef) {
            const ornamRgAlign2 = GlnFrameOrnamAlignUtil.convert(ornamentRgAlign || null) || GlnFrameOrnamAlign.default;
            HtmlElemUtil.setAttr(renderer, rightElemRef, ATTR_ORN_RG, ornamRgAlign2.toString());
        }
    }
}
GlnFrameOrnamentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameOrnamentDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
GlnFrameOrnamentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnFrameOrnamentDirective, selector: "[glnFrameOrnament]", inputs: { glnFrameOrnamentLfAlign: "glnFrameOrnamentLfAlign", glnFrameOrnamentRgAlign: "glnFrameOrnamentRgAlign", glnFrameOrnamentElementRef: "glnFrameOrnamentElementRef", glnFrameOrnamentPath: "glnFrameOrnamentPath", glnFrameOrnamentAfterContent: "glnFrameOrnamentAfterContent" }, exportAs: ["glnFrameOrnament"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameOrnamentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnFrameOrnament]',
                    exportAs: 'glnFrameOrnament',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { glnFrameOrnamentLfAlign: [{
                type: Input
            }], glnFrameOrnamentRgAlign: [{
                type: Input
            }], glnFrameOrnamentElementRef: [{
                type: Input
            }], glnFrameOrnamentPath: [{
                type: Input
            }], glnFrameOrnamentAfterContent: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWZyYW1lLW9ybmFtZW50LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZGlyZWN0aXZlcy9nbG4tZnJhbWUtb3JuYW1lbnQvZ2xuLWZyYW1lLW9ybmFtZW50LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBYyxLQUFLLEVBQXVDLE1BQU0sZUFBZSxDQUFDO0FBRXBILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQy9GLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBRXRELE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUM7QUFDMUMsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQztBQU0xQyxNQUFNLE9BQU8seUJBQXlCO0lBdUJwQyxZQUFtQixPQUFnQyxFQUFVLFFBQW1CO1FBQTdELFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVJ4RSxXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsZUFBVSxHQUF1QixJQUFJLENBQUM7UUFDdEMsZUFBVSxHQUF1QixJQUFJLENBQUM7UUFDdEMsc0JBQWlCLEdBQW1DLElBQUksQ0FBQztRQUN6RCxzQkFBaUIsR0FBbUMsSUFBSSxDQUFDO1FBQ3pELG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO0lBRXVELENBQUM7SUFFN0UsV0FBVyxDQUFDLE9BQXNCO1FBQ3ZDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUU7Z0JBQ3RDLElB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IHsgQWZ0ZXJDb250ZW50SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgR2xuRnJhbWVPcm5hbUFsaWduLCBHbG5GcmFtZU9ybmFtQWxpZ25VdGlsIH0gZnJvbSAnLi9nbG4tZnJhbWUtb3JuYW0tYWxpZ24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEh0bWxFbGVtVXRpbCB9IGZyb20gJy4uLy4uL191dGlscy9odG1sLWVsZW0udXRpbCc7XG5pbXBvcnQgeyBOdW1iZXJVdGlsIH0gZnJvbSAnLi4vLi4vX3V0aWxzL251bWJlci51dGlsJztcblxuZXhwb3J0IGNvbnN0IEFUVFJfT1JOX0xGID0gJ2dsbmZyLW9ybi1sZic7XG5leHBvcnQgY29uc3QgQVRUUl9PUk5fUkcgPSAnZ2xuZnItb3JuLXJnJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2dsbkZyYW1lT3JuYW1lbnRdJyxcbiAgZXhwb3J0QXM6ICdnbG5GcmFtZU9ybmFtZW50Jyxcbn0pXG5leHBvcnQgY2xhc3MgR2xuRnJhbWVPcm5hbWVudERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnbG5GcmFtZU9ybmFtZW50TGZBbGlnbjogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDsgLy8gT3JuYW1BbGlnblxuICBASW5wdXQoKVxuICBwdWJsaWMgZ2xuRnJhbWVPcm5hbWVudFJnQWxpZ246IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7IC8vIE9ybmFtQWxpZ25cbiAgQElucHV0KClcbiAgcHVibGljIGdsbkZyYW1lT3JuYW1lbnRFbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpXG4gIC8qKiBQYXRoIHRvIGFuIGVsZW1lbnQgdGhhdCBoYXMgY2hpbGRyZW4gd2l0aCAnZ2xuZnItb3JuLWxmJyBhbmQgJ2dsbmZyLW9ybi1yZycgYXR0cmlidXRlcy4gKi9cbiAgLy8gRXhhbXBsZTogXCIvZGl2ezB9XCIgLSB0aGUgZmlyc3QgY2hpbGQgdGFnIGlzIFwiZGl2XCIgd2l0aCBpbmRleCAwLlxuICAvLyBFeGFtcGxlOiBcIi8uZ2xuZnItYm9yZGVyezB9XCIgLSBmaXJzdCBjaGlsZCB0YWcgd2l0aCBjbGFzcyBcImdsbmZyLWJvcmRlclwiIGFuZCBpbmRleCAwLlxuICBwdWJsaWMgZ2xuRnJhbWVPcm5hbWVudFBhdGg6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnbG5GcmFtZU9ybmFtZW50QWZ0ZXJDb250ZW50OiBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIGlzSW5pdCA9IHRydWU7XG4gIHByaXZhdGUgb3JuYW1lbnRMZjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBvcm5hbWVudFJnOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG9ybmFtZW50TGZFbGVtUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG9ybmFtZW50UmdFbGVtUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG9ybmFtZW50TGZXaWR0aCA9IDA7XG4gIHByaXZhdGUgb3JuYW1lbnRSZ1dpZHRoID0gMDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaG9zdFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5pdCkge1xuICAgICAgaWYgKCF0aGlzLmdsbkZyYW1lT3JuYW1lbnRBZnRlckNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsU2V0dGluZyh0aGlzLmhvc3RSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5nbG5GcmFtZU9ybmFtZW50UGF0aCB8fCBudWxsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNJbml0ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydnbG5GcmFtZU9ybmFtZW50TGZBbGlnbiddICYmIHRoaXMub3JuYW1lbnRMZkVsZW1SZWYpIHtcbiAgICAgIHRoaXMuc2V0dGluZ09ybmFtZW50TGVmdCh0aGlzLnJlbmRlcmVyLCB0aGlzLmdsbkZyYW1lT3JuYW1lbnRMZkFsaWduIHx8IG51bGwsIHRoaXMub3JuYW1lbnRMZkVsZW1SZWYpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZ2xuRnJhbWVPcm5hbWVudFJnQWxpZ24nXSAmJiB0aGlzLm9ybmFtZW50UmdFbGVtUmVmKSB7XG4gICAgICB0aGlzLnNldHRpbmdPcm5hbWVudFJpZ2h0KHRoaXMucmVuZGVyZXIsIHRoaXMuZ2xuRnJhbWVPcm5hbWVudFJnQWxpZ24gfHwgbnVsbCwgdGhpcy5vcm5hbWVudFJnRWxlbVJlZik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5nbG5GcmFtZU9ybmFtZW50QWZ0ZXJDb250ZW50KSB7XG4gICAgICB0aGlzLmluaXRpYWxTZXR0aW5nKHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmdsbkZyYW1lT3JuYW1lbnRQYXRoIHx8IG51bGwpO1xuXG4gICAgICB0aGlzLnNldHRpbmdPcm5hbWVudExlZnQodGhpcy5yZW5kZXJlciwgdGhpcy5nbG5GcmFtZU9ybmFtZW50TGZBbGlnbiB8fCBudWxsLCB0aGlzLm9ybmFtZW50TGZFbGVtUmVmKTtcbiAgICAgIHRoaXMuc2V0dGluZ09ybmFtZW50UmlnaHQodGhpcy5yZW5kZXJlciwgdGhpcy5nbG5GcmFtZU9ybmFtZW50UmdBbGlnbiB8fCBudWxsLCB0aGlzLm9ybmFtZW50UmdFbGVtUmVmKTtcbiAgICB9XG4gICAgLy8gR2V0IHRoZSB3aWR0aCBvZiB0aGUgb3JuYW1lbnQgYmxvY2suXG4gICAgdGhpcy5vcm5hbWVudExmV2lkdGggPSB0aGlzLm9ybmFtZW50TGY/Lm9mZnNldFdpZHRoIHx8IDA7XG4gICAgdGhpcy5vcm5hbWVudFJnV2lkdGggPSB0aGlzLm9ybmFtZW50Umc/Lm9mZnNldFdpZHRoIHx8IDA7XG5cbiAgICBjb25zdCBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB8IG51bGwgPSB0aGlzLmdsbkZyYW1lT3JuYW1lbnRFbGVtZW50UmVmIHx8IHRoaXMuaG9zdFJlZjtcbiAgICBpZiAodGhpcy5vcm5hbWVudExmV2lkdGggPiAwKSB7XG4gICAgICBIdG1sRWxlbVV0aWwuc2V0UHJvcGVydHkoZWxlbWVudFJlZiwgJy0tZ2xuZnJvLXBkLWxmJywgTnVtYmVyVXRpbC5zdHIodGhpcy5vcm5hbWVudExmV2lkdGgpPy5jb25jYXQoJ3B4JykpO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcm5hbWVudFJnV2lkdGggPiAwKSB7XG4gICAgICBIdG1sRWxlbVV0aWwuc2V0UHJvcGVydHkoZWxlbWVudFJlZiwgJy0tZ2xuZnJvLXBkLXJnJywgTnVtYmVyVXRpbC5zdHIodGhpcy5vcm5hbWVudFJnV2lkdGgpPy5jb25jYXQoJ3B4JykpO1xuICAgIH1cbiAgfVxuXG4gIC8vICoqIFByaXZhdGUgQVBJICoqXG5cbiAgcHJpdmF0ZSBpbml0aWFsU2V0dGluZyhodG1sRWxlbWVudDogSFRNTEVsZW1lbnQsIHBhdGhFbGVtZW50OiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudCA9IEh0bWxFbGVtVXRpbC5nZXRFbGVtZW50QnlQYXRoQ2xhc3NPclRhZyhodG1sRWxlbWVudCwgcGF0aEVsZW1lbnQpO1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBjb25zdCBlbGVtZW50UmVmID0gSHRtbEVsZW1VdGlsLmdldEVsZW1lbnRSZWYoZWxlbWVudCk7XG5cbiAgICAgIHRoaXMub3JuYW1lbnRMZiA9IEh0bWxFbGVtVXRpbC5nZXRDaGlsZEJ5QXR0cmlidXRlKGVsZW1lbnRSZWYsIFtBVFRSX09STl9MRl0pIGFzIEhUTUxFbGVtZW50O1xuICAgICAgdGhpcy5vcm5hbWVudExmRWxlbVJlZiA9IEh0bWxFbGVtVXRpbC5nZXRFbGVtZW50UmVmKHRoaXMub3JuYW1lbnRMZik7XG5cbiAgICAgIHRoaXMub3JuYW1lbnRSZyA9IEh0bWxFbGVtVXRpbC5nZXRDaGlsZEJ5QXR0cmlidXRlKGVsZW1lbnRSZWYsIFtBVFRSX09STl9SR10pIGFzIEhUTUxFbGVtZW50O1xuICAgICAgdGhpcy5vcm5hbWVudFJnRWxlbVJlZiA9IEh0bWxFbGVtVXRpbC5nZXRFbGVtZW50UmVmKHRoaXMub3JuYW1lbnRSZyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXR0aW5nT3JuYW1lbnRMZWZ0KHJlbmRlcmVyOiBSZW5kZXJlcjIsIG9ybmFtZW50TGZBbGlnbjogc3RyaW5nIHwgbnVsbCwgbGVmdEVsZW1SZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+IHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChsZWZ0RWxlbVJlZikge1xuICAgICAgY29uc3Qgb3JuYW1MZkFsaWduMiA9IEdsbkZyYW1lT3JuYW1BbGlnblV0aWwuY29udmVydChvcm5hbWVudExmQWxpZ24gfHwgbnVsbCkgfHwgR2xuRnJhbWVPcm5hbUFsaWduLmRlZmF1bHQ7XG4gICAgICBIdG1sRWxlbVV0aWwuc2V0QXR0cihyZW5kZXJlciwgbGVmdEVsZW1SZWYsIEFUVFJfT1JOX0xGLCBvcm5hbUxmQWxpZ24yLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0dGluZ09ybmFtZW50UmlnaHQocmVuZGVyZXI6IFJlbmRlcmVyMiwgb3JuYW1lbnRSZ0FsaWduOiBzdHJpbmcgfCBudWxsLCByaWdodEVsZW1SZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+IHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChyaWdodEVsZW1SZWYpIHtcbiAgICAgIGNvbnN0IG9ybmFtUmdBbGlnbjIgPSBHbG5GcmFtZU9ybmFtQWxpZ25VdGlsLmNvbnZlcnQob3JuYW1lbnRSZ0FsaWduIHx8IG51bGwpIHx8IEdsbkZyYW1lT3JuYW1BbGlnbi5kZWZhdWx0O1xuICAgICAgSHRtbEVsZW1VdGlsLnNldEF0dHIocmVuZGVyZXIsIHJpZ2h0RWxlbVJlZiwgQVRUUl9PUk5fUkcsIG9ybmFtUmdBbGlnbjIudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG59XG4iXX0=