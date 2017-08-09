export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface OnlinePlayerMetadata {
  id: string;
  name: string;
  color: RgbaColor;
}
