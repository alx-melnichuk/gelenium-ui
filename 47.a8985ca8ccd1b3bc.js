"use strict";(self.webpackChunkgelenium_ui_demo=self.webpackChunkgelenium_ui_demo||[]).push([[47],{9047:($,b,a)=>{a.r(b),a.d(b,{CmInfiniteScrollModule:()=>X});var r=a(6895),_=a(811),l=a(7084),p=a(3848),h=a(4196),n=a(1571);let Z=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[r.ez,_.vV,l.To,p.Nh,h.rf]}),e})(),N=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[r.ez,_.vV,l.To,p.Nh,h.rf]}),e})(),T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[r.ez]}),e})();var v=a(6001),S=a(590),U=a(4577),u=a(4171),m=a(6986);function M(e,s){if(1&e&&(n.TgZ(0,"div",14)(1,"div",15)(2,"span",16),n._uU(3,"serial number"),n.qZA(),n.TgZ(4,"span",17),n._uU(5),n.qZA()(),n.TgZ(6,"div",15)(7,"span",16),n._uU(8,"participant"),n.qZA(),n.TgZ(9,"span",17),n._uU(10),n.qZA()(),n.TgZ(11,"div",15)(12,"span",16),n._uU(13,"email"),n.qZA(),n.TgZ(14,"span",17),n._uU(15),n.qZA()(),n.TgZ(16,"div",15)(17,"span",16),n._uU(18,"phone"),n.qZA(),n.TgZ(19,"span",17),n._uU(20),n.qZA()()()),2&e){const t=s.$implicit,i=s.index,o=s.count;n.xp6(5),n.AsE("",i+1,"/",o," "),n.xp6(5),n.AsE("",t.name," ",t.surname,""),n.xp6(5),n.Oqu(t.email),n.xp6(5),n.Oqu(t.phone)}}function E(e,s){if(1&e&&(n.TgZ(0,"div",14)(1,"div",15)(2,"span",16),n._uU(3,"serial number"),n.qZA(),n.TgZ(4,"span",17),n._uU(5),n.qZA()(),n.TgZ(6,"div",15)(7,"span",16),n._uU(8,"participant"),n.qZA(),n.TgZ(9,"span",17),n._uU(10),n.qZA()(),n.TgZ(11,"div",15)(12,"span",16),n._uU(13,"email"),n.qZA(),n.TgZ(14,"span",17),n._uU(15),n.qZA()(),n.TgZ(16,"div",15)(17,"span",16),n._uU(18,"phone"),n.qZA(),n.TgZ(19,"span",17),n._uU(20),n.qZA()()()),2&e){const t=s.$implicit,i=s.index,o=s.count;n.xp6(5),n.AsE("",i+1,"/",o," "),n.xp6(5),n.AsE("",t.name," ",t.surname,""),n.xp6(5),n.Oqu(t.email),n.xp6(5),n.Oqu(t.phone)}}function y(e,s){1&e&&(n.TgZ(0,"div",18),n._uU(1," Loading... "),n.qZA())}const w=["James","Mary","Robert","Patricia","John","Jennifer","Michael","Linda","William","Elizabeth","David"],x=["Barbara","Richard","Susan","Joseph","Jessica","Thomas","Sarah","Charles","Karen","Christopher","Nancy"],I=["Daniel","Lisa","Matthew","Betty","Anthony","Margaret","Mark","Sandra","Donald","Ashley"],q=["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez"],R=["Hernandez","Lopez","Gonzales","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin"],L=["Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker"];let J=(()=>{class e{constructor(t){this.changeDetectorRef=t,this.labelShowSource=m.sx,this.labelHtml=m.zC,this.labelTs=m.QS,this.labelCss=m.Er,this.urlCmInfiniteScroll="/"+u.g.get("URL_COMPONENTS")+"/"+u.g.get("URL_COMPONENTS_INFINITE_SCROLL"),this.elements0=[],this.elements1=[],this.isLoading=!1,this.names=[...w,...x,...I],this.surnames=[...q,...R,...L],this.elements0=this.createElementList(5),this.elements1=this.createElementList(5)}trackByElement(t,i){return i?.name+i?.surname}doScroll(){this.isLoading=!0,setTimeout(()=>{this.elements1.push(...this.createElementList(5)),this.isLoading=!1,this.changeDetectorRef.markForCheck()},1e3)}randomNumber(t){return Math.floor(Math.random()*t+1)}createPhone(){return("000"+this.randomNumber(1e3)).slice(-3)+"-"+("000"+this.randomNumber(1e3)).slice(-3)+"-"+("000"+this.randomNumber(100)).slice(-2)+"-"+("000"+this.randomNumber(100)).slice(-2)}createElement(){const t=this.names.length,i=this.names[Math.floor(Math.random()*t)],o=this.surnames.length,c=this.surnames[Math.floor(Math.random()*o)];return{name:i,surname:c,email:i+"."+c+"@gmail.com",phone:this.createPhone()}}createElementList(t){const i=[];for(;i.length<t;)i.push(this.createElement());return i}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(n.sBO))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-cm-infinite-scroll-basic"]],inputs:{labelShowSource:"labelShowSource",labelHtml:"labelHtml",labelTs:"labelTs",labelCss:"labelCss"},decls:109,vars:14,consts:[["mr-vr",""],[1,"app-hover-link"],[3,"href"],["source","ts"],[1,"isb-item-wrap"],["class","isb-items",4,"ngFor","ngForOf","ngForTrackBy"],["animationDuration","0ms"],[3,"label"],["source","html"],["source","css"],["href","https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API","target","_blank"],[1,"isb-block"],[1,"isb-item-wrap",3,"scrolled"],["class","isb-loading",4,"ngIf"],[1,"isb-items"],[1,"isb-row"],[1,"isb-label"],[1,"isb-value"],[1,"isb-loading"]],template:function(t,i){1&t&&(n.TgZ(0,"section",0)(1,"h3",1),n._uU(2," Basic. "),n.TgZ(3,"a",2),n._uU(4,"#"),n.qZA()(),n.TgZ(5,"span"),n._uU(6," To use this component, in your module you need to add: "),n.qZA(),n.TgZ(7,"code")(8,"pre",3),n._uU(9,"import { GlnInfiniteScrollModule } from 'gelenium-ui';"),n.qZA()(),n.TgZ(10,"p"),n._uU(11,' A situation often arises when you need to display a vertical list of some elements. Moreover, the number of elements can be significant. In order not to load the server and reduce the display time of this page, the data output is organized page by page (that is, in small portions of 10 - 20 elements). It is not always convenient to display the list page by page, there is an alternative option: to display the list with "infinite scrolling". Its idea is to initially display the first portion of the list, and when the user scrolls to the last item, load the next portion of the list. '),n.qZA(),n.TgZ(12,"p"),n._uU(13,' For example, let\'s build a simple list of participants with 5 elements. To implement scrolling, you need a container element and its contents (in our example, a list of participants). The container has a fixed height, which is less than the height of all elements inside the container. Also the container has a css-style "overflow-y: scroll;". In this case, the scroll element will be displayed for this container. '),n.qZA()(),n.TgZ(14,"div",4),n.YNc(15,M,21,6,"div",5),n.qZA(),n.TgZ(16,"section",0)(17,"mat-accordion")(18,"mat-expansion-panel")(19,"mat-expansion-panel-header")(20,"mat-panel-title"),n._uU(21),n.qZA()(),n.TgZ(22,"mat-tab-group",6)(23,"mat-tab",7)(24,"pre",8),n._uU(25,'<div class="isb-item-wrap">\n  <div class="isb-items"\n    *ngFor="let item of elements0; let idx=index;\n      let count=count; trackBy: trackByElement">\n    <div class="isb-row">\n      <span class="isb-label">serial number</span>\n      <span class="isb-value">'),n.TgZ(26,"b"),n._uU(27,"{"),n.qZA(),n._uU(28,"{ idx+1 }}/"),n.TgZ(29,"b"),n._uU(30,"{"),n.qZA(),n._uU(31,'{ count }} </span>\n    </div>\n    <div class="isb-row">\n      <span class="isb-label">participant</span>\n      <span class="isb-value">'),n.TgZ(32,"b"),n._uU(33,"{"),n.qZA(),n._uU(34,"{ item.name }} "),n.TgZ(35,"b"),n._uU(36,"{"),n.qZA(),n._uU(37,'{ item.surname }}</span>\n    </div>\n    <div class="isb-row">\n      <span class="isb-label">email</span>\n      <span class="isb-value">'),n.TgZ(38,"b"),n._uU(39,"{"),n.qZA(),n._uU(40,'{ item.email }}</span>\n    </div>\n    <div class="isb-row">\n      <span class="isb-label">phone</span>\n      <span class="isb-value">'),n.TgZ(41,"b"),n._uU(42,"{"),n.qZA(),n._uU(43,"{ item.phone }}</span>\n    </div>\n  </div>\n</div>"),n.qZA()(),n.TgZ(44,"mat-tab",7)(45,"pre",3),n._uU(46,"import {\n  Component, ViewEncapsulation\n} from '@angular/core';\n\nexport interface Element {\n  name: string;\n  surname: string;\n  email: string;\n  phone: string;\n}\n\nconst CN_CNT = 5;\nconst CN_NAME1 = ['James', 'Mary', 'Robert', 'Patricia', 'John', \n  'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David'];\nconst CN_NAME2 = ['Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', \n  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy'];\nconst CN_NAME3 = ['Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony',\n  'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley'];\nconst CN_SURNAME1 = ['Smith', 'Johnson', 'Williams', 'Brown',\n  'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];\nconst CN_SURNAME2 = ['Hernandez', 'Lopez', 'Gonzales', 'Wilson', \n  'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];\nconst CN_SURNAME3 = ['Perez', 'Thompson', 'White', 'Harris',\n  'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'];\n\n@Component({\n  selector: 'app-infinite-scroll',\n  templateUrl: './infinite-scroll.component.html',\n  styleUrls: ['./infinite-scroll.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class InfiniteScrollComponent {\n  public elements0: Element[] = [];\n\n  private names: string[]\n    = [...CN_NAME1, ...CN_NAME2, ...CN_NAME3];\n  private surnames: string[]\n    = [...CN_SURNAME1, ...CN_SURNAME2, ...CN_SURNAME3];\n\n  constructor() {\n    this.elements0 = this.createElementList(CN_CNT);\n  }\n\n  // ** Public API **\n\n  public trackByElement(index: number, item: Element): string {\n    return item?.name + item?.surname;\n  }\n\n  // ** Private API **\n\n  private randomNumber(value: number): number {\n    return Math.floor(Math.random() * value + 1);\n  }\n\n  private createPhone(): string {\n    const part1 = ('000' + this.randomNumber(1000)).slice(-3);\n    const part2 = ('000' + this.randomNumber(1000)).slice(-3);\n    const part3 = ('000' + this.randomNumber(100)).slice(-2);\n    const part4 = ('000' + this.randomNumber(100)).slice(-2);\n    return part1 + '-' + part2 + '-' + part3 + '-' + part4;\n  }\n\n  private createElement(): Element {\n    const cntN = this.names.length;\n    const name = this.names[Math.floor(Math.random() * cntN)];\n    const cntS = this.surnames.length;\n    const surname = this.surnames[Math.floor(Math.random() * cntS)];\n    const email = name + '.' + surname + '@gmail.com';\n    const phone = this.createPhone();\n    return { name, surname, email, phone };\n  }\n\n  private createElementList(cnt: number): Element[] {\n    const result: Element[] = [];\n    while (result.length < cnt) {\n      result.push(this.createElement());\n    }\n    return result;\n  }\n}"),n.qZA()(),n.TgZ(47,"mat-tab",7)(48,"pre",9),n._uU(49,"app-infinite-scroll {\n  .isb-item-wrap {\n    outline: 1px solid blue;\n    height: 400px;\n    overflow-y: scroll;\n  }\n  .isb-items {\n    outline: 1px dashed green;\n    padding: 15px 0;\n  }\n  .isb-row {\n    display: flex;\n    padding: 3px 10px;\n  }\n  .isb-label {\n    flex-basis: 120px;\n  }\n  .isb-value {\n    flex-grow: 1;\n  }\n}"),n.qZA()()()()()(),n.TgZ(50,"section",0)(51,"p"),n._uU(52,' Now let\'s add the "infinite-scroll" implementation to the previous example. To do this, add the "gln-infinite-scroll" component inside the container ("isb-item-wrap"). And move all the contents of the container into the gln-infinite-scroll component. '),n.qZA(),n.TgZ(53,"p"),n._uU(54,' The "gln-infinite-scroll" component adds an empty element at the end of its context: '),n.qZA(),n.TgZ(55,"pre"),n._uU(56,"<div #anchor></div>"),n.qZA(),n.TgZ(57,"p"),n._uU(58,' When the "gln-infinite-scroll" component is initialized, an observer is created: '),n.qZA(),n.TgZ(59,"pre"),n._uU(60,"this.observer = new IntersectionObserver(([entry]) => {\n  if (entry.isIntersecting) {\n    this.scrolled.emit();\n  }\n}, options);\n\nthis.observer.observe(this.anchor.nativeElement);"),n.qZA(),n.TgZ(61,"p"),n._uU(62,' And this observer is assigned the native #anchor element. As a result, when the native #anchor element becomes visible, the observer is triggered and the "scrolled" event is raised. The parent component subscribe to this event. And when this event occurs, a request for a new data packet is executed. '),n.qZA(),n.TgZ(63,"p"),n._uU(64,' The "gln-infinite-scroll" component expects it or its parent to have a css: overflow-y: scroll or overflow: auto property. This makes it possible to use Intersection Observer. The '),n.TgZ(65,"a",10),n._uU(66,"Intersection Observer API "),n.qZA(),n._uU(67," provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport. "),n.qZA()(),n.TgZ(68,"div",11)(69,"gln-infinite-scroll",12),n.NdJ("scrolled",function(){return i.doScroll()}),n.YNc(70,E,21,6,"div",5),n.qZA(),n.YNc(71,y,2,0,"div",13),n.qZA(),n.TgZ(72,"section",0)(73,"mat-accordion")(74,"mat-expansion-panel")(75,"mat-expansion-panel-header")(76,"mat-panel-title"),n._uU(77),n.qZA()(),n.TgZ(78,"mat-tab-group",6)(79,"mat-tab",7)(80,"pre",8),n._uU(81,'<div class="isb-block">\n\n  <gln-infinite-scroll class="isb-item-wrap"\n    (scrolled)="doScroll()">\n\n    <div class="isb-items"\n      *ngFor="let item of elements1; let idx=index; let count=count;\n        trackBy: trackByElement">\n      <div class="isb-row">\n        <span class="isb-label">serial number</span>\n        <span class="isb-value">'),n.TgZ(82,"b"),n._uU(83,"{"),n.qZA(),n._uU(84,"{ idx+1 }}/"),n.TgZ(85,"b"),n._uU(86,"{"),n.qZA(),n._uU(87,'{ count }} </span>\n      </div>\n      <div class="isb-row">\n        <span class="isb-label">participant</span>\n        <span class="isb-value">'),n.TgZ(88,"b"),n._uU(89,"{"),n.qZA(),n._uU(90,"{ item.name }} "),n.TgZ(91,"b"),n._uU(92,"{"),n.qZA(),n._uU(93,'{ item.surname }}</span>\n      </div>\n      <div class="isb-row">\n        <span class="isb-label">email</span>\n        <span class="isb-value">'),n.TgZ(94,"b"),n._uU(95,"{"),n.qZA(),n._uU(96,'{ item.email }}</span>\n      </div>\n      <div class="isb-row">\n        <span class="isb-label">phone</span>\n        <span class="isb-value">'),n.TgZ(97,"b"),n._uU(98,"{"),n.qZA(),n._uU(99,'{ item.phone }}</span>\n      </div>\n    </div>\n\n  </gln-infinite-scroll>\n\n  <div *ngIf="isLoading"\n    class="isb-loading">\n    Loading...\n  </div>\n</div>'),n.qZA()(),n.TgZ(100,"mat-tab",7)(101,"pre",3),n._uU(102,"import {\n  ChangeDetectorRef, Component, ViewEncapsulation\n} from '@angular/core';\n\nexport interface Element {\n  name: string;\n  surname: string;\n  email: string;\n  phone: string;\n}\n\nconst CN_CNT = 5;\nconst CN_NAME1 = ['James', 'Mary', 'Robert', 'Patricia', 'John', \n  'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David'];\nconst CN_NAME2 = ['Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', \n  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy'];\nconst CN_NAME3 = ['Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony',\n  'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley'];\nconst CN_SURNAME1 = ['Smith', 'Johnson', 'Williams', 'Brown',\n  'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];\nconst CN_SURNAME2 = ['Hernandez', 'Lopez', 'Gonzales', 'Wilson', \n  'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];\nconst CN_SURNAME3 = ['Perez', 'Thompson', 'White', 'Harris',\n  'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'];\n\n@Component({\n  selector: 'app-infinite-scroll-basic',\n  templateUrl: './infinite-scroll-basic.component.html',\n  styleUrls: ['./infinite-scroll-basic.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class InfiniteScrollComponent {\n  public elements1: Element[] = [];\n  public isLoading = false;\n\n  private names: string[]\n    = [...CN_NAME1, ...CN_NAME2, ...CN_NAME3];\n  private surnames: string[]\n    = [...CN_SURNAME1, ...CN_SURNAME2, ...CN_SURNAME3];\n\n  constructor(private changeDetectorRef: ChangeDetectorRef) {\n    this.elements1 = this.createElementList(CN_CNT);\n  }\n\n  // ** Public API **\n\n  public trackByElement(index: number, item: Element): string {\n    return item?.name + item?.surname;\n  }\n\n  public doScroll(): void {\n    this.isLoading = true;\n    setTimeout(() => {\n      this.elements1.push(...this.createElementList(CN_CNT));\n      this.isLoading = false;\n      this.changeDetectorRef.markForCheck();\n    }, 1000);\n  }\n\n  // ** Private API **\n\n  private randomNumber(value: number): number {\n    return Math.floor(Math.random() * value + 1);\n  }\n\n  private createPhone(): string {\n    const part1 = ('000' + this.randomNumber(1000)).slice(-3);\n    const part2 = ('000' + this.randomNumber(1000)).slice(-3);\n    const part3 = ('000' + this.randomNumber(100)).slice(-2);\n    const part4 = ('000' + this.randomNumber(100)).slice(-2);\n    return part1 + '-' + part2 + '-' + part3 + '-' + part4;\n  }\n\n  private createElement(): Element {\n    const cntN = this.names.length;\n    const name = this.names[Math.floor(Math.random() * cntN)];\n    const cntS = this.surnames.length;\n    const surname = this.surnames[Math.floor(Math.random() * cntS)];\n    const email = name + '.' + surname + '@gmail.com';\n    const phone = this.createPhone();\n    return { name, surname, email, phone };\n  }\n\n  private createElementList(cnt: number): Element[] {\n    const result: Element[] = [];\n    while (result.length < cnt) {\n      result.push(this.createElement());\n    }\n    return result;\n  }\n}"),n.qZA()(),n.TgZ(103,"mat-tab",7)(104,"pre",9),n._uU(105,"\n.isb-block {\n  position: relative;\n}\n.isb-item-wrap {\n  outline: 1px solid blue;\n  height: 400px;\n  overflow-y: scroll;\n}\n.isb-items {\n  outline: 1px dashed green;\n  padding: 15px 0;\n}\n.isb-row {\n  display: flex;\n  padding: 3px 10px;\n}\n.isb-label {\n  flex-basis: 120px;\n}\n.isb-value {\n  flex-grow: 1;\n}\n.isb-loading {\n  color: blue;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgb(253 255 255 / 70%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}"),n.qZA()()()()()(),n.TgZ(106,"section",0)(107,"p"),n._uU(108," When the user scrolls to the last item in the list, a request is made to retrieve a new batch of data. After receiving a new batch of data, the total number in the list is increased by 5 items. "),n.qZA()()),2&t&&(n.xp6(3),n.Q6J("href",i.urlCmInfiniteScroll+"#Basic",n.LSH),n.xp6(12),n.Q6J("ngForOf",i.elements0)("ngForTrackBy",i.trackByElement),n.xp6(6),n.Oqu(i.labelShowSource),n.xp6(2),n.Q6J("label",i.labelHtml),n.xp6(21),n.Q6J("label",i.labelTs),n.xp6(3),n.Q6J("label",i.labelCss),n.xp6(23),n.Q6J("ngForOf",i.elements1)("ngForTrackBy",i.trackByElement),n.xp6(1),n.Q6J("ngIf",i.isLoading),n.xp6(6),n.Oqu(i.labelShowSource),n.xp6(2),n.Q6J("label",i.labelHtml),n.xp6(21),n.Q6J("label",i.labelTs),n.xp6(3),n.Q6J("label",i.labelCss))},dependencies:[r.sg,r.O5,l.pp,l.ib,l.yz,l.yK,p.SP,p.uX,h.S9],styles:["app-cm-infinite-scroll-basic{display:block}app-cm-infinite-scroll-basic .isb-block{position:relative}app-cm-infinite-scroll-basic .isb-item-wrap{outline:1px solid blue;height:400px;overflow-y:scroll}app-cm-infinite-scroll-basic .isb-items{outline:1px dashed green;padding:15px 0}app-cm-infinite-scroll-basic .isb-row{display:flex;padding:3px 10px}app-cm-infinite-scroll-basic .isb-label{flex-basis:120px}app-cm-infinite-scroll-basic .isb-value{flex-grow:1}app-cm-infinite-scroll-basic .isb-loading{color:#00f;position:absolute;top:0;right:0;bottom:0;left:0;background-color:#fdffffb3;display:flex;justify-content:center;align-items:center}\n"],encapsulation:2,changeDetection:0}),e})();function k(e,s){if(1&e&&(n.TgZ(0,"div",13)(1,"div",14)(2,"span",15),n._uU(3,"serial number"),n.qZA(),n.TgZ(4,"span",16),n._uU(5),n.qZA()(),n.TgZ(6,"div",14)(7,"span",15),n._uU(8,"participant"),n.qZA(),n.TgZ(9,"span",16),n._uU(10),n.qZA()(),n.TgZ(11,"div",14)(12,"span",15),n._uU(13,"email"),n.qZA(),n.TgZ(14,"span",16),n._uU(15),n.qZA()(),n.TgZ(16,"div",14)(17,"span",15),n._uU(18,"phone"),n.qZA(),n.TgZ(19,"span",16),n._uU(20),n.qZA()()()),2&e){const t=s.$implicit,i=s.index,o=s.count;n.xp6(5),n.AsE("",i+1,"/",o," "),n.xp6(5),n.AsE("",t.name," ",t.surname,""),n.xp6(5),n.Oqu(t.email),n.xp6(5),n.Oqu(t.phone)}}function z(e,s){1&e&&(n.TgZ(0,"div",17),n._uU(1," Loading... "),n.qZA())}const B=["James","Mary","Robert","Patricia","John","Jennifer","Michael","Linda","William","Elizabeth","David"],O=["Barbara","Richard","Susan","Joseph","Jessica","Thomas","Sarah","Charles","Karen","Christopher","Nancy"],P=["Daniel","Lisa","Matthew","Betty","Anthony","Margaret","Mark","Sandra","Donald","Ashley"],D=["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez"],F=["Hernandez","Lopez","Gonzales","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin"],W=["Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker"];let H=(()=>{class e{constructor(t){this.changeDetectorRef=t,this.labelShowSource=m.sx,this.labelHtml=m.zC,this.labelTs=m.QS,this.labelCss=m.Er,this.urlCmInfiniteScroll="/"+u.g.get("URL_COMPONENTS")+"/"+u.g.get("URL_COMPONENTS_INFINITE_SCROLL"),this.elements2=[],this.isLoading=!1,this.names=[...B,...O,...P],this.surnames=[...D,...F,...W],this.elements2=this.createElementList(5)}trackByElement(t,i){return i?.name+i?.surname}doScroll(){this.isLoading=!0,setTimeout(()=>{this.elements2.push(...this.createElementList(5)),this.isLoading=!1,this.changeDetectorRef.markForCheck()},1e3)}randomNumber(t){return Math.floor(Math.random()*t+1)}createPhone(){return("000"+this.randomNumber(1e3)).slice(-3)+"-"+("000"+this.randomNumber(1e3)).slice(-3)+"-"+("000"+this.randomNumber(100)).slice(-2)+"-"+("000"+this.randomNumber(100)).slice(-2)}createElement(){const t=this.names.length,i=this.names[Math.floor(Math.random()*t)],o=this.surnames.length,c=this.surnames[Math.floor(Math.random()*o)];return{name:i,surname:c,email:i+"."+c+"@gmail.com",phone:this.createPhone()}}createElementList(t){const i=[];for(;i.length<t;)i.push(this.createElement());return i}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(n.sBO))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-cm-infinite-scroll-optional"]],inputs:{labelShowSource:"labelShowSource",labelHtml:"labelHtml",labelTs:"labelTs",labelCss:"labelCss"},decls:48,vars:8,consts:[["mr-vr",""],[1,"app-hover-link"],[3,"href"],[1,"iso-block"],[1,"iso-item-wrap"],[3,"scrolled"],["class","iso-items",4,"ngFor","ngForOf","ngForTrackBy"],["class","iso-loading",4,"ngIf"],["animationDuration","0ms"],[3,"label"],["source","html"],["source","ts"],["source","css"],[1,"iso-items"],[1,"iso-row"],[1,"iso-label"],[1,"iso-value"],[1,"iso-loading"]],template:function(t,i){1&t&&(n.TgZ(0,"section",0)(1,"h3",1),n._uU(2," Optional. "),n.TgZ(3,"a",2),n._uU(4,"#"),n.qZA()(),n.TgZ(5,"p"),n._uU(6,' Above, there was an example where the "gln-infinite-scroll" component itself has the css-property: overflow-y: scroll (or overflow: auto). Now let\'s consider the option when the parent element has this css-property, and not the "gln-infinite-scroll" component itself. '),n.qZA(),n.TgZ(7,"p"),n._uU(8,' Add an additional container "iso-item-wrap" with the required css-property overflow-y: scroll (or overflow: auto). And inside this container we will place the "gln-infinite-scroll" component. '),n.qZA()(),n.TgZ(9,"div",3)(10,"div",4)(11,"gln-infinite-scroll",5),n.NdJ("scrolled",function(){return i.doScroll()}),n.YNc(12,k,21,6,"div",6),n.qZA()(),n.YNc(13,z,2,0,"div",7),n.qZA(),n.TgZ(14,"section",0)(15,"mat-accordion")(16,"mat-expansion-panel")(17,"mat-expansion-panel-header")(18,"mat-panel-title"),n._uU(19),n.qZA()(),n.TgZ(20,"mat-tab-group",8)(21,"mat-tab",9)(22,"pre",10),n._uU(23,'<div class="iso-block">\n  <div class="iso-item-wrap">\n\n    <gln-infinite-scroll (scrolled)="doScroll()">\n\n      <div class="iso-items"\n        *ngFor="let item of elements2; let idx=index;\n        let count=count; trackBy: trackByElement">\n        <div class="iso-row">\n          <span class="iso-label">serial number</span>\n          <span class="iso-value">'),n.TgZ(24,"b"),n._uU(25,"{"),n.qZA(),n._uU(26,"{ idx+1 }}/"),n.TgZ(27,"b"),n._uU(28,"{"),n.qZA(),n._uU(29,'{ count }} </span>\n        </div>\n        <div class="iso-row">\n          <span class="iso-label">participant</span>\n          <span class="iso-value">'),n.TgZ(30,"b"),n._uU(31,"{"),n.qZA(),n._uU(32,"{ item.name }} "),n.TgZ(33,"b"),n._uU(34,"{"),n.qZA(),n._uU(35,'{ item.surname }}</span>\n        </div>\n        <div class="iso-row">\n          <span class="iso-label">email</span>\n          <span class="iso-value">'),n.TgZ(36,"b"),n._uU(37,"{"),n.qZA(),n._uU(38,'{ item.email }}</span>\n        </div>\n        <div class="iso-row">\n          <span class="iso-label">phone</span>\n          <span class="iso-value">'),n.TgZ(39,"b"),n._uU(40,"{"),n.qZA(),n._uU(41,'{ item.phone }}</span>\n        </div>\n      </div>\n\n    </gln-infinite-scroll>\n\n  </div>\n  <div *ngIf="isLoading" class="iso-loading">\n    Loading...\n  </div>\n</div>'),n.qZA()(),n.TgZ(42,"mat-tab",9)(43,"pre",11),n._uU(44,"import {\n  ChangeDetectorRef, Component, ViewEncapsulation\n} from '@angular/core';\n\nexport interface Element {\n  name: string;\n  surname: string;\n  email: string;\n  phone: string;\n}\n\nconst CN_CNT = 5;\nconst CN_NAME1 = ['James', 'Mary', 'Robert', 'Patricia', 'John', \n  'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David'];\nconst CN_NAME2 = ['Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', \n  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy'];\nconst CN_NAME3 = ['Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony',\n  'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley'];\nconst CN_SURNAME1 = ['Smith', 'Johnson', 'Williams', 'Brown',\n  'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];\nconst CN_SURNAME2 = ['Hernandez', 'Lopez', 'Gonzales', 'Wilson', \n  'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];\nconst CN_SURNAME3 = ['Perez', 'Thompson', 'White', 'Harris',\n  'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'];\n\n@Component({\n  selector: 'app-infinite-scroll',\n  templateUrl: './infinite-scroll.component.html',\n  styleUrls: ['./infinite-scroll.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class InfiniteScrollComponent {\n  public elements2: Element[] = [];\n  public isLoading = false;\n\n  private names: string[]\n    = [...CN_NAME1, ...CN_NAME2, ...CN_NAME3];\n  private surnames: string[]\n    = [...CN_SURNAME1, ...CN_SURNAME2, ...CN_SURNAME3];\n\n  constructor(private changeDetectorRef: ChangeDetectorRef) {\n    this.elements2 = this.createElementList(CN_CNT);\n  }\n\n  // ** Public API **\n\n  public trackByElement(index: number, item: Element): string {\n    return item?.name + item?.surname;\n  }\n\n  public doScroll(): void {\n    this.isLoading = true;\n    setTimeout(() => {\n      this.elements2.push(...this.createElementList(CN_CNT));\n      this.isLoading = false;\n      this.changeDetectorRef.markForCheck();\n    }, 1000);\n  }\n\n  // ** Private API **\n\n  private randomNumber(value: number): number {\n    return Math.floor(Math.random() * value + 1);\n  }\n\n  private createPhone(): string {\n    const part1 = ('000' + this.randomNumber(1000)).slice(-3);\n    const part2 = ('000' + this.randomNumber(1000)).slice(-3);\n    const part3 = ('000' + this.randomNumber(100)).slice(-2);\n    const part4 = ('000' + this.randomNumber(100)).slice(-2);\n    return part1 + '-' + part2 + '-' + part3 + '-' + part4;\n  }\n\n  private createElement(): Element {\n    const cntN = this.names.length;\n    const name = this.names[Math.floor(Math.random() * cntN)];\n    const cntS = this.surnames.length;\n    const surname = this.surnames[Math.floor(Math.random() * cntS)];\n    const email = name + '.' + surname + '@gmail.com';\n    const phone = this.createPhone();\n    return { name, surname, email, phone };\n  }\n\n  private createElementList(cnt: number): Element[] {\n    const result: Element[] = [];\n    while (result.length < cnt) {\n      result.push(this.createElement());\n    }\n    return result;\n  }\n}"),n.qZA()(),n.TgZ(45,"mat-tab",9)(46,"pre",12),n._uU(47,"app-infinite-scroll {\n  .iso-block {\n    position: relative;\n  }\n  .iso-item-wrap {\n    outline: 1px solid blue;\n    height: 400px;\n    overflow-y: scroll;\n  }\n  .iso-items {\n    outline: 1px dashed green;\n    padding: 15px 0;\n  }\n  .iso-row {\n    display: flex;\n    padding: 3px 10px;\n  }\n  .iso-label {\n    flex-basis: 120px;\n  }\n  .iso-value {\n    flex-grow: 1;\n  }\n  .iso-loading {\n    color: blue;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background-color: rgb(253 255 255 / 70%);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n}"),n.qZA()()()()()()),2&t&&(n.xp6(3),n.Q6J("href",i.urlCmInfiniteScroll+"#Optional",n.LSH),n.xp6(9),n.Q6J("ngForOf",i.elements2)("ngForTrackBy",i.trackByElement),n.xp6(1),n.Q6J("ngIf",i.isLoading),n.xp6(6),n.Oqu(i.labelShowSource),n.xp6(2),n.Q6J("label",i.labelHtml),n.xp6(21),n.Q6J("label",i.labelTs),n.xp6(3),n.Q6J("label",i.labelCss))},dependencies:[r.sg,r.O5,l.pp,l.ib,l.yz,l.yK,p.SP,p.uX,h.S9],styles:["app-cm-infinite-scroll-optional{display:block}app-cm-infinite-scroll-optional .iso-block{position:relative}app-cm-infinite-scroll-optional .iso-item-wrap{outline:1px solid blue;height:400px;overflow-y:scroll}app-cm-infinite-scroll-optional .iso-items{outline:1px dashed green;padding:15px 0}app-cm-infinite-scroll-optional .iso-row{display:flex;padding:3px 10px}app-cm-infinite-scroll-optional .iso-label{flex-basis:120px}app-cm-infinite-scroll-optional .iso-value{flex-grow:1}app-cm-infinite-scroll-optional .iso-loading{color:#00f;position:absolute;top:0;right:0;bottom:0;left:0;background-color:#fdffffb3;display:flex;justify-content:center;align-items:center}\n"],encapsulation:2,changeDetection:0}),e})(),Q=(()=>{class e{constructor(){this.urlCmInfiniteScroll="/"+u.g.get("URL_COMPONENTS")+"/"+u.g.get("URL_COMPONENTS_INFINITE_SCROLL")}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-cm-infinite-scroll-api"]],decls:46,vars:1,consts:[["mr-vr",""],[1,"app-hover-link"],[3,"href"],["fw500",""],[1,"app-tab"],[1,"app-mn-wd-22ch"],["href","https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API","target","_blank"]],template:function(t,i){1&t&&(n.TgZ(0,"section",0)(1,"h3",1),n._uU(2," API: GlnInfiniteScroll. "),n.TgZ(3,"a",2),n._uU(4,"#"),n.qZA()(),n.TgZ(5,"p"),n._uU(6," Selector: "),n.TgZ(7,"span",3),n._uU(8,"gln-infinite-scroll"),n.qZA()(),n.TgZ(9,"p"),n._uU(10," Exported as: "),n.TgZ(11,"span",3),n._uU(12,"glnInfiniteScroll"),n.qZA()()(),n.TgZ(13,"section",0)(14,"h4"),n._uU(15,"Properties"),n.qZA()(),n.TgZ(16,"table",4)(17,"tbody")(18,"tr")(19,"th",5),n._uU(20,"Name"),n.qZA(),n.TgZ(21,"th"),n._uU(22,"Description"),n.qZA()(),n.TgZ(23,"tr")(24,"td")(25,"code"),n._uU(26,"@Input()"),n.qZA(),n.TgZ(27,"code"),n._uU(28,"options: IntersectionObserverInit;"),n.qZA()(),n.TgZ(29,"td")(30,"span"),n._uU(31,"Parameter dictionary for initializing "),n.TgZ(32,"a",6),n._uU(33,"IntersectionObserver"),n.qZA(),n._uU(34,". Optional. "),n._UZ(35,"br"),n._uU(36,"(default = {};) "),n.qZA()()(),n.TgZ(37,"tr")(38,"td")(39,"code"),n._uU(40,"@Output()"),n.qZA(),n.TgZ(41,"code"),n._uU(42,"scrolled: EventEmitter<void>;"),n.qZA()(),n.TgZ(43,"td")(44,"span"),n._uU(45,"When this event occurs, it is required to get a new chunk of data for the list."),n.qZA()()()()()),2&t&&(n.xp6(3),n.Q6J("href",i.urlCmInfiniteScroll+"#Api",n.LSH))},styles:["app-cm-infinite-scroll-api{display:block}\n"],encapsulation:2,changeDetection:0}),e})();function G(e,s){1&e&&(n.TgZ(0,"div",3),n._UZ(1,"app-cm-infinite-scroll-basic")(2,"hr",4),n.qZA())}function Y(e,s){1&e&&(n.TgZ(0,"div",5),n._UZ(1,"app-cm-infinite-scroll-optional")(2,"hr",4),n.qZA())}function j(e,s){1&e&&(n.TgZ(0,"div",6),n._UZ(1,"app-cm-infinite-scroll-api")(2,"hr",4),n.qZA())}const C="ComponentsInfiniteScroll",V=[{path:"",component:(()=>{class e{constructor(t){this.ngZone=t,this.showNum="",console.time(C)}ngAfterViewInit(){Promise.resolve().then(()=>{U.R.scrollByFragmentFromPath()}),this.ngZone.onStable.pipe((0,S.P)()).subscribe(()=>{console.timeEnd(C)})}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(n.R0b))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-cm-infinite-scroll"]],decls:7,vars:3,consts:[["id","Basic",4,"ngIf"],["id","Optional",4,"ngIf"],["id","Api",4,"ngIf"],["id","Basic"],["br-tp",""],["id","Optional"],["id","Api"]],template:function(t,i){1&t&&(n.TgZ(0,"h3"),n._uU(1,'Component: "GlnInfiniteScroll"'),n.qZA(),n.YNc(2,G,3,0,"div",0),n.YNc(3,Y,3,0,"div",1),n.YNc(4,j,3,0,"div",2),n._UZ(5,"br")(6,"br")),2&t&&(n.xp6(2),n.Q6J("ngIf",!i.showNum||"01"===i.showNum),n.xp6(1),n.Q6J("ngIf",!i.showNum||"02"===i.showNum),n.xp6(1),n.Q6J("ngIf",!i.showNum||"03"===i.showNum))},dependencies:[r.O5,J,H,Q],styles:["app-cm-infinite-scroll{display:block}\n"],encapsulation:2,changeDetection:0}),e})()}];let K=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[v.Bz.forChild(V),v.Bz]}),e})(),X=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[r.ez,Z,N,T,K]}),e})()}}]);