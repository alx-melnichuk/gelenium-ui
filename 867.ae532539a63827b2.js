"use strict";(self.webpackChunkgelenium_ui_demo=self.webpackChunkgelenium_ui_demo||[]).push([[867],{4867:(r,i,n)=>{n.r(i),n.d(i,{LmComponentsModule:()=>F});var C=n(6895),d=n(7084),g=n(6292),a=n(6001),s=n(4171),p=n(2046),O=n(6986),h=n(2944),o=n(1571),N=n(6045);const L=function(t){return[t]};function M(t,m){if(1&t&&(o.TgZ(0,"li")(1,"a",9),o._uU(2),o.qZA()()),2&t){const e=m.$implicit;o.xp6(1),o.Q6J("routerLink",o.VKq(3,L,e.url))("fragment",e.fragment),o.xp6(1),o.Oqu(e.label)}}function R(t,m){if(1&t&&(o.TgZ(0,"mat-expansion-panel",5)(1,"mat-expansion-panel-header",6)(2,"mat-panel-title"),o._uU(3),o.qZA()(),o.TgZ(4,"ul",7),o.YNc(5,M,3,5,"li",8),o.qZA()()),2&t){const e=m.$implicit,l=o.oxw();o.Q6J("expanded",e.expanded),o.xp6(1),o.Q6J("expandedHeight",l.expandedHeight),o.xp6(2),o.Oqu(e.label),o.xp6(2),o.Q6J("ngForOf",e.siteUrls)("ngForTrackBy",l.trackByUrlItem)}}let f=(()=>{class t{constructor(){this.expandedHeight=O.uT,this.itemDataList=h.i.getItems("Components");for(let l=0;l<this.itemDataList.length;l++)this.itemDataList[l].expanded=!1;const e=h.i.findSiteItemByUrl(this.itemDataList,location.pathname);e&&(e.expanded=!0)}trackByItemData(e,l){return l.order}trackByUrlItem(e,l){return l.url+"#"+l.fragment}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-lm-components"]],decls:8,vars:2,consts:[["sideLeftPanel",""],[1,"ss-item"],["displayMode","flat"],["class","app-user-none",3,"expanded",4,"ngFor","ngForOf","ngForTrackBy"],["sideMainPanel",""],[1,"app-user-none",3,"expanded"],[3,"expandedHeight"],[1,"ss-ul"],[4,"ngFor","ngForOf","ngForTrackBy"],[3,"routerLink","fragment"]],template:function(e,l){1&e&&(o.TgZ(0,"app-site-scheme")(1,"div",0)(2,"div",1),o._uU(3,"Components"),o.qZA(),o.TgZ(4,"mat-accordion",2),o.YNc(5,R,6,5,"mat-expansion-panel",3),o.qZA()(),o.TgZ(6,"div",4),o._UZ(7,"router-outlet"),o.qZA()()),2&e&&(o.xp6(5),o.Q6J("ngForOf",l.itemDataList)("ngForTrackBy",l.trackByItemData))},dependencies:[C.sg,d.pp,d.ib,d.yz,d.yK,N.V,a.lC,a.yS],styles:["app-lm-components{display:block;height:100%}\n"],encapsulation:2}),t})();const E=s.g.get("URL_COMPONENTS_BUTTON"),S=s.g.get("URL_COMPONENTS_FRAME"),c=s.g.get("URL_COMPONENTS_HINT_OR_ERROR"),P=s.g.get("URL_COMPONENTS_INFINITE_SCROLL"),T=s.g.get("URL_COMPONENTS_INPUT"),I=[{path:"",component:f,children:[{path:E,loadChildren:()=>Promise.all([n.e(848),n.e(811),n.e(102)]).then(n.bind(n,3102)).then(t=>t.CmButtonModule)},{path:S,loadChildren:()=>Promise.all([n.e(848),n.e(811),n.e(448)]).then(n.bind(n,7448)).then(t=>t.CmFrameModule)},{path:c,loadChildren:()=>Promise.all([n.e(848),n.e(248)]).then(n.bind(n,9248)).then(t=>t.CmHintOrErrorModule)},{path:P,loadChildren:()=>Promise.all([n.e(848),n.e(811),n.e(47)]).then(n.bind(n,9047)).then(t=>t.CmInfiniteScrollModule)},{path:T,loadChildren:()=>Promise.all([n.e(848),n.e(811),n.e(845)]).then(n.bind(n,845)).then(t=>t.CmInputModule)},{path:s.g.get("URL_COMPONENTS_SELECT"),loadChildren:()=>Promise.all([n.e(848),n.e(811),n.e(187)]).then(n.bind(n,8187)).then(t=>t.CmSelectModule)},{path:s.g.get("URL_COMPONENTS_SWITCH"),loadChildren:()=>Promise.all([n.e(848),n.e(811),n.e(440)]).then(n.bind(n,7440)).then(t=>t.CmSwitchModule)},{path:s.g.get("URL_COMPONENTS_TEXTAREA"),loadChildren:()=>Promise.all([n.e(848),n.e(811),n.e(847)]).then(n.bind(n,4847)).then(t=>t.CmTextareaModule)},{path:"**",redirectTo:T}]}];let y=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[a.Bz.forChild(I),p.H,a.Bz]}),t})(),F=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[C.ez,d.To,g.u,y]}),t})()}}]);