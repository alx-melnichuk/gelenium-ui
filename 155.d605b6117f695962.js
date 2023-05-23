"use strict";(self.webpackChunkgelenium_ui_demo=self.webpackChunkgelenium_ui_demo||[]).push([[155],{7155:(x,A,l)=>{l.r(A),l.d(A,{DrAutoFocuseModule:()=>S});var p=l(6895),r=l(433),m=l(7084),g=l(3848),u=l(9544),e=l(1571);let F=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[p.ez,r.UX,m.To,g.Nh,u.Ru]}),n})(),T=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[p.ez]}),n})();var Z=l(6001),_=l(590),y=l(4577),s=l(4171),c=l(6986);const f="mode",d="mode1a",h="mode1b";let w=(()=>{class n{constructor(t){this.changeDetectorRef=t,this.labelShowSource=c.sx,this.labelHtml=c.zC,this.labelTs=c.QS,this.labelCss=c.Er,this.baseRef=s.g.get("BASE_REF"),this.urlDrAutoFocuse=this.baseRef+"/"+s.g.get("URL_DIRECTIVES")+"/"+s.g.get("URL_DIRECTIVES_AUTO_FOCUSE"),this.mode="A",this.mode1a="surname",this.formGroup01a=new r.cw({surname01a:new r.NI("surname",[]),name01a:new r.NI("name",[]),patronymic01a:new r.NI("patronymic",[])}),this.mode1b="surname",this.formGroup01b=new r.cw({surname01b:new r.NI("surname",[]),name01b:new r.NI("name",[]),patronymic01b:new r.NI("patronymic",[])})}ngOnInit(){this.mode=u.vr.getPrm(location.href,f)||this.mode,this.mode1a=u.vr.getPrm(location.href,d)||this.mode1a,this.mode1b=u.vr.getPrm(location.href,h)||this.mode1b,this.doChangeMode(this.mode)}doChangeMode(t){"A"===t?(this.formGroup01a.enable(),this.formGroup01b.disable(),location.href=u.vr.removePrm(location.href,h),location.href=u.vr.addPrm(location.href,f,this.mode),location.href=u.vr.addPrm(location.href,d,this.mode1a),this.changeDetectorRef.markForCheck()):"B"===t&&(this.formGroup01a.disable(),this.formGroup01b.enable(),location.href=u.vr.removePrm(location.href,d),location.href=u.vr.addPrm(location.href,f,this.mode),location.href=u.vr.addPrm(location.href,h,this.mode1b),this.changeDetectorRef.markForCheck())}doChangeMode1a(t){location.href=u.vr.addPrm(location.href,d,t)}doChangeMode1b(t){location.href=u.vr.addPrm(location.href,h,t)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(e.sBO))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-dr-auto-focuse-basic"]],inputs:{labelShowSource:"labelShowSource",labelHtml:"labelHtml",labelTs:"labelTs",labelCss:"labelCss"},decls:173,vars:32,consts:[["mr-vr",""],[1,"app-hover-link"],[3,"href"],["id","introduction",1,"app-hover-link"],["href","https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus"],["source","html"],["id","simple-example",1,"app-hover-link"],["id","example1",1,"app-hover-link"],[1,"afb-focuse-owner"],["type","radio","name","mode","value","A",3,"checked","change"],["type","radio","name","mode1a","value","surname",3,"checked","change"],["type","radio","name","mode1a","value","name",3,"checked","change"],["type","radio","name","mode1a","value","patronymic",3,"checked","change"],["novalidate","","autocomplete","off",3,"formGroup"],[1,"app-group"],[1,"app-elem"],["type","text","formControlName","surname01a",3,"glnAutoFocuse"],["type","text","formControlName","name01a",3,"glnAutoFocuse"],["type","text","formControlName","patronymic01a",3,"glnAutoFocuse"],["mr-vr2",""],["animationDuration","0ms"],[3,"label"],["source","ts"],["source","css"],["id","complex-example",1,"app-hover-link"],["id","example2",1,"app-hover-link"],["type","radio","name","mode","value","B",3,"checked","change"],["type","radio","name","mode1b","value","surname",3,"checked","change"],["type","radio","name","mode1b","value","name",3,"checked","change"],["type","radio","name","mode1b","value","patronymic",3,"checked","change"],["glnAutoFocuseOwner","","novalidate","","autocomplete","off",3,"formGroup"],["type","text","formControlName","surname01b",3,"glnAutoFocuse"],["type","text","formControlName","name01b",3,"glnAutoFocuse"],["type","text","formControlName","patronymic01b",3,"glnAutoFocuse"]],template:function(t,o){1&t&&(e.TgZ(0,"section",0)(1,"h3",1),e._uU(2," Basic. "),e.TgZ(3,"a",2),e._uU(4,"#"),e.qZA()(),e.TgZ(5,"h4",3),e._uU(6," Introduction. "),e.TgZ(7,"a",2),e._uU(8,"#"),e.qZA()(),e.TgZ(9,"p"),e._uU(10," Sometimes a situation arises when, after rendering the page layout, you need to pass focus to a specific input element. To do this, you can use the standard HTML attribute "),e.TgZ(11,"a",4),e._uU(12,' "autofocus"'),e.qZA(),e._uU(13,". "),e.qZA(),e.TgZ(14,"span"),e._uU(15," For example: "),e.qZA(),e.TgZ(16,"pre",5),e._uU(17,'<form novalidation>\n  <label>\n    <input type="text" [(ngModel)]="modelLogin"\n      name="login" '),e.TgZ(18,"strong"),e._uU(19,"autofocuse"),e.qZA(),e._uU(20,' /> Login\n  </label>\n  <label>\n    <input type="password" [(ngModel)]="modelPassword"\n      name="password" /> Password\n  </label>\n</form>'),e.qZA(),e.TgZ(21,"p"),e._uU(22," But this is not always done correctly. For example, when the page layout structure complex: many levels of nesting or input elements. Or is there a complex the logic for determining the required element to which the input focus should be given. In such cases, you can use the GlnAutoFocuse directive. "),e.qZA(),e.TgZ(23,"h4",6),e._uU(24," A simple example. "),e.TgZ(25,"a",2),e._uU(26,"#"),e.qZA()(),e.TgZ(27,"p"),e._uU(28,' If the page layout has a relatively simple structure, then GlnAutoFocuse can be applied. This directive transfers input focus at the moment when the current element is already rendered. To do this, use the "OnAfterViewInit" hook and additionally call Promise.resolve(). '),e.qZA(),e.TgZ(29,"span"),e._uU(30," For example: "),e.qZA(),e.TgZ(31,"pre",5),e._uU(32,'<form novalidation>\n  <label>\n    <input type="text" [(ngModel)]="modelLogin"\n      name="login" '),e.TgZ(33,"strong"),e._uU(34,"glnAutoFocuse"),e.qZA(),e._uU(35,' /> Login\n  </label>\n  <label>\n    <input type="password" [(ngModel)]="modelPassword"\n      name="password" /> Password\n  </label>\n</form>'),e.qZA(),e.TgZ(36,"p"),e._uU(37," You can pass a boolean value to the GlnAutoFocuse directive, which will determine whether the parameter value is enabled or disabled. "),e.qZA(),e.TgZ(38,"span"),e._uU(39," For example: "),e.qZA(),e.TgZ(40,"pre",5),e._uU(41,'<form novalidation>\n  <label>\n    <input type="text"\n     [(ngModel)]="modelLogin"\n      name="login"\n      [glnAutoFocuse]="!modelLogin" />\n    Login\n  </label>\n  <label>\n    <input type="password"\n     [(ngModel)]="modelPassword"\n      name="password"\n      [glnAutoFocuse]="!!modelLogin" />\n    Password\n  </label>\n</form>'),e.qZA(),e.TgZ(42,"p"),e._uU(43,' If the "Login" field is empty, then the input focus will be given to this element. Otherwise, the input focus will be given to the "Password" input element. '),e.qZA()(),e.TgZ(44,"h4",7),e._uU(45," Example: "),e.TgZ(46,"a",2),e._uU(47,"#"),e.qZA()(),e.TgZ(48,"section",0)(49,"label",8)(50,"input",9),e.NdJ("change",function(){return o.doChangeMode(o.mode="A")}),e.qZA(),e._uU(51,' Section "GlnAutoFocuse" is active. '),e.qZA(),e.TgZ(52,"p"),e._uU(53,"Set autofocus on page load on a field:"),e.qZA(),e.TgZ(54,"fieldset")(55,"label")(56,"input",10),e.NdJ("change",function(){return o.doChangeMode1a(o.mode1a="surname")}),e.qZA(),e._uU(57," surname "),e.qZA(),e.TgZ(58,"label")(59,"input",11),e.NdJ("change",function(){return o.doChangeMode1a(o.mode1a="name")}),e.qZA(),e._uU(60," name "),e.qZA(),e.TgZ(61,"label")(62,"input",12),e.NdJ("change",function(){return o.doChangeMode1a(o.mode1a="patronymic")}),e.qZA(),e._uU(63," patronymic "),e.qZA()()(),e.TgZ(64,"form",13)(65,"div",14)(66,"div",15)(67,"div")(68,"small")(69,"em"),e._uU(70,"Surname"),e.qZA()()(),e._UZ(71,"input",16),e.qZA(),e.TgZ(72,"div",15)(73,"div")(74,"small")(75,"em"),e._uU(76,"Name"),e.qZA()()(),e._UZ(77,"input",17),e.qZA(),e.TgZ(78,"div",15)(79,"div")(80,"small")(81,"em"),e._uU(82,"Patronymic"),e.qZA()()(),e._UZ(83,"input",18),e.qZA()()(),e.TgZ(84,"section",19)(85,"mat-accordion")(86,"mat-expansion-panel")(87,"mat-expansion-panel-header")(88,"mat-panel-title"),e._uU(89),e.qZA()(),e.TgZ(90,"mat-tab-group",20)(91,"mat-tab",21)(92,"code")(93,"pre",5),e._uU(94,'<form [formGroup]="formGroup01a"\n  novalidate\n  autocomplete="off">\n\n  <div class="app-group">\n\n    <div class="app-elem">\n      <div>\n        <small><em>Surname</em></small>\n      </div>\n      <input type="text"\n        formControlName="surname01a"\n        [glnAutoFocuse]="mode1a === \'surname\'" />\n    </div>\n\n    <div class="app-elem">\n      <div>\n        <small><em>Name</em></small>\n      </div>\n      <input type="text"\n        formControlName="name01a"\n        [glnAutoFocuse]="mode1a === \'name\'" />\n    </div>\n\n    <div class="app-elem">\n      <div>\n        <small><em>Patronymic</em></small>\n      </div>\n      <input type="text"\n        formControlName="patronymic01a"\n        [glnAutoFocuse]="mode1a === \'patronymic\'" />\n    </div>\n\n  </div>\n\n</form>'),e.qZA()()(),e.TgZ(95,"mat-tab",21)(96,"code")(97,"pre",22),e._uU(98,"import {\n  Component, ViewEncapsulation\n} from '@angular/core';\nimport {\n  FormControl, FormGroup\n} from '@angular/forms';\n\nconst CN_MODE1A = 'mode1a';\n\n@Component({\n  selector: 'app-auto-focuse',\n  templateUrl: './auto-focuse.component.html',\n  styleUrls: ['./auto-focuse.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class AutoFocuseComponent implements OnInit {\n\n  public mode1a = 'surname';\n\n  public formGroup01a: FormGroup = new FormGroup({\n    surname01a: new FormControl('surname', []),\n    name01a: new FormControl('name', []),\n    patronymic01a: new FormControl('patronymic', []),\n  });\n\n  public ngOnInit(): void {\n    this.mode1a = this.getPrm(location.href, CN_MODE1A) || this.mode1a;\n  }\n\n  // ** Public methods **\n\n  private getPrm(url: string, prmName: string): string {\n    let result = '';\n    if (!!url && !!prmName) {\n      const buff = url.split('?');\n      const prms = buff.length > 1 ? buff[1].split('&') : [];\n      for (let i = 0; i < prms.length; i++) {\n        const prm = prms[i];\n        const data = prm ? prm.split('=') : [];\n        if (data.length > 1 && prmName === data[0]) {\n          result = data[1] || '';\n          break;\n        }\n      }\n    }\n    return result;\n  }\n}"),e.qZA()()(),e.TgZ(99,"mat-tab",21)(100,"code")(101,"pre",23),e._uU(102,".app-group {\n  display: flex;\n  flex-wrap: wrap;\n}\n.app-elem {\n  min-width: 26ch;\n  margin: 10px 10px;\n}"),e.qZA()()()()()()(),e.TgZ(103,"section",0)(104,"h4",24),e._uU(105," Complex example. "),e.TgZ(106,"a",2),e._uU(107,"#"),e.qZA()(),e.TgZ(108,"p"),e._uU(109," If using GlnAutoFocuse does not give the desired result, then you can additionally use GlnAutoFocuseOwner. This situation can occur when the page layout is so complex that the directive GlnAutoFocuse doesn't work. In other words, the input element (on which GlnAutoFocuse is present) is drawn before than the whole page layout. Here we can add an additional GlnAutoFocuseOwner directive at the root level page layout. And this additional directive will be able to get the moment when the rendering of the page layout is completed. In doing so, it will determine the first child directive GlnAutoFocuse, whose input parameter true and will call its input focus transfer method. "),e.qZA(),e.TgZ(110,"span"),e._uU(111," For example: "),e.qZA(),e.TgZ(112,"pre",5),e._uU(113,'  <form glnAutoFocuseOwner novalidation>\n    <div>\n      <div>\n        <div>\n          <label>\n            <input type="text"\n             [(ngModel)]="model01"\n              name="model01"\n              [glnAutoFocuse]="!model01" />\n            Name01\n          </label>\n        </div>\n      </div>\n    </div>\n    ...\n    <div>\n      <div>\n        <div>\n          <label>\n            <input type="text"\n             [(ngModel)]="model99"\n              name="model99"\n              [glnAutoFocuse]="!model99" />\n            Name99\n          </label>\n        </div>\n      </div>\n    </div>\n  </form>'),e.qZA()(),e.TgZ(114,"h4",25),e._uU(115," Example: "),e.TgZ(116,"a",2),e._uU(117,"#"),e.qZA()(),e.TgZ(118,"section",0)(119,"label",8)(120,"input",26),e.NdJ("change",function(){return o.doChangeMode(o.mode="B")}),e.qZA(),e._uU(121,' Section "GlnAutoFocuseOwner" is active. '),e.qZA(),e.TgZ(122,"p"),e._uU(123,"Set autofocus on page load on a field:"),e.qZA(),e.TgZ(124,"fieldset")(125,"label")(126,"input",27),e.NdJ("change",function(){return o.doChangeMode1b(o.mode1b="surname")}),e.qZA(),e._uU(127," surname "),e.qZA(),e.TgZ(128,"label")(129,"input",28),e.NdJ("change",function(){return o.doChangeMode1b(o.mode1b="name")}),e.qZA(),e._uU(130," name "),e.qZA(),e.TgZ(131,"label")(132,"input",29),e.NdJ("change",function(){return o.doChangeMode1b(o.mode1b="patronymic")}),e.qZA(),e._uU(133," patronymic "),e.qZA()()(),e.TgZ(134,"form",30)(135,"div",14)(136,"div",15)(137,"div")(138,"small")(139,"em"),e._uU(140,"Surname"),e.qZA()()(),e._UZ(141,"input",31),e.qZA(),e.TgZ(142,"div",15)(143,"div")(144,"small")(145,"em"),e._uU(146,"Name"),e.qZA()()(),e._UZ(147,"input",32),e.qZA(),e.TgZ(148,"div",15)(149,"div")(150,"small")(151,"em"),e._uU(152,"Patronymic"),e.qZA()()(),e._UZ(153,"input",33),e.qZA()()(),e.TgZ(154,"section",19)(155,"mat-accordion")(156,"mat-expansion-panel")(157,"mat-expansion-panel-header")(158,"mat-panel-title"),e._uU(159),e.qZA()(),e.TgZ(160,"mat-tab-group",20)(161,"mat-tab",21)(162,"code")(163,"pre",5),e._uU(164,'<form [formGroup]="formGroup01b"\n  glnAutoFocuseOwner\n  novalidate\n  autocomplete="off">\n\n  <div class="app-group">\n\n    <div class="app-elem">\n      <div>\n        <small><em>Surname</em></small>\n      </div>\n      <input type="text"\n        formControlName="surname01b"\n        [glnAutoFocuse]="mode1b === \'surname\'" />\n    </div>\n\n    <div class="app-elem">\n      <div>\n        <small><em>Name</em></small>\n      </div>\n      <input type="text"\n        formControlName="name01b"\n        [glnAutoFocuse]="mode1b === \'name\'" />\n    </div>\n\n    <div class="app-elem">\n      <div>\n        <small><em>Patronymic</em></small>\n      </div>\n      <input type="text"\n        formControlName="patronymic01b"\n        [glnAutoFocuse]="mode1b === \'patronymic\'" />\n    </div>\n\n  </div>\n\n</form>'),e.qZA()()(),e.TgZ(165,"mat-tab",21)(166,"code")(167,"pre",22),e._uU(168,"import {\n  Component, ViewEncapsulation\n} from '@angular/core';\nimport {\n  FormControl, FormGroup\n} from '@angular/forms';\n\nconst CN_MODE1B = 'mode1b';\n\n@Component({\n  selector: 'app-auto-focuse',\n  templateUrl: './auto-focuse.component.html',\n  styleUrls: ['./auto-focuse.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class AutoFocuseComponent implements OnInit {\n\n  public mode1b = 'surname';\n\n  public formGroup01b: FormGroup = new FormGroup({\n    surname01b: new FormControl('surname', []),\n    name01b: new FormControl('name', []),\n    patronymic01b: new FormControl('patronymic', []),\n  });\n\n  public ngOnInit(): void {\n    this.mode1b = this.getPrm(location.href, CN_MODE1B) || this.mode1b;\n  }\n\n  // ** Public methods **\n\n  private getPrm(url: string, prmName: string): string {\n    let result = '';\n    if (!!url && !!prmName) {\n      const buff = url.split('?');\n      const prms = buff.length > 1 ? buff[1].split('&') : [];\n      for (let i = 0; i < prms.length; i++) {\n        const prm = prms[i];\n        const data = prm ? prm.split('=') : [];\n        if (data.length > 1 && prmName === data[0]) {\n          result = data[1] || '';\n          break;\n        }\n      }\n    }\n    return result;\n  }\n}"),e.qZA()()(),e.TgZ(169,"mat-tab",21)(170,"code")(171,"pre",23),e._uU(172,".app-group {\n  display: flex;\n  flex-wrap: wrap;\n}\n.app-elem {\n  min-width: 26ch;\n  margin: 10px 10px;\n}"),e.qZA()()()()()()()),2&t&&(e.xp6(3),e.Q6J("href",o.urlDrAutoFocuse+"#Basic",e.LSH),e.xp6(4),e.Q6J("href",o.urlDrAutoFocuse+"#introduction",e.LSH),e.xp6(18),e.Q6J("href",o.urlDrAutoFocuse+"#simple-example",e.LSH),e.xp6(21),e.Q6J("href",o.urlDrAutoFocuse+"#example1",e.LSH),e.xp6(4),e.Q6J("checked","A"===o.mode),e.xp6(4),e.uIk("disabled","A"===o.mode?null:""),e.xp6(2),e.Q6J("checked","surname"===o.mode1a),e.xp6(3),e.Q6J("checked","name"===o.mode1a),e.xp6(3),e.Q6J("checked","patronymic"===o.mode1a),e.xp6(2),e.Q6J("formGroup",o.formGroup01a),e.xp6(7),e.Q6J("glnAutoFocuse","surname"===o.mode1a),e.xp6(6),e.Q6J("glnAutoFocuse","name"===o.mode1a),e.xp6(6),e.Q6J("glnAutoFocuse","patronymic"===o.mode1a),e.xp6(6),e.Oqu(o.labelShowSource),e.xp6(2),e.Q6J("label",o.labelHtml),e.xp6(4),e.Q6J("label",o.labelTs),e.xp6(4),e.Q6J("label",o.labelCss),e.xp6(7),e.Q6J("href",o.urlDrAutoFocuse+"#complex-example",e.LSH),e.xp6(10),e.Q6J("href",o.urlDrAutoFocuse+"#example2",e.LSH),e.xp6(4),e.Q6J("checked","B"===o.mode),e.xp6(4),e.uIk("disabled","B"===o.mode?null:""),e.xp6(2),e.Q6J("checked","surname"===o.mode1b),e.xp6(3),e.Q6J("checked","name"===o.mode1b),e.xp6(3),e.Q6J("checked","patronymic"===o.mode1b),e.xp6(2),e.Q6J("formGroup",o.formGroup01b),e.xp6(7),e.Q6J("glnAutoFocuse","surname"===o.mode1b),e.xp6(6),e.Q6J("glnAutoFocuse","name"===o.mode1b),e.xp6(6),e.Q6J("glnAutoFocuse","patronymic"===o.mode1b),e.xp6(6),e.Oqu(o.labelShowSource),e.xp6(2),e.Q6J("label",o.labelHtml),e.xp6(4),e.Q6J("label",o.labelTs),e.xp6(4),e.Q6J("label",o.labelCss))},dependencies:[r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,m.pp,m.ib,m.yz,m.yK,g.SP,g.uX,u.Zp,u.WF],styles:["app-dr-auto-focuse-basic{display:block}app-dr-auto-focuse-basic .afb-focuse-owner{font-weight:500;font-style:italic}\n"],encapsulation:2,changeDetection:0}),n})(),C=(()=>{class n{constructor(){this.baseRef=s.g.get("BASE_REF"),this.urlDrAutoFocuse=this.baseRef+"/"+s.g.get("URL_DIRECTIVES")+"/"+s.g.get("URL_DIRECTIVES_AUTO_FOCUSE")}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-dr-auto-focuse-api"]],decls:71,vars:4,consts:[["mr-vr",""],[1,"app-hover-link"],[3,"href"],["fw500",""],["id","properties",1,"app-hover-link"],[1,"app-tab"],[1,"app-mn-wd-22ch"],["id","additionally",1,"app-hover-link"],["id","gln-auto-focuse-owner",1,"app-hover-link"]],template:function(t,o){1&t&&(e.TgZ(0,"section",0)(1,"h3",1),e._uU(2," API: GlnAutoFocuse. "),e.TgZ(3,"a",2),e._uU(4,"#"),e.qZA()(),e.TgZ(5,"p"),e._uU(6," Selector: "),e.TgZ(7,"span",3),e._uU(8,"[glnAutoFocuse]"),e.qZA()(),e.TgZ(9,"p"),e._uU(10," Exported as: "),e.TgZ(11,"span",3),e._uU(12,"glnAutoFocuse"),e.qZA()(),e.TgZ(13,"p"),e._uU(14," The directive transfers input focus to the current element. "),e.qZA()(),e.TgZ(15,"section",0)(16,"h4",4),e._uU(17," Properties. "),e.TgZ(18,"a",2),e._uU(19,"#"),e.qZA()()(),e.TgZ(20,"table",5)(21,"tr")(22,"th",6),e._uU(23,"Name"),e.qZA(),e.TgZ(24,"th"),e._uU(25,"Description"),e.qZA()(),e.TgZ(26,"tr")(27,"td")(28,"code"),e._uU(29,"@Input()"),e.qZA(),e.TgZ(30,"code"),e._uU(31,"glnAutoFocuse: string | boolean | null = null;"),e.qZA()(),e.TgZ(32,"td")(33,"span"),e._uU(34,"Can take the following values:"),e.qZA(),e.TgZ(35,"ul")(36,"li")(37,"code"),e._uU(38,"empty string (default);"),e.qZA()(),e.TgZ(39,"li")(40,"code"),e._uU(41,"true/false (boolean type);"),e.qZA()(),e.TgZ(42,"li")(43,"code"),e._uU(44,'"true"/"false" (string type);'),e.qZA()()()()()(),e.TgZ(45,"section",0)(46,"h4",7),e._uU(47," Additionally. "),e.TgZ(48,"a",2),e._uU(49,"#"),e.qZA()(),e.TgZ(50,"p"),e._uU(51,' When the input parameter is true or "empty string", the current element is given the "auto-focuse" attribute. This allows you to check the correct operation of this directive. '),e.qZA()(),e.TgZ(52,"section",0)(53,"h3",8),e._uU(54," API: GlnAutoFocuseOwner. "),e.TgZ(55,"a",2),e._uU(56,"#"),e.qZA()(),e.TgZ(57,"p"),e._uU(58," Selector: "),e.TgZ(59,"span",3),e._uU(60,"[glnAutoFocuseOwner]"),e.qZA()(),e.TgZ(61,"p"),e._uU(62," Exported as: "),e.TgZ(63,"span",3),e._uU(64,"glnAutoFocuseOwner"),e.qZA()(),e.TgZ(65,"p"),e._uU(66," The directive allows you to transfer the input focus to the specified element with a complex page structure. "),e.qZA(),e.TgZ(67,"p"),e._uU(68,' The directive defines the first nested child GlnAutoFocuse directive with a positive input parameter value (or "empty string"). And after that, it calls the method of the child directive GlnAutoFocuse to transfer the input focus. '),e.qZA(),e.TgZ(69,"p"),e._uU(70,' This directive is placed as close as possible to the root of the current page. This is necessary to get the "OnAfterViewInit" hook at the moment when all child elements have already been rendered. In other words, it is required to determine the moment when the current page has completed its rendering. '),e.qZA()()),2&t&&(e.xp6(3),e.Q6J("href",o.urlDrAutoFocuse+"#Api",e.LSH),e.xp6(15),e.Q6J("href",o.urlDrAutoFocuse+"#properties",e.LSH),e.xp6(30),e.Q6J("href",o.urlDrAutoFocuse+"#additionally",e.LSH),e.xp6(7),e.Q6J("href",o.urlDrAutoFocuse+"#gln-auto-focuse-owner",e.LSH))},styles:["app-dr-auto-focuse-api{display:block}\n"],encapsulation:2,changeDetection:0}),n})();function q(n,a){1&n&&(e.TgZ(0,"div",2),e._UZ(1,"app-dr-auto-focuse-basic")(2,"hr",3),e.qZA())}function D(n,a){1&n&&(e.TgZ(0,"div",4),e._UZ(1,"app-dr-auto-focuse-api")(2,"hr",3),e.qZA())}const v="DirectivesAutoFocuse",N=[{path:"",component:(()=>{class n{constructor(t){this.ngZone=t,this.showNum="",console.time(v)}ngAfterViewInit(){Promise.resolve().then(()=>{y.R.scrollByFragmentFromPath()}),this.ngZone.onStable.pipe((0,_.P)()).subscribe(()=>{console.timeEnd(v)})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(e.R0b))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-dr-auto-focuse"]],decls:6,vars:2,consts:[["id","Basic",4,"ngIf"],["id","Api",4,"ngIf"],["id","Basic"],["br-tp",""],["id","Api"]],template:function(t,o){1&t&&(e.TgZ(0,"h3"),e._uU(1,'Directives: "GlnAutoFocuse"'),e.qZA(),e.YNc(2,q,3,0,"div",0),e.YNc(3,D,3,0,"div",1),e._UZ(4,"br")(5,"br")),2&t&&(e.xp6(2),e.Q6J("ngIf",!o.showNum||"01"===o.showNum),e.xp6(1),e.Q6J("ngIf",!o.showNum||"09"===o.showNum))},dependencies:[p.O5,w,C],styles:["app-dr-auto-focuse{display:block}\n"],encapsulation:2,changeDetection:0}),n})()}];let J=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[Z.Bz.forChild(N),Z.Bz]}),n})(),S=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[p.ez,F,T,J]}),n})()}}]);