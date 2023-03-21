import { ElementRef } from '@angular/core';
import { GlnOrnamentOwnerUtil } from './gln-ornament-owner.util';

class Prm {
  public static createRef(width: number): ElementRef<HTMLElement> {
    const prm = { nativeElement: { offsetWidth: width } };
    return prm as ElementRef<HTMLElement>;
  }
}

class Res {
  public static getPrmByAdd(list: ElementRef<HTMLElement>[], elemRef: ElementRef<HTMLElement>): number | null {
    let isExist: boolean = false;
    let ornamentWidth: number = 0;
    for (let idx = 0; idx < list.length; idx++) {
      isExist = !isExist ? list[idx] === elemRef : isExist;
      ornamentWidth = ornamentWidth + list[idx].nativeElement.offsetWidth || 0;
    }
    if (!isExist) {
      ornamentWidth = ornamentWidth + elemRef.nativeElement.offsetWidth;
    }
    return 0 === ornamentWidth ? null : ornamentWidth;
  }
  public static getPrmByDel(list: ElementRef<HTMLElement>[], elemRef: ElementRef<HTMLElement>): number | null {
    let isExist: boolean = false;
    let ornamentWidth: number = 0;
    for (let idx = 0; idx < list.length; idx++) {
      isExist = !isExist ? list[idx] === elemRef : isExist;
      ornamentWidth = ornamentWidth + list[idx].nativeElement.offsetWidth || 0;
    }
    if (isExist) {
      ornamentWidth = ornamentWidth - elemRef.nativeElement.offsetWidth;
    }
    return 0 === ornamentWidth ? null : ornamentWidth;
  }
}

describe('GlnOrnamentOwnerUtil.getWidthAllOrnaments', () => {
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  // ** Adding an element **

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // ** Adding an element with a width greater than zero. **

  // Adding a new element.
  const prm_11 = Prm.createRef(10);
  const res_11 = Res.getPrmByAdd([], prm_11);
  it(`([], false, {width: 10}) => ${JSON.stringify(res_11)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments([], false, prm_11)).toEqual(res_11);
  });

  // Adding an element that is already in the list.
  const prm_12 = Prm.createRef(10);
  const prm_12_list = [prm_12];
  const res_12 = Res.getPrmByAdd(prm_12_list, prm_12);
  it(`([{width: 10}], false, {width: 10}) => ${JSON.stringify(res_12)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_12_list, false, prm_12)).toEqual(res_12);
  });

  // Adding an element that is already in the list.
  const prm_13 = Prm.createRef(10);
  const prm_13_list = [Prm.createRef(20), Prm.createRef(20), prm_13];
  const res_13 = Res.getPrmByAdd(prm_13_list, prm_13);
  it(`([{width: 20},{width: 20},{width: 10}], false, {width: 10}) => ${JSON.stringify(res_13)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_13_list, false, prm_13)).toEqual(res_13);
  });

  // Adding a new element to the list of other elements.
  const prm_14 = Prm.createRef(30);
  const prm_14_list = [Prm.createRef(20), Prm.createRef(20)];
  const res_14 = Res.getPrmByAdd(prm_14_list, prm_14);
  it(`([{width: 20},{width: 20}], false, {width: 30}) => ${JSON.stringify(res_14)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_14_list, false, prm_14)).toEqual(res_14);
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // ** Adding an element with a width of 0. **

  // Adding a new element with a width of 0.
  const prm_21 = Prm.createRef(0);
  const res_21 = Res.getPrmByAdd([], prm_21);
  it(`([], false, {width: 10}) => ${JSON.stringify(res_21)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments([], false, prm_21)).toEqual(res_21);
  });

  // Adding an element with a width of 0 that is already in the list.
  const prm_22 = Prm.createRef(0);
  const prm_22_list = [prm_22];
  const res_22 = Res.getPrmByAdd(prm_22_list, prm_22);
  it(`([{width: 10}], false, {width: 0}) => ${JSON.stringify(res_22)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_22_list, false, prm_22)).toEqual(res_22);
  });

  // Adding an element with a width of 0 that is already in the list.
  const prm_23 = Prm.createRef(0);
  const prm_23_list = [Prm.createRef(20), Prm.createRef(20), prm_23];
  const res_23 = Res.getPrmByAdd(prm_23_list, prm_23);
  it(`([{width: 20},{width: 20},{width: 0}], false, {width: 0}) => ${JSON.stringify(res_23)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_23_list, false, prm_23)).toEqual(res_23);
  });

  // Adding a new element with a width of 0 to the list of other elements.
  const prm_24 = Prm.createRef(0);
  const prm_24_list = [Prm.createRef(20), Prm.createRef(20)];
  const res_24 = Res.getPrmByAdd(prm_24_list, prm_24);
  it(`([{width: 20},{width: 20}], false, {width: 0}) => ${JSON.stringify(res_24)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_24_list, false, prm_24)).toEqual(res_24);
  });

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  // ** Removing an element **

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // ** Adding an element with a width greater than zero. **

  // Adding a new element.
  const prm_31 = Prm.createRef(10);
  const res_31 = Res.getPrmByDel([], prm_31);
  it(`([], true, {width: 10}) => ${JSON.stringify(res_31)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments([], true, prm_31)).toEqual(res_31);
  });

  // Removing an element that is already in the list.
  const prm_32 = Prm.createRef(10);
  const prm_32_list = [prm_32];
  const res_32 = Res.getPrmByDel(prm_32_list, prm_32);
  it(`([{width: 10}], true, {width: 10}) => ${JSON.stringify(res_32)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_32_list, true, prm_32)).toEqual(res_32);
  });

  // Removing an element that is already in the list.
  const prm_33 = Prm.createRef(10);
  const prm_33_list = [Prm.createRef(20), Prm.createRef(20), prm_33];
  const res_33 = Res.getPrmByDel(prm_33_list, prm_33);
  it(`([{width: 20},{width: 20},{width: 10}], true, {width: 10}) => ${JSON.stringify(res_33)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_33_list, true, prm_33)).toEqual(res_33);
  });

  // Removing a new element to the list of other elements.
  const prm_34 = Prm.createRef(30);
  const prm_34_list = [Prm.createRef(20), Prm.createRef(20)];
  const res_34 = Res.getPrmByDel(prm_34_list, prm_34);
  it(`([{width: 20},{width: 20}], true, {width: 30}) => ${JSON.stringify(res_34)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_34_list, true, prm_34)).toEqual(res_34);
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // ** Removing an element with a width of 0. **

  // Removing a new element with a width of 0.
  const prm_41 = Prm.createRef(0);
  const res_41 = Res.getPrmByDel([], prm_41);
  it(`([], true, {width: 10}) => ${JSON.stringify(res_41)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments([], true, prm_41)).toEqual(res_41);
  });

  // Removing an element with a width of 0 that is already in the list.
  const prm_42 = Prm.createRef(0);
  const prm_42_list = [prm_42];
  const res_42 = Res.getPrmByDel(prm_42_list, prm_42);
  it(`([{width: 10}], true, {width: 0}) => ${JSON.stringify(res_42)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_42_list, true, prm_42)).toEqual(res_42);
  });

  // Removing an element with a width of 0 that is already in the list.
  const prm_43 = Prm.createRef(0);
  const prm_43_list = [Prm.createRef(20), Prm.createRef(20), prm_43];
  const res_43 = Res.getPrmByDel(prm_43_list, prm_43);
  it(`([{width: 20},{width: 20},{width: 0}], true, {width: 0}) => ${JSON.stringify(res_43)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_43_list, true, prm_43)).toEqual(res_43);
  });

  // Removing a new element with a width of 0 to the list of other elements.
  const prm_44 = Prm.createRef(0);
  const prm_44_list = [Prm.createRef(20), Prm.createRef(20)];
  const res_44 = Res.getPrmByDel(prm_44_list, prm_44);
  it(`([{width: 20},{width: 20}], true, {width: 0}) => ${JSON.stringify(res_44)}`, () => {
    expect(GlnOrnamentOwnerUtil.getWidthAllOrnaments(prm_44_list, true, prm_44)).toEqual(res_44);
  });

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
});
