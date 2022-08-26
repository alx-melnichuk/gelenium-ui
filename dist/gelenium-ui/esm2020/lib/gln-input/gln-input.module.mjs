import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.
import { GlnColorModule } from '../directives/gln-color/gln-color.module';
import { GlnFrameExteriorInputModule } from '../directives/gln-frame-exterior-input/gln-frame-exterior-input.module';
import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnFrameOrnamentModule } from '../directives/gln-frame-ornament/gln-frame-ornament.module';
import { GlnFrameSizeModule } from '../directives/gln-frame-size/gln-frame-size.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';
import { GlnInputComponent } from './gln-input.component';
import * as i0 from "@angular/core";
export class GlnInputModule {
}
GlnInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnInputModule, declarations: [GlnInputComponent], imports: [CommonModule,
        ReactiveFormsModule,
        GlnColorModule,
        GlnFrameExteriorInputModule,
        GlnFrameModule,
        GlnFrameOrnamentModule,
        GlnFrameSizeModule,
        GlnHintOrErrorModule], exports: [GlnInputComponent] });
GlnInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInputModule, imports: [CommonModule,
        ReactiveFormsModule,
        GlnColorModule,
        GlnFrameExteriorInputModule,
        GlnFrameModule,
        GlnFrameOrnamentModule,
        GlnFrameSizeModule,
        GlnHintOrErrorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInputModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnInputComponent],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        GlnColorModule,
                        GlnFrameExteriorInputModule,
                        GlnFrameModule,
                        GlnFrameOrnamentModule,
                        GlnFrameSizeModule,
                        GlnHintOrErrorModule,
                    ],
                    exports: [GlnInputComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWlucHV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZ2xuLWlucHV0L2dsbi1pbnB1dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUMsQ0FBQywrQ0FBK0M7QUFFckcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBQ3JILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUVyRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFnQjFELE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBYlYsaUJBQWlCLGFBRTlCLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsY0FBYztRQUNkLDJCQUEyQjtRQUMzQixjQUFjO1FBQ2Qsc0JBQXNCO1FBQ3RCLGtCQUFrQjtRQUNsQixvQkFBb0IsYUFFWixpQkFBaUI7NEdBRWhCLGNBQWMsWUFYdkIsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixjQUFjO1FBQ2QsMkJBQTJCO1FBQzNCLGNBQWM7UUFDZCxzQkFBc0I7UUFDdEIsa0JBQWtCO1FBQ2xCLG9CQUFvQjsyRkFJWCxjQUFjO2tCQWQxQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixDQUFDO29CQUNqQyxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2QsMkJBQTJCO3dCQUMzQixjQUFjO3dCQUNkLHNCQUFzQjt3QkFDdEIsa0JBQWtCO3dCQUNsQixvQkFBb0I7cUJBQ3JCO29CQUNELE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO2lCQUM3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJzsgLy8gUmVxdWlyZWQgZm9yIHRoZSBcImZvcm1Hcm91cFwiIGZvcm0gYXR0cmlidXRlLlxuXG5pbXBvcnQgeyBHbG5Db2xvck1vZHVsZSB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvZ2xuLWNvbG9yL2dsbi1jb2xvci5tb2R1bGUnO1xuaW1wb3J0IHsgR2xuRnJhbWVFeHRlcmlvcklucHV0TW9kdWxlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9nbG4tZnJhbWUtZXh0ZXJpb3ItaW5wdXQvZ2xuLWZyYW1lLWV4dGVyaW9yLWlucHV0Lm1vZHVsZSc7XG5pbXBvcnQgeyBHbG5GcmFtZU1vZHVsZSB9IGZyb20gJy4uL2dsbi1mcmFtZS9nbG4tZnJhbWUubW9kdWxlJztcbmltcG9ydCB7IEdsbkZyYW1lT3JuYW1lbnRNb2R1bGUgfSBmcm9tICcuLi9kaXJlY3RpdmVzL2dsbi1mcmFtZS1vcm5hbWVudC9nbG4tZnJhbWUtb3JuYW1lbnQubW9kdWxlJztcbmltcG9ydCB7IEdsbkZyYW1lU2l6ZU1vZHVsZSB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvZ2xuLWZyYW1lLXNpemUvZ2xuLWZyYW1lLXNpemUubW9kdWxlJztcbmltcG9ydCB7IEdsbkhpbnRPckVycm9yTW9kdWxlIH0gZnJvbSAnLi4vZ2xuLWhpbnQtb3ItZXJyb3IvZ2xuLWhpbnQtb3ItZXJyb3IubW9kdWxlJztcblxuaW1wb3J0IHsgR2xuSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2dsbi1pbnB1dC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtHbG5JbnB1dENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBHbG5Db2xvck1vZHVsZSxcbiAgICBHbG5GcmFtZUV4dGVyaW9ySW5wdXRNb2R1bGUsXG4gICAgR2xuRnJhbWVNb2R1bGUsXG4gICAgR2xuRnJhbWVPcm5hbWVudE1vZHVsZSxcbiAgICBHbG5GcmFtZVNpemVNb2R1bGUsXG4gICAgR2xuSGludE9yRXJyb3JNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtHbG5JbnB1dENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIEdsbklucHV0TW9kdWxlIHt9XG4iXX0=