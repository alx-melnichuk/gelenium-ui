import { Directive, HostListener, Input } from '@angular/core';
import { RegexUtil } from './regex.util';
import { GlnRegexMatchUtil } from './gln-regex-match.interface';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
/**
 * @description
 *
 * The "GlnRegexMatch" directive allows you to enter only those values that match the specified
 * regular expression. If the new value does not match the regular expression, then it is not
 * accepted.
 *
 * For example:
 * 1. <input type="text" [(ngModel)]="componentVaribale" name="name1" glnRegexMatch="^-?(\d+)$">
 *  [glnRegexMatch]="'^-?(\\d+)$'"
 *  glnRegexMatch="/^-?(\d+)$/i"
 *  [glnRegexMatch]="'/^-?(\\d+)$/i'"
 */
export class GlnRegexMatchDirective {
    constructor(control) {
        this.control = control;
        this.glnRegexMatch = null;
        this.regex = null;
        this.initialValue = null;
        if (!control) {
            throw new Error('Required parameter NgControl is missing.');
        }
    }
    ngOnChanges(changes) {
        if (changes['glnRegexMatch']) {
            const regexStr = GlnRegexMatchUtil.create(this.glnRegexMatch);
            this.regex = RegexUtil.create(regexStr);
        }
    }
    doBeforeinput() {
        if (!!this.regex && !!this.control.control) {
            this.initialValue = this.control.control.value;
        }
    }
    doInput(event) {
        if (!!this.regex && !!this.control.control) {
            // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
            // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
            if (!!event && !event.cancelBubble) {
                const newValue = this.control.control.value;
                if (!!newValue && !this.regex.test(newValue)) {
                    // (event.target as any).value = this.initialValue;
                    // this.control.control.setValue(this.initialValue, { emitEvent: false });
                    // event.stopImmediatePropagation();
                    const value = this.initialValue;
                    const inputElement = event.target;
                    const newLen = newValue.length;
                    let start = inputElement.selectionStart;
                    inputElement.value = value;
                    this.control.control.setValue(value, { emitEvent: false });
                    const len = (value || '').length;
                    if (start != null && start > 0) {
                        start -= newLen > len ? newLen - len : 0;
                        if (start > len) {
                            start = len;
                        }
                    }
                    inputElement.selectionStart = start;
                    inputElement.selectionEnd = start;
                    event.stopImmediatePropagation();
                }
            }
            this.initialValue = null;
        }
    }
}
GlnRegexMatchDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexMatchDirective, deps: [{ token: i1.NgControl }], target: i0.ɵɵFactoryTarget.Directive });
GlnRegexMatchDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnRegexMatchDirective, selector: "[glnRegexMatch]", inputs: { glnRegexMatch: "glnRegexMatch" }, host: { listeners: { "beforeinput": "doBeforeinput()", "input": "doInput($event)" } }, exportAs: ["glnRegexMatch"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexMatchDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnRegexMatch]',
                    exportAs: 'glnRegexMatch',
                }]
        }], ctorParameters: function () { return [{ type: i1.NgControl }]; }, propDecorators: { glnRegexMatch: [{
                type: Input
            }], doBeforeinput: [{
                type: HostListener,
                args: ['beforeinput']
            }], doInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLXJlZ2V4LW1hdGNoLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZGlyZWN0aXZlcy9nbG4tcmVnZXgvZ2xuLXJlZ2V4LW1hdGNoLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBR3pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7OztBQUVoRTs7Ozs7Ozs7Ozs7O0dBWUc7QUFNSCxNQUFNLE9BQU8sc0JBQXNCO0lBT2pDLFlBQW9CLE9BQWtCO1FBQWxCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFML0Isa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBRW5DLFVBQUssR0FBa0IsSUFBSSxDQUFDO1FBQzVCLGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQUd6QyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQztJQUVNLFdBQVcsQ0FBQyxPQUFzQjtRQUN2QyxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUM1QixNQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFHTSxhQUFhO1FBQ2xCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUdNLE9BQU8sQ0FBQyxLQUFpQjtRQUM5QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUMxQyxzSEFBc0g7WUFDdEgsMEhBQTBIO1lBQzFILElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ2xDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDNUMsSUFBSSxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzVDLG1EQUFtRDtvQkFDbkQsMEVBQTBFO29CQUMxRSxvQ0FBb0M7b0JBQ3BDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFzQixDQUFDO29CQUMxQyxNQUFNLFlBQVksR0FBcUIsS0FBSyxDQUFDLE1BQTBCLENBQUM7b0JBQ3hFLE1BQU0sTUFBTSxHQUFJLFFBQW1CLENBQUMsTUFBTSxDQUFDO29CQUMzQyxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDO29CQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUMzRCxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQ2pDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO3dCQUM5QixLQUFLLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLEtBQUssR0FBRyxHQUFHLEVBQUU7NEJBQ2YsS0FBSyxHQUFHLEdBQUcsQ0FBQzt5QkFDYjtxQkFDRjtvQkFDRCxZQUFZLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztvQkFDcEMsWUFBWSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQ2xDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2lCQUNsQzthQUNGO1lBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDSCxDQUFDOzttSEExRFUsc0JBQXNCO3VHQUF0QixzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFKbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsZUFBZTtpQkFDMUI7Z0dBR1EsYUFBYTtzQkFEbkIsS0FBSztnQkFvQkMsYUFBYTtzQkFEbkIsWUFBWTt1QkFBQyxhQUFhO2dCQVFwQixPQUFPO3NCQURiLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgUmVnZXhVdGlsIH0gZnJvbSAnLi9yZWdleC51dGlsJztcblxuaW1wb3J0IHsgR2xuUmVnZXhNYXRjaFV0aWwgfSBmcm9tICcuL2dsbi1yZWdleC1tYXRjaC5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBcIkdsblJlZ2V4TWF0Y2hcIiBkaXJlY3RpdmUgYWxsb3dzIHlvdSB0byBlbnRlciBvbmx5IHRob3NlIHZhbHVlcyB0aGF0IG1hdGNoIHRoZSBzcGVjaWZpZWRcbiAqIHJlZ3VsYXIgZXhwcmVzc2lvbi4gSWYgdGhlIG5ldyB2YWx1ZSBkb2VzIG5vdCBtYXRjaCB0aGUgcmVndWxhciBleHByZXNzaW9uLCB0aGVuIGl0IGlzIG5vdFxuICogYWNjZXB0ZWQuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKiAxLiA8aW5wdXQgdHlwZT1cInRleHRcIiBbKG5nTW9kZWwpXT1cImNvbXBvbmVudFZhcmliYWxlXCIgbmFtZT1cIm5hbWUxXCIgZ2xuUmVnZXhNYXRjaD1cIl4tPyhcXGQrKSRcIj5cbiAqICBbZ2xuUmVnZXhNYXRjaF09XCInXi0/KFxcXFxkKykkJ1wiXG4gKiAgZ2xuUmVnZXhNYXRjaD1cIi9eLT8oXFxkKykkL2lcIlxuICogIFtnbG5SZWdleE1hdGNoXT1cIicvXi0/KFxcXFxkKykkL2knXCJcbiAqL1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZ2xuUmVnZXhNYXRjaF0nLFxuICBleHBvcnRBczogJ2dsblJlZ2V4TWF0Y2gnLFxufSlcbmV4cG9ydCBjbGFzcyBHbG5SZWdleE1hdGNoRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgcHVibGljIGdsblJlZ2V4TWF0Y2g6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgcmVnZXg6IFJlZ0V4cCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGluaXRpYWxWYWx1ZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICBpZiAoIWNvbnRyb2wpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZWQgcGFyYW1ldGVyIE5nQ29udHJvbCBpcyBtaXNzaW5nLicpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2dsblJlZ2V4TWF0Y2gnXSkge1xuICAgICAgY29uc3QgcmVnZXhTdHIgPSBHbG5SZWdleE1hdGNoVXRpbC5jcmVhdGUodGhpcy5nbG5SZWdleE1hdGNoKTtcbiAgICAgIHRoaXMucmVnZXggPSBSZWdleFV0aWwuY3JlYXRlKHJlZ2V4U3RyKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdiZWZvcmVpbnB1dCcpXG4gIHB1YmxpYyBkb0JlZm9yZWlucHV0KCk6IHZvaWQge1xuICAgIGlmICghIXRoaXMucmVnZXggJiYgISF0aGlzLmNvbnRyb2wuY29udHJvbCkge1xuICAgICAgdGhpcy5pbml0aWFsVmFsdWUgPSB0aGlzLmNvbnRyb2wuY29udHJvbC52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBkb0lucHV0KGV2ZW50OiBJbnB1dEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCEhdGhpcy5yZWdleCAmJiAhIXRoaXMuY29udHJvbC5jb250cm9sKSB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy85NTg3IFwiZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkgY2FsbGVkIGZyb20gbGlzdGVuZXJzIG5vdCB3b3JraW5nXCJcbiAgICAgIC8vIEFkZGVkIEV2ZW50LmNhbmNlbEJ1YmJsZSBjaGVjayB0byBtYWtlIHN1cmUgdGhlcmUgd2FzIG5vIGNhbGwgdG8gZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkgaW4gcHJldmlvdXMgaGFuZGxlcnMuXG4gICAgICBpZiAoISFldmVudCAmJiAhZXZlbnQuY2FuY2VsQnViYmxlKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5jb250cm9sLmNvbnRyb2wudmFsdWU7XG4gICAgICAgIGlmICghIW5ld1ZhbHVlICYmICF0aGlzLnJlZ2V4LnRlc3QobmV3VmFsdWUpKSB7XG4gICAgICAgICAgLy8gKGV2ZW50LnRhcmdldCBhcyBhbnkpLnZhbHVlID0gdGhpcy5pbml0aWFsVmFsdWU7XG4gICAgICAgICAgLy8gdGhpcy5jb250cm9sLmNvbnRyb2wuc2V0VmFsdWUodGhpcy5pbml0aWFsVmFsdWUsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgICAvLyBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaW5pdGlhbFZhbHVlIGFzIHN0cmluZztcbiAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgICBjb25zdCBuZXdMZW4gPSAobmV3VmFsdWUgYXMgc3RyaW5nKS5sZW5ndGg7XG4gICAgICAgICAgbGV0IHN0YXJ0ID0gaW5wdXRFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIHRoaXMuY29udHJvbC5jb250cm9sLnNldFZhbHVlKHZhbHVlLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgY29uc3QgbGVuID0gKHZhbHVlIHx8ICcnKS5sZW5ndGg7XG4gICAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwgJiYgc3RhcnQgPiAwKSB7XG4gICAgICAgICAgICBzdGFydCAtPSBuZXdMZW4gPiBsZW4gPyBuZXdMZW4gLSBsZW4gOiAwO1xuICAgICAgICAgICAgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgICAgICAgICAgIHN0YXJ0ID0gbGVuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpbnB1dEVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzdGFydDtcbiAgICAgICAgICBpbnB1dEVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc3RhcnQ7XG4gICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==