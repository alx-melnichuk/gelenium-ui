"use strict";(self.webpackChunkgelenium_ui_demo=self.webpackChunkgelenium_ui_demo||[]).push([[291],{291:(D,l,o)=>{o.r(l),o.d(l,{LmGuidesModule:()=>C});var m=o(6895),s=o(7084),c=o(6292),d=o(6001),u=o(4171),g=o(5541),h=o(6986),r=o(2944),t=o(1571),f=o(6045);const x=function(e){return[e]};function L(e,a){if(1&e&&(t.TgZ(0,"li")(1,"a",9),t._uU(2),t.qZA()()),2&e){const n=a.$implicit;t.xp6(1),t.Q6J("routerLink",t.VKq(3,x,n.url))("fragment",n.fragment),t.xp6(1),t.Oqu(n.label)}}function T(e,a){if(1&e&&(t.TgZ(0,"mat-expansion-panel",5)(1,"mat-expansion-panel-header",6)(2,"mat-panel-title"),t._uU(3),t.qZA()(),t.TgZ(4,"ul",7),t.YNc(5,L,3,5,"li",8),t.qZA()()),2&e){const n=a.$implicit,i=t.oxw();t.Q6J("expanded",n.expanded),t.xp6(1),t.Q6J("expandedHeight",i.expandedHeight),t.xp6(2),t.Oqu(n.label),t.xp6(2),t.Q6J("ngForOf",n.siteUrls)("ngForTrackBy",i.trackByUrlItem)}}let y=(()=>{class e{constructor(){this.expandedHeight=h.uT,this.itemDataList=r.i.getItems("Guides");for(let i=0;i<this.itemDataList.length;i++)this.itemDataList[i].expanded=!1;const n=r.i.findSiteItemByUrl(this.itemDataList,location.pathname);n&&(n.expanded=!0)}trackByItemData(n,i){return i.order}trackByUrlItem(n,i){return i.url+"#"+i.fragment}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-lm-guides"]],decls:8,vars:2,consts:[["sideLeftPanel",""],[1,"ss-item"],["displayMode","flat"],["class","app-user-none",3,"expanded",4,"ngFor","ngForOf","ngForTrackBy"],["sideMainPanel",""],[1,"app-user-none",3,"expanded"],[3,"expandedHeight"],[1,"ss-ul"],[4,"ngFor","ngForOf","ngForTrackBy"],[3,"routerLink","fragment"]],template:function(n,i){1&n&&(t.TgZ(0,"app-site-scheme")(1,"div",0)(2,"div",1),t._uU(3,"Guides"),t.qZA(),t.TgZ(4,"mat-accordion",2),t.YNc(5,T,6,5,"mat-expansion-panel",3),t.qZA()(),t.TgZ(6,"div",4),t._UZ(7,"router-outlet"),t.qZA()()),2&n&&(t.xp6(5),t.Q6J("ngForOf",i.itemDataList)("ngForTrackBy",i.trackByItemData))},dependencies:[m.sg,s.pp,s.ib,s.yz,s.yK,f.V,d.lC,d.yS],styles:["app-lm-guides[_ngcontent-%COMP%]{display:block;height:100%}"]}),e})();const p=u.g.get("URL_GUIDES_START"),I=[{path:"",component:y,children:[{path:p,loadChildren:()=>o.e(929).then(o.bind(o,929)).then(e=>e.GdStartModule)},{path:u.g.get("URL_GUIDES_DESCRIPTION"),loadChildren:()=>o.e(788).then(o.bind(o,5788)).then(e=>e.GdDescriptionModule)},{path:"**",redirectTo:p}]}];let U=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[d.Bz.forChild(I),g.a,d.Bz]}),e})(),C=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[m.ez,s.To,c.u,U]}),e})()}}]);