import { Directive, HostListener, Input } from '@angular/core';
import { RegexUtil } from './regex.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
/**
 * @description
 *
 * The GlnRegexremove directive, when changed, removes those values that match the specified
 * regular expression.
 * The regular expression must contain those characters that should not be present in the resulting
 * string.
 * In other words, if for a character the regex check returned true, then this character is not
 * included in the resulting string.
 * This allows the required business logic to be implemented without displaying an error.
 *
 * For example:
 * For the expression "/[^\d]/gm", all non-numeric values will be removed.
 * 1. <input type="text" [(ngModel)]="componentVaribale" name="name1" glnRegexRemove="/[^\d]/gm">
 *
 * For the expression "/[^A-Za-z]/gm", all non-alphabetic values will be removed.
 * 2. <input type="text" formControlName="name2" glnRegexRemove="/[^A-Za-z]/gm">
 *
 * For the expression "/[^\dA-Za-z]/gm", all non-numeric and non-alphabetic values will be removed.
 * 3. <input type="text" formControlName="name2" glnRegexRemove="/[^\dA-Za-z]/gm">
 */
export class GlnRegexRemoveDirective {
    constructor(control) {
        this.control = control;
        this.glnRegexRemove = null;
        this.regex = null;
        if (!control) {
            throw new Error('Required parameter NgControl is missing.');
        }
    }
    ngOnChanges(changes) {
        if (changes['glnRegexRemove']) {
            this.regex = RegexUtil.create(this.glnRegexRemove);
        }
    }
    doInput(event) {
        // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
        // Added Event.cancelBubble check to make sure there was  no  call to event.stopImmediatePropagation() in previous handlers.
        if (!!event && !event.cancelBubble && !!this.regex && !!this.control.control) {
            const newValue = this.control.control.value;
            const value = newValue ? newValue.replace(this.regex, '') : '';
            if (!!newValue && newValue !== value) {
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
    }
}
GlnRegexRemoveDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexRemoveDirective, deps: [{ token: i1.NgControl }], target: i0.ɵɵFactoryTarget.Directive });
GlnRegexRemoveDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnRegexRemoveDirective, selector: "[glnRegexRemove]", inputs: { glnRegexRemove: "glnRegexRemove" }, host: { listeners: { "input": "doInput($event)" } }, exportAs: ["glnRegexRemove"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexRemoveDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnRegexRemove]',
                    exportAs: 'glnRegexRemove',
                }]
        }], ctorParameters: function () { return [{ type: i1.NgControl }]; }, propDecorators: { glnRegexRemove: [{
                type: Input
            }], doInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLXJlZ2V4LXJlbW92ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL2RpcmVjdGl2ZXMvZ2xuLXJlZ2V4L2dsbi1yZWdleC1yZW1vdmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFHekYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O0FBRXpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQU1ILE1BQU0sT0FBTyx1QkFBdUI7SUFNbEMsWUFBb0IsT0FBa0I7UUFBbEIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUovQixtQkFBYyxHQUFrQixJQUFJLENBQUM7UUFFcEMsVUFBSyxHQUFrQixJQUFJLENBQUM7UUFHbEMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7SUFFTSxXQUFXLENBQUMsT0FBc0I7UUFDdkMsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUdNLE9BQU8sQ0FBQyxLQUFZO1FBQ3pCLHNIQUFzSDtRQUN0SCw0SEFBNEg7UUFDNUgsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDNUUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzVDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDL0QsSUFBSSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7Z0JBQ3BDLE1BQU0sWUFBWSxHQUFxQixLQUFLLENBQUMsTUFBMEIsQ0FBQztnQkFDeEUsTUFBTSxNQUFNLEdBQUksUUFBbUIsQ0FBQyxNQUFNLENBQUM7Z0JBQzNDLElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUM7Z0JBQ3hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQzNELE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDakMsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7b0JBQzlCLEtBQUssSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLElBQUksS0FBSyxHQUFHLEdBQUcsRUFBRTt3QkFDZixLQUFLLEdBQUcsR0FBRyxDQUFDO3FCQUNiO2lCQUNGO2dCQUNELFlBQVksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUNwQyxZQUFZLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDbEMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLENBQUM7YUFDbEM7U0FDRjtJQUNILENBQUM7O29IQTNDVSx1QkFBdUI7d0dBQXZCLHVCQUF1QjsyRkFBdkIsdUJBQXVCO2tCQUpuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCO2dHQUdRLGNBQWM7c0JBRHBCLEtBQUs7Z0JBa0JDLE9BQU87c0JBRGIsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBSZWdleFV0aWwgfSBmcm9tICcuL3JlZ2V4LnV0aWwnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBHbG5SZWdleHJlbW92ZSBkaXJlY3RpdmUsIHdoZW4gY2hhbmdlZCwgcmVtb3ZlcyB0aG9zZSB2YWx1ZXMgdGhhdCBtYXRjaCB0aGUgc3BlY2lmaWVkXG4gKiByZWd1bGFyIGV4cHJlc3Npb24uXG4gKiBUaGUgcmVndWxhciBleHByZXNzaW9uIG11c3QgY29udGFpbiB0aG9zZSBjaGFyYWN0ZXJzIHRoYXQgc2hvdWxkIG5vdCBiZSBwcmVzZW50IGluIHRoZSByZXN1bHRpbmdcbiAqIHN0cmluZy5cbiAqIEluIG90aGVyIHdvcmRzLCBpZiBmb3IgYSBjaGFyYWN0ZXIgdGhlIHJlZ2V4IGNoZWNrIHJldHVybmVkIHRydWUsIHRoZW4gdGhpcyBjaGFyYWN0ZXIgaXMgbm90XG4gKiBpbmNsdWRlZCBpbiB0aGUgcmVzdWx0aW5nIHN0cmluZy5cbiAqIFRoaXMgYWxsb3dzIHRoZSByZXF1aXJlZCBidXNpbmVzcyBsb2dpYyB0byBiZSBpbXBsZW1lbnRlZCB3aXRob3V0IGRpc3BsYXlpbmcgYW4gZXJyb3IuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKiBGb3IgdGhlIGV4cHJlc3Npb24gXCIvW15cXGRdL2dtXCIsIGFsbCBub24tbnVtZXJpYyB2YWx1ZXMgd2lsbCBiZSByZW1vdmVkLlxuICogMS4gPGlucHV0IHR5cGU9XCJ0ZXh0XCIgWyhuZ01vZGVsKV09XCJjb21wb25lbnRWYXJpYmFsZVwiIG5hbWU9XCJuYW1lMVwiIGdsblJlZ2V4UmVtb3ZlPVwiL1teXFxkXS9nbVwiPlxuICpcbiAqIEZvciB0aGUgZXhwcmVzc2lvbiBcIi9bXkEtWmEtel0vZ21cIiwgYWxsIG5vbi1hbHBoYWJldGljIHZhbHVlcyB3aWxsIGJlIHJlbW92ZWQuXG4gKiAyLiA8aW5wdXQgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJuYW1lMlwiIGdsblJlZ2V4UmVtb3ZlPVwiL1teQS1aYS16XS9nbVwiPlxuICpcbiAqIEZvciB0aGUgZXhwcmVzc2lvbiBcIi9bXlxcZEEtWmEtel0vZ21cIiwgYWxsIG5vbi1udW1lcmljIGFuZCBub24tYWxwaGFiZXRpYyB2YWx1ZXMgd2lsbCBiZSByZW1vdmVkLlxuICogMy4gPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwibmFtZTJcIiBnbG5SZWdleFJlbW92ZT1cIi9bXlxcZEEtWmEtel0vZ21cIj5cbiAqL1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZ2xuUmVnZXhSZW1vdmVdJyxcbiAgZXhwb3J0QXM6ICdnbG5SZWdleFJlbW92ZScsXG59KVxuZXhwb3J0IGNsYXNzIEdsblJlZ2V4UmVtb3ZlRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgcHVibGljIGdsblJlZ2V4UmVtb3ZlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIHJlZ2V4OiBSZWdFeHAgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIGlmICghY29udHJvbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlZCBwYXJhbWV0ZXIgTmdDb250cm9sIGlzIG1pc3NpbmcuJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snZ2xuUmVnZXhSZW1vdmUnXSkge1xuICAgICAgdGhpcy5yZWdleCA9IFJlZ2V4VXRpbC5jcmVhdGUodGhpcy5nbG5SZWdleFJlbW92ZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICBwdWJsaWMgZG9JbnB1dChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy85NTg3IFwiZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkgY2FsbGVkIGZyb20gbGlzdGVuZXJzIG5vdCB3b3JraW5nXCJcbiAgICAvLyBBZGRlZCBFdmVudC5jYW5jZWxCdWJibGUgY2hlY2sgdG8gbWFrZSBzdXJlIHRoZXJlIHdhcyAgbm8gIGNhbGwgdG8gZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkgaW4gcHJldmlvdXMgaGFuZGxlcnMuXG4gICAgaWYgKCEhZXZlbnQgJiYgIWV2ZW50LmNhbmNlbEJ1YmJsZSAmJiAhIXRoaXMucmVnZXggJiYgISF0aGlzLmNvbnRyb2wuY29udHJvbCkge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmNvbnRyb2wuY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IHZhbHVlID0gbmV3VmFsdWUgPyBuZXdWYWx1ZS5yZXBsYWNlKHRoaXMucmVnZXgsICcnKSA6ICcnO1xuICAgICAgaWYgKCEhbmV3VmFsdWUgJiYgbmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBjb25zdCBuZXdMZW4gPSAobmV3VmFsdWUgYXMgc3RyaW5nKS5sZW5ndGg7XG4gICAgICAgIGxldCBzdGFydCA9IGlucHV0RWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY29udHJvbC5jb250cm9sLnNldFZhbHVlKHZhbHVlLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgIGNvbnN0IGxlbiA9ICh2YWx1ZSB8fCAnJykubGVuZ3RoO1xuICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCAmJiBzdGFydCA+IDApIHtcbiAgICAgICAgICBzdGFydCAtPSBuZXdMZW4gPiBsZW4gPyBuZXdMZW4gLSBsZW4gOiAwO1xuICAgICAgICAgIGlmIChzdGFydCA+IGxlbikge1xuICAgICAgICAgICAgc3RhcnQgPSBsZW47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlucHV0RWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0O1xuICAgICAgICBpbnB1dEVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc3RhcnQ7XG4gICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19