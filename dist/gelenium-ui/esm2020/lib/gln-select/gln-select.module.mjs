import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.
import { GlnColorModule } from '../directives/gln-color/gln-color.module';
import { GlnFrameExteriorInputModule } from '../directives/gln-frame-exterior-input/gln-frame-exterior-input.module';
import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnFrameOrnamentModule } from '../directives/gln-frame-ornament/gln-frame-ornament.module';
import { GlnFrameSizeModule } from '../directives/gln-frame-size/gln-frame-size.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';
import { GlnOptionModule } from '../gln-option/gln-option.module';
import { GlnSelectComponent } from './gln-select.component';
import { GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION } from './gln-select.providers';
import { GlnSelectTriggerDirective } from './gln-select-trigger.directive';
import * as i0 from "@angular/core";
export class GlnSelectModule {
}
GlnSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectModule, declarations: [GlnSelectComponent, GlnSelectTriggerDirective], imports: [CommonModule,
        OverlayModule,
        ReactiveFormsModule,
        GlnColorModule,
        GlnFrameExteriorInputModule,
        GlnFrameModule,
        GlnFrameOrnamentModule,
        GlnFrameSizeModule,
        GlnHintOrErrorModule,
        GlnOptionModule], exports: [GlnSelectComponent, GlnSelectTriggerDirective] });
GlnSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectModule, providers: [GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION], imports: [CommonModule,
        OverlayModule,
        ReactiveFormsModule,
        GlnColorModule,
        GlnFrameExteriorInputModule,
        GlnFrameModule,
        GlnFrameOrnamentModule,
        GlnFrameSizeModule,
        GlnHintOrErrorModule,
        GlnOptionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnSelectComponent, GlnSelectTriggerDirective],
                    imports: [
                        CommonModule,
                        OverlayModule,
                        ReactiveFormsModule,
                        GlnColorModule,
                        GlnFrameExteriorInputModule,
                        GlnFrameModule,
                        GlnFrameOrnamentModule,
                        GlnFrameSizeModule,
                        GlnHintOrErrorModule,
                        GlnOptionModule,
                    ],
                    exports: [GlnSelectComponent, GlnSelectTriggerDirective],
                    providers: [GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLXNlbGVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL2dsbi1zZWxlY3QvZ2xuLXNlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDLENBQUMsK0NBQStDO0FBRXJHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx3RUFBd0UsQ0FBQztBQUNySCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDcEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDeEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDckYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWxFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSw4Q0FBOEMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztBQW1CM0UsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFoQlgsa0JBQWtCLEVBQUUseUJBQXlCLGFBRTFELFlBQVk7UUFDWixhQUFhO1FBQ2IsbUJBQW1CO1FBQ25CLGNBQWM7UUFDZCwyQkFBMkI7UUFDM0IsY0FBYztRQUNkLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIsb0JBQW9CO1FBQ3BCLGVBQWUsYUFFUCxrQkFBa0IsRUFBRSx5QkFBeUI7NkdBRzVDLGVBQWUsYUFGZixDQUFDLDhDQUE4QyxDQUFDLFlBWnpELFlBQVk7UUFDWixhQUFhO1FBQ2IsbUJBQW1CO1FBQ25CLGNBQWM7UUFDZCwyQkFBMkI7UUFDM0IsY0FBYztRQUNkLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIsb0JBQW9CO1FBQ3BCLGVBQWU7MkZBS04sZUFBZTtrQkFqQjNCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsa0JBQWtCLEVBQUUseUJBQXlCLENBQUM7b0JBQzdELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLDJCQUEyQjt3QkFDM0IsY0FBYzt3QkFDZCxzQkFBc0I7d0JBQ3RCLGtCQUFrQjt3QkFDbEIsb0JBQW9CO3dCQUNwQixlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSx5QkFBeUIsQ0FBQztvQkFDeEQsU0FBUyxFQUFFLENBQUMsOENBQThDLENBQUM7aUJBQzVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJzsgLy8gUmVxdWlyZWQgZm9yIHRoZSBcImZvcm1Hcm91cFwiIGZvcm0gYXR0cmlidXRlLlxuXG5pbXBvcnQgeyBHbG5Db2xvck1vZHVsZSB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvZ2xuLWNvbG9yL2dsbi1jb2xvci5tb2R1bGUnO1xuaW1wb3J0IHsgR2xuRnJhbWVFeHRlcmlvcklucHV0TW9kdWxlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9nbG4tZnJhbWUtZXh0ZXJpb3ItaW5wdXQvZ2xuLWZyYW1lLWV4dGVyaW9yLWlucHV0Lm1vZHVsZSc7XG5pbXBvcnQgeyBHbG5GcmFtZU1vZHVsZSB9IGZyb20gJy4uL2dsbi1mcmFtZS9nbG4tZnJhbWUubW9kdWxlJztcbmltcG9ydCB7IEdsbkZyYW1lT3JuYW1lbnRNb2R1bGUgfSBmcm9tICcuLi9kaXJlY3RpdmVzL2dsbi1mcmFtZS1vcm5hbWVudC9nbG4tZnJhbWUtb3JuYW1lbnQubW9kdWxlJztcbmltcG9ydCB7IEdsbkZyYW1lU2l6ZU1vZHVsZSB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvZ2xuLWZyYW1lLXNpemUvZ2xuLWZyYW1lLXNpemUubW9kdWxlJztcbmltcG9ydCB7IEdsbkhpbnRPckVycm9yTW9kdWxlIH0gZnJvbSAnLi4vZ2xuLWhpbnQtb3ItZXJyb3IvZ2xuLWhpbnQtb3ItZXJyb3IubW9kdWxlJztcbmltcG9ydCB7IEdsbk9wdGlvbk1vZHVsZSB9IGZyb20gJy4uL2dsbi1vcHRpb24vZ2xuLW9wdGlvbi5tb2R1bGUnO1xuXG5pbXBvcnQgeyBHbG5TZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL2dsbi1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IEdMTl9TRUxFQ1RfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX1JFUE9TSVRJT04gfSBmcm9tICcuL2dsbi1zZWxlY3QucHJvdmlkZXJzJztcbmltcG9ydCB7IEdsblNlbGVjdFRyaWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL2dsbi1zZWxlY3QtdHJpZ2dlci5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtHbG5TZWxlY3RDb21wb25lbnQsIEdsblNlbGVjdFRyaWdnZXJEaXJlY3RpdmVdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBHbG5Db2xvck1vZHVsZSxcbiAgICBHbG5GcmFtZUV4dGVyaW9ySW5wdXRNb2R1bGUsXG4gICAgR2xuRnJhbWVNb2R1bGUsXG4gICAgR2xuRnJhbWVPcm5hbWVudE1vZHVsZSxcbiAgICBHbG5GcmFtZVNpemVNb2R1bGUsXG4gICAgR2xuSGludE9yRXJyb3JNb2R1bGUsXG4gICAgR2xuT3B0aW9uTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbR2xuU2VsZWN0Q29tcG9uZW50LCBHbG5TZWxlY3RUcmlnZ2VyRGlyZWN0aXZlXSxcbiAgcHJvdmlkZXJzOiBbR0xOX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfUkVQT1NJVElPTl0sXG59KVxuZXhwb3J0IGNsYXNzIEdsblNlbGVjdE1vZHVsZSB7fVxuIl19