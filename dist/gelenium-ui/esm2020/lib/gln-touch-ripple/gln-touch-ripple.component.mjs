import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Inject, Input, ViewEncapsulation, } from '@angular/core';
import { BooleanUtil } from '../_utils/boolean.util';
import * as i0 from "@angular/core";
/**
 * The parent element must have css styles:
 * - position: relative;
 * - overflow: hidden;
 */
const RIPPLE_CLASS = 'glntr-ripple';
let uniqueIdCounter = 0;
export class GlnTouchRippleComponent {
    constructor(hostRef, document) {
        this.hostRef = hostRef;
        this.document = document;
        this.id = `glntr-${uniqueIdCounter++}`;
        this.isCenter = null;
        this.center = false;
    }
    doMousedown(event) {
        this.doRipple(event, this.center);
    }
    ngOnChanges(changes) {
        if (changes['isCenter']) {
            this.center = !!BooleanUtil.init(this.isCenter);
        }
    }
    // ** Public API **
    touchRipple(event, isCenter = this.center) {
        this.doRipple(event, isCenter);
    }
    // ** Private API **
    doRipple(event, isCenter) {
        const parentElement = this.hostRef.nativeElement.parentElement;
        if (!parentElement) {
            return;
        }
        const clientHeight = parentElement.clientHeight;
        const clientWidth = parentElement.clientWidth;
        if (clientHeight && clientWidth && event.currentTarget) {
            const radius = Math.min(clientWidth, clientHeight) / 2;
            const rect = event.currentTarget.getBoundingClientRect() || { left: 0, top: 0 };
            let offsetX = Math.round(event.clientX - rect.left);
            let offsetY = Math.round(event.clientY - rect.top);
            if (isCenter) {
                offsetX = Math.round(clientWidth / 2);
                offsetY = Math.round(clientHeight / 2);
            }
            const left = offsetX - radius / 2;
            const top = offsetY - radius / 2;
            const circle = this.document.createElement('span');
            circle.style.width = circle.style.height = `${radius}px`;
            circle.style.left = `${left}px`;
            circle.style.top = `${top}px`;
            circle.classList.add(RIPPLE_CLASS);
            circle.addEventListener('animationend', () => {
                if (this.hostRef.nativeElement.children.length > 0) {
                    this.hostRef.nativeElement.children.item(0)?.remove();
                }
            }, 
            // A value of "true" indicates that the listener should be called at most once after being added.
            { once: true });
            this.hostRef.nativeElement.appendChild(circle);
            circle.addEventListener('animationcancel', () => {
                if (this.hostRef.nativeElement.children.length > 0) {
                    this.hostRef.nativeElement.children.item(0)?.remove();
                }
            }, 
            // A value of "true" indicates that the listener should be called at most once after being added.
            { once: true });
            this.hostRef.nativeElement.appendChild(circle);
        }
    }
}
GlnTouchRippleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTouchRippleComponent, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
GlnTouchRippleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnTouchRippleComponent, selector: "gln-touch-ripple", inputs: { id: "id", isCenter: "isCenter" }, host: { listeners: { "mousedown": "doMousedown($event)" } }, exportAs: ["glnTouchRipple"], usesOnChanges: true, ngImport: i0, template: '', isInline: true, styles: ["gln-touch-ripple{display:block;overflow:hidden;position:absolute;z-index:0;inset:0px;border-radius:inherit}gln-touch-ripple:not([skip-events]){pointer-events:auto}gln-touch-ripple[skip-events]{pointer-events:none}gln-touch-ripple .glntr-ripple{position:absolute;border-radius:50%;transform:scale(0);animation:ripple .6s linear;transition:background .6s;background-color:var(--glntr-ripple-cl, rgba(255, 255, 255, .3))}@keyframes ripple{0%{opacity:1;transform:scale(0)}to{opacity:0;transform:scale(20)}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTouchRippleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-touch-ripple', exportAs: 'glnTouchRipple', template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["gln-touch-ripple{display:block;overflow:hidden;position:absolute;z-index:0;inset:0px;border-radius:inherit}gln-touch-ripple:not([skip-events]){pointer-events:auto}gln-touch-ripple[skip-events]{pointer-events:none}gln-touch-ripple .glntr-ripple{position:absolute;border-radius:50%;transform:scale(0);animation:ripple .6s linear;transition:background .6s;background-color:var(--glntr-ripple-cl, rgba(255, 255, 255, .3))}@keyframes ripple{0%{opacity:1;transform:scale(0)}to{opacity:0;transform:scale(20)}}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], isCenter: [{
                type: Input
            }], doMousedown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLXRvdWNoLXJpcHBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL2dsbi10b3VjaC1yaXBwbGUvZ2xuLXRvdWNoLXJpcHBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBRXJEOzs7O0dBSUc7QUFDSCxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUM7QUFDcEMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBVXhCLE1BQU0sT0FBTyx1QkFBdUI7SUFRbEMsWUFBb0IsT0FBZ0MsRUFBNEIsUUFBa0I7UUFBOUUsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFBNEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQU4zRixPQUFFLEdBQUcsU0FBUyxlQUFlLEVBQUUsRUFBRSxDQUFDO1FBRWxDLGFBQVEsR0FBa0IsSUFBSSxDQUFDO1FBRTlCLFdBQU0sR0FBRyxLQUFLLENBQUM7SUFFOEUsQ0FBQztJQUcvRixXQUFXLENBQUMsS0FBaUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxXQUFXLENBQUMsT0FBc0I7UUFDdkMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FD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bEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQztpQkFDdkQ7WUFDSCxDQUFDO1lBQ0QsaUdBQWlHO1lBQ2pHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUNmLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDOztvSEE5RVUsdUJBQXVCLDRDQVE0QixRQUFRO3dHQVIzRCx1QkFBdUIsb05BTHhCLEVBQUU7MkZBS0QsdUJBQXVCO2tCQVJuQyxTQUFTOytCQUNFLGtCQUFrQixZQUNsQixnQkFBZ0IsWUFDaEIsRUFBRSxpQkFFRyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNO21GQVUyQyxRQUFROzBCQUEzQyxNQUFNOzJCQUFDLFFBQVE7NENBTi9ELEVBQUU7c0JBRFIsS0FBSztnQkFHQyxRQUFRO3NCQURkLEtBQUs7Z0JBUUMsV0FBVztzQkFEakIsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhblV0aWwgfSBmcm9tICcuLi9fdXRpbHMvYm9vbGVhbi51dGlsJztcblxuLyoqXG4gKiBUaGUgcGFyZW50IGVsZW1lbnQgbXVzdCBoYXZlIGNzcyBzdHlsZXM6XG4gKiAtIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAqIC0gb3ZlcmZsb3c6IGhpZGRlbjtcbiAqL1xuY29uc3QgUklQUExFX0NMQVNTID0gJ2dsbnRyLXJpcHBsZSc7XG5sZXQgdW5pcXVlSWRDb3VudGVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2xuLXRvdWNoLXJpcHBsZScsXG4gIGV4cG9ydEFzOiAnZ2xuVG91Y2hSaXBwbGUnLFxuICB0ZW1wbGF0ZTogJycsXG4gIHN0eWxlVXJsczogWycuL2dsbi10b3VjaC1yaXBwbGUuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEdsblRvdWNoUmlwcGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgcHVibGljIGlkID0gYGdsbnRyLSR7dW5pcXVlSWRDb3VudGVyKyt9YDtcbiAgQElucHV0KClcbiAgcHVibGljIGlzQ2VudGVyOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIGNlbnRlciA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG9zdFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50KSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBkb01vdXNlZG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuZG9SaXBwbGUoZXZlbnQsIHRoaXMuY2VudGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2lzQ2VudGVyJ10pIHtcbiAgICAgIHRoaXMuY2VudGVyID0gISFCb29sZWFuVXRpbC5pbml0KHRoaXMuaXNDZW50ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8vICoqIFB1YmxpYyBBUEkgKipcblxuICBwdWJsaWMgdG91Y2hSaXBwbGUoZXZlbnQ6IE1vdXNlRXZlbnQsIGlzQ2VudGVyOiBib29sZWFuID0gdGhpcy5jZW50ZXIpOiB2b2lkIHtcbiAgICB0aGlzLmRvUmlwcGxlKGV2ZW50LCBpc0NlbnRlcik7XG4gIH1cblxuICAvLyAqKiBQcml2YXRlIEFQSSAqKlxuXG4gIHByaXZhdGUgZG9SaXBwbGUoZXZlbnQ6IE1vdXNlRXZlbnQsIGlzQ2VudGVyOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKCFwYXJlbnRFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNsaWVudEhlaWdodCA9IHBhcmVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IGNsaWVudFdpZHRoID0gcGFyZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBpZiAoY2xpZW50SGVpZ2h0ICYmIGNsaWVudFdpZHRoICYmIGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQpIC8gMjtcbiAgICAgIGNvbnN0IHJlY3QgPSAoZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgfHwgeyBsZWZ0OiAwLCB0b3A6IDAgfTtcbiAgICAgIGxldCBvZmZzZXRYID0gTWF0aC5yb3VuZChldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KTtcbiAgICAgIGxldCBvZmZzZXRZID0gTWF0aC5yb3VuZChldmVudC5jbGllbnRZIC0gcmVjdC50b3ApO1xuICAgICAgaWYgKGlzQ2VudGVyKSB7XG4gICAgICAgIG9mZnNldFggPSBNYXRoLnJvdW5kKGNsaWVudFdpZHRoIC8gMik7XG4gICAgICAgIG9mZnNldFkgPSBNYXRoLnJvdW5kKGNsaWVudEhlaWdodCAvIDIpO1xuICAgICAgfVxuICAgICAgY29uc3QgbGVmdCA9IG9mZnNldFggLSByYWRpdXMgLyAyO1xuICAgICAgY29uc3QgdG9wID0gb2Zmc2V0WSAtIHJhZGl1cyAvIDI7XG5cbiAgICAgIGNvbnN0IGNpcmNsZSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgY2lyY2xlLnN0eWxlLndpZHRoID0gY2lyY2xlLnN0eWxlLmhlaWdodCA9IGAke3JhZGl1c31weGA7XG4gICAgICBjaXJjbGUuc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xuICAgICAgY2lyY2xlLnN0eWxlLnRvcCA9IGAke3RvcH1weGA7XG4gICAgICBjaXJjbGUuY2xhc3NMaXN0LmFkZChSSVBQTEVfQ0xBU1MpO1xuXG4gICAgICBjaXJjbGUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2FuaW1hdGlvbmVuZCcsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4uaXRlbSgwKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBBIHZhbHVlIG9mIFwidHJ1ZVwiIGluZGljYXRlcyB0aGF0IHRoZSBsaXN0ZW5lciBzaG91bGQgYmUgY2FsbGVkIGF0IG1vc3Qgb25jZSBhZnRlciBiZWluZyBhZGRlZC5cbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgICB0aGlzLmhvc3RSZWYubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChjaXJjbGUpO1xuXG4gICAgICBjaXJjbGUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2FuaW1hdGlvbmNhbmNlbCcsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4uaXRlbSgwKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBBIHZhbHVlIG9mIFwidHJ1ZVwiIGluZGljYXRlcyB0aGF0IHRoZSBsaXN0ZW5lciBzaG91bGQgYmUgY2FsbGVkIGF0IG1vc3Qgb25jZSBhZnRlciBiZWluZyBhZGRlZC5cbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgICB0aGlzLmhvc3RSZWYubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChjaXJjbGUpO1xuICAgIH1cbiAgfVxufVxuIl19