export interface Glyph {
  name: string;
  char: string;
  code: string;
}

export interface GlyphGroup {
  groupName: string;
  glyphs: Glyph[];
}
