import { Directive, Input } from '@angular/core';
import { HtmlElemUtil } from '../../_utils/html-elem.util';
import * as i0 from "@angular/core";
export class GlnColorDirective {
    constructor(hostRef) {
        this.hostRef = hostRef;
        this.elementRef = this.hostRef;
        this.colorClearingMap = new Map();
    }
    ngOnChanges(changes) {
        if (changes['glnColorElementRef']) {
            this.elementRef = this.glnColorElementRef || this.hostRef;
        }
        if (changes['glnColor'] && this.glnColor != null) {
            const typeColor = typeof this.glnColor;
            const maps = new Map();
            if (typeColor === 'string') {
                maps.set('default', this.glnColor);
            }
            else if (typeColor === 'object') {
                const objColors = this.glnColor;
                for (const key of Object.keys(objColors)) {
                    maps.set(key, objColors[key]);
                }
            }
            const newMaps = maps.size === 0 ? this.colorClearingMap : maps;
            this.colorClearingMap = this.settingCssProoperties(newMaps);
        }
    }
    // ** Private API **
    settingCssProoperties(maps) {
        const paramMaps = new Map();
        for (const [key, value] of maps) {
            if (value) {
                paramMaps.set(key, '');
            }
            const valueH = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-h');
            HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-h', valueH.trim());
            const valueS = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-s');
            HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-s', valueS.trim());
            const valueL = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-l');
            HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-l', valueL.trim());
            const valueCL = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-cl');
            HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-cl', valueCL.trim());
        }
        return paramMaps;
    }
}
GlnColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnColorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
GlnColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnColorDirective, selector: "[glnColor]", inputs: { glnColor: "glnColor", glnColorElementRef: "glnColorElementRef" }, exportAs: ["glnColor"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnColor]',
                    exportAs: 'glnColor',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { glnColor: [{
                type: Input
            }], glnColorElementRef: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWNvbG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZGlyZWN0aXZlcy9nbG4tY29sb3IvZ2xuLWNvbG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFFdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQU0zRCxNQUFNLE9BQU8saUJBQWlCO0lBVTVCLFlBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBSjdDLGVBQVUsR0FBNEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVsRCxxQkFBZ0IsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUVILENBQUM7SUFFakQsV0FBVyxDQUFDLE9BQXNCO1FBQ3ZDLElBQUksT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUMzRDtRQUNELElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ2hELE1BQU0sU0FBUyxHQUFHLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN2QyxNQUFNLElBQUksR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUM1QyxJQUFJLFNBQVMsS0FBSyxRQUFRLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFrQixDQUFDLENBQUM7YUFDOUM7aUJBQU0sSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO2dCQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBcUMsQ0FBQztnQkFDN0QsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDL0I7YUFDRjtZQUNELE1BQU0sT0FBTyxHQUF3QixJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDcEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7SUFFRCxvQkFBb0I7SUFFWixxQkFBcUIsQ0FBQyxJQUF5QjtRQUNyRCxNQUFNLFNBQVMsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNqRCxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQy9CLElBQUksS0FBSyxFQUFFO2dCQUNULFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3RHLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNsRixNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdEcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2xGLE1BQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN0RyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEYsTUFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3hHLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLEdBQUcsR0FBRyxHQUFHLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNyRjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7OzhHQWxEVSxpQkFBaUI7a0dBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUo3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsVUFBVTtpQkFDckI7aUdBR1EsUUFBUTtzQkFEZCxLQUFLO2dCQUdDLGtCQUFrQjtzQkFEeEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIdG1sRWxlbVV0aWwgfSBmcm9tICcuLi8uLi9fdXRpbHMvaHRtbC1lbGVtLnV0aWwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZ2xuQ29sb3JdJyxcbiAgZXhwb3J0QXM6ICdnbG5Db2xvcicsXG59KVxuZXhwb3J0IGNsYXNzIEdsbkNvbG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgcHVibGljIGdsbkNvbG9yOiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgQElucHV0KClcbiAgcHVibGljIGdsbkNvbG9yRWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiA9IHRoaXMuaG9zdFJlZjtcblxuICBwcml2YXRlIGNvbG9yQ2xlYXJpbmdNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBob3N0UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydnbG5Db2xvckVsZW1lbnRSZWYnXSkge1xuICAgICAgdGhpcy5lbGVtZW50UmVmID0gdGhpcy5nbG5Db2xvckVsZW1lbnRSZWYgfHwgdGhpcy5ob3N0UmVmO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZ2xuQ29sb3InXSAmJiB0aGlzLmdsbkNvbG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHR5cGVDb2xvciA9IHR5cGVvZiB0aGlzLmdsbkNvbG9yO1xuICAgICAgY29uc3QgbWFwczogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcbiAgICAgIGlmICh0eXBlQ29sb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1hcHMuc2V0KCdkZWZhdWx0JywgdGhpcy5nbG5Db2xvciBhcyBzdHJpbmcpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlQ29sb3IgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IG9iakNvbG9ycyA9IHRoaXMuZ2xuQ29sb3IgYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqQ29sb3JzKSkge1xuICAgICAgICAgIG1hcHMuc2V0KGtleSwgb2JqQ29sb3JzW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdNYXBzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbWFwcy5zaXplID09PSAwID8gdGhpcy5jb2xvckNsZWFyaW5nTWFwIDogbWFwcztcbiAgICAgIHRoaXMuY29sb3JDbGVhcmluZ01hcCA9IHRoaXMuc2V0dGluZ0Nzc1Byb29wZXJ0aWVzKG5ld01hcHMpO1xuICAgIH1cbiAgfVxuXG4gIC8vICoqIFByaXZhdGUgQVBJICoqXG5cbiAgcHJpdmF0ZSBzZXR0aW5nQ3NzUHJvb3BlcnRpZXMobWFwczogTWFwPHN0cmluZywgc3RyaW5nPik6IE1hcDxzdHJpbmcsIHN0cmluZz4ge1xuICAgIGNvbnN0IHBhcmFtTWFwczogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBtYXBzKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgcGFyYW1NYXBzLnNldChrZXksICcnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbHVlSCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJy0tZ2xuLScgKyB2YWx1ZSArICctaCcpO1xuICAgICAgSHRtbEVsZW1VdGlsLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZiwgJy0tZ2xuY2wtJyArIGtleSArICctaCcsIHZhbHVlSC50cmltKCkpO1xuICAgICAgY29uc3QgdmFsdWVTID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmhvc3RSZWYubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1nbG4tJyArIHZhbHVlICsgJy1zJyk7XG4gICAgICBIdG1sRWxlbVV0aWwuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLCAnLS1nbG5jbC0nICsga2V5ICsgJy1zJywgdmFsdWVTLnRyaW0oKSk7XG4gICAgICBjb25zdCB2YWx1ZUwgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWdsbi0nICsgdmFsdWUgKyAnLWwnKTtcbiAgICAgIEh0bWxFbGVtVXRpbC5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYsICctLWdsbmNsLScgKyBrZXkgKyAnLWwnLCB2YWx1ZUwudHJpbSgpKTtcbiAgICAgIGNvbnN0IHZhbHVlQ0wgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWdsbi0nICsgdmFsdWUgKyAnLWNsJyk7XG4gICAgICBIdG1sRWxlbVV0aWwuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLCAnLS1nbG5jbC0nICsga2V5ICsgJy1jbCcsIHZhbHVlQ0wudHJpbSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtTWFwcztcbiAgfVxufVxuIl19