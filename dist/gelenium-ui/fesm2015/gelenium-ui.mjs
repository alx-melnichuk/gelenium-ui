import * as i0 from '@angular/core';
import { Injectable, NgModule, ElementRef, Directive, Input, ContentChildren, EventEmitter, Output, InjectionToken, Optional, Inject, HostListener, Component, ViewEncapsulation, ChangeDetectionStrategy, PLATFORM_ID, ViewChild, ContentChild, forwardRef } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import * as i2 from '@angular/forms';
import { FormControl, FormGroup, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs/operators';
import * as i2$1 from '@angular/cdk/overlay';
import { Overlay, CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';

class GeleniumUiService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
}
GeleniumUiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GeleniumUiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GeleniumUiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GeleniumUiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GeleniumUiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

class GeleniumUiModule {
}
GeleniumUiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GeleniumUiModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GeleniumUiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GeleniumUiModule });
GeleniumUiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GeleniumUiModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GeleniumUiModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [],
                    exports: [],
                }]
        }] });

const doUnsubscribe = (subscription) => {
    if (subscription != null && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const doUnsubscribeIfArray = (subscriptionsArray) => {
    if (Array.isArray(subscriptionsArray)) {
        subscriptionsArray.forEach(doUnsubscribe);
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AutoUnsubscribe(config = { exclude: [], includeArrays: [] }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (constructor) => {
        const originalOnDestroy = constructor.prototype.ngOnDestroy;
        const excludeProperties = config.exclude || [];
        const includePropertiesAsArrays = Array.from(new Set(config.includeArrays || []));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor.prototype.ngOnDestroy = function (...args) {
            for (const propertyName of Object.keys(this)) {
                if (excludeProperties.includes(propertyName)) {
                    continue;
                }
                const property = this[propertyName];
                if (includePropertiesAsArrays.includes(propertyName)) {
                    doUnsubscribeIfArray(property);
                }
                else {
                    doUnsubscribe(property);
                }
            }
            if (originalOnDestroy && typeof originalOnDestroy === 'function') {
                originalOnDestroy.apply(this, args);
            }
        };
    };
}

class ArrayUtil {
    /** Which elements of array "A" are included in array "B". */
    static include(arrayA, arrayB, isUnique = true) {
        const result = [];
        for (let idx = 0; idx < arrayA.length; idx++) {
            const valueA = arrayA[idx];
            if (arrayB.indexOf(valueA) > -1) {
                result.push(valueA);
            }
        }
        return isUnique && result.length > 0 ? [...new Set(result)] : result;
    }
    /** Which elements of array "A" are not included in array "B". */
    static uninclude(arrayA, arrayB, isUnique = true) {
        const result = [];
        for (let idx = 0; idx < arrayA.length; idx++) {
            const valueA = arrayA[idx];
            if (arrayB.indexOf(valueA) === -1) {
                result.push(valueA);
            }
        }
        return isUnique && result.length > 0 ? [...new Set(result)] : result;
    }
    static delete(arrayA, arrayB) {
        const result = [];
        for (let idx = 0; idx < arrayA.length; idx++) {
            if (arrayB.indexOf(arrayA[idx]) === -1) {
                result.push(arrayA[idx]);
            }
        }
        return result;
    }
}

class BooleanUtil {
    static init(value) {
        return ['', 'true'].indexOf('' + value) > -1 ? true : '' + value === 'false' ? false : null;
    }
}

class HtmlElemUtil {
    static setProperty(element, name, value) {
        if (element && element.nativeElement && name) {
            element.nativeElement.style.setProperty(name, value || null);
        }
    }
    static setClass(renderer, element, className, isAdd) {
        if (renderer && element && element.nativeElement && className) {
            if (isAdd) {
                renderer.addClass(element.nativeElement, className);
            }
            else {
                renderer.removeClass(element.nativeElement, className);
            }
        }
    }
    static setAttr(renderer, elem, name, value) {
        if (renderer && elem && elem.nativeElement && name) {
            if (value != null) {
                renderer.setAttribute(elem.nativeElement, name, value);
            }
            else {
                renderer.removeAttribute(elem.nativeElement, name);
            }
        }
    }
    static updateIfMissing(renderer, elem, name, value) {
        if (elem && name && !elem.nativeElement.getAttribute(name) && value) {
            HtmlElemUtil.setAttr(renderer, elem, name, value);
        }
    }
    static getChildByAttribute(elem, attributeList) {
        let result = null;
        const element = (elem === null || elem === void 0 ? void 0 : elem.nativeElement) || null;
        const len = attributeList.length;
        if ((element === null || element === void 0 ? void 0 : element.children) && (element === null || element === void 0 ? void 0 : element.children.length) > 0 && len > 0) {
            const count = element.children.length;
            let idx = 0;
            while (idx < count && !result) {
                const item = element.children[idx++];
                if (!item)
                    continue;
                let n = 0;
                while (n < len && !result) {
                    result = item.hasAttribute(attributeList[n++]) ? item : null;
                }
            }
        }
        return result;
    }
    static getElementRef(element) {
        return element ? new ElementRef(element) : null;
    }
    static getElementByPathClassOrTag(element, pathToElement) {
        let result = element;
        const list = (pathToElement || '').split('/');
        for (let idx = 0; idx < list.length && !!result; idx++) {
            let path = list[idx];
            if (!list[idx]) {
                continue;
            }
            let index = 0;
            const ind1 = path.indexOf('{');
            const ind2 = path.indexOf('}');
            if (ind1 > -1 && ind2 > -1 && ind1 < ind2) {
                const indStr = path.slice(ind1 + 1, ind2);
                index = Number(indStr);
                path = path.slice(0, ind1);
            }
            if (path[0] === '.') {
                result = result === null || result === void 0 ? void 0 : result.getElementsByClassName(path.slice(1, path.length))[index];
            }
            else {
                result = result === null || result === void 0 ? void 0 : result.getElementsByTagName(path)[index];
            }
        }
        return result || null;
    }
}

class NumberUtil {
    static str(value) {
        return value != null ? value.toString() : null;
    }
    static roundTo100(value) {
        return Math.round(value * 100) / 100;
    }
}

class ScreenUtil {
    static getWidth() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
    static getHeight() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
}

class UrlParamUtil {
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

class GlnAutoFocuseDirective {
    constructor(hostRef, renderer) {
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.glnAutoFocuse = null;
        this.autoFocuse = false;
        this.hasOwner = false;
    }
    get isAutoFocuse() {
        return this.autoFocuse;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    set isAutoFocuse(value) { }
    get isHasOwner() {
        return this.hasOwner;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    set isHasOwner(value) { }
    ngOnChanges(changes) {
        if (changes['glnAutoFocuse']) {
            this.autoFocuse = !!BooleanUtil.init(this.glnAutoFocuse != null ? '' + this.glnAutoFocuse : null);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'auto-focuse', this.autoFocuse ? '' : null);
        }
    }
    ngAfterViewInit() {
        if (!this.hasOwner && this.autoFocuse) {
            Promise.resolve().then(() => {
                this.focuseElement();
            });
        }
    }
    // ** Public API **
    focuseElement() {
        const isDisabled = this.hostRef.nativeElement.disabled;
        if (!isDisabled) {
            this.hostRef.nativeElement.focus();
        }
    }
    setIsHasOwner(isHasOwner) {
        this.hasOwner = isHasOwner;
    }
}
GlnAutoFocuseDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
GlnAutoFocuseDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnAutoFocuseDirective, selector: "[glnAutoFocuse]", inputs: { glnAutoFocuse: "glnAutoFocuse" }, exportAs: ["glnAutoFocuse"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnAutoFocuse]',
                    exportAs: 'glnAutoFocuse',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { glnAutoFocuse: [{
                type: Input
            }] } });

class GlnAutoFocuseOwnerDirective {
    constructor(hostRef) {
        this.hostRef = hostRef;
    }
    ngAfterContentInit() {
        var _a;
        const elem = this.list.toArray();
        for (let i = 0; i < elem.length; i++) {
            (_a = elem[i]) === null || _a === void 0 ? void 0 : _a.setIsHasOwner(true);
        }
    }
    ngAfterViewInit() {
        const elem = this.list.toArray();
        let elemAutoFocuse = null;
        for (let i = 0; i < elem.length && !elemAutoFocuse; i++) {
            if (elem[i] && elem[i].isAutoFocuse) {
                elemAutoFocuse = elem[i];
            }
        }
        if (elemAutoFocuse !== null) {
            Promise.resolve().then(() => {
                elemAutoFocuse === null || elemAutoFocuse === void 0 ? void 0 : elemAutoFocuse.focuseElement();
            });
        }
    }
}
GlnAutoFocuseOwnerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseOwnerDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
GlnAutoFocuseOwnerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnAutoFocuseOwnerDirective, selector: "[glnAutoFocuseOwner]", queries: [{ propertyName: "list", predicate: GlnAutoFocuseDirective, descendants: true }], exportAs: ["glnAutoFocuseOwner"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseOwnerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnAutoFocuseOwner]',
                    exportAs: 'glnAutoFocuseOwner',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { list: [{
                type: ContentChildren,
                args: [GlnAutoFocuseDirective, { descendants: true }]
            }] } });

class GlnAutoFocuseModule {
}
GlnAutoFocuseModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnAutoFocuseModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseModule, declarations: [GlnAutoFocuseDirective, GlnAutoFocuseOwnerDirective], imports: [CommonModule], exports: [GlnAutoFocuseDirective, GlnAutoFocuseOwnerDirective] });
GlnAutoFocuseModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnAutoFocuseModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnAutoFocuseDirective, GlnAutoFocuseOwnerDirective],
                    imports: [CommonModule],
                    exports: [GlnAutoFocuseDirective, GlnAutoFocuseOwnerDirective],
                }]
        }] });

class GlnColorDirective {
    constructor(hostRef) {
        this.hostRef = hostRef;
        this.elementRef = this.hostRef;
        this.colorClearingMap = new Map();
    }
    ngOnChanges(changes) {
        if (changes['glnColorElementRef']) {
            this.elementRef = this.glnColorElementRef || this.hostRef;
        }
        if (changes['glnColor'] && this.glnColor != null) {
            const typeColor = typeof this.glnColor;
            const maps = new Map();
            if (typeColor === 'string') {
                maps.set('default', this.glnColor);
            }
            else if (typeColor === 'object') {
                const objColors = this.glnColor;
                for (const key of Object.keys(objColors)) {
                    maps.set(key, objColors[key]);
                }
            }
            const newMaps = maps.size === 0 ? this.colorClearingMap : maps;
            this.colorClearingMap = this.settingCssProoperties(newMaps);
        }
    }
    // ** Private API **
    settingCssProoperties(maps) {
        const paramMaps = new Map();
        for (const [key, value] of maps) {
            if (value) {
                paramMaps.set(key, '');
            }
            const valueH = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-h');
            HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-h', valueH.trim());
            const valueS = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-s');
            HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-s', valueS.trim());
            const valueL = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-l');
            HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-l', valueL.trim());
            const valueCL = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-cl');
            HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-cl', valueCL.trim());
        }
        return paramMaps;
    }
}
GlnColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnColorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
GlnColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnColorDirective, selector: "[glnColor]", inputs: { glnColor: "glnColor", glnColorElementRef: "glnColorElementRef" }, exportAs: ["glnColor"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnColor]',
                    exportAs: 'glnColor',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { glnColor: [{
                type: Input
            }], glnColorElementRef: [{
                type: Input
            }] } });

class GlnColorModule {
}
GlnColorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnColorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnColorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnColorModule, declarations: [GlnColorDirective], imports: [CommonModule], exports: [GlnColorDirective] });
GlnColorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnColorModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnColorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnColorDirective],
                    imports: [CommonModule],
                    exports: [GlnColorDirective],
                }]
        }] });

var GlnButtonExterior;
(function (GlnButtonExterior) {
    GlnButtonExterior["contained"] = "contained";
    GlnButtonExterior["outlined"] = "outlined";
    GlnButtonExterior["text"] = "text";
})(GlnButtonExterior || (GlnButtonExterior = {}));
class GlnButtonExteriorUtil {
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

class GlnFrameExteriorButtonDirective {
    constructor(hostRef, renderer) {
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.glnFrameExteriorButtonChange = new EventEmitter();
        this.exterior = null;
        this.elementRef = this.hostRef;
        // ** Implementation of the GlnSizePrepareData interface. (start) **
        this.getExterior = () => {
            return this.glnFrameExteriorButton || null;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.getBorderRadius = (frameSizeValue, lineHeight) => {
            const borderRadiusRatio = 0.1;
            return (frameSizeValue > 0 ? NumberUtil.roundTo100(borderRadiusRatio * frameSizeValue) : 0) + 'px';
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.getPaddingHor = (frameSizeValue, lineHeight) => {
            const ratio = this.exterior === GlnButtonExterior.contained ? 0.3636 : this.exterior === GlnButtonExterior.outlined ? 0.3409 : 0.2045;
            const value = frameSizeValue > 0 ? NumberUtil.roundTo100(ratio * frameSizeValue) : null;
            return value !== null ? { left: value, right: value } : null;
        };
        this.getPaddingVer = (frameSizeValue, lineHeight) => {
            const param = frameSizeValue > 0 && lineHeight > 0 ? (frameSizeValue - lineHeight) / 2 : null;
            const value = param === null ? null : this.exterior === GlnButtonExterior.outlined ? param - 1 : param;
            return value !== null ? { top: value, bottom: value } : null;
        };
    }
    ngOnChanges(changes) {
        if (changes['glnFrameExteriorButtonElementRef']) {
            this.elementRef = this.glnFrameExteriorButtonElementRef || this.hostRef;
        }
        if (changes['glnFrameExteriorButton']) {
            const exteriorInp = GlnButtonExteriorUtil.convert(this.glnFrameExteriorButton || null);
            const exterior = GlnButtonExteriorUtil.create(exteriorInp);
            if (this.exterior !== exterior) {
                this.exterior = exterior;
                this.settingExterior(this.renderer, this.elementRef, exterior);
            }
            this.glnFrameExteriorButtonChange.emit();
        }
    }
    // ** Implementation of the GlnSizePrepareData interface. (finish) **
    // ** Private API **
    settingExterior(renderer, elem, exterior) {
        HtmlElemUtil.setClass(renderer, elem, 'glnbt-text', GlnButtonExteriorUtil.isText(exterior));
        HtmlElemUtil.setAttr(renderer, elem, 'ext-t', GlnButtonExteriorUtil.isText(exterior) ? '' : null);
        HtmlElemUtil.setClass(renderer, elem, 'glnbt-contained', GlnButtonExteriorUtil.isContained(exterior));
        HtmlElemUtil.setAttr(renderer, elem, 'ext-c', GlnButtonExteriorUtil.isContained(exterior) ? '' : null);
        HtmlElemUtil.setClass(renderer, elem, 'glnbt-outlined', GlnButtonExteriorUtil.isOutlined(exterior));
        HtmlElemUtil.setAttr(renderer, elem, 'ext-o', GlnButtonExteriorUtil.isOutlined(exterior) ? '' : null);
    }
}
GlnFrameExteriorButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorButtonDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
GlnFrameExteriorButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnFrameExteriorButtonDirective, selector: "[glnFrameExteriorButton]", inputs: { glnFrameExteriorButton: "glnFrameExteriorButton", glnFrameExteriorButtonElementRef: "glnFrameExteriorButtonElementRef" }, outputs: { glnFrameExteriorButtonChange: "glnFrameExteriorButtonChange" }, exportAs: ["glnFrameExteriorButton"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnFrameExteriorButton]',
                    exportAs: 'glnFrameExteriorButton',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { glnFrameExteriorButton: [{
                type: Input
            }], glnFrameExteriorButtonElementRef: [{
                type: Input
            }], glnFrameExteriorButtonChange: [{
                type: Output
            }] } });

class GlnFrameExteriorButtonModule {
}
GlnFrameExteriorButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnFrameExteriorButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorButtonModule, declarations: [GlnFrameExteriorButtonDirective], imports: [CommonModule], exports: [GlnFrameExteriorButtonDirective] });
GlnFrameExteriorButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorButtonModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnFrameExteriorButtonDirective],
                    imports: [CommonModule],
                    exports: [GlnFrameExteriorButtonDirective],
                }]
        }] });

var GlnFrameExterior;
(function (GlnFrameExterior) {
    GlnFrameExterior["standard"] = "standard";
    GlnFrameExterior["outlined"] = "outlined";
    GlnFrameExterior["underline"] = "underline";
})(GlnFrameExterior || (GlnFrameExterior = {}));
class GlnFrameExteriorUtil {
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

class GlnFrameExteriorInputDirective {
    constructor(hostRef) {
        this.hostRef = hostRef;
        this.glnFrameExteriorInputChange = new EventEmitter();
        this.exterior = GlnFrameExteriorUtil.create(null);
        this.elementRef = this.hostRef;
        // ** Implementation of the GlnSizePrepareData interface. (start) **
        this.getExterior = () => {
            return this.exterior;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.getBorderRadius = (frameSizeValue, lineHeight) => {
            let result = null;
            const radius = frameSizeValue > 0 && (this.exterior === GlnFrameExterior.outlined || this.exterior === GlnFrameExterior.underline)
                ? NumberUtil.roundTo100(frameSizeValue / 10) + 'px'
                : null;
            if (this.exterior === GlnFrameExterior.outlined) {
                result = radius;
            }
            else if (this.exterior === GlnFrameExterior.underline) {
                result = radius !== null ? radius + ' ' + radius + ' 0px 0px' : null;
            }
            else if (this.exterior === GlnFrameExterior.standard) {
                result = null;
            }
            return result;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.getPaddingHor = (frameSizeValue, lineHeight) => {
            var _a;
            let value = null;
            if (this.exterior === GlnFrameExterior.outlined) {
                value = NumberUtil.roundTo100(0.25 * frameSizeValue);
            }
            else if (this.exterior === GlnFrameExterior.underline) {
                value = NumberUtil.roundTo100(0.21428 * frameSizeValue);
            }
            else if (this.exterior === GlnFrameExterior.standard) {
                value = 0;
            }
            if (value !== null) {
                // paddingHor
                const pdLfRgShr = NumberUtil.roundTo100(2 * value * 1.33);
                HtmlElemUtil.setProperty(this.elementRef, '--glnfre-pd-shr', (_a = NumberUtil.str(pdLfRgShr)) === null || _a === void 0 ? void 0 : _a.concat('px'));
            }
            return value !== null ? { left: value, right: value } : null;
        };
        this.getPaddingVer = (frameSizeValue, lineHeight) => {
            var _a, _b;
            let result = null;
            const param = frameSizeValue > 0 && lineHeight > 0 ? frameSizeValue - lineHeight : null;
            if (param != null) {
                if (this.exterior === GlnFrameExterior.outlined) {
                    const value = param / 2;
                    result = { top: value, bottom: value };
                }
                else if (this.exterior === GlnFrameExterior.underline || this.exterior === GlnFrameExterior.standard) {
                    result = { top: param * 0.75, bottom: param * 0.25 };
                }
            }
            if (result !== null) {
                // paddingVer
                const translateY = this.translateY(this.exterior, frameSizeValue, lineHeight);
                HtmlElemUtil.setProperty(this.elementRef, '--glnfre-trn-y', (_a = NumberUtil.str(translateY)) === null || _a === void 0 ? void 0 : _a.concat('px'));
                const translateY2 = this.translate2Y(this.exterior, frameSizeValue, lineHeight);
                HtmlElemUtil.setProperty(this.elementRef, '--glnfre-trn2-y', (_b = NumberUtil.str(translateY2)) === null || _b === void 0 ? void 0 : _b.concat('px'));
            }
            return result;
        };
    }
    ngOnChanges(changes) {
        if (changes['glnFrameExteriorInputElementRef']) {
            this.elementRef = this.glnFrameExteriorInputElementRef || this.hostRef;
        }
        if (changes['glnFrameExteriorInput']) {
            const exteriorInp = GlnFrameExteriorUtil.convert(this.glnFrameExteriorInput || null);
            const exterior = GlnFrameExteriorUtil.create(exteriorInp);
            this.exterior = exterior;
            this.glnFrameExteriorInputChange.emit();
        }
    }
    // ** Implementation of the GlnSizePrepareData interface. (finish) **
    // ** Private API **
    // Determines the y transform value at the shrink position (top).
    translateY(exterior, frameSizeValue, lineHeight) {
        let result = null;
        if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
            result = NumberUtil.roundTo100(lineHeight * 0.25);
            if (exterior === GlnFrameExterior.standard) {
                result = NumberUtil.roundTo100((frameSizeValue * 0.75 - lineHeight * 1.27) * 0.4);
            }
            else if (exterior === GlnFrameExterior.outlined) {
                result = NumberUtil.roundTo100((-0.75 * lineHeight) / 2);
            }
            else if (exterior === GlnFrameExterior.underline) {
                result = NumberUtil.roundTo100((frameSizeValue * 0.757 - lineHeight * 1.257) * 0.45);
            }
        }
        return result;
    }
    // Determines the y transform value at the unshrink position (in the middle).
    translate2Y(exterior, frameSizeValue, lineHeight) {
        let result = null;
        if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
            result = NumberUtil.roundTo100((frameSizeValue - lineHeight) * (GlnFrameExterior.standard === exterior ? 0.75 : 0.5));
        }
        return result;
    }
}
GlnFrameExteriorInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorInputDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
GlnFrameExteriorInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnFrameExteriorInputDirective, selector: "[glnFrameExteriorInput]", inputs: { glnFrameExteriorInput: "glnFrameExteriorInput", glnFrameExteriorInputElementRef: "glnFrameExteriorInputElementRef" }, outputs: { glnFrameExteriorInputChange: "glnFrameExteriorInputChange" }, exportAs: ["glnFrameExteriorInput"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnFrameExteriorInput]',
                    exportAs: 'glnFrameExteriorInput',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { glnFrameExteriorInput: [{
                type: Input
            }], glnFrameExteriorInputElementRef: [{
                type: Input
            }], glnFrameExteriorInputChange: [{
                type: Output
            }] } });

class GlnFrameExteriorInputModule {
}
GlnFrameExteriorInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnFrameExteriorInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorInputModule, declarations: [GlnFrameExteriorInputDirective], imports: [CommonModule], exports: [GlnFrameExteriorInputDirective] });
GlnFrameExteriorInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorInputModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameExteriorInputModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnFrameExteriorInputDirective],
                    imports: [CommonModule],
                    exports: [GlnFrameExteriorInputDirective],
                }]
        }] });

var GlnFrameOrnamAlign;
(function (GlnFrameOrnamAlign) {
    GlnFrameOrnamAlign["default"] = "default";
    GlnFrameOrnamAlign["center"] = "center";
    GlnFrameOrnamAlign["flexStart"] = "flex-start";
    GlnFrameOrnamAlign["flexEnd"] = "flex-end";
    GlnFrameOrnamAlign["baseline"] = "baseline";
    GlnFrameOrnamAlign["stretch"] = "stretch";
})(GlnFrameOrnamAlign || (GlnFrameOrnamAlign = {}));
class GlnFrameOrnamAlignUtil {
    static create(value, defaultValue) {
        return GlnFrameOrnamAlignUtil.convert((value || defaultValue || '').toString(), GlnFrameOrnamAlign.default);
    }
    static convert(value, defaultValue = null) {
        let result = defaultValue;
        switch (value) {
            case GlnFrameOrnamAlign.default.valueOf():
                result = GlnFrameOrnamAlign.default;
                break;
            case GlnFrameOrnamAlign.center.valueOf():
                result = GlnFrameOrnamAlign.center;
                break;
            case GlnFrameOrnamAlign.flexStart.valueOf():
                result = GlnFrameOrnamAlign.flexStart;
                break;
            case GlnFrameOrnamAlign.flexEnd.valueOf():
                result = GlnFrameOrnamAlign.flexEnd;
                break;
            case GlnFrameOrnamAlign.baseline.valueOf():
                result = GlnFrameOrnamAlign.baseline;
                break;
            case GlnFrameOrnamAlign.stretch.valueOf():
                result = GlnFrameOrnamAlign.stretch;
                break;
        }
        return result;
    }
}

const ATTR_ORN_LF = 'glnfr-orn-lf';
const ATTR_ORN_RG = 'glnfr-orn-rg';
class GlnFrameOrnamentDirective {
    constructor(hostRef, renderer) {
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.isInit = true;
        this.ornamentLf = null;
        this.ornamentRg = null;
        this.ornamentLfElemRef = null;
        this.ornamentRgElemRef = null;
        this.ornamentLfWidth = 0;
        this.ornamentRgWidth = 0;
    }
    ngOnChanges(changes) {
        if (this.isInit) {
            if (!this.glnFrameOrnamentAfterContent) {
                this.initialSetting(this.hostRef.nativeElement, this.glnFrameOrnamentPath || null);
            }
            this.isInit = false;
        }
        if (changes['glnFrameOrnamentLfAlign'] && this.ornamentLfElemRef) {
            this.settingOrnamentLeft(this.renderer, this.glnFrameOrnamentLfAlign || null, this.ornamentLfElemRef);
        }
        if (changes['glnFrameOrnamentRgAlign'] && this.ornamentRgElemRef) {
            this.settingOrnamentRight(this.renderer, this.glnFrameOrnamentRgAlign || null, this.ornamentRgElemRef);
        }
    }
    ngAfterContentInit() {
        var _a, _b, _c, _d;
        if (this.glnFrameOrnamentAfterContent) {
            this.initialSetting(this.hostRef.nativeElement, this.glnFrameOrnamentPath || null);
            this.settingOrnamentLeft(this.renderer, this.glnFrameOrnamentLfAlign || null, this.ornamentLfElemRef);
            this.settingOrnamentRight(this.renderer, this.glnFrameOrnamentRgAlign || null, this.ornamentRgElemRef);
        }
        // Get the width of the ornament block.
        this.ornamentLfWidth = ((_a = this.ornamentLf) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
        this.ornamentRgWidth = ((_b = this.ornamentRg) === null || _b === void 0 ? void 0 : _b.offsetWidth) || 0;
        const elementRef = this.glnFrameOrnamentElementRef || this.hostRef;
        if (this.ornamentLfWidth > 0) {
            HtmlElemUtil.setProperty(elementRef, '--glnfro-pd-lf', (_c = NumberUtil.str(this.ornamentLfWidth)) === null || _c === void 0 ? void 0 : _c.concat('px'));
        }
        if (this.ornamentRgWidth > 0) {
            HtmlElemUtil.setProperty(elementRef, '--glnfro-pd-rg', (_d = NumberUtil.str(this.ornamentRgWidth)) === null || _d === void 0 ? void 0 : _d.concat('px'));
        }
    }
    // ** Private API **
    initialSetting(htmlElement, pathElement) {
        const element = HtmlElemUtil.getElementByPathClassOrTag(htmlElement, pathElement);
        if (element) {
            const elementRef = HtmlElemUtil.getElementRef(element);
            this.ornamentLf = HtmlElemUtil.getChildByAttribute(elementRef, [ATTR_ORN_LF]);
            this.ornamentLfElemRef = HtmlElemUtil.getElementRef(this.ornamentLf);
            this.ornamentRg = HtmlElemUtil.getChildByAttribute(elementRef, [ATTR_ORN_RG]);
            this.ornamentRgElemRef = HtmlElemUtil.getElementRef(this.ornamentRg);
        }
    }
    settingOrnamentLeft(renderer, ornamentLfAlign, leftElemRef) {
        if (leftElemRef) {
            const ornamLfAlign2 = GlnFrameOrnamAlignUtil.convert(ornamentLfAlign || null) || GlnFrameOrnamAlign.default;
            HtmlElemUtil.setAttr(renderer, leftElemRef, ATTR_ORN_LF, ornamLfAlign2.toString());
        }
    }
    settingOrnamentRight(renderer, ornamentRgAlign, rightElemRef) {
        if (rightElemRef) {
            const ornamRgAlign2 = GlnFrameOrnamAlignUtil.convert(ornamentRgAlign || null) || GlnFrameOrnamAlign.default;
            HtmlElemUtil.setAttr(renderer, rightElemRef, ATTR_ORN_RG, ornamRgAlign2.toString());
        }
    }
}
GlnFrameOrnamentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameOrnamentDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
GlnFrameOrnamentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnFrameOrnamentDirective, selector: "[glnFrameOrnament]", inputs: { glnFrameOrnamentLfAlign: "glnFrameOrnamentLfAlign", glnFrameOrnamentRgAlign: "glnFrameOrnamentRgAlign", glnFrameOrnamentElementRef: "glnFrameOrnamentElementRef", glnFrameOrnamentPath: "glnFrameOrnamentPath", glnFrameOrnamentAfterContent: "glnFrameOrnamentAfterContent" }, exportAs: ["glnFrameOrnament"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameOrnamentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnFrameOrnament]',
                    exportAs: 'glnFrameOrnament',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { glnFrameOrnamentLfAlign: [{
                type: Input
            }], glnFrameOrnamentRgAlign: [{
                type: Input
            }], glnFrameOrnamentElementRef: [{
                type: Input
            }], glnFrameOrnamentPath: [{
                type: Input
            }], glnFrameOrnamentAfterContent: [{
                type: Input
            }] } });

class GlnFrameOrnamentModule {
}
GlnFrameOrnamentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameOrnamentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnFrameOrnamentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameOrnamentModule, declarations: [GlnFrameOrnamentDirective], imports: [CommonModule], exports: [GlnFrameOrnamentDirective] });
GlnFrameOrnamentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameOrnamentModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameOrnamentModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnFrameOrnamentDirective],
                    imports: [CommonModule],
                    exports: [GlnFrameOrnamentDirective],
                }]
        }] });

var GlnFrameSize;
(function (GlnFrameSize) {
    GlnFrameSize["short"] = "short";
    GlnFrameSize["small"] = "small";
    GlnFrameSize["middle"] = "middle";
    GlnFrameSize["wide"] = "wide";
    GlnFrameSize["large"] = "large";
    GlnFrameSize["huge"] = "huge";
})(GlnFrameSize || (GlnFrameSize = {}));
var GlnFrameSizeValue;
(function (GlnFrameSizeValue) {
    GlnFrameSizeValue[GlnFrameSizeValue["short"] = 38] = "short";
    GlnFrameSizeValue[GlnFrameSizeValue["small"] = 44] = "small";
    GlnFrameSizeValue[GlnFrameSizeValue["middle"] = 50] = "middle";
    GlnFrameSizeValue[GlnFrameSizeValue["wide"] = 56] = "wide";
    GlnFrameSizeValue[GlnFrameSizeValue["large"] = 62] = "large";
    GlnFrameSizeValue[GlnFrameSizeValue["huge"] = 68] = "huge";
})(GlnFrameSizeValue || (GlnFrameSizeValue = {}));
class GlnFrameSizeUtil {
    static create(value) {
        return GlnFrameSizeUtil.convert(value ? value.toString() : null) || GlnFrameSize.middle;
    }
    static convert(value) {
        let result = null;
        switch (value) {
            case GlnFrameSize.short.valueOf():
                result = GlnFrameSize.short;
                break;
            case GlnFrameSize.small.valueOf():
                result = GlnFrameSize.small;
                break;
            case GlnFrameSize.middle.valueOf():
                result = GlnFrameSize.middle;
                break;
            case GlnFrameSize.wide.valueOf():
                result = GlnFrameSize.wide;
                break;
            case GlnFrameSize.large.valueOf():
                result = GlnFrameSize.large;
                break;
            case GlnFrameSize.huge.valueOf():
                result = GlnFrameSize.huge;
                break;
        }
        return result;
    }
    static isShort(value) {
        return GlnFrameSize.short === value;
    }
    static isSmall(value) {
        return GlnFrameSize.small === value;
    }
    static isMiddle(value) {
        return GlnFrameSize.middle === value;
    }
    static isWide(value) {
        return GlnFrameSize.wide === value;
    }
    static isLarge(value) {
        return GlnFrameSize.large === value;
    }
    static isHuge(value) {
        return GlnFrameSize.huge === value;
    }
    static getValue(frameSize) {
        let result = null;
        switch (frameSize) {
            case GlnFrameSize.short:
                result = GlnFrameSizeValue.short;
                break;
            case GlnFrameSize.small:
                result = GlnFrameSizeValue.small;
                break;
            case GlnFrameSize.middle:
                result = GlnFrameSizeValue.middle;
                break;
            case GlnFrameSize.wide:
                result = GlnFrameSizeValue.wide;
                break;
            case GlnFrameSize.large:
                result = GlnFrameSizeValue.large;
                break;
            case GlnFrameSize.huge:
                result = GlnFrameSizeValue.huge;
                break;
        }
        return result;
    }
}

class GlnFrameSizeDirective {
    constructor(hostRef) {
        this.hostRef = hostRef;
        this.glnFrameSizeChange = new EventEmitter();
        this.frameSizeValue = 0;
        this.lineHeight = 0;
        this.elementRef = this.hostRef;
        this.paddingVerHorRes = null;
        this.isBeforeInit = true;
    }
    ngOnChanges(changes) {
        if (this.isBeforeInit) {
            this.isBeforeInit = false;
        }
        if (changes['glnFrameSizeElementRef']) {
            this.elementRef = this.glnFrameSizeElementRef || this.hostRef;
        }
        if (this.lineHeight === 0) {
            this.lineHeight = this.getLineHeight(this.hostRef);
        }
        let isModify = !!changes['glnFrameSizeLabelPd'] || !!changes['glnFrameSizeModify'];
        if (changes['glnFrameSize'] || changes['glnFrameSizeValue']) {
            const frameSizeValueOld = this.frameSizeValue;
            const frameSize = GlnFrameSizeUtil.convert(this.glnFrameSize || null);
            this.frameSizeValue = GlnFrameSizeUtil.getValue(frameSize) || this.glnFrameSizeValue || 0;
            const isModifySize = this.frameSizeValue !== frameSizeValueOld;
            isModify = !isModify && isModifySize ? isModifySize : isModify;
        }
        if (isModify) {
            this.updatePaddingVerAndHor();
        }
    }
    // ** Public API **
    updatePaddingVerAndHor() {
        var _a;
        if (this.isBeforeInit) {
            return;
        }
        this.modifyBorderRadius();
        const paddingHor = this.modifyHorizontalPadding();
        const paddingVer = this.modifyverticalPadding();
        if (paddingHor !== null && paddingVer !== null) {
            this.paddingVerHorRes = Object.assign(Object.assign(Object.assign({}, paddingHor), paddingVer), {
                frameSizeValue: this.frameSizeValue,
                lineHeight: this.lineHeight,
                exterior: ((_a = this.glnFrameSizePrepare) === null || _a === void 0 ? void 0 : _a.getExterior()) || '',
            });
            this.glnFrameSizeChange.emit(this.paddingVerHorRes);
        }
    }
    // ** Private API **
    getLineHeight(elem) {
        let result = 0;
        if (elem && elem.nativeElement) {
            // Get the line height from the style set.
            const lineHeightPx = getComputedStyle(elem.nativeElement).getPropertyValue('line-height');
            result = Number(lineHeightPx.replace('px', ''));
        }
        return result;
    }
    modifyBorderRadius() {
        var _a;
        let borderRadius = null;
        if (this.frameSizeValue > 0 && this.lineHeight > 0) {
            borderRadius = ((_a = this.glnFrameSizePrepare) === null || _a === void 0 ? void 0 : _a.getBorderRadius(this.frameSizeValue, this.lineHeight)) || null;
        }
        HtmlElemUtil.setProperty(this.elementRef, '--glnfrs-br-rd', borderRadius);
    }
    modifyHorizontalPadding() {
        var _a, _b, _c;
        let paddingHorRes = null;
        if (this.frameSizeValue > 0 && this.lineHeight > 0) {
            if (this.glnFrameSizeLabelPd) {
                paddingHorRes = { left: this.glnFrameSizeLabelPd, right: this.glnFrameSizeLabelPd };
            }
            else {
                paddingHorRes = ((_a = this.glnFrameSizePrepare) === null || _a === void 0 ? void 0 : _a.getPaddingHor(this.frameSizeValue, this.lineHeight)) || null;
            }
        }
        const left = paddingHorRes && paddingHorRes.left !== null ? paddingHorRes.left : null;
        HtmlElemUtil.setProperty(this.elementRef, '--glnfrs-pd-lf', (_b = NumberUtil.str(left)) === null || _b === void 0 ? void 0 : _b.concat('px'));
        const right = paddingHorRes && paddingHorRes.right !== null ? paddingHorRes.right : null;
        HtmlElemUtil.setProperty(this.elementRef, '--glnfrs-pd-rg', (_c = NumberUtil.str(right)) === null || _c === void 0 ? void 0 : _c.concat('px'));
        return paddingHorRes;
    }
    modifyverticalPadding() {
        var _a, _b, _c;
        let paddingVerRes = null;
        if (this.frameSizeValue > 0 && this.lineHeight > 0) {
            paddingVerRes = ((_a = this.glnFrameSizePrepare) === null || _a === void 0 ? void 0 : _a.getPaddingVer(this.frameSizeValue, this.lineHeight)) || null;
            const top = paddingVerRes && paddingVerRes.top !== null ? paddingVerRes.top : null;
            HtmlElemUtil.setProperty(this.elementRef, '--glnfrs-pd-tp', (_b = NumberUtil.str(top)) === null || _b === void 0 ? void 0 : _b.concat('px'));
            const bottom = paddingVerRes && (paddingVerRes === null || paddingVerRes === void 0 ? void 0 : paddingVerRes.bottom) !== null ? paddingVerRes.bottom : null;
            HtmlElemUtil.setProperty(this.elementRef, '--glnfrs-pd-bt', (_c = NumberUtil.str(bottom)) === null || _c === void 0 ? void 0 : _c.concat('px'));
        }
        return paddingVerRes;
    }
}
GlnFrameSizeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameSizeDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
GlnFrameSizeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnFrameSizeDirective, selector: "[glnFrameSize]", inputs: { glnFrameSize: "glnFrameSize", glnFrameSizeValue: "glnFrameSizeValue", glnFrameSizeLabelPd: "glnFrameSizeLabelPd", glnFrameSizeElementRef: "glnFrameSizeElementRef", glnFrameSizePrepare: "glnFrameSizePrepare", glnFrameSizeModify: "glnFrameSizeModify" }, outputs: { glnFrameSizeChange: "glnFrameSizeChange" }, exportAs: ["glnFrameSize"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameSizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnFrameSize]',
                    exportAs: 'glnFrameSize',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { glnFrameSize: [{
                type: Input
            }], glnFrameSizeValue: [{
                type: Input
            }], glnFrameSizeLabelPd: [{
                type: Input
            }], glnFrameSizeElementRef: [{
                type: Input
            }], glnFrameSizePrepare: [{
                type: Input
            }], glnFrameSizeModify: [{
                type: Input
            }], glnFrameSizeChange: [{
                type: Output
            }] } });

class GlnFrameSizeModule {
}
GlnFrameSizeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameSizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnFrameSizeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameSizeModule, declarations: [GlnFrameSizeDirective], imports: [CommonModule], exports: [GlnFrameSizeDirective] });
GlnFrameSizeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameSizeModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameSizeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnFrameSizeDirective],
                    imports: [CommonModule],
                    exports: [GlnFrameSizeDirective],
                }]
        }] });

const GLN_NODE_INTERNAL_VALIDATOR = new InjectionToken('GLN_NODE_INTERNAL_VALIDATOR');

const REGEX_CHECK_NAME = 'regexCheck';
class GlnRegexCheckUtil {
    static create(value) {
        let result = null;
        if (value != null) {
            if (typeof value === 'string') {
                result = { [REGEX_CHECK_NAME]: value };
            }
            else if (typeof value === 'object') {
                result = {};
                const list = Object.keys(value);
                for (const key of list) {
                    if (!value[key])
                        continue;
                    result[key] = value[key];
                }
            }
        }
        return result;
    }
}

/**
 * Create a regular expression object.
 */
class RegexUtil {
    static create(value) {
        let result = null;
        const text = value === null || value === void 0 ? void 0 : value.trim();
        if (text) {
            const start = text.indexOf('/');
            const finish = text.lastIndexOf('/');
            if (start !== -1 && finish !== -1 && start !== finish) {
                const pattern = text.substring(start + 1, finish);
                const flag = text.length > finish + 1 ? text.substring(finish + 1) : undefined;
                // Regex pattern with delimiters.
                result = new RegExp(pattern, flag);
            }
            else {
                // Regex pattern without delimiters.
                result = new RegExp(text);
            }
        }
        return result;
    }
}

function regexCheckValidator(regExpVal, name) {
    return (control) => {
        const result = !control || !control.value || regExpVal.test(control.value);
        return result ? null : { [name]: { value: control.value } };
    };
}
class GlnRegexCheckDirective {
    constructor(control, nodeInternalValidator) {
        this.control = control;
        this.nodeInternalValidator = nodeInternalValidator;
        this.glnRegexCheck = null;
    }
    ngOnChanges(changes) {
        if (changes['glnRegexCheck'] && this.control && this.control.control) {
            const regexCheck = GlnRegexCheckUtil.create(this.glnRegexCheck) || {};
            const list = Object.keys(regexCheck);
            for (const name of list) {
                const regex = RegexUtil.create(regexCheck[name]);
                if (!regex)
                    continue;
                const validatorFn = regexCheckValidator(regex, name);
                this.control.control.addValidators(validatorFn);
                if (this.nodeInternalValidator != null) {
                    this.nodeInternalValidator.addValidators(validatorFn);
                }
                this.control.control.updateValueAndValidity();
            }
        }
    }
}
GlnRegexCheckDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexCheckDirective, deps: [{ token: i2.NgControl }, { token: GLN_NODE_INTERNAL_VALIDATOR, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
GlnRegexCheckDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnRegexCheckDirective, selector: "[glnRegexCheck]", inputs: { glnRegexCheck: "glnRegexCheck" }, exportAs: ["glnRegexCheck"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexCheckDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnRegexCheck]',
                    exportAs: 'glnRegexCheck',
                }]
        }], ctorParameters: function () {
        return [{ type: i2.NgControl }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [GLN_NODE_INTERNAL_VALIDATOR]
                    }] }];
    }, propDecorators: { glnRegexCheck: [{
                type: Input
            }] } });

const NAME_NUMERIC = '#numeric';
const REGEXP_NUMERIC = '^-?(\\d+)$';
const NAME_NUMERIC_EXP = '#numeric-exp';
const REGEXP_NUMERIC_EXP = '^-?[\\d.]+(?:e-?\\d*)?$';
const NAME_NUMERIC12_2 = '#numeric12_2';
const REGEXP_NUMERIC12_2 = '^-?(\\d{1,12}(\\.\\d{0,2})?|\\.\\d{0,2})$';
const REGEXP_REAL_NUMERIC = '^-?(\\d+(\\.\\d*)?|\\.\\d*)$';
class GlnRegexMatchUtil {
    static create(value) {
        let result = value ? value : null;
        const realNumeric = GlnRegexMatchUtil.isRealNumeric(value || '');
        if (value) {
            switch (value) {
                case NAME_NUMERIC:
                    result = REGEXP_NUMERIC;
                    break;
                case NAME_NUMERIC_EXP:
                    result = REGEXP_NUMERIC_EXP;
                    break;
                case NAME_NUMERIC12_2:
                    result = REGEXP_NUMERIC12_2;
                    break;
                case !realNumeric ? '!' + value : value:
                    result = REGEXP_REAL_NUMERIC;
                    if (realNumeric != null) {
                        const dimension = realNumeric.dimension;
                        const accuracy = realNumeric.accuracy;
                        if (dimension !== -1 && accuracy === -1) {
                            result = `^-?\\d{1,${dimension}}$`;
                        }
                        else if (dimension !== -1 && accuracy !== -1) {
                            result = `^-?(\\d{1,${dimension}}(\\.\\d{0,${accuracy}})?|\\.\\d{0,${accuracy}})$`;
                        }
                        else if (dimension === -1 && accuracy !== -1) {
                            result = `^-?(\\d+(\\.\\d{0,${accuracy}})?|\\.\\d{0,${accuracy}})$`;
                        }
                    }
                    break;
            }
        }
        return result;
    }
    static isRealNumeric(value) {
        let result = null;
        if (value && value.startsWith(NAME_NUMERIC)) {
            const valueText = value.substring(NAME_NUMERIC.length);
            const start = valueText.indexOf('(');
            const finish = valueText.indexOf(')');
            if (start !== -1 && start < finish) {
                const data = valueText.substring(start + 1, finish);
                const idx = data.indexOf(',');
                const separator = idx !== -1 ? idx : data.length;
                const dimension = Number(data.substring(0, separator)) || -1;
                const accuracy = Number(data.substring(separator + 1)) || -1;
                result = { dimension, accuracy };
            }
        }
        return result;
    }
}

/**
 * @description
 *
 * The "GlnRegexMatch" directive allows you to enter only those values that match the specified
 * regular expression. If the new value does not match the regular expression, then it is not
 * accepted.
 *
 * For example:
 * 1. <input type="text" [(ngModel)]="componentVaribale" name="name1" glnRegexMatch="^-?(\d+)$">
 *  [glnRegexMatch]="'^-?(\\d+)$'"
 *  glnRegexMatch="/^-?(\d+)$/i"
 *  [glnRegexMatch]="'/^-?(\\d+)$/i'"
 */
class GlnRegexMatchDirective {
    constructor(control) {
        this.control = control;
        this.glnRegexMatch = null;
        this.regex = null;
        this.initialValue = null;
        if (!control) {
            throw new Error('Required parameter NgControl is missing.');
        }
    }
    ngOnChanges(changes) {
        if (changes['glnRegexMatch']) {
            const regexStr = GlnRegexMatchUtil.create(this.glnRegexMatch);
            this.regex = RegexUtil.create(regexStr);
        }
    }
    doBeforeinput() {
        if (!!this.regex && !!this.control.control) {
            this.initialValue = this.control.control.value;
        }
    }
    doInput(event) {
        if (!!this.regex && !!this.control.control) {
            // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
            // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
            if (!!event && !event.cancelBubble) {
                const newValue = this.control.control.value;
                if (!!newValue && !this.regex.test(newValue)) {
                    // (event.target as any).value = this.initialValue;
                    // this.control.control.setValue(this.initialValue, { emitEvent: false });
                    // event.stopImmediatePropagation();
                    const value = this.initialValue;
                    const inputElement = event.target;
                    const newLen = newValue.length;
                    let start = inputElement.selectionStart;
                    inputElement.value = value;
                    this.control.control.setValue(value, { emitEvent: false });
                    const len = (value || '').length;
                    if (start != null && start > 0) {
                        start -= newLen > len ? newLen - len : 0;
                        if (start > len) {
                            start = len;
                        }
                    }
                    inputElement.selectionStart = start;
                    inputElement.selectionEnd = start;
                    event.stopImmediatePropagation();
                }
            }
            this.initialValue = null;
        }
    }
}
GlnRegexMatchDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexMatchDirective, deps: [{ token: i2.NgControl }], target: i0.ɵɵFactoryTarget.Directive });
GlnRegexMatchDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnRegexMatchDirective, selector: "[glnRegexMatch]", inputs: { glnRegexMatch: "glnRegexMatch" }, host: { listeners: { "beforeinput": "doBeforeinput()", "input": "doInput($event)" } }, exportAs: ["glnRegexMatch"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexMatchDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnRegexMatch]',
                    exportAs: 'glnRegexMatch',
                }]
        }], ctorParameters: function () { return [{ type: i2.NgControl }]; }, propDecorators: { glnRegexMatch: [{
                type: Input
            }], doBeforeinput: [{
                type: HostListener,
                args: ['beforeinput']
            }], doInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });

/**
 * @description
 *
 * The GlnRegexremove directive, when changed, removes those values that match the specified
 * regular expression.
 * The regular expression must contain those characters that should not be present in the resulting
 * string.
 * In other words, if for a character the regex check returned true, then this character is not
 * included in the resulting string.
 * This allows the required business logic to be implemented without displaying an error.
 *
 * For example:
 * For the expression "/[^\d]/gm", all non-numeric values will be removed.
 * 1. <input type="text" [(ngModel)]="componentVaribale" name="name1" glnRegexRemove="/[^\d]/gm">
 *
 * For the expression "/[^A-Za-z]/gm", all non-alphabetic values will be removed.
 * 2. <input type="text" formControlName="name2" glnRegexRemove="/[^A-Za-z]/gm">
 *
 * For the expression "/[^\dA-Za-z]/gm", all non-numeric and non-alphabetic values will be removed.
 * 3. <input type="text" formControlName="name2" glnRegexRemove="/[^\dA-Za-z]/gm">
 */
class GlnRegexRemoveDirective {
    constructor(control) {
        this.control = control;
        this.glnRegexRemove = null;
        this.regex = null;
        if (!control) {
            throw new Error('Required parameter NgControl is missing.');
        }
    }
    ngOnChanges(changes) {
        if (changes['glnRegexRemove']) {
            this.regex = RegexUtil.create(this.glnRegexRemove);
        }
    }
    doInput(event) {
        // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
        // Added Event.cancelBubble check to make sure there was  no  call to event.stopImmediatePropagation() in previous handlers.
        if (!!event && !event.cancelBubble && !!this.regex && !!this.control.control) {
            const newValue = this.control.control.value;
            const value = newValue ? newValue.replace(this.regex, '') : '';
            if (!!newValue && newValue !== value) {
                const inputElement = event.target;
                const newLen = newValue.length;
                let start = inputElement.selectionStart;
                inputElement.value = value;
                this.control.control.setValue(value, { emitEvent: false });
                const len = (value || '').length;
                if (start != null && start > 0) {
                    start -= newLen > len ? newLen - len : 0;
                    if (start > len) {
                        start = len;
                    }
                }
                inputElement.selectionStart = start;
                inputElement.selectionEnd = start;
                event.stopImmediatePropagation();
            }
        }
    }
}
GlnRegexRemoveDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexRemoveDirective, deps: [{ token: i2.NgControl }], target: i0.ɵɵFactoryTarget.Directive });
GlnRegexRemoveDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnRegexRemoveDirective, selector: "[glnRegexRemove]", inputs: { glnRegexRemove: "glnRegexRemove" }, host: { listeners: { "input": "doInput($event)" } }, exportAs: ["glnRegexRemove"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexRemoveDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[glnRegexRemove]',
                    exportAs: 'glnRegexRemove',
                }]
        }], ctorParameters: function () { return [{ type: i2.NgControl }]; }, propDecorators: { glnRegexRemove: [{
                type: Input
            }], doInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });

class GlnRegexModule {
}
GlnRegexModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnRegexModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexModule, declarations: [GlnRegexCheckDirective, GlnRegexMatchDirective, GlnRegexRemoveDirective], imports: [CommonModule], exports: [GlnRegexCheckDirective, GlnRegexMatchDirective, GlnRegexRemoveDirective] });
GlnRegexModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnRegexModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnRegexCheckDirective, GlnRegexMatchDirective, GlnRegexRemoveDirective],
                    imports: [CommonModule],
                    exports: [GlnRegexCheckDirective, GlnRegexMatchDirective, GlnRegexRemoveDirective],
                }]
        }] });

/**
 * The parent element must have css styles:
 * - position: relative;
 * - overflow: hidden;
 */
const RIPPLE_CLASS = 'glntr-ripple';
let uniqueIdCounter$6 = 0;
class GlnTouchRippleComponent {
    constructor(hostRef, document) {
        this.hostRef = hostRef;
        this.document = document;
        this.id = `glntr-${uniqueIdCounter$6++}`;
        this.isCenter = null;
        this.center = false;
    }
    doMousedown(event) {
        this.doRipple(event, this.center);
    }
    ngOnChanges(changes) {
        if (changes['isCenter']) {
            this.center = !!BooleanUtil.init(this.isCenter);
        }
    }
    // ** Public API **
    touchRipple(event, isCenter = this.center) {
        this.doRipple(event, isCenter);
    }
    // ** Private API **
    doRipple(event, isCenter) {
        const parentElement = this.hostRef.nativeElement.parentElement;
        if (!parentElement) {
            return;
        }
        const clientHeight = parentElement.clientHeight;
        const clientWidth = parentElement.clientWidth;
        if (clientHeight && clientWidth && event.currentTarget) {
            const radius = Math.min(clientWidth, clientHeight) / 2;
            const rect = event.currentTarget.getBoundingClientRect() || { left: 0, top: 0 };
            let offsetX = Math.round(event.clientX - rect.left);
            let offsetY = Math.round(event.clientY - rect.top);
            if (isCenter) {
                offsetX = Math.round(clientWidth / 2);
                offsetY = Math.round(clientHeight / 2);
            }
            const left = offsetX - radius / 2;
            const top = offsetY - radius / 2;
            const circle = this.document.createElement('span');
            circle.style.width = circle.style.height = `${radius}px`;
            circle.style.left = `${left}px`;
            circle.style.top = `${top}px`;
            circle.classList.add(RIPPLE_CLASS);
            circle.addEventListener('animationend', () => {
                var _a;
                if (this.hostRef.nativeElement.children.length > 0) {
                    (_a = this.hostRef.nativeElement.children.item(0)) === null || _a === void 0 ? void 0 : _a.remove();
                }
            }, 
            // A value of "true" indicates that the listener should be called at most once after being added.
            { once: true });
            this.hostRef.nativeElement.appendChild(circle);
            circle.addEventListener('animationcancel', () => {
                var _a;
                if (this.hostRef.nativeElement.children.length > 0) {
                    (_a = this.hostRef.nativeElement.children.item(0)) === null || _a === void 0 ? void 0 : _a.remove();
                }
            }, 
            // A value of "true" indicates that the listener should be called at most once after being added.
            { once: true });
            this.hostRef.nativeElement.appendChild(circle);
        }
    }
}
GlnTouchRippleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTouchRippleComponent, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
GlnTouchRippleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnTouchRippleComponent, selector: "gln-touch-ripple", inputs: { id: "id", isCenter: "isCenter" }, host: { listeners: { "mousedown": "doMousedown($event)" } }, exportAs: ["glnTouchRipple"], usesOnChanges: true, ngImport: i0, template: '', isInline: true, styles: ["gln-touch-ripple{display:block;overflow:hidden;position:absolute;z-index:0;inset:0px;border-radius:inherit}gln-touch-ripple:not([skip-events]){pointer-events:auto}gln-touch-ripple[skip-events]{pointer-events:none}gln-touch-ripple .glntr-ripple{position:absolute;border-radius:50%;transform:scale(0);animation:ripple .6s linear;transition:background .6s;background-color:var(--glntr-ripple-cl, rgba(255, 255, 255, .3))}@keyframes ripple{0%{opacity:1;transform:scale(0)}to{opacity:0;transform:scale(20)}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTouchRippleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-touch-ripple', exportAs: 'glnTouchRipple', template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["gln-touch-ripple{display:block;overflow:hidden;position:absolute;z-index:0;inset:0px;border-radius:inherit}gln-touch-ripple:not([skip-events]){pointer-events:auto}gln-touch-ripple[skip-events]{pointer-events:none}gln-touch-ripple .glntr-ripple{position:absolute;border-radius:50%;transform:scale(0);animation:ripple .6s linear;transition:background .6s;background-color:var(--glntr-ripple-cl, rgba(255, 255, 255, .3))}@keyframes ripple{0%{opacity:1;transform:scale(0)}to{opacity:0;transform:scale(20)}}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: Document, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }];
    }, propDecorators: { id: [{
                type: Input
            }], isCenter: [{
                type: Input
            }], doMousedown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }] } });

class GlnLinkDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GlnLinkDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnLinkDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
GlnLinkDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnLinkDirective, selector: "a", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnLinkDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: 'a',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });

const GLN_BUTTON_CONFIG = new InjectionToken('GLN_BUTTON_CONFIG');
let uniqueIdCounter$5 = 0;
class GlnButtonComponent {
    constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    platformId, rootConfig, hostRef, renderer) {
        this.platformId = platformId;
        this.rootConfig = rootConfig;
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.id = `glnbt-${uniqueIdCounter$5++}`;
        this.focused = new EventEmitter();
        this.blured = new EventEmitter();
        this.buttonElementRef = null;
        this.touchRipple = null;
        this.linkElement = null;
        this.defaultFrameSize = GlnFrameSizeUtil.getValue(GlnFrameSize.small) || 0;
        this.currConfig = null;
        this.disabled = null; // Binding attribute "isDisabled".
        this.isFocused = false;
        this.currConfig = this.rootConfig;
        HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-button', true);
    }
    ngOnChanges(changes) {
        if (changes['config']) {
            this.currConfig = Object.assign(Object.assign({}, this.rootConfig), this.config);
        }
        if (changes['isDisabled']) {
            this.disabled = BooleanUtil.init(this.isDisabled);
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled || false);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);
        }
    }
    ngOnInit() {
        HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    }
    ngAfterContentInit() {
        var _a;
        if ((_a = this.linkElement) === null || _a === void 0 ? void 0 : _a.templateRef) {
            // Add the required properties for the hyperlink element.
            HtmlElemUtil.setAttr(this.renderer, this.linkElement.templateRef, 'linkClear', '');
            HtmlElemUtil.setClass(this.renderer, this.linkElement.templateRef, 'glnbt-label', true);
        }
    }
    // ** Public API **
    doClick(event) {
        if (!!event && !event.cancelBubble && this.linkElement && this.touchRipple) {
            this.touchRipple.touchRipple(event);
        }
    }
    focus() {
        if (isPlatformBrowser(this.platformId) && !!this.buttonElementRef) {
            this.buttonElementRef.nativeElement.focus();
        }
    }
    doFocus() {
        this.isFocused = true;
        this.focusState(this.renderer, this.hostRef, this.isFocused);
        this.focused.emit();
    }
    doBlur() {
        this.isFocused = false;
        this.focusState(this.renderer, this.hostRef, this.isFocused);
        this.blured.emit();
    }
    getBoolean(value) {
        return BooleanUtil.init(value);
    }
    // ** Private API **
    focusState(renderer, elem, value) {
        HtmlElemUtil.setClass(renderer, elem, 'gln-focused', value || false);
        HtmlElemUtil.setAttr(renderer, elem, 'foc', value ? '' : null);
    }
}
GlnButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnButtonComponent, deps: [{ token: PLATFORM_ID }, { token: GLN_BUTTON_CONFIG, optional: true }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
GlnButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnButtonComponent, selector: "gln-button", inputs: { id: "id", config: "config", exterior: "exterior", frameSize: "frameSize", isDisabled: "isDisabled", isNoRipple: "isNoRipple", ornamLfAlign: "ornamLfAlign", ornamRgAlign: "ornamRgAlign" }, outputs: { focused: "focused", blured: "blured" }, queries: [{ propertyName: "linkElement", first: true, predicate: GlnLinkDirective, descendants: true, static: true }], viewQueries: [{ propertyName: "buttonElementRef", first: true, predicate: ["buttonElement"], descendants: true, static: true }, { propertyName: "touchRipple", first: true, predicate: GlnTouchRippleComponent, descendants: true }], exportAs: ["glnButton"], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"!linkElement; else elseBlockLink\">\n  <button #buttonElement\n    class=\"glnbt-btn glnbt-settings\"\n    glnbt-clear\n    glnbt-btn\n    type=\"button\"\n    [attr.id]=\"id + '_button'\"\n    [attr.disabled]=\"disabled ? '' : null\"\n    [attr.tabindex]=\"disabled ? null : 0\"\n    [glnFrameExteriorButton]=\"exterior || currConfig?.exterior\"\n    #glnFrameExteriorButton=\"glnFrameExteriorButton\"\n    [glnFrameExteriorButtonElementRef]=\"hostRef\"\n    (glnFrameExteriorButtonChange)=\"glnFrameSize.updatePaddingVerAndHor()\"\n    [glnFrameSize]=\"frameSize || currConfig?.frameSize\"\n    #glnFrameSize=\"glnFrameSize\"\n    [glnFrameSizeValue]=\"currConfig?.frameSizeValue || defaultFrameSize\"\n    [glnFrameSizeLabelPd]=\"currConfig?.labelPd\"\n    [glnFrameSizePrepare]=\"glnFrameExteriorButton\"\n    glnFrameOrnament\n    [glnFrameOrnamentLfAlign]=\"ornamLfAlign || currConfig?.ornamLfAlign\"\n    [glnFrameOrnamentRgAlign]=\"ornamRgAlign || currConfig?.ornamRgAlign\"\n    [glnFrameOrnamentAfterContent]=\"true\"\n    (focus)=\"doFocus()\"\n    (blur)=\"doBlur()\">\n    <ng-container [ngTemplateOutlet]=\"templateOrnament\">\n    </ng-container>\n    <span class=\"glnbt-label\"\n      glnbt-mr-ver\n      glnbt-pd-hor>\n      <ng-content></ng-content>\n    </span>\n    <gln-touch-ripple *ngIf=\"!disabled && !getBoolean(isNoRipple) && !currConfig?.isNoRipple\">\n    </gln-touch-ripple>\n  </button>\n</ng-container>\n<ng-template #elseBlockLink>\n  <div class=\"glnbt-btn glnbt-settings\"\n    glnbt-btn\n    [attr.id]=\"id + '_link'\"\n    [glnFrameExteriorButton]=\"exterior || currConfig?.exterior\"\n    #glnFrameExteriorButton=\"glnFrameExteriorButton\"\n    [glnFrameExteriorButtonElementRef]=\"hostRef\"\n    (glnFrameExteriorButtonChange)=\"glnFrameSize.updatePaddingVerAndHor()\"\n    [glnFrameSize]=\"frameSize || currConfig?.frameSize || null\"\n    #glnFrameSize=\"glnFrameSize\"\n    [glnFrameSizeValue]=\"currConfig?.frameSizeValue || defaultFrameSize\"\n    [glnFrameSizeLabelPd]=\"currConfig?.labelPd\"\n    [glnFrameSizePrepare]=\"glnFrameExteriorButton\"\n    glnFrameOrnament\n    [glnFrameOrnamentLfAlign]=\"ornamLfAlign || currConfig?.ornamLfAlign\"\n    [glnFrameOrnamentRgAlign]=\"ornamRgAlign || currConfig?.ornamRgAlign\"\n    [glnFrameOrnamentAfterContent]=\"true\"\n    (click)=\"doClick($event)\">\n    <ng-container [ngTemplateOutlet]=\"templateOrnament\">\n    </ng-container>\n    <ng-content select=\"a\"></ng-content>\n    <gln-touch-ripple *ngIf=\"!disabled && !getBoolean(isNoRipple) && !currConfig?.isNoRipple\"\n      skip-events>\n    </gln-touch-ripple>\n  </div>\n</ng-template>\n\n<ng-template #templateOrnament>\n  <span glnfr-orn-lf\n    class=\"gln-ornam-lf\">\n    <ng-content select=\"[gln-orn-lf]\"></ng-content>\n  </span>\n  <span glnfr-orn-rg\n    class=\"gln-ornam-rg\">\n    <ng-content select=\"[gln-orn-rg]\"></ng-content>\n  </span>\n</ng-template>", styles: ["gln-button{display:flex;height:max-content;font-weight:500;font-size:.875em;line-height:1.75;outline:none;--glnbt--default-h: var(--glncl-default-h, var(--gln-default-h));--glnbt--default-s: var(--glncl-default-s, var(--gln-default-s));--glnbt--default-bg-h: var(--glncl-default-bg-h, var(--gln-default-bg-h));--glnbt--default-bg-s: var(--glncl-default-bg-s, var(--gln-default-bg-s));--glnbt--primary-h: var(--glncl-primary-h, var(--gln-primary-h));--glnbt--primary-s: var(--glncl-primary-s, var(--gln-primary-s));--glntr-ripple-cl: var(--glntr--cl-ripple);--glnbt---def-h: var(--glnbt--primary-h);--glnbt---def-s: var(--glnbt--primary-s);--glnbt---hov-h: var(--glnbt--primary-h);--glnbt---hov-s: var(--glnbt--primary-s);--glnbt---dis-h: var(--glnbt--default-h);--glnbt---dis-s: var(--glnbt--default-s)}gln-button[wdFull]{width:100%}gln-button[ext-c]{--def-lb-pd-tp: .375em;--def-lb-pd-lf: 1em;--glntr--cl-ripple: var(--glnbt-ripple-cl, hsla(var(--glnbt--default-bg-h), var(--glnbt--default-bg-s), 100%, .3))}gln-button[ext-o]{--def-lb-pd-tp: .3125em;--def-lb-pd-lf: .9375em;--glntr--cl-ripple: var(--glnbt-ripple-cl, hsla(var(--glnbt--primary-h), var(--glnbt--primary-s), 46%, .3))}gln-button[ext-t]{--def-lb-pd-tp: .375em;--def-lb-pd-lf: .5em;--glntr--cl-ripple: var(--glnbt-ripple-cl, hsla(var(--glnbt--primary-h), var(--glnbt--primary-s), 46%, .3))}gln-button>[glnbt-clear]{-webkit-appearance:none;appearance:none;margin:0;padding:0;border:none;outline:none}gln-button>[glnbt-btn]{-webkit-tap-highlight-color:transparent;align-items:center;background-color:transparent;border-radius:var(--glnbt-br-rd, var(--glnfrs-br-rd, .25em));box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:inherit;font-weight:inherit;font-size:1em;height:max-content;justify-content:center;letter-spacing:inherit;line-height:inherit;min-width:4.571em;overflow:hidden;position:relative;text-decoration:none;text-transform:inherit;-webkit-user-select:none;user-select:none;vertical-align:middle;width:inherit}gln-button:not([dis])>[glnbt-btn]{transition:background-color .2s cubic-bezier(.4,0,.2,1) 0ms,box-shadow .2s cubic-bezier(.4,0,.2,1) 0ms,border-color .2s cubic-bezier(.4,0,.2,1) 0ms,color .2s cubic-bezier(.4,0,.2,1) 0ms}gln-button[dis]>[glnbt-btn]{cursor:default}gln-button[dis]>[glnbt-btn] a{pointer-events:none}gln-button a[linkClear]{text-decoration:none;color:inherit;cursor:inherit}gln-button[ext-c]:not([dis])>[glnbt-btn]:not(:hover):not(:active){box-shadow:var(--glnbt-elevation, 0px 3px 1px -2px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 1px 5px 0px rgba(0, 0, 0, .12))}gln-button[ext-c]:not([dis])>[glnbt-btn]:hover{box-shadow:var(--glnbt-elevation, 0px 2px 4px -1px rgba(0, 0, 0, .2), 0px 4px 5px 0px rgba(0, 0, 0, .14), 0px 1px 10px 0px rgba(0, 0, 0, .12))}gln-button[ext-c]:not([dis])>[glnbt-btn]:active{box-shadow:var(--glnbt-elevation, 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12))}gln-button[ext-c]{--glnbt--lb-cl-def: hsl(var(--glnbt--default-bg-h), var(--glnbt--default-bg-s), 100%);--glnbt--bg-cl-def: hsl(var(--glnbt---def-h), var(--glnbt---def-s), 50%);--glnbt--lb-cl-hov: hsl(var(--glnbt--default-bg-h), var(--glnbt--default-bg-s), 100%);--glnbt--bg-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 40%);--glnbt--lb-cl-dis: hsl(var(--glnbt---dis-h), var(--glnbt---dis-s), 65%);--glnbt--bg-cl-dis: hsl(var(--glnbt---dis-h), var(--glnbt---dis-s), 90%)}gln-button[ext-o]>[glnbt-btn]{border-width:1px;border-style:solid}gln-button[ext-o]{--glnbt--lb-cl-def: hsl(var(--glnbt---def-h), var(--glnbt---def-s), 50%);--glnbt--br-cl-def: hsl(var(--glnbt---def-h), var(--glnbt---def-s), 70%);--glnbt--lb-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 50%);--glnbt--br-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 50%);--glnbt--bg-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 95%);--glnbt--lb-cl-dis: hsl(var(--glnbt---dis-h), var(--glnbt---dis-s), 65%);--glnbt--br-cl-dis: hsl(var(--glnbt---dis-h), var(--glnbt---dis-s), 75%)}gln-button[ext-t]{--glnbt--lb-cl-def: hsl(var(--glnbt---def-h), var(--glnbt---def-s), 50%);--glnbt--lb-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 50%);--glnbt--bg-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 95%);--glnbt--lb-cl-dis: hsl(var(--glnbt---dis-h), var(--glnbt---dis-s), 65%)}gln-button:not([dis])>[glnbt-btn]:not(:hover):not(:focus):not(:focus-within):not([foc]){--glnbt--label-cl: var(--glnbt-def-lb-cl, var(--glnbt--lb-cl-def));--glnbt--border-cl: var(--glnbt-def-br-cl, var(--glnbt--br-cl-def));--glnbt--bground-cl: var(--glnbt-def-bg-cl, var(--glnbt--bg-cl-def))}gln-button:not([dis])>[glnbt-btn]:hover,gln-button:not([dis])>[glnbt-btn]:hover:focus,gln-button:not([dis])>[glnbt-btn]:hover:focus-within,gln-button:not([dis])>[glnbt-btn]:hover[foc]{--glnbt--label-cl: var(--glnbt-hov-lb-cl, var(--glnbt--lb-cl-hov));--glnbt--border-cl: var(--glnbt-hov-br-cl, var(--glnbt--br-cl-hov));--glnbt--bground-cl: var(--glnbt-hov-bg-cl, var(--glnbt--bg-cl-hov))}gln-button:not([dis])>[glnbt-btn]:focus,gln-button:not([dis])>[glnbt-btn]:focus-within,gln-button:not([dis])>[glnbt-btn][foc]{--glnbt--label-cl: var(--glnbt-foc-lb-cl, var(--glnbt-def-lb-cl, var(--glnbt--lb-cl-def)));--glnbt--border-cl: var(--glnbt-foc-br-cl, var(--glnbt-def-br-cl, var(--glnbt--br-cl-def)));--glnbt--bground-cl: var(--glnbt-foc-bg-cl, var(--glnbt-def-bg-cl, var(--glnbt--bg-cl-def)))}gln-button[dis]>[glnbt-btn]{--glnbt--label-cl: var(--glnbt-dis-lb-cl, var(--glnbt--lb-cl-dis));--glnbt--border-cl: var(--glnbt-dis-br-cl, var(--glnbt--br-cl-dis));--glnbt--bground-cl: var(--glnbt-dis-bg-cl, var(--glnbt--bg-cl-dis))}gln-button>[glnbt-btn]{color:var(--glnbt--label-cl);border-color:var(--glnbt--border-cl);background-color:var(--glnbt--bground-cl)}gln-button>[glnbt-btn]>span,gln-button>[glnbt-btn]>a{text-transform:var(--glnbt-uppercase, uppercase)}gln-button>[glnbt-btn]>a:not([glnbt-mr-ver]){line-height:inherit;display:flex;align-items:center;padding-top:var(--glnbt-lb-pd-tp, var(--glnfrs-pd-tp, var(--def-lb-pd-tp)));padding-bottom:var(--glnbt-lb-pd-bt, var(--glnfrs-pd-bt, var(--def-lb-pd-tp)))}gln-button>[glnbt-btn]>[glnbt-mr-ver]{line-height:inherit;display:flex;align-items:center;margin-top:var(--glnbt-lb-pd-tp, var(--glnfrs-pd-tp, var(--def-lb-pd-tp)));margin-bottom:var(--glnbt-lb-pd-bt, var(--glnfrs-pd-bt, var(--def-lb-pd-tp)))}gln-button>[glnbt-btn]>span[glnfr-orn-lf],gln-button>[glnbt-btn]>span[glnfr-orn-rg]{max-height:inherit;display:inline-flex}gln-button>[glnbt-btn]>span[glnfr-orn-rg]{order:1}gln-button>[glnbt-btn]>span[glnfr-orn-lf]:empty~[glnbt-pd-hor],gln-button>[glnbt-btn]>span[glnfr-orn-lf]:empty~a{padding-left:var(--glnbt-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf)))}gln-button>[glnbt-btn]>span[glnfr-orn-rg]:empty~[glnbt-pd-hor],gln-button>[glnbt-btn]>span[glnfr-orn-rg]:empty~a{padding-right:var(--glnbt-lb-pd-rg, var(--glnfrs-pd-rg, var(--def-lb-pd-lf)))}gln-button>[glnbt-btn]>span[glnfr-orn-lf=center],gln-button>[glnbt-btn]>span[glnfr-orn-rg=center]{align-self:center}gln-button>[glnbt-btn]>span[glnfr-orn-lf=flex-start],gln-button>[glnbt-btn]>span[glnfr-orn-rg=flex-start]{align-self:flex-start}gln-button>[glnbt-btn]>span[glnfr-orn-lf=flex-end],gln-button>[glnbt-btn]>span[glnfr-orn-rg=flex-end]{align-self:flex-end}gln-button>[glnbt-btn]>span[glnfr-orn-lf=baseline],gln-button>[glnbt-btn]>span[glnfr-orn-rg=baseline]{align-self:baseline}gln-button>[glnbt-btn]>span[glnfr-orn-lf=stretch],gln-button>[glnbt-btn]>span[glnfr-orn-rg=stretch]{align-self:stretch}gln-button>[glnbt-btn]>span[glnfr-orn-lf=default],gln-button>[glnbt-btn]>span[glnfr-orn-rg=default]{align-self:center}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: GlnFrameExteriorButtonDirective, selector: "[glnFrameExteriorButton]", inputs: ["glnFrameExteriorButton", "glnFrameExteriorButtonElementRef"], outputs: ["glnFrameExteriorButtonChange"], exportAs: ["glnFrameExteriorButton"] }, { kind: "directive", type: GlnFrameOrnamentDirective, selector: "[glnFrameOrnament]", inputs: ["glnFrameOrnamentLfAlign", "glnFrameOrnamentRgAlign", "glnFrameOrnamentElementRef", "glnFrameOrnamentPath", "glnFrameOrnamentAfterContent"], exportAs: ["glnFrameOrnament"] }, { kind: "directive", type: GlnFrameSizeDirective, selector: "[glnFrameSize]", inputs: ["glnFrameSize", "glnFrameSizeValue", "glnFrameSizeLabelPd", "glnFrameSizeElementRef", "glnFrameSizePrepare", "glnFrameSizeModify"], outputs: ["glnFrameSizeChange"], exportAs: ["glnFrameSize"] }, { kind: "component", type: GlnTouchRippleComponent, selector: "gln-touch-ripple", inputs: ["id", "isCenter"], exportAs: ["glnTouchRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-button', exportAs: 'glnButton', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"!linkElement; else elseBlockLink\">\n  <button #buttonElement\n    class=\"glnbt-btn glnbt-settings\"\n    glnbt-clear\n    glnbt-btn\n    type=\"button\"\n    [attr.id]=\"id + '_button'\"\n    [attr.disabled]=\"disabled ? '' : null\"\n    [attr.tabindex]=\"disabled ? null : 0\"\n    [glnFrameExteriorButton]=\"exterior || currConfig?.exterior\"\n    #glnFrameExteriorButton=\"glnFrameExteriorButton\"\n    [glnFrameExteriorButtonElementRef]=\"hostRef\"\n    (glnFrameExteriorButtonChange)=\"glnFrameSize.updatePaddingVerAndHor()\"\n    [glnFrameSize]=\"frameSize || currConfig?.frameSize\"\n    #glnFrameSize=\"glnFrameSize\"\n    [glnFrameSizeValue]=\"currConfig?.frameSizeValue || defaultFrameSize\"\n    [glnFrameSizeLabelPd]=\"currConfig?.labelPd\"\n    [glnFrameSizePrepare]=\"glnFrameExteriorButton\"\n    glnFrameOrnament\n    [glnFrameOrnamentLfAlign]=\"ornamLfAlign || currConfig?.ornamLfAlign\"\n    [glnFrameOrnamentRgAlign]=\"ornamRgAlign || currConfig?.ornamRgAlign\"\n    [glnFrameOrnamentAfterContent]=\"true\"\n    (focus)=\"doFocus()\"\n    (blur)=\"doBlur()\">\n    <ng-container [ngTemplateOutlet]=\"templateOrnament\">\n    </ng-container>\n    <span class=\"glnbt-label\"\n      glnbt-mr-ver\n      glnbt-pd-hor>\n      <ng-content></ng-content>\n    </span>\n    <gln-touch-ripple *ngIf=\"!disabled && !getBoolean(isNoRipple) && !currConfig?.isNoRipple\">\n    </gln-touch-ripple>\n  </button>\n</ng-container>\n<ng-template #elseBlockLink>\n  <div class=\"glnbt-btn glnbt-settings\"\n    glnbt-btn\n    [attr.id]=\"id + '_link'\"\n    [glnFrameExteriorButton]=\"exterior || currConfig?.exterior\"\n    #glnFrameExteriorButton=\"glnFrameExteriorButton\"\n    [glnFrameExteriorButtonElementRef]=\"hostRef\"\n    (glnFrameExteriorButtonChange)=\"glnFrameSize.updatePaddingVerAndHor()\"\n    [glnFrameSize]=\"frameSize || currConfig?.frameSize || null\"\n    #glnFrameSize=\"glnFrameSize\"\n    [glnFrameSizeValue]=\"currConfig?.frameSizeValue || defaultFrameSize\"\n    [glnFrameSizeLabelPd]=\"currConfig?.labelPd\"\n    [glnFrameSizePrepare]=\"glnFrameExteriorButton\"\n    glnFrameOrnament\n    [glnFrameOrnamentLfAlign]=\"ornamLfAlign || currConfig?.ornamLfAlign\"\n    [glnFrameOrnamentRgAlign]=\"ornamRgAlign || currConfig?.ornamRgAlign\"\n    [glnFrameOrnamentAfterContent]=\"true\"\n    (click)=\"doClick($event)\">\n    <ng-container [ngTemplateOutlet]=\"templateOrnament\">\n    </ng-container>\n    <ng-content select=\"a\"></ng-content>\n    <gln-touch-ripple *ngIf=\"!disabled && !getBoolean(isNoRipple) && !currConfig?.isNoRipple\"\n      skip-events>\n    </gln-touch-ripple>\n  </div>\n</ng-template>\n\n<ng-template #templateOrnament>\n  <span glnfr-orn-lf\n    class=\"gln-ornam-lf\">\n    <ng-content select=\"[gln-orn-lf]\"></ng-content>\n  </span>\n  <span glnfr-orn-rg\n    class=\"gln-ornam-rg\">\n    <ng-content select=\"[gln-orn-rg]\"></ng-content>\n  </span>\n</ng-template>", styles: ["gln-button{display:flex;height:max-content;font-weight:500;font-size:.875em;line-height:1.75;outline:none;--glnbt--default-h: var(--glncl-default-h, var(--gln-default-h));--glnbt--default-s: var(--glncl-default-s, var(--gln-default-s));--glnbt--default-bg-h: var(--glncl-default-bg-h, var(--gln-default-bg-h));--glnbt--default-bg-s: var(--glncl-default-bg-s, var(--gln-default-bg-s));--glnbt--primary-h: var(--glncl-primary-h, var(--gln-primary-h));--glnbt--primary-s: var(--glncl-primary-s, var(--gln-primary-s));--glntr-ripple-cl: var(--glntr--cl-ripple);--glnbt---def-h: var(--glnbt--primary-h);--glnbt---def-s: var(--glnbt--primary-s);--glnbt---hov-h: var(--glnbt--primary-h);--glnbt---hov-s: var(--glnbt--primary-s);--glnbt---dis-h: var(--glnbt--default-h);--glnbt---dis-s: var(--glnbt--default-s)}gln-button[wdFull]{width:100%}gln-button[ext-c]{--def-lb-pd-tp: .375em;--def-lb-pd-lf: 1em;--glntr--cl-ripple: var(--glnbt-ripple-cl, hsla(var(--glnbt--default-bg-h), var(--glnbt--default-bg-s), 100%, .3))}gln-button[ext-o]{--def-lb-pd-tp: .3125em;--def-lb-pd-lf: .9375em;--glntr--cl-ripple: var(--glnbt-ripple-cl, hsla(var(--glnbt--primary-h), var(--glnbt--primary-s), 46%, .3))}gln-button[ext-t]{--def-lb-pd-tp: .375em;--def-lb-pd-lf: .5em;--glntr--cl-ripple: var(--glnbt-ripple-cl, hsla(var(--glnbt--primary-h), var(--glnbt--primary-s), 46%, .3))}gln-button>[glnbt-clear]{-webkit-appearance:none;appearance:none;margin:0;padding:0;border:none;outline:none}gln-button>[glnbt-btn]{-webkit-tap-highlight-color:transparent;align-items:center;background-color:transparent;border-radius:var(--glnbt-br-rd, var(--glnfrs-br-rd, .25em));box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:inherit;font-weight:inherit;font-size:1em;height:max-content;justify-content:center;letter-spacing:inherit;line-height:inherit;min-width:4.571em;overflow:hidden;position:relative;text-decoration:none;text-transform:inherit;-webkit-user-select:none;user-select:none;vertical-align:middle;width:inherit}gln-button:not([dis])>[glnbt-btn]{transition:background-color .2s cubic-bezier(.4,0,.2,1) 0ms,box-shadow .2s cubic-bezier(.4,0,.2,1) 0ms,border-color .2s cubic-bezier(.4,0,.2,1) 0ms,color .2s cubic-bezier(.4,0,.2,1) 0ms}gln-button[dis]>[glnbt-btn]{cursor:default}gln-button[dis]>[glnbt-btn] a{pointer-events:none}gln-button a[linkClear]{text-decoration:none;color:inherit;cursor:inherit}gln-button[ext-c]:not([dis])>[glnbt-btn]:not(:hover):not(:active){box-shadow:var(--glnbt-elevation, 0px 3px 1px -2px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 1px 5px 0px rgba(0, 0, 0, .12))}gln-button[ext-c]:not([dis])>[glnbt-btn]:hover{box-shadow:var(--glnbt-elevation, 0px 2px 4px -1px rgba(0, 0, 0, .2), 0px 4px 5px 0px rgba(0, 0, 0, .14), 0px 1px 10px 0px rgba(0, 0, 0, .12))}gln-button[ext-c]:not([dis])>[glnbt-btn]:active{box-shadow:var(--glnbt-elevation, 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12))}gln-button[ext-c]{--glnbt--lb-cl-def: hsl(var(--glnbt--default-bg-h), var(--glnbt--default-bg-s), 100%);--glnbt--bg-cl-def: hsl(var(--glnbt---def-h), var(--glnbt---def-s), 50%);--glnbt--lb-cl-hov: hsl(var(--glnbt--default-bg-h), var(--glnbt--default-bg-s), 100%);--glnbt--bg-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 40%);--glnbt--lb-cl-dis: hsl(var(--glnbt---dis-h), var(--glnbt---dis-s), 65%);--glnbt--bg-cl-dis: hsl(var(--glnbt---dis-h), var(--glnbt---dis-s), 90%)}gln-button[ext-o]>[glnbt-btn]{border-width:1px;border-style:solid}gln-button[ext-o]{--glnbt--lb-cl-def: hsl(var(--glnbt---def-h), var(--glnbt---def-s), 50%);--glnbt--br-cl-def: hsl(var(--glnbt---def-h), var(--glnbt---def-s), 70%);--glnbt--lb-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 50%);--glnbt--br-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 50%);--glnbt--bg-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 95%);--glnbt--lb-cl-dis: hsl(var(--glnbt---dis-h), var(--glnbt---dis-s), 65%);--glnbt--br-cl-dis: hsl(var(--glnbt---dis-h), var(--glnbt---dis-s), 75%)}gln-button[ext-t]{--glnbt--lb-cl-def: hsl(var(--glnbt---def-h), var(--glnbt---def-s), 50%);--glnbt--lb-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 50%);--glnbt--bg-cl-hov: hsl(var(--glnbt---hov-h), var(--glnbt---hov-s), 95%);--glnbt--lb-cl-dis: hsl(var(--glnbt---dis-h), var(--glnbt---dis-s), 65%)}gln-button:not([dis])>[glnbt-btn]:not(:hover):not(:focus):not(:focus-within):not([foc]){--glnbt--label-cl: var(--glnbt-def-lb-cl, var(--glnbt--lb-cl-def));--glnbt--border-cl: var(--glnbt-def-br-cl, var(--glnbt--br-cl-def));--glnbt--bground-cl: var(--glnbt-def-bg-cl, var(--glnbt--bg-cl-def))}gln-button:not([dis])>[glnbt-btn]:hover,gln-button:not([dis])>[glnbt-btn]:hover:focus,gln-button:not([dis])>[glnbt-btn]:hover:focus-within,gln-button:not([dis])>[glnbt-btn]:hover[foc]{--glnbt--label-cl: var(--glnbt-hov-lb-cl, var(--glnbt--lb-cl-hov));--glnbt--border-cl: var(--glnbt-hov-br-cl, var(--glnbt--br-cl-hov));--glnbt--bground-cl: var(--glnbt-hov-bg-cl, var(--glnbt--bg-cl-hov))}gln-button:not([dis])>[glnbt-btn]:focus,gln-button:not([dis])>[glnbt-btn]:focus-within,gln-button:not([dis])>[glnbt-btn][foc]{--glnbt--label-cl: var(--glnbt-foc-lb-cl, var(--glnbt-def-lb-cl, var(--glnbt--lb-cl-def)));--glnbt--border-cl: var(--glnbt-foc-br-cl, var(--glnbt-def-br-cl, var(--glnbt--br-cl-def)));--glnbt--bground-cl: var(--glnbt-foc-bg-cl, var(--glnbt-def-bg-cl, var(--glnbt--bg-cl-def)))}gln-button[dis]>[glnbt-btn]{--glnbt--label-cl: var(--glnbt-dis-lb-cl, var(--glnbt--lb-cl-dis));--glnbt--border-cl: var(--glnbt-dis-br-cl, var(--glnbt--br-cl-dis));--glnbt--bground-cl: var(--glnbt-dis-bg-cl, var(--glnbt--bg-cl-dis))}gln-button>[glnbt-btn]{color:var(--glnbt--label-cl);border-color:var(--glnbt--border-cl);background-color:var(--glnbt--bground-cl)}gln-button>[glnbt-btn]>span,gln-button>[glnbt-btn]>a{text-transform:var(--glnbt-uppercase, uppercase)}gln-button>[glnbt-btn]>a:not([glnbt-mr-ver]){line-height:inherit;display:flex;align-items:center;padding-top:var(--glnbt-lb-pd-tp, var(--glnfrs-pd-tp, var(--def-lb-pd-tp)));padding-bottom:var(--glnbt-lb-pd-bt, var(--glnfrs-pd-bt, var(--def-lb-pd-tp)))}gln-button>[glnbt-btn]>[glnbt-mr-ver]{line-height:inherit;display:flex;align-items:center;margin-top:var(--glnbt-lb-pd-tp, var(--glnfrs-pd-tp, var(--def-lb-pd-tp)));margin-bottom:var(--glnbt-lb-pd-bt, var(--glnfrs-pd-bt, var(--def-lb-pd-tp)))}gln-button>[glnbt-btn]>span[glnfr-orn-lf],gln-button>[glnbt-btn]>span[glnfr-orn-rg]{max-height:inherit;display:inline-flex}gln-button>[glnbt-btn]>span[glnfr-orn-rg]{order:1}gln-button>[glnbt-btn]>span[glnfr-orn-lf]:empty~[glnbt-pd-hor],gln-button>[glnbt-btn]>span[glnfr-orn-lf]:empty~a{padding-left:var(--glnbt-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf)))}gln-button>[glnbt-btn]>span[glnfr-orn-rg]:empty~[glnbt-pd-hor],gln-button>[glnbt-btn]>span[glnfr-orn-rg]:empty~a{padding-right:var(--glnbt-lb-pd-rg, var(--glnfrs-pd-rg, var(--def-lb-pd-lf)))}gln-button>[glnbt-btn]>span[glnfr-orn-lf=center],gln-button>[glnbt-btn]>span[glnfr-orn-rg=center]{align-self:center}gln-button>[glnbt-btn]>span[glnfr-orn-lf=flex-start],gln-button>[glnbt-btn]>span[glnfr-orn-rg=flex-start]{align-self:flex-start}gln-button>[glnbt-btn]>span[glnfr-orn-lf=flex-end],gln-button>[glnbt-btn]>span[glnfr-orn-rg=flex-end]{align-self:flex-end}gln-button>[glnbt-btn]>span[glnfr-orn-lf=baseline],gln-button>[glnbt-btn]>span[glnfr-orn-rg=baseline]{align-self:baseline}gln-button>[glnbt-btn]>span[glnfr-orn-lf=stretch],gln-button>[glnbt-btn]>span[glnfr-orn-rg=stretch]{align-self:stretch}gln-button>[glnbt-btn]>span[glnfr-orn-lf=default],gln-button>[glnbt-btn]>span[glnfr-orn-rg=default]{align-self:center}\n"] }]
        }], ctorParameters: function () {
        return [{ type: Object, decorators: [{
                        type: Inject,
                        args: [PLATFORM_ID]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [GLN_BUTTON_CONFIG]
                    }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }];
    }, propDecorators: { id: [{
                type: Input
            }], config: [{
                type: Input
            }], exterior: [{
                type: Input
            }], frameSize: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isNoRipple: [{
                type: Input
            }], ornamLfAlign: [{
                type: Input
            }], ornamRgAlign: [{
                type: Input
            }], focused: [{
                type: Output
            }], blured: [{
                type: Output
            }], buttonElementRef: [{
                type: ViewChild,
                args: ['buttonElement', { static: true }]
            }], touchRipple: [{
                type: ViewChild,
                args: [GlnTouchRippleComponent, { static: false }]
            }], linkElement: [{
                type: ContentChild,
                args: [GlnLinkDirective, { static: true }]
            }] } });

class GlnTouchRippleModule {
}
GlnTouchRippleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTouchRippleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnTouchRippleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnTouchRippleModule, declarations: [GlnTouchRippleComponent], imports: [CommonModule], exports: [GlnTouchRippleComponent] });
GlnTouchRippleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTouchRippleModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTouchRippleModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnTouchRippleComponent],
                    imports: [CommonModule],
                    exports: [GlnTouchRippleComponent],
                }]
        }] });

class GlnButtonModule {
}
GlnButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnButtonModule, declarations: [GlnButtonComponent, GlnLinkDirective], imports: [CommonModule, GlnFrameExteriorButtonModule, GlnFrameOrnamentModule, GlnFrameSizeModule, GlnTouchRippleModule], exports: [GlnButtonComponent, GlnLinkDirective] });
GlnButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnButtonModule, imports: [CommonModule, GlnFrameExteriorButtonModule, GlnFrameOrnamentModule, GlnFrameSizeModule, GlnTouchRippleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnButtonComponent, GlnLinkDirective],
                    imports: [CommonModule, GlnFrameExteriorButtonModule, GlnFrameOrnamentModule, GlnFrameSizeModule, GlnTouchRippleModule],
                    exports: [GlnButtonComponent, GlnLinkDirective],
                }]
        }] });

const GLN_FRAME_CONFIG = new InjectionToken('GLN_FRAME_CONFIG');
class GlnFrameComponent {
    constructor(rootConfig, hostRef, renderer) {
        this.rootConfig = rootConfig;
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.isFilled = false;
        this.currConfig = null;
        this.frameExterior = null;
        this.labelShrink = null;
        this.noAnimation = null;
        this.noLabel = null;
        this.currConfig = this.rootConfig;
        HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-frame', true);
    }
    get isOutlinedExterior() {
        return GlnFrameExterior.outlined === this.exterior;
    }
    get isUnderlineExterior() {
        return GlnFrameExterior.underline === this.exterior;
    }
    get isStandardExterior() {
        return GlnFrameExterior.standard === this.exterior;
    }
    ngOnChanges(changes) {
        var _a, _b, _c;
        if (changes['config']) {
            this.currConfig = Object.assign(Object.assign({}, this.rootConfig), this.config);
        }
        if (changes['exterior']) {
            this.frameExterior = GlnFrameExteriorUtil.convert(this.exterior || null);
            this.settingExterior(this.renderer, this.hostRef, this.frameExterior);
        }
        if (changes['isDisabled']) {
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!this.isDisabled);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled ? '' : null);
        }
        if (changes['isError']) {
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-error', !!this.isError);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.isError ? '' : null);
        }
        if (changes['isFilled']) {
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-filled', this.isFilled);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'fil', this.isFilled ? '' : null);
        }
        if (changes['isLabelShrink'] || (changes['config'] && this.isLabelShrink == null)) {
            this.labelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!((_a = this.currConfig) === null || _a === void 0 ? void 0 : _a.isLabelShrink);
            this.settingLabelShrink(this.renderer, this.hostRef, this.labelShrink);
        }
        if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null)) {
            this.noAnimation = this.isNoAnimation != null ? this.isNoAnimation : !!((_b = this.currConfig) === null || _b === void 0 ? void 0 : _b.isNoAnimation);
            this.settingNoAnimation(this.renderer, this.hostRef, this.noAnimation);
        }
        if (changes['isNoLabel'] || (changes['config'] && this.isNoLabel == null)) {
            this.noLabel = this.isNoLabel != null ? this.isNoLabel : !!((_c = this.currConfig) === null || _c === void 0 ? void 0 : _c.isNoLabel);
            this.settingNoLabel(this.renderer, this.hostRef, this.noLabel);
        }
        if (changes['label'] || changes['isRequired']) {
            const isIndent = !!this.label || this.isRequired;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'glnfr-lgn-indent', !!isIndent);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'ind', isIndent ? '' : null);
        }
    }
    ngOnInit() {
        var _a, _b, _c;
        if (this.labelShrink == null) {
            this.labelShrink = this.isLabelShrink != null ? this.isLabelShrink : !!((_a = this.currConfig) === null || _a === void 0 ? void 0 : _a.isLabelShrink);
            this.settingLabelShrink(this.renderer, this.hostRef, this.labelShrink);
        }
        if (this.noAnimation == null) {
            this.noAnimation = this.isNoAnimation != null ? this.isNoAnimation : !!((_b = this.currConfig) === null || _b === void 0 ? void 0 : _b.isNoAnimation);
            this.settingNoAnimation(this.renderer, this.hostRef, this.noAnimation);
        }
        if (this.noLabel == null) {
            this.noLabel = this.isNoLabel != null ? this.isNoLabel : !!((_c = this.currConfig) === null || _c === void 0 ? void 0 : _c.isNoLabel);
            this.settingNoLabel(this.renderer, this.hostRef, this.noLabel);
        }
    }
    // ** Public API **
    // ** Private API **
    settingExterior(renderer, elem, exterior) {
        HtmlElemUtil.setClass(renderer, elem, 'glnfr-outlined', GlnFrameExteriorUtil.isOutlined(exterior));
        HtmlElemUtil.setAttr(renderer, elem, 'ext-o', GlnFrameExteriorUtil.isOutlined(exterior) ? '' : null);
        HtmlElemUtil.setClass(renderer, elem, 'glnfr-underline', GlnFrameExteriorUtil.isUnderline(exterior));
        HtmlElemUtil.setAttr(renderer, elem, 'ext-u', GlnFrameExteriorUtil.isUnderline(exterior) ? '' : null);
        HtmlElemUtil.setClass(renderer, elem, 'glnfr-standard', GlnFrameExteriorUtil.isStandard(exterior));
        HtmlElemUtil.setAttr(renderer, elem, 'ext-s', GlnFrameExteriorUtil.isStandard(exterior) ? '' : null);
        const isBorder = GlnFrameExteriorUtil.isStandard(exterior) || GlnFrameExteriorUtil.isUnderline(exterior);
        HtmlElemUtil.setClass(renderer, elem, 'glnfr-bottom-frame', isBorder);
    }
    settingLabelShrink(renderer, elem, isLabelShrink) {
        HtmlElemUtil.setClass(renderer, elem, 'glnfr-shrink', isLabelShrink);
        HtmlElemUtil.setAttr(renderer, elem, 'shr', isLabelShrink ? '' : null);
    }
    settingNoAnimation(renderer, elem, isNoAnimation) {
        HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', isNoAnimation);
        HtmlElemUtil.setAttr(renderer, elem, 'noAnm', isNoAnimation ? '' : null);
    }
    settingNoLabel(renderer, elem, noLabel) {
        HtmlElemUtil.setClass(renderer, elem, 'glnfr-no-label', noLabel);
        HtmlElemUtil.setAttr(renderer, elem, 'no-lb', noLabel ? '' : null);
    }
}
GlnFrameComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameComponent, deps: [{ token: GLN_FRAME_CONFIG, optional: true }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
GlnFrameComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnFrameComponent, selector: "gln-frame", inputs: { config: "config", exterior: "exterior", isDisabled: "isDisabled", isError: "isError", isFilled: "isFilled", isLabelShrink: "isLabelShrink", isNoAnimation: "isNoAnimation", isNoLabel: "isNoLabel", isRequired: "isRequired", label: "label" }, exportAs: ["glnFrame"], usesOnChanges: true, ngImport: i0, template: "<label *ngIf=\"!noLabel\"\n  class=\"glnfr-label\">\n  <span lbl>{{ label }}</span><span *ngIf=\"isRequired\">{{ (!!label ? '&nbsp;' : '') + '*' }}\n  </span>\n</label>\n<div class=\"glnfr-border\"\n  [attr.dcr-bg]=\"isUnderlineExterior ? '' : null\"\n  [attr.dcr-bb]=\"isUnderlineExterior || isStandardExterior? '': null\"\n  decor-brb>\n  <ng-content></ng-content>\n  <fieldset *ngIf=\"isOutlinedExterior\"\n    dcr-br\n    class=\"glnfr-fieldset\"\n    aria-hidden=\"true\">\n    <legend *ngIf=\"!noLabel\"\n      class=\"glnfr-legend\">\n      <span lgn>{{ label }}</span><span *ngIf=\"isRequired\">{{ (!!label ? '&nbsp;' : '') + '*' }}\n      </span>\n    </legend>\n  </fieldset>\n</div>", styles: ["@charset \"UTF-8\";gln-frame{--glnfr--default-h: var(--glncl-default-h, var(--gln-default-h));--glnfr--default-s: var(--glncl-default-s, var(--gln-default-s));--glnfr--primary-h: var(--glncl-primary-h, var(--gln-primary-h));--glnfr--primary-s: var(--glncl-primary-s, var(--gln-primary-s));--glnfr--danger-h: var(--glncl-danger-h, var(--gln-danger-h));--glnfr--danger-s: var(--glncl-danger-s, var(--gln-danger-s));background-color:transparent;border:0;display:flex;line-height:1.4375em;margin:0;min-width:0;padding:0;position:relative;vertical-align:top;--def-o-lgn-pd: .3em;border-radius:var(--glnfr-br-rd, var(--glnfrs-br-rd, var(--def-br-rd)));--glnfr--lb-cl-def: hsl(var(--glnfr---def-h), var(--glnfr---def-s), 40%);--glnfr--br-cl-def: hsl(var(--glnfr---def-h), var(--glnfr---def-s), 45%);--glnfr--bg-cl-def: hsl(var(--glnfr---def-h), var(--glnfr---def-s), 97%);--glnfr--bf-cl-def: hsl(var(--glnfr---def-h), var(--glnfr---def-s), 45%);--glnfr--lb-cl-hov: hsl(var(--glnfr---hov-h), var(--glnfr---hov-s), 35%);--glnfr--br-cl-hov: hsl(var(--glnfr---hov-h), var(--glnfr---hov-s), 40%);--glnfr--bg-cl-hov: hsl(var(--glnfr---hov-h), var(--glnfr---hov-s), 93%);--glnfr--bf-cl-hov: hsl(var(--glnfr---hov-h), var(--glnfr---hov-s), 40%);--glnfr--lb-cl-foc: hsl(var(--glnfr---foc-h), var(--glnfr---foc-s), 45%);--glnfr--br-cl-foc: hsl(var(--glnfr---foc-h), var(--glnfr---foc-s), 50%);--glnfr--bg-cl-foc: hsl(var(--glnfr---foc-h), var(--glnfr---foc-s), 95%);--glnfr--bf-cl-foc: hsl(var(--glnfr---foc-h), var(--glnfr---foc-s), 40%);--glnfr--af-cl-foc: hsl(var(--glnfr---foc-h), var(--glnfr---foc-s), 50%);--glnfr--lb-cl-dis: hsl(var(--glnfr---dis-h), var(--glnfr---dis-s), 50%);--glnfr--br-cl-dis: hsl(var(--glnfr---dis-h), var(--glnfr---dis-s), 60%);--glnfr--bg-cl-dis: hsl(var(--glnfr---dis-h), var(--glnfr---dis-s), 92%);--glnfr--bf-cl-dis: hsl(var(--glnfr---dis-h), var(--glnfr---dis-s), 60%);--glnfr-dcr-bb-aft-wd: 2px;--glnfr-dcr-bb-bef-wd: 2px;--glnfr-hov-dcr-br-wd: 2px;--glnfr-foc-dcr-br-wd: 2px}gln-frame[ext-o]{--def-br-rd: .35em;--def-lb-pd-tp: 1.03125em;--def-lb-pd-bt: 1.03125em;--def-lb-pd-lf: .875em;--def-lb-pd-rg: .875em;--def-lb-mx-wd: 2.905em;--def-lb-trn-y: -.53875em;--def-lb-trn2-y: 1.03125em}gln-frame[ext-u]{--def-br-rd: .35em .35em 0px 0px;--def-lb-pd-tp: 1.546875em;--def-lb-pd-bt: .515625em;--def-lb-pd-lf: .75em;--def-lb-pd-rg: .75em;--def-lb-mx-wd: 2.49em;--def-lb-trn-y: .379375em;--def-lb-trn2-y: 1.03125em}gln-frame[ext-s]{--def-lb-pd-tp: 1.546875em;--def-lb-pd-bt: .515625em;--def-lb-pd-lf: 0;--def-lb-pd-rg: 0;--def-lb-mx-wd: 0;--def-lb-trn-y: .32em;--def-lb-trn2-y: 1.546875em}gln-frame:not([noAnm]){--glnfr-trn-drt-200: .2s;--glnfr-trn-drt-100: .1s;--glnfr-trn-drt-50: 50ms}gln-frame label{display:flex;left:0;overflow:hidden;padding:0;pointer-events:none;position:absolute;-webkit-user-select:none;user-select:none;text-overflow:ellipsis;-webkit-text-size-adjust:100%;text-size-adjust:100%;top:0;transform-origin:top left;transition:color var(--glnfr-trn-drt-200, 0ms) cubic-bezier(0,0,.2,1) 0ms,transform var(--glnfr-trn-drt-200, 0ms) cubic-bezier(0,0,.2,1) 0ms,max-width var(--glnfr-trn-drt-200, 0ms) cubic-bezier(0,0,.2,1) 0ms;white-space:nowrap;z-index:1}gln-frame label>span[lbl]{overflow:hidden;text-overflow:ellipsis}gln-frame[shr] label,gln-frame:focus-within label,gln-frame[foc] label,gln-frame[fil] label{max-width:calc(133% - var(--glnfr-lb-pd-shr, var(--glnfre-pd-shr, var(--def-lb-mx-wd))));transform:translate(var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf))),var(--glnfr-lb-trn-y, var(--glnfre-trn-y, var(--def-lb-trn-y)))) scale(.75);pointer-events:auto}gln-frame:not([shr]):not(:focus-within):not([foc]):not([fil]) label{max-width:calc(100% - var(--glnfro-pd-lf, var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf)))) - var(--glnfro-pd-rg, var(--glnfr-lb-pd-rg, var(--glnfrs-pd-rg, var(--def-lb-pd-rg)))));transform:translate(var(--glnfro-pd-lf, var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf)))),var(--glnfr-lb-trn2-y, var(--glnfre-trn2-y, var(--def-lb-trn2-y)))) scale(1)}gln-frame:not([dis]):not([err]){--glnfr---def-h: var(--glnfr--primary-h);--glnfr---def-s: var(--glnfr--primary-s);--glnfr---hov-h: var(--glnfr--primary-h);--glnfr---hov-s: var(--glnfr--primary-s);--glnfr---foc-h: var(--glnfr--primary-h);--glnfr---foc-s: var(--glnfr--primary-s)}gln-frame:not([dis])[err]{--glnfr---def-h: var(--glnfr--danger-h);--glnfr---def-s: var(--glnfr--danger-s);--glnfr---hov-h: var(--glnfr--danger-h);--glnfr---hov-s: var(--glnfr--danger-s);--glnfr---foc-h: var(--glnfr--danger-h);--glnfr---foc-s: var(--glnfr--danger-s)}gln-frame[dis]{--glnfr---dis-h: var(--glnfr--default-h);--glnfr---dis-s: var(--glnfr--default-s)}gln-frame:not([dis]){--glnfr--dcr-bb-aft-cl: var(--glnfr-foc-af-cl, var(--glnfr--af-cl-foc))}gln-frame:not([dis]):not(:hover):not(:focus-within):not([foc]){--glnfr--label-cl: var(--glnfr-def-lb-cl, var(--glnfr--lb-cl-def));--glnfr--dcr-br-cl: var(--glnfr-def-br-cl, var(--glnfr--br-cl-def));--glnfr--dcr-bg-cl: var(--glnfr-def-bg-cl, var(--glnfr--bg-cl-def));--glnfr--dcr-bb-bef-cl: var(--glnfr-def-bf-cl, var(--glnfr--bf-cl-def))}gln-frame:not([dis]):hover:not(:focus-within):not([foc]){--glnfr--label-cl: var(--glnfr-hov-lb-cl, var(--glnfr--lb-cl-hov));--glnfr--dcr-br-cl: var(--glnfr-hov-br-cl, var(--glnfr--br-cl-hov));--glnfr--dcr-bg-cl: var(--glnfr-hov-bg-cl, var(--glnfr--bg-cl-hov));--glnfr--dcr-bb-bef-cl: var(--glnfr-hov-bf-cl, var(--glnfr--bf-cl-hov))}gln-frame:not([dis]):focus-within,gln-frame:not([dis])[foc]{--glnfr--label-cl: var(--glnfr-foc-lb-cl, var(--glnfr--lb-cl-foc));--glnfr--dcr-br-cl: var(--glnfr-foc-br-cl, var(--glnfr--br-cl-foc));--glnfr--dcr-bg-cl: var(--glnfr-foc-bg-cl, var(--glnfr--bg-cl-foc));--glnfr--dcr-bb-bef-cl: var(--glnfr-foc-bf-cl, var(--glnfr--bf-cl-foc))}gln-frame[dis]{--glnfr--label-cl: var(--glnfr-dis-lb-cl, var(--glnfr--lb-cl-dis));--glnfr--dcr-br-cl: var(--glnfr-dis-br-cl, var(--glnfr--br-cl-dis));--glnfr--dcr-bg-cl: var(--glnfr-dis-bg-cl, var(--glnfr--bg-cl-dis));--glnfr--dcr-bb-bef-cl: var(--glnfr-dis-bf-cl, var(--glnfr--bf-cl-dis))}gln-frame>label{color:var(--glnfr--label-cl)}gln-frame>div{align-items:center;box-sizing:border-box;border-radius:inherit;display:flex;flex-wrap:nowrap;width:100%}gln-frame>div>[glnfr-elem]{flex-grow:1}gln-frame>div>[glnfr-orn-lf],gln-frame>div>[glnfr-orn-rg]{flex-shrink:0}gln-frame[dis]>div{color:var(--glnfr--label-cl)}gln-frame>[dcr-bg]{transition:background-color var(--glnfr-trn-drt-200, 0ms) cubic-bezier(0,0,.2,1) 0ms;background-color:var(--glnfr--dcr-bg-cl)}gln-frame>[dcr-bb]:before{border-bottom-color:var(--glnfr--dcr-bb-bef-cl);border-bottom-width:1px;border-bottom-style:solid;border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;left:0;bottom:0;content:\"\\a0\";position:absolute;right:0;transition:border-bottom-color var(--glnfr-trn-drt-200, 0ms) cubic-bezier(.4,0,.2,1) 0ms;pointer-events:none}gln-frame>[dcr-bb]:after{border-bottom-color:var(--glnfr--dcr-bb-aft-cl);border-bottom-width:var(--glnfr-dcr-bb-aft-wd, 1px);border-bottom-style:solid;border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;left:0;bottom:0;content:\"\";position:absolute;right:0;transform:scaleX(0);transition:transform var(--glnfr-trn-drt-200, 0ms) cubic-bezier(0,0,.2,1) 0ms;pointer-events:none}gln-frame[dis]>div[dcr-bb]:before{border-bottom-style:dotted}gln-frame[ext-s]:not([dis]):hover:not(:focus-within):not([foc])>div[dcr-bb]:before{border-bottom-width:var(--glnfr-dcr-bb-bef-wd, 1px)}gln-frame:not([dis]):focus-within>div[dcr-bb]:after,gln-frame:not([dis])[foc]>div[dcr-bb]:after{transform:scale(1) translate(0)}gln-frame fieldset{text-align:left;position:absolute;bottom:0;right:0;top:0;left:0;margin:0;padding-bottom:0;padding-left:calc(var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf))) - var(--glnfr-o-lgn-pd, var(--def-o-lgn-pd)) - var(--glnfr--pg-lf-delta, 0px));padding-right:calc(var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf))) - var(--glnfr-o-lgn-pd, var(--def-o-lgn-pd)));padding-top:0;pointer-events:none;border-radius:inherit;border-width:1px;border-style:solid;overflow:hidden;min-width:0%;box-sizing:inherit}gln-frame:not([dis]):hover:not(:focus-within):not([foc]) fieldset{border-width:var(--glnfr-hov-dcr-br-wd, 1px);--glnfr--pg-lf-delta: calc(var(--glnfr-hov-dcr-br-wd, 1px) - 1px)}gln-frame:not([dis]):focus-within fieldset,gln-frame:not([dis])[foc] fieldset{border-width:var(--glnfr-foc-dcr-br-wd, 1px);--glnfr--pg-lf-delta: calc(var(--glnfr-foc-dcr-br-wd, 1px) - 1px)}gln-frame [dcr-br]{border-color:var(--glnfr--dcr-br-cl)}gln-frame legend{box-sizing:border-box;display:flex;height:1px;padding:0;visibility:hidden;white-space:nowrap;width:auto}gln-frame legend>span{height:inherit;font-size:.75em}gln-frame legend>span[lgn]{overflow:hidden;text-overflow:ellipsis}gln-frame[shr] legend,gln-frame:focus-within legend,gln-frame[foc] legend,gln-frame[fil] legend{max-width:100%;transition:max-width var(--glnfr-trn-drt-100, 0ms) cubic-bezier(0,0,.2,1) var(--glnfr-trn-drt-50, 0ms)}gln-frame[shr][ind] legend,gln-frame:focus-within[ind] legend,gln-frame[foc][ind] legend,gln-frame[fil][ind] legend{padding:0 calc(var(--glnfr-o-lgn-pd, var(--def-o-lgn-pd)) - 1px)}gln-frame:not([shr]):not([fil]):not(:focus-within):not([foc]) legend{max-width:.01px;transition:max-width var(--glnfr-trn-drt-50, 0ms) cubic-bezier(0,0,.2,1) 0ms}gln-frame>div>[glnfr-pd-ver],gln-frame>div>[glnfr-mr-ver]{line-height:inherit;align-self:baseline}gln-frame>div>[glnfr-pd-ver]{padding-top:var(--glnfr-lb-pd-tp, var(--glnfrs-pd-tp, var(--def-lb-pd-tp)));padding-bottom:var(--glnfr-lb-pd-bt, var(--glnfrs-pd-bt, var(--def-lb-pd-bt)))}gln-frame>div>[glnfr-mr-ver]{margin-top:var(--glnfr-lb-pd-tp, var(--glnfrs-pd-tp, var(--def-lb-pd-tp)));margin-bottom:var(--glnfr-lb-pd-bt, var(--glnfrs-pd-bt, var(--def-lb-pd-bt)))}gln-frame>div>span[glnfr-orn-lf],gln-frame>div>span[glnfr-orn-rg]{max-height:inherit;display:inline-flex;align-items:center}gln-frame>div>span[glnfr-orn-rg]{order:1}gln-frame>div>span[glnfr-orn-lf]:empty~[glnfr-pd-hor]{padding-left:var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf)))}gln-frame>div>span[glnfr-orn-rg]:empty~[glnfr-pd-hor]{padding-right:var(--glnfr-lb-pd-rg, var(--glnfrs-pd-rg, var(--def-lb-pd-rg)))}gln-frame span[glnfr-orn-lf=center],gln-frame span[glnfr-orn-rg=center]{align-self:center}gln-frame span[glnfr-orn-lf=flex-start],gln-frame span[glnfr-orn-rg=flex-start]{align-self:flex-start}gln-frame span[glnfr-orn-lf=flex-end],gln-frame span[glnfr-orn-rg=flex-end]{align-self:flex-end}gln-frame span[glnfr-orn-lf=baseline],gln-frame span[glnfr-orn-rg=baseline]{align-self:baseline}gln-frame span[glnfr-orn-lf=stretch],gln-frame span[glnfr-orn-rg=stretch]{align-self:stretch}gln-frame[ext-o]>div>span[glnfr-orn-lf=default],gln-frame[ext-o]>div>span[glnfr-orn-rg=default]{align-self:center}gln-frame[ext-u]>div>span[glnfr-orn-lf=default]{align-self:baseline}gln-frame[ext-u]>div>span[glnfr-orn-rg=default]{align-self:center}gln-frame[ext-s]>div>span[glnfr-orn-lf=default],gln-frame[ext-s]>div>span[glnfr-orn-rg=default]{align-self:baseline}gln-frame[ext-u]>div>span[glnfr-orn-lf]>.glnfr-ornam,gln-frame[ext-s]>div>span[glnfr-orn-lf]>.glnfr-ornam,gln-frame[ext-s]>div>span[glnfr-orn-rg]>.glnfr-ornam{display:inline-block;margin-bottom:var(--glnfr-lb-pd-bt, var(--glnfrs-pd-bt, var(--def-lb-pd-bt)))}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-frame', exportAs: 'glnFrame', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<label *ngIf=\"!noLabel\"\n  class=\"glnfr-label\">\n  <span lbl>{{ label }}</span><span *ngIf=\"isRequired\">{{ (!!label ? '&nbsp;' : '') + '*' }}\n  </span>\n</label>\n<div class=\"glnfr-border\"\n  [attr.dcr-bg]=\"isUnderlineExterior ? '' : null\"\n  [attr.dcr-bb]=\"isUnderlineExterior || isStandardExterior? '': null\"\n  decor-brb>\n  <ng-content></ng-content>\n  <fieldset *ngIf=\"isOutlinedExterior\"\n    dcr-br\n    class=\"glnfr-fieldset\"\n    aria-hidden=\"true\">\n    <legend *ngIf=\"!noLabel\"\n      class=\"glnfr-legend\">\n      <span lgn>{{ label }}</span><span *ngIf=\"isRequired\">{{ (!!label ? '&nbsp;' : '') + '*' }}\n      </span>\n    </legend>\n  </fieldset>\n</div>", styles: ["@charset \"UTF-8\";gln-frame{--glnfr--default-h: var(--glncl-default-h, var(--gln-default-h));--glnfr--default-s: var(--glncl-default-s, var(--gln-default-s));--glnfr--primary-h: var(--glncl-primary-h, var(--gln-primary-h));--glnfr--primary-s: var(--glncl-primary-s, var(--gln-primary-s));--glnfr--danger-h: var(--glncl-danger-h, var(--gln-danger-h));--glnfr--danger-s: var(--glncl-danger-s, var(--gln-danger-s));background-color:transparent;border:0;display:flex;line-height:1.4375em;margin:0;min-width:0;padding:0;position:relative;vertical-align:top;--def-o-lgn-pd: .3em;border-radius:var(--glnfr-br-rd, var(--glnfrs-br-rd, var(--def-br-rd)));--glnfr--lb-cl-def: hsl(var(--glnfr---def-h), var(--glnfr---def-s), 40%);--glnfr--br-cl-def: hsl(var(--glnfr---def-h), var(--glnfr---def-s), 45%);--glnfr--bg-cl-def: hsl(var(--glnfr---def-h), var(--glnfr---def-s), 97%);--glnfr--bf-cl-def: hsl(var(--glnfr---def-h), var(--glnfr---def-s), 45%);--glnfr--lb-cl-hov: hsl(var(--glnfr---hov-h), var(--glnfr---hov-s), 35%);--glnfr--br-cl-hov: hsl(var(--glnfr---hov-h), var(--glnfr---hov-s), 40%);--glnfr--bg-cl-hov: hsl(var(--glnfr---hov-h), var(--glnfr---hov-s), 93%);--glnfr--bf-cl-hov: hsl(var(--glnfr---hov-h), var(--glnfr---hov-s), 40%);--glnfr--lb-cl-foc: hsl(var(--glnfr---foc-h), var(--glnfr---foc-s), 45%);--glnfr--br-cl-foc: hsl(var(--glnfr---foc-h), var(--glnfr---foc-s), 50%);--glnfr--bg-cl-foc: hsl(var(--glnfr---foc-h), var(--glnfr---foc-s), 95%);--glnfr--bf-cl-foc: hsl(var(--glnfr---foc-h), var(--glnfr---foc-s), 40%);--glnfr--af-cl-foc: hsl(var(--glnfr---foc-h), var(--glnfr---foc-s), 50%);--glnfr--lb-cl-dis: hsl(var(--glnfr---dis-h), var(--glnfr---dis-s), 50%);--glnfr--br-cl-dis: hsl(var(--glnfr---dis-h), var(--glnfr---dis-s), 60%);--glnfr--bg-cl-dis: hsl(var(--glnfr---dis-h), var(--glnfr---dis-s), 92%);--glnfr--bf-cl-dis: hsl(var(--glnfr---dis-h), var(--glnfr---dis-s), 60%);--glnfr-dcr-bb-aft-wd: 2px;--glnfr-dcr-bb-bef-wd: 2px;--glnfr-hov-dcr-br-wd: 2px;--glnfr-foc-dcr-br-wd: 2px}gln-frame[ext-o]{--def-br-rd: .35em;--def-lb-pd-tp: 1.03125em;--def-lb-pd-bt: 1.03125em;--def-lb-pd-lf: .875em;--def-lb-pd-rg: .875em;--def-lb-mx-wd: 2.905em;--def-lb-trn-y: -.53875em;--def-lb-trn2-y: 1.03125em}gln-frame[ext-u]{--def-br-rd: .35em .35em 0px 0px;--def-lb-pd-tp: 1.546875em;--def-lb-pd-bt: .515625em;--def-lb-pd-lf: .75em;--def-lb-pd-rg: .75em;--def-lb-mx-wd: 2.49em;--def-lb-trn-y: .379375em;--def-lb-trn2-y: 1.03125em}gln-frame[ext-s]{--def-lb-pd-tp: 1.546875em;--def-lb-pd-bt: .515625em;--def-lb-pd-lf: 0;--def-lb-pd-rg: 0;--def-lb-mx-wd: 0;--def-lb-trn-y: .32em;--def-lb-trn2-y: 1.546875em}gln-frame:not([noAnm]){--glnfr-trn-drt-200: .2s;--glnfr-trn-drt-100: .1s;--glnfr-trn-drt-50: 50ms}gln-frame label{display:flex;left:0;overflow:hidden;padding:0;pointer-events:none;position:absolute;-webkit-user-select:none;user-select:none;text-overflow:ellipsis;-webkit-text-size-adjust:100%;text-size-adjust:100%;top:0;transform-origin:top left;transition:color var(--glnfr-trn-drt-200, 0ms) cubic-bezier(0,0,.2,1) 0ms,transform var(--glnfr-trn-drt-200, 0ms) cubic-bezier(0,0,.2,1) 0ms,max-width var(--glnfr-trn-drt-200, 0ms) cubic-bezier(0,0,.2,1) 0ms;white-space:nowrap;z-index:1}gln-frame label>span[lbl]{overflow:hidden;text-overflow:ellipsis}gln-frame[shr] label,gln-frame:focus-within label,gln-frame[foc] label,gln-frame[fil] label{max-width:calc(133% - var(--glnfr-lb-pd-shr, var(--glnfre-pd-shr, var(--def-lb-mx-wd))));transform:translate(var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf))),var(--glnfr-lb-trn-y, var(--glnfre-trn-y, var(--def-lb-trn-y)))) scale(.75);pointer-events:auto}gln-frame:not([shr]):not(:focus-within):not([foc]):not([fil]) label{max-width:calc(100% - var(--glnfro-pd-lf, var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf)))) - var(--glnfro-pd-rg, var(--glnfr-lb-pd-rg, var(--glnfrs-pd-rg, var(--def-lb-pd-rg)))));transform:translate(var(--glnfro-pd-lf, var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf)))),var(--glnfr-lb-trn2-y, var(--glnfre-trn2-y, var(--def-lb-trn2-y)))) scale(1)}gln-frame:not([dis]):not([err]){--glnfr---def-h: var(--glnfr--primary-h);--glnfr---def-s: var(--glnfr--primary-s);--glnfr---hov-h: var(--glnfr--primary-h);--glnfr---hov-s: var(--glnfr--primary-s);--glnfr---foc-h: var(--glnfr--primary-h);--glnfr---foc-s: var(--glnfr--primary-s)}gln-frame:not([dis])[err]{--glnfr---def-h: var(--glnfr--danger-h);--glnfr---def-s: var(--glnfr--danger-s);--glnfr---hov-h: var(--glnfr--danger-h);--glnfr---hov-s: var(--glnfr--danger-s);--glnfr---foc-h: var(--glnfr--danger-h);--glnfr---foc-s: var(--glnfr--danger-s)}gln-frame[dis]{--glnfr---dis-h: var(--glnfr--default-h);--glnfr---dis-s: var(--glnfr--default-s)}gln-frame:not([dis]){--glnfr--dcr-bb-aft-cl: var(--glnfr-foc-af-cl, var(--glnfr--af-cl-foc))}gln-frame:not([dis]):not(:hover):not(:focus-within):not([foc]){--glnfr--label-cl: var(--glnfr-def-lb-cl, var(--glnfr--lb-cl-def));--glnfr--dcr-br-cl: var(--glnfr-def-br-cl, var(--glnfr--br-cl-def));--glnfr--dcr-bg-cl: var(--glnfr-def-bg-cl, var(--glnfr--bg-cl-def));--glnfr--dcr-bb-bef-cl: var(--glnfr-def-bf-cl, var(--glnfr--bf-cl-def))}gln-frame:not([dis]):hover:not(:focus-within):not([foc]){--glnfr--label-cl: var(--glnfr-hov-lb-cl, var(--glnfr--lb-cl-hov));--glnfr--dcr-br-cl: var(--glnfr-hov-br-cl, var(--glnfr--br-cl-hov));--glnfr--dcr-bg-cl: var(--glnfr-hov-bg-cl, var(--glnfr--bg-cl-hov));--glnfr--dcr-bb-bef-cl: var(--glnfr-hov-bf-cl, var(--glnfr--bf-cl-hov))}gln-frame:not([dis]):focus-within,gln-frame:not([dis])[foc]{--glnfr--label-cl: var(--glnfr-foc-lb-cl, var(--glnfr--lb-cl-foc));--glnfr--dcr-br-cl: var(--glnfr-foc-br-cl, var(--glnfr--br-cl-foc));--glnfr--dcr-bg-cl: var(--glnfr-foc-bg-cl, var(--glnfr--bg-cl-foc));--glnfr--dcr-bb-bef-cl: var(--glnfr-foc-bf-cl, var(--glnfr--bf-cl-foc))}gln-frame[dis]{--glnfr--label-cl: var(--glnfr-dis-lb-cl, var(--glnfr--lb-cl-dis));--glnfr--dcr-br-cl: var(--glnfr-dis-br-cl, var(--glnfr--br-cl-dis));--glnfr--dcr-bg-cl: var(--glnfr-dis-bg-cl, var(--glnfr--bg-cl-dis));--glnfr--dcr-bb-bef-cl: var(--glnfr-dis-bf-cl, var(--glnfr--bf-cl-dis))}gln-frame>label{color:var(--glnfr--label-cl)}gln-frame>div{align-items:center;box-sizing:border-box;border-radius:inherit;display:flex;flex-wrap:nowrap;width:100%}gln-frame>div>[glnfr-elem]{flex-grow:1}gln-frame>div>[glnfr-orn-lf],gln-frame>div>[glnfr-orn-rg]{flex-shrink:0}gln-frame[dis]>div{color:var(--glnfr--label-cl)}gln-frame>[dcr-bg]{transition:background-color var(--glnfr-trn-drt-200, 0ms) cubic-bezier(0,0,.2,1) 0ms;background-color:var(--glnfr--dcr-bg-cl)}gln-frame>[dcr-bb]:before{border-bottom-color:var(--glnfr--dcr-bb-bef-cl);border-bottom-width:1px;border-bottom-style:solid;border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;left:0;bottom:0;content:\"\\a0\";position:absolute;right:0;transition:border-bottom-color var(--glnfr-trn-drt-200, 0ms) cubic-bezier(.4,0,.2,1) 0ms;pointer-events:none}gln-frame>[dcr-bb]:after{border-bottom-color:var(--glnfr--dcr-bb-aft-cl);border-bottom-width:var(--glnfr-dcr-bb-aft-wd, 1px);border-bottom-style:solid;border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;left:0;bottom:0;content:\"\";position:absolute;right:0;transform:scaleX(0);transition:transform var(--glnfr-trn-drt-200, 0ms) cubic-bezier(0,0,.2,1) 0ms;pointer-events:none}gln-frame[dis]>div[dcr-bb]:before{border-bottom-style:dotted}gln-frame[ext-s]:not([dis]):hover:not(:focus-within):not([foc])>div[dcr-bb]:before{border-bottom-width:var(--glnfr-dcr-bb-bef-wd, 1px)}gln-frame:not([dis]):focus-within>div[dcr-bb]:after,gln-frame:not([dis])[foc]>div[dcr-bb]:after{transform:scale(1) translate(0)}gln-frame fieldset{text-align:left;position:absolute;bottom:0;right:0;top:0;left:0;margin:0;padding-bottom:0;padding-left:calc(var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf))) - var(--glnfr-o-lgn-pd, var(--def-o-lgn-pd)) - var(--glnfr--pg-lf-delta, 0px));padding-right:calc(var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf))) - var(--glnfr-o-lgn-pd, var(--def-o-lgn-pd)));padding-top:0;pointer-events:none;border-radius:inherit;border-width:1px;border-style:solid;overflow:hidden;min-width:0%;box-sizing:inherit}gln-frame:not([dis]):hover:not(:focus-within):not([foc]) fieldset{border-width:var(--glnfr-hov-dcr-br-wd, 1px);--glnfr--pg-lf-delta: calc(var(--glnfr-hov-dcr-br-wd, 1px) - 1px)}gln-frame:not([dis]):focus-within fieldset,gln-frame:not([dis])[foc] fieldset{border-width:var(--glnfr-foc-dcr-br-wd, 1px);--glnfr--pg-lf-delta: calc(var(--glnfr-foc-dcr-br-wd, 1px) - 1px)}gln-frame [dcr-br]{border-color:var(--glnfr--dcr-br-cl)}gln-frame legend{box-sizing:border-box;display:flex;height:1px;padding:0;visibility:hidden;white-space:nowrap;width:auto}gln-frame legend>span{height:inherit;font-size:.75em}gln-frame legend>span[lgn]{overflow:hidden;text-overflow:ellipsis}gln-frame[shr] legend,gln-frame:focus-within legend,gln-frame[foc] legend,gln-frame[fil] legend{max-width:100%;transition:max-width var(--glnfr-trn-drt-100, 0ms) cubic-bezier(0,0,.2,1) var(--glnfr-trn-drt-50, 0ms)}gln-frame[shr][ind] legend,gln-frame:focus-within[ind] legend,gln-frame[foc][ind] legend,gln-frame[fil][ind] legend{padding:0 calc(var(--glnfr-o-lgn-pd, var(--def-o-lgn-pd)) - 1px)}gln-frame:not([shr]):not([fil]):not(:focus-within):not([foc]) legend{max-width:.01px;transition:max-width var(--glnfr-trn-drt-50, 0ms) cubic-bezier(0,0,.2,1) 0ms}gln-frame>div>[glnfr-pd-ver],gln-frame>div>[glnfr-mr-ver]{line-height:inherit;align-self:baseline}gln-frame>div>[glnfr-pd-ver]{padding-top:var(--glnfr-lb-pd-tp, var(--glnfrs-pd-tp, var(--def-lb-pd-tp)));padding-bottom:var(--glnfr-lb-pd-bt, var(--glnfrs-pd-bt, var(--def-lb-pd-bt)))}gln-frame>div>[glnfr-mr-ver]{margin-top:var(--glnfr-lb-pd-tp, var(--glnfrs-pd-tp, var(--def-lb-pd-tp)));margin-bottom:var(--glnfr-lb-pd-bt, var(--glnfrs-pd-bt, var(--def-lb-pd-bt)))}gln-frame>div>span[glnfr-orn-lf],gln-frame>div>span[glnfr-orn-rg]{max-height:inherit;display:inline-flex;align-items:center}gln-frame>div>span[glnfr-orn-rg]{order:1}gln-frame>div>span[glnfr-orn-lf]:empty~[glnfr-pd-hor]{padding-left:var(--glnfr-lb-pd-lf, var(--glnfrs-pd-lf, var(--def-lb-pd-lf)))}gln-frame>div>span[glnfr-orn-rg]:empty~[glnfr-pd-hor]{padding-right:var(--glnfr-lb-pd-rg, var(--glnfrs-pd-rg, var(--def-lb-pd-rg)))}gln-frame span[glnfr-orn-lf=center],gln-frame span[glnfr-orn-rg=center]{align-self:center}gln-frame span[glnfr-orn-lf=flex-start],gln-frame span[glnfr-orn-rg=flex-start]{align-self:flex-start}gln-frame span[glnfr-orn-lf=flex-end],gln-frame span[glnfr-orn-rg=flex-end]{align-self:flex-end}gln-frame span[glnfr-orn-lf=baseline],gln-frame span[glnfr-orn-rg=baseline]{align-self:baseline}gln-frame span[glnfr-orn-lf=stretch],gln-frame span[glnfr-orn-rg=stretch]{align-self:stretch}gln-frame[ext-o]>div>span[glnfr-orn-lf=default],gln-frame[ext-o]>div>span[glnfr-orn-rg=default]{align-self:center}gln-frame[ext-u]>div>span[glnfr-orn-lf=default]{align-self:baseline}gln-frame[ext-u]>div>span[glnfr-orn-rg=default]{align-self:center}gln-frame[ext-s]>div>span[glnfr-orn-lf=default],gln-frame[ext-s]>div>span[glnfr-orn-rg=default]{align-self:baseline}gln-frame[ext-u]>div>span[glnfr-orn-lf]>.glnfr-ornam,gln-frame[ext-s]>div>span[glnfr-orn-lf]>.glnfr-ornam,gln-frame[ext-s]>div>span[glnfr-orn-rg]>.glnfr-ornam{display:inline-block;margin-bottom:var(--glnfr-lb-pd-bt, var(--glnfrs-pd-bt, var(--def-lb-pd-bt)))}\n"] }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [GLN_FRAME_CONFIG]
                    }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }];
    }, propDecorators: { config: [{
                type: Input
            }], exterior: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isError: [{
                type: Input
            }], isFilled: [{
                type: Input
            }], isLabelShrink: [{
                type: Input
            }], isNoAnimation: [{
                type: Input
            }], isNoLabel: [{
                type: Input
            }], isRequired: [{
                type: Input
            }], label: [{
                type: Input
            }] } });

class GlnFrameModule {
}
GlnFrameModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnFrameModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameModule, declarations: [GlnFrameComponent], imports: [CommonModule], exports: [GlnFrameComponent] });
GlnFrameModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnFrameModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnFrameComponent],
                    imports: [CommonModule],
                    exports: [GlnFrameComponent],
                }]
        }] });

class GlnHintOrErrorComponent {
    constructor(renderer, hostRef) {
        this.renderer = renderer;
        this.hostRef = hostRef;
        HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-hint-or-error', true);
    }
    ngOnChanges(changes) {
        if (changes['isError']) {
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'ghe-error', !!this.isError);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'err', this.isError ? '' : null);
        }
        if (changes['isFocused']) {
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'ghe-focused', !!this.isFocused);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'foc', this.isFocused ? '' : null);
        }
        if (changes['isDisabled']) {
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'ghe-disabled', !!this.isDisabled);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled ? '' : null);
        }
    }
}
GlnHintOrErrorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnHintOrErrorComponent, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GlnHintOrErrorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnHintOrErrorComponent, selector: "gln-hint-or-error", inputs: { text: "text", isError: "isError", isFocused: "isFocused", isDisabled: "isDisabled" }, exportAs: ["glnHintOrError"], usesOnChanges: true, ngImport: i0, template: "<span>{{ text }}</span>", styles: ["gln-hint-or-error{--glnhe--default-h: var(--glncl-default-h, var(--gln-default-h));--glnhe--default-s: var(--glncl-default-s, var(--gln-default-s));--glnhe--primary-h: var(--glncl-primary-h, var(--gln-primary-h));--glnhe--primary-s: var(--glncl-primary-s, var(--gln-primary-s));--glnhe--danger-h: var(--glncl-danger-h, var(--gln-danger-h));--glnhe--danger-s: var(--glncl-danger-s, var(--gln-danger-s));box-sizing:border-box;cursor:text;display:block;font-size:.75em;height:1.66em;line-height:1.66;margin-bottom:0;margin-top:3px;min-height:1.1875em;overflow:hidden;text-align:left;text-overflow:ellipsis;white-space:nowrap;--glnhe--lb-cl-def: hsl(var(--glnhe---def-h), var(--glnhe---def-s), 40%);--glnhe--lb-cl-foc: hsl(var(--glnhe---foc-h), var(--glnhe---foc-s), 45%);--glnhe--lb-cl-dis: hsl(var(--glnhe---dis-h), var(--glnhe---dis-s), 50%)}gln-hint-or-error:not([dis]):not([err]){--glnhe---def-h: var(--glnhe--default-h);--glnhe---def-s: var(--glnhe--default-s);--glnhe---foc-h: var(--glnhe--primary-h);--glnhe---foc-s: var(--glnhe--primary-s)}gln-hint-or-error:not([dis])[err]{--glnhe---def-h: var(--glnhe--danger-h);--glnhe---def-s: var(--glnhe--danger-s);--glnhe---foc-h: var(--glnhe--danger-h);--glnhe---foc-s: var(--glnhe--danger-s)}gln-hint-or-error[dis]{--glnhe---dis-h: var(--glnhe--default-h);--glnhe---dis-s: var(--glnhe--default-s)}gln-hint-or-error:not([dis]):not(:focus-within):not([foc]){--glnhe--label-cl: var(--glnhe-def-lb-cl, var(--glnhe--lb-cl-def))}gln-hint-or-error:not([dis]):focus-within,gln-hint-or-error:not([dis])[foc]{--glnhe--label-cl: var(--glnhe-foc-lb-cl, var(--glnhe--lb-cl-foc))}gln-hint-or-error[dis]{--glnhe--label-cl: var(--glnhe-dis-lb-cl, var(--glnhe--lb-cl-dis))}gln-hint-or-error>span{color:var(--glnhe--label-cl)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnHintOrErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-hint-or-error', exportAs: 'glnHintOrError', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<span>{{ text }}</span>", styles: ["gln-hint-or-error{--glnhe--default-h: var(--glncl-default-h, var(--gln-default-h));--glnhe--default-s: var(--glncl-default-s, var(--gln-default-s));--glnhe--primary-h: var(--glncl-primary-h, var(--gln-primary-h));--glnhe--primary-s: var(--glncl-primary-s, var(--gln-primary-s));--glnhe--danger-h: var(--glncl-danger-h, var(--gln-danger-h));--glnhe--danger-s: var(--glncl-danger-s, var(--gln-danger-s));box-sizing:border-box;cursor:text;display:block;font-size:.75em;height:1.66em;line-height:1.66;margin-bottom:0;margin-top:3px;min-height:1.1875em;overflow:hidden;text-align:left;text-overflow:ellipsis;white-space:nowrap;--glnhe--lb-cl-def: hsl(var(--glnhe---def-h), var(--glnhe---def-s), 40%);--glnhe--lb-cl-foc: hsl(var(--glnhe---foc-h), var(--glnhe---foc-s), 45%);--glnhe--lb-cl-dis: hsl(var(--glnhe---dis-h), var(--glnhe---dis-s), 50%)}gln-hint-or-error:not([dis]):not([err]){--glnhe---def-h: var(--glnhe--default-h);--glnhe---def-s: var(--glnhe--default-s);--glnhe---foc-h: var(--glnhe--primary-h);--glnhe---foc-s: var(--glnhe--primary-s)}gln-hint-or-error:not([dis])[err]{--glnhe---def-h: var(--glnhe--danger-h);--glnhe---def-s: var(--glnhe--danger-s);--glnhe---foc-h: var(--glnhe--danger-h);--glnhe---foc-s: var(--glnhe--danger-s)}gln-hint-or-error[dis]{--glnhe---dis-h: var(--glnhe--default-h);--glnhe---dis-s: var(--glnhe--default-s)}gln-hint-or-error:not([dis]):not(:focus-within):not([foc]){--glnhe--label-cl: var(--glnhe-def-lb-cl, var(--glnhe--lb-cl-def))}gln-hint-or-error:not([dis]):focus-within,gln-hint-or-error:not([dis])[foc]{--glnhe--label-cl: var(--glnhe-foc-lb-cl, var(--glnhe--lb-cl-foc))}gln-hint-or-error[dis]{--glnhe--label-cl: var(--glnhe-dis-lb-cl, var(--glnhe--lb-cl-dis))}gln-hint-or-error>span{color:var(--glnhe--label-cl)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { text: [{
                type: Input
            }], isError: [{
                type: Input
            }], isFocused: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });

class GlnHintOrErrorModule {
}
GlnHintOrErrorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnHintOrErrorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnHintOrErrorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnHintOrErrorModule, declarations: [GlnHintOrErrorComponent], imports: [CommonModule], exports: [GlnHintOrErrorComponent] });
GlnHintOrErrorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnHintOrErrorModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnHintOrErrorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnHintOrErrorComponent],
                    imports: [CommonModule],
                    exports: [GlnHintOrErrorComponent],
                }]
        }] });

class GlnInfiniteScrollComponent {
    constructor(hostRef) {
        this.hostRef = hostRef;
        this.options = {};
        this.scrolled = new EventEmitter();
        this.anchor = null;
        this.observer = null;
    }
    ngOnInit() {
        const options = Object.assign({ root: this.isHostScrollable() ? this.hostRef.nativeElement : null }, this.options);
        this.observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                this.scrolled.emit();
            }
        }, options);
    }
    ngAfterViewInit() {
        if (this.observer !== null && this.anchor !== null) {
            this.observer.observe(this.anchor.nativeElement);
        }
    }
    ngOnDestroy() {
        if (this.observer !== null) {
            this.observer.disconnect();
        }
    }
    // ** Private API **
    isHostScrollable() {
        const style = window.getComputedStyle(this.hostRef.nativeElement);
        return style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';
    }
}
GlnInfiniteScrollComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInfiniteScrollComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GlnInfiniteScrollComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnInfiniteScrollComponent, selector: "gln-infinite-scroll", inputs: { options: "options" }, outputs: { scrolled: "scrolled" }, viewQueries: [{ propertyName: "anchor", first: true, predicate: ["anchor"], descendants: true }], exportAs: ["glnInfiniteScroll"], ngImport: i0, template: "<ng-content></ng-content>\n<div #anchor></div>", styles: ["gln-infinite-scroll{display:block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInfiniteScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-infinite-scroll', exportAs: 'glnInfiniteScroll', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n<div #anchor></div>", styles: ["gln-infinite-scroll{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { options: [{
                type: Input
            }], scrolled: [{
                type: Output
            }], anchor: [{
                type: ViewChild,
                args: ['anchor']
            }] } });

class GlnInfiniteScrollModule {
}
GlnInfiniteScrollModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInfiniteScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnInfiniteScrollModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnInfiniteScrollModule, declarations: [GlnInfiniteScrollComponent], imports: [CommonModule], exports: [GlnInfiniteScrollComponent] });
GlnInfiniteScrollModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInfiniteScrollModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInfiniteScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnInfiniteScrollComponent],
                    imports: [CommonModule],
                    exports: [GlnInfiniteScrollComponent],
                }]
        }] });

class GlnBasisFrame {
    constructor(uniqueIdCounter, prefix, hostRef, renderer, changeDetectorRef, ngZone) {
        this.prefix = prefix;
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.id = '';
        this.writeValueInit = new EventEmitter();
        this.disabled = null; // Binding attribute "isDisabled".
        this.error = null; // Binding attribute "isError".
        this.isWriteValueInit = null;
        this.labelShrink = null; // Binding attribute "isLabelShrink".
        this.noAnimation = null; // Binding attribute "isNoAnimation".
        this.noLabel = null; // Binding attribute "isNoLabel".
        this.readOnly = null; // Binding attribute "isReadOnly".
        this.required = null; // Binding attribute "isRequired".
        this.valueInit = null; // Binding attribute "isValueInit".
        // ** ControlValueAccessor - start **
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.onChange = () => { };
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.onTouched = () => { };
        this.id = `${prefix}-${uniqueIdCounter}`;
        if (!prefix) {
            console.warn('The "prefix" parameter is not defined, and therefore the "id" value is not unique.');
        }
    }
    ngOnChanges(changes) {
        if (changes['isDisabled']) {
            this.disabled = BooleanUtil.init(this.isDisabled);
            this.setDisabledState(!!this.disabled);
        }
        if (changes['isError']) {
            this.error = BooleanUtil.init(this.isError);
        }
        if (changes['isLabelShrink']) {
            this.labelShrink = BooleanUtil.init(this.isLabelShrink);
        }
        if (changes['isNoAnimation']) {
            this.noAnimation = BooleanUtil.init(this.isNoAnimation);
        }
        if (changes['isNoLabel']) {
            this.noLabel = BooleanUtil.init(this.isNoLabel);
        }
        if (changes['isReadOnly']) {
            this.readOnly = BooleanUtil.init(this.isReadOnly);
        }
        if (changes['isRequired']) {
            this.required = BooleanUtil.init(this.isRequired);
        }
        if (changes['isValueInit']) {
            this.valueInit = BooleanUtil.init(this.isValueInit);
        }
    }
    ngOnInit() {
        HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    }
    ngAfterContentInit() {
        // If 'IsValueInit' is specified and 'FormControlName' is not used, then enable the event on the second call to the 'WriteValue'.
        this.isWriteValueInit = this.valueInit && !this.hostRef.nativeElement.hasAttribute('formcontrolname');
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    writeValue(value) {
        if (this.isWriteValueInit) {
            this.isWriteValueInit = null;
            this.changeDetectorRef.markForCheck();
            // ValueAccessor.writeValue is being called twice, first time with a phantom null value
            // https://github.com/angular/angular/issues/14988
            // The zone will become stable when the component finishes rendering. And only after that execute the callback.
            // This helps to avoid animation spurious effects.
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                this.writeValueInit.emit();
                this.changeDetectorRef.markForCheck();
            });
        }
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    }
    // ** ControlValueAccessor - finish **
    // ** Public API **
    markForCheck() {
        this.changeDetectorRef.markForCheck();
    }
    getBoolean(value) {
        return BooleanUtil.init(value);
    }
}
GlnBasisFrame.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnBasisFrame, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
GlnBasisFrame.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnBasisFrame, inputs: { id: "id", isDisabled: "isDisabled", isError: "isError", isLabelShrink: "isLabelShrink", isNoAnimation: "isNoAnimation", isNoLabel: "isNoLabel", isReadOnly: "isReadOnly", isRequired: "isRequired", isValueInit: "isValueInit" }, outputs: { writeValueInit: "writeValueInit" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnBasisFrame, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: undefined }, { type: undefined }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { id: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isError: [{
                type: Input
            }], isLabelShrink: [{
                type: Input
            }], isNoAnimation: [{
                type: Input
            }], isNoLabel: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], isRequired: [{
                type: Input
            }], isValueInit: [{
                type: Input
            }], writeValueInit: [{
                type: Output
            }] } });

var GlnInputType;
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
class GlnInputTypeUtil {
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

let uniqueIdCounter$4 = 0;
const GLN_INPUT_CONFIG = new InjectionToken('GLN_INPUT_CONFIG');
class GlnInputComponent extends GlnBasisFrame {
    // public valueInit: boolean | null = null; // Binding attribute "isValueInit". // Is in GlnBasisControl.
    constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    platformId, changeDetectorRef, rootConfig, hostRef, renderer, ngZone) {
        super(uniqueIdCounter$4++, 'glnin', hostRef, renderer, changeDetectorRef, ngZone);
        this.platformId = platformId;
        this.rootConfig = rootConfig;
        // @Input()
        // public id = `glnin-${uniqueIdCounter++}`; // Is in GlnBasisControl.
        this.autoComplete = '';
        this.pattern = '';
        this.tabIndex = 0;
        this.type = GlnInputType.text.valueOf();
        this.focused = new EventEmitter();
        this.blured = new EventEmitter();
        // @Output()
        // readonly writeValueInit: EventEmitter<() => void> = new EventEmitter(); // From GlnBasisByFrame
        this.inputElementRef = null;
        this.currConfig = null;
        // public disabled: boolean | null = null; // Binding attribute "isDisabled". // Is in GlnBasisControl.
        // public error: boolean | null = null; // Binding attribute "isError". // Is in GlnBasisControl.
        this.formControl = new FormControl({ value: null, disabled: false }, []);
        this.formGroup = new FormGroup({ textData: this.formControl });
        this.frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
        this.isFocused = false;
        this.isFilled = false;
        // public isWriteValueInit: boolean | null = null;                            // Is in GlnBasisControl.
        // public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink". // Is in GlnBasisControl.
        // public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation". // Is in GlnBasisControl.
        // public noLabel: boolean | null = null; // Binding attribute "isNoLabel". // Is in GlnBasisControl.
        // public readOnly: boolean | null = null; // Binding attribute "isReadOnly". // Is in GlnBasisControl.
        // public required: boolean | null = null; // Binding attribute "isRequired". // Is in GlnBasisControl.
        this.typeVal = GlnInputType.text;
        this.currConfig = this.rootConfig;
        HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-input', true);
        HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
    }
    ngOnChanges(changes) {
        // In the GlnBasisControl.ngOnChanges(), the definition is made:
        // - this.disabled = BooleanUtil.init(this.isDisabled);
        // - this.error = BooleanUtil.init(this.isError);
        // - this.labelShrink = BooleanUtil.init(this.isLabelShrink);
        // - this.noAnimation = BooleanUtil.init(this.isNoAnimation);
        // - this.noLabel = BooleanUtil.init(this.isNoLabel);
        // - this.readOnly = BooleanUtil.init(this.isReadOnly);
        // - this.required = BooleanUtil.init(this.isRequired);
        // - this.valueInit = BooleanUtil.init(this.isValueInit);
        super.ngOnChanges(changes);
        if (changes['type']) {
            this.typeVal = GlnInputTypeUtil.create(this.type) || GlnInputType.text;
        }
        if (changes['config']) {
            this.currConfig = Object.assign(Object.assign({}, this.rootConfig), this.config);
        }
        if (changes['isRequired'] || changes['minLength'] || changes['maxLength']) {
            this.prepareFormGroup(this.required, this.minLength, this.maxLength);
        }
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngAfterContentInit() {
        super.ngAfterContentInit();
    }
    // ** ControlValueAccessor - start **
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    writeValue(value) {
        const isFilledOld = !!this.formControl.value;
        this.formControl.setValue(value, { emitEvent: false });
        this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
        if (isFilledOld !== this.isFilled) {
            this.changeDetectorRef.markForCheck();
        }
        super.writeValue(value);
    }
    setDisabledState(isDisabled) {
        if (this.disabled !== isDisabled) {
            isDisabled ? this.formGroup.disable() : this.formGroup.enable();
            super.setDisabledState(isDisabled);
        }
    }
    // ** ControlValueAccessor - finish **
    // ** Validator - start **
    validate(control) {
        return !control ? null : this.formControl.errors;
    }
    // ** Validator - finish **
    // ** GlnNodeInternalValidator - start **
    addValidators(validators) {
        if (validators != null) {
            this.formControl.addValidators(validators);
            this.formControl.updateValueAndValidity();
        }
    }
    addAsyncValidators(validators) {
        if (validators != null) {
            this.formControl.addAsyncValidators(validators);
            this.formControl.updateValueAndValidity();
        }
    }
    // ** GlnNodeInternalValidator - finish **
    // ** Public API **
    focus() {
        if (isPlatformBrowser(this.platformId) && !!this.inputElementRef) {
            this.inputElementRef.nativeElement.focus();
        }
    }
    doFocus() {
        this.isFocused = true;
        this.focusState(this.renderer, this.hostRef, this.isFocused);
        this.focused.emit();
    }
    doBlur() {
        this.isFocused = false;
        this.focusState(this.renderer, this.hostRef, this.isFocused);
        this.isFilled = !!this.formControl.value;
        this.onTouched();
        this.blured.emit();
    }
    doInput(event) {
        // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
        // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
        if (!!event && !event.cancelBubble) {
            this.onChange(this.formControl.value);
        }
    }
    // ** Private API **
    prepareFormGroup(isRequired, minLength, maxLength) {
        this.formControl.clearValidators();
        const newValidator = [];
        if (isRequired) {
            newValidator.push(Validators.required);
        }
        if (!!minLength && minLength > 0) {
            newValidator.push(Validators.minLength(minLength));
        }
        if (!!maxLength && maxLength > 0) {
            newValidator.push(Validators.maxLength(maxLength));
        }
        this.formControl.setValidators(newValidator);
    }
    focusState(renderer, elem, value) {
        HtmlElemUtil.setClass(renderer, elem, 'gln-focused', value || false);
        HtmlElemUtil.setAttr(renderer, elem, 'foc', value ? '' : null);
    }
}
GlnInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInputComponent, deps: [{ token: PLATFORM_ID }, { token: i0.ChangeDetectorRef }, { token: GLN_INPUT_CONFIG, optional: true }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
GlnInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnInputComponent, selector: "gln-input", inputs: { autoComplete: "autoComplete", config: "config", exterior: "exterior", frameSize: "frameSize", helperText: "helperText", label: "label", max: "max", maxLength: "maxLength", min: "min", minLength: "minLength", ornamLfAlign: "ornamLfAlign", ornamRgAlign: "ornamRgAlign", pattern: "pattern", step: "step", tabIndex: "tabIndex", type: "type", wdFull: "wdFull" }, outputs: { focused: "focused", blured: "blured" }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnInputComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnInputComponent), multi: true },
        { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnInputComponent },
    ], viewQueries: [{ propertyName: "inputElementRef", first: true, predicate: ["inputElement"], descendants: true }], exportAs: ["glnInput"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-container [formGroup]=\"formGroup\">\n  <div class=\"glnin-wrap\"\n    [glnFrameExteriorInput]=\"exterior || currConfig?.exterior\"\n    #glnFrameExteriorInput=\"glnFrameExteriorInput\"\n    [glnFrameExteriorInputElementRef]=\"hostRef\"\n    (glnFrameExteriorInputChange)=\"glnFrameSize.updatePaddingVerAndHor()\">\n    <gln-frame [config]=\"currConfig\"\n      [exterior]=\"glnFrameExteriorInput.exterior\"\n      [isDisabled]=\"disabled\"\n      [isError]=\"!!formControl.errors || error\"\n      [isFilled]=\"isFilled\"\n      [isLabelShrink]=\"labelShrink || currConfig?.isLabelShrink\"\n      [isNoAnimation]=\"noAnimation || currConfig?.isNoAnimation || isWriteValueInit\"\n      [isNoLabel]=\"noLabel || currConfig?.isNoLabel\"\n      [isRequired]=\"required\"\n      [label]=\"label\"\n      [glnFrameSize]=\"frameSize || currConfig?.frameSize\"\n      #glnFrameSize=\"glnFrameSize\"\n      [glnFrameSizeElementRef]=\"hostRef\"\n      [glnFrameSizeValue]=\"currConfig?.frameSizeValue || frameSizeDefault\"\n      [glnFrameSizeLabelPd]=\"currConfig?.labelPd\"\n      [glnFrameSizePrepare]=\"glnFrameExteriorInput\"\n      glnFrameOrnament\n      [glnFrameOrnamentLfAlign]=\"ornamLfAlign || currConfig?.ornamLfAlign\"\n      [glnFrameOrnamentRgAlign]=\"ornamRgAlign || currConfig?.ornamRgAlign\"\n      [glnFrameOrnamentPath]=\"'/div{0}'\">\n\n      <span glnfr-orn-lf\n        class=\"gln-ornam-lf\">\n        <ng-content select=\"[gln-orn-lf]\"></ng-content>\n      </span>\n      <span glnfr-orn-rg\n        class=\"gln-ornam-rg\">\n        <ng-content select=\"[gln-orn-rg]\"></ng-content>\n      </span>\n\n      <input #inputElement\n        formControlName=\"textData\"\n        glnfr-pd-ver\n        glnfr-pd-hor\n        glnfr-elem\n        [attr.id]=\"id + '_input'\"\n        [type]=\"typeVal\"\n        [ngClass]=\"['glnin-input', (readOnly ? 'gln-readonly' : '')]\"\n        [attr.disabled]=\"disabled ? '': null\"\n        [attr.autocomplete]=\"!!autoComplete ? autoComplete : null\"\n        [attr.readonly]=\"readOnly ? '': null\"\n        [attr.min]=\"min\"\n        [attr.max]=\"max\"\n        [attr.step]=\"step\"\n        [attr.tabindex]=\"!disabled ? tabIndex : null\"\n        [pattern]=\"pattern\"\n        (focus)=\"doFocus()\"\n        (blur)=\"doBlur()\"\n        (input)=\"doInput($event)\" />\n\n    </gln-frame>\n  </div>\n</ng-container>\n<gln-hint-or-error *ngIf=\"!!helperText\"\n  [text]=\"helperText\"\n  [isError]=\"!!formControl.errors || error\"\n  [isFocused]=\"isFocused\"\n  [isDisabled]=\"disabled\">\n</gln-hint-or-error>", styles: ["gln-input{display:inline-flex;flex-direction:column}gln-input[wdFull]{width:100%}gln-input[wdFull] gln-frame>div>[glnfr-elem]{width:100%}gln-input[noHeEllipsis] gln-hint-or-error{white-space:normal;overflow:visible;text-overflow:clip}gln-input .glnin-input{font-size:inherit;font-family:inherit;letter-spacing:inherit;color:inherit;border:0;box-sizing:content-box;background:none;margin:0;padding:0}gln-input .glnin-input:focus{outline:0}gln-input gln-hint-or-error{padding-left:var(--glnin-he-pd-lf, var(--glnfrs-pd-lf));padding-right:var(--glnin-he-pd-rg, var(--glnfrs-pd-rg))}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: GlnFrameExteriorInputDirective, selector: "[glnFrameExteriorInput]", inputs: ["glnFrameExteriorInput", "glnFrameExteriorInputElementRef"], outputs: ["glnFrameExteriorInputChange"], exportAs: ["glnFrameExteriorInput"] }, { kind: "component", type: GlnFrameComponent, selector: "gln-frame", inputs: ["config", "exterior", "isDisabled", "isError", "isFilled", "isLabelShrink", "isNoAnimation", "isNoLabel", "isRequired", "label"], exportAs: ["glnFrame"] }, { kind: "directive", type: GlnFrameOrnamentDirective, selector: "[glnFrameOrnament]", inputs: ["glnFrameOrnamentLfAlign", "glnFrameOrnamentRgAlign", "glnFrameOrnamentElementRef", "glnFrameOrnamentPath", "glnFrameOrnamentAfterContent"], exportAs: ["glnFrameOrnament"] }, { kind: "directive", type: GlnFrameSizeDirective, selector: "[glnFrameSize]", inputs: ["glnFrameSize", "glnFrameSizeValue", "glnFrameSizeLabelPd", "glnFrameSizeElementRef", "glnFrameSizePrepare", "glnFrameSizeModify"], outputs: ["glnFrameSizeChange"], exportAs: ["glnFrameSize"] }, { kind: "component", type: GlnHintOrErrorComponent, selector: "gln-hint-or-error", inputs: ["text", "isError", "isFocused", "isDisabled"], exportAs: ["glnHintOrError"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-input', exportAs: 'glnInput', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnInputComponent), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnInputComponent), multi: true },
                        { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnInputComponent },
                    ], template: "<ng-container [formGroup]=\"formGroup\">\n  <div class=\"glnin-wrap\"\n    [glnFrameExteriorInput]=\"exterior || currConfig?.exterior\"\n    #glnFrameExteriorInput=\"glnFrameExteriorInput\"\n    [glnFrameExteriorInputElementRef]=\"hostRef\"\n    (glnFrameExteriorInputChange)=\"glnFrameSize.updatePaddingVerAndHor()\">\n    <gln-frame [config]=\"currConfig\"\n      [exterior]=\"glnFrameExteriorInput.exterior\"\n      [isDisabled]=\"disabled\"\n      [isError]=\"!!formControl.errors || error\"\n      [isFilled]=\"isFilled\"\n      [isLabelShrink]=\"labelShrink || currConfig?.isLabelShrink\"\n      [isNoAnimation]=\"noAnimation || currConfig?.isNoAnimation || isWriteValueInit\"\n      [isNoLabel]=\"noLabel || currConfig?.isNoLabel\"\n      [isRequired]=\"required\"\n      [label]=\"label\"\n      [glnFrameSize]=\"frameSize || currConfig?.frameSize\"\n      #glnFrameSize=\"glnFrameSize\"\n      [glnFrameSizeElementRef]=\"hostRef\"\n      [glnFrameSizeValue]=\"currConfig?.frameSizeValue || frameSizeDefault\"\n      [glnFrameSizeLabelPd]=\"currConfig?.labelPd\"\n      [glnFrameSizePrepare]=\"glnFrameExteriorInput\"\n      glnFrameOrnament\n      [glnFrameOrnamentLfAlign]=\"ornamLfAlign || currConfig?.ornamLfAlign\"\n      [glnFrameOrnamentRgAlign]=\"ornamRgAlign || currConfig?.ornamRgAlign\"\n      [glnFrameOrnamentPath]=\"'/div{0}'\">\n\n      <span glnfr-orn-lf\n        class=\"gln-ornam-lf\">\n        <ng-content select=\"[gln-orn-lf]\"></ng-content>\n      </span>\n      <span glnfr-orn-rg\n        class=\"gln-ornam-rg\">\n        <ng-content select=\"[gln-orn-rg]\"></ng-content>\n      </span>\n\n      <input #inputElement\n        formControlName=\"textData\"\n        glnfr-pd-ver\n        glnfr-pd-hor\n        glnfr-elem\n        [attr.id]=\"id + '_input'\"\n        [type]=\"typeVal\"\n        [ngClass]=\"['glnin-input', (readOnly ? 'gln-readonly' : '')]\"\n        [attr.disabled]=\"disabled ? '': null\"\n        [attr.autocomplete]=\"!!autoComplete ? autoComplete : null\"\n        [attr.readonly]=\"readOnly ? '': null\"\n        [attr.min]=\"min\"\n        [attr.max]=\"max\"\n        [attr.step]=\"step\"\n        [attr.tabindex]=\"!disabled ? tabIndex : null\"\n        [pattern]=\"pattern\"\n        (focus)=\"doFocus()\"\n        (blur)=\"doBlur()\"\n        (input)=\"doInput($event)\" />\n\n    </gln-frame>\n  </div>\n</ng-container>\n<gln-hint-or-error *ngIf=\"!!helperText\"\n  [text]=\"helperText\"\n  [isError]=\"!!formControl.errors || error\"\n  [isFocused]=\"isFocused\"\n  [isDisabled]=\"disabled\">\n</gln-hint-or-error>", styles: ["gln-input{display:inline-flex;flex-direction:column}gln-input[wdFull]{width:100%}gln-input[wdFull] gln-frame>div>[glnfr-elem]{width:100%}gln-input[noHeEllipsis] gln-hint-or-error{white-space:normal;overflow:visible;text-overflow:clip}gln-input .glnin-input{font-size:inherit;font-family:inherit;letter-spacing:inherit;color:inherit;border:0;box-sizing:content-box;background:none;margin:0;padding:0}gln-input .glnin-input:focus{outline:0}gln-input gln-hint-or-error{padding-left:var(--glnin-he-pd-lf, var(--glnfrs-pd-lf));padding-right:var(--glnin-he-pd-rg, var(--glnfrs-pd-rg))}\n"] }]
        }], ctorParameters: function () {
        return [{ type: Object, decorators: [{
                        type: Inject,
                        args: [PLATFORM_ID]
                    }] }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [GLN_INPUT_CONFIG]
                    }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }];
    }, propDecorators: { autoComplete: [{
                type: Input
            }], config: [{
                type: Input
            }], exterior: [{
                type: Input
            }], frameSize: [{
                type: Input
            }], helperText: [{
                type: Input
            }], label: [{
                type: Input
            }], max: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], min: [{
                type: Input
            }], minLength: [{
                type: Input
            }], ornamLfAlign: [{
                type: Input
            }], ornamRgAlign: [{
                type: Input
            }], pattern: [{
                type: Input
            }], step: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], type: [{
                type: Input
            }], wdFull: [{
                type: Input
            }], focused: [{
                type: Output
            }], blured: [{
                type: Output
            }], inputElementRef: [{
                type: ViewChild,
                args: ['inputElement']
            }] } });

class GlnInputModule {
}
GlnInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnInputModule, declarations: [GlnInputComponent], imports: [CommonModule,
        ReactiveFormsModule,
        GlnColorModule,
        GlnFrameExteriorInputModule,
        GlnFrameModule,
        GlnFrameOrnamentModule,
        GlnFrameSizeModule,
        GlnHintOrErrorModule], exports: [GlnInputComponent] });
GlnInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInputModule, imports: [CommonModule,
        ReactiveFormsModule,
        GlnColorModule,
        GlnFrameExteriorInputModule,
        GlnFrameModule,
        GlnFrameOrnamentModule,
        GlnFrameSizeModule,
        GlnHintOrErrorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnInputModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnInputComponent],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        GlnColorModule,
                        GlnFrameExteriorInputModule,
                        GlnFrameModule,
                        GlnFrameOrnamentModule,
                        GlnFrameSizeModule,
                        GlnHintOrErrorModule,
                    ],
                    exports: [GlnInputComponent],
                }]
        }] });

/**
 * The injection token that is used to access the parent element for the option.
 */
const GLN_OPTION_PARENT = new InjectionToken('GLN_OPTION_PARENT');

/**
 * The injection token that is used to access the option group description element.
 */
const GLN_OPTION_GROUP = new InjectionToken('GLN_OPTION_GROUP');

let uniqueIdCounter$3 = 0;
class GlnOptionComponent {
    constructor(hostRef, renderer, changeDetectorRef, parent, group) {
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.parent = parent;
        this.group = group;
        this.id = `glnop-${uniqueIdCounter$3++}`;
        this.checkmark = false;
        this.formControl = new FormControl();
        this.formGroup = new FormGroup({ checkinfo: this.formControl });
        this.marked = false;
        this.multiple = false;
        HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'role', 'option');
    }
    doClick() {
        if (this.parent && !this.disabled) {
            this.parent.optionSelection(this);
        }
    }
    ngOnChanges(changes) {
        var _a, _b;
        if (changes['isDisabled']) {
            this.disabled = BooleanUtil.init(this.isDisabled);
            this.setDisabled((_a = this.disabled) !== null && _a !== void 0 ? _a : (_b = this.group) === null || _b === void 0 ? void 0 : _b.disabled);
        }
    }
    ngOnInit() {
        var _a, _b, _c;
        HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
        this.setMultiple(((_a = this.parent) === null || _a === void 0 ? void 0 : _a.multiple) || null);
        this.setCheckmark(((_b = this.parent) === null || _b === void 0 ? void 0 : _b.checkmark) || null);
        if (this.disabled === undefined) {
            this.setDisabled((_c = this.group) === null || _c === void 0 ? void 0 : _c.disabled);
        }
        this.setSelected(!!this.selected);
    }
    // ** Public API **
    getTextContent() {
        return (this.hostRef.nativeElement.textContent || '').trim();
    }
    getTrustHtml() {
        return (this.contentRef.nativeElement.innerHTML || '').trim();
    }
    /** Check or uncheck "checkmark". */
    setCheckmark(value) {
        if (this.checkmark !== !!value && (!!value === false || this.multiple)) {
            this.checkmark = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-checkmark', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'che', value ? '' : null);
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Check or uncheck disabled. */
    setDisabled(value) {
        if (this.disabled !== !!value) {
            this.disabled = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-disabled', '' + !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'tabindex', value ? null : '0');
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Check or uncheck marking. */
    setMarked(value) {
        if (this.marked !== !!value) {
            this.marked = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-marked', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'mar', value ? '' : null);
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Check or uncheck multiple. */
    setMultiple(value) {
        if (this.multiple !== value) {
            this.multiple = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-multiple', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'mul', value ? '' : null);
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Check or uncheck selected. */
    setSelected(value) {
        if (this.selected !== !!value) {
            this.selected = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-selected', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'sel', value ? '' : null);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-selected', '' + !!value);
            this.formControl.setValue(value);
            this.changeDetectorRef.markForCheck();
        }
    }
}
GlnOptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: GLN_OPTION_PARENT, optional: true }, { token: GLN_OPTION_GROUP, optional: true }], target: i0.ɵɵFactoryTarget.Component });
GlnOptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnOptionComponent, selector: "gln-option", inputs: { id: "id", isDisabled: "isDisabled", value: "value" }, host: { listeners: { "click": "doClick()" } }, viewQueries: [{ propertyName: "contentRef", first: true, predicate: ["contentRef"], descendants: true, static: true }], exportAs: ["glnOption"], usesOnChanges: true, ngImport: i0, template: "<span *ngIf=\"checkmark\"\n  glno-chbox-wrap\n  class=\"gln-checkbox-wrap\"\n  [formGroup]=\"formGroup\">\n  <input type=\"checkbox\"\n    glno-chbox\n    class=\"gln-checkbox\"\n    formControlName=\"checkinfo\" />\n</span>\n<div #contentRef\n  glno-label\n  class=\"gln-option-label\">\n  <ng-content></ng-content>\n</div>\n\n<gln-touch-ripple *ngIf=\"!disabled && !group?.disabled && !parent?.noRipple\">\n</gln-touch-ripple>", styles: ["gln-option{align-items:center;-webkit-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent;background-color:transparent;box-sizing:border-box;color:inherit;cursor:pointer;display:flex;justify-content:flex-start;outline:0px;padding:.375em 1em;position:relative;text-decoration:none;-webkit-user-select:none;user-select:none;--glntr-ripple-cl: hsla(var(--gln-default-h), var(--gln-default-s), var(--gln-default-l), .1)}gln-option>[mul]>input{cursor:inherit}gln-option[dis]{opacity:.38;pointer-events:none;cursor:default}gln-option:not([dis]):hover{text-decoration:none}gln-option:not([dis]):hover:not([mar]){background-color:hsla(var(--gln-default-h),var(--gln-default-s),80%,.2)}gln-option:not([dis])[mar]:not([sel]){background-color:hsla(var(--gln-default-h),var(--gln-default-s),50%,.2)}gln-option:not([dis])[sel]:not([mar]){background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.08)}gln-option:not([dis])[sel][mar]{background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.2)}gln-option:not([dis])[sel]:hover{background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.12)}gln-option>[glno-chbox-wrap]{margin-right:9px}gln-option>[glno-chbox-wrap]>input{cursor:inherit}gln-option>[glno-label]{flex-grow:1;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: GlnTouchRippleComponent, selector: "gln-touch-ripple", inputs: ["id", "isCenter"], exportAs: ["glnTouchRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-option', exportAs: 'glnOption', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<span *ngIf=\"checkmark\"\n  glno-chbox-wrap\n  class=\"gln-checkbox-wrap\"\n  [formGroup]=\"formGroup\">\n  <input type=\"checkbox\"\n    glno-chbox\n    class=\"gln-checkbox\"\n    formControlName=\"checkinfo\" />\n</span>\n<div #contentRef\n  glno-label\n  class=\"gln-option-label\">\n  <ng-content></ng-content>\n</div>\n\n<gln-touch-ripple *ngIf=\"!disabled && !group?.disabled && !parent?.noRipple\">\n</gln-touch-ripple>", styles: ["gln-option{align-items:center;-webkit-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent;background-color:transparent;box-sizing:border-box;color:inherit;cursor:pointer;display:flex;justify-content:flex-start;outline:0px;padding:.375em 1em;position:relative;text-decoration:none;-webkit-user-select:none;user-select:none;--glntr-ripple-cl: hsla(var(--gln-default-h), var(--gln-default-s), var(--gln-default-l), .1)}gln-option>[mul]>input{cursor:inherit}gln-option[dis]{opacity:.38;pointer-events:none;cursor:default}gln-option:not([dis]):hover{text-decoration:none}gln-option:not([dis]):hover:not([mar]){background-color:hsla(var(--gln-default-h),var(--gln-default-s),80%,.2)}gln-option:not([dis])[mar]:not([sel]){background-color:hsla(var(--gln-default-h),var(--gln-default-s),50%,.2)}gln-option:not([dis])[sel]:not([mar]){background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.08)}gln-option:not([dis])[sel][mar]{background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.2)}gln-option:not([dis])[sel]:hover{background-color:hsla(var(--gln-primary-h),var(--gln-primary-s),var(--gln-primary-l),.12)}gln-option>[glno-chbox-wrap]{margin-right:9px}gln-option>[glno-chbox-wrap]>input{cursor:inherit}gln-option>[glno-label]{flex-grow:1;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [GLN_OPTION_PARENT]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [GLN_OPTION_GROUP]
                    }] }];
    }, propDecorators: { id: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], value: [{
                type: Input
            }], contentRef: [{
                type: ViewChild,
                args: ['contentRef', { static: true }]
            }], doClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class GlnOptionModule {
}
GlnOptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnOptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionModule, declarations: [GlnOptionComponent], imports: [CommonModule, ReactiveFormsModule, GlnTouchRippleModule], exports: [GlnOptionComponent] });
GlnOptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionModule, imports: [CommonModule, ReactiveFormsModule, GlnTouchRippleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnOptionComponent],
                    imports: [CommonModule, ReactiveFormsModule, GlnTouchRippleModule],
                    exports: [GlnOptionComponent],
                }]
        }] });

class GlnOptionUtil {
    static setSelected(options, isSelected) {
        let result = 0;
        for (let idx = 0; idx < options.length; idx++) {
            const option = options[idx];
            if (option.selected !== isSelected) {
                option.setSelected(isSelected);
                result++;
            }
        }
        return result;
    }
    static findByValue(options, value) {
        let result = null;
        for (let idx = 0; idx < options.length && !result; idx++) {
            result = options[idx].value === value ? options[idx] : result;
        }
        return result;
    }
    /** Get a list of values for all selected options. */
    static getValues(options) {
        const result = Array(options.length);
        for (let idx = 0; idx < options.length; idx++) {
            result[idx] = options[idx].value;
        }
        return result;
    }
    /** Get a list of options according to an array of values. */
    static getOptionsByValues(newValue, options) {
        const result = [];
        const values = Array.isArray(newValue) ? newValue : [newValue];
        const buff = values.slice();
        for (let idx = 0; idx < options.length && buff.length > 0; idx++) {
            const index = buff.indexOf(options[idx].value);
            if (index > -1) {
                result.push(options[idx]);
                buff.splice(index, 1);
            }
        }
        return result;
    }
}

let uniqueIdCounter$2 = 0;
class GlnOptionGroupComponent {
    constructor(hostRef, renderer, changeDetectorRef) {
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.id = `glnog-${uniqueIdCounter$2++}`;
        HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'role', 'group');
    }
    ngOnChanges(changes) {
        if (changes['isDisabled']) {
            this.setDisabled(BooleanUtil.init(this.isDisabled));
        }
    }
    ngOnInit() {
        HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
        if (this.disabled === null) {
            this.setDisabled(!!this.disabled);
        }
    }
    // ** Public API **
    /** Check or uncheck disabled. */
    setDisabled(value) {
        if (this.disabled !== !!value) {
            this.disabled = !!value;
            HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
            HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-disabled', '' + !!value);
            this.changeDetectorRef.markForCheck();
        }
    }
}
GlnOptionGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionGroupComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GlnOptionGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnOptionGroupComponent, selector: "gln-option-group", inputs: { id: "id", isDisabled: "isDisabled", label: "label" }, providers: [{ provide: GLN_OPTION_GROUP, useExisting: GlnOptionGroupComponent }], exportAs: ["glnOptionGroup"], usesOnChanges: true, ngImport: i0, template: "<span glnog-label\n  class=\"gln-option-group-label\"\n  aria-hidden=\"true\">{{ label }} <ng-content></ng-content></span>\n<ng-content select=\"gln-option, ng-container\"></ng-content>", styles: ["gln-option-group{background-color:transparent;box-sizing:border-box;display:flex;flex-direction:column;outline:0px;--glnog--def-lb-def38: hsl(var(--gln-default-h), var(--gln-default-s), 38%)}gln-option-group[dis]{cursor:default}gln-option-group[dis]>[glnog-label]{opacity:.38}gln-option-group>[glnog-label]{color:var(--glnog--def-lb-def38);flex-grow:1;font-weight:500;overflow:hidden;padding:.375em 1em;text-align:left;text-decoration:none;text-overflow:ellipsis;-webkit-user-select:none;user-select:none;white-space:nowrap}gln-option-group>gln-option{padding-left:2em}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-option-group', exportAs: 'glnOptionGroup', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [{ provide: GLN_OPTION_GROUP, useExisting: GlnOptionGroupComponent }], template: "<span glnog-label\n  class=\"gln-option-group-label\"\n  aria-hidden=\"true\">{{ label }} <ng-content></ng-content></span>\n<ng-content select=\"gln-option, ng-container\"></ng-content>", styles: ["gln-option-group{background-color:transparent;box-sizing:border-box;display:flex;flex-direction:column;outline:0px;--glnog--def-lb-def38: hsl(var(--gln-default-h), var(--gln-default-s), 38%)}gln-option-group[dis]{cursor:default}gln-option-group[dis]>[glnog-label]{opacity:.38}gln-option-group>[glnog-label]{color:var(--glnog--def-lb-def38);flex-grow:1;font-weight:500;overflow:hidden;padding:.375em 1em;text-align:left;text-decoration:none;text-overflow:ellipsis;-webkit-user-select:none;user-select:none;white-space:nowrap}gln-option-group>gln-option{padding-left:2em}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { id: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], label: [{
                type: Input
            }] } });

class GlnOptionGroupModule {
}
GlnOptionGroupModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionGroupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnOptionGroupModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionGroupModule, declarations: [GlnOptionGroupComponent], imports: [CommonModule], exports: [GlnOptionGroupComponent] });
GlnOptionGroupModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionGroupModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnOptionGroupModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnOptionGroupComponent],
                    imports: [CommonModule],
                    exports: [GlnOptionGroupComponent],
                }]
        }] });

const GLN_SELECT_TRIGGER = new InjectionToken('GlnSelectTrigger');
class GlnSelectTriggerDirective {
}
GlnSelectTriggerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectTriggerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
GlnSelectTriggerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.2", type: GlnSelectTriggerDirective, selector: "gln-select-trigger", providers: [{ provide: GLN_SELECT_TRIGGER, useExisting: GlnSelectTriggerDirective }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: 'gln-select-trigger',
                    providers: [{ provide: GLN_SELECT_TRIGGER, useExisting: GlnSelectTriggerDirective }],
                }]
        }] });

/** Injection token that determines how scrolling is handled when the panel is open. */
const GLN_SELECT_SCROLL_STRATEGY = new InjectionToken('GLN_SELECT_SCROLL_STRATEGY');
function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_BLOCK_FACTORY(overlay) {
    return () => overlay.scrollStrategies.block();
}
function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_CLOSE_FACTORY(overlay) {
    return () => overlay.scrollStrategies.close();
}
function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_NOOP_FACTORY(overlay) {
    return () => overlay.scrollStrategies.noop();
}
function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
const GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION = {
    provide: GLN_SELECT_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION_FACTORY,
};

let uniqueIdCounter$1 = 0;
const GLN_SELECT_CONFIG = new InjectionToken('GLN_SELECT_CONFIG');
const CSS_ATTR_FOR_FRAME_FOCUS = 'foc';
const CSS_ATTR_FOR_PANEL_OPENING_ANIMATION = 'is-open';
const CSS_ATTR_FOR_PANEL_CLOSING_ANIMATION = 'is-hide';
const CSS_PROP_BORDER_RADIUS = '--glnslpo-border-radius';
const CSS_PROP_MAX_HEIGHT = '--glnslpo-max-height';
const CSS_PROP_EL_MIN_WIDTH = '--glnsl-el-min-width';
const CSS_PROP_EL_MIN_HEIGHT = '--glnsl-el-min-height';
const CSS_PROP_TRANSLATE_Y = '--glnslpo-translate-y';
class GlnSelectComponent extends GlnBasisFrame {
    constructor(hostRef, renderer, changeDetectorRef, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    platformId, rootConfig, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    scrollStrategyFactory, ngZone) {
        super(uniqueIdCounter$1++, 'glnsl', hostRef, renderer, changeDetectorRef, ngZone);
        this.platformId = platformId;
        this.rootConfig = rootConfig;
        this.scrollStrategyFactory = scrollStrategyFactory;
        this.panelClass = ''; // -
        this.visibleSize = 0;
        this.tabIndex = 0; // ~
        this.focused = new EventEmitter();
        this.blured = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        // @Output()
        // readonly writeValueInit: EventEmitter<() => void> = new EventEmitter(); // Is in GlnBasisControl.
        this.selected = new EventEmitter();
        this.backdropClassVal = null;
        this.checkmark = null; // Binding attribute "isCheckmark". // interface GlnOptionParent
        this.currConfig = null;
        // public disabled: boolean | null = null; // Binding attribute "isDisabled". // Is in GlnBasisControl.
        // public error: boolean | null = null; // Binding attribute "isError". // Is in GlnBasisControl.
        this.errors = null;
        this.formControl = new FormControl({ value: null, disabled: false }, []);
        this.formGroup = new FormGroup({ textData: this.formControl });
        this.frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
        this.hasPanelAnimation = false;
        this.isFocused = false;
        this.isFilled = false;
        this.isPanelOpen = false;
        // public isWriteValueInit: boolean | null = null;                         // Is in GlnBasisControl.
        // public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink". // Is in GlnBasisControl.
        this.multiple = null; // Binding attribute "isMultiple". // interface GlnOptionParent
        // public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation". // Is in GlnBasisControl.
        this.noIcon = null; // Binding attribute "isNoIcon",
        // public noLabel: boolean | null = null; // Binding attribute "isNoLabel". // Is in GlnBasisControl.
        this.noRipple = null; // Binding attribute "isNoRipple". // interface GlnOptionParent
        this.overlayPanelClass = '';
        this.positionList = [];
        // public readOnly: boolean | null = null; // Binding attribute "isReadOnly". // Is in GlnBasisControl.
        // public required: boolean | null = null; // Binding attribute "isRequired". // Is in GlnBasisControl.
        this.selectedOptions = [];
        /** The position and dimensions for the trigger's bounding box. */
        this.triggerRect = null;
        // public valueInit: boolean | null = null; // Binding attribute "isValueInit". // Is in GlnBasisControl.
        this.visibleSizeVal = null; // Binding attribute "visibleSize".
        this.isFocusAttrOnFrame = false;
        this.markedOption = null;
        this.maxWidth = 0;
        /** Saving the font size of the trigger element. */
        this.triggerFontSize = 0;
        /** Saving the frame size of the trigger element. Defines BorderRadius. */
        this.triggerFrameSize = 0;
        this.currConfig = this.rootConfig;
        this.scrollStrategy = this.scrollStrategyFactory();
        HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-select', true);
        HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
    }
    get value() {
        return this.valueData;
    }
    set value(newValue) {
        if (this.multiple && !Array.isArray(newValue)) {
            throw Error('The value must be an array in multi-select mode.');
        }
        if (!this.multiple && Array.isArray(newValue)) {
            throw Error('The value must not be an array in single select mode.');
        }
        if (newValue !== this.valueData || (this.multiple && Array.isArray(newValue))) {
            // Get a list of menu items according to an array of values.
            const newOptions = GlnOptionUtil.getOptionsByValues(newValue, this.options);
            // Which elements of array "this.selectedOptions" are not included in array "newOptions".
            const removed = ArrayUtil.uninclude(this.selectedOptions, newOptions);
            // Which elements of array "newOptions" are not included in array "this.selectedOptions".
            const added = ArrayUtil.uninclude(newOptions, this.selectedOptions);
            this.selectedOptions = this.mergeOptions(this.selectedOptions, added, removed);
            this.updateValueDataAndIsFilledAndValidity(newValue);
            this.changeDetectorRef.markForCheck();
        }
    }
    get options() {
        var _a;
        return ((_a = this.optionList) === null || _a === void 0 ? void 0 : _a.toArray()) || [];
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    set options(value) { }
    ngOnChanges(changes) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // In the GlnBasisControl.ngOnChanges(), the definition is made:
        // - this.disabled = BooleanUtil.init(this.isDisabled);
        // - this.error = BooleanUtil.init(this.isError);
        // - this.labelShrink = BooleanUtil.init(this.isLabelShrink);
        // - this.noAnimation = BooleanUtil.init(this.isNoAnimation);
        // - this.noLabel = BooleanUtil.init(this.isNoLabel);
        // - this.readOnly = BooleanUtil.init(this.isReadOnly);
        // - this.required = BooleanUtil.init(this.isRequired);
        // - this.valueInit = BooleanUtil.init(this.isValueInit);
        super.ngOnChanges(changes);
        if (changes['config']) {
            this.currConfig = Object.assign(Object.assign({}, this.rootConfig), this.config);
            if (this.noAnimation == null) {
                this.noAnimation = ((_a = this.currConfig) === null || _a === void 0 ? void 0 : _a.isNoAnimation) || null;
            }
        }
        if (changes['isCheckmark'] || (changes['config'] && this.isCheckmark == null)) {
            this.checkmark = BooleanUtil.init(this.isCheckmark) || ((_b = this.currConfig) === null || _b === void 0 ? void 0 : _b.isCheckmark) || null;
        }
        if (changes['isMultiple'] || (changes['config'] && this.isMultiple == null)) {
            this.multiple = BooleanUtil.init(this.isMultiple) || ((_c = this.currConfig) === null || _c === void 0 ? void 0 : _c.isMultiple) || null;
        }
        if (changes['isNoIcon'] || (changes['config'] && this.isNoIcon == null)) {
            this.noIcon = BooleanUtil.init(this.isNoIcon) || ((_d = this.currConfig) === null || _d === void 0 ? void 0 : _d.isNoIcon) || null;
        }
        if (changes['isNoRipple'] || (changes['config'] && this.isNoRipple == null)) {
            this.noRipple = BooleanUtil.init(this.isNoRipple) || ((_e = this.currConfig) === null || _e === void 0 ? void 0 : _e.isNoRipple) || null;
        }
        if (changes['panelClass'] || (changes['config'] && this.panelClass == null)) {
            this.panelClassList = this.panelClass || ((_f = this.currConfig) === null || _f === void 0 ? void 0 : _f.panelClass);
        }
        if (changes['position'] || (changes['config'] && this.position == null)) {
            this.positionList = this.getPositionList(this.position || ((_g = this.currConfig) === null || _g === void 0 ? void 0 : _g.position));
        }
        if (changes['visibleSize'] || (changes['config'] && this.visibleSize == null)) {
            this.visibleSizeVal = this.visibleSize || ((_h = this.currConfig) === null || _h === void 0 ? void 0 : _h.visibleSize) || null;
        }
    }
    ngOnInit() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        super.ngOnInit();
        if (this.backdropClassVal == null) {
            this.backdropClassVal = ((_a = this.currConfig) === null || _a === void 0 ? void 0 : _a.backdropClass) || null;
        }
        if (this.checkmark == null) {
            this.checkmark = ((_b = this.currConfig) === null || _b === void 0 ? void 0 : _b.isCheckmark) || null;
        }
        if (this.multiple == null) {
            this.multiple = ((_c = this.currConfig) === null || _c === void 0 ? void 0 : _c.isMultiple) || null;
        }
        if (this.noAnimation == null) {
            this.noAnimation = ((_d = this.currConfig) === null || _d === void 0 ? void 0 : _d.isNoAnimation) || null;
        }
        if (this.noIcon == null) {
            this.noIcon = ((_e = this.currConfig) === null || _e === void 0 ? void 0 : _e.isNoIcon) || null;
        }
        if (this.noRipple == null) {
            this.noRipple = ((_f = this.currConfig) === null || _f === void 0 ? void 0 : _f.isNoRipple) || null;
        }
        if ((_g = this.currConfig) === null || _g === void 0 ? void 0 : _g.overlayPanelClass) {
            this.overlayPanelClass = this.currConfig.overlayPanelClass;
        }
        if (this.panelClassList == null) {
            this.panelClassList = (_h = this.currConfig) === null || _h === void 0 ? void 0 : _h.panelClass;
        }
        if (this.positionList.length === 0) {
            this.positionList = this.getPositionList((_j = this.currConfig) === null || _j === void 0 ? void 0 : _j.position);
        }
        if (this.visibleSizeVal == null) {
            this.visibleSizeVal = ((_k = this.currConfig) === null || _k === void 0 ? void 0 : _k.visibleSize) || null;
        }
    }
    ngAfterContentInit() {
        // Initialized when the value is received via "writeValue()" but the list of menu items is just now.
        if (this.selectedOptions.length === 0 && this.options.length > 0) {
            const newValue = this.valueData;
            this.valueData = undefined;
            this.value = newValue;
            // If the template is already rendered at the moment, then it is possible that these changes will not be displayed.
            // To solve this problem, we call a redraw via Promise.
            Promise.resolve().then(() => {
                this.changeDetectorRef.markForCheck();
            });
        }
        super.ngAfterContentInit();
    }
    ngAfterViewInit() {
        let maxWidth = Number(getComputedStyle(this.hostRef.nativeElement).getPropertyValue('max-width').replace('px', ''));
        this.maxWidth = !isNaN(maxWidth) ? maxWidth : 0;
        if (this.maxWidth === 0 && BooleanUtil.init(this.wdFull)) {
            maxWidth = Number(getComputedStyle(this.hostRef.nativeElement).getPropertyValue('width').replace('px', ''));
            this.maxWidth = !isNaN(maxWidth) ? maxWidth : 0;
        }
    }
    // ** interface ControlValueAccessor - start **
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    writeValue(value) {
        this.value = value;
        super.writeValue(value);
    }
    setDisabledState(isDisabled) {
        if (this.disabled !== isDisabled) {
            isDisabled ? this.formGroup.disable() : this.formGroup.enable();
            super.setDisabledState(isDisabled);
        }
    }
    // ** interface ControlValueAccessor - finish **
    // ** interface Validator - start **
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(control) {
        let result = null;
        if (this.isEmpty()) {
            if (this.required) {
                result = Object.assign(Object.assign({}, (result || {})), { required: true });
            }
        }
        else if (this.multiple) {
            const actualLength = Array.isArray(this.valueData) ? this.valueData.length : 0;
            if (!!this.minLength && 0 < this.minLength && actualLength < this.minLength) {
                result = Object.assign(Object.assign({}, (result || {})), { minlength: { requiredLength: this.minLength, actualLength } });
            }
            else if (!!this.maxLength && 0 < this.maxLength && actualLength > this.maxLength) {
                result = Object.assign(Object.assign({}, (result || {})), { maxlength: { requiredLength: this.maxLength, actualLength } });
            }
        }
        return (this.errors = result);
    }
    // ** interface Validator - finish **
    // ** interface GlnOptionParent - start **
    optionSelection(optionItem) {
        Promise.resolve().then(() => {
            this.selectionOptionElement(optionItem);
            if (this.isPanelOpen && !this.isFocused) {
                this.isFocused = true;
                this.focus();
            }
            if (!this.multiple) {
                this.close();
            }
        });
    }
    // ** interface GlnOptionParent - finish **
    // ** Public methods **
    trackByOption(index, item) {
        return item.id;
    }
    /** Determine the value of the css variable "frame size". */
    frameSizeChange(event) {
        var _a, _b;
        this.triggerFrameSize = event.frameSizeValue || 0;
        const minWidth = NumberUtil.roundTo100(this.triggerFrameSize * 1.1);
        HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_EL_MIN_WIDTH, (_a = NumberUtil.str(minWidth)) === null || _a === void 0 ? void 0 : _a.concat('px'));
        HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_EL_MIN_HEIGHT, (_b = NumberUtil.str(this.triggerFrameSize)) === null || _b === void 0 ? void 0 : _b.concat('px'));
    }
    getPanelClass(list) {
        return list !== null && list !== void 0 ? list : '';
    }
    isEmpty() {
        return Array.isArray(this.valueData) ? this.valueData.length === 0 : this.valueData == null;
    }
    focus() {
        if (!this.disabled && isPlatformBrowser(this.platformId)) {
            this.frameRef.nativeElement.focus();
        }
    }
    doFocus() {
        if (!this.disabled) {
            const isFocusedEmit = !this.isFocused;
            this.isFocused = true;
            if (isFocusedEmit) {
                this.focused.emit();
            }
        }
    }
    // The selection panel cease working in the following cases:
    // (Cases-B1) Panel is close and on the trigger, click the Tab key.
    // (Cases-B2) Panel is open and mouse click within the panel.
    // (Cases-B3) Panel is open and mouse click outside of panel and trigger.
    // (Cases-B4) Panel is open and mouse click outside of panel but on trigger.
    // (Cases-B5) Panel is open and click the Escape key.
    // (Cases-B6) Panel is open and click the Tab key.
    // (Cases-B7) Panel is open and click the Enter key.
    /** Calls the touch callback only when the panel is closed.
     * Otherwise, it will cause a false positive, "blur" on the panel when it is opened.
     */
    doBlur() {
        if (!this.disabled) {
            this.isFocused = false;
            if (!this.isPanelOpen && !this.hasPanelAnimation) {
                // (Cases-B1) Panel is close and on the trigger, click the Tab key.
                this.blured.emit();
            }
            else {
                // (Cases-B2) Panel is open and mouse click within the panel.
                // (Cases-B3) Panel is open and mouse click outside of panel and trigger.
                // (Cases-B4) Panel is open and mouse click outside of panel but on trigger.
                // For case Cases-B3,B4, let's add the "foc" attribute to force the display of focus.
                this.isFocusAttrOnFrame = true;
                HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, '');
            }
        }
    }
    /** Occurs when a mouse click event occurs outside of the options list pane. */
    backdropClick() {
        if (!this.disabled) {
            // (Cases-B3) Panel is open and mouse click outside of panel and trigger.
            // (Cases-B4) Panel is open and mouse click outside of panel but on trigger.
            this.isFocused = true;
            this.focus();
            this.close();
        }
    }
    /** Occurs when the panel receives input focus. */
    doFocusOnPanel() {
        if (!this.disabled) {
            // (Cases-B2) Panel is open and mouse click within the panel.
            this.isFocused = true;
            this.focus();
        }
    }
    /** Open or close the overlay panel. */
    toggle() {
        if (!this.disabled) {
            if (this.isPanelOpen) {
                this.close();
            }
            else {
                if (!this.isFocused) {
                    this.focus();
                }
                this.open();
            }
        }
    }
    /** Open overlay panel. */
    open() {
        if (!this.disabled && !this.readOnly && !this.isPanelOpen && this.options.length > 0) {
            this.isPanelOpen = true;
            this.hasPanelAnimation = !this.noAnimation;
            this.markedOption = this.selectedOptions.length > 0 ? this.selectedOptions[this.selectedOptions.length - 1] : null;
            this.triggerRect = this.triggerRef.nativeElement.getBoundingClientRect();
            this.isFocusAttrOnFrame = false;
            this.triggerFontSize = Number((getComputedStyle(this.triggerRef.nativeElement).fontSize || '0').replace('px', ''));
            this.changeDetectorRef.markForCheck();
            this.opened.emit();
        }
    }
    /** Closes the overlay panel and focuses the main element. */
    close() {
        var _a, _b;
        if (this.disabled || !this.isPanelOpen) {
            return;
        }
        if (this.isFocusAttrOnFrame) {
            HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, null);
        }
        this.isPanelOpen = false;
        this.changeDetectorRef.markForCheck();
        this.onTouched();
        (_a = this.markedOption) === null || _a === void 0 ? void 0 : _a.setMarked(false);
        this.markedOption = null;
        const overlayElement = this.connectedOverlay.overlayRef.overlayElement;
        const selectPanelRef = HtmlElemUtil.getElementRef((_b = overlayElement.children[0]) === null || _b === void 0 ? void 0 : _b.children[0]);
        const panelHeight = this.getHeight(selectPanelRef);
        if (panelHeight > 0) {
            const overlayRef = HtmlElemUtil.getElementRef(overlayElement);
            HtmlElemUtil.setProperty(overlayRef, CSS_PROP_TRANSLATE_Y, this.getTranslateY(this.triggerRect, panelHeight, ScreenUtil.getHeight()));
        }
        if (!this.noAnimation) {
            const selectPanelWrapRef = HtmlElemUtil.getElementRef(overlayElement.children[0]);
            // Add an attribute for animation and transformation.
            HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, CSS_ATTR_FOR_PANEL_OPENING_ANIMATION, null);
            HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, CSS_ATTR_FOR_PANEL_CLOSING_ANIMATION, '');
        }
        this.closed.emit();
    }
    /** Callback when the overlay panel is attached. */
    attach() {
        var _a, _b, _c, _d;
        const overlayElement = this.connectedOverlay.overlayRef.overlayElement;
        // Adding a class so that custom styles can be applied.
        const overlayRef = HtmlElemUtil.getElementRef(overlayElement);
        HtmlElemUtil.setAttr(this.renderer, overlayRef, 'glnspo-select', '');
        const selectPanelRef = HtmlElemUtil.getElementRef((_a = overlayElement.children[0]) === null || _a === void 0 ? void 0 : _a.children[0]);
        const panelHeight = this.getHeight(selectPanelRef);
        if (!this.noAnimation && panelHeight > 0) {
            HtmlElemUtil.setProperty(overlayRef, CSS_PROP_TRANSLATE_Y, this.getTranslateY(this.triggerRect, panelHeight, ScreenUtil.getHeight()));
        }
        // Set the font size for the overlay.
        if (this.triggerFontSize > 0) {
            overlayElement.style.fontSize = `${this.triggerFontSize}px`;
        }
        if (this.maxWidth > 0) {
            overlayElement.style.maxWidth = `${this.maxWidth}px`;
        }
        if (this.triggerFrameSize > 0) {
            const borderRadius = NumberUtil.roundTo100(this.triggerFrameSize / 10);
            HtmlElemUtil.setProperty(overlayRef, CSS_PROP_BORDER_RADIUS, (_b = NumberUtil.str(borderRadius)) === null || _b === void 0 ? void 0 : _b.concat('px'));
        }
        const visibleSize = (_c = this.visibleSizeVal) !== null && _c !== void 0 ? _c : 0;
        const maxHeigthSelectPanel = visibleSize > 0 ? this.getOptionHeigth(this.options) * visibleSize : 0;
        if (maxHeigthSelectPanel > 0) {
            HtmlElemUtil.setProperty(overlayRef, CSS_PROP_MAX_HEIGHT, (_d = NumberUtil.str(maxHeigthSelectPanel)) === null || _d === void 0 ? void 0 : _d.concat('px'));
        }
        // We cannot get the actual sizes and positions of elements if they are affected by a transformation.
        // Therefore, we first get all the data, and then add attributes for animation and transformation.
        if (this.markedOption !== null && selectPanelRef !== null && maxHeigthSelectPanel > 0) {
            const delta = NumberUtil.roundTo100(maxHeigthSelectPanel / 2) - NumberUtil.roundTo100(this.getHeight(this.markedOption.hostRef) / 2);
            const optionRect = this.markedOption.hostRef.nativeElement.getBoundingClientRect();
            const panelRect = selectPanelRef.nativeElement.getBoundingClientRect();
            selectPanelRef.nativeElement.scrollTo(0, optionRect.top - panelRect.top - delta);
        }
        // Important! These operations should be the last, they include animation and the dimensions of the panel are distorted.
        const selectPanelWrapRef = HtmlElemUtil.getElementRef(overlayElement === null || overlayElement === void 0 ? void 0 : overlayElement.children[0]);
        if (this.noAnimation) {
            HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, 'noAnm', '');
            HtmlElemUtil.setClass(this.renderer, selectPanelWrapRef, 'gln-no-animation', true);
        }
        else {
            // Add an attribute for animation and transformation.
            HtmlElemUtil.setAttr(this.renderer, selectPanelWrapRef, CSS_ATTR_FOR_PANEL_OPENING_ANIMATION, '');
        }
    }
    /** Handles all keypress events for the component's panel. */
    frameKeydown(event) {
        if (!this.disabled) {
            if (!this.isPanelOpen) {
                // Open the selection panel by pressing the keys: 'up arrow', 'down arrow', 'space' and 'enter'.
                if (['ArrowDown', 'ArrowUp', ' ', 'Enter'].includes(event.key)) {
                    // Prevents the page from scrolling down when pressing space.
                    event.preventDefault();
                    this.open();
                }
            }
            else {
                if (['ArrowDown', 'ArrowUp', ' ', 'Tab'].includes(event.key)) {
                    // Prevents the page from scrolling down when pressing: 'up arrow', 'down arrow', 'space' and 'tab'.
                    event.preventDefault();
                }
                switch (event.key) {
                    // (Cases-B5) Panel is open and click the Escape key.
                    // (Cases-B6) Panel is open and click the Tab key.
                    case 'Escape':
                    case 'Tab':
                        this.close();
                        break;
                    case 'ArrowDown':
                    case 'ArrowUp':
                        // Moving the cursor marker.
                        this.markedOption = this.movingMarkedOption(event.key === 'ArrowDown', this.markedOption);
                        this.changeDetectorRef.markForCheck();
                        break;
                    // (Cases-B7) Panel is open and click the Enter key.
                    case 'Enter':
                        if (this.markedOption != null) {
                            // Selects the element of the current marker.
                            this.selectionOptionElement(this.markedOption);
                            // And if not multiple, then closing the panel.
                            if (!this.multiple) {
                                this.close();
                            }
                        }
                        break;
                }
            }
        }
    }
    /** Processing the option selected by the user. */
    selectionOptionElement(addOption) {
        const newOptions = addOption !== null ? [addOption] : [];
        if (!this.disabled && newOptions.length > 0) {
            const removed = [];
            if (this.multiple) {
                // Which elements of array "this.selectedOptions" are included in array "addOptions".
                removed.push(...ArrayUtil.include(this.selectedOptions, newOptions));
            }
            else {
                // Which elements of array "this.selectedOptions" are not included in array "addOptions".
                removed.push(...ArrayUtil.uninclude(this.selectedOptions, newOptions));
            }
            // Which elements of array "addOptions" are not included in array "this.selectedOptions".
            const added = ArrayUtil.uninclude(newOptions, this.selectedOptions);
            this.updateSelectedOptions(added, removed, true);
        }
    }
    addOption(option) {
        if (option && this.selectedOptions.indexOf(option) === -1) {
            this.updateSelectedOptions([option], [], true);
        }
    }
    deleteOption(option) {
        if (option && this.selectedOptions.indexOf(option) > -1) {
            this.updateSelectedOptions([], [option], true);
        }
    }
    // ** Private API **
    updateSelectedOptions(added, removed, isEmit) {
        this.selectedOptions = this.mergeOptions(this.selectedOptions, added, removed);
        const values = GlnOptionUtil.getValues(this.selectedOptions);
        const value = values.length > 0 ? values[0] : null;
        this.updateValueDataAndIsFilledAndValidity(this.multiple ? values : value);
        this.changeDetectorRef.markForCheck();
        if (isEmit) {
            this.selected.emit({ value: !this.multiple ? value : null, values: this.multiple ? values : [], change: { added, removed } });
        }
        // Update the position once the zone is stable so that the overlay will be fully rendered.
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.connectedOverlay.overlayRef.updatePosition();
        });
        return values;
    }
    mergeOptions(selected, added, removed) {
        GlnOptionUtil.setSelected(removed, false);
        const currentOptions = ArrayUtil.delete(selected, removed);
        GlnOptionUtil.setSelected(added, true);
        const resultOptions = currentOptions.concat(added);
        return this.options.filter((option) => resultOptions.includes(option));
    }
    getHeight(value) {
        return value ? Number(getComputedStyle(value.nativeElement).getPropertyValue('height').replace('px', '')) : 0;
    }
    /** Define the "TranslateY" parameter to correctly open or close. */
    getTranslateY(triggerRect, panelHeight, screenHeight) {
        let result = null;
        if (panelHeight > 0 && !!triggerRect && triggerRect.top > 0 && triggerRect.height > 0 && screenHeight > 0) {
            const value = triggerRect.top + triggerRect.height + panelHeight;
            const delta = String(NumberUtil.roundTo100((panelHeight - 0.6 * panelHeight) / 2)).concat('px');
            result = (value < screenHeight ? '-' : '') + delta;
        }
        return result;
    }
    /** Update the data value, the sign of fullness and perform validation. */
    updateValueDataAndIsFilledAndValidity(newValueData) {
        this.valueData = newValueData;
        this.isFilled = !this.isEmpty() && this.selectedOptions.length > 0;
        // Calling the validation method for the new value.
        this.onChange(this.valueData);
    }
    /** Move the marked option to the next or previous one. */
    movingMarkedOption(isNext, markedOption) {
        let result = null;
        if (this.options.length > 0) {
            let indexOld = -1;
            if (markedOption != null) {
                indexOld = this.options.indexOf(markedOption);
                markedOption.setMarked(false);
            }
            const maxIndex = this.options.length - 1;
            const index = isNext ? (indexOld < maxIndex ? indexOld + 1 : 0) : indexOld > 0 ? indexOld - 1 : maxIndex;
            result = this.options[index];
            result.setMarked(true);
        }
        return result;
    }
    /** Get the height of the option. */
    getOptionHeigth(options) {
        const value = [];
        const count = [];
        let countByIndex = -1;
        let resultIndex = -1;
        for (let i = 0; i < options.length && countByIndex < 4; i++) {
            const height = this.getHeight(options[i].hostRef);
            let index = value.indexOf(height);
            if (index === -1) {
                value.push(height);
                count.push(1);
                index = value.length - 1;
            }
            else {
                count[index]++;
            }
            if (count[index] > countByIndex) {
                countByIndex = count[index];
                resultIndex = index;
            }
        }
        return resultIndex > -1 ? value[resultIndex] : 0;
    }
    getPosition(value) {
        return (value && ['start', 'center', 'end'].indexOf(value) > -1 ? value : 'start');
    }
    getPositionList(position) {
        const horizontalAlignment = this.getPosition(position || null);
        return [
            { originX: horizontalAlignment, originY: 'bottom', overlayX: horizontalAlignment, overlayY: 'top' },
            { originX: horizontalAlignment, originY: 'top', overlayX: horizontalAlignment, overlayY: 'bottom', offsetY: -5 },
        ];
    }
}
GlnSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: PLATFORM_ID }, { token: GLN_SELECT_CONFIG, optional: true }, { token: GLN_SELECT_SCROLL_STRATEGY, optional: true }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
GlnSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnSelectComponent, selector: "gln-select", inputs: { config: "config", exterior: "exterior", frameSize: "frameSize", helperText: "helperText", isCheckmark: "isCheckmark", isMultiple: "isMultiple", isNoIcon: "isNoIcon", isNoRipple: "isNoRipple", label: "label", maxLength: "maxLength", minLength: "minLength", ornamLfAlign: "ornamLfAlign", ornamRgAlign: "ornamRgAlign", panelClass: "panelClass", position: "position", visibleSize: "visibleSize", tabIndex: "tabIndex", wdFull: "wdFull", value: "value" }, outputs: { focused: "focused", blured: "blured", opened: "opened", closed: "closed", selected: "selected" }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnSelectComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnSelectComponent), multi: true },
        { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnSelectComponent },
        { provide: GLN_OPTION_PARENT, useExisting: GlnSelectComponent },
    ], queries: [{ propertyName: "customTrigger", first: true, predicate: GLN_SELECT_TRIGGER, descendants: true }, { propertyName: "optionList", predicate: GlnOptionComponent, descendants: true }], viewQueries: [{ propertyName: "connectedOverlay", first: true, predicate: CdkConnectedOverlay, descendants: true }, { propertyName: "frameRef", first: true, predicate: ["frameRef"], descendants: true, read: ElementRef, static: true }, { propertyName: "triggerRef", first: true, predicate: ["triggerRef"], descendants: true, static: true }], exportAs: ["glnSelect"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-container [formGroup]=\"formGroup\">\n  <div glnsl-wrap\n    class=\"glnsl-wrap\"\n    [glnFrameExteriorInput]=\"exterior || currConfig?.exterior\"\n    #glnFrameExteriorInput=\"glnFrameExteriorInput\"\n    [glnFrameExteriorInputElementRef]=\"hostRef\"\n    (glnFrameExteriorInputChange)=\"glnFrameSize.updatePaddingVerAndHor()\"\n    cdkOverlayOrigin\n    #origin=\"cdkOverlayOrigin\"\n    #triggerRef\n    (click)=\"!disabled ? toggle() : null\">\n    <gln-frame #frameRef\n      [ngClass]=\"[(isPanelOpen ? 'is-open' : '')]\"\n      [config]=\"currConfig\"\n      [exterior]=\"glnFrameExteriorInput.exterior\"\n      [isDisabled]=\"disabled\"\n      [isError]=\"!!errors || error\"\n      [isFilled]=\"isFilled\"\n      [isLabelShrink]=\"labelShrink || currConfig?.isLabelShrink\"\n      [isNoAnimation]=\"noAnimation || currConfig?.isNoAnimation || isWriteValueInit\"\n      [isNoLabel]=\"noLabel || currConfig?.isNoLabel\"\n      [isRequired]=\"required\"\n      [label]=\"label\"\n      [glnFrameSize]=\"frameSize || currConfig?.frameSize\"\n      #glnFrameSize=\"glnFrameSize\"\n      [glnFrameSizeElementRef]=\"hostRef\"\n      [glnFrameSizeValue]=\"currConfig?.frameSizeValue || frameSizeDefault\"\n      [glnFrameSizeLabelPd]=\"currConfig?.labelPd\"\n      [glnFrameSizePrepare]=\"glnFrameExteriorInput\"\n      (glnFrameSizeChange)=\"frameSizeChange($event)\"\n      glnFrameOrnament\n      [glnFrameOrnamentLfAlign]=\"ornamLfAlign || currConfig?.ornamLfAlign\"\n      [glnFrameOrnamentRgAlign]=\"ornamRgAlign || currConfig?.ornamRgAlign\"\n      [glnFrameOrnamentPath]=\"'/div{0}'\"\n      [attr.opn]=\"isPanelOpen ? '' : null\"\n      [attr.tabindex]=\"!disabled ? tabIndex : null\"\n      (focus)=\"doFocus()\"\n      (blur)=\"doBlur()\"\n      (keydown)=\"frameKeydown($event)\">\n\n      <span glnfr-orn-lf\n        class=\"gln-ornam-lf\">\n        <ng-content select=\"[gln-orn-lf]\"></ng-content>\n      </span>\n\n      <span glnfr-orn-rg\n        class=\"gln-ornam-rg\">\n        <ng-content select=\"[gln-orn-rg]\"></ng-content>\n\n        <div *ngIf=\"!getBoolean(isNoIcon) && !currConfig?.isNoIcon\"\n          glnsl-rhomb\n          [attr.opn]=\"isPanelOpen ? '' : null\"\n          [attr.noAnm]=\"noAnimation ? '' : null\"\n          [ngClass]=\"['glnsl-rhomb', (isPanelOpen ? 'is-open' : '')]\"\n          focusable=\"false\"\n          aria-hidden=\"true\">\n        </div>\n      </span>\n\n      <div [ngClass]=\"[(readOnly ? 'gln-readonly' : '')]\"\n        glnfr-pd-ver\n        glnfr-pd-hor\n        glnfr-elem\n        [attr.id]=\"id + '-elem'\">\n\n        <ng-container [ngSwitch]=\"isFilled\">\n          <div *ngSwitchCase=\"false\">&ZeroWidthSpace;</div>\n\n          <ng-container *ngSwitchCase=\"true\"\n            [ngSwitch]=\"!!customTrigger\">\n\n            <ng-content *ngSwitchCase=\"true\"\n              select=\"gln-select-trigger\">\n            </ng-content>\n\n            <ng-container *ngSwitchCase=\"false\">\n              <ng-container\n                *ngFor=\"let option of selectedOptions; count as countVal; last as isLast; trackBy: trackByOption;\">\n                <span [innerHTML]=\"option.getTrustHtml()\"></span>\n                <span *ngIf=\"countVal > 1 && !isLast\">, </span>\n              </ng-container>\n            </ng-container>\n\n          </ng-container>\n        </ng-container>\n      </div>\n\n    </gln-frame>\n  </div>\n</ng-container>\n\n<gln-hint-or-error *ngIf=\"!!helperText\"\n  [text]=\"helperText\"\n  [isError]=\"!!errors || error\"\n  [isFocused]=\"isFocused\"\n  [isDisabled]=\"disabled\">\n</gln-hint-or-error>\n\n<ng-template cdkConnectedOverlay\n  [cdkConnectedOverlayBackdropClass]=\"backdropClassVal || 'cdk-overlay-transparent-backdrop'\"\n  cdkConnectedOverlayHasBackdrop\n  [cdkConnectedOverlayDisableClose]=\"true\"\n  cdkConnectedOverlayLockPosition\n  [cdkConnectedOverlayMinWidth]=\"triggerRect?.width!\"\n  [cdkConnectedOverlayOpen]=\"isPanelOpen || hasPanelAnimation\"\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayPanelClass]=\"overlayPanelClass\"\n  [cdkConnectedOverlayPositions]=\"positionList\"\n  [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n  (backdropClick)=\"backdropClick()\"\n  (attach)=\"attach()\"\n  (detach)=\"isPanelOpen ? close() : null\">\n\n  <div glnslp-wrap\n    class=\"gln-select-panel-wrap\"\n    [ngClass]=\"[(noAnimation ? 'gln-no-animation' : '')]\"\n    [attr.noAnm]=\"noAnimation ? '' : null\"\n    (animationend)=\"hasPanelAnimation = isPanelOpen\"\n    (animationcancel)=\"hasPanelAnimation = isPanelOpen\">\n    <div glnsl-panel\n      class=\"gln-select-panel\"\n      [ngClass]=\"getPanelClass(panelClassList)\"\n      role=\"listbox\"\n      [attr.id]=\"id + '-panel'\"\n      [attr.aria-multiselectable]=\"multiple\"\n      (focus)=\"doFocusOnPanel()\">\n      <ng-content select=\":not(gln-select-trigger)\"></ng-content>\n    </div>\n  </div>\n\n</ng-template>", styles: ["gln-select{--glnsl--default-h: var(--glncl-default-h, var(--gln-default-h));--glnsl--default-s: var(--glncl-default-s, var(--gln-default-s));display:inline-flex;flex-direction:column;min-width:var(--glnsl-min-width, var(--glnsl-el-min-width, 50px))}gln-select[wdFull]{width:100%}gln-select[wdFull] gln-frame>div>[glnfr-elem]{width:100%}gln-select gln-frame{--glnsl--default46: hsl(var(--glnsl--default-h), var(--glnsl--default-s), 46%);--glnsl--primary46: hsl(var(--glnsl--primary-h), var(--glnsl--primary-s), 46%);--glnsl--danger51: hsl(var(--glnsl--danger-h), var(--glnsl--danger-s), 51%);--glnsl--default74: hsl(var(--glnsl--default-h), var(--glnsl--default-s), 74%)}gln-select gln-frame:focus-visible{outline:none}gln-select gln-frame:not([opn]):not([dis]){cursor:pointer}gln-select gln-frame:not([dis])[hfc]{--glnslr-hover-focus-color: var(--glnsl--primary46)}gln-select gln-frame:not([dis]):not([err]):not(:hover):not(:focus-within):not([foc]){--glnsl-rhomb-cl: var(--glnsl-rhomb-def, var(--glnsl--default46))}gln-select gln-frame:not([dis]):not([err]):hover:not(:focus-within):not([foc]){--glnsl-rhomb-cl: var(--glnsl-rhomb-hov, var(--glnslr-hover-focus-color, var(--glnsl--default46)))}gln-select gln-frame:not([dis]):not([err]):focus-within,gln-select gln-frame:not([dis]):not([err])[foc]{--glnsl-rhomb-cl: var(--glnsl-rhomb-foc, var(--glnsl--primary46))}gln-select gln-frame:not([dis])[err]{--glnsl-rhomb-cl: var(--glnsl-rhomb-err, var(--glnsl--danger51))}gln-select gln-frame[dis]{--glnsl-rhomb-cl: var(--glnsl-rhomb-dis, var(--glnsl--default74))}gln-select gln-frame>div>[glnfr-orn-rg]>[glnsl-rhomb]{align-items:center;color:var(--glnsl-rhomb-cl);display:flex;height:1em;-webkit-user-select:none;user-select:none}gln-select gln-frame>div>[glnfr-orn-rg]>[glnsl-rhomb]:after{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;content:\" \";height:0;margin:0 .375em;width:0}gln-select gln-frame>div>[glnfr-orn-rg]>[glnsl-rhomb]:not([noAnm]):after{transition:transform .3s linear 0ms}gln-select gln-frame>div>[glnfr-orn-rg]>[glnsl-rhomb][opn]:after{transform:rotate(180deg)}gln-select gln-frame:not([ext-s])>div>[glnfr-orn-rg]>[glnsl-rhomb]{padding-right:.375em}gln-select gln-frame>div>[glnfr-elem]{background:none;border:0;box-sizing:border-box;color:currentColor;display:block;font:inherit;margin:0;min-height:var(--glnsl-el-min-height, unset);-webkit-tap-highlight-color:transparent;min-width:0;overflow:hidden;text-overflow:ellipsis;-webkit-user-select:none;user-select:none;white-space:nowrap}gln-select>[glnsl-wrap]{position:relative}gln-select gln-hint-or-error{padding-left:var(--glnsl-he-pd-lf, var(--glnfrs-pd-lf));padding-right:var(--glnsl-he-pd-rg, var(--glnfrs-pd-rg))}.gln-select-panel-wrap{background-color:var(--glnslpw-def-bg-cl, var(--gln-default-bg-cl));color:var(--glnslpw-def-cl, hsl(var(--gln-default-h), var(--gln-default-s), 17%));flex-basis:100%;font-size:inherit;max-width:inherit}.gln-select-panel-wrap:not([noAnm]){opacity:0}.gln-select-panel-wrap:not([noAnm])[is-open]:not([is-hide]){animation:kf-open-panel .2s cubic-bezier(.2,0,.2,1) 0ms;opacity:1}.gln-select-panel-wrap:not([noAnm]):not([is-open])[is-hide]{animation:kf-close-panel .2s linear 0ms;opacity:0}@keyframes kf-open-panel{0%{opacity:0;transform:translateY(var(--glnslpo-translate-y, 0px)) scale(.6)}to{opacity:1;transform:none}}@keyframes kf-close-panel{0%{opacity:1;transform:none}to{opacity:0;transform:translateY(var(--glnslpo-translate-y, 0px)) scale(.6)}}.gln-select-panel{border-radius:var(--glnslpo-border-radius, unset);box-sizing:border-box;max-height:var(--glnslpo-max-height, 100%);min-height:16px;min-width:16px;overflow:auto;outline:0;-webkit-overflow-scrolling:touch;box-shadow:var(--glnslpo-elevation, rgba(0, 0, 0, .2) 0px 5px 5px -3px, rgba(0, 0, 0, .14) 0px 8px 10px 1px, rgba(0, 0, 0, .12) 0px 3px 14px 2px)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: GlnFrameExteriorInputDirective, selector: "[glnFrameExteriorInput]", inputs: ["glnFrameExteriorInput", "glnFrameExteriorInputElementRef"], outputs: ["glnFrameExteriorInputChange"], exportAs: ["glnFrameExteriorInput"] }, { kind: "component", type: GlnFrameComponent, selector: "gln-frame", inputs: ["config", "exterior", "isDisabled", "isError", "isFilled", "isLabelShrink", "isNoAnimation", "isNoLabel", "isRequired", "label"], exportAs: ["glnFrame"] }, { kind: "directive", type: GlnFrameOrnamentDirective, selector: "[glnFrameOrnament]", inputs: ["glnFrameOrnamentLfAlign", "glnFrameOrnamentRgAlign", "glnFrameOrnamentElementRef", "glnFrameOrnamentPath", "glnFrameOrnamentAfterContent"], exportAs: ["glnFrameOrnament"] }, { kind: "directive", type: GlnFrameSizeDirective, selector: "[glnFrameSize]", inputs: ["glnFrameSize", "glnFrameSizeValue", "glnFrameSizeLabelPd", "glnFrameSizeElementRef", "glnFrameSizePrepare", "glnFrameSizeModify"], outputs: ["glnFrameSizeChange"], exportAs: ["glnFrameSize"] }, { kind: "component", type: GlnHintOrErrorComponent, selector: "gln-hint-or-error", inputs: ["text", "isError", "isFocused", "isDisabled"], exportAs: ["glnHintOrError"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-select', exportAs: 'glnSelect', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnSelectComponent), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnSelectComponent), multi: true },
                        { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnSelectComponent },
                        { provide: GLN_OPTION_PARENT, useExisting: GlnSelectComponent },
                    ], template: "<ng-container [formGroup]=\"formGroup\">\n  <div glnsl-wrap\n    class=\"glnsl-wrap\"\n    [glnFrameExteriorInput]=\"exterior || currConfig?.exterior\"\n    #glnFrameExteriorInput=\"glnFrameExteriorInput\"\n    [glnFrameExteriorInputElementRef]=\"hostRef\"\n    (glnFrameExteriorInputChange)=\"glnFrameSize.updatePaddingVerAndHor()\"\n    cdkOverlayOrigin\n    #origin=\"cdkOverlayOrigin\"\n    #triggerRef\n    (click)=\"!disabled ? toggle() : null\">\n    <gln-frame #frameRef\n      [ngClass]=\"[(isPanelOpen ? 'is-open' : '')]\"\n      [config]=\"currConfig\"\n      [exterior]=\"glnFrameExteriorInput.exterior\"\n      [isDisabled]=\"disabled\"\n      [isError]=\"!!errors || error\"\n      [isFilled]=\"isFilled\"\n      [isLabelShrink]=\"labelShrink || currConfig?.isLabelShrink\"\n      [isNoAnimation]=\"noAnimation || currConfig?.isNoAnimation || isWriteValueInit\"\n      [isNoLabel]=\"noLabel || currConfig?.isNoLabel\"\n      [isRequired]=\"required\"\n      [label]=\"label\"\n      [glnFrameSize]=\"frameSize || currConfig?.frameSize\"\n      #glnFrameSize=\"glnFrameSize\"\n      [glnFrameSizeElementRef]=\"hostRef\"\n      [glnFrameSizeValue]=\"currConfig?.frameSizeValue || frameSizeDefault\"\n      [glnFrameSizeLabelPd]=\"currConfig?.labelPd\"\n      [glnFrameSizePrepare]=\"glnFrameExteriorInput\"\n      (glnFrameSizeChange)=\"frameSizeChange($event)\"\n      glnFrameOrnament\n      [glnFrameOrnamentLfAlign]=\"ornamLfAlign || currConfig?.ornamLfAlign\"\n      [glnFrameOrnamentRgAlign]=\"ornamRgAlign || currConfig?.ornamRgAlign\"\n      [glnFrameOrnamentPath]=\"'/div{0}'\"\n      [attr.opn]=\"isPanelOpen ? '' : null\"\n      [attr.tabindex]=\"!disabled ? tabIndex : null\"\n      (focus)=\"doFocus()\"\n      (blur)=\"doBlur()\"\n      (keydown)=\"frameKeydown($event)\">\n\n      <span glnfr-orn-lf\n        class=\"gln-ornam-lf\">\n        <ng-content select=\"[gln-orn-lf]\"></ng-content>\n      </span>\n\n      <span glnfr-orn-rg\n        class=\"gln-ornam-rg\">\n        <ng-content select=\"[gln-orn-rg]\"></ng-content>\n\n        <div *ngIf=\"!getBoolean(isNoIcon) && !currConfig?.isNoIcon\"\n          glnsl-rhomb\n          [attr.opn]=\"isPanelOpen ? '' : null\"\n          [attr.noAnm]=\"noAnimation ? '' : null\"\n          [ngClass]=\"['glnsl-rhomb', (isPanelOpen ? 'is-open' : '')]\"\n          focusable=\"false\"\n          aria-hidden=\"true\">\n        </div>\n      </span>\n\n      <div [ngClass]=\"[(readOnly ? 'gln-readonly' : '')]\"\n        glnfr-pd-ver\n        glnfr-pd-hor\n        glnfr-elem\n        [attr.id]=\"id + '-elem'\">\n\n        <ng-container [ngSwitch]=\"isFilled\">\n          <div *ngSwitchCase=\"false\">&ZeroWidthSpace;</div>\n\n          <ng-container *ngSwitchCase=\"true\"\n            [ngSwitch]=\"!!customTrigger\">\n\n            <ng-content *ngSwitchCase=\"true\"\n              select=\"gln-select-trigger\">\n            </ng-content>\n\n            <ng-container *ngSwitchCase=\"false\">\n              <ng-container\n                *ngFor=\"let option of selectedOptions; count as countVal; last as isLast; trackBy: trackByOption;\">\n                <span [innerHTML]=\"option.getTrustHtml()\"></span>\n                <span *ngIf=\"countVal > 1 && !isLast\">, </span>\n              </ng-container>\n            </ng-container>\n\n          </ng-container>\n        </ng-container>\n      </div>\n\n    </gln-frame>\n  </div>\n</ng-container>\n\n<gln-hint-or-error *ngIf=\"!!helperText\"\n  [text]=\"helperText\"\n  [isError]=\"!!errors || error\"\n  [isFocused]=\"isFocused\"\n  [isDisabled]=\"disabled\">\n</gln-hint-or-error>\n\n<ng-template cdkConnectedOverlay\n  [cdkConnectedOverlayBackdropClass]=\"backdropClassVal || 'cdk-overlay-transparent-backdrop'\"\n  cdkConnectedOverlayHasBackdrop\n  [cdkConnectedOverlayDisableClose]=\"true\"\n  cdkConnectedOverlayLockPosition\n  [cdkConnectedOverlayMinWidth]=\"triggerRect?.width!\"\n  [cdkConnectedOverlayOpen]=\"isPanelOpen || hasPanelAnimation\"\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayPanelClass]=\"overlayPanelClass\"\n  [cdkConnectedOverlayPositions]=\"positionList\"\n  [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n  (backdropClick)=\"backdropClick()\"\n  (attach)=\"attach()\"\n  (detach)=\"isPanelOpen ? close() : null\">\n\n  <div glnslp-wrap\n    class=\"gln-select-panel-wrap\"\n    [ngClass]=\"[(noAnimation ? 'gln-no-animation' : '')]\"\n    [attr.noAnm]=\"noAnimation ? '' : null\"\n    (animationend)=\"hasPanelAnimation = isPanelOpen\"\n    (animationcancel)=\"hasPanelAnimation = isPanelOpen\">\n    <div glnsl-panel\n      class=\"gln-select-panel\"\n      [ngClass]=\"getPanelClass(panelClassList)\"\n      role=\"listbox\"\n      [attr.id]=\"id + '-panel'\"\n      [attr.aria-multiselectable]=\"multiple\"\n      (focus)=\"doFocusOnPanel()\">\n      <ng-content select=\":not(gln-select-trigger)\"></ng-content>\n    </div>\n  </div>\n\n</ng-template>", styles: ["gln-select{--glnsl--default-h: var(--glncl-default-h, var(--gln-default-h));--glnsl--default-s: var(--glncl-default-s, var(--gln-default-s));display:inline-flex;flex-direction:column;min-width:var(--glnsl-min-width, var(--glnsl-el-min-width, 50px))}gln-select[wdFull]{width:100%}gln-select[wdFull] gln-frame>div>[glnfr-elem]{width:100%}gln-select gln-frame{--glnsl--default46: hsl(var(--glnsl--default-h), var(--glnsl--default-s), 46%);--glnsl--primary46: hsl(var(--glnsl--primary-h), var(--glnsl--primary-s), 46%);--glnsl--danger51: hsl(var(--glnsl--danger-h), var(--glnsl--danger-s), 51%);--glnsl--default74: hsl(var(--glnsl--default-h), var(--glnsl--default-s), 74%)}gln-select gln-frame:focus-visible{outline:none}gln-select gln-frame:not([opn]):not([dis]){cursor:pointer}gln-select gln-frame:not([dis])[hfc]{--glnslr-hover-focus-color: var(--glnsl--primary46)}gln-select gln-frame:not([dis]):not([err]):not(:hover):not(:focus-within):not([foc]){--glnsl-rhomb-cl: var(--glnsl-rhomb-def, var(--glnsl--default46))}gln-select gln-frame:not([dis]):not([err]):hover:not(:focus-within):not([foc]){--glnsl-rhomb-cl: var(--glnsl-rhomb-hov, var(--glnslr-hover-focus-color, var(--glnsl--default46)))}gln-select gln-frame:not([dis]):not([err]):focus-within,gln-select gln-frame:not([dis]):not([err])[foc]{--glnsl-rhomb-cl: var(--glnsl-rhomb-foc, var(--glnsl--primary46))}gln-select gln-frame:not([dis])[err]{--glnsl-rhomb-cl: var(--glnsl-rhomb-err, var(--glnsl--danger51))}gln-select gln-frame[dis]{--glnsl-rhomb-cl: var(--glnsl-rhomb-dis, var(--glnsl--default74))}gln-select gln-frame>div>[glnfr-orn-rg]>[glnsl-rhomb]{align-items:center;color:var(--glnsl-rhomb-cl);display:flex;height:1em;-webkit-user-select:none;user-select:none}gln-select gln-frame>div>[glnfr-orn-rg]>[glnsl-rhomb]:after{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;content:\" \";height:0;margin:0 .375em;width:0}gln-select gln-frame>div>[glnfr-orn-rg]>[glnsl-rhomb]:not([noAnm]):after{transition:transform .3s linear 0ms}gln-select gln-frame>div>[glnfr-orn-rg]>[glnsl-rhomb][opn]:after{transform:rotate(180deg)}gln-select gln-frame:not([ext-s])>div>[glnfr-orn-rg]>[glnsl-rhomb]{padding-right:.375em}gln-select gln-frame>div>[glnfr-elem]{background:none;border:0;box-sizing:border-box;color:currentColor;display:block;font:inherit;margin:0;min-height:var(--glnsl-el-min-height, unset);-webkit-tap-highlight-color:transparent;min-width:0;overflow:hidden;text-overflow:ellipsis;-webkit-user-select:none;user-select:none;white-space:nowrap}gln-select>[glnsl-wrap]{position:relative}gln-select gln-hint-or-error{padding-left:var(--glnsl-he-pd-lf, var(--glnfrs-pd-lf));padding-right:var(--glnsl-he-pd-rg, var(--glnfrs-pd-rg))}.gln-select-panel-wrap{background-color:var(--glnslpw-def-bg-cl, var(--gln-default-bg-cl));color:var(--glnslpw-def-cl, hsl(var(--gln-default-h), var(--gln-default-s), 17%));flex-basis:100%;font-size:inherit;max-width:inherit}.gln-select-panel-wrap:not([noAnm]){opacity:0}.gln-select-panel-wrap:not([noAnm])[is-open]:not([is-hide]){animation:kf-open-panel .2s cubic-bezier(.2,0,.2,1) 0ms;opacity:1}.gln-select-panel-wrap:not([noAnm]):not([is-open])[is-hide]{animation:kf-close-panel .2s linear 0ms;opacity:0}@keyframes kf-open-panel{0%{opacity:0;transform:translateY(var(--glnslpo-translate-y, 0px)) scale(.6)}to{opacity:1;transform:none}}@keyframes kf-close-panel{0%{opacity:1;transform:none}to{opacity:0;transform:translateY(var(--glnslpo-translate-y, 0px)) scale(.6)}}.gln-select-panel{border-radius:var(--glnslpo-border-radius, unset);box-sizing:border-box;max-height:var(--glnslpo-max-height, 100%);min-height:16px;min-width:16px;overflow:auto;outline:0;-webkit-overflow-scrolling:touch;box-shadow:var(--glnslpo-elevation, rgba(0, 0, 0, .2) 0px 5px 5px -3px, rgba(0, 0, 0, .14) 0px 8px 10px 1px, rgba(0, 0, 0, .12) 0px 3px 14px 2px)}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: Object, decorators: [{
                        type: Inject,
                        args: [PLATFORM_ID]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [GLN_SELECT_CONFIG]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [GLN_SELECT_SCROLL_STRATEGY]
                    }] }, { type: i0.NgZone }];
    }, propDecorators: { config: [{
                type: Input
            }], exterior: [{
                type: Input
            }], frameSize: [{
                type: Input
            }], helperText: [{
                type: Input
            }], isCheckmark: [{
                type: Input
            }], isMultiple: [{
                type: Input
            }], isNoIcon: [{
                type: Input
            }], isNoRipple: [{
                type: Input
            }], label: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], minLength: [{
                type: Input
            }], ornamLfAlign: [{
                type: Input
            }], ornamRgAlign: [{
                type: Input
            }], panelClass: [{
                type: Input
            }], position: [{
                type: Input
            }], visibleSize: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], wdFull: [{
                type: Input
            }], value: [{
                type: Input
            }], focused: [{
                type: Output
            }], blured: [{
                type: Output
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], selected: [{
                type: Output
            }], connectedOverlay: [{
                type: ViewChild,
                args: [CdkConnectedOverlay]
            }], customTrigger: [{
                type: ContentChild,
                args: [GLN_SELECT_TRIGGER]
            }], frameRef: [{
                type: ViewChild,
                args: ['frameRef', { read: ElementRef, static: true }]
            }], triggerRef: [{
                type: ViewChild,
                args: ['triggerRef', { static: true }]
            }], optionList: [{
                type: ContentChildren,
                args: [GlnOptionComponent, { descendants: true }]
            }] } });

class GlnSelectModule {
}
GlnSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectModule, declarations: [GlnSelectComponent, GlnSelectTriggerDirective], imports: [CommonModule,
        OverlayModule,
        ReactiveFormsModule,
        GlnColorModule,
        GlnFrameExteriorInputModule,
        GlnFrameModule,
        GlnFrameOrnamentModule,
        GlnFrameSizeModule,
        GlnHintOrErrorModule,
        GlnOptionModule], exports: [GlnSelectComponent, GlnSelectTriggerDirective] });
GlnSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectModule, providers: [GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION], imports: [CommonModule,
        OverlayModule,
        ReactiveFormsModule,
        GlnColorModule,
        GlnFrameExteriorInputModule,
        GlnFrameModule,
        GlnFrameOrnamentModule,
        GlnFrameSizeModule,
        GlnHintOrErrorModule,
        GlnOptionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnSelectComponent, GlnSelectTriggerDirective],
                    imports: [
                        CommonModule,
                        OverlayModule,
                        ReactiveFormsModule,
                        GlnColorModule,
                        GlnFrameExteriorInputModule,
                        GlnFrameModule,
                        GlnFrameOrnamentModule,
                        GlnFrameSizeModule,
                        GlnHintOrErrorModule,
                        GlnOptionModule,
                    ],
                    exports: [GlnSelectComponent, GlnSelectTriggerDirective],
                    providers: [GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION],
                }]
        }] });

let uniqueIdCounter = 0;
const GLN_TEXTAREA_CONFIG = new InjectionToken('GLN_TEXTAREA_CONFIG');
class GlnTextareaComponent extends GlnBasisFrame {
    // public isWriteValueInit: boolean | null = null;                            // Is in GlnBasisControl.
    // public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink". // Is in GlnBasisControl.
    // public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation". // Is in GlnBasisControl.
    // public noLabel: boolean | null = null; // Binding attribute "isNoLabel". // Is in GlnBasisControl.
    // public readOnly: boolean | null = null; // Binding attribute "isReadOnly". // Is in GlnBasisControl.
    // public required: boolean | null = null; // Binding attribute "isRequired". // Is in GlnBasisControl.
    // public valueInit: boolean | null = null; // Binding attribute "isValueInit". // Is in GlnBasisControl.
    constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    platformId, changeDetectorRef, rootConfig, hostRef, renderer, ngZone) {
        super(uniqueIdCounter++, 'glntx', hostRef, renderer, changeDetectorRef, ngZone);
        this.platformId = platformId;
        this.rootConfig = rootConfig;
        // @Input()
        // public id = `glntx-${uniqueIdCounter++}`; // Is in GlnBasisControl.
        this.autoComplete = '';
        this.tabIndex = 0;
        this.focused = new EventEmitter();
        this.blured = new EventEmitter();
        // @Output()
        // readonly writeValueInit: EventEmitter<() => void> = new EventEmitter(); // From GlnBasisByFrame
        this.textareaElementRef = null;
        this.currConfig = null;
        this.currentRows = 1;
        // public disabled: boolean | null = null; // Binding attribute "isDisabled". // Is in GlnBasisControl.
        // public error: boolean | null = null; // Binding attribute "isError". // Is in GlnBasisControl.
        this.formControl = new FormControl({ value: null, disabled: false }, []);
        this.formGroup = new FormGroup({ textData: this.formControl });
        this.frameSizeDefault = GlnFrameSizeUtil.getValue(GlnFrameSize.middle) || 0;
        this.isFocused = false;
        this.isFilled = false;
        this.currConfig = this.rootConfig;
        HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-textarea', true);
        HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
    }
    ngOnChanges(changes) {
        // In the GlnBasisControl.ngOnChanges(), the definition is made:
        // - this.disabled = BooleanUtil.init(this.isDisabled);
        // - this.error = BooleanUtil.init(this.isError);
        // - this.labelShrink = BooleanUtil.init(this.isLabelShrink);
        // - this.noAnimation = BooleanUtil.init(this.isNoAnimation);
        // - this.noLabel = BooleanUtil.init(this.isNoLabel);
        // - this.readOnly = BooleanUtil.init(this.isReadOnly);
        // - this.required = BooleanUtil.init(this.isRequired);
        // - this.valueInit = BooleanUtil.init(this.isValueInit);
        super.ngOnChanges(changes);
        if (changes['config']) {
            this.currConfig = Object.assign(Object.assign({}, this.rootConfig), this.config);
        }
        if (changes['isRequired'] || changes['minLength'] || changes['maxLength']) {
            this.prepareFormGroup(this.required, this.minLength || null, this.maxLength || null);
        }
        if (changes['cntRows'] || changes['minRows'] || changes['maxRows']) {
            this.currentRows = this.cntRows || this.getCurrentRows(this.getNumberLines(this.formControl.value), this.minRows, this.maxRows);
        }
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngAfterContentInit() {
        super.ngAfterContentInit();
    }
    // ** ControlValueAccessor - start **
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    writeValue(value) {
        const isFilledOld = !!this.formControl.value;
        const cntLinesOld = this.getNumberLines(this.formControl.value);
        this.formControl.setValue(value, { emitEvent: false });
        this.isFilled = this.formControl.value !== '' && this.formControl.value != null;
        const cntLines = this.getNumberLines(this.formControl.value);
        if (cntLinesOld != cntLines) {
            this.currentRows = this.cntRows || this.getCurrentRows(this.getNumberLines(this.formControl.value), this.minRows, this.maxRows);
        }
        if (isFilledOld !== this.isFilled || cntLinesOld != cntLines) {
            this.changeDetectorRef.markForCheck();
        }
        super.writeValue(value);
    }
    setDisabledState(isDisabled) {
        if (this.disabled !== isDisabled) {
            isDisabled ? this.formGroup.disable() : this.formGroup.enable();
            super.setDisabledState(isDisabled);
        }
    }
    // ** ControlValueAccessor - finish **
    // ** Validator - start **
    validate(control) {
        return !control ? null : this.formControl.errors;
    }
    // ** Validator - finish **
    // ** GlnNodeInternalValidator - start **
    addValidators(validators) {
        if (validators != null) {
            this.formControl.addValidators(validators);
            this.formControl.updateValueAndValidity();
        }
    }
    addAsyncValidators(validators) {
        if (validators != null) {
            this.formControl.addAsyncValidators(validators);
            this.formControl.updateValueAndValidity();
        }
    }
    // ** GlnNodeInternalValidator - finish **
    // ** Public API **
    focus() {
        if (isPlatformBrowser(this.platformId) && !!this.textareaElementRef) {
            this.textareaElementRef.nativeElement.focus();
        }
    }
    doFocus() {
        this.isFocused = true;
        this.focusState(this.renderer, this.hostRef, this.isFocused);
        this.focused.emit();
    }
    doBlur() {
        this.isFocused = false;
        this.focusState(this.renderer, this.hostRef, this.isFocused);
        this.isFilled = !!this.formControl.value;
        this.onTouched();
        this.blured.emit();
    }
    doInput(event) {
        // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
        // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
        if (!!event && !event.cancelBubble) {
            this.onChange(this.formControl.value);
            this.currentRows = this.cntRows || this.getCurrentRows(this.getNumberLines(this.formControl.value), this.minRows, this.maxRows);
        }
    }
    // ** Private API **
    prepareFormGroup(isRequired, minLength, maxLength) {
        this.formControl.clearValidators();
        const newValidator = [];
        if (isRequired) {
            newValidator.push(Validators.required);
        }
        if (!!minLength && minLength > 0) {
            newValidator.push(Validators.minLength(minLength));
        }
        if (!!maxLength && maxLength > 0) {
            newValidator.push(Validators.maxLength(maxLength));
        }
        this.formControl.setValidators(newValidator);
    }
    focusState(renderer, elem, value) {
        HtmlElemUtil.setClass(renderer, elem, 'gln-focused', value || false);
        HtmlElemUtil.setAttr(renderer, elem, 'foc', value ? '' : null);
    }
    getCurrentRows(numberOfLines, minRows, maxRows) {
        let result = numberOfLines > 0 ? numberOfLines : 1;
        if (!!minRows && minRows > 0 && minRows > result) {
            result = minRows;
        }
        if (!!maxRows && maxRows > 0 && result > maxRows) {
            result = maxRows;
        }
        return result;
    }
    getNumberLines(value) {
        return (value || '').split('\n').length;
    }
}
GlnTextareaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTextareaComponent, deps: [{ token: PLATFORM_ID }, { token: i0.ChangeDetectorRef }, { token: GLN_TEXTAREA_CONFIG, optional: true }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
GlnTextareaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.2", type: GlnTextareaComponent, selector: "gln-textarea", inputs: { autoComplete: "autoComplete", cntCols: "cntCols", cntRows: "cntRows", config: "config", exterior: "exterior", frameSize: "frameSize", helperText: "helperText", label: "label", maxLength: "maxLength", maxRows: "maxRows", minLength: "minLength", minRows: "minRows", ornamLfAlign: "ornamLfAlign", ornamRgAlign: "ornamRgAlign", tabIndex: "tabIndex", wdFull: "wdFull" }, outputs: { focused: "focused", blured: "blured" }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnTextareaComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnTextareaComponent), multi: true },
        { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnTextareaComponent },
    ], viewQueries: [{ propertyName: "textareaElementRef", first: true, predicate: ["textareaElement"], descendants: true }], exportAs: ["glnTextarea"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-container [formGroup]=\"formGroup\">\n  <div class=\"glntx-wrap\"\n    [glnFrameExteriorInput]=\"exterior || currConfig?.exterior\"\n    #glnFrameExteriorInput=\"glnFrameExteriorInput\"\n    [glnFrameExteriorInputElementRef]=\"hostRef\"\n    (glnFrameExteriorInputChange)=\"glnFrameSize.updatePaddingVerAndHor()\">\n    <gln-frame [config]=\"config\"\n      [exterior]=\"glnFrameExteriorInput.exterior\"\n      [isDisabled]=\"disabled\"\n      [isError]=\"!!formControl.errors || error\"\n      [isFilled]=\"isFilled\"\n      [isLabelShrink]=\"labelShrink || currConfig?.isLabelShrink\"\n      [isNoAnimation]=\"noAnimation || currConfig?.isNoAnimation || isWriteValueInit\"\n      [isNoLabel]=\"noLabel || currConfig?.isNoLabel\"\n      [isRequired]=\"required\"\n      [label]=\"label\"\n      [glnFrameSize]=\"frameSize || currConfig?.frameSize\"\n      #glnFrameSize=\"glnFrameSize\"\n      [glnFrameSizeElementRef]=\"hostRef\"\n      [glnFrameSizeValue]=\"currConfig?.frameSizeValue || frameSizeDefault\"\n      [glnFrameSizeLabelPd]=\"currConfig?.labelPd\"\n      [glnFrameSizePrepare]=\"glnFrameExteriorInput\"\n      glnFrameOrnament\n      [glnFrameOrnamentLfAlign]=\"ornamLfAlign || currConfig?.ornamLfAlign\"\n      [glnFrameOrnamentRgAlign]=\"ornamRgAlign || currConfig?.ornamRgAlign\"\n      [glnFrameOrnamentPath]=\"'/div{0}'\">\n\n      <span glnfr-orn-lf\n        class=\"gln-ornam-lf\">\n        <ng-content select=\"[gln-orn-lf]\"></ng-content>\n      </span>\n      <span glnfr-orn-rg\n        class=\"gln-ornam-rg\">\n        <ng-content select=\"[gln-orn-rg]\"></ng-content>\n      </span>\n\n      <textarea #textareaElement\n        formControlName=\"textData\"\n        glnfr-mr-ver\n        glnfr-pd-hor\n        glnfr-elem\n        [attr.id]=\"id + '_textarea'\"\n        [rows]=\"currentRows\"\n        [ngClass]=\"['glntx-textarea', (readOnly ? 'gln-readonly' : '')]\"\n        [attr.disabled]=\"disabled ? '': null\"\n        [attr.autocomplete]=\"!!autoComplete ? autoComplete : null\"\n        [attr.readonly]=\"readOnly ? '': null\"\n        [attr.tabindex]=\"!disabled ? tabIndex : null\"\n        [cols]=\"cntCols\"\n        (focus)=\"doFocus()\"\n        (blur)=\"doBlur()\"\n        (input)=\"doInput($event)\"\n        (click)=\"$event.stopPropagation();\">\n      </textarea>\n\n    </gln-frame>\n  </div>\n</ng-container>\n<gln-hint-or-error *ngIf=\"!!helperText\"\n  [text]=\"helperText\"\n  [isError]=\"!!formControl.errors || error\"\n  [isFocused]=\"isFocused\"\n  [isDisabled]=\"disabled\">\n</gln-hint-or-error>", styles: ["gln-textarea{display:inline-flex;flex-direction:column}gln-textarea[wdFull]{width:100%}gln-textarea[wdFull] gln-frame>div>[glnfr-elem]{width:100%}gln-textarea[noHeEllipsis] gln-hint-or-error{white-space:normal;overflow:visible;text-overflow:clip}gln-textarea .glntx-textarea{font-size:inherit;font-family:inherit;letter-spacing:inherit;color:inherit;border:0;box-sizing:content-box;background:none;margin:0;padding:0;resize:none}gln-textarea .glntx-textarea:focus{outline:0}gln-textarea gln-hint-or-error{padding-left:var(--glntx-he-pd-lf, var(--glnfrs-pd-lf));padding-right:var(--glntx-he-pd-rg, var(--glnfrs-pd-rg))}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: GlnFrameExteriorInputDirective, selector: "[glnFrameExteriorInput]", inputs: ["glnFrameExteriorInput", "glnFrameExteriorInputElementRef"], outputs: ["glnFrameExteriorInputChange"], exportAs: ["glnFrameExteriorInput"] }, { kind: "component", type: GlnFrameComponent, selector: "gln-frame", inputs: ["config", "exterior", "isDisabled", "isError", "isFilled", "isLabelShrink", "isNoAnimation", "isNoLabel", "isRequired", "label"], exportAs: ["glnFrame"] }, { kind: "directive", type: GlnFrameOrnamentDirective, selector: "[glnFrameOrnament]", inputs: ["glnFrameOrnamentLfAlign", "glnFrameOrnamentRgAlign", "glnFrameOrnamentElementRef", "glnFrameOrnamentPath", "glnFrameOrnamentAfterContent"], exportAs: ["glnFrameOrnament"] }, { kind: "directive", type: GlnFrameSizeDirective, selector: "[glnFrameSize]", inputs: ["glnFrameSize", "glnFrameSizeValue", "glnFrameSizeLabelPd", "glnFrameSizeElementRef", "glnFrameSizePrepare", "glnFrameSizeModify"], outputs: ["glnFrameSizeChange"], exportAs: ["glnFrameSize"] }, { kind: "component", type: GlnHintOrErrorComponent, selector: "gln-hint-or-error", inputs: ["text", "isError", "isFocused", "isDisabled"], exportAs: ["glnHintOrError"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gln-textarea', exportAs: 'glnTextarea', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnTextareaComponent), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnTextareaComponent), multi: true },
                        { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnTextareaComponent },
                    ], template: "<ng-container [formGroup]=\"formGroup\">\n  <div class=\"glntx-wrap\"\n    [glnFrameExteriorInput]=\"exterior || currConfig?.exterior\"\n    #glnFrameExteriorInput=\"glnFrameExteriorInput\"\n    [glnFrameExteriorInputElementRef]=\"hostRef\"\n    (glnFrameExteriorInputChange)=\"glnFrameSize.updatePaddingVerAndHor()\">\n    <gln-frame [config]=\"config\"\n      [exterior]=\"glnFrameExteriorInput.exterior\"\n      [isDisabled]=\"disabled\"\n      [isError]=\"!!formControl.errors || error\"\n      [isFilled]=\"isFilled\"\n      [isLabelShrink]=\"labelShrink || currConfig?.isLabelShrink\"\n      [isNoAnimation]=\"noAnimation || currConfig?.isNoAnimation || isWriteValueInit\"\n      [isNoLabel]=\"noLabel || currConfig?.isNoLabel\"\n      [isRequired]=\"required\"\n      [label]=\"label\"\n      [glnFrameSize]=\"frameSize || currConfig?.frameSize\"\n      #glnFrameSize=\"glnFrameSize\"\n      [glnFrameSizeElementRef]=\"hostRef\"\n      [glnFrameSizeValue]=\"currConfig?.frameSizeValue || frameSizeDefault\"\n      [glnFrameSizeLabelPd]=\"currConfig?.labelPd\"\n      [glnFrameSizePrepare]=\"glnFrameExteriorInput\"\n      glnFrameOrnament\n      [glnFrameOrnamentLfAlign]=\"ornamLfAlign || currConfig?.ornamLfAlign\"\n      [glnFrameOrnamentRgAlign]=\"ornamRgAlign || currConfig?.ornamRgAlign\"\n      [glnFrameOrnamentPath]=\"'/div{0}'\">\n\n      <span glnfr-orn-lf\n        class=\"gln-ornam-lf\">\n        <ng-content select=\"[gln-orn-lf]\"></ng-content>\n      </span>\n      <span glnfr-orn-rg\n        class=\"gln-ornam-rg\">\n        <ng-content select=\"[gln-orn-rg]\"></ng-content>\n      </span>\n\n      <textarea #textareaElement\n        formControlName=\"textData\"\n        glnfr-mr-ver\n        glnfr-pd-hor\n        glnfr-elem\n        [attr.id]=\"id + '_textarea'\"\n        [rows]=\"currentRows\"\n        [ngClass]=\"['glntx-textarea', (readOnly ? 'gln-readonly' : '')]\"\n        [attr.disabled]=\"disabled ? '': null\"\n        [attr.autocomplete]=\"!!autoComplete ? autoComplete : null\"\n        [attr.readonly]=\"readOnly ? '': null\"\n        [attr.tabindex]=\"!disabled ? tabIndex : null\"\n        [cols]=\"cntCols\"\n        (focus)=\"doFocus()\"\n        (blur)=\"doBlur()\"\n        (input)=\"doInput($event)\"\n        (click)=\"$event.stopPropagation();\">\n      </textarea>\n\n    </gln-frame>\n  </div>\n</ng-container>\n<gln-hint-or-error *ngIf=\"!!helperText\"\n  [text]=\"helperText\"\n  [isError]=\"!!formControl.errors || error\"\n  [isFocused]=\"isFocused\"\n  [isDisabled]=\"disabled\">\n</gln-hint-or-error>", styles: ["gln-textarea{display:inline-flex;flex-direction:column}gln-textarea[wdFull]{width:100%}gln-textarea[wdFull] gln-frame>div>[glnfr-elem]{width:100%}gln-textarea[noHeEllipsis] gln-hint-or-error{white-space:normal;overflow:visible;text-overflow:clip}gln-textarea .glntx-textarea{font-size:inherit;font-family:inherit;letter-spacing:inherit;color:inherit;border:0;box-sizing:content-box;background:none;margin:0;padding:0;resize:none}gln-textarea .glntx-textarea:focus{outline:0}gln-textarea gln-hint-or-error{padding-left:var(--glntx-he-pd-lf, var(--glnfrs-pd-lf));padding-right:var(--glntx-he-pd-rg, var(--glnfrs-pd-rg))}\n"] }]
        }], ctorParameters: function () {
        return [{ type: Object, decorators: [{
                        type: Inject,
                        args: [PLATFORM_ID]
                    }] }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [GLN_TEXTAREA_CONFIG]
                    }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }];
    }, propDecorators: { autoComplete: [{
                type: Input
            }], cntCols: [{
                type: Input
            }], cntRows: [{
                type: Input
            }], config: [{
                type: Input
            }], exterior: [{
                type: Input
            }], frameSize: [{
                type: Input
            }], helperText: [{
                type: Input
            }], label: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], maxRows: [{
                type: Input
            }], minLength: [{
                type: Input
            }], minRows: [{
                type: Input
            }], ornamLfAlign: [{
                type: Input
            }], ornamRgAlign: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], wdFull: [{
                type: Input
            }], focused: [{
                type: Output
            }], blured: [{
                type: Output
            }], textareaElementRef: [{
                type: ViewChild,
                args: ['textareaElement']
            }] } });

class GlnTextareaModule {
}
GlnTextareaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTextareaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlnTextareaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.2", ngImport: i0, type: GlnTextareaModule, declarations: [GlnTextareaComponent], imports: [CommonModule,
        ReactiveFormsModule,
        GlnColorModule,
        GlnFrameExteriorInputModule,
        GlnFrameModule,
        GlnFrameOrnamentModule,
        GlnFrameSizeModule,
        GlnHintOrErrorModule], exports: [GlnTextareaComponent] });
GlnTextareaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTextareaModule, imports: [CommonModule,
        ReactiveFormsModule,
        GlnColorModule,
        GlnFrameExteriorInputModule,
        GlnFrameModule,
        GlnFrameOrnamentModule,
        GlnFrameSizeModule,
        GlnHintOrErrorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.2", ngImport: i0, type: GlnTextareaModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GlnTextareaComponent],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        GlnColorModule,
                        GlnFrameExteriorInputModule,
                        GlnFrameModule,
                        GlnFrameOrnamentModule,
                        GlnFrameSizeModule,
                        GlnHintOrErrorModule,
                    ],
                    exports: [GlnTextareaComponent],
                }]
        }] });

/*
 * Public API Surface of gelenium-ui
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ATTR_ORN_LF, ATTR_ORN_RG, ArrayUtil, AutoUnsubscribe, BooleanUtil, GLN_BUTTON_CONFIG, GLN_FRAME_CONFIG, GLN_INPUT_CONFIG, GLN_NODE_INTERNAL_VALIDATOR, GLN_OPTION_PARENT, GLN_SELECT_CONFIG, GLN_SELECT_TRIGGER, GLN_TEXTAREA_CONFIG, GeleniumUiModule, GeleniumUiService, GlnAutoFocuseDirective, GlnAutoFocuseModule, GlnAutoFocuseOwnerDirective, GlnButtonComponent, GlnButtonExterior, GlnButtonExteriorUtil, GlnButtonModule, GlnColorDirective, GlnColorModule, GlnFrameComponent, GlnFrameExterior, GlnFrameExteriorButtonDirective, GlnFrameExteriorButtonModule, GlnFrameExteriorInputDirective, GlnFrameExteriorInputModule, GlnFrameExteriorUtil, GlnFrameModule, GlnFrameOrnamAlign, GlnFrameOrnamAlignUtil, GlnFrameOrnamentDirective, GlnFrameOrnamentModule, GlnFrameSize, GlnFrameSizeDirective, GlnFrameSizeModule, GlnFrameSizeUtil, GlnFrameSizeValue, GlnHintOrErrorComponent, GlnHintOrErrorModule, GlnInfiniteScrollComponent, GlnInfiniteScrollModule, GlnInputComponent, GlnInputModule, GlnInputType, GlnInputTypeUtil, GlnLinkDirective, GlnOptionComponent, GlnOptionGroupComponent, GlnOptionGroupModule, GlnOptionModule, GlnOptionUtil, GlnRegexCheckDirective, GlnRegexCheckUtil, GlnRegexMatchDirective, GlnRegexMatchUtil, GlnRegexModule, GlnRegexRemoveDirective, GlnSelectComponent, GlnSelectModule, GlnSelectTriggerDirective, GlnTextareaComponent, GlnTextareaModule, GlnTouchRippleComponent, GlnTouchRippleModule, HtmlElemUtil, NAME_NUMERIC, NAME_NUMERIC12_2, NAME_NUMERIC_EXP, NumberUtil, REGEXP_NUMERIC, REGEXP_NUMERIC12_2, REGEXP_NUMERIC_EXP, REGEXP_REAL_NUMERIC, REGEX_CHECK_NAME, ScreenUtil, UrlParamUtil, regexCheckValidator };
//# sourceMappingURL=gelenium-ui.mjs.map
