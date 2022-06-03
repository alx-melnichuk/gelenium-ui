export enum GlnInputType {
  color = 'color', //
  date = 'date', //
  datetimeLocal = 'datetime-local', //
  email = 'email',
  month = 'month', //
  number = 'number',
  password = 'password',
  search = 'search',
  tel = 'tel', //
  text = 'text',
  time = 'time', //
  url = 'url',
  week = 'week', //
}

export class GlnInputTypeUtil {
  public static create(value: string): GlnInputType | null {
    let result: GlnInputType | null = null;
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
