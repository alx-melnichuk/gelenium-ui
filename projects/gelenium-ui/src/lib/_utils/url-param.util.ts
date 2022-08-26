export class UrlParamUtil {
  public static getPrm(url: string, prmName: string): string {
    let result = '';
    if (!!url && !!prmName) {
      const buff = url.split('?');
      const prms = buff.length > 1 ? buff[1].split('&') : [];
      for (let i = 0; i < prms.length; i++) {
        const prm = prms[i];
        const data = prm ? prm.split('=') : [];
        if (data.length > 1 && prmName === data[0]) {
          result = data[1] || '';
          break;
        }
      }
    }
    return result;
  }

  public static addPrm(url: string, prmName: string, prmValue: string): string {
    let result = url;
    if (!!url && !!prmName) {
      let isChange = false;
      const buff = url.split('?');
      const prms = buff.length > 1 ? buff[1].split('&') : [];
      if (buff.length > 1) {
        result = buff[0] + '?';
        let j = 0;
        for (let i = 0; i < prms.length; i++) {
          const data = prms[i] ? prms[i].split('=') : [];
          if (data.length > 1) {
            let value = data[1] || '';
            if (data[0] === prmName) {
              value = prmValue;
              isChange = true;
            }
            result += (j > 0 ? '&' : '') + data[0] + '=' + value;
            j++;
          }
        }
      }
      if (!isChange) {
        const ch1 = prms.length === 0 ? '?' : '';
        result += (prms.length > 0 ? '&' : ch1) + prmName + '=' + prmValue;
      }
    }
    return result;
  }

  public static removePrm(url: string, prmName: string): string {
    let result = url;
    if (!!url && !!prmName) {
      const buff = url.split('?');
      const prms = buff.length > 1 ? buff[1].split('&') : [];
      if (buff.length > 1) {
        result = buff[0] + '?';
        for (let i = 0; i < prms.length; i++) {
          const data = prms[i] ? prms[i].split('=') : [];
          if (data.length > 1) {
            const value = data[1] || '';
            if (data[0] === prmName) {
              continue;
            }
            result += (i > 0 ? '&' : '') + data[0] + '=' + value;
          }
        }
      }
    }
    return result;
  }
}
