import type { RawVoxelData, VoxelTemplateSubstanceType } from "Meta/index.js";
import { ChunkDataTool } from "./WorldData/ChunkDataTool.js";
import { HeightMapTool } from "./WorldData/HeightMapTool.js";
import { DataToolBase } from "../Classes/DataToolBase.js";
import { ColumnDataTool } from "./WorldData/ColumnDataTool.js";
export declare class DataTool extends DataToolBase {
    static _dtutil: DataTool;
    _chunkTool: ChunkDataTool;
    static _heightMapTool: HeightMapTool;
    static _columntool: ColumnDataTool;
    _locationKey: string;
    _loadedIn: boolean;
    _mode: "World" | "Entity";
    data: {
        raw: RawVoxelData;
        id: number;
        baseId: number;
        secondaryId: number;
        secondaryBaseId: number;
    };
    __secondary: boolean;
    tags: {
        voxelMap: Uint16Array;
        substanceRecord: Record<number, import("Meta/index.js").VoxelSubstanceType>;
        materialMap: Record<number, string>;
        colliderMap: Record<number, string>;
        id: string;
        sync(voxelMap: Uint16Array): void;
        setVoxel(id: number): void;
        getTrueSubstance(id: number): import("Meta/index.js").VoxelSubstanceType;
        getMaterial(id: number): string;
        getCollider(id: number): string;
        $INIT(data: import("../../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData): void;
        byteOffSet: number;
        tagSize: number;
        tagIndexes: number;
        data: DataView;
        indexMap: Map<string, number>;
        index: DataView;
        setBuffer(data: DataView | import("../../Libs/DivineBinaryTags/Types/Util.types.js").BufferTypes): void;
        setTagIndex(index: number): void;
        getTag(id: string): number;
        setTag(id: string, value: number): boolean;
        getArrayTagValue(id: string, index: number): number;
        getArrayTagByteIndex(id: string, index: number): number;
        setArrayTagValue(id: string, index: number, value: number): number | void;
        loopThroughTags(run: (id: string, value: number) => void): void;
        loopThroughIndex(run: (data: number[]) => void): void;
        loopThroughAllIndexTags(run: (id: string, value: number, index: number) => void): void;
    };
    setDimension(dimensionId: string | number): this;
    setSecondary(enable: boolean): this;
    _getBaseId(id: number): number;
    loadInRaw(rawData: RawVoxelData): void;
    __process(): void;
    loadIn(): boolean;
    commit(heightMapUpdate?: number): boolean;
    hasRGBLight(): boolean;
    hasSunLight(): boolean;
    getLight(): number;
    setLight(light: number): this;
    isOpaque(): true | undefined;
    getLevel(): number;
    setLevel(level: number): this;
    getLevelState(): number;
    setLevelState(state: number): this;
    getShapeState(): number;
    setShapeState(state: number): this;
    hasSecondaryVoxel(): boolean;
    getShapeId(): number;
    isLightSource(): boolean;
    getLightSourceValue(): number;
    getSubstance(): import("Meta/index.js").VoxelSubstanceType;
    getMaterial(): string;
    getHardness(): number;
    getCollider(): string;
    checkCollisions(): boolean;
    getTemplateSubstance(): VoxelTemplateSubstanceType;
    getState(): number;
    isRich(): number;
    setAir(): this;
    isAir(): boolean;
    setBarrier(): this;
    isBarrier(): boolean;
    getId(base?: boolean): number;
    setId(id: number): this;
    getStringId(): string;
    isRenderable(): boolean;
    isSameVoxel(cx: number, cy: number, cz: number): boolean;
}
