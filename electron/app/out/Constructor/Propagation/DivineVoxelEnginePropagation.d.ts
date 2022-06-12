import type { VoxelSubstanceType } from "Meta/index.js";
export declare const DVEP: {
    illumination: {
        lightByte: {
            _lightValues: number[];
            getS(value: number): number;
            getR(value: number): number;
            getG(value: number): number;
            getB(value: number): number;
            setS(value: number, sl: number): number;
            setR(value: number, sl: number): number;
            setG(value: number, sl: number): number;
            setB(value: number, sl: number): number;
            removeS(sl: number): number;
            hasRGBLight(sl: number): boolean;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
            setLightValues(values: number[]): number;
            getLightValues(value: number): number[];
            isLessThanForRGBRemove(n1: number, n2: number): boolean;
            isLessThanForRGBAdd(n1: number, n2: number): boolean;
            isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
            getMinusOneForRGB(sl: number, nl: number): number;
            removeRGBLight(sl: number): number;
            getFullSunLight(sl: number): number;
            isLessThanForSunAdd(n1: number, n2: number): boolean;
            isLessThanForSunAddDown(n1: number, n2: number): boolean;
            isLessThanForSunAddUp(n1: number, n2: number): boolean;
            getSunLightForUnderVoxel(sl: number, nl: number): number;
            getMinusOneForSun(sl: number, nl: number): number;
            isLessThanForSunRemove(n1: number, sl: number): boolean;
            isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
            sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
            removeSunLight(sl: number): number;
        };
        air: number[];
        runSunLightUpdateAt: typeof import("./Illumanation/Functions/SunLight.js").runSunLightUpdateAt;
        runSunLightUpdate: typeof import("./Illumanation/Functions/SunLight.js").runSunLightUpdate;
        runSunLightRemove: typeof import("./Illumanation/Functions/SunLight.js").runSunLightRemove;
        runSunLightRemoveAt: typeof import("./Illumanation/Functions/SunLight.js").runSunLightRemoveAt;
        populateWorldColumnWithSunLight: typeof import("./Illumanation/Functions/SunLight.js").PopulateWorldColumnWithSunLight;
        runSunLightUpdateAtMaxY: typeof import("./Illumanation/Functions/SunLight.js").RunSunLightUpdateAtMaxY;
        runSunLightFloodDown: typeof import("./Illumanation/Functions/SunLight.js").RunSunLightFloodDown;
        runSunLightFloodOut: typeof import("./Illumanation/Functions/SunLight.js").RunSunLightFloodOut;
        sunLightAboveCheck: typeof import("./Illumanation/Functions/SunLight.js").SunLightAboveCheck;
        _sunLightUpdateQue: number[][];
        _sunLightFloodDownQue: number[][];
        _sunLightFloodOutQue: Record<string, number[][]>;
        _sunLightRemoveQue: number[][];
        runRGBFloodFillAt: typeof import("./Illumanation/Functions/RGBFloodLight.js").runRGBFloodFillAt;
        runRGBFloodFill: typeof import("./Illumanation/Functions/RGBFloodLight.js").runRGBFloodFill;
        runRGBFloodRemoveAt: typeof import("./Illumanation/Functions/RGBFloodLight.js").runRGBFloodRemoveAt;
        runRGBFloodRemove: typeof import("./Illumanation/Functions/RGBFloodLight.js").runRGBFloodRemove;
        _RGBlightUpdateQue: number[][];
        _RGBlightRemovalQue: number[][];
        _visitMap: Record<string, boolean>;
    };
    rebuildQueMap: Record<string, boolean>;
    $INIT(): void;
    addToRebuildQue(x: number, y: number, z: number, substance: VoxelSubstanceType | "all"): void;
    runRGBFloodFill(x: number, y: number, z: number): void;
    runRGBFloodRemove(x: number, y: number, z: number): void;
    runSunLightForWorldColumn(x: number, z: number, maxY: number): void;
    runSunFloodFillAtMaxY(x: number, z: number, maxY: number): void;
    runSunFloodFillMaxYFlood(x: number, z: number, maxY: number): void;
    runSunLightUpdate(x: number, y: number, z: number): void;
    runSunLightRemove(x: number, y: number, z: number): void;
};
export declare type DivineVoxelEnginePropagation = typeof DVEP;
