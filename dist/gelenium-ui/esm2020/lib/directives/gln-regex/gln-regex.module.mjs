import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlnRegexCheckDirective } from './gln-regex-check.directive';
import { GlnRegexMatchDirective } from './gln-regex-match.directive';
import { GlnRegexRemoveDirective } from './gln-regex-remove.directive';
import * as i0 from "@angular/core";
export class GlnRegexModule {
}
GlnRegexModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnRegexModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexModule, declarations: [GlnRegexCheckDirective, GlnRegexMatchDirective, GlnRegexRemoveDirective], imports: [CommonModule], exports: [GlnRegexCheckDirective, GlnRegexMatchDirective, GlnRegexRemoveDirective] });
GlnRegexModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnRegexCheckDirective, GlnRegexMatchDirective, GlnRegexRemoveDirective],
                    imports: [CommonModule],
                    exports: [GlnRegexCheckDirective, GlnRegexMatchDirective, GlnRegexRemoveDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLXJlZ2V4Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZGlyZWN0aXZlcy9nbG4tcmVnZXgvZ2xuLXJlZ2V4Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFPdkUsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxpQkFKVixzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSx1QkFBdUIsYUFDNUUsWUFBWSxhQUNaLHNCQUFzQixFQUFFLHNCQUFzQixFQUFFLHVCQUF1Qjs0R0FFdEUsY0FBYyxZQUhmLFlBQVk7MkZBR1gsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSx1QkFBdUIsQ0FBQztvQkFDdkYsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSx1QkFBdUIsQ0FBQztpQkFDbkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgR2xuUmVnZXhDaGVja0RpcmVjdGl2ZSB9IGZyb20gJy4vZ2xuLXJlZ2V4LWNoZWNrLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHbG5SZWdleE1hdGNoRGlyZWN0aXZlIH0gZnJvbSAnLi9nbG4tcmVnZXgtbWF0Y2guZGlyZWN0aXZlJztcbmltcG9ydCB7IEdsblJlZ2V4UmVtb3ZlRGlyZWN0aXZlIH0gZnJvbSAnLi9nbG4tcmVnZXgtcmVtb3ZlLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0dsblJlZ2V4Q2hlY2tEaXJlY3RpdmUsIEdsblJlZ2V4TWF0Y2hEaXJlY3RpdmUsIEdsblJlZ2V4UmVtb3ZlRGlyZWN0aXZlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtHbG5SZWdleENoZWNrRGlyZWN0aXZlLCBHbG5SZWdleE1hdGNoRGlyZWN0aXZlLCBHbG5SZWdleFJlbW92ZURpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIEdsblJlZ2V4TW9kdWxlIHt9XG4iXX0=