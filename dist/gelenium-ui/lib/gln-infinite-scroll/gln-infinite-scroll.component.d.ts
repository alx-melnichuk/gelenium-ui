import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class GlnInfiniteScrollComponent implements AfterViewInit, OnInit, OnDestroy {
    private hostRef;
    options: IntersectionObserverInit;
    readonly scrolled: EventEmitter<void>;
    anchor: ElementRef<HTMLElement> | null;
    private observer;
    constructor(hostRef: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private isHostScrollable;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnInfiniteScrollComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GlnInfiniteScrollComponent, "gln-infinite-scroll", ["glnInfiniteScroll"], { "options": "options"; }, { "scrolled": "scrolled"; }, never, ["*"], false>;
}
