import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
import { BuilderTool } from "../Tools/Build/BuilderTool.js";
import { ChunkDataTool } from "../Tools/Data/WorldData/ChunkDataTool.js";
import { ColumnDataTool } from "../Tools/Data/WorldData/ColumnDataTool.js";
import { DataTool } from "../Tools/Data/DataTool.js";
import { HeightMapTool } from "../Tools/Data/WorldData/HeightMapTool.js";
import { RegionDataTool } from "../Tools/Data/WorldData/RegionDataTool.js";
import { DataLoaderTool } from "../Tools/Data/DataLoaderTool.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export declare const DVEW: {
    environment: "node" | "browser";
    __settingsHaveBeenSynced: boolean;
    __renderIsDone: boolean;
    __serverIsDone: boolean;
    TC: {
        threadNumber: number;
        threadName: string;
        environment: "node" | "browser";
        _comms: Record<string, import("threadcomm").CommBase>;
        _commManageras: Record<string, import("threadcomm").CommManager>;
        _tasks: Record<string, import("threadcomm").Task<any>>;
        _queues: Map<string, Map<string, import("threadcomm/Queue/SyncedQueue.js").SyncedQueue>>;
        _onDataSync: Record<string, import("threadcomm").DataSync<any, any>>;
        parent: import("threadcomm").CommBase;
        __internal: Record<number, Record<number, (data: any, event: any) => void>>;
        __initalized: boolean;
        __expectedPorts: Record<string, boolean>;
        $INIT(threadName: string): Promise<void>;
        getSyncedQueue(threadId: string, queueId: string): import("threadcomm/Queue/SyncedQueue.js").SyncedQueue | undefined;
        addComm(comm: import("threadcomm").CommBase): void;
        createComm<T>(name: string, mergeObject?: T | undefined): T & import("threadcomm").CommBase;
        createCommManager(data: import("threadcomm/Meta/Manager/Manager.types.js").CommManagerData): import("threadcomm").CommManager;
        getComm(id: string): import("threadcomm").CommBase;
        getCommManager(id: string): import("threadcomm").CommManager;
        __throwError(message: string): never;
        getWorkerPort(): Promise<any>;
        __handleInternalMessage(data: any[], event: any): void;
        __isInternalMessage(data: any[]): boolean;
        __handleTasksDone(tasksId: string, mode: number, threadId: string, tid: string, tasksData: any): void;
        __handleTasksMessage(data: any[]): Promise<void>;
        __isTasks(data: any[]): boolean;
        registerTasks<T_1>(id: string | number, run: (data: T_1, onDone?: Function | undefined) => void, mode?: "async" | "deffered" | undefined): import("threadcomm").Task<T_1>;
        __hanldeDataSyncMessage(data: any[]): Promise<void>;
        __isDataSync(data: any[]): boolean;
        onDataSync<T_2, K>(dataType: string | number, onSync?: ((data: T_2) => void) | undefined, onUnSync?: ((data: K) => void) | undefined): import("threadcomm").DataSync<T_2, K>;
    };
    UTIL: {
        createPromiseCheck: (data: {
            check: () => boolean;
            onReady?: (() => any) | undefined;
            checkInterval: number;
            failTimeOut?: number | undefined;
            onFail?: (() => any) | undefined;
        }) => Promise<boolean>;
        getEnviorment(): "node" | "browser";
        getAQueue<T_3>(): import("../Global/Util/Queue.js").Queue<T_3>;
        merge<T_4, K_1>(target: T_4, newObject: K_1): T_4 & K_1;
        degtoRad(degrees: number): number;
        radToDeg(radians: number): number;
        convertBufferToSAB(buffer: ArrayBuffer): SharedArrayBuffer;
        converSABToBuffer(buffer: SharedArrayBuffer): ArrayBuffer;
    };
    settings: {
        enviorment: "node" | "browser";
        settings: EngineSettingsData;
        getSettings(): EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        __syncWithObjects(): void;
        syncWithWorldBounds(worldBounds: {
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        }): void;
        getSettingsCopy(): any;
        syncChunkInRichWorldThread(): boolean;
        richDataEnabled(): boolean;
        syncChunkInFXThread(): boolean;
        syncChunkInDataThread(): boolean;
        syncChunksInNexusThread(): boolean;
        doSunPropagation(): boolean;
        doRGBPropagation(): boolean;
        doLight(): boolean;
        doFlow(): boolean;
        saveWorldData(): boolean;
        isServer(): boolean;
        isClient(): boolean;
    };
    worldTasks: {
        addChunk: import("threadcomm").Task<import("voxelspaces").LocationData>;
        unLoad: {
            unLoadColumn: import("threadcomm").Task<import("voxelspaces").LocationData>;
        };
        load: {
            loadRegino: import("threadcomm").Task<import("../Meta/Tasks/Tasks.types.js").LoadWorldDataTasks>;
            loadReginoHeader: import("threadcomm").Task<import("../Meta/Tasks/Tasks.types.js").LoadRegionHeadertasks>;
            loadColumn: import("threadcomm").Task<import("../Meta/Tasks/Tasks.types.js").LoadWorldDataTasks>;
            loadChunk: import("threadcomm").Task<import("../Meta/Tasks/Tasks.types.js").LoadWorldDataTasks>;
        };
    };
    generators: {
        worldData: {
            chunk: {
                create(buffer?: false | ArrayBuffer): SharedArrayBuffer;
            };
            column: {
                create(buffer?: false | ArrayBuffer): SharedArrayBuffer;
            };
            region: {
                create(buffer?: false | ArrayBuffer): SharedArrayBuffer;
            };
        };
    };
    data: {
        dimensions: {
            _count: number;
            dimensionRecord: Record<string, number>;
            dimensionMap: Record<number, string>;
            __defaultDimensionOptions: import("../Meta/Data/DimensionData.types.js").DimensionOptions;
            _dimensions: Record<string, import("../Meta/Data/DimensionData.types.js").DimensionData>;
            registerDimension(id: string, option: import("../Meta/Data/DimensionData.types.js").DimensionOptions): void;
            getDimension(id: string | number): import("../Meta/Data/DimensionData.types.js").DimensionData;
            getDimensionStringId(id: string | number): string;
            getDimensionNumericId(id: string | number): number;
        };
        voxelTags: {
            voxelIndex: Uint16Array;
            id: string;
            sync(voxelMap: Uint16Array): void;
            setVoxel(id: number): void;
            initData: import("divine-binary-tags").RemoteTagManagerInitData;
            $INIT(data: import("divine-binary-tags").RemoteTagManagerInitData): void;
            byteOffSet: number;
            tagSize: number;
            tagIndexes: number;
            data: DataView;
            indexMap: Map<string, number>;
            index: DataView;
            setBuffer(data: DataView | import("divine-binary-tags").BufferTypes): void;
            getBuffer(): ArrayBuffer;
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
        world: {
            _currentionDimension: string;
            paint: {
                _dt: DataTool;
                voxel(location: import("voxelspaces").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
                __paint(location: import("voxelspaces").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
                erase(location: import("voxelspaces").LocationData): void;
            };
        };
        worldRegister: {
            _dimensions: import("../Meta/Data/WorldData.types.js").WorldDimensions;
            _cacheOn: boolean;
            _chunkCache: Map<string, import("../Meta/Data/WorldData.types.js").ChunkData>;
            _columnCache: Map<string, import("../Meta/Data/WorldData.types.js").Column>;
            cache: {
                enable(): void;
                disable(): void;
                _addChunk(key: string, data: import("../Meta/Data/WorldData.types.js").ChunkData): void;
                _addColumn(key: string, data: import("../Meta/Data/WorldData.types.js").Column): void;
                _getChunk(key: string): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                _getColumn(key: string): import("../Meta/Data/WorldData.types.js").Column | undefined;
            };
            dimensions: {
                add(id: string | number): Map<any, any>;
                get(id: string | number): Map<string, import("../Meta/Data/WorldData.types.js").Region> | undefined;
            };
            region: {
                add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
                _getRegionData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").Region;
                remove(location: import("voxelspaces").LocationData): boolean;
            };
            column: {
                add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column | undefined;
                _getColumnData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").Column;
                remove(location: import("voxelspaces").LocationData): boolean;
                fill(location: import("voxelspaces").LocationData): void;
                height: {
                    getRelative(location: import("voxelspaces").LocationData): number;
                    getAbsolute(location: import("voxelspaces").LocationData): number;
                };
            };
            chunk: {
                add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                _getChunkData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData;
                addFromServer(chunkBuffer: ArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                remove(location: import("voxelspaces").LocationData): boolean;
            };
        };
        columnTags: import("divine-binary-tags").RemoteTagManager;
        worldBounds: {
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        };
        spaces: {
            region: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace & {
                chunkBounds: {
                    x: number;
                    y: number;
                    z: number;
                };
                columnBounds: {
                    x: number;
                    y: number;
                    z: number;
                };
                getChunkVolume(): number;
                getColumnVolume(): number;
            };
            column: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace;
            chunk: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace & {
                _regionPosition: {
                    x: number;
                    y: number;
                    z: number;
                };
                getRegionPositonx(): {
                    x: number;
                    y: number;
                    z: number;
                    copy(): any;
                    copyTo(vec3: {
                        x: number;
                        y: number;
                        z: number;
                    }): void;
                    toString(): string;
                    multiply(vec3: {
                        x: number;
                        y: number;
                        z: number;
                    }): any;
                };
                getRegionPositonxXYZ(x: number, y: number, z: number): {
                    x: number;
                    y: number;
                    z: number;
                    copy(): any;
                    copyTo(vec3: {
                        x: number;
                        y: number;
                        z: number;
                    }): void;
                    toString(): string;
                    multiply(vec3: {
                        x: number;
                        y: number;
                        z: number;
                    }): any;
                };
                getRegionIndex(): number;
                getRegionIndexXYZ(x: number, y: number, z: number): number;
            };
            voxel: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace;
            setDimensions(data: {
                regions: {
                    x: number;
                    y: number;
                    z: number;
                };
                columns: {
                    x: number;
                    y: number;
                    z: number;
                };
                chunks: {
                    x: number;
                    y: number;
                    z: number;
                };
            }): void;
        } & {
            $INIT(settings: EngineSettingsData): void;
        };
        register: {
            stringMaps: {
                segments: Map<string, Map<string, string[]>>;
                syncStringMap(data: import("../Meta/Data/DataSync.types.js").RegisterStringMapSync): void;
                getStringMapValue(segment: string, id: string, index: number): string;
            };
        };
        chunkTags: import("divine-binary-tags").RemoteTagManager;
        regionTags: import("divine-binary-tags").RemoteTagManager;
        regionHeaderReigster: {
            _headers: Map<string, Map<string, {
                data: DataView;
                buffer: SharedArrayBuffer;
            }>>;
            remove(location: import("voxelspaces").LocationData): boolean;
            add(location: import("voxelspaces").LocationData, buffer: SharedArrayBuffer): void;
            get(location: import("voxelspaces").LocationData): false | {
                data: DataView;
                buffer: SharedArrayBuffer;
            } | undefined;
            isStored(location: import("voxelspaces").LocationData): 0 | 1 | -1;
        };
    };
    dataSync: {
        voxelDataCreator: {
            $generateVoxelData(): void;
            palette: {
                _count: number;
                _palette: import("../Meta/Data/WorldData.types.js").VoxelPalette;
                _map: Record<string, number>;
                registerVoxel(voxel: import("../index.js").VoxelData): void;
                get(): import("../Meta/Data/WorldData.types.js").VoxelPalette;
                getMap(): Record<string, number>;
            };
        };
        comms: Record<string, import("threadcomm").CommManager | import("threadcomm").CommBase>;
        commOptions: Record<string, {
            worldData: boolean;
            worldDataTags: boolean;
            voxelPalette: boolean;
            voxelTags: boolean;
            materials: boolean;
            colliders: boolean;
        }>;
        _ready: boolean;
        $INIT(): void;
        isReady(): boolean;
        registerComm(comm: import("threadcomm").CommManager | import("threadcomm").CommBase, data?: Partial<{
            worldData: boolean;
            worldDataTags: boolean;
            voxelPalette: boolean;
            voxelTags: boolean;
            materials: boolean;
            colliders: boolean;
        }>): void;
        loopThroughComms(func: (comm: import("threadcomm").CommManager | import("threadcomm").CommBase, options: {
            worldData: boolean;
            worldDataTags: boolean;
            voxelPalette: boolean;
            voxelTags: boolean;
            materials: boolean;
            colliders: boolean;
        }) => void): void;
        dimesnion: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: string | number, threadId?: string | undefined) => false | import("../Meta/Data/DimensionData.types.js").DimensionData;
                getUnSyncData: (data: string | number, threadId?: string | undefined) => boolean;
            };
            unSync(input: string | number): false | undefined;
            unSyncInThread(commName: string, input: string | number): false | undefined;
            sync(input: string | number): false | undefined;
            syncInThread(commName: string, input: string | number): false | undefined;
        };
        chunk: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => false | import("../Meta/Data/DataSync.types.js").WorldDataSync;
                getUnSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => boolean;
            };
            unSync(input: import("voxelspaces").LocationData): false | undefined;
            unSyncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
            sync(input: import("voxelspaces").LocationData): false | undefined;
            syncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
        };
        column: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => false | import("../Meta/Data/DataSync.types.js").WorldDataSync;
                getUnSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => boolean;
            };
            unSync(input: import("voxelspaces").LocationData): false | undefined;
            unSyncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
            sync(input: import("voxelspaces").LocationData): false | undefined;
            syncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
        };
        region: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => false | import("../Meta/Data/DataSync.types.js").WorldDataSync;
                getUnSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => boolean;
            };
            unSync(input: import("voxelspaces").LocationData): false | undefined;
            unSyncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
            sync(input: import("voxelspaces").LocationData): false | undefined;
            syncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
        };
        regionHeader: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => false | import("../Meta/Data/DataSync.types.js").WorldDataSync;
                getUnSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => boolean;
            };
            unSync(input: import("voxelspaces").LocationData): false | undefined;
            unSyncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
            sync(input: import("voxelspaces").LocationData): false | undefined;
            syncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
        };
        voxelTags: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: void, threadId?: string | undefined) => false | [import("divine-binary-tags").RemoteTagManagerInitData, SharedArrayBuffer];
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: void): false | undefined;
            syncInThread(commName: string, input: void): false | undefined;
        };
        chunkTags: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: void, threadId?: string | undefined) => false | import("divine-binary-tags").RemoteTagManagerInitData;
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: void): false | undefined;
            syncInThread(commName: string, input: void): false | undefined;
        };
        columnTags: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: void, threadId?: string | undefined) => false | import("divine-binary-tags").RemoteTagManagerInitData;
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: void): false | undefined;
            syncInThread(commName: string, input: void): false | undefined;
        };
        regionTags: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: void, threadId?: string | undefined) => false | [import("divine-binary-tags").RemoteTagManagerInitData, import("divine-binary-tags").RemoteTagManagerInitData];
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: void): false | undefined;
            syncInThread(commName: string, input: void): false | undefined;
        };
        voxelPalette: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: void, threadId?: string | undefined) => false | [import("../Meta/Data/WorldData.types.js").VoxelPalette, import("../Meta/Data/WorldData.types.js").VoxelPaletteMap];
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: void): false | undefined;
            syncInThread(commName: string, input: void): false | undefined;
        };
        stringMap: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: import("../Meta/Data/DataSync.types.js").RegisterStringMapSync, threadId?: string | undefined) => false | import("../Meta/Data/DataSync.types.js").RegisterStringMapSync;
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: import("../Meta/Data/DataSync.types.js").RegisterStringMapSync): false | undefined;
            syncInThread(commName: string, input: import("../Meta/Data/DataSync.types.js").RegisterStringMapSync): false | undefined;
        };
    };
    fxComm: import("threadcomm").CommBase;
    dataComm: import("threadcomm").CommBase;
    nexusComm: import("threadcomm").CommBase;
    parentComm: import("threadcomm").CommBase;
    ccm: import("threadcomm").CommManager;
    richWorldComm: import("threadcomm").CommBase;
    voxelManager: {
        voxelData: Map<string, import("../index.js").VoxelData>;
        getVoxelData(id: string): import("../index.js").VoxelData;
        registerVoxelData(data: import("../index.js").VoxelData | import("../index.js").VoxelData[]): void;
    };
    itemManager: {
        itemData: Record<string, import("../Meta/Data/Items/Item.types.js").ItemData>;
        _onRegister: (data: import("../Meta/Data/Items/Item.types.js").ItemData) => void;
        getItemData(id: string): import("../Meta/Data/Items/Item.types.js").ItemData;
        registerItemData(data: import("../Meta/Data/Items/Item.types.js").ItemData): void;
        onRegister(func: (data: import("../Meta/Data/Items/Item.types.js").ItemData) => void): void;
    };
    cQueues: {
        $INIT(): void;
        _queueMap: Map<string | number, number>;
        addQueue(queueKey: string | number): boolean;
        removeQueue(queueKey: string | number): boolean;
        filterQueues(filter: (queueKey: string | number) => boolean): void;
        filterOldQueues(maxTime?: number): void;
        rgb: {
            update: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
            remove: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
        };
        worldSun: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
        voxelUpdate: {
            erase: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
            paint: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").PaintTasks>;
        };
        sun: {
            update: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
            remove: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
        };
        explosion: {
            run: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").ExplosionTasks>;
        };
        flow: {
            update: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
            remove: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
        };
        build: {
            chunk: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>>;
        };
        generate: import("threadcomm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").GenerateTasks>;
    };
    cTasks: {
        runQueue: {
            build: {
                chunk: import("threadcomm").Task<import("../Meta/Tasks/Tasks.types.js").RunRebuildTasks>;
            };
        };
        addToQueue: {
            rgb: {
                update: import("threadcomm").Task<any>;
                remove: null;
            };
            build: {
                addToRebuildQueue: import("threadcomm").Task<import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue>;
            };
            buildChunk: import("threadcomm").Task<import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>>;
        };
    };
    tags: {
        voxels: {
            _nodeMap: Map<string, import("../Meta/Data/Tags/TagBuilder.types.js").TagBuilderNodes>;
            _stringMaps: Map<string, {
                count: number;
                found: Record<string, number>;
                map: string[];
                allowedComms: string[];
            }>;
            _defaults: Map<string, number>;
            addNode(node: import("../Meta/Data/Tags/TagBuilder.types.js").TagBuilderNodes | import("../Meta/Data/Tags/TagBuilder.types.js").TagBuilderNodes[]): void;
            getNode(id: string): import("../Meta/Data/Tags/TagBuilder.types.js").TagBuilderNodes | undefined;
            setDefaults(tagManager: import("divine-binary-tags").TagManagerBase): void;
            setNode(id: string, value: string | number | boolean | number[], tagManager: import("divine-binary-tags").TagManagerBase): false | undefined;
            $INIT(totalVoxels: number): import("divine-binary-tags").RemoteTagManagerInitData;
            $SYNC(): void;
        };
        chunks: import("divine-binary-tags").TagManager;
    };
    isReady(): boolean;
    syncSettings(data: EngineSettingsData): void;
    $INIT(): Promise<void>;
    getAllTools(): {
        brush: import("../Tools/Brush/Brush.js").BrushTool & {
            paintAndAwaitUpdate(): Promise<unknown>;
            eraseAndAwaitUpdate(): Promise<unknown>;
            paintAndUpdate(onDone?: Function | undefined): void;
            eraseAndUpdate(onDone?: Function | undefined): void;
            explode(radius?: number, onDone?: Function | undefined): void;
        };
        builder: BuilderTool;
        data: DataTool;
        chunkData: ChunkDataTool;
        columnData: ColumnDataTool;
        regonData: RegionDataTool;
        heightMap: HeightMapTool;
        tasks: import("../Tools/Tasks/TasksTool.js").TaskTool;
    };
    getBrush(): import("../Tools/Brush/Brush.js").BrushTool & {
        paintAndAwaitUpdate(): Promise<unknown>;
        eraseAndAwaitUpdate(): Promise<unknown>;
        paintAndUpdate(onDone?: Function | undefined): void;
        eraseAndUpdate(onDone?: Function | undefined): void;
        explode(radius?: number, onDone?: Function | undefined): void;
    };
    getBuilder(): BuilderTool;
    getDataTool(): DataTool;
    getRegionTool(): RegionDataTool;
    getChunkDataTool(): ChunkDataTool;
    getColumnDataTool(): ColumnDataTool;
    getHeightMapTool(): HeightMapTool;
    getTasksTool(): import("../Tools/Tasks/TasksTool.js").TaskTool;
    getDataLoaderTool(): DataLoaderTool;
};
export declare type DivineVoxelEngineWorld = typeof DVEW;
