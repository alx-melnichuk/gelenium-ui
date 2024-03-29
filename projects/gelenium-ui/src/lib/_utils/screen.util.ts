export class ScreenUtil {
  public static getWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }
  public static getHeight(): number {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }
  public static getRect(): DOMRect {
    return document.documentElement.getBoundingClientRect() || document.body.getBoundingClientRect();
  }
}
