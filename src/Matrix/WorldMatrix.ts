//types
import type {
 MatrixChunkData,
 MatrixLoadedChunk,
 MatrixLoadedRegion,
} from "../Meta/Matrix/Matrix.types";
import type { VoxelManager } from "Constructor/Voxels/VoxelManager";
import type { WorldRegionPalette } from "Meta/World/WorldData/World.types.js";
//objects
import { Util } from "../Global/Util.helper.js";

/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export const WorldMatrix = {
 _3dArray: Util.getFlat3DArray(),
 worldBounds: Util.getWorldBounds(),
 voxelByte: Util.getVoxelByte(),
 lightByte: Util.getLightByte(),

 //two minutes
 updateDieTime: 120000,
 loadDieTime: 10000,

 regions: <MatrixLoadedRegion>{},

 chunks: <Record<string, Uint32Array>>{},
 chunkStates: <Record<string, Uint8Array>>{},

 paletteMode: 0,
 globalVoxelPalette: <Record<number, string>>{},
 globalVoxelPaletteRecord: <Record<string, string[]>>{},
 regionVoxelPalettes: <Record<string, Record<number, string>>>{},

 voxelManager: <null | typeof VoxelManager>null,

 lightValueFunctions: {
  r: (value: number) => {
   return WorldMatrix.lightByte.getR(value);
  },
  g: (value: number) => {
   return WorldMatrix.lightByte.getG(value);
  },
  b: (value: number) => {
   return WorldMatrix.lightByte.getB(value);
  },
  s: (value: number) => {
   return WorldMatrix.lightByte.getS(value);
  },
 },

 threadName: "",

 setVoxelManager(voxelManager: typeof VoxelManager) {
  this.voxelManager = voxelManager;
 },

 syncChunkBounds(): void {
  this.worldBounds.syncBoundsWithArrays();
 },

 /**# Await Chunk Load
  * ---
  * Wait for a chunk to loaded into the matrix  for use.
  */
 awaitChunkLoad(x: number, y: number, z: number, timeout = 120000) {
  return Util.createPromiseCheck({
   check: () => {
    return this.getChunk(x, y, z) !== false;
   },
   checkInterval: 10,
   failTimeOut: timeout,
   onFail: () => {
    const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
    console.warn(
     `${this.threadName} could not load the chunk ${chunkKey} in time.`
    );
   },
  });
 },

 __setGlobalVoxelPalette(
  palette: Record<number, string>,
  record: Record<string, string[]>
 ) {
  this.globalVoxelPalette = palette;
  this.globalVoxelPaletteRecord = record;
 },

 __syncRegionData(
  x: number,
  y: number,
  z: number,
  palette: WorldRegionPalette
 ) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  const region = this.regions[regionKey];
  region.palette = palette;
 },

 __removeRegionVoxelPalette(x: number, y: number, z: number) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  if (!this.regionVoxelPalettes[regionKey]) return false;
  delete this.regionVoxelPalettes[regionKey];
 },

 getVoxel(x: number, y: number, z: number) {
  let palette = this.globalVoxelPalette;
  let record = this.globalVoxelPaletteRecord;

  if (this.paletteMode == 1) {
   const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
   const region = this.regions[regionKey];
   if (region && region?.palette) {
    palette = region.palette.palette;
    record = region.palette.record;
   } else {
    return false;
   }
  }

  const numericVoxelId = this.getVoxelNumberID(x, y, z);

  if (numericVoxelId === false) return false;

  if (numericVoxelId == 0) return ["dve:air"];
  if (numericVoxelId == 1) return ["dve:barrier"];
  const paletteId = palette[numericVoxelId];
  return record[paletteId];
 },

 getVoxelData(x: number, y: number, z: number) {
  if (!this.voxelManager) {
   throw new Error(
    `A voxel manager must be set in order for this function to work. `
   );
  }
  const voxelCheck = this.getVoxel(x, y, z);
  if (!voxelCheck) {
   return false;
  }

  if (voxelCheck[0] == "dve:air" || voxelCheck[0] == "dve:barrier")
   return false;
  const voxelData = this.voxelManager.getVoxelData(voxelCheck[0]);
  if (!voxelData) return false;
  return voxelData;
 },

 _createRegion(x: number, y: number, z: number) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  const region = {
   chunks: {},
  };
  this.regions[regionKey] = region;
  return region;
 },

 /**# Set Chunk
  * ---
  * To be only called by the Matrix Hub.
  */
 __setChunk(
  x: number,
  y: number,
  z: number,
  voxelsSAB: SharedArrayBuffer,
  voxelStatesSAB: SharedArrayBuffer,
  heightMapSAB: SharedArrayBuffer,
  minMaxMapSAB: SharedArrayBuffer,
  chunkStateSAB: SharedArrayBuffer
 ) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  let region = this.regions[regionKey];
  if (!region) {
   region = this._createRegion(x, y, z);
  }
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const worldColumnKey = this.worldBounds.getWorldColumnKeyFromObj(chunkPOS);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  if (!region.chunks[worldColumnKey]) region.chunks[worldColumnKey] = {};

  region.chunks[worldColumnKey][chunkKey] = {
   voxels: new Uint32Array(voxelsSAB),
   voxelStates: new Uint32Array(voxelStatesSAB),
   heightMap: new Uint32Array(heightMapSAB),
   minMaxMap: new Uint32Array(minMaxMapSAB),
   chunkStates: new Uint8Array(chunkStateSAB),
   position: [chunkPOS.x, chunkPOS.y, chunkPOS.z],
  };
 },

 getRegion(x: number, y: number, z: number) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  let region = this.regions[regionKey];
  if (!region) return false;
  return region;
 },

 /**# Remove Chunk
  * ---
  * To be only called by the Matrix Hub.
  */
 __removeChunk(x: number, y: number, z: number) {
  const region = this.getRegion(x, y, z);
  if (!region) return false;
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  delete region.chunks[chunkKey];
 },

 getChunk(x: number, y: number, z: number): false | MatrixLoadedChunk {
  const region = this.getRegion(x, y, z);
  if (!region) return false;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const worldColumnKey = this.worldBounds.getWorldColumnKeyFromObj(chunkPOS);

  if (!region.chunks[worldColumnKey]) return false;
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
  if (!region.chunks[worldColumnKey][chunkKey]) return false;
  return region.chunks[worldColumnKey][chunkKey];
 },

 getWorldColumn(x: number, z: number) {
  const region = this.getRegion(x, 0, z);
  if (!region) return false;
  const worldColumnKey = this.worldBounds.getWorldColumnKey(x, z);
  if (!region.chunks[worldColumnKey]) return false;
  return region.chunks[worldColumnKey];
 },

 isChunkLocked(x: number, y: number, z: number) {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) return false;
  return Atomics.load(chunk.chunkStates, 0) == 1;
 },

 lockChunk(x: number, y: number, z: number) {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) return false;
  Atomics.store(chunk.chunkStates, 0, 1);
  return true;
 },

 unLockChunk(x: number, y: number, z: number) {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) return false;
  Atomics.store(chunk.chunkStates, 0, 0);
  return true;
 },

 updateChunkData(
  x: number,
  y: number,
  z: number,
  run: (chunk: { voxels: Uint32Array; chunkStates: Uint8Array }) => {}
 ): false | Promise<boolean> {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) {
   return false;
  }
  return Util.createPromiseCheck({
   check: () => {
    return !this.isChunkLocked(x, y, z);
   },
   onReady: () => {
    run(chunk);
   },
   checkInterval: 10,
   failTimeOut: this.updateDieTime,
   onFail: () => {
    const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
    console.warn(
     `${this.threadName} could not load the chunk ${chunkKey} in time.`
    );
   },
  });
 },

 setData(x: number, y: number, z: number, data: number) {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) return false;
  this._3dArray.setValueUseObjSafe(
   this.worldBounds.getVoxelPosition(x, y, z),
   chunk.voxels,
   data
  );
 },

 getData(x: number, y: number, z: number) {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) return -1;
  return this._3dArray.getValueUseObjSafe(
   this.worldBounds.getVoxelPosition(x, y, z),
   chunk.voxels
  );
 },

 getVoxelNumberID(x: number, y: number, z: number) {
  const rawVoxelData = this.getData(x, y, z);
  if (rawVoxelData < 0) return false;
  return this.voxelByte.getId(rawVoxelData);
 },

 getLight(x: number, y: number, z: number): number {
  const rawVoxelData = this.getData(x, y, z);
  if (rawVoxelData < 0) return 0;

  if (rawVoxelData >= 0) {
   const voxelId = this.voxelByte.getId(rawVoxelData);
   if (voxelId == 0) {
    return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
   }
   if (voxelId == 1) {
    return -1;
   } else {
    const voxel = this.getVoxel(x, y, z);
    if (!voxel) return -1;
    if (!this.voxelManager) {
     return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
    } else {
     const voxelData = this.voxelManager.getVoxel(voxel[0]);

     if (voxelData.data.lightSource && voxelData.data.lightValue) {
      return voxelData.data.lightValue;
     }
     if (voxelData.data.substance == "solid") {
      return -1;
     }
     return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
    }
   }
  }
  return -1;
 },

 setAir(x: number, y: number, z: number, lightValue: number) {
  let data = this.lightByte.encodeLightIntoVoxelData(0, lightValue);
  this.setData(x, y, z, data);
 },

 setFullSun(x: number, y: number, z: number) {
  const value = this.getLight(x, y, z);
  const newValue = this.lightByte.setS(0xf, value);
  this.setLight(x, y, z, newValue);
 },

 setLight(x: number, y: number, z: number, lightValue: number) {
  let data = this.getData(x, y, z);
  if (data === -1) return;
  data = this.lightByte.encodeLightIntoVoxelData(data, lightValue);
  this.setData(x, y, z, data);
 },

 getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s") {
  return this.lightValueFunctions[type](this.getLight(x, y, z));
 },

 sameVoxel(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
  cz: number
 ) {
  const v1 = this.getData(x, y, z);
  const v2 = this.getData(cx, cy, cz);
  if (v1 < 0 || v2 < 0) return false;
  const v1ID = this.voxelByte.getId(v1);
  const v2ID = this.voxelByte.getId(v2);
  return v1ID == v2ID;
 },
};
