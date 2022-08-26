export var GlnFrameOrnamAlign;
(function (GlnFrameOrnamAlign) {
    GlnFrameOrnamAlign["default"] = "default";
    GlnFrameOrnamAlign["center"] = "center";
    GlnFrameOrnamAlign["flexStart"] = "flex-start";
    GlnFrameOrnamAlign["flexEnd"] = "flex-end";
    GlnFrameOrnamAlign["baseline"] = "baseline";
    GlnFrameOrnamAlign["stretch"] = "stretch";
})(GlnFrameOrnamAlign || (GlnFrameOrnamAlign = {}));
export class GlnFrameOrnamAlignUtil {
    static create(value, defaultValue) {
        return GlnFrameOrnamAlignUtil.convert((value || defaultValue || '').toString(), GlnFrameOrnamAlign.default);
    }
    static convert(value, defaultValue = null) {
        let result = defaultValue;
        switch (value) {
            case GlnFrameOrnamAlign.default.valueOf():
                result = GlnFrameOrnamAlign.default;
                break;
            case GlnFrameOrnamAlign.center.valueOf():
                result = GlnFrameOrnamAlign.center;
                break;
            case GlnFrameOrnamAlign.flexStart.valueOf():
                result = GlnFrameOrnamAlign.flexStart;
                break;
            case GlnFrameOrnamAlign.flexEnd.valueOf():
                result = GlnFrameOrnamAlign.flexEnd;
                break;
            case GlnFrameOrnamAlign.baseline.valueOf():
                result = GlnFrameOrnamAlign.baseline;
                break;
            case GlnFrameOrnamAlign.stretch.valueOf():
                result = GlnFrameOrnamAlign.stretch;
                break;
        }
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWZyYW1lLW9ybmFtLWFsaWduLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZGlyZWN0aXZlcy9nbG4tZnJhbWUtb3JuYW1lbnQvZ2xuLWZyYW1lLW9ybmFtLWFsaWduLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQU4sSUFBWSxrQkFPWDtBQVBELFdBQVksa0JBQWtCO0lBQzVCLHlDQUFtQixDQUFBO0lBQ25CLHVDQUFpQixDQUFBO0lBQ2pCLDhDQUF3QixDQUFBO0lBQ3hCLDBDQUFvQixDQUFBO0lBQ3BCLDJDQUFxQixDQUFBO0lBQ3JCLHlDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFQVyxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBTzdCO0FBRUQsTUFBTSxPQUFPLHNCQUFzQjtJQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQWdDLEVBQUUsWUFBdUM7UUFDNUYsT0FBTyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBdUIsQ0FBQztJQUNwSSxDQUFDO0lBQ00sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFvQixFQUFFLGVBQTBDLElBQUk7UUFDeEYsSUFBSSxNQUFNLEdBQThCLFlBQVksQ0FBQztRQUNyRCxRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDdkMsTUFBTSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztnQkFDcEMsTUFBTTtZQUNSLEtBQUssa0JBQWtCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDdEMsTUFBTSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztnQkFDbkMsTUFBTTtZQUNSLEtBQUssa0JBQWtCLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDekMsTUFBTSxHQUFHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztnQkFDdEMsTUFBTTtZQUNSLEtBQUssa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDdkMsTUFBTSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztnQkFDcEMsTUFBTTtZQUNSLEtBQUssa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDeEMsTUFBTSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztnQkFDckMsTUFBTTtZQUNSLEtBQUssa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDdkMsTUFBTSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztnQkFDcEMsTUFBTTtTQUNUO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgR2xuRnJhbWVPcm5hbUFsaWduVHlwZSA9ICdkZWZhdWx0JyB8ICdjZW50ZXInIHwgJ2ZsZXgtc3RhcnQnIHwgJ2ZsZXgtZW5kJyB8ICdiYXNlbGluZScgfCAnc3RyZXRjaCc7XG5cbmV4cG9ydCBlbnVtIEdsbkZyYW1lT3JuYW1BbGlnbiB7XG4gIGRlZmF1bHQgPSAnZGVmYXVsdCcsXG4gIGNlbnRlciA9ICdjZW50ZXInLFxuICBmbGV4U3RhcnQgPSAnZmxleC1zdGFydCcsXG4gIGZsZXhFbmQgPSAnZmxleC1lbmQnLFxuICBiYXNlbGluZSA9ICdiYXNlbGluZScsXG4gIHN0cmV0Y2ggPSAnc3RyZXRjaCcsXG59XG5cbmV4cG9ydCBjbGFzcyBHbG5GcmFtZU9ybmFtQWxpZ25VdGlsIHtcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUodmFsdWU6IEdsbkZyYW1lT3JuYW1BbGlnbiB8IG51bGwsIGRlZmF1bHRWYWx1ZTogR2xuRnJhbWVPcm5hbUFsaWduIHwgbnVsbCk6IEdsbkZyYW1lT3JuYW1BbGlnbiB7XG4gICAgcmV0dXJuIEdsbkZyYW1lT3JuYW1BbGlnblV0aWwuY29udmVydCgodmFsdWUgfHwgZGVmYXVsdFZhbHVlIHx8ICcnKS50b1N0cmluZygpLCBHbG5GcmFtZU9ybmFtQWxpZ24uZGVmYXVsdCkgYXMgR2xuRnJhbWVPcm5hbUFsaWduO1xuICB9XG4gIHB1YmxpYyBzdGF0aWMgY29udmVydCh2YWx1ZTogc3RyaW5nIHwgbnVsbCwgZGVmYXVsdFZhbHVlOiBHbG5GcmFtZU9ybmFtQWxpZ24gfCBudWxsID0gbnVsbCk6IEdsbkZyYW1lT3JuYW1BbGlnbiB8IG51bGwge1xuICAgIGxldCByZXN1bHQ6IEdsbkZyYW1lT3JuYW1BbGlnbiB8IG51bGwgPSBkZWZhdWx0VmFsdWU7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSBHbG5GcmFtZU9ybmFtQWxpZ24uZGVmYXVsdC52YWx1ZU9mKCk6XG4gICAgICAgIHJlc3VsdCA9IEdsbkZyYW1lT3JuYW1BbGlnbi5kZWZhdWx0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2xuRnJhbWVPcm5hbUFsaWduLmNlbnRlci52YWx1ZU9mKCk6XG4gICAgICAgIHJlc3VsdCA9IEdsbkZyYW1lT3JuYW1BbGlnbi5jZW50ZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5GcmFtZU9ybmFtQWxpZ24uZmxleFN0YXJ0LnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuRnJhbWVPcm5hbUFsaWduLmZsZXhTdGFydDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdsbkZyYW1lT3JuYW1BbGlnbi5mbGV4RW5kLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuRnJhbWVPcm5hbUFsaWduLmZsZXhFbmQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5GcmFtZU9ybmFtQWxpZ24uYmFzZWxpbmUudmFsdWVPZigpOlxuICAgICAgICByZXN1bHQgPSBHbG5GcmFtZU9ybmFtQWxpZ24uYmFzZWxpbmU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5GcmFtZU9ybmFtQWxpZ24uc3RyZXRjaC52YWx1ZU9mKCk6XG4gICAgICAgIHJlc3VsdCA9IEdsbkZyYW1lT3JuYW1BbGlnbi5zdHJldGNoO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19