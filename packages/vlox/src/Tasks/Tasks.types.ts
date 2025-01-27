import type { LocationData } from "../Math/index.js";
import type { Vec3Array } from "@amodx/math";
import type { RawVoxelData } from "../Voxels/Types/Voxel.types.js";
import { ChunkData, ColumnData } from "World/index.js";

export type WorldLockTasks = [
  dimension: string,
  start: Vec3Array,
  end: Vec3Array,
];

export type VoxelUpdateTasks = [location: LocationData, raw: RawVoxelData];

export type RunRebuildTasks = [buildQueue: string];

export type RunBuildQueue = [dimension: string, chunks: Vec3Array[]];

export type GenerateTasks = [location: LocationData, data: any];

export type ExplosionTasks = [location: LocationData, radius: number];

export type LoadChunkDataTasks = [location: LocationData, chunk: ChunkData];

export type LoadColumnDataTasks = [location: LocationData, column: ColumnData];
