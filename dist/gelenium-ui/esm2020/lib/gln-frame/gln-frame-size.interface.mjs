export var GlnFrameSize;
(function (GlnFrameSize) {
    GlnFrameSize["short"] = "short";
    GlnFrameSize["small"] = "small";
    GlnFrameSize["middle"] = "middle";
    GlnFrameSize["wide"] = "wide";
    GlnFrameSize["large"] = "large";
    GlnFrameSize["huge"] = "huge";
})(GlnFrameSize || (GlnFrameSize = {}));
export var GlnFrameSizeValue;
(function (GlnFrameSizeValue) {
    GlnFrameSizeValue[GlnFrameSizeValue["short"] = 38] = "short";
    GlnFrameSizeValue[GlnFrameSizeValue["small"] = 44] = "small";
    GlnFrameSizeValue[GlnFrameSizeValue["middle"] = 50] = "middle";
    GlnFrameSizeValue[GlnFrameSizeValue["wide"] = 56] = "wide";
    GlnFrameSizeValue[GlnFrameSizeValue["large"] = 62] = "large";
    GlnFrameSizeValue[GlnFrameSizeValue["huge"] = 68] = "huge";
})(GlnFrameSizeValue || (GlnFrameSizeValue = {}));
export class GlnFrameSizeUtil {
    static create(value) {
        return GlnFrameSizeUtil.convert(value ? value.toString() : null) || GlnFrameSize.middle;
    }
    static convert(value) {
        let result = null;
        switch (value) {
            case GlnFrameSize.short.valueOf():
                result = GlnFrameSize.short;
                break;
            case GlnFrameSize.small.valueOf():
                result = GlnFrameSize.small;
                break;
            case GlnFrameSize.middle.valueOf():
                result = GlnFrameSize.middle;
                break;
            case GlnFrameSize.wide.valueOf():
                result = GlnFrameSize.wide;
                break;
            case GlnFrameSize.large.valueOf():
                result = GlnFrameSize.large;
                break;
            case GlnFrameSize.huge.valueOf():
                result = GlnFrameSize.huge;
                break;
        }
        return result;
    }
    static isShort(value) {
        return GlnFrameSize.short === value;
    }
    static isSmall(value) {
        return GlnFrameSize.small === value;
    }
    static isMiddle(value) {
        return GlnFrameSize.middle === value;
    }
    static isWide(value) {
        return GlnFrameSize.wide === value;
    }
    static isLarge(value) {
        return GlnFrameSize.large === value;
    }
    static isHuge(value) {
        return GlnFrameSize.huge === value;
    }
    static getValue(frameSize) {
        let result = null;
        switch (frameSize) {
            case GlnFrameSize.short:
                result = GlnFrameSizeValue.short;
                break;
            case GlnFrameSize.small:
                result = GlnFrameSizeValue.small;
                break;
            case GlnFrameSize.middle:
                result = GlnFrameSizeValue.middle;
                break;
            case GlnFrameSize.wide:
                result = GlnFrameSizeValue.wide;
                break;
            case GlnFrameSize.large:
                result = GlnFrameSizeValue.large;
                break;
            case GlnFrameSize.huge:
                result = GlnFrameSizeValue.huge;
                break;
        }
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWZyYW1lLXNpemUuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ2VsZW5pdW0tdWkvc3JjL2xpYi9nbG4tZnJhbWUvZ2xuLWZyYW1lLXNpemUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sQ0FBTixJQUFZLFlBT1g7QUFQRCxXQUFZLFlBQVk7SUFDdEIsK0JBQWUsQ0FBQTtJQUNmLCtCQUFlLENBQUE7SUFDZixpQ0FBaUIsQ0FBQTtJQUNqQiw2QkFBYSxDQUFBO0lBQ2IsK0JBQWUsQ0FBQTtJQUNmLDZCQUFhLENBQUE7QUFDZixDQUFDLEVBUFcsWUFBWSxLQUFaLFlBQVksUUFPdkI7QUFFRCxNQUFNLENBQU4sSUFBWSxpQkFPWDtBQVBELFdBQVksaUJBQWlCO0lBQzNCLDREQUFVLENBQUE7SUFDViw0REFBVSxDQUFBO0lBQ1YsOERBQVcsQ0FBQTtJQUNYLDBEQUFTLENBQUE7SUFDVCw0REFBVSxDQUFBO0lBQ1YsMERBQVMsQ0FBQTtBQUNYLENBQUMsRUFQVyxpQkFBaUIsS0FBakIsaUJBQWlCLFFBTzVCO0FBRUQsTUFBTSxPQUFPLGdCQUFnQjtJQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQTBCO1FBQzdDLE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQzFGLENBQUM7SUFDTSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQW9CO1FBQ3hDLElBQUksTUFBTSxHQUF3QixJQUFJLENBQUM7UUFDdkMsUUFBUSxLQUFLLEVBQUU7WUFDYixLQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUMvQixNQUFNLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDNUIsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLE1BQU0sR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUM1QixNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDaEMsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQzdCLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUM5QixNQUFNLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLE1BQU0sR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUM1QixNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDOUIsTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLE1BQU07U0FDVDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDTSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQTBCO1FBQzlDLE9BQU8sWUFBWSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7SUFDdEMsQ0FBQztJQUNNLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBMEI7UUFDOUMsT0FBTyxZQUFZLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztJQUN0QyxDQUFDO0lBQ00sTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUEwQjtRQUMvQyxPQUFPLFlBQVksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDO0lBQ3ZDLENBQUM7SUFDTSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQTBCO1FBQzdDLE9BQU8sWUFBWSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUNNLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBMEI7UUFDOUMsT0FBTyxZQUFZLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztJQUN0QyxDQUFDO0lBQ00sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUEwQjtRQUM3QyxPQUFPLFlBQVksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFDTSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQThCO1FBQ25ELElBQUksTUFBTSxHQUFrQixJQUFJLENBQUM7UUFDakMsUUFBUSxTQUFTLEVBQUU7WUFDakIsS0FBSyxZQUFZLENBQUMsS0FBSztnQkFDckIsTUFBTSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQztnQkFDakMsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLEtBQUs7Z0JBQ3JCLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxNQUFNO2dCQUN0QixNQUFNLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO2dCQUNsQyxNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsSUFBSTtnQkFDcEIsTUFBTSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDaEMsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLEtBQUs7Z0JBQ3JCLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxJQUFJO2dCQUNwQixNQUFNLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2dCQUNoQyxNQUFNO1NBQ1Q7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBHbG5GcmFtZVNpemVUeXBlID0gJ3Nob3J0JyB8ICdzbWFsbCcgfCAnbWlkZGxlJyB8ICd3aWRlJyB8ICdsYXJnZScgfCAnaHVnZSc7XG5cbmV4cG9ydCBlbnVtIEdsbkZyYW1lU2l6ZSB7XG4gIHNob3J0ID0gJ3Nob3J0JyxcbiAgc21hbGwgPSAnc21hbGwnLFxuICBtaWRkbGUgPSAnbWlkZGxlJyxcbiAgd2lkZSA9ICd3aWRlJyxcbiAgbGFyZ2UgPSAnbGFyZ2UnLFxuICBodWdlID0gJ2h1Z2UnLFxufVxuXG5leHBvcnQgZW51bSBHbG5GcmFtZVNpemVWYWx1ZSB7XG4gIHNob3J0ID0gMzgsIC8vIDM4cHggLSBib290c3RyYXBcbiAgc21hbGwgPSA0NCxcbiAgbWlkZGxlID0gNTAsXG4gIHdpZGUgPSA1NixcbiAgbGFyZ2UgPSA2MixcbiAgaHVnZSA9IDY4LFxufVxuXG5leHBvcnQgY2xhc3MgR2xuRnJhbWVTaXplVXRpbCB7XG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHZhbHVlOiBHbG5GcmFtZVNpemUgfCBudWxsKTogR2xuRnJhbWVTaXplIHtcbiAgICByZXR1cm4gR2xuRnJhbWVTaXplVXRpbC5jb252ZXJ0KHZhbHVlID8gdmFsdWUudG9TdHJpbmcoKSA6IG51bGwpIHx8IEdsbkZyYW1lU2l6ZS5taWRkbGU7XG4gIH1cbiAgcHVibGljIHN0YXRpYyBjb252ZXJ0KHZhbHVlOiBzdHJpbmcgfCBudWxsKTogR2xuRnJhbWVTaXplIHwgbnVsbCB7XG4gICAgbGV0IHJlc3VsdDogR2xuRnJhbWVTaXplIHwgbnVsbCA9IG51bGw7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSBHbG5GcmFtZVNpemUuc2hvcnQudmFsdWVPZigpOlxuICAgICAgICByZXN1bHQgPSBHbG5GcmFtZVNpemUuc2hvcnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5GcmFtZVNpemUuc21hbGwudmFsdWVPZigpOlxuICAgICAgICByZXN1bHQgPSBHbG5GcmFtZVNpemUuc21hbGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5GcmFtZVNpemUubWlkZGxlLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuRnJhbWVTaXplLm1pZGRsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdsbkZyYW1lU2l6ZS53aWRlLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuRnJhbWVTaXplLndpZGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5GcmFtZVNpemUubGFyZ2UudmFsdWVPZigpOlxuICAgICAgICByZXN1bHQgPSBHbG5GcmFtZVNpemUubGFyZ2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5GcmFtZVNpemUuaHVnZS52YWx1ZU9mKCk6XG4gICAgICAgIHJlc3VsdCA9IEdsbkZyYW1lU2l6ZS5odWdlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBwdWJsaWMgc3RhdGljIGlzU2hvcnQodmFsdWU6IEdsbkZyYW1lU2l6ZSB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gR2xuRnJhbWVTaXplLnNob3J0ID09PSB2YWx1ZTtcbiAgfVxuICBwdWJsaWMgc3RhdGljIGlzU21hbGwodmFsdWU6IEdsbkZyYW1lU2l6ZSB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gR2xuRnJhbWVTaXplLnNtYWxsID09PSB2YWx1ZTtcbiAgfVxuICBwdWJsaWMgc3RhdGljIGlzTWlkZGxlKHZhbHVlOiBHbG5GcmFtZVNpemUgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEdsbkZyYW1lU2l6ZS5taWRkbGUgPT09IHZhbHVlO1xuICB9XG4gIHB1YmxpYyBzdGF0aWMgaXNXaWRlKHZhbHVlOiBHbG5GcmFtZVNpemUgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEdsbkZyYW1lU2l6ZS53aWRlID09PSB2YWx1ZTtcbiAgfVxuICBwdWJsaWMgc3RhdGljIGlzTGFyZ2UodmFsdWU6IEdsbkZyYW1lU2l6ZSB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gR2xuRnJhbWVTaXplLmxhcmdlID09PSB2YWx1ZTtcbiAgfVxuICBwdWJsaWMgc3RhdGljIGlzSHVnZSh2YWx1ZTogR2xuRnJhbWVTaXplIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBHbG5GcmFtZVNpemUuaHVnZSA9PT0gdmFsdWU7XG4gIH1cbiAgcHVibGljIHN0YXRpYyBnZXRWYWx1ZShmcmFtZVNpemU6IEdsbkZyYW1lU2l6ZSB8IG51bGwpOiBudW1iZXIgfCBudWxsIHtcbiAgICBsZXQgcmVzdWx0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgICBzd2l0Y2ggKGZyYW1lU2l6ZSkge1xuICAgICAgY2FzZSBHbG5GcmFtZVNpemUuc2hvcnQ6XG4gICAgICAgIHJlc3VsdCA9IEdsbkZyYW1lU2l6ZVZhbHVlLnNob3J0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2xuRnJhbWVTaXplLnNtYWxsOlxuICAgICAgICByZXN1bHQgPSBHbG5GcmFtZVNpemVWYWx1ZS5zbWFsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdsbkZyYW1lU2l6ZS5taWRkbGU6XG4gICAgICAgIHJlc3VsdCA9IEdsbkZyYW1lU2l6ZVZhbHVlLm1pZGRsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdsbkZyYW1lU2l6ZS53aWRlOlxuICAgICAgICByZXN1bHQgPSBHbG5GcmFtZVNpemVWYWx1ZS53aWRlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2xuRnJhbWVTaXplLmxhcmdlOlxuICAgICAgICByZXN1bHQgPSBHbG5GcmFtZVNpemVWYWx1ZS5sYXJnZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdsbkZyYW1lU2l6ZS5odWdlOlxuICAgICAgICByZXN1bHQgPSBHbG5GcmFtZVNpemVWYWx1ZS5odWdlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19