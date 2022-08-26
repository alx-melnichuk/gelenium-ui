export var GlnButtonExterior;
(function (GlnButtonExterior) {
    GlnButtonExterior["contained"] = "contained";
    GlnButtonExterior["outlined"] = "outlined";
    GlnButtonExterior["text"] = "text";
})(GlnButtonExterior || (GlnButtonExterior = {}));
export class GlnButtonExteriorUtil {
    static create(value) {
        return GlnButtonExteriorUtil.convert((value || '').toString()) || GlnButtonExterior.text;
    }
    static convert(value) {
        let result = null;
        switch (value) {
            case GlnButtonExterior.contained.valueOf():
                result = GlnButtonExterior.contained;
                break;
            case GlnButtonExterior.outlined.valueOf():
                result = GlnButtonExterior.outlined;
                break;
            case GlnButtonExterior.text.valueOf():
                result = GlnButtonExterior.text;
                break;
        }
        return result;
    }
    static isContained(value) {
        return GlnButtonExterior.contained === value;
    }
    static isOutlined(value) {
        return GlnButtonExterior.outlined === value;
    }
    static isText(value) {
        return GlnButtonExterior.text === value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWJ1dHRvbi1leHRlcmlvci5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL2dsbi1idXR0b24vZ2xuLWJ1dHRvbi1leHRlcmlvci5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFOLElBQVksaUJBSVg7QUFKRCxXQUFZLGlCQUFpQjtJQUMzQiw0Q0FBdUIsQ0FBQTtJQUN2QiwwQ0FBcUIsQ0FBQTtJQUNyQixrQ0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQUpXLGlCQUFpQixLQUFqQixpQkFBaUIsUUFJNUI7QUFFRCxNQUFNLE9BQU8scUJBQXFCO0lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBK0I7UUFDbEQsT0FBTyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7SUFDM0YsQ0FBQztJQUNNLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBb0I7UUFDeEMsSUFBSSxNQUFNLEdBQTZCLElBQUksQ0FBQztRQUM1QyxRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssaUJBQWlCLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDeEMsTUFBTSxHQUFHLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztnQkFDckMsTUFBTTtZQUNSLEtBQUssaUJBQWlCLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDdkMsTUFBTSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztnQkFDcEMsTUFBTTtZQUNSLEtBQUssaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDbkMsTUFBTSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDaEMsTUFBTTtTQUNUO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBK0I7UUFDdkQsT0FBTyxpQkFBaUIsQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDO0lBQy9DLENBQUM7SUFDTSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQStCO1FBQ3RELE9BQU8saUJBQWlCLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQztJQUM5QyxDQUFDO0lBQ00sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUErQjtRQUNsRCxPQUFPLGlCQUFpQixDQUFDLElBQUksS0FBSyxLQUFLLENBQUM7SUFDMUMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgR2xuQnV0dG9uRXh0ZXJpb3JUeXBlID0gJ3RleHQnIHwgJ2NvbnRhaW5lZCcgfCAndW5kZXJsaW5lJztcblxuZXhwb3J0IGVudW0gR2xuQnV0dG9uRXh0ZXJpb3Ige1xuICBjb250YWluZWQgPSAnY29udGFpbmVkJyxcbiAgb3V0bGluZWQgPSAnb3V0bGluZWQnLFxuICB0ZXh0ID0gJ3RleHQnLFxufVxuXG5leHBvcnQgY2xhc3MgR2xuQnV0dG9uRXh0ZXJpb3JVdGlsIHtcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUodmFsdWU6IEdsbkJ1dHRvbkV4dGVyaW9yIHwgbnVsbCk6IEdsbkJ1dHRvbkV4dGVyaW9yIHtcbiAgICByZXR1cm4gR2xuQnV0dG9uRXh0ZXJpb3JVdGlsLmNvbnZlcnQoKHZhbHVlIHx8ICcnKS50b1N0cmluZygpKSB8fCBHbG5CdXR0b25FeHRlcmlvci50ZXh0O1xuICB9XG4gIHB1YmxpYyBzdGF0aWMgY29udmVydCh2YWx1ZTogc3RyaW5nIHwgbnVsbCk6IEdsbkJ1dHRvbkV4dGVyaW9yIHwgbnVsbCB7XG4gICAgbGV0IHJlc3VsdDogR2xuQnV0dG9uRXh0ZXJpb3IgfCBudWxsID0gbnVsbDtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIEdsbkJ1dHRvbkV4dGVyaW9yLmNvbnRhaW5lZC52YWx1ZU9mKCk6XG4gICAgICAgIHJlc3VsdCA9IEdsbkJ1dHRvbkV4dGVyaW9yLmNvbnRhaW5lZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdsbkJ1dHRvbkV4dGVyaW9yLm91dGxpbmVkLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuQnV0dG9uRXh0ZXJpb3Iub3V0bGluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5CdXR0b25FeHRlcmlvci50ZXh0LnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuQnV0dG9uRXh0ZXJpb3IudGV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQ29udGFpbmVkKHZhbHVlOiBHbG5CdXR0b25FeHRlcmlvciB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gR2xuQnV0dG9uRXh0ZXJpb3IuY29udGFpbmVkID09PSB2YWx1ZTtcbiAgfVxuICBwdWJsaWMgc3RhdGljIGlzT3V0bGluZWQodmFsdWU6IEdsbkJ1dHRvbkV4dGVyaW9yIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBHbG5CdXR0b25FeHRlcmlvci5vdXRsaW5lZCA9PT0gdmFsdWU7XG4gIH1cbiAgcHVibGljIHN0YXRpYyBpc1RleHQodmFsdWU6IEdsbkJ1dHRvbkV4dGVyaW9yIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBHbG5CdXR0b25FeHRlcmlvci50ZXh0ID09PSB2YWx1ZTtcbiAgfVxufVxuIl19