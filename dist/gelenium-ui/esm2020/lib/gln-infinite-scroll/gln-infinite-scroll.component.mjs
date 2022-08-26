import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
export class GlnInfiniteScrollComponent {
    constructor(hostRef) {
        this.hostRef = hostRef;
        this.options = {};
        this.scrolled = new EventEmitter();
        this.anchor = null;
        this.observer = null;
    }
    ngOnInit() {
        const options = {
            root: this.isHostScrollable() ? this.hostRef.nativeElement : null,
            ...this.options,
        };
        this.observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                this.scrolled.emit();
            }
        }, options);
    }
    ngAfterViewInit() {
        if (this.observer !== null && this.anchor !== null) {
            this.observer.observe(this.anchor.nativeElement);
        }
    }
    ngOnDestroy() {
        if (this.observer !== null) {
            this.observer.disconnect();
        }
    }
    // ** Private API **
    isHostScrollable() {
        const style = window.getComputedStyle(this.hostRef.nativeElement);
        return style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';
    }
}
GlnInfiniteScrollComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInfiniteScrollComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GlnInfiniteScrollComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnInfiniteScrollComponent, selector: "gln-infinite-scroll", inputs: { options: "options" }, outputs: { scrolled: "scrolled" }, viewQueries: [{ propertyName: "anchor", first: true, predicate: ["anchor"], descendants: true }], exportAs: ["glnInfiniteScroll"], ngImport: i0, template: "<ng-content></ng-content>\n<div #anchor></div>", styles: ["gln-infinite-scroll{display:block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInfiniteScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-infinite-scroll', exportAs: 'glnInfiniteScroll', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n<div #anchor></div>", styles: ["gln-infinite-scroll{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { options: [{
                type: Input
            }], scrolled: [{
                type: Output
            }], anchor: [{
                type: ViewChild,
                args: ['anchor']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWluZmluaXRlLXNjcm9sbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL2dsbi1pbmZpbml0ZS1zY3JvbGwvZ2xuLWluZmluaXRlLXNjcm9sbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL2dsbi1pbmZpbml0ZS1zY3JvbGwvZ2xuLWluZmluaXRlLXNjcm9sbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOztBQVV2QixNQUFNLE9BQU8sMEJBQTBCO0lBWXJDLFlBQW9CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFWaEMsWUFBTyxHQUE2QixFQUFFLENBQUM7UUFHckMsYUFBUSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR3BELFdBQU0sR0FBbUMsSUFBSSxDQUFDO1FBRTdDLGFBQVEsR0FBZ0MsSUFBSSxDQUFDO0lBRVgsQ0FBQztJQUVwQyxRQUFRO1FBQ2IsTUFBTSxPQUFPLEdBQUc7WUFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ2pFLEdBQUcsSUFBSSxDQUFDLE9BQU87U0FDaEIsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUNuRCxJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdEI7UUFDSCxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRU0sZUFBZTtRQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQsb0JBQW9CO0lBRVosZ0JBQWdCO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xFLE9BQU8sS0FBSyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEtBQUssUUFBUSxDQUFDO0lBQzVHLENBQUM7O3VIQTVDVSwwQkFBMEI7MkdBQTFCLDBCQUEwQixpUUN0QnZDLGdEQUNtQjsyRkRxQk4sMEJBQTBCO2tCQVJ0QyxTQUFTOytCQUNFLHFCQUFxQixZQUNyQixtQkFBbUIsaUJBR2QsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTtpR0FJeEMsT0FBTztzQkFEYixLQUFLO2dCQUlHLFFBQVE7c0JBRGhCLE1BQU07Z0JBSUEsTUFBTTtzQkFEWixTQUFTO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2xuLWluZmluaXRlLXNjcm9sbCcsXG4gIGV4cG9ydEFzOiAnZ2xuSW5maW5pdGVTY3JvbGwnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ2xuLWluZmluaXRlLXNjcm9sbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dsbi1pbmZpbml0ZS1zY3JvbGwuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEdsbkluZmluaXRlU2Nyb2xsQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwdWJsaWMgb3B0aW9uczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0ID0ge307XG5cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHNjcm9sbGVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnYW5jaG9yJylcbiAgcHVibGljIGFuY2hvcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4gfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlciB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG9zdFJlZjogRWxlbWVudFJlZikge31cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHJvb3Q6IHRoaXMuaXNIb3N0U2Nyb2xsYWJsZSgpID8gdGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQgOiBudWxsLFxuICAgICAgLi4udGhpcy5vcHRpb25zLFxuICAgIH07XG5cbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChbZW50cnldKSA9PiB7XG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxlZC5lbWl0KCk7XG4gICAgICB9XG4gICAgfSwgb3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9ic2VydmVyICE9PSBudWxsICYmIHRoaXMuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5hbmNob3IubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9ic2VydmVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cblxuICAvLyAqKiBQcml2YXRlIEFQSSAqKlxuXG4gIHByaXZhdGUgaXNIb3N0U2Nyb2xsYWJsZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICByZXR1cm4gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnb3ZlcmZsb3cnKSA9PT0gJ2F1dG8nIHx8IHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ292ZXJmbG93LXknKSA9PT0gJ3Njcm9sbCc7XG4gIH1cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjxkaXYgI2FuY2hvcj48L2Rpdj4iXX0=