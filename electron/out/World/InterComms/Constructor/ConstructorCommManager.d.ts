import type { InterCommInterface, InterCommPortTypes } from "Meta/Comms/InterComm.types";
/**# World Gen Comm Manager
 * ---
 * Handles all world gen comms. .
 */
export declare const ConstructorCommManager: {
    count: number;
    numConstructors: number;
    __numLightUpdates: number;
    constructors: InterCommInterface[];
    constructorsConnected: number;
    $INIT(statesSAB: SharedArrayBuffer): void;
    addThread(port: InterCommPortTypes): void;
    syncChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number): void;
    releaseChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number): void;
    syncRegionInAllThreads(regionX: number, regionY: number, regionZ: number): void;
    releaseRegionInAllThreads(regionX: number, regionY: number, regionZ: number): void;
    isReady(): boolean;
    __handleCount(): number;
    requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number): number;
    runRGBLightUpdate(x: number, y: number, z: number): number;
    runRGBUpdate(x: number, y: number, z: number): number;
    runSunLightForWorldColumn(x: number, z: number, maxY: number): number;
    runSunFillAtMaxY(x: number, y: number, maxY: number): number;
    runSunFillMaxYFlood(x: number, y: number, maxY: number, thread: number): number;
    runSunLightUpdate(x: number, y: number, z: number): number;
    runSunLightRemove(x: number, y: number, z: number): number;
};
