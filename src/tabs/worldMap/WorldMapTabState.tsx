export interface Vector3i {
  x: number;
  y: number;
  z: number;
}

export interface WorldMapTabState {
  topLeft: Vector3i;
  blocks: string[][];
  blockLut: {[block: string]: string};
  mapBlockWidth: number;
  mapBlockLength: number;
}
