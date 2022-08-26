export class UrlParamUtil {
    static getPrm(url, prmName) {
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
    static addPrm(url, prmName, prmValue) {
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
    static removePrm(url, prmName) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLXBhcmFtLnV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL191dGlscy91cmwtcGFyYW0udXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sWUFBWTtJQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQVcsRUFBRSxPQUFlO1FBQy9DLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN0QixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDdkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDMUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3ZCLE1BQU07aUJBQ1A7YUFDRjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIs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SUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQy9DLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ25CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQzVCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTs0QkFDdkIsU0FBUzt5QkFDVjt3QkFDRCxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO3FCQUN0RDtpQkFDRjthQUNGO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVXJsUGFyYW1VdGlsIHtcbiAgcHVibGljIHN0YXRpYyBnZXRQcm0odXJsOiBzdHJpbmcsIHBybU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIGlmICghIXVybCAmJiAhIXBybU5hbWUpIHtcbiAgICAgIGNvbnN0IGJ1ZmYgPSB1cmwuc3BsaXQoJz8nKTtcbiAgICAgIGNvbnN0IHBybXMgPSBidWZmLmxlbmd0aCA+IDEgPyBidWZmWzFdLnNwbGl0KCcmJykgOiBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwcm0gPSBwcm1zW2ldO1xuICAgICAgICBjb25zdCBkYXRhID0gcHJtID8gcHJtLnNwbGl0KCc9JykgOiBbXTtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMSAmJiBwcm1OYW1lID09PSBkYXRhWzBdKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZGF0YVsxXSB8fCAnJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhZGRQcm0odXJsOiBzdHJpbmcsIHBybU5hbWU6IHN0cmluZywgcHJtVmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9IHVybDtcbiAgICBpZiAoISF1cmwgJiYgISFwcm1OYW1lKSB7XG4gICAgICBsZXQgaXNDaGFuZ2UgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGJ1ZmYgPSB1cmwuc3BsaXQoJz8nKTtcbiAgICAgIGNvbnN0IHBybXMgPSBidWZmLmxlbmd0aCA+IDEgPyBidWZmWzFdLnNwbGl0KCcmJykgOiBbXTtcbiAgICAgIGlmIChidWZmLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmVzdWx0ID0gYnVmZlswXSArICc/JztcbiAgICAgICAgbGV0IGogPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBybXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gcHJtc1tpXSA/IHBybXNbaV0uc3BsaXQoJz0nKSA6IFtdO1xuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGRhdGFbMV0gfHwgJyc7XG4gICAgICAgICAgICBpZiAoZGF0YVswXSA9PT0gcHJtTmFtZSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IHBybVZhbHVlO1xuICAgICAgICAgICAgICBpc0NoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgKz0gKGogPiAwID8gJyYnIDogJycpICsgZGF0YVswXSArICc9JyArIHZhbHVlO1xuICAgICAgICAgICAgaisrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFpc0NoYW5nZSkge1xuICAgICAgICBjb25zdCBjaDEgPSBwcm1zLmxlbmd0aCA9PT0gMCA/ICc/JyA6ICcnO1xuICAgICAgICByZXN1bHQgKz0gKHBybXMubGVuZ3RoID4gMCA/ICcmJyA6IGNoMSkgKyBwcm1OYW1lICsgJz0nICsgcHJtVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHJlbW92ZVBybSh1cmw6IHN0cmluZywgcHJtTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gdXJsO1xuICAgIGlmICghIXVybCAmJiAhIXBybU5hbWUpIHtcbiAgICAgIGNvbnN0IGJ1ZmYgPSB1cmwuc3BsaXQoJz8nKTtcbiAgICAgIGNvbnN0IHBybXMgPSBidWZmLmxlbmd0aCA+IDEgPyBidWZmWzFdLnNwbGl0KCcmJykgOiBbXTtcbiAgICAgIGlmIChidWZmLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmVzdWx0ID0gYnVmZlswXSArICc/JztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHBybXNbaV0gPyBwcm1zW2ldLnNwbGl0KCc9JykgOiBbXTtcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGRhdGFbMV0gfHwgJyc7XG4gICAgICAgICAgICBpZiAoZGF0YVswXSA9PT0gcHJtTmFtZSkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCArPSAoaSA+IDAgPyAnJicgOiAnJykgKyBkYXRhWzBdICsgJz0nICsgdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==