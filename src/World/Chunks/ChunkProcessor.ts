import type { Flat3DArray } from "Global/Util/Flat3DArray.js";
import type { VoxelByte } from "Global/Util/VoxelByte.js";
import type {
 ChunkData,
 ChunkTemplate,
 FullChunkTemplate,
} from "Meta/Chunks/Chunk.types.js";
import { ChunkBound } from "Meta/World/ChunkBound.interface.js";
import type {
 VoxelInteface,
 VoxelSubstanceType,
} from "Meta/Voxels/Voxel.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import type { WorldData } from "World/WorldData/WorldData.js";

/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export class ChunkProcessor {
 worldBottomY = 0;
 worldTopY = 256;

 chunkTemplates: Record<number, Record<number, number[][]>> = {};
 voxelByte: VoxelByte;
 _3dArray: Flat3DArray;
 exposedFaces: number[] = [];
 worldData: WorldData;

 constructor(private DVEW: DivineVoxelEngineWorld) {
  this.worldData = DVEW.worldData;
  this.voxelByte = DVEW.UTIL.getVoxelByte();
  this._3dArray = DVEW.UTIL.getFlat3DArray();
 }

 syncChunkBounds(): void {
  this.DVEW.worldBounds.syncBoundsWithFlat3DArray(this._3dArray);
 }

 getBaseTemplateNew(): FullChunkTemplate {
  return {
   solid: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   transparent: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   flora: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   fluid: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   magma: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
  };
 }
 async makeAllChunkTemplatesAsync(
  chunk: ChunkData,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ): Promise<FullChunkTemplate> {
  const template: FullChunkTemplate = this.getBaseTemplateNew();
  const voxels = chunk.voxels;
  const min = chunk.maxMinHeight[0];
  const max = chunk.maxMinHeight[1];
  let maxX = this.DVEW.worldBounds.chunkXSize;
  let maxZ = this.DVEW.worldBounds.chunkZSize;
  let maxY = this.DVEW.worldBounds.chunkYSize;

  for (let x = 0; x < maxX; x++) {
   for (let z = 0; z < maxZ; z++) {
    for (let y = 0; y < maxY; y++) {
     const voxelData = this._3dArray.getValue(x, y, z, voxels);

     if (this.voxelByte.getId(voxelData) == 0) continue;
     const voxelCheck = this.DVEW.worldData.getVoxel(
      chunkX + x,
      chunkY + y,
      chunkZ + z
     );
     if (!voxelCheck) continue;
     const voxel: VoxelInteface = voxelCheck[0];
     const voxelState = voxelCheck[1];

     const baseTemplate = template[voxel.data.substance];

     let faceBit = 0;

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY + 1,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 0);
      this.exposedFaces[0] = 1;
     } else {
      this.exposedFaces[0] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY - 1,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 1);
      this.exposedFaces[1] = 1;
     } else {
      this.exposedFaces[1] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX + 1,
       y + chunkY,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 2);
      this.exposedFaces[2] = 1;
     } else {
      this.exposedFaces[2] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX - 1,
       y + chunkY,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 3);
      this.exposedFaces[3] = 1;
     } else {
      this.exposedFaces[3] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY,
       z + chunkZ - 1
      )
     ) {
      faceBit = faceBit | (1 << 4);
      this.exposedFaces[4] = 1;
     } else {
      this.exposedFaces[4] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY,
       z + chunkZ + 1
      )
     ) {
      faceBit = faceBit | (1 << 5);
      this.exposedFaces[5] = 1;
     } else {
      this.exposedFaces[5] = 0;
     }

     if (faceBit == 0) continue;

     voxel.process({
      voxelState: voxelState,
      voxelData: voxelData,
      exposedFaces: this.exposedFaces,
      shapeTemplate: baseTemplate.shapeTemplate,
      shapeStateTemplate: baseTemplate.shapeStateTemplate,
      uvTemplate: baseTemplate.uvTemplate,
      colorTemplate: baseTemplate.colorTemplate,
      aoTemplate: baseTemplate.aoTemplate,
      lightTemplate: baseTemplate.lightTemplate,
      chunkX: chunkX,
      chunkY: chunkY,
      chunkZ: chunkZ,
      x: x,
      y: y,
      z: z,
     });

     // baseTemplate.shapeTemplate.push(voxel.getShapeId(voxelPaletteData));
     baseTemplate.positionTemplate.push(x, y, z);
     baseTemplate.faceTemplate.push(faceBit);
    }
   }
  }

  this.DVEW.builderCommManager.requestFullChunkBeBuiltO(
   chunkX,
   chunkY,
   chunkZ,
   template
  );
  this.DVEW.fluidBuilderComm.setChunkTemplateForFluidMesh(
   chunkX,
   chunkY,
   chunkZ,
   template.fluid
  );

  return template;
 }
 makeAllChunkTemplates(
  chunk: ChunkData,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ): FullChunkTemplate {
  const template: FullChunkTemplate = this.getBaseTemplateNew();
  const voxels = chunk.voxels;
  const min = chunk.maxMinHeight[0];
  const max = chunk.maxMinHeight[1];
  let maxX = this.DVEW.worldBounds.chunkXSize;
  let maxZ = this.DVEW.worldBounds.chunkZSize;
  let maxY = this.DVEW.worldBounds.chunkYSize;

  for (let x = 0; x < maxX; x++) {
   for (let z = 0; z < maxZ; z++) {
    for (let y = 0; y < maxY; y++) {
     const voxelData = this._3dArray.getValue(x, y, z, voxels);
     if (this.voxelByte.getId(voxelData) == 0) continue;
     const voxelCheck = this.DVEW.worldData.getVoxel(
      chunkX + x,
      chunkY + y,
      chunkZ + z
     );

     if (!voxelCheck) continue;
     const voxel: VoxelInteface = voxelCheck[0];
     const voxelState = voxelCheck[1];

     const baseTemplate = template[voxel.data.substance];

     let faceBit = 0;

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY + 1,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 0);
      this.exposedFaces[0] = 1;
     } else {
      this.exposedFaces[0] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY - 1,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 1);
      this.exposedFaces[1] = 1;
     } else {
      this.exposedFaces[1] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX + 1,
       y + chunkY,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 2);
      this.exposedFaces[2] = 1;
     } else {
      this.exposedFaces[2] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX - 1,
       y + chunkY,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 3);
      this.exposedFaces[3] = 1;
     } else {
      this.exposedFaces[3] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY,
       z + chunkZ - 1
      )
     ) {
      faceBit = faceBit | (1 << 4);
      this.exposedFaces[4] = 1;
     } else {
      this.exposedFaces[4] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY,
       z + chunkZ + 1
      )
     ) {
      faceBit = faceBit | (1 << 5);
      this.exposedFaces[5] = 1;
     } else {
      this.exposedFaces[5] = 0;
     }

     if (faceBit == 0) continue;

     voxel.process({
      voxelState: voxelState,
      voxelData: voxelData,
      exposedFaces: this.exposedFaces,
      shapeTemplate: baseTemplate.shapeTemplate,
      shapeStateTemplate: baseTemplate.shapeStateTemplate,
      uvTemplate: baseTemplate.uvTemplate,
      colorTemplate: baseTemplate.colorTemplate,
      aoTemplate: baseTemplate.aoTemplate,
      lightTemplate: baseTemplate.lightTemplate,
      chunkX: chunkX,
      chunkY: chunkY,
      chunkZ: chunkZ,
      x: x,
      y: y,
      z: z,
     });

     // baseTemplate.shapeTemplate.push(voxel.getShapeId(voxelPaletteData));
     baseTemplate.positionTemplate.push(x, y, z);
     baseTemplate.faceTemplate.push(faceBit);
    }
   }
  }

  this.DVEW.builderCommManager.requestFullChunkBeBuiltO(
   chunkX,
   chunkY,
   chunkZ,
   template
  );
  this.DVEW.fluidBuilderComm.setChunkTemplateForFluidMesh(
   chunkX,
   chunkY,
   chunkZ,
   template.fluid
  );

  return template;
 }
}
