import { ElementRef, Renderer2 } from '@angular/core';
export declare class HtmlElemUtil {
    static setProperty(element: ElementRef<HTMLElement> | null, name: string, value: string | null | undefined): void;
    static setClass(renderer: Renderer2, element: ElementRef<HTMLElement> | null, className: string, isAdd: boolean): void;
    static setAttr(renderer: Renderer2, elem: ElementRef<HTMLElement> | null, name: string, value: string | null | undefined): void;
    static updateIfMissing(renderer: Renderer2, elem: ElementRef<HTMLElement> | null, name: string, value: string): void;
    static getChildByAttribute(elem: ElementRef<HTMLElement> | null, attributeList: string[]): Element | null;
    static getElementRef(element: HTMLElement | null): ElementRef<HTMLElement> | null;
    static getElementByPathClassOrTag(element: HTMLElement, pathToElement: string | null): HTMLElement | null;
}
