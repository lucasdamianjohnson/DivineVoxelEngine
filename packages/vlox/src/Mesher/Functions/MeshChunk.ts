import { LocationData } from "../../Math";
import type { SetChunkMeshTask } from "../../Renderer/Renderer.types.js";
//data
import { WorldSpaces } from "../../World/WorldSpaces.js";
//tools
import { VoxelGeometryLookUp } from "../Models//VoxelGeometryLookUp.js";
import { CompactVoxelMesh } from "../Functions/CompactVoxelMesh.js";
import { WorldCursor } from "../../World/Cursor/WorldCursor.js";
import { ChunkCursor } from "../../World/Cursor/ChunkCursor.js";
import { RenderedMaterials } from "../RenderedMaterials"
import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool.js";
import { VoxelModelConstructorRegister } from "../Models/VoxelModelConstructorRegister.js";
import { ChunkHeightMap } from "../../World/Chunk/ChunkHeightMap.js";
import { WorldRegister } from "../../World/WorldRegister.js";

const chunkCursor = new ChunkCursor();
const worldCursor = new WorldCursor();

function process(
  x: number,
  y: number,
  z: number,
  doSecondCheck = false
): boolean {
  const voxel = chunkCursor.getVoxel(x, y, z);
  if (!voxel) return false;
  if (!voxel.isRenderable()) return false;

  let hasVoxel = false;
  voxel.setSecondary(doSecondCheck);
  if (!doSecondCheck) {
    if (voxel.hasSecondaryVoxel()) {
      hasVoxel = process(x, y, z, true);
    }
  }
  const constructor = VoxelModelConstructorRegister.getConstructor(
    voxel.getStringId()
  );
  if (!constructor) {
    throw new Error(
      `Could not find constructor ${voxel.getId()} | ${voxel.getName()} `
    );
  }

  const mesher = RenderedMaterials.meshers.get(
    voxel.getRenderedMaterialStringId()
  );

  if (!mesher) {
    throw new Error(
      `Could not find material for ${voxel.getId()} | ${voxel.getName()} | ${constructor?.id} | ${voxel.getMaterial()} | ${voxel.getRenderedMaterialStringId()}`
    );
  }

  mesher.origin.x = chunkCursor._voxelPosition.x;
  mesher.origin.y = chunkCursor._voxelPosition.y;
  mesher.origin.z = chunkCursor._voxelPosition.z;
  mesher.position.x = x;
  mesher.position.y = y;
  mesher.position.z = z;
  mesher.voxel = voxel;
  mesher.nVoxel = worldCursor;
  mesher.startConstruction();
  constructor.process(mesher);
  mesher.endConstruction();
  mesher.resetVars();
  return true;
}

export function MeshChunk(
  location: LocationData
): [task: SetChunkMeshTask, transfers: any[]] | null {
  const [dimension, cx, cy, cz] = location;
  WorldRegister.setDimension(dimension);
  const chunk = WorldRegister.chunk.get(cx, cy, cz);

  if (!chunk) return null;

  ChunkHeightMap.setChunk(chunk);

  worldCursor.setFocalPoint(...location);
  chunkCursor.setChunk(...location);

  let [minY, maxY] = ChunkHeightMap.getMinMax();
  const maxX = WorldSpaces.chunk.bounds.x;
  const maxZ = WorldSpaces.chunk.bounds.z;

  if (Math.abs(minY) == Infinity && Math.abs(maxY) == Infinity) return null;
  VoxelGeometryLookUp.start(dimension, location[1], location[2], location[3]);
  for (const [substance, mesher] of RenderedMaterials.meshers) {
    mesher.bvhTool.reset();
  }
  for (let y = minY; y <= maxY; y++) {
    let foundVoxels = false;
    for (let x = 0; x < maxX; x++) {
      for (let z = 0; z < maxZ; z++) {
        if (process(x + cx, y + cy, z + cz)) {
          foundVoxels = true;
        }
      }
    }
    ChunkHeightMap.setVoxel(y, foundVoxels);
    ChunkHeightMap.setDirty(y, false);
  }
  VoxelGeometryLookUp.stop();
  const transfers: any[] = [];
  const chunkEffects: SetChunkMeshTask[2] = [];

  const chunks = <SetChunkMeshTask>[location, [] as any, chunkEffects, 0];

  const meshed: VoxelMesherDataTool[] = [];
  for (const [substance, mesher] of RenderedMaterials.meshers) {
    for (const e in mesher.effects) {
      const float = Float32Array.from(mesher.effects[e]);
      transfers.push(float.buffer);
      chunkEffects.push([e, float]);
    }
    if (mesher.mesh!.positions.length == 0) {
      mesher.resetAll();
      continue;
    }
    meshed.push(mesher);
  }

  const compactMesh = CompactVoxelMesh(meshed);
  transfers.push(
    ...(compactMesh[0] == 0
      ? [compactMesh[1]]
      : [
          compactMesh[1],
          compactMesh[2].buffer,
          compactMesh[3].buffer,
          compactMesh[4].buffer,
        ])
  );
  chunks[1] = compactMesh;
  for (const mesher of meshed) {
    mesher.resetAll();
  }

  return [chunks, transfers];
}
