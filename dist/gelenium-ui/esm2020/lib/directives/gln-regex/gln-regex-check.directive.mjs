import { Directive, Inject, Input, Optional } from '@angular/core';
import { GLN_NODE_INTERNAL_VALIDATOR } from './gln-node-internal-validator.interface';
import { GlnRegexCheckUtil } from './gln-regex-check.interface';
import { RegexUtil } from './regex.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export function regexCheckValidator(regExpVal, name) {
    return (control) => {
        const result = !control || !control.value || regExpVal.test(control.value);
        return result ? null : { [name]: { value: control.value } };
    };
}
export class GlnRegexCheckDirective {
    constructor(control, nodeInternalValidator) {
        this.control = control;
        this.nodeInternalValidator = nodeInternalValidator;
        this.glnRegexCheck = null;
    }
    ngOnChanges(changes) {
        if (changes['glnRegexCheck'] && this.control && this.control.control) {
            const regexCheck = GlnRegexCheckUtil.create(this.glnRegexCheck) || {};
            const list = Object.keys(regexCheck);
            for (const name of list) {
                const regex = RegexUtil.create(regexCheck[name]);
                if (!regex)
                    continue;
                const validatorFn = regexCheckValidator(regex, name);
                this.control.control.addValidators(validatorFn);
                if (this.nodeInternalValidator != null) {
                    this.nodeInternalValidator.addValidators(validatorFn);
                }
                this.control.control.updateValueAndValidity();
            }
        }
    }
}
GlnRegexCheckDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexCheckDirective, deps: [{ token: i1.NgControl }, { token: GLN_NODE_INTERNAL_VALIDATOR, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
GlnRegexCheckDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnRegexCheckDirective, selector: "[glnRegexCheck]", inputs: { glnRegexCheck: "glnRegexCheck" }, exportAs: ["glnRegexCheck"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexCheckDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnRegexCheck]',
                    exportAs: 'glnRegexCheck',
                }]
        }], ctorParameters: function () { return [{ type: i1.NgControl }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GLN_NODE_INTERNAL_VALIDATOR]
                }] }]; }, propDecorators: { glnRegexCheck: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLXJlZ2V4LWNoZWNrLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZGlyZWN0aXZlcy9nbG4tcmVnZXgvZ2xuLXJlZ2V4LWNoZWNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUc3RixPQUFPLEVBQUUsMkJBQTJCLEVBQTRCLE1BQU0seUNBQXlDLENBQUM7QUFDaEgsT0FBTyxFQUFpQixpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUV6QyxNQUFNLFVBQVUsbUJBQW1CLENBQUMsU0FBaUIsRUFBRSxJQUFZO0lBQ2pFLE9BQU8sQ0FBQyxPQUF3QixFQUEyQixFQUFFO1FBQzNELE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7SUFDOUQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQU1ELE1BQU0sT0FBTyxzQkFBc0I7SUFJakMsWUFDVSxPQUFrQixFQUMrQixxQkFBc0Q7UUFEdkcsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUMrQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQWlDO1FBSjFHLGtCQUFhLEdBQWtDLElBQUksQ0FBQztJQUt4RCxDQUFDO0lBRUcsV0FBVyxDQUFDLE9BQXNCO1FBQ3ZDLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDcEUsTUFBTSxVQUFVLEdBQWtCLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JGLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckMsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxLQUFLO29CQUFFLFNBQVM7Z0JBQ3JCLE1BQU0sV0FBVyxHQUFnQixtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxJQUFJLENBQUMscUJBQXFCLElBQUksSUFBSSxFQUFFO29CQUN0QyxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUN2RDtnQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2FBQy9DO1NBQ0Y7SUFDSCxDQUFDOzttSEF4QlUsc0JBQXNCLDJDQU1YLDJCQUEyQjt1R0FOdEMsc0JBQXNCOzJGQUF0QixzQkFBc0I7a0JBSmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzswQkFPSSxRQUFROzswQkFBSSxNQUFNOzJCQUFDLDJCQUEyQjs0Q0FKMUMsYUFBYTtzQkFEbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPcHRpb25hbCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBOZ0NvbnRyb2wsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBHTE5fTk9ERV9JTlRFUk5BTF9WQUxJREFUT1IsIEdsbk5vZGVJbnRlcm5hbFZhbGlkYXRvciB9IGZyb20gJy4vZ2xuLW5vZGUtaW50ZXJuYWwtdmFsaWRhdG9yLmludGVyZmFjZSc7XG5pbXBvcnQgeyBHbG5SZWdleENoZWNrLCBHbG5SZWdleENoZWNrVXRpbCB9IGZyb20gJy4vZ2xuLXJlZ2V4LWNoZWNrLmludGVyZmFjZSc7XG5pbXBvcnQgeyBSZWdleFV0aWwgfSBmcm9tICcuL3JlZ2V4LnV0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnZXhDaGVja1ZhbGlkYXRvcihyZWdFeHBWYWw6IFJlZ0V4cCwgbmFtZTogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xuICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSAhY29udHJvbCB8fCAhY29udHJvbC52YWx1ZSB8fCByZWdFeHBWYWwudGVzdChjb250cm9sLnZhbHVlKTtcbiAgICByZXR1cm4gcmVzdWx0ID8gbnVsbCA6IHsgW25hbWVdOiB7IHZhbHVlOiBjb250cm9sLnZhbHVlIH0gfTtcbiAgfTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2dsblJlZ2V4Q2hlY2tdJyxcbiAgZXhwb3J0QXM6ICdnbG5SZWdleENoZWNrJyxcbn0pXG5leHBvcnQgY2xhc3MgR2xuUmVnZXhDaGVja0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnbG5SZWdleENoZWNrOiBzdHJpbmcgfCBHbG5SZWdleENoZWNrIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChHTE5fTk9ERV9JTlRFUk5BTF9WQUxJREFUT1IpIHByaXZhdGUgbm9kZUludGVybmFsVmFsaWRhdG9yOiBHbG5Ob2RlSW50ZXJuYWxWYWxpZGF0b3IgfCBudWxsXG4gICkge31cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydnbG5SZWdleENoZWNrJ10gJiYgdGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC5jb250cm9sKSB7XG4gICAgICBjb25zdCByZWdleENoZWNrOiBHbG5SZWdleENoZWNrID0gR2xuUmVnZXhDaGVja1V0aWwuY3JlYXRlKHRoaXMuZ2xuUmVnZXhDaGVjaykgfHwge307XG4gICAgICBjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMocmVnZXhDaGVjayk7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbGlzdCkge1xuICAgICAgICBjb25zdCByZWdleCA9IFJlZ2V4VXRpbC5jcmVhdGUocmVnZXhDaGVja1tuYW1lXSk7XG4gICAgICAgIGlmICghcmVnZXgpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JGbjogVmFsaWRhdG9yRm4gPSByZWdleENoZWNrVmFsaWRhdG9yKHJlZ2V4LCBuYW1lKTtcbiAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2wuYWRkVmFsaWRhdG9ycyh2YWxpZGF0b3JGbik7XG4gICAgICAgIGlmICh0aGlzLm5vZGVJbnRlcm5hbFZhbGlkYXRvciAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5ub2RlSW50ZXJuYWxWYWxpZGF0b3IuYWRkVmFsaWRhdG9ycyh2YWxpZGF0b3JGbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19