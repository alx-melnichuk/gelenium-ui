"use strict";(self.webpackChunkgelenium_ui_demo=self.webpackChunkgelenium_ui_demo||[]).push([[85],{9085:(E,f,s)=>{s.r(f),s.d(f,{PlInputModule:()=>k});var d=s(6895),r=s(433),c=s(811),i=s(7084),p=s(3848),m=s(9544),e=s(1571);let v=(()=>{class l{}return l.\u0275fac=function(a){return new(a||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[d.ez,r.UX,c.vV,i.To,p.Nh,m.c6,m.eB]}),l})(),w=(()=>{class l{}return l.\u0275fac=function(a){return new(a||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[d.ez,r.UX,c.vV,i.To,p.Nh,m.eB]}),l})(),T=(()=>{class l{}return l.\u0275fac=function(a){return new(a||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[d.ez,r.UX,c.vV,i.To,p.Nh,m.eB]}),l})();var b=s(6001),Z=s(590),x=s(4577),u=s(4171),t=s(6986);const U=function(){return{primary:"success"}},C=function(){return{}};let y=(()=>{class l{constructor(){this.labelShowSource=t.sx,this.labelOutlined=t.SR,this.labelUnderline=t.kP,this.labelStandard=t.Qb,this.labelHtml=t.zC,this.labelTs=t.QS,this.labelCss=t.Er,this.baseRef=u.g.get("BASE_REF"),this.urlPlInput=this.baseRef+"/"+u.g.get("URL_PALETTE")+"/"+u.g.get("URL_PALETTE_INPUT"),this.exterior01a="outlined",this.control01a={model01a:new r.NI(null,[]),model01b:new r.NI(null,[]),model01c:new r.NI("Hello World",[]),model01d:new r.NI("Hello World",[])},this.formGroup01a=new r.cw(this.control01a)}}return l.\u0275fac=function(a){return new(a||l)},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-pl-input-basic"]],inputs:{labelShowSource:"labelShowSource",labelOutlined:"labelOutlined",labelUnderline:"labelUnderline",labelStandard:"labelStandard",labelHtml:"labelHtml",labelTs:"labelTs",labelCss:"labelCss"},decls:68,vars:23,consts:[["mr-vr",""],[1,"app-hover-link"],[3,"href"],["source","ts"],["value","exterior01a",3,"change"],["value","outlined",3,"checked"],["value","underline",3,"checked"],["value","standard",3,"checked"],["novalidate","","autocomplete","off",3,"formGroup"],[1,"app-group"],[1,"app-elem","ip-elem"],["formControlName","model01a","label","Enter value","helperText","Enter a value for the parameter.","wdFull","",3,"exterior"],["formControlName","model01b","isRequired","","wdFull","",3,"label","helperText","exterior"],["formControlName","model01c","wdFull","",3,"label","helperText","glnColor","exterior"],["formControlName","model01d","label","Disabled","isDisabled","","helperText","The parameter is disabled.","wdFull","",3,"exterior"],["animationDuration","0ms"],[3,"label"],["source","html"],["source","css"],["br-nn",""]],template:function(a,n){1&a&&(e.TgZ(0,"section",0)(1,"h4",1),e._uU(2," Basic. "),e.TgZ(3,"a",2),e._uU(4,"#"),e.qZA()(),e.TgZ(5,"p"),e._uU(6," GlnInput is based on the GlnFrame component, which has its own palette by default. "),e.qZA(),e.TgZ(7,"span"),e._uU(8," To use the glnColor directive, you need to add in your module: "),e.qZA(),e.TgZ(9,"code")(10,"pre",3),e._uU(11,"import { GlnColorModule } from 'gelenium-ui';"),e.qZA()()(),e.TgZ(12,"section",0)(13,"span"),e._uU(14,"exterior: \xa0"),e.qZA(),e.TgZ(15,"mat-button-toggle-group",4),e.NdJ("change",function(g){return n.exterior01a=g.value}),e.TgZ(16,"mat-button-toggle",5),e._uU(17),e.qZA(),e.TgZ(18,"mat-button-toggle",6),e._uU(19),e.qZA(),e.TgZ(20,"mat-button-toggle",7),e._uU(21),e.qZA()()(),e.TgZ(22,"form",8)(23,"div",9)(24,"div",10)(25,"div")(26,"small")(27,"em"),e._uU(28,"State: empty."),e.qZA()()(),e._UZ(29,"gln-input",11),e.qZA(),e.TgZ(30,"div",10)(31,"div")(32,"small")(33,"em"),e._uU(34,"Attributes: isRequired."),e.qZA()()(),e._UZ(35,"gln-input",12),e.qZA(),e.TgZ(36,"div",10)(37,"div")(38,"small")(39,"em"),e._uU(40,"Color: primary or success."),e.qZA()()(),e._UZ(41,"gln-input",13),e.qZA(),e.TgZ(42,"div",10)(43,"div")(44,"small")(45,"em"),e._uU(46,"Attribute: isDisabled."),e.qZA()()(),e._UZ(47,"gln-input",14),e.qZA()()(),e.TgZ(48,"section",0)(49,"mat-accordion")(50,"mat-expansion-panel")(51,"mat-expansion-panel-header")(52,"mat-panel-title"),e._uU(53),e.qZA()(),e.TgZ(54,"mat-tab-group",15)(55,"mat-tab",16)(56,"code")(57,"pre",17),e._uU(58,'<form [formGroup]="formGroup01a"\n  novalidate\n  autocomplete="off">\n\n  <div class="app-group">\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>State: empty.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model01a"\n        label="Enter value"\n        helperText="Enter a value for the parameter."\n        [exterior]="exterior01a"\n        wdFull>\n      </gln-input>\n    </div>\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>Attributes: isRequired.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model01b"\n        isRequired\n        [label]="!control01a.model01b.value\n          ? \'Requires a value\':\'Parameter value\'"\n        [helperText]="control01a.model01b.value\n          ? \'The field is filled.\'\n          : \'The field is not filled.\'"\n        [exterior]="exterior01a"\n        wdFull>\n      </gln-input>\n    </div>\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>Color: primary or success.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model01c"\n        [label]="!control01a.model01c.value\n          ? \'Enter a parameter\':\'Parameter specified\'"\n        [helperText]="control01a.model01c.value\n          ? \'The parameter was specified. (success)\'\n          : \'The parameter was not specified. (primary)\'"\n        [glnColor]="control01a.model01c.value\n          ? { primary: \'success\' } : {}"\n        [exterior]="exterior01a"\n        wdFull>\n      </gln-input>\n    </div>\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>Attribute: isDisabled.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model01d"\n        label="Disabled"\n        isDisabled\n        helperText="The parameter is disabled."\n        [exterior]="exterior01a"\n        wdFull>\n      </gln-input>\n    </div>\n\n  </div>\n\n</form>'),e.qZA()()(),e.TgZ(59,"mat-tab",16)(60,"code")(61,"pre",3),e._uU(62,"import {\n  Component, ViewEncapsulation\n} from '@angular/core';\nimport {\n  FormControl, FormGroup\n} from '@angular/forms';\n\n@Component({\n  selector: 'app-input',\n  templateUrl: './input.component.html',\n  styleUrls: ['./input.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class InputComponent {\n  public exterior01a = 'outlined';\n  public control01a = {\n    model01a: new FormControl(null, []),\n    model01b: new FormControl(null, []),\n    model01c: new FormControl('Hello World', []),\n    model01d: new FormControl('Hello World', []),\n  };\n  public formGroup01a: FormGroup = new FormGroup(this.control01a);\n}"),e.qZA()()(),e.TgZ(63,"mat-tab",16)(64,"code")(65,"pre",18),e._uU(66,"app-input {\n  .app-group {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  .app-elem {\n    min-width: 26ch;\n    margin: 10px 10px;\n  }\n  .ip-elem {\n    width: 29ch;\n  }\n}"),e.qZA()()()()()()(),e._UZ(67,"hr",19)),2&a&&(e.xp6(3),e.Q6J("href",n.urlPlInput+"#Basic",e.LSH),e.xp6(13),e.Q6J("checked","outlined"===n.exterior01a),e.xp6(1),e.Oqu(n.labelOutlined),e.xp6(1),e.Q6J("checked","underline"===n.exterior01a),e.xp6(1),e.Oqu(n.labelUnderline),e.xp6(1),e.Q6J("checked","standard"===n.exterior01a),e.xp6(1),e.Oqu(n.labelStandard),e.xp6(1),e.Q6J("formGroup",n.formGroup01a),e.xp6(7),e.Q6J("exterior",n.exterior01a),e.xp6(6),e.Q6J("label",n.control01a.model01b.value?"Parameter value":"Requires a value")("helperText",n.control01a.model01b.value?"The field is filled.":"The field is not filled.")("exterior",n.exterior01a),e.xp6(6),e.Q6J("label",n.control01a.model01c.value?"Parameter specified":"Enter a parameter")("helperText",n.control01a.model01c.value?"The parameter was specified. (success)":"The parameter was not specified. (primary)")("glnColor",n.control01a.model01c.value?e.DdM(21,U):e.DdM(22,C))("exterior",n.exterior01a),e.xp6(6),e.Q6J("exterior",n.exterior01a),e.xp6(6),e.Oqu(n.labelShowSource),e.xp6(2),e.Q6J("label",n.labelHtml),e.xp6(4),e.Q6J("label",n.labelTs),e.xp6(4),e.Q6J("label",n.labelCss))},dependencies:[r._Y,r.JJ,r.JL,r.sg,r.u,c.A9,c.Yi,i.pp,i.ib,i.yz,i.yK,p.SP,p.uX,m.pA,m.j7],styles:["app-pl-input-basic{display:block}app-pl-input-basic .ip-elem{width:29ch}\n"],encapsulation:2,changeDetection:0}),l})();const A=function(l){return[l]};let I=(()=>{class l{constructor(){this.labelShowSource=t.sx,this.labelOutlined=t.SR,this.labelUnderline=t.kP,this.labelStandard=t.Qb,this.labelHtml=t.zC,this.labelTs=t.QS,this.labelCss=t.Er,this.baseRef=u.g.get("BASE_REF"),this.urlPlInput=this.baseRef+"/"+u.g.get("URL_PALETTE")+"/"+u.g.get("URL_PALETTE_INPUT"),this.control02a={model02a:new r.NI(null,[]),model02b:new r.NI(null,[]),model02c:new r.NI("Hello World",[]),model02d:new r.NI("Hello World",[])},this.formGroup02a=new r.cw(this.control02a),this.config02a={exterior:"outlined",size:"short",isPlaceholder:!0}}}return l.\u0275fac=function(a){return new(a||l)},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-pl-input-bootstrap"]],inputs:{labelShowSource:"labelShowSource",labelOutlined:"labelOutlined",labelUnderline:"labelUnderline",labelStandard:"labelStandard",labelHtml:"labelHtml",labelTs:"labelTs",labelCss:"labelCss"},decls:60,vars:17,consts:[["mr-vr",""],[1,"app-hover-link"],[3,"href"],["source","ts"],["novalidate","","autocomplete","off",3,"formGroup"],[1,"app-group","ip-bootstrap"],[1,"app-elem","ip-elem"],["formControlName","model02a","label","Enter value","helperText","Enter a value for the parameter.","wdFull","",3,"config"],["formControlName","model02b","isRequired","","wdFull","",3,"label","helperText","config"],["formControlName","model02c","wdFull","",3,"ngClass","label","helperText","config"],["formControlName","model02d","label","Disabled","isDisabled","","helperText","The parameter is disabled.","wdFull","",3,"config"],["animationDuration","0ms"],[3,"label"],["source","html"],["source","css"],["br-nn",""]],template:function(a,n){1&a&&(e.TgZ(0,"section",0)(1,"h4",1),e._uU(2," Like a Bootstrap. "),e.TgZ(3,"a",2),e._uU(4,"#"),e.qZA()(),e.TgZ(5,"p"),e._uU(6,' It is possible to display GlnInput in style as "Bootstrap". '),e._UZ(7,"br"),e._uU(8," To do this, you need to specify the following configuration: "),e.qZA(),e.TgZ(9,"code")(10,"pre",3),e._uU(11,"public config02b: GlnInputConfig = {\n  exterior: 'outlined',\n  size: 'short',\n  isPlaceholder: true,\n};"),e.qZA()(),e.TgZ(12,"span"),e._uU(13," And also define some css-styles. "),e.qZA()(),e.TgZ(14,"form",4)(15,"div",5)(16,"div",6)(17,"div")(18,"small")(19,"em"),e._uU(20,"State: empty."),e.qZA()()(),e._UZ(21,"gln-input",7),e.qZA(),e.TgZ(22,"div",6)(23,"div")(24,"small")(25,"em"),e._uU(26,"Attributes: isRequired."),e.qZA()()(),e._UZ(27,"gln-input",8),e.qZA(),e.TgZ(28,"div",6)(29,"div")(30,"small")(31,"em"),e._uU(32,"Color: primary or success."),e.qZA()()(),e._UZ(33,"gln-input",9),e.qZA(),e.TgZ(34,"div",6)(35,"div")(36,"small")(37,"em"),e._uU(38,"Attribute: isDisabled."),e.qZA()()(),e._UZ(39,"gln-input",10),e.qZA()()(),e.TgZ(40,"section",0)(41,"mat-accordion")(42,"mat-expansion-panel")(43,"mat-expansion-panel-header")(44,"mat-panel-title"),e._uU(45),e.qZA()(),e.TgZ(46,"mat-tab-group",11)(47,"mat-tab",12)(48,"code")(49,"pre",13),e._uU(50,'<form [formGroup]="formGroup02a"\n  novalidate\n  autocomplete="off">\n\n  <div class="app-group ip-bootstrap">\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>State: empty.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model02a"\n        label="Enter value"\n        helperText="Enter a value for the parameter."\n        [config]="config02a"\n        wdFull>\n      </gln-input>\n    </div>\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>Attributes: isRequired.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model02b"\n        isRequired\n        [label]="!control02a.model02b.value\n          ? \'Requires a value\':\'Parameter value\'"\n        [helperText]="control02a.model02b.value\n          ? \'The field is filled.\'\n          : \'The field is not filled.\'"\n        [config]="config02a"\n        wdFull>\n      </gln-input>\n    </div>\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>Color: primary or success.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model02c"\n        [ngClass]="[control02a[\'model02c\'].value ? \'ip-success\' : \'\']"\n        [label]="!control02a.model02c.value\n          ? \'Enter a parameter\':\'Parameter specified\'"\n        [helperText]="control02a.model02c.value\n          ? \'The parameter was specified. (success)\'\n          : \'The parameter was not specified. (primary)\'"\n        [config]="config02a"\n        wdFull>\n      </gln-input>\n    </div>\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>Attribute: isDisabled.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model02d"\n        label="Disabled"\n        isDisabled\n        helperText="The parameter is disabled."\n        [config]="config02a"\n        wdFull>\n      </gln-input>\n    </div>\n\n  </div>\n\n</form>'),e.qZA()()(),e.TgZ(51,"mat-tab",12)(52,"code")(53,"pre",3),e._uU(54,"import {\n  Component, ViewEncapsulation\n} from '@angular/core';\nimport {\n  FormControl, FormGroup\n} from '@angular/forms';\n\n@Component({\n  selector: 'app-input',\n  templateUrl: './input.component.html',\n  styleUrls: ['./input.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class InputComponent {\n  public control02a = {\n    model02a: new FormControl(null, []),\n    model02b: new FormControl(null, []),\n    model02c: new FormControl('Hello World', []),\n    model02d: new FormControl('Hello World', []),\n  };\n  public formGroup02a: FormGroup = new FormGroup(this.control02a);\n  // GlnInputConfig\n  public config02a = {\n    exterior: 'outlined',\n    size: 'short',\n    isPlaceholder: true,\n  };\n\n}"),e.qZA()()(),e.TgZ(55,"mat-tab",12)(56,"code")(57,"pre",14),e._uU(58,"app-input {\n  .app-group {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  .app-elem {\n    min-width: 26ch;\n    margin: 10px 10px;\n  }\n  .ip-elem {\n    width: 29ch;\n  }\n\n  // ** Palette like Bootstrap. **\n\n  .ip-bootstrap {\n    // Primary hsl(200, 100%, 50%);\n    --glncl-primary-h: 200;\n    --glncl-primary-s: 100%;\n    // Danger hsl(355, 70%, 50%);\n    --glncl-danger-h: 355;\n    --glncl-danger-s: 70%;\n  }\n  .ip-bootstrap .gln-frame {\n    line-height: 1.5;\n    // Hover styles match the default styles.\n    --glnfr-hov-lb-cl: var(--glnfr--lb-cl-def);\n    --glnfr-hov-br-cl: var(--glnfr--br-cl-def);\n    // Blocking frame resizing when hovering the mouse for \"Outlined\" mode.\n    --glnfr-hov-dcr-br-wd: unset;\n    // Blocking frame resizing when receiving focus for \"Outlined\" mode.\n    --glnfr-foc-dcr-br-wd: unset;\n  }\n  .ip-bootstrap .gln-frame:focus-within:not(.gln-error) {\n    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);\n  }\n  .ip-bootstrap .gln-frame:focus-within.gln-error {\n    box-shadow: 0 0 0 0.25rem rgb(220 53 69 / 25%);\n  }\n  // Definition a color to represent \"success\".\n  .ip-bootstrap .ip-success .gln-frame {\n    --glncl-primary-h: 135;\n    --glncl-primary-s: 40%;\n  }\n  .ip-bootstrap .ip-success .gln-frame:focus-within:not(.gln-error) {\n    box-shadow: 0 0 0 0.25rem rgb(25 135 84 / 25%);\n  }\n  // Definition of svg to represent \"error\".\n  .ip-bootstrap .gln-frame.gln-error>div>[glnfr-elem] {\n    padding-right: 1.4em;\n    background-image: url(\"data:image/svg+xml,\"\n    + \"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'\"\n    + \" width='12' height='12' fill='none' stroke='%23dc3545'>\"\n    + \"<circle cx='6' cy='6' r='4.5'/>\"\n    + \"<path stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/>\"\n    + \"<circle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/>\"\n    + \"</svg>\");\n    background-repeat: no-repeat;\n    background-position: right center;\n    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n    margin-right: 0.5em;\n  }\n  // Definition of svg to represent \"error\".\n  .ip-bootstrap .ip-success .gln-frame:not(.gln-error)>div>[glnfr-elem] {\n    padding-right: 1.4em;\n    background-image: url(\"data:image/svg+xml,\"\n    + \"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'>\"\n    + \"<path fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.\"\n    + \"8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/>\"\n    + \"</svg>\");\n    background-repeat: no-repeat;\n    background-position: right center;\n    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n    margin-right: 0.5em;\n  }\n  .ip-bootstrap .gln-frame.gln-disabled {\n    --glnfr-dis-br-cl: #ced4da;\n    background-color: #e9ecef;\n  }\n\n  // gln-hint-or-error\n  // On focus, the style matches the default style.\n  .ip-bootstrap .gln-hint-or-error {\n    --glnhe-foc-lb-cl: var(--glnhe--lb-cl-def);\n  }\n}"),e.qZA()()()()()()(),e._UZ(59,"hr",15)),2&a&&(e.xp6(3),e.Q6J("href",n.urlPlInput+"#Bootstrap",e.LSH),e.xp6(11),e.Q6J("formGroup",n.formGroup02a),e.xp6(7),e.Q6J("config",n.config02a),e.xp6(6),e.Q6J("label",n.control02a.model02b.value?"Parameter value":"Requires a value")("helperText",n.control02a.model02b.value?"The field is filled.":"The field is not filled.")("config",n.config02a),e.xp6(6),e.Q6J("ngClass",e.VKq(15,A,n.control02a.model02c.value?"ip-success":""))("label",n.control02a.model02c.value?"Parameter specified":"Enter a parameter")("helperText",n.control02a.model02c.value?"The parameter was specified. (success)":"The parameter was not specified. (primary)")("config",n.config02a),e.xp6(6),e.Q6J("config",n.config02a),e.xp6(6),e.Oqu(n.labelShowSource),e.xp6(2),e.Q6J("label",n.labelHtml),e.xp6(4),e.Q6J("label",n.labelTs),e.xp6(4),e.Q6J("label",n.labelCss))},dependencies:[d.mk,r._Y,r.JJ,r.JL,r.sg,r.u,i.pp,i.ib,i.yz,i.yK,p.SP,p.uX,m.j7],styles:["app-pl-input-bootstrap{display:block}app-pl-input-bootstrap .ip-elem{width:29ch}app-pl-input-bootstrap .ip-bootstrap{--glncl-primary-h: 200;--glncl-primary-s: 100%;--glncl-danger-h: 355;--glncl-danger-s: 70%}app-pl-input-bootstrap .ip-bootstrap .gln-frame{line-height:1.5;--glnfr-hov-lb-cl: var(--glnfr--lb-cl-def);--glnfr-hov-br-cl: var(--glnfr--br-cl-def);--glnfr-hov-dcr-br-wd: unset;--glnfr-foc-dcr-br-wd: unset}app-pl-input-bootstrap .ip-bootstrap .gln-frame:focus-within:not(.gln-error){box-shadow:0 0 0 .25rem #0d6efd40}app-pl-input-bootstrap .ip-bootstrap .gln-frame:focus-within.gln-error{box-shadow:0 0 0 .25rem #dc354540}app-pl-input-bootstrap .ip-bootstrap .ip-success .gln-frame{--glncl-primary-h: 135;--glncl-primary-s: 40%}app-pl-input-bootstrap .ip-bootstrap .ip-success .gln-frame:focus-within:not(.gln-error){box-shadow:0 0 0 .25rem #19875440}app-pl-input-bootstrap .ip-bootstrap .gln-frame.gln-error>div>[glnfr-elem]{padding-right:1.4em;background-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'><circle cx='6' cy='6' r='4.5'/><path stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/><circle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/></svg>\");background-repeat:no-repeat;background-position:right center;background-size:calc(.75em + .375rem) calc(.75em + .375rem);margin-right:.5em}app-pl-input-bootstrap .ip-bootstrap .ip-success .gln-frame:not(.gln-error)>div>[glnfr-elem]{padding-right:1.4em;background-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>\");background-repeat:no-repeat;background-position:right center;background-size:calc(.75em + .375rem) calc(.75em + .375rem);margin-right:.5em}app-pl-input-bootstrap .ip-bootstrap .gln-frame.gln-disabled{--glnfr-dis-br-cl: #ced4da;background-color:#e9ecef}app-pl-input-bootstrap .ip-bootstrap .gln-hint-or-error{--glnhe-foc-lb-cl: var(--glnhe--lb-cl-def)}\n"],encapsulation:2,changeDetection:0}),l})();const P=function(l){return[l]};let _=(()=>{class l{constructor(){this.labelShowSource=t.sx,this.labelOutlined=t.SR,this.labelUnderline=t.kP,this.labelStandard=t.Qb,this.labelHtml=t.zC,this.labelTs=t.QS,this.labelCss=t.Er,this.baseRef=u.g.get("BASE_REF"),this.urlPlInput=this.baseRef+"/"+u.g.get("URL_PALETTE")+"/"+u.g.get("URL_PALETTE_INPUT"),this.exterior03a="outlined",this.control03a={model03a:new r.NI(null,[]),model03b:new r.NI(null,[]),model03c:new r.NI("Hello World",[]),model03d:new r.NI("Hello World",[])},this.formGroup03a=new r.cw(this.control03a)}}return l.\u0275fac=function(a){return new(a||l)},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-pl-input-material-ui"]],inputs:{labelShowSource:"labelShowSource",labelOutlined:"labelOutlined",labelUnderline:"labelUnderline",labelStandard:"labelStandard",labelHtml:"labelHtml",labelTs:"labelTs",labelCss:"labelCss"},decls:65,vars:23,consts:[["mr-vr",""],[1,"app-hover-link"],[3,"href"],["value","exterior03a",3,"change"],["value","outlined",3,"checked"],["value","underline",3,"checked"],["value","standard",3,"checked"],["novalidate","","autocomplete","off",3,"formGroup"],[1,"app-group","ip-material-ui"],[1,"app-elem","ip-elem"],["formControlName","model03a","label","Enter value","helperText","Enter a value for the parameter.","size","wide","wdFull","",3,"exterior"],["formControlName","model03b","isRequired","","size","wide","wdFull","",3,"label","helperText","exterior"],["formControlName","model03c","size","wide","wdFull","",3,"ngClass","label","helperText","exterior"],["formControlName","model03d","label","Disabled","isDisabled","","helperText","The parameter is disabled.","size","wide","wdFull","",3,"exterior"],["animationDuration","0ms"],[3,"label"],["source","html"],["source","ts"],["source","css"],["br-nn",""]],template:function(a,n){1&a&&(e.TgZ(0,"section",0)(1,"h4",1),e._uU(2," Like a Material-UI. "),e.TgZ(3,"a",2),e._uU(4,"#"),e.qZA()(),e.TgZ(5,"p"),e._uU(6,' It is possible to display GlnInput in style as "Material-UI". '),e.qZA(),e.TgZ(7,"span"),e._uU(8," This requires some css-styles to be defined. "),e.qZA()(),e.TgZ(9,"section",0)(10,"span"),e._uU(11,"exterior: \xa0"),e.qZA(),e.TgZ(12,"mat-button-toggle-group",3),e.NdJ("change",function(g){return n.exterior03a=g.value}),e.TgZ(13,"mat-button-toggle",4),e._uU(14),e.qZA(),e.TgZ(15,"mat-button-toggle",5),e._uU(16),e.qZA(),e.TgZ(17,"mat-button-toggle",6),e._uU(18),e.qZA()()(),e.TgZ(19,"form",7)(20,"div",8)(21,"div",9)(22,"div")(23,"small")(24,"em"),e._uU(25,"State: empty."),e.qZA()()(),e._UZ(26,"gln-input",10),e.qZA(),e.TgZ(27,"div",9)(28,"div")(29,"small")(30,"em"),e._uU(31,"Attributes: isRequired."),e.qZA()()(),e._UZ(32,"gln-input",11),e.qZA(),e.TgZ(33,"div",9)(34,"div")(35,"small")(36,"em"),e._uU(37,"Color: primary or success."),e.qZA()()(),e._UZ(38,"gln-input",12),e.qZA(),e.TgZ(39,"div",9)(40,"div")(41,"small")(42,"em"),e._uU(43,"Attribute: isDisabled."),e.qZA()()(),e._UZ(44,"gln-input",13),e.qZA()()(),e.TgZ(45,"section",0)(46,"mat-accordion")(47,"mat-expansion-panel")(48,"mat-expansion-panel-header")(49,"mat-panel-title"),e._uU(50),e.qZA()(),e.TgZ(51,"mat-tab-group",14)(52,"mat-tab",15)(53,"code")(54,"pre",16),e._uU(55,'<form [formGroup]="formGroup03a"\n  novalidate\n  autocomplete="off">\n\n  <div class="app-group ip-material-ui">\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>State: empty.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model03a"\n        label="Enter value"\n        helperText="Enter a value for the parameter."\n        size="wide"\n        [exterior]="exterior03a"\n        wdFull>\n      </gln-input>\n    </div>\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>Attributes: isRequired.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model03b"\n        isRequired\n        [label]="!control03a.model03b.value\n          ? \'Requires a value\':\'Parameter value\'"\n        [helperText]="control03a.model03b.value\n          ? \'The field is filled.\'\n          : \'The field is not filled.\'"\n        size="wide"\n        [exterior]="exterior03a"\n        wdFull>\n      </gln-input>\n    </div>\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>Color: primary or success.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model03c"\n        [ngClass]="[control03a[\'model03c\'].value ? \'ip-success\' : \'\']"\n        [label]="!control03a.model03c.value\n          ? \'Enter a parameter\':\'Parameter specified\'"\n        [helperText]="control03a.model03c.value\n          ? \'The parameter was specified. (success)\'\n          : \'The parameter was not specified. (primary)\'"\n        size="wide"\n        [exterior]="exterior03a"\n        wdFull>\n      </gln-input>\n    </div>\n\n    <div class="app-elem ip-elem">\n      <div>\n        <small>\n          <em>Attribute: isDisabled.</em>\n        </small>\n      </div>\n      <gln-input formControlName="model03d"\n        label="Disabled"\n        isDisabled\n        helperText="The parameter is disabled."\n        size="wide"\n        [exterior]="exterior03a"\n        wdFull>\n      </gln-input>\n    </div>\n\n  </div>\n\n</form>'),e.qZA()()(),e.TgZ(56,"mat-tab",15)(57,"code")(58,"pre",17),e._uU(59,"import {\n  Component, ViewEncapsulation\n} from '@angular/core';\nimport {\n  FormControl, FormGroup\n} from '@angular/forms';\n\n@Component({\n  selector: 'app-input',\n  templateUrl: './input.component.html',\n  styleUrls: ['./input.component.scss'],\n  encapsulation: ViewEncapsulation.None,\n})\nexport class InputComponent {\n  public exterior03a = 'outlined';\n  public control03a = {\n    model03a: new FormControl(null, []),\n    model03b: new FormControl(null, []),\n    model03c: new FormControl('Hello World', []),\n    model03d: new FormControl('Hello World', []),\n    };\n  public formGroup03a: FormGroup = new FormGroup(this.control03a);\n}"),e.qZA()()(),e.TgZ(60,"mat-tab",15)(61,"code")(62,"pre",18),e._uU(63,'app-input {\n  .app-group {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  .app-elem {\n    min-width: 26ch;\n    margin: 10px 10px;\n  }\n  .ip-elem {\n    width: 29ch;\n  }\n\n  // ** Palette like Material-UI. **\n\n  .ip-material-ui {\n    // "default"\n    --mui-default: rgba(0, 0, 0, 0.6);\n    --mui-default-dis: rgba(0, 0, 0, 0.38);\n    --mui-default-hov: rgba(0, 0, 0, 0.87);\n    --glncl-default-h: 20;\n    --glncl-default-s: 2%;\n    // "primary"\n    --mui-primary: #1976d2;\n    --glncl-primary-h: 210;\n    --glncl-primary-s: 79%;\n    // "danger"\n    --mui-danger: #d32f2f;\n    --glncl-danger-h: 0;\n    --glncl-danger-s: 65%;\n    // scheme "success"\n    // #--sh-success: hsl(135, 40%, 50%);\n    --gln-sh-success-h: 135;\n    --gln-sh-success-s: 40%;\n  }\n\n  // gln-frame\n  .ip-material-ui .gln-frame:not([dis]):not([err]) {\n    --glnfr-def-lb-cl: var(--mui-default);\n    --glnfr-def-br-cl: rgba(0, 0, 0, 0.23);\n    --glnfr-def-bf-cl: rgba(0, 0, 0, 0.42);\n\n    --glnfr-hov-lb-cl: var(--mui-default);\n    --glnfr-hov-br-cl: var(--mui-default-hov);\n    --glnfr-hov-bf-cl: var(--mui-default-hov);\n\n    --glnfr-foc-lb-cl: var(--mui-primary);\n    --glnfr-foc-br-cl: var(--mui-primary);\n    --glnfr-foc-bf-cl: var(--mui-default-hov);\n    --glnfr-foc-af-cl: var(--mui-primary);\n  }\n  .ip-material-ui .gln-frame:not([dis])[err] {\n    --glnfr-def-lb-cl: var(--mui-danger);\n    --glnfr-def-br-cl: var(--mui-danger);\n    --glnfr-def-bf-cl: var(--mui-danger);\n\n    --glnfr-hov-lb-cl: var(--mui-danger);\n    --glnfr-hov-br-cl: var(--mui-danger);\n    --glnfr-hov-bf-cl: var(--mui-danger);\n\n    --glnfr-foc-lb-cl: var(--mui-danger);\n    --glnfr-foc-br-cl: var(--mui-danger);\n    --glnfr-foc-bf-cl: var(--mui-danger);\n    --glnfr-foc-af-cl: var(--mui-danger);\n  }\n  .ip-material-ui .gln-frame[dis] {\n    --glnfr-dis-lb-cl: var(--mui-default-dis);\n    --glnfr-dis-br-cl: rgba(0, 0, 0, 0.26);\n    --glnfr-dis-bg-cl: rgba(0, 0, 0, 0.12);\n    --glnfr-dis-bf-cl: rgba(0, 0, 0, 0.42);\n  }\n  .ip-material-ui .gln-frame {\n    --glnfr-def-bg-cl: rgba(0, 0, 0, 0.06);\n    --glnfr-hov-bg-cl: rgba(0, 0, 0, 0.09);\n    --glnfr-foc-bg-cl: rgba(0, 0, 0, 0.05);\n    // Blocking frame resizing when hovering the mouse for "Outlined" mode.\n    --glnfr-hov-dcr-br-wd: unset;\n  }\n  .ip-material-ui .ip-success .gln-frame:not([dis]):not([err]) {\n    --glnfr-foc-lb-cl: hsl(var(--gln-sh-success-h), var(--gln-sh-success-s), 45%);\n    --glnfr-foc-br-cl: hsl(var(--gln-sh-success-h), var(--gln-sh-success-s), 50%);\n    --glnfr-foc-bf-cl: hsl(var(--gln-sh-success-h), var(--gln-sh-success-s), 40%);\n    --glnfr-foc-af-cl: hsl(var(--gln-sh-success-h), var(--gln-sh-success-s), 50%);\n  }\n\n  // gln-hint-or-error\n  .ip-material-ui .gln-hint-or-error:not([dis]):not([err]) {\n    --glnhe-def-lb-cl: var(--mui-default);\n    --glnhe-foc-lb-cl: var(--mui-default);\n  }\n  .ip-material-ui .gln-hint-or-error:not([dis])[err] {\n    --glnhe-def-lb-cl: var(--mui-danger);\n    --glnhe-foc-lb-cl: var(--mui-danger);\n  }\n  .ip-material-ui .gln-hint-or-error[dis] {\n    --glnhe-dis-lb-cl: var(--mui-default-dis);\n  }\n}'),e.qZA()()()()()()(),e._UZ(64,"hr",19)),2&a&&(e.xp6(3),e.Q6J("href",n.urlPlInput+"#MaterialUI",e.LSH),e.xp6(10),e.Q6J("checked","outlined"===n.exterior03a),e.xp6(1),e.Oqu(n.labelOutlined),e.xp6(1),e.Q6J("checked","underline"===n.exterior03a),e.xp6(1),e.Oqu(n.labelUnderline),e.xp6(1),e.Q6J("checked","standard"===n.exterior03a),e.xp6(1),e.Oqu(n.labelStandard),e.xp6(1),e.Q6J("formGroup",n.formGroup03a),e.xp6(7),e.Q6J("exterior",n.exterior03a),e.xp6(6),e.Q6J("label",n.control03a.model03b.value?"Parameter value":"Requires a value")("helperText",n.control03a.model03b.value?"The field is filled.":"The field is not filled.")("exterior",n.exterior03a),e.xp6(6),e.Q6J("ngClass",e.VKq(21,P,n.control03a.model03c.value?"ip-success":""))("label",n.control03a.model03c.value?"Parameter specified":"Enter a parameter")("helperText",n.control03a.model03c.value?"The parameter was specified. (success)":"The parameter was not specified. (primary)")("exterior",n.exterior03a),e.xp6(6),e.Q6J("exterior",n.exterior03a),e.xp6(6),e.Oqu(n.labelShowSource),e.xp6(2),e.Q6J("label",n.labelHtml),e.xp6(4),e.Q6J("label",n.labelTs),e.xp6(4),e.Q6J("label",n.labelCss))},dependencies:[d.mk,r._Y,r.JJ,r.JL,r.sg,r.u,c.A9,c.Yi,i.pp,i.ib,i.yz,i.yK,p.SP,p.uX,m.j7],styles:["app-pl-input-material-ui{display:block}app-pl-input-material-ui .ip-elem{width:29ch}app-pl-input-material-ui .ip-material-ui{--mui-default: rgba(0, 0, 0, .6);--mui-default-dis: rgba(0, 0, 0, .38);--mui-default-hov: rgba(0, 0, 0, .87);--glncl-default-h: 20;--glncl-default-s: 2%;--mui-primary: #1976d2;--glncl-primary-h: 210;--glncl-primary-s: 79%;--mui-danger: #d32f2f;--glncl-danger-h: 0;--glncl-danger-s: 65%;--gln-sh-success-h: 135;--gln-sh-success-s: 40%}app-pl-input-material-ui .ip-material-ui .gln-frame{--glnfr-def-lb-cl: var(--mui-default);--glnfr-def-br-cl: rgba(0, 0, 0, .23);--glnfr-def-bg-cl: rgba(0, 0, 0, .06);--glnfr-def-bf-cl: rgba(0, 0, 0, .42);--glnfr-hov-lb-cl: var(--mui-default);--glnfr-hov-br-cl: var(--mui-default-hov);--glnfr-hov-bg-cl: rgba(0, 0, 0, .09);--glnfr-hov-bf-cl: var(--mui-default-hov);--glnfr-foc-lb-cl: var(--mui-primary);--glnfr-foc-br-cl: var(--mui-primary);--glnfr-foc-bg-cl: rgba(0, 0, 0, .05);--glnfr-foc-bf-cl: var(--mui-default-hov);--glnfr-foc-af-cl: var(--mui-primary);--glnfr-hov-dcr-br-wd: unset;--glnfr-def-err-lb-cl: var(--mui-danger);--glnfr-def-err-br-cl: var(--mui-danger);--glnfr-def-err-bg-cl: rgba(0, 0, 0, .06);--glnfr-def-err-bf-cl: var(--mui-danger);--glnfr-hov-err-lb-cl: var(--mui-danger);--glnfr-hov-err-br-cl: var(--mui-danger);--glnfr-hov-err-bg-cl: rgba(0, 0, 0, .09);--glnfr-hov-err-bf-cl: var(--mui-danger);--glnfr-foc-err-lb-cl: var(--mui-danger);--glnfr-foc-err-br-cl: var(--mui-danger);--glnfr-foc-err-bg-cl: rgba(0, 0, 0, .05);--glnfr-foc-err-bf-cl: var(--mui-danger);--glnfr-foc-err-af-cl: var(--mui-danger);--glnfr-dis-lb-cl: var(--mui-default-dis);--glnfr-dis-br-cl: rgba(0, 0, 0, .26);--glnfr-dis-bg-cl: rgba(0, 0, 0, .12);--glnfr-dis-bf-cl: rgba(0, 0, 0, .42)}app-pl-input-material-ui .ip-material-ui .ip-success .gln-frame:not([dis]):not([err]){--glnfr-foc-lb-cl: hsl(var(--gln-sh-success-h), var(--gln-sh-success-s), 45%);--glnfr-foc-br-cl: hsl(var(--gln-sh-success-h), var(--gln-sh-success-s), 50%);--glnfr-foc-bf-cl: hsl(var(--gln-sh-success-h), var(--gln-sh-success-s), 40%);--glnfr-foc-af-cl: hsl(var(--gln-sh-success-h), var(--gln-sh-success-s), 50%)}app-pl-input-material-ui .ip-material-ui .gln-hint-or-error:not([dis]):not([err]){--glnhe-def-lb-cl: var(--mui-default);--glnhe-foc-lb-cl: var(--mui-default)}app-pl-input-material-ui .ip-material-ui .gln-hint-or-error:not([dis])[err]{--glnhe-def-lb-cl: var(--mui-danger);--glnhe-foc-lb-cl: var(--mui-danger)}app-pl-input-material-ui .ip-material-ui .gln-hint-or-error[dis]{--glnhe-dis-lb-cl: var(--mui-default-dis)}\n"],encapsulation:2,changeDetection:0}),l})();function q(l,o){1&l&&(e.TgZ(0,"div",3),e._UZ(1,"app-pl-input-basic")(2,"hr",4),e.qZA())}function F(l,o){1&l&&(e.TgZ(0,"div",5),e._UZ(1,"app-pl-input-bootstrap")(2,"hr",4),e.qZA())}function S(l,o){1&l&&(e.TgZ(0,"div",6),e._UZ(1,"app-pl-input-material-ui")(2,"hr",4),e.qZA())}const h="PaletteInput",N=[{path:"",component:(()=>{class l{constructor(a){this.ngZone=a,this.showNum="",console.time(h)}ngAfterViewInit(){Promise.resolve().then(()=>{x.R.scrollByFragmentFromPath()}),this.ngZone.onStable.pipe((0,Z.P)()).subscribe(()=>{console.timeEnd(h)})}}return l.\u0275fac=function(a){return new(a||l)(e.Y36(e.R0b))},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-pl-input"]],decls:7,vars:3,consts:[["id","Basic",4,"ngIf"],["id","Bootstrap",4,"ngIf"],["id","MaterialUI",4,"ngIf"],["id","Basic"],["br-tp",""],["id","Bootstrap"],["id","MaterialUI"]],template:function(a,n){1&a&&(e.TgZ(0,"h3"),e._uU(1,"Palette for GlnInput."),e.qZA(),e.YNc(2,q,3,0,"div",0),e.YNc(3,F,3,0,"div",1),e.YNc(4,S,3,0,"div",2),e._UZ(5,"br")(6,"br")),2&a&&(e.xp6(2),e.Q6J("ngIf",!n.showNum||"01"===n.showNum),e.xp6(1),e.Q6J("ngIf",!n.showNum||"02"===n.showNum),e.xp6(1),e.Q6J("ngIf",!n.showNum||"03"===n.showNum))},dependencies:[d.O5,y,I,_],styles:["app-pl-input{display:block}\n"],encapsulation:2,changeDetection:0}),l})()}];let J=(()=>{class l{}return l.\u0275fac=function(a){return new(a||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[b.Bz.forChild(N),b.Bz]}),l})(),k=(()=>{class l{}return l.\u0275fac=function(a){return new(a||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[d.ez,J,v,w,T]}),l})()}}]);