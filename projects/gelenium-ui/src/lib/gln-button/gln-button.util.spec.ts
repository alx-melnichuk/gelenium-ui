import { GlnButtonUtil } from './gln-button.util';

class Res {
  public static getPrmByContained(size: number, lineHeight: number): { borderRadius: number; paddingLeft: number } {
    const borderRadius = Math.round(0.1 * size * 100) / 100;
    const paddingLeft = Math.round(0.3636 * size * 100) / 100;
    return { borderRadius, paddingLeft };
  }
  public static getPrmByOutlined(size: number, lineHeight: number): { borderRadius: number; paddingLeft: number } {
    const borderRadius = Math.round(0.1 * size * 100) / 100;
    const paddingLeft = Math.round(0.3409 * size * 100) / 100;
    return { borderRadius, paddingLeft };
  }
  public static getPrmByText(size: number, lineHeight: number): { borderRadius: number; paddingLeft: number } {
    const borderRadius = Math.round(0.1 * size * 100) / 100;
    const paddingLeft = Math.round(0.2045 * size * 100) / 100;
    return { borderRadius, paddingLeft };
  }
}

describe('GlnPaginationUtil.createPageBuffer()', () => {
  // exterior "contained"

  const res_cont_38_21 = Res.getPrmByContained(38, 21);
  it(`exterior="contained", size=38, lineHeight=21 => ${JSON.stringify(res_cont_38_21)}`, () => {
    expect(GlnButtonUtil.getCssParams('contained', 38, 21)).toEqual(res_cont_38_21);
  });

  const res_cont_38_24 = Res.getPrmByContained(38, 24);
  it(`exterior="contained", size=38, lineHeight=24 => ${JSON.stringify(res_cont_38_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('contained', 38, 24)).toEqual(res_cont_38_24);
  });

  const res_cont_44_24 = Res.getPrmByContained(44, 24);
  it(`exterior="contained", size=44, lineHeight=24 => ${JSON.stringify(res_cont_44_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('contained', 44, 24)).toEqual(res_cont_44_24);
  });

  const res_cont_50_24 = Res.getPrmByContained(50, 24);
  it(`exterior="contained", size=50, lineHeight=24 => ${JSON.stringify(res_cont_50_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('contained', 50, 24)).toEqual(res_cont_50_24);
  });

  const res_cont_56_24 = Res.getPrmByContained(56, 24);
  it(`exterior="contained", size=56, lineHeight=24 => ${JSON.stringify(res_cont_56_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('contained', 56, 24)).toEqual(res_cont_56_24);
  });

  const res_cont_62_24 = Res.getPrmByContained(62, 24);
  it(`exterior="contained", size=62, lineHeight=24 => ${JSON.stringify(res_cont_62_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('contained', 62, 24)).toEqual(res_cont_62_24);
  });

  const res_cont_62_27 = Res.getPrmByContained(62, 27);
  it(`exterior="contained", size=62, lineHeight=27 => ${JSON.stringify(res_cont_62_27)}`, () => {
    expect(GlnButtonUtil.getCssParams('contained', 62, 27)).toEqual(res_cont_62_27);
  });

  const res_cont_68_24 = Res.getPrmByContained(68, 24);
  it(`exterior="contained", size=68, lineHeight=24 => ${JSON.stringify(res_cont_68_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('contained', 68, 24)).toEqual(res_cont_68_24);
  });

  const res_cont_68_27 = Res.getPrmByContained(68, 27);
  it(`exterior="contained", size=68, lineHeight=27 => ${JSON.stringify(res_cont_68_27)}`, () => {
    expect(GlnButtonUtil.getCssParams('contained', 68, 27)).toEqual(res_cont_68_27);
  });

  const res_cont_68_30 = Res.getPrmByContained(68, 30);
  it(`exterior="contained", size=68, lineHeight=30 => ${JSON.stringify(res_cont_68_30)}`, () => {
    expect(GlnButtonUtil.getCssParams('contained', 68, 30)).toEqual(res_cont_68_30);
  });

  // exterior "outlined"

  const res_outl_38_21 = Res.getPrmByOutlined(38, 21);
  it(`exterior="outlined", size=38, lineHeight=21 => ${JSON.stringify(res_outl_38_21)}`, () => {
    expect(GlnButtonUtil.getCssParams('outlined', 38, 21)).toEqual(res_outl_38_21);
  });

  const res_outl_38_24 = Res.getPrmByOutlined(38, 24);
  it(`exterior="outlined", size=38, lineHeight=24 => ${JSON.stringify(res_outl_38_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('outlined', 38, 24)).toEqual(res_outl_38_24);
  });

  const res_outl_44_24 = Res.getPrmByOutlined(44, 24);
  it(`exterior="outlined", size=44, lineHeight=24 => ${JSON.stringify(res_outl_44_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('outlined', 44, 24)).toEqual(res_outl_44_24);
  });

  const res_outl_50_24 = Res.getPrmByOutlined(50, 24);
  it(`exterior="outlined", size=50, lineHeight=24 => ${JSON.stringify(res_outl_50_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('outlined', 50, 24)).toEqual(res_outl_50_24);
  });

  const res_outl_56_24 = Res.getPrmByOutlined(56, 24);
  it(`exterior="outlined", size=56, lineHeight=24 => ${JSON.stringify(res_outl_56_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('outlined', 56, 24)).toEqual(res_outl_56_24);
  });

  const res_outl_62_24 = Res.getPrmByOutlined(62, 24);
  it(`exterior="outlined", size=62, lineHeight=24 => ${JSON.stringify(res_outl_62_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('outlined', 62, 24)).toEqual(res_outl_62_24);
  });

  const res_outl_62_27 = Res.getPrmByOutlined(62, 27);
  it(`exterior="outlined", size=62, lineHeight=27 => ${JSON.stringify(res_outl_62_27)}`, () => {
    expect(GlnButtonUtil.getCssParams('outlined', 62, 27)).toEqual(res_outl_62_27);
  });

  const res_outl_68_24 = Res.getPrmByOutlined(68, 24);
  it(`exterior="outlined", size=68, lineHeight=24 => ${JSON.stringify(res_outl_68_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('outlined', 68, 24)).toEqual(res_outl_68_24);
  });

  const res_outl_68_27 = Res.getPrmByOutlined(68, 27);
  it(`exterior="outlined", size=68, lineHeight=27 => ${JSON.stringify(res_outl_68_27)}`, () => {
    expect(GlnButtonUtil.getCssParams('outlined', 68, 27)).toEqual(res_outl_68_27);
  });

  const res_outl_68_30 = Res.getPrmByOutlined(68, 30);
  it(`exterior="outlined", size=68, lineHeight=30 => ${JSON.stringify(res_outl_68_30)}`, () => {
    expect(GlnButtonUtil.getCssParams('outlined', 68, 30)).toEqual(res_outl_68_30);
  });

  // exterior "text"

  const res_text_38_21 = Res.getPrmByText(38, 21);
  it(`exterior="text", size=38, lineHeight=21 => ${JSON.stringify(res_text_38_21)}`, () => {
    expect(GlnButtonUtil.getCssParams('text', 38, 21)).toEqual(res_text_38_21);
  });

  const res_text_38_24 = Res.getPrmByText(38, 24);
  it(`exterior="text", size=38, lineHeight=24 => ${JSON.stringify(res_text_38_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('text', 38, 24)).toEqual(res_text_38_24);
  });

  const res_text_44_24 = Res.getPrmByText(44, 24);
  it(`exterior="text", size=44, lineHeight=24 => ${JSON.stringify(res_text_44_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('text', 44, 24)).toEqual(res_text_44_24);
  });

  const res_text_50_24 = Res.getPrmByText(50, 24);
  it(`exterior="text", size=50, lineHeight=24 => ${JSON.stringify(res_text_50_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('text', 50, 24)).toEqual(res_text_50_24);
  });

  const res_text_56_24 = Res.getPrmByText(56, 24);
  it(`exterior="text", size=56, lineHeight=24 => ${JSON.stringify(res_text_56_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('text', 56, 24)).toEqual(res_text_56_24);
  });

  const res_text_62_24 = Res.getPrmByText(62, 24);
  it(`exterior="text", size=62, lineHeight=24 => ${JSON.stringify(res_text_62_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('text', 62, 24)).toEqual(res_text_62_24);
  });

  const res_text_62_27 = Res.getPrmByText(62, 27);
  it(`exterior="text", size=62, lineHeight=27 => ${JSON.stringify(res_text_62_27)}`, () => {
    expect(GlnButtonUtil.getCssParams('text', 62, 27)).toEqual(res_text_62_27);
  });

  const res_text_68_24 = Res.getPrmByText(68, 24);
  it(`exterior="text", size=68, lineHeight=24 => ${JSON.stringify(res_text_68_24)}`, () => {
    expect(GlnButtonUtil.getCssParams('text', 68, 24)).toEqual(res_text_68_24);
  });

  const res_text_68_27 = Res.getPrmByText(68, 27);
  it(`exterior="text", size=68, lineHeight=27 => ${JSON.stringify(res_text_68_27)}`, () => {
    expect(GlnButtonUtil.getCssParams('text', 68, 27)).toEqual(res_text_68_27);
  });

  const res_text_68_30 = Res.getPrmByText(68, 30);
  it(`exterior="text", size=68, lineHeight=30 => ${JSON.stringify(res_text_68_30)}`, () => {
    expect(GlnButtonUtil.getCssParams('text', 68, 30)).toEqual(res_text_68_30);
  });

  //
});
