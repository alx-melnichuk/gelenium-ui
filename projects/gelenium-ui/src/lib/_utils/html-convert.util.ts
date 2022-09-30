export class HtmlConvertUtil {
  // Perform the conversion from 'px', 'em', 'rem', 'vh', 'vw' to 'px'.
  public static toPx(valueStr: string, fontSizeEm: number, fontSizeRem: number, screenHeight: number, screenWidth: number): number {
    let result: number = 0;
    const value = valueStr.trim().toLowerCase();
    if (value.endsWith('px')) {
      result = Number(value.replace('px', ''));
    } else if (value.endsWith('em')) {
      result = Number(value.replace('em', '')) * fontSizeEm;
    } else if (value.endsWith('rem')) {
      result = Number(value.replace('rem', '')) * fontSizeRem;
    } else if (value.endsWith('vh')) {
      result = (Number(value.replace('vh', '')) * screenHeight) / 100;
    } else if (value.endsWith('vw')) {
      result = (Number(value.replace('vw', '')) * screenWidth) / 100;
    }
    return result;
  }
}
