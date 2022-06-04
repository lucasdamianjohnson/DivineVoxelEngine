import type { ChunkData } from "Meta/Chunks/Chunk.types";
import { MatrixRegionData } from "Meta/Matrix/Matrix.types.js";
/**# Matrix
 * ---
 * Holds all shared array buffer.
 */
export declare const Matrix: {
    updateDieTime: number;
    worldBounds: {
        __maxChunkYSize: number;
        bounds: {
            MinZ: number;
            MaxZ: number;
            MinX: number;
            MaxX: number;
            MinY: number;
            MaxY: number;
        };
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
        chunkArea: number;
        regionXPow2: number;
        regionYPow2: number;
        regionZPow2: number;
        regionXSize: number;
        regionYSize: number;
        regionZSize: number;
        __regionPosition: {
            x: number;
            y: number;
            z: number;
        };
        __worldColumnPosition: {
            x: number;
            z: number;
        };
        __chunkPosition: {
            x: number;
            y: number;
            z: number;
        };
        __voxelPosition: {
            x: number;
            y: number;
            z: number;
        };
        syncBoundsWithArrays(): void;
        setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        getRegionPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkKey(chunkPOS: import("../../Meta/Util.types.js").Position3Matrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("../../Meta/Util.types.js").Position3Matrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../../Meta/Util.types.js").Position3Matrix): {
            x: number;
            y: number;
            z: number;
        };
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getWorldColumnKeyFromObj(position: import("../../Meta/Util.types.js").Position3Matrix): string;
        getWorldColumnKey(x: number, z: number): string;
        getWorldColumnPosition(x: number, z: number): {
            x: number;
            z: number;
        };
    };
    regions: Record<string, MatrixRegionData>;
    isChunkInMatrix(x: number, y: number, z: number): boolean;
    isRegionInMatrix(x: number, y: number, z: number): boolean;
    isChunkLocked(x: number, y: number, z: number): boolean;
    lockChunk(x: number, y: number, z: number): boolean;
    unLockChunk(x: number, y: number, z: number): boolean;
    updateChunkData(x: number, y: number, z: number, run: (chunk: ChunkData) => {}): false | Promise<boolean>;
    releaseChunk(x: number, y: number, z: number): boolean | undefined;
    createMatrixChunkData(x: number, y: number, z: number): SharedArrayBuffer[] | false;
    getMatrixChunkData(x: number, y: number, z: number): false | {
        chunkStates: Uint8Array;
        chunkStatesSAB: SharedArrayBuffer;
        voxelsSAB: SharedArrayBuffer;
        voxelsStatesSAB: SharedArrayBuffer;
        minMaxMapSAB: SharedArrayBuffer;
        heightMapSAB: SharedArrayBuffer;
    };
    getMatrixRegionData(x: number, y: number, z: number): false | MatrixRegionData;
    addRegionToMatrix(x: number, y: number, z: number): MatrixRegionData;
    removeRegionFromMatrix(x: number, y: number, z: number): false | undefined;
    deleteThreadFromRegion(threadId: string, x: number, y: number, z: number): false | undefined;
};
