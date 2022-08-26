export declare enum GlnInputType {
    color = "color",
    date = "date",
    datetimeLocal = "datetime-local",
    email = "email",
    month = "month",
    number = "number",
    password = "password",
    search = "search",
    tel = "tel",
    text = "text",
    time = "time",
    url = "url",
    week = "week"
}
export declare class GlnInputTypeUtil {
    static create(value: string): GlnInputType | null;
}
