export var GlnInputType;
(function (GlnInputType) {
    GlnInputType["color"] = "color";
    GlnInputType["date"] = "date";
    GlnInputType["datetimeLocal"] = "datetime-local";
    GlnInputType["email"] = "email";
    GlnInputType["month"] = "month";
    GlnInputType["number"] = "number";
    GlnInputType["password"] = "password";
    GlnInputType["search"] = "search";
    GlnInputType["tel"] = "tel";
    GlnInputType["text"] = "text";
    GlnInputType["time"] = "time";
    GlnInputType["url"] = "url";
    GlnInputType["week"] = "week";
})(GlnInputType || (GlnInputType = {}));
export class GlnInputTypeUtil {
    static create(value) {
        let result = null;
        switch (value) {
            case GlnInputType.color.valueOf():
                result = GlnInputType.color;
                break;
            case GlnInputType.date.valueOf():
                result = GlnInputType.date;
                break;
            case GlnInputType.datetimeLocal.valueOf():
                result = GlnInputType.datetimeLocal;
                break;
            case GlnInputType.email.valueOf():
                result = GlnInputType.email;
                break;
            case GlnInputType.month.valueOf():
                result = GlnInputType.month;
                break;
            case GlnInputType.number.valueOf():
                result = GlnInputType.number;
                break;
            case GlnInputType.password.valueOf():
                result = GlnInputType.password;
                break;
            case GlnInputType.search.valueOf():
                result = GlnInputType.search;
                break;
            case GlnInputType.tel.valueOf():
                result = GlnInputType.tel;
                break;
            case GlnInputType.text.valueOf():
                result = GlnInputType.text;
                break;
            case GlnInputType.time.valueOf():
                result = GlnInputType.time;
                break;
            case GlnInputType.url.valueOf():
                result = GlnInputType.url;
                break;
            case GlnInputType.week.valueOf():
                result = GlnInputType.week;
                break;
        }
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xuLWlucHV0LmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dlbGVuaXVtLXVpL3NyYy9saWIvZ2xuLWlucHV0L2dsbi1pbnB1dC5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFOLElBQVksWUFjWDtBQWRELFdBQVksWUFBWTtJQUN0QiwrQkFBZSxDQUFBO0lBQ2YsNkJBQWEsQ0FBQTtJQUNiLGdEQUFnQyxDQUFBO0lBQ2hDLCtCQUFlLENBQUE7SUFDZiwrQkFBZSxDQUFBO0lBQ2YsaUNBQWlCLENBQUE7SUFDakIscUNBQXFCLENBQUE7SUFDckIsaUNBQWlCLENBQUE7SUFDakIsMkJBQVcsQ0FBQTtJQUNYLDZCQUFhLENBQUE7SUFDYiw2QkFBYSxDQUFBO0lBQ2IsMkJBQVcsQ0FBQTtJQUNYLDZCQUFhLENBQUE7QUFDZixDQUFDLEVBZFcsWUFBWSxLQUFaLFlBQVksUUFjdkI7QUFFRCxNQUFNLE9BQU8sZ0JBQWdCO0lBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBYTtRQUNoQyxJQUFJLE1BQU0sR0FBd0IsSUFBSSxDQUFDO1FBQ3ZDLFFBQVEsS0FBSyxFQUFFO1lBQ2IsS0FBSyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDL0IsTUFBTSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQzVCLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUM5QixNQUFNLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZDLE1BQU0sR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDO2dCQUNwQyxNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDL0IsTUFBTSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQzVCLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUMvQixNQUFNLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDNUIsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hDLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO2dCQUM3QixNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDbEMsTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQy9CLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNoQyxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztnQkFDN0IsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQzdCLE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDO2dCQUMxQixNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDOUIsTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUM5QixNQUFNLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDM0IsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQzdCLE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDO2dCQUMxQixNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDOUIsTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLE1BQU07U0FDVDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIEdsbklucHV0VHlwZSB7XG4gIGNvbG9yID0gJ2NvbG9yJywgLy9cbiAgZGF0ZSA9ICdkYXRlJywgLy9cbiAgZGF0ZXRpbWVMb2NhbCA9ICdkYXRldGltZS1sb2NhbCcsIC8vXG4gIGVtYWlsID0gJ2VtYWlsJyxcbiAgbW9udGggPSAnbW9udGgnLCAvL1xuICBudW1iZXIgPSAnbnVtYmVyJyxcbiAgcGFzc3dvcmQgPSAncGFzc3dvcmQnLFxuICBzZWFyY2ggPSAnc2VhcmNoJyxcbiAgdGVsID0gJ3RlbCcsIC8vXG4gIHRleHQgPSAndGV4dCcsXG4gIHRpbWUgPSAndGltZScsIC8vXG4gIHVybCA9ICd1cmwnLFxuICB3ZWVrID0gJ3dlZWsnLCAvL1xufVxuXG5leHBvcnQgY2xhc3MgR2xuSW5wdXRUeXBlVXRpbCB7XG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHZhbHVlOiBzdHJpbmcpOiBHbG5JbnB1dFR5cGUgfCBudWxsIHtcbiAgICBsZXQgcmVzdWx0OiBHbG5JbnB1dFR5cGUgfCBudWxsID0gbnVsbDtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIEdsbklucHV0VHlwZS5jb2xvci52YWx1ZU9mKCk6XG4gICAgICAgIHJlc3VsdCA9IEdsbklucHV0VHlwZS5jb2xvcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdsbklucHV0VHlwZS5kYXRlLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuSW5wdXRUeXBlLmRhdGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5JbnB1dFR5cGUuZGF0ZXRpbWVMb2NhbC52YWx1ZU9mKCk6XG4gICAgICAgIHJlc3VsdCA9IEdsbklucHV0VHlwZS5kYXRldGltZUxvY2FsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2xuSW5wdXRUeXBlLmVtYWlsLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuSW5wdXRUeXBlLmVtYWlsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2xuSW5wdXRUeXBlLm1vbnRoLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuSW5wdXRUeXBlLm1vbnRoO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2xuSW5wdXRUeXBlLm51bWJlci52YWx1ZU9mKCk6XG4gICAgICAgIHJlc3VsdCA9IEdsbklucHV0VHlwZS5udW1iZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5JbnB1dFR5cGUucGFzc3dvcmQudmFsdWVPZigpOlxuICAgICAgICByZXN1bHQgPSBHbG5JbnB1dFR5cGUucGFzc3dvcmQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5JbnB1dFR5cGUuc2VhcmNoLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuSW5wdXRUeXBlLnNlYXJjaDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdsbklucHV0VHlwZS50ZWwudmFsdWVPZigpOlxuICAgICAgICByZXN1bHQgPSBHbG5JbnB1dFR5cGUudGVsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2xuSW5wdXRUeXBlLnRleHQudmFsdWVPZigpOlxuICAgICAgICByZXN1bHQgPSBHbG5JbnB1dFR5cGUudGV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdsbklucHV0VHlwZS50aW1lLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuSW5wdXRUeXBlLnRpbWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHbG5JbnB1dFR5cGUudXJsLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuSW5wdXRUeXBlLnVybDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdsbklucHV0VHlwZS53ZWVrLnZhbHVlT2YoKTpcbiAgICAgICAgcmVzdWx0ID0gR2xuSW5wdXRUeXBlLndlZWs7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=