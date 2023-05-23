"use strict";(self.webpackChunkgelenium_ui_demo=self.webpackChunkgelenium_ui_demo||[]).push([[232],{1232:(an,u,t)=>{t.r(u),t.d(u,{PlSnackbarModule:()=>nn});var g=t(6895),c=t(7084),p=t(3848),i=t(9544),n=t(1571);let f=(()=>{class a{}return a.\u0275fac=function(r){return new(r||a)},a.\u0275mod=n.oAB({type:a}),a.\u0275inj=n.cJS({imports:[g.ez,c.To,p.Nh,i.Dx]}),a})(),_=(()=>{class a{}return a.\u0275fac=function(r){return new(r||a)},a.\u0275mod=n.oAB({type:a}),a.\u0275inj=n.cJS({imports:[g.ez,c.To,p.Nh,i.Dx]}),a})(),h=(()=>{class a{}return a.\u0275fac=function(r){return new(r||a)},a.\u0275mod=n.oAB({type:a}),a.\u0275inj=n.cJS({imports:[g.ez,c.To,p.Nh,i.Dx]}),a})();var k=t(6001),C=t(590),y=t(4577),b=t(4171),o=t(6986);const T=function(){return{message:"snackbar with type 'default'",msgType:"default",isNoClose:!0}},w=function(){return{message:"snackbar with type 'error'",msgType:"error",isNoClose:!0}},S=function(){return{message:"snackbar with type 'warning'",msgType:"warning",isNoClose:!0}},v=function(){return{message:"snackbar with type 'success'",msgType:"success",isNoClose:!0}},Z=function(){return{message:"snackbar with type 'info'",msgType:"info",isNoClose:!0}},x=function(){return{message:"snackbar - customer",isNoClose:!0}},B=function(){return{message:"snackbar with type 'default'",msgType:"default",isNoClose:!0,isInvert:!0}},M=function(){return{message:"snackbar with type 'error'",msgType:"error",isNoClose:!0,isInvert:!0}},N=function(){return{message:"snackbar with type 'warning'",msgType:"warning",isNoClose:!0,isInvert:!0}},U=function(){return{message:"snackbar with type 'success'",msgType:"success",isNoClose:!0,isInvert:!0}},P=function(){return{message:"snackbar with type 'info'",msgType:"info",isNoClose:!0,isInvert:!0}},A=function(){return{message:"snackbar - customer",isNoClose:!0,isInvert:!0}};let J=(()=>{class a{constructor(r){this.snackbarService=r,this.labelShowSource=o.sx,this.labelHtml=o.zC,this.labelTs=o.QS,this.labelCss=o.Er,this.baseRef=b.g.get("BASE_REF"),this.urlPlSnackbar=this.baseRef+"/"+b.g.get("URL_PALETTE")+"/"+b.g.get("URL_PALETTE_SNACKBAR")}clickMsgType(r,s,e){this.snackbarService.open(r,s,e)}}return a.\u0275fac=function(r){return new(r||a)(n.Y36(i.VB))},a.\u0275cmp=n.Xpm({type:a,selectors:[["app-pl-snackbar-basic"]],inputs:{labelShowSource:"labelShowSource",labelHtml:"labelHtml",labelTs:"labelTs",labelCss:"labelCss"},decls:82,vars:34,consts:[["mr-vr",""],[1,"app-hover-link"],[3,"href"],[1,"snpl1-elem"],[1,"snpl1-box",3,"params","click"],[1,"snpl1-box","snpl1-customer","snpl1-svg-leaf",3,"params","click"],["animationDuration","0ms"],[3,"label"],["source","html"],["source","ts"],["source","css"],["br-nn",""],["mr-vr","","id","invert-colors"],[1,"snpl2-elem"],[1,"snpl2-box",3,"params","click"],[1,"snpl2-box","snpl2-customer","snpl2-svg-leaf",3,"params","click"]],template:function(r,s){1&r&&(n.TgZ(0,"section",0)(1,"h4",1),n._uU(2," Basic. "),n.TgZ(3,"a",2),n._uU(4,"#"),n.qZA()(),n.TgZ(5,"p"),n._uU(6,' For the GlnSnackbar component, you can specify the "msgType" parameter, which takes the following values: "error", "warning", "success", "info". If the "msgType" parameter is not specified, then it takes the "default" value. '),n.qZA()(),n.TgZ(7,"div",3)(8,"p")(9,"gln-snackbar",4),n.NdJ("click",function(){return s.clickMsgType("snackbar with type 'default'","",{data:{msgType:"default"}})}),n.qZA()(),n.TgZ(10,"p")(11,"gln-snackbar",4),n.NdJ("click",function(){return s.clickMsgType("snackbar with type 'error'","",{data:{msgType:"error"}})}),n.qZA()(),n.TgZ(12,"p")(13,"gln-snackbar",4),n.NdJ("click",function(){return s.clickMsgType("snackbar with type 'warning'","",{data:{msgType:"warning"}})}),n.qZA()(),n.TgZ(14,"p")(15,"gln-snackbar",4),n.NdJ("click",function(){return s.clickMsgType("snackbar with type 'success'","",{data:{msgType:"success"}})}),n.qZA()(),n.TgZ(16,"p")(17,"gln-snackbar",4),n.NdJ("click",function(){return s.clickMsgType("snackbar with type 'info'","",{data:{msgType:"info"}})}),n.qZA()(),n.TgZ(18,"p")(19,"gln-snackbar",5),n.NdJ("click",function(){return s.clickMsgType("snackbar - customer","",{wrapperClass:["snpl1-customer","snpl1-svg-leaf"]})}),n.qZA()()(),n.TgZ(20,"section",0)(21,"mat-accordion")(22,"mat-expansion-panel")(23,"mat-expansion-panel-header")(24,"mat-panel-title"),n._uU(25),n.qZA()(),n.TgZ(26,"mat-tab-group",6)(27,"mat-tab",7)(28,"code")(29,"pre",8),n._uU(30,"<div class=\"snpl1-elem\">\n\n  <p>\n    <gln-snackbar class=\"snpl1-box\"\n      [params]=\"{ message: 'snackbar with type \\'default\\''\n        , msgType: 'default', 'isNoClose': true }\"\n      (click)=\"clickMsgType('snackbar with type \\'default\\''\n        , '', { data: { msgType: 'default'}} )\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl1-box\"\n      [params]=\"{ message: 'snackbar with type \\'error\\''\n        , msgType: 'error', 'isNoClose': true }\"\n      (click)=\"clickMsgType('snackbar with type \\'error\\''\n        , '', { data: { msgType: 'error'}})\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl1-box\"\n      [params]=\"{ message: 'snackbar with type \\'warning\\''\n        , msgType: 'warning', 'isNoClose': true }\"\n      (click)=\"clickMsgType('snackbar with type \\'warning\\''\n        , '', { data: { msgType: 'warning'}})\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl1-box\"\n      [params]=\"{ message: 'snackbar with type \\'success\\''\n        , msgType: 'success', 'isNoClose': true }\"\n      (click)=\"clickMsgType('snackbar with type \\'success\\''\n        , '', { data: { msgType: 'success'}})\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl1-box\"\n      [params]=\"{ message: 'snackbar with type \\'info\\''\n        , msgType: 'info', 'isNoClose': true }\"\n      (click)=\"clickMsgType('snackbar with type \\'info\\''\n        , '', { data: { msgType: 'info'}})\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl1-box snpl1-customer snpl1-svg-leaf\"\n      [params]=\"{ message: 'snackbar - customer'\n        , 'isNoClose': true }\"\n      (click)=\"clickMsgType('snackbar - customer'\n        , '', { wrapperClass: ['snpl1-customer', 'snpl1-svg-leaf'] })\">\n    </gln-snackbar>\n  </p>\n\n</div>"),n.qZA()()(),n.TgZ(31,"mat-tab",7)(32,"code")(33,"pre",9),n._uU(34,"import {\n  Component, ViewEncapsulation\n} from '@angular/core';\nimport { GlnSnackbarService } from 'gelenium-ui';\n\n@Component({\n  selector: 'app-snackbar',\n  templateUrl: './snackbar.component.html',\n  styleUrls: ['./snackbar.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class SnackbarComponent {\n\n  constructor(private snackbarService: GlnSnackbarService) {}\n\n  public clickMsgType(\n    message: string, action: string, config: any\n  ): void {\n    this.snackbarService.open(message, action, config);\n  }\n}"),n.qZA()()(),n.TgZ(35,"mat-tab",7)(36,"code")(37,"pre",10),n._uU(38,'app-snackbar {\n  .snpl1-elem {\n    max-width: 40ch;    \n  }\n  .snpl1-box {\n    cursor: pointer;\n  }\n}\n.snpl1-customer {\n  // background color\n  --glncl-default-h: 200;\n  --glncl-default-s: 75%;\n  --glncl-default-l: 50%;\n  // color\n  --glncl-default-bg-h: 240;\n  --glncl-default-bg-s: 100%;\n  --glncl-default-bg-l: 98%;\n}\n.snpl1-svg-leaf .gln-snackbar-wrap-icon {\n  background-image: url("data:image/svg+xml,"\n  + "<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'"\n  + " fill=\'rgb(13 100 5 / 100%)\'>"\n  + "<path d=\'M 32.5,2.5 C 33.1499,2.80393 33.8165,3.13727 34.5,3.5C"\n  + " 36.4996,11.3838 35.3329,18.7172 31,25.5C 25.4363,30.3422 19.10"\n  + "3,31.6755 12,29.5C 10.3804,31.2415 8.88041,33.0748 7.5,35C 6.20"\n  + "677,35.49 4.87344,35.6567 3.5,35.5C 3.33982,33.8008 3.50649,32."\n  + "1341 4,30.5C 9.04294,24.7243 15.2096,20.5576 22.5,18C 25.2239,1"\n  + "6.4779 27.2239,14.3112 28.5,11.5C 27.9984,10.479 27.3317,10.312"\n  + "3 26.5,11C 20.4243,15.7903 13.9243,19.957 7,23.5C 4.66714,14.66"\n  + "74 7.83381,8.50075 16.5,5C 21.9561,4.05529 27.2894,3.22195 32.5"\n  + ",2.5 Z\'/>"\n  + "</svg>");\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: cover;\n  height: 30px;\n  margin-right: 0.5em;\n  width: 30px;\n}\n'),n.qZA()()()()()()(),n._UZ(39,"hr",11),n.TgZ(40,"section",12)(41,"h4",1),n._uU(42," Invert Colors. "),n.TgZ(43,"a",2),n._uU(44,"#"),n.qZA()(),n.TgZ(45,"p"),n._uU(46," It is possible for the GlnSnackbar component to invert colors."),n._UZ(47,"br"),n._uU(48,' This requires the parameter "isInvert": true. '),n.qZA()(),n.TgZ(49,"div",13)(50,"p")(51,"gln-snackbar",14),n.NdJ("click",function(){return s.clickMsgType("snackbar with type 'default'","",{data:{msgType:"default",isInvert:!0}})}),n.qZA()(),n.TgZ(52,"p")(53,"gln-snackbar",14),n.NdJ("click",function(){return s.clickMsgType("snackbar with type 'error'","",{data:{msgType:"error",isInvert:!0}})}),n.qZA()(),n.TgZ(54,"p")(55,"gln-snackbar",14),n.NdJ("click",function(){return s.clickMsgType("snackbar with type 'warning'","",{data:{msgType:"warning",isInvert:!0}})}),n.qZA()(),n.TgZ(56,"p")(57,"gln-snackbar",14),n.NdJ("click",function(){return s.clickMsgType("snackbar with type 'success'","",{data:{msgType:"success",isInvert:!0}})}),n.qZA()(),n.TgZ(58,"p")(59,"gln-snackbar",14),n.NdJ("click",function(){return s.clickMsgType("snackbar with type 'info'","",{data:{msgType:"info",isInvert:!0}})}),n.qZA()(),n.TgZ(60,"p")(61,"gln-snackbar",15),n.NdJ("click",function(){return s.clickMsgType("snackbar - customer","",{wrapperClass:["snpl2-customer","snpl2-svg-leaf"],data:{isInvert:!0}})}),n.qZA()()(),n.TgZ(62,"section",0)(63,"mat-accordion")(64,"mat-expansion-panel")(65,"mat-expansion-panel-header")(66,"mat-panel-title"),n._uU(67),n.qZA()(),n.TgZ(68,"mat-tab-group",6)(69,"mat-tab",7)(70,"code")(71,"pre",8),n._uU(72,"<div class=\"snpl2-elem\">\n  <p>\n    <gln-snackbar class=\"snpl2-box\"\n      [params]=\"{ message: 'snackbar with type \\'default\\''\n        , msgType: 'default', 'isNoClose': true, isInvert: true }\"\n      (click)=\"clickMsgType('snackbar with type \\'default\\''\n        , '', { data: { msgType: 'default', isInvert: true}} )\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl2-box\"\n      [params]=\"{ message: 'snackbar with type \\'error\\''\n        , msgType: 'error', 'isNoClose': true, isInvert: true }\"\n      (click)=\"clickMsgType('snackbar with type \\'error\\''\n        , '', { data: { msgType: 'error', isInvert: true}})\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl2-box\"\n      [params]=\"{ message: 'snackbar with type \\'warning\\''\n        , msgType: 'warning', 'isNoClose': true, isInvert: true }\"\n      (click)=\"clickMsgType('snackbar with type \\'warning\\''\n        , '', { data: { msgType: 'warning', isInvert: true}})\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl2-box\"\n      [params]=\"{ message: 'snackbar with type \\'success\\''\n        , msgType: 'success', 'isNoClose': true, isInvert: true }\"\n      (click)=\"clickMsgType('snackbar with type \\'success\\''\n        , '', { data: { msgType: 'success', isInvert: true}})\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl2-box\"\n      [params]=\"{ message: 'snackbar with type \\'info\\''\n        , msgType: 'info', 'isNoClose': true, isInvert: true }\"\n      (click)=\"clickMsgType('snackbar with type \\'info\\''\n        , '', { data: { msgType: 'info', isInvert: true}})\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl2-box snpl2-customer snpl2-svg-leaf\"\n      [params]=\"{ message: 'snackbar - customer'\n        , 'isNoClose': true, isInvert: true }\"\n      (click)=\"clickMsgType('snackbar - customer', '',\n        { wrapperClass: ['snpl2-customer', 'snpl2-svg-leaf']\n        , data: { isInvert: true }})\">\n    </gln-snackbar>\n  </p>\n</div>"),n.qZA()()(),n.TgZ(73,"mat-tab",7)(74,"code")(75,"pre",9),n._uU(76,"import {\n  Component, ViewEncapsulation\n} from '@angular/core';\nimport { GlnSnackbarService } from 'gelenium-ui';\n\n@Component({\n  selector: 'app-snackbar',\n  templateUrl: './snackbar.component.html',\n  styleUrls: ['./snackbar.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class SnackbarComponent {\n\n  constructor(private snackbarService: GlnSnackbarService) {}\n\n  public clickMsgType(\n    message: string, action: string, config: any\n  ): void {\n    this.snackbarService.open(message, action, config);\n  }\n}"),n.qZA()()(),n.TgZ(77,"mat-tab",7)(78,"code")(79,"pre",10),n._uU(80,'app-snackbar {\n  .snpl2-elem {\n    max-width: 40ch;    \n  }\n  .snpl2-box {\n    cursor: pointer;\n  }\n}\n.snpl2-customer {\n  // background color\n  --glncl-default-h: 200;\n  --glncl-default-s: 75%;\n  --glncl-default-l: 50%;\n  // color\n  --glncl-default-bg-h: 240;\n  --glncl-default-bg-s: 100%;\n  --glncl-default-bg-l: 98%;\n}\n.snpl2-svg-leaf .gln-snackbar-wrap-icon {\n  background-image: url("data:image/svg+xml,"\n  + "<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'"\n  + " fill=\'rgb(13 100 5 / 100%)\'>"\n  + "<path d=\'M 32.5,2.5 C 33.1499,2.80393 33.8165,3.13727 34.5,3.5C"\n  + " 36.4996,11.3838 35.3329,18.7172 31,25.5C 25.4363,30.3422 19.10"\n  + "3,31.6755 12,29.5C 10.3804,31.2415 8.88041,33.0748 7.5,35C 6.20"\n  + "677,35.49 4.87344,35.6567 3.5,35.5C 3.33982,33.8008 3.50649,32."\n  + "1341 4,30.5C 9.04294,24.7243 15.2096,20.5576 22.5,18C 25.2239,1"\n  + "6.4779 27.2239,14.3112 28.5,11.5C 27.9984,10.479 27.3317,10.312"\n  + "3 26.5,11C 20.4243,15.7903 13.9243,19.957 7,23.5C 4.66714,14.66"\n  + "74 7.83381,8.50075 16.5,5C 21.9561,4.05529 27.2894,3.22195 32.5"\n  + ",2.5 Z\'/>"\n  + "</svg>");\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: cover;\n  height: 30px;\n  margin-right: 0.5em;\n  width: 30px;\n}\n'),n.qZA()()()()()()(),n._UZ(81,"hr",11)),2&r&&(n.xp6(3),n.Q6J("href",s.urlPlSnackbar+"#Basic",n.LSH),n.xp6(6),n.Q6J("params",n.DdM(22,T)),n.xp6(2),n.Q6J("params",n.DdM(23,w)),n.xp6(2),n.Q6J("params",n.DdM(24,S)),n.xp6(2),n.Q6J("params",n.DdM(25,v)),n.xp6(2),n.Q6J("params",n.DdM(26,Z)),n.xp6(2),n.Q6J("params",n.DdM(27,x)),n.xp6(6),n.Oqu(s.labelShowSource),n.xp6(2),n.Q6J("label",s.labelHtml),n.xp6(4),n.Q6J("label",s.labelTs),n.xp6(4),n.Q6J("label",s.labelCss),n.xp6(8),n.Q6J("href",s.urlPlSnackbar+"#invert-colors",n.LSH),n.xp6(8),n.Q6J("params",n.DdM(28,B)),n.xp6(2),n.Q6J("params",n.DdM(29,M)),n.xp6(2),n.Q6J("params",n.DdM(30,N)),n.xp6(2),n.Q6J("params",n.DdM(31,U)),n.xp6(2),n.Q6J("params",n.DdM(32,P)),n.xp6(2),n.Q6J("params",n.DdM(33,A)),n.xp6(6),n.Oqu(s.labelShowSource),n.xp6(2),n.Q6J("label",s.labelHtml),n.xp6(4),n.Q6J("label",s.labelTs),n.xp6(4),n.Q6J("label",s.labelCss))},dependencies:[c.pp,c.ib,c.yz,c.yK,p.SP,p.uX,i.k6],styles:["app-pl-snackbar-basic{display:block}app-pl-snackbar-basic .snpl1-elem{max-width:40ch}app-pl-snackbar-basic .snpl1-box{cursor:pointer}app-pl-snackbar-basic .snpl2-elem{max-width:40ch}app-pl-snackbar-basic .snpl2-box{cursor:pointer}.snpl1-customer{--glncl-default-h: 200;--glncl-default-s: 75%;--glncl-default-l: 50%;--glncl-default-bg-h: 240;--glncl-default-bg-s: 100%;--glncl-default-bg-l: 98%}.snpl1-svg-leaf .gln-snackbar-wrap-icon{background-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='rgb(13 100 5 / 100%)'><path d='M 32.5,2.5 C 33.1499,2.80393 33.8165,3.13727 34.5,3.5C 36.4996,11.3838 35.3329,18.7172 31,25.5C 25.4363,30.3422 19.103,31.6755 12,29.5C 10.3804,31.2415 8.88041,33.0748 7.5,35C 6.20677,35.49 4.87344,35.6567 3.5,35.5C 3.33982,33.8008 3.50649,32.1341 4,30.5C 9.04294,24.7243 15.2096,20.5576 22.5,18C 25.2239,16.4779 27.2239,14.3112 28.5,11.5C 27.9984,10.479 27.3317,10.3123 26.5,11C 20.4243,15.7903 13.9243,19.957 7,23.5C 4.66714,14.6674 7.83381,8.50075 16.5,5C 21.9561,4.05529 27.2894,3.22195 32.5,2.5 Z'/></svg>\");background-repeat:no-repeat;background-position:center center;background-size:cover;height:30px;margin-right:.5em;width:30px}.snpl2-customer{--glncl-default-h: 200;--glncl-default-s: 75%;--glncl-default-l: 50%;--glncl-default-bg-h: 240;--glncl-default-bg-s: 100%;--glncl-default-bg-l: 98%}.snpl2-svg-leaf .gln-snackbar-wrap-icon{background-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='rgb(13 100 5 / 100%)'><path d='M 32.5,2.5 C 33.1499,2.80393 33.8165,3.13727 34.5,3.5C 36.4996,11.3838 35.3329,18.7172 31,25.5C 25.4363,30.3422 19.103,31.6755 12,29.5C 10.3804,31.2415 8.88041,33.0748 7.5,35C 6.20677,35.49 4.87344,35.6567 3.5,35.5C 3.33982,33.8008 3.50649,32.1341 4,30.5C 9.04294,24.7243 15.2096,20.5576 22.5,18C 25.2239,16.4779 27.2239,14.3112 28.5,11.5C 27.9984,10.479 27.3317,10.3123 26.5,11C 20.4243,15.7903 13.9243,19.957 7,23.5C 4.66714,14.6674 7.83381,8.50075 16.5,5C 21.9561,4.05529 27.2894,3.22195 32.5,2.5 Z'/></svg>\");background-repeat:no-repeat;background-position:center center;background-size:cover;height:30px;margin-right:.5em;width:30px}\n"],encapsulation:2,changeDetection:0}),a})();const I=function(){return{message:"snackbar Bootstrap 'standard'",isNoClose:!0}},q=function(){return{message:"snackbar Bootstrap 'primary'",isNoClose:!0}},Q=function(){return{message:"snackbar Bootstrap 'secondary'",isNoClose:!0}},D=function(){return{message:"snackbar Bootstrap 'success'",isNoClose:!0}},E=function(){return{message:"snackbar Bootstrap 'danger'",isNoClose:!0}},z=function(){return{message:"snackbar Bootstrap 'warning'",isNoClose:!0}},R=function(){return{message:"snackbar Bootstrap 'info'",isNoClose:!0}};let L=(()=>{class a{constructor(r){this.snackbarService=r,this.labelShowSource=o.sx,this.labelHtml=o.zC,this.labelTs=o.QS,this.labelCss=o.Er,this.baseRef=b.g.get("BASE_REF"),this.urlPlSnackbar=this.baseRef+"/"+b.g.get("URL_PALETTE")+"/"+b.g.get("URL_PALETTE_SNACKBAR")}clickBootstrap(r,s,e){this.snackbarService.open(r,s,{overlayClasses:"snpl2-bs-overlay",horizontal:"right",transition:"fade",vertical:"top",...e})}}return a.\u0275fac=function(r){return new(r||a)(n.Y36(i.VB))},a.\u0275cmp=n.Xpm({type:a,selectors:[["app-pl-snackbar-bootstrap"]],inputs:{labelShowSource:"labelShowSource",labelHtml:"labelHtml",labelTs:"labelTs",labelCss:"labelCss"},decls:42,vars:19,consts:[["mr-vr",""],[1,"app-hover-link"],[3,"href"],[1,"snpl2-elem"],[1,"snpl2-bs-snackbar","snpl2-bs-standard",3,"params","click"],[1,"snpl2-bs-snackbar","snpl2-bs-primary",3,"params","click"],[1,"snpl2-bs-snackbar","snpl2-bs-secondary",3,"params","click"],[1,"snpl2-bs-snackbar","snpl2-bs-success",3,"params","click"],[1,"snpl2-bs-snackbar","snpl2-bs-danger",3,"params","click"],[1,"snpl2-bs-snackbar","snpl2-bs-warning",3,"params","click"],[1,"snpl2-bs-snackbar","snpl2-bs-info",3,"params","click"],["animationDuration","0ms"],[3,"label"],["source","html"],["source","ts"],["source","css"],["br-nn",""]],template:function(r,s){1&r&&(n.TgZ(0,"section",0)(1,"h4",1),n._uU(2," Like a Bootstrap. "),n.TgZ(3,"a",2),n._uU(4,"#"),n.qZA()(),n.TgZ(5,"p"),n._uU(6,' It is possible to display GlnSnackbar in style as "Bootstrap". '),n.qZA()(),n.TgZ(7,"div",3)(8,"p")(9,"gln-snackbar",4),n.NdJ("click",function(){return s.clickBootstrap("snackbar Bootstrap 'standard'","",{wrapperClass:["snpl2-bs-snackbar","snpl2-bs-standard"]})}),n.qZA()(),n.TgZ(10,"p")(11,"gln-snackbar",5),n.NdJ("click",function(){return s.clickBootstrap("snackbar Bootstrap 'primary'","",{wrapperClass:["snpl2-bs-snackbar","snpl2-bs-primary"]})}),n.qZA()(),n.TgZ(12,"p")(13,"gln-snackbar",6),n.NdJ("click",function(){return s.clickBootstrap("snackbar Bootstrap 'secondary'","",{wrapperClass:["snpl2-bs-snackbar","snpl2-bs-secondary"]})}),n.qZA()(),n.TgZ(14,"p")(15,"gln-snackbar",7),n.NdJ("click",function(){return s.clickBootstrap("snackbar Bootstrap 'success'","",{wrapperClass:["snpl2-bs-snackbar","snpl2-bs-success"]})}),n.qZA()(),n.TgZ(16,"p")(17,"gln-snackbar",8),n.NdJ("click",function(){return s.clickBootstrap("snackbar Bootstrap 'danger'","",{wrapperClass:["snpl2-bs-snackbar","snpl2-bs-danger"]})}),n.qZA()(),n.TgZ(18,"p")(19,"gln-snackbar",9),n.NdJ("click",function(){return s.clickBootstrap("snackbar Bootstrap 'warning'","",{wrapperClass:["snpl2-bs-snackbar","snpl2-bs-warning"]})}),n.qZA()(),n.TgZ(20,"p")(21,"gln-snackbar",10),n.NdJ("click",function(){return s.clickBootstrap("snackbar Bootstrap 'info'","",{wrapperClass:["snpl2-bs-snackbar","snpl2-bs-info"]})}),n.qZA()()(),n.TgZ(22,"section",0)(23,"mat-accordion")(24,"mat-expansion-panel")(25,"mat-expansion-panel-header")(26,"mat-panel-title"),n._uU(27),n.qZA()(),n.TgZ(28,"mat-tab-group",11)(29,"mat-tab",12)(30,"code")(31,"pre",13),n._uU(32,"<div class=\"snpl2-elem\">\n  <p>\n    <gln-snackbar class=\"snpl2-bs-snackbar snpl2-bs-standard\"\n      [params]=\"{ message: 'snackbar Bootstrap \\'standard\\''\n        , 'isNoClose': true }\"\n      (click)=\"clickBootstrap('snackbar Bootstrap \\'standard\\'', '',\n        { wrapperClass: ['snpl2-bs-snackbar', 'snpl2-bs-standard'] })\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl2-bs-snackbar snpl2-bs-primary\"\n      [params]=\"{ message: 'snackbar Bootstrap \\'primary\\''\n        , 'isNoClose': true }\"\n      (click)=\"clickBootstrap('snackbar Bootstrap \\'primary\\'', '',\n        { wrapperClass: ['snpl2-bs-snackbar', 'snpl2-bs-primary'] })\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl2-bs-snackbar snpl2-bs-secondary\"\n      [params]=\"{ message: 'snackbar Bootstrap \\'secondary\\''\n        , 'isNoClose': true }\"\n      (click)=\"clickBootstrap('snackbar Bootstrap \\'secondary\\'', '',\n        { wrapperClass: ['snpl2-bs-snackbar', 'snpl2-bs-secondary'] })\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl2-bs-snackbar snpl2-bs-success\"\n      [params]=\"{ message: 'snackbar Bootstrap \\'success\\''\n        , 'isNoClose': true }\"\n      (click)=\"clickBootstrap('snackbar Bootstrap \\'success\\'', '',\n        { wrapperClass: ['snpl2-bs-snackbar', 'snpl2-bs-success'] })\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl2-bs-snackbar snpl2-bs-danger\"\n      [params]=\"{ message: 'snackbar Bootstrap \\'danger\\''\n        , 'isNoClose': true }\"\n      (click)=\"clickBootstrap('snackbar Bootstrap \\'danger\\'', '',\n        { wrapperClass: ['snpl2-bs-snackbar', 'snpl2-bs-danger'] })\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl2-bs-snackbar snpl2-bs-warning\"\n      [params]=\"{ message: 'snackbar Bootstrap \\'warning\\''\n        , 'isNoClose': true }\"\n      (click)=\"clickBootstrap('snackbar Bootstrap \\'warning\\'', '',\n        { wrapperClass: ['snpl2-bs-snackbar', 'snpl2-bs-warning'] })\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl2-bs-snackbar snpl2-bs-info\"\n      [params]=\"{ message: 'snackbar Bootstrap \\'info\\''\n        , 'isNoClose': true }\"\n      (click)=\"clickBootstrap('snackbar Bootstrap \\'info\\'', '',\n        { wrapperClass: ['snpl2-bs-snackbar', 'snpl2-bs-info'] })\">\n    </gln-snackbar>\n  </p>\n</div>"),n.qZA()()(),n.TgZ(33,"mat-tab",12)(34,"code")(35,"pre",14),n._uU(36,"import {\n  Component, ViewEncapsulation\n} from '@angular/core';\nimport { GlnSnackbarService } from 'gelenium-ui';\n\n@Component({\n  selector: 'app-snackbar',\n  templateUrl: './snackbar.component.html',\n  styleUrls: ['./snackbar.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class SnackbarComponent {\n\n  constructor(private snackbarService: GlnSnackbarService) {}\n\n  public clickBootstrap(\n    message: string, action: string, config: any\n  ): void {\n    const configBS = {\n      overlayClasses: 'snpl2-bs-overlay',\n      horizontal: 'right',\n      transition: 'fade',\n      vertical: 'top',\n    };\n    this.snackbarService.open(message, action, { ...configBS, ...config });\n  }\n}"),n.qZA()()(),n.TgZ(37,"mat-tab",12)(38,"code")(39,"pre",15),n._uU(40,"app-snackbar {\n  .snpl2-elem {\n    max-width: 40ch;\n  }\n}\n\ngln-snackbar.snpl2-bs-snackbar {\n  cursor: pointer;\n}\n.snpl2-bs-overlay {\n  --glnsbc-mr-mini: 0.75rem;\n  --glnsbc-mr: 1.5rem;\n  z-index: 1090;\n}\n.snpl2-bs-snackbar {\n  --glnsb-brd-wd: 1px;\n  --glnsb-brd-cl: rgba(0, 0, 0, 0.175);\n  --glnsb-brd-rds: 0.375rem;\n  --glnsb-bx-shd: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  --glnsb-mn-hg: 45px;\n  --glnsb-mn-wd: 350px;\n  --glnsb-font-size: 0.875rem;\n  font-weight: 400;\n}\n.snpl2-bs-standard {\n  --glnsb-bg-color: #ffffffd9;\n  --glnsb-color: #212529;\n}\n.snpl2-bs-primary {\n  --glnsb-bg-color: #0d6efd;\n  --glnsb-color: #fafafa;\n}\n.snpl2-bs-secondary {\n  --glnsb-bg-color: #5c636a;\n  --glnsb-color: #fafafa;\n}\n.snpl2-bs-success {\n  --glnsb-bg-color: #198754;\n  --glnsb-color: #fafafa;\n}\n.snpl2-bs-danger {\n  --glnsb-bg-color: #dc3545;\n  --glnsb-color: #fafafa;\n}\n.snpl2-bs-warning {\n  --glnsb-bg-color: #ffc107;\n  --glnsb-color: #000;\n}\n.snpl2-bs-info {\n  --glnsb-bg-color: #0dcaf0;\n  --glnsb-color: #000;\n}\n"),n.qZA()()()()()()(),n._UZ(41,"hr",16)),2&r&&(n.xp6(3),n.Q6J("href",s.urlPlSnackbar+"#Bootstrap",n.LSH),n.xp6(6),n.Q6J("params",n.DdM(12,I)),n.xp6(2),n.Q6J("params",n.DdM(13,q)),n.xp6(2),n.Q6J("params",n.DdM(14,Q)),n.xp6(2),n.Q6J("params",n.DdM(15,D)),n.xp6(2),n.Q6J("params",n.DdM(16,E)),n.xp6(2),n.Q6J("params",n.DdM(17,z)),n.xp6(2),n.Q6J("params",n.DdM(18,R)),n.xp6(6),n.Oqu(s.labelShowSource),n.xp6(2),n.Q6J("label",s.labelHtml),n.xp6(4),n.Q6J("label",s.labelTs),n.xp6(4),n.Q6J("label",s.labelCss))},dependencies:[c.pp,c.ib,c.yz,c.yK,p.SP,p.uX,i.k6],styles:["app-pl-snackbar-bootstrap{display:block}app-pl-snackbar-bootstrap .snpl2-elem{max-width:40ch}gln-snackbar.snpl2-bs-snackbar{cursor:pointer}.snpl2-bs-overlay{--glnsbc-mr-mini: .75rem;--glnsbc-mr: 1.5rem;z-index:1090}.snpl2-bs-snackbar{--glnsb-brd-wd: 1px;--glnsb-brd-cl: rgba(0, 0, 0, .175);--glnsb-brd-rds: .375rem;--glnsb-bx-shd: 0 .5rem 1rem rgba(0, 0, 0, .15);--glnsb-mn-hg: 45px;--glnsb-mn-wd: 350px;--glnsb-font-size: .875rem;font-weight:400}.snpl2-bs-standard{--glnsb-bg-color: #ffffffd9;--glnsb-color: #212529}.snpl2-bs-primary{--glnsb-bg-color: #0d6efd;--glnsb-color: #fafafa}.snpl2-bs-secondary{--glnsb-bg-color: #5c636a;--glnsb-color: #fafafa}.snpl2-bs-success{--glnsb-bg-color: #198754;--glnsb-color: #fafafa}.snpl2-bs-danger{--glnsb-bg-color: #dc3545;--glnsb-color: #fafafa}.snpl2-bs-warning{--glnsb-bg-color: #ffc107;--glnsb-color: #000}.snpl2-bs-info{--glnsb-bg-color: #0dcaf0;--glnsb-color: #000}\n"],encapsulation:2,changeDetection:0}),a})();const H=function(){return{message:"snackbar material-ui 'default'",isNoClose:!0}},F=function(){return{message:"snackbar material-ui 'error'",msgType:"error",isNoClose:!0}},G=function(){return{message:"snackbar material-ui 'warning'",msgType:"warning",isNoClose:!0}},V=function(){return{message:"snackbar material-ui 'info'",msgType:"info",isNoClose:!0}},X=function(){return{message:"snackbar material-ui 'success'",msgType:"success",isNoClose:!0}};let Y=(()=>{class a{constructor(r){this.snackbarService=r,this.labelShowSource=o.sx,this.labelHtml=o.zC,this.labelTs=o.QS,this.labelCss=o.Er,this.baseRef=b.g.get("BASE_REF"),this.urlPlSnackbar=this.baseRef+"/"+b.g.get("URL_PALETTE")+"/"+b.g.get("URL_PALETTE_SNACKBAR")}clickMUI(r,s,e){this.snackbarService.open(r,s,{overlayClasses:"snpl3-mui-overlay",horizontal:"center",transition:"grow",vertical:"bottom",...e})}}return a.\u0275fac=function(r){return new(r||a)(n.Y36(i.VB))},a.\u0275cmp=n.Xpm({type:a,selectors:[["app-pl-snackbar-material-ui"]],inputs:{labelShowSource:"labelShowSource",labelHtml:"labelHtml",labelTs:"labelTs",labelCss:"labelCss"},decls:38,vars:15,consts:[["mr-vr",""],[1,"app-hover-link"],[3,"href"],[1,"snpl3-elem"],[1,"snpl3-mui-snackbar","snpl3-mui-default",3,"params","click"],[1,"snpl3-mui-snackbar","snpl3-mui-error",3,"params","click"],[1,"snpl3-mui-snackbar","snpl3-mui-warning",3,"params","click"],[1,"snpl3-mui-snackbar","snpl3-mui-info",3,"params","click"],[1,"snpl3-mui-snackbar","snpl3-mui-success",3,"params","click"],["animationDuration","0ms"],[3,"label"],["source","html"],["source","ts"],["source","css"],["br-nn",""]],template:function(r,s){1&r&&(n.TgZ(0,"section",0)(1,"h4",1),n._uU(2," Like a Material-UI. "),n.TgZ(3,"a",2),n._uU(4,"#"),n.qZA()(),n.TgZ(5,"p"),n._uU(6,' It is possible to display GlnSnackbar in style as "Material-UI". '),n.qZA()(),n.TgZ(7,"div",3)(8,"p")(9,"gln-snackbar",4),n.NdJ("click",function(){return s.clickMUI("snackbar material-ui 'default'","",{wrapperClass:["snpl3-mui-snackbar","snpl3-mui-default"]})}),n.qZA()(),n.TgZ(10,"p")(11,"gln-snackbar",5),n.NdJ("click",function(){return s.clickMUI("snackbar material-ui 'error'","",{data:{msgType:"error"},wrapperClass:["snpl3-mui-snackbar","snpl3-mui-error"]})}),n.qZA()(),n.TgZ(12,"p")(13,"gln-snackbar",6),n.NdJ("click",function(){return s.clickMUI("snackbar material-ui 'warning'","",{data:{msgType:"warning"},wrapperClass:["snpl3-mui-snackbar","snpl3-mui-warning"]})}),n.qZA()(),n.TgZ(14,"p")(15,"gln-snackbar",7),n.NdJ("click",function(){return s.clickMUI("snackbar material-ui 'info'","",{data:{msgType:"info"},wrapperClass:["snpl3-mui-snackbar","snpl3-mui-info"]})}),n.qZA()(),n.TgZ(16,"p")(17,"gln-snackbar",8),n.NdJ("click",function(){return s.clickMUI("snackbar material-ui 'success'","",{data:{msgType:"success"},wrapperClass:["snpl3-mui-snackbar","snpl3-mui-success"]})}),n.qZA()()(),n.TgZ(18,"section",0)(19,"mat-accordion")(20,"mat-expansion-panel")(21,"mat-expansion-panel-header")(22,"mat-panel-title"),n._uU(23),n.qZA()(),n.TgZ(24,"mat-tab-group",9)(25,"mat-tab",10)(26,"code")(27,"pre",11),n._uU(28,"<div class=\"snpl3-elem\">\n  <p>\n    <gln-snackbar class=\"snpl3-mui-snackbar snpl3-mui-default\"\n      [params]=\"{ message: 'snackbar material-ui \\'default\\''\n        , 'isNoClose': true }\"\n      (click)=\"clickMUI('snackbar material-ui \\'default\\'', '',\n        { wrapperClass: ['snpl3-mui-snackbar', 'snpl3-mui-default'] })\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl3-mui-snackbar snpl3-mui-error\"\n      [params]=\"{ message: 'snackbar material-ui \\'error\\''\n        , msgType: 'error', 'isNoClose': true }\"\n      (click)=\"clickMUI('snackbar material-ui \\'error\\'', '',\n        { data: { msgType: 'error'},\n          wrapperClass: ['snpl3-mui-snackbar', 'snpl3-mui-error'] })\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl3-mui-snackbar snpl3-mui-warning\"\n      [params]=\"{ message: 'snackbar material-ui \\'warning\\''\n        , msgType: 'warning', 'isNoClose': true }\"\n      (click)=\"clickMUI('snackbar material-ui \\'warning\\'', '',\n        { data: { msgType: 'warning'},\n          wrapperClass: ['snpl3-mui-snackbar', 'snpl3-mui-warning'] })\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl3-mui-snackbar snpl3-mui-info\"\n      [params]=\"{ message: 'snackbar material-ui \\'info\\''\n        , msgType: 'info', 'isNoClose': true }\"\n      (click)=\"clickMUI('snackbar material-ui \\'info\\'', '',\n        { data: { msgType: 'info'},\n          wrapperClass: ['snpl3-mui-snackbar', 'snpl3-mui-info'] })\">\n    </gln-snackbar>\n  </p>\n  <p>\n    <gln-snackbar class=\"snpl3-mui-snackbar snpl3-mui-success\"\n      [params]=\"{ message: 'snackbar material-ui \\'success\\''\n        , msgType: 'success', 'isNoClose': true }\"\n      (click)=\"clickMUI('snackbar material-ui \\'success\\'', '',\n        { data: { msgType: 'success'},\n          wrapperClass: ['snpl3-mui-snackbar', 'snpl3-mui-success'] })\">\n    </gln-snackbar>\n  </p>\n</div>"),n.qZA()()(),n.TgZ(29,"mat-tab",10)(30,"code")(31,"pre",12),n._uU(32,"import {\n  Component, ViewEncapsulation\n} from '@angular/core';\nimport { GlnSnackbarService } from 'gelenium-ui';\n\n@Component({\n  selector: 'app-snackbar',\n  templateUrl: './snackbar.component.html',\n  styleUrls: ['./snackbar.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class SnackbarComponent {\n\n  constructor(private snackbarService: GlnSnackbarService) {}\n\n  public clickMUI(\n    message: string, action: string, config: any\n  ): void {\n    const configMUI = {\n      overlayClasses: 'snpl3-mui-overlay',\n      horizontal: 'center',\n      transition: 'grow',\n      vertical: 'bottom',\n    };\n    this.snackbarService.open(message, action, { ...configMUI, ...config });\n  }\n}"),n.qZA()()(),n.TgZ(33,"mat-tab",10)(34,"code")(35,"pre",13),n._uU(36,"app-snackbar {\n  .snpl3-elem {\n    max-width: 40ch;\n  }\n}\n\ngln-snackbar.snpl3-mui-snackbar {\n  cursor: pointer;\n}\n.snpl3-mui-overlay {\n  --glnsbc-mr-mini: 0.75rem;\n  --glnsbc-mr: 1.5rem;\n  z-index: 1400;\n}\n.snpl3-mui-snackbar {\n  --glnsb-mn-hg: 48px;\n  --glnsb-mn-wd: 288px;\n  --glnsb-brd-rds: 4px;\n  --glnsb-bx-shd: 0px 3px 5px -1px rgba(0,0,0,0.2)\n    , 0px 6px 10px 0px rgba(0,0,0,0.14)\n    , 0px 1px 18px 0px rgba(0,0,0,0.12);\n  --glnsb-font-size: 0.875rem;\n}\n.snpl3-mui-default {\n  --glnsb-bg-color: rgb(50, 50, 50);\n  --glnsb-color: #fff;\n}\n.snpl3-mui-error {\n  --glnsb-bg-color: #d32f2f;\n  --glnsb-color: #fff;\n}\n.snpl3-mui-warning {\n  --glnsb-bg-color: #ed6c02;\n  --glnsb-color: #fff;\n}\n.snpl3-mui-info {\n  --glnsb-bg-color: #0288d1;\n  --glnsb-color: #fff;\n}\n.snpl3-mui-success {\n  --glnsb-bg-color: #2e7d32;\n  --glnsb-color: #fff;\n}\n"),n.qZA()()()()()()(),n._UZ(37,"hr",14)),2&r&&(n.xp6(3),n.Q6J("href",s.urlPlSnackbar+"#MaterialUI",n.LSH),n.xp6(6),n.Q6J("params",n.DdM(10,H)),n.xp6(2),n.Q6J("params",n.DdM(11,F)),n.xp6(2),n.Q6J("params",n.DdM(12,G)),n.xp6(2),n.Q6J("params",n.DdM(13,V)),n.xp6(2),n.Q6J("params",n.DdM(14,X)),n.xp6(6),n.Oqu(s.labelShowSource),n.xp6(2),n.Q6J("label",s.labelHtml),n.xp6(4),n.Q6J("label",s.labelTs),n.xp6(4),n.Q6J("label",s.labelCss))},dependencies:[c.pp,c.ib,c.yz,c.yK,p.SP,p.uX,i.k6],styles:["app-pl-snackbar-material-ui{display:block}app-pl-snackbar-material-ui .snpl3-elem{max-width:40ch}gln-snackbar.snpl3-mui-snackbar{cursor:pointer}.snpl3-mui-overlay{--glnsbc-mr-mini: .75rem;--glnsbc-mr: 1.5rem;z-index:1400}.snpl3-mui-snackbar{--glnsb-mn-hg: 48px;--glnsb-mn-wd: 288px;--glnsb-brd-rds: 4px;--glnsb-bx-shd: 0px 3px 5px -1px rgba(0,0,0,.2), 0px 6px 10px 0px rgba(0,0,0,.14), 0px 1px 18px 0px rgba(0,0,0,.12);--glnsb-font-size: .875rem}.snpl3-mui-default{--glnsb-bg-color: rgb(50, 50, 50);--glnsb-color: #fff}.snpl3-mui-error{--glnsb-bg-color: #d32f2f;--glnsb-color: #fff}.snpl3-mui-warning{--glnsb-bg-color: #ed6c02;--glnsb-color: #fff}.snpl3-mui-info{--glnsb-bg-color: #0288d1;--glnsb-color: #fff}.snpl3-mui-success{--glnsb-bg-color: #2e7d32;--glnsb-color: #fff}\n"],encapsulation:2,changeDetection:0}),a})();function K(a,l){1&a&&(n.TgZ(0,"div",3),n._UZ(1,"app-pl-snackbar-basic")(2,"hr",4),n.qZA())}function j(a,l){1&a&&(n.TgZ(0,"div",5),n._UZ(1,"app-pl-snackbar-bootstrap")(2,"hr",4),n.qZA())}function O(a,l){1&a&&(n.TgZ(0,"div",6),n._UZ(1,"app-pl-snackbar-material-ui")(2,"hr",4),n.qZA())}const d="PaletteSnackbar",W=[{path:"",component:(()=>{class a{constructor(r){this.ngZone=r,this.showNum="",console.time(d)}ngAfterViewInit(){Promise.resolve().then(()=>{y.R.scrollByFragmentFromPath()}),this.ngZone.onStable.pipe((0,C.P)()).subscribe(()=>{console.timeEnd(d)})}}return a.\u0275fac=function(r){return new(r||a)(n.Y36(n.R0b))},a.\u0275cmp=n.Xpm({type:a,selectors:[["app-pl-snackbar"]],decls:7,vars:3,consts:[["id","Basic",4,"ngIf"],["id","Bootstrap",4,"ngIf"],["id","MaterialUI",4,"ngIf"],["id","Basic"],["br-tp",""],["id","Bootstrap"],["id","MaterialUI"]],template:function(r,s){1&r&&(n.TgZ(0,"h3"),n._uU(1,"Palette for GlnSnackbar."),n.qZA(),n.YNc(2,K,3,0,"div",0),n.YNc(3,j,3,0,"div",1),n.YNc(4,O,3,0,"div",2),n._UZ(5,"br")(6,"br")),2&r&&(n.xp6(2),n.Q6J("ngIf",!s.showNum||"01"===s.showNum),n.xp6(1),n.Q6J("ngIf",!s.showNum||"02"===s.showNum),n.xp6(1),n.Q6J("ngIf",!s.showNum||"03"===s.showNum))},dependencies:[g.O5,J,L,Y],styles:["app-pl-snackbar{display:block}\n"],encapsulation:2,changeDetection:0}),a})()}];let $=(()=>{class a{}return a.\u0275fac=function(r){return new(r||a)},a.\u0275mod=n.oAB({type:a}),a.\u0275inj=n.cJS({imports:[k.Bz.forChild(W),k.Bz]}),a})(),nn=(()=>{class a{}return a.\u0275fac=function(r){return new(r||a)},a.\u0275mod=n.oAB({type:a}),a.\u0275inj=n.cJS({imports:[g.ez,f,_,h,$]}),a})()}}]);