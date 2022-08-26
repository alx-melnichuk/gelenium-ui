export var GlnFrameExterior;
(function (GlnFrameExterior) {
    GlnFrameExterior["standard"] = "standard";
    GlnFrameExterior["outlined"] = "outlined";
    GlnFrameExterior["underline"] = "underline";
})(GlnFrameExterior || (GlnFrameExterior = {}));
export class GlnFrameExteriorUtil {
    static create(value) {
        return GlnFrameExteriorUtil.convert((value || '').toString()) || GlnFrameExterior.outlined;
    }
    static convert(value) {
        let result = null;
        switch (value) {
            case GlnFrameExterior.standard.valueOf():
                result = GlnFrameExterior.standard;
                break;
            case GlnFrameExterior.outlined.valueOf():
                result = GlnFrameExterior.outlined;
                break;
            case GlnFrameExterior.underline.valueOf():
                result = GlnFrameExterior.underline;
                break;
        }
        return result;
    }
    static isOutlined(value) {
        return GlnFrameExterior.outlined === value;
    }
    static isUnderline(value) {
        return GlnFrameExterior.underline === value;
    }
    static isStandard(value) {
        return GlnFrameExterior.standard === value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWZyYW1lLWV4dGVyaW9yLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZ2xuLWZyYW1lL2dsbi1mcmFtZS1leHRlcmlvci5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFOLElBQVksZ0JBSVg7QUFKRCxXQUFZLGdCQUFnQjtJQUMxQix5Q0FBcUIsQ0FBQTtJQUNyQix5Q0FBcUIsQ0FBQTtJQUNyQiwyQ0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBSlcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUkzQjtBQUVELE1BQU0sT0FBTyxvQkFBb0I7SUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUE4QjtRQUNqRCxPQUFPLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztJQUM3RixDQUFDO0lBQ00sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFvQjtRQUN4QyxJQUFJLE1BQU0sR0FBNEIsSUFBSSxDQUFDO1FBQzNDLFFBQVEsS0FBSyxFQUFFO1lBQ2IsS0FBSyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO2dCQUN0QyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO2dCQUNuQyxNQUFNO1lBQ1IsS0FBSyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO2dCQUN0QyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO2dCQUNuQyxNQUFNO1lBQ1IsS0FBSyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUN2QyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO2dCQUNwQyxNQUFNO1NBQ1Q7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ00sTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUE4QjtRQUNyRCxPQUFPLGdCQUFnQixDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUM7SUFDN0MsQ0FBQztJQUNNLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBOEI7UUFDdEQsT0FBTyxnQkFBZ0IsQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDO0lBQzlDLENBQUM7SUFDTSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQThCO1FBQ3JELE9BQU8sZ0JBQWdCLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQztJQUM3QyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBHbG5GcmFtZUV4dGVyaW9yVHlwZSA9ICdzdGFuZGFyZCcgfCAnb3V0bGluZWQnIHwgJ3VuZGVybGluZSc7XG5cbmV4cG9ydCBlbnVtIEdsbkZyYW1lRXh0ZXJpb3Ige1xuICBzdGFuZGFyZCA9ICdzdGFuZGFyZCcsXG4gIG91dGxpbmVkID0gJ291dGxpbmVkJyxcbiAgdW5kZXJsaW5lID0gJ3VuZGVybGluZScsXG59XG5cbmV4cG9ydCBjbGFzcyBHbG5GcmFtZUV4dGVyaW9yVXRpbCB7XG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHZhbHVlOiBHbG5GcmFtZUV4dGVyaW9yIHwgbnVsbCk6IEdsbkZyYW1lRXh0ZXJpb3Ige1xuICAgIHJldHVybiBHbG5GcmFtZUV4dGVyaW9yVXRpbC5jb252ZXJ0KCh2YWx1ZSB8fCAnJykudG9TdHJpbmcoKSkgfHwgR2xuRnJhbWVFeHRlcmlvci5vdXRsaW5lZDtcbiAgfVxuICBwdWJsaWMgc3RhdGljIGNvbnZlcnQodmFsdWU6IHN0cmluZyB8IG51bGwpOiBHbG5GcmFtZUV4dGVyaW9yIHwgbnVsbCB7XG4gICAgbGV0IHJlc3VsdDogR2xuRnJhbWVFeHRlcmlvciB8IG51bGwgPSBudWxsO1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgR2xuRnJhbWVFeHRlcmlvci5zdGFuZGFyZC52YWx1ZU9mKCk6XG4gICAgICAgIHJlc3VsdCA9IEdsbkZyYW1lRXh0ZXJpb3Iuc3RhbmRhcmQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5GcmFtZUV4dGVyaW9yLm91dGxpbmVkLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuRnJhbWVFeHRlcmlvci5vdXRsaW5lZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdsbkZyYW1lRXh0ZXJpb3IudW5kZXJsaW5lLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuRnJhbWVFeHRlcmlvci51bmRlcmxpbmU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHB1YmxpYyBzdGF0aWMgaXNPdXRsaW5lZCh2YWx1ZTogR2xuRnJhbWVFeHRlcmlvciB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gR2xuRnJhbWVFeHRlcmlvci5vdXRsaW5lZCA9PT0gdmFsdWU7XG4gIH1cbiAgcHVibGljIHN0YXRpYyBpc1VuZGVybGluZSh2YWx1ZTogR2xuRnJhbWVFeHRlcmlvciB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gR2xuRnJhbWVFeHRlcmlvci51bmRlcmxpbmUgPT09IHZhbHVlO1xuICB9XG4gIHB1YmxpYyBzdGF0aWMgaXNTdGFuZGFyZCh2YWx1ZTogR2xuRnJhbWVFeHRlcmlvciB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gR2xuRnJhbWVFeHRlcmlvci5zdGFuZGFyZCA9PT0gdmFsdWU7XG4gIH1cbn1cbiJdfQ==