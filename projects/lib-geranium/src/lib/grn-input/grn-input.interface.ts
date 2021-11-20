export enum InputType {
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

export class InputTypeUtil {
  public static create(value: string): InputType | null {
    let result: InputType | null = null;
    switch (value) {
      case InputType.color.valueOf():
        result = InputType.color;
        break;
      case InputType.date.valueOf():
        result = InputType.date;
        break;
      case InputType.datetimeLocal.valueOf():
        result = InputType.datetimeLocal;
        break;
      case InputType.email.valueOf():
        result = InputType.email;
        break;
      case InputType.month.valueOf():
        result = InputType.month;
        break;
      case InputType.number.valueOf():
        result = InputType.number;
        break;
      case InputType.password.valueOf():
        result = InputType.password;
        break;
      case InputType.search.valueOf():
        result = InputType.search;
        break;
      case InputType.tel.valueOf():
        result = InputType.tel;
        break;
      case InputType.text.valueOf():
        result = InputType.text;
        break;
      case InputType.time.valueOf():
        result = InputType.time;
        break;
      case InputType.url.valueOf():
        result = InputType.url;
        break;
      case InputType.week.valueOf():
        result = InputType.week;
        break;
    }
    return result;
  }
}
