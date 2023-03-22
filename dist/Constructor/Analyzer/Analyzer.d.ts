import type { UpdateTasksO } from "Meta/Tasks/Tasks.types.js";
import type { LocationData } from "voxelspaces";
import { DataTool } from "../../Tools/Data/DataTool.js";
export declare const Analyzer: {
    updater: {
        _voxels: Map<string, (locaton: LocationData, deltaTime: number, anayzer: any, DVEC: {
            environment: "node" | "browser";
            UTIL: {
                createPromiseCheck: (data: {
                    check: () => boolean;
                    onReady?: (() => any) | undefined;
                    checkInterval: number;
                    failTimeOut?: number | undefined;
                    onFail?: (() => any) | undefined;
                }) => Promise<boolean>;
                getEnviorment(): "node" | "browser";
                getAQueue<T>(): import("../../Global/Util/Queue.js").Queue<T>;
                merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
                degtoRad(degrees: number): number;
                radToDeg(radians: number): number;
                convertBufferToSAB(buffer: ArrayBuffer): SharedArrayBuffer;
                converSABToBuffer(buffer: SharedArrayBuffer): ArrayBuffer;
            };
            settings: {
                enviorment: "node" | "browser";
                settings: import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData;
                getSettings(): import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData;
                syncSettings(data: import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData): void;
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
            propagation: {
                expolosion: {
                    run(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: number;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            flow: {
                                update: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                                rmeove: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                    noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                            };
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                            queue: [x: number, y: number, z: number][];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): number;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
                flow: {
                    update(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: null;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            flow: {
                                update: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                                rmeove: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                    noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                            };
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): null;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): Promise<void>;
                    remove(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: null;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            flow: {
                                update: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                                rmeove: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                    noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                            };
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): null;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): Promise<void>;
                };
                worldSun: {
                    run(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: null;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            sun: number[];
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): null;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
                rgb: {
                    update(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                    remove(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
                sun: {
                    update(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                    remove(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
            };
            worldGen: {
                worldGen: import("../../index.js").WorldGenInterface | null;
                register: {
                    MAX_ATTEMPTS: number;
                    _requests: Map<string, {
                        attempts: number;
                        dimension: string;
                        chunks: Map<string, [x: number, y: number, z: number]>;
                        voxels: [x: number, y: number, z: number, data: import("../../index.js").RawVoxelData][];
                    }>;
                    registerRequest(dimension: string, x: number, y: number, z: number): string;
                    addToRequest(registerId: string, location: LocationData, rawData: import("../../index.js").RawVoxelData): void;
                    attemptRequestFullFill(registerId: string): boolean;
                };
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
                _brushes: any[];
                setWorldGen(worldGen: import("../../index.js").WorldGenInterface): void;
                generate(data: import("Meta/Tasks/Tasks.types.js").GenerateTasks, onDone: Function): void;
                getBrush(): import("../index.js").WorldGenBrush;
            };
            builder: {
                constructors: {
                    constructors: import("../../Global/Util/UtilMap.js").UtilMap<string, import("../index.js").VoxelConstructor>;
                    get(id: string): import("../index.js").VoxelConstructor;
                    registerVoxel(voxel: import("../index.js").VoxelConstructor | import("../index.js").VoxelConstructor[]): void;
                    defaults: {
                        box: {
                            simple(id: string, textures: import("../../index.js").ConstructorTextureData | Record<import("../../index.js").DirectionNames, import("../../index.js").ConstructorTextureData>): import("../Builder/Constructors/Classes/SimpleBox.constructor.js").SimpleBoxVoxelConstructor;
                            pillar(id: string, textures: import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructorData): import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructor;
                        };
                        stair: {
                            simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleStair.constructor.js").SimpleStairVoxelConstructor;
                        };
                        panel: {
                            simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimplePanel.constructor.js").SimplePanelVoxelConstructor;
                        };
                        crossedPanel: {
                            simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleCrossedPanel.constructor.js").SimpleCrossedPanelVoxelConstructor;
                        };
                        liquid: {
                            simple(id: string, textures: [import("../../index.js").ConstructorTextureData, import("../../index.js").ConstructorTextureData]): import("../Builder/Constructors/Classes/SimpleLiquid.constructor.js").SimpleLiquidConstructor;
                        };
                    };
                };
                textureManager: {
                    textureDataHasBeenSet: boolean;
                    data: import("../../index.js").TextureTypeUVMap;
                    getTextureUV(data: import("../../index.js").ConstructorTextureData, overlay?: boolean): number;
                    setUVTextureMap(data: import("../../index.js").TextureTypeUVMap): void;
                    releaseTextureData(): void;
                    isReady(): boolean;
                };
                processor: {
                    relative: {
                        x: number;
                        y: number;
                        z: number;
                    };
                    nLocation: LocationData;
                    _process(doSecondCheck?: boolean): void;
                    build(location: LocationData): void;
                };
                overrides: {
                    overrides: Record<import("../index.js").OverrideTypes, Map<string, Map<string, (data: import("../index.js").FaceDataOverride) => boolean>>>;
                    registerOverride(type: import("../index.js").OverrideTypes, subjectId: string, neighborShapeId: string, run: (data: import("../index.js").FaceDataOverride) => boolean): void;
                    hasOverride(type: import("../index.js").OverrideTypes, shapeId: string, neighborShapeId: string): boolean;
                    runOverride(type: import("../index.js").OverrideTypes, firstId: string, secondOverride: string, data: import("../index.js").FaceDataOverride): boolean;
                };
                renderedSubstances: {
                    meshers: import("../../Global/Util/UtilMap.js").UtilMap<string, import("../Builder/Tools/VoxelMesherDataTool.js").VoxelMesherDataTool>;
                };
                $INIT(): void;
                buildChunk(location: LocationData, LOD?: number): boolean;
            };
            analyzer: any;
            dataSyncNode: {
                _states: Record<string, boolean>;
                isReady(): boolean;
                voxelPalette: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").VoxelPaletteSyncData, any>;
                voxelData: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").VoxelDataSync, any>;
                dimension: import("threadcomm").DataSync<import("../../Meta/Data/DimensionData.types.js").DimensionData, void>;
                chunk: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                column: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                region: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                regionHeader: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                chunkTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData, void>;
                columnTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData, void>;
                regionTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData[], void>;
                stringMap: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").RegisterStringMapSync, void>;
            };
            data: {
                dimensions: {
                    _count: number;
                    dimensionRecord: Record<string, number>;
                    dimensionMap: Record<number, string>;
                    __defaultDimensionOptions: import("../../Meta/Data/DimensionData.types.js").DimensionOptions;
                    _dimensions: Record<string, import("../../Meta/Data/DimensionData.types.js").DimensionData>;
                    registerDimension(id: string, option: import("../../Meta/Data/DimensionData.types.js").DimensionOptions): void;
                    getDimension(id: string | number): import("../../Meta/Data/DimensionData.types.js").DimensionData;
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
                        voxel(location: LocationData, data: import("../../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
                        __paint(location: LocationData, data: import("../../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
                        erase(location: LocationData): void;
                    };
                };
                worldRegister: {
                    _dimensions: import("../../Meta/Data/WorldData.types.js").WorldDimensions;
                    _cacheOn: boolean;
                    _chunkCache: Map<string, import("../../Meta/Data/WorldData.types.js").ChunkData>;
                    _columnCache: Map<string, import("../../Meta/Data/WorldData.types.js").Column>;
                    cache: {
                        enable(): void;
                        disable(): void;
                        _addChunk(key: string, data: import("../../Meta/Data/WorldData.types.js").ChunkData): void;
                        _addColumn(key: string, data: import("../../Meta/Data/WorldData.types.js").Column): void;
                        _getChunk(key: string): import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        _getColumn(key: string): import("../../Meta/Data/WorldData.types.js").Column | undefined;
                    };
                    dimensions: {
                        add(id: string | number): Map<any, any>;
                        get(id: string | number): Map<string, import("../../Meta/Data/WorldData.types.js").Region> | undefined;
                    };
                    region: {
                        add(location: LocationData, sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Region;
                        _getRegionData(sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Region;
                        get(location: LocationData): false | import("../../Meta/Data/WorldData.types.js").Region;
                        remove(location: LocationData): boolean;
                    };
                    column: {
                        add(location: LocationData, sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Column | undefined;
                        _getColumnData(sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Column;
                        get(location: LocationData): false | import("../../Meta/Data/WorldData.types.js").Column;
                        remove(location: LocationData): boolean;
                        fill(location: LocationData): void;
                        height: {
                            getRelative(location: LocationData): number;
                            getAbsolute(location: LocationData): number;
                        };
                    };
                    chunk: {
                        add(location: LocationData, sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        _getChunkData(sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").ChunkData;
                        addFromServer(chunkBuffer: ArrayBuffer): import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        get(location: LocationData): false | import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        remove(location: LocationData): boolean;
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
                    $INIT(settings: import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData): void;
                };
                register: {
                    stringMaps: {
                        segments: Map<string, Map<string, string[]>>;
                        syncStringMap(data: import("../../Meta/Data/DataSync.types.js").RegisterStringMapSync): void;
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
                    remove(location: LocationData): boolean;
                    add(location: LocationData, buffer: SharedArrayBuffer): void;
                    get(location: LocationData): false | {
                        data: DataView;
                        buffer: SharedArrayBuffer;
                    } | undefined;
                    isStored(location: LocationData): 1 | 0 | -1;
                };
            };
            voxelManager: {
                constructors: import("../../Global/Util/UtilMap.js").UtilMap<string, import("../index.js").VoxelConstructor>;
                get(id: string): import("../index.js").VoxelConstructor;
                registerVoxel(voxel: import("../index.js").VoxelConstructor | import("../index.js").VoxelConstructor[]): void;
                defaults: {
                    box: {
                        simple(id: string, textures: import("../../index.js").ConstructorTextureData | Record<import("../../index.js").DirectionNames, import("../../index.js").ConstructorTextureData>): import("../Builder/Constructors/Classes/SimpleBox.constructor.js").SimpleBoxVoxelConstructor;
                        pillar(id: string, textures: import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructorData): import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructor;
                    };
                    stair: {
                        simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleStair.constructor.js").SimpleStairVoxelConstructor;
                    };
                    panel: {
                        simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimplePanel.constructor.js").SimplePanelVoxelConstructor;
                    };
                    crossedPanel: {
                        simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleCrossedPanel.constructor.js").SimpleCrossedPanelVoxelConstructor;
                    };
                    liquid: {
                        simple(id: string, textures: [import("../../index.js").ConstructorTextureData, import("../../index.js").ConstructorTextureData]): import("../Builder/Constructors/Classes/SimpleLiquid.constructor.js").SimpleLiquidConstructor;
                    };
                };
            };
            TC: {
                threadNumber: number;
                threadName: string;
                environment: "node" | "browser";
                _comms: Record<string, import("threadcomm").CommBase>;
                _commManageras: Record<string, import("threadcomm").CommManager>;
                _queues: Map<string, Map<string, import("threadcomm/Queue/SyncedQueue.js").SyncedQueue>>;
                parent: import("threadcomm").CommBase;
                internal: {
                    _tasks: Map<number, Map<number, import("threadcomm/Meta/Util.types.js").MessageFunction>>;
                    registerTasks(headID: number, taskId: number, run: import("threadcomm/Meta/Util.types.js").MessageFunction): void;
                    isInternal(data: any): boolean;
                    runInternal(data: any, event: any): false | undefined;
                };
                __initalized: boolean;
                __expectedPorts: Record<string, boolean>;
                crypto: Crypto;
                $INIT(threadName: string, threadParentName: string): Promise<void>;
                getSyncedQueue(threadId: string, queueId: string): import("threadcomm/Queue/SyncedQueue.js").SyncedQueue | undefined;
                addComm(comm: import("threadcomm").CommBase): void;
                createComm<T_2>(name: string, mergeObject?: T_2 | undefined): T_2 & import("threadcomm").CommBase;
                createCommManager(data: import("threadcomm/Meta/Manager/Manager.types.js").CommManagerData): import("threadcomm").CommManager;
                getComm(id: string): import("threadcomm").CommBase;
                getCommManager(id: string): import("threadcomm").CommManager;
                getWorkerPort(): Promise<any>;
                registerTasks<T_1>(id: string | number, run: (data: T_1, onDone?: ((data?: any, transfers?: any) => void) | undefined) => void, mode?: "async" | "deferred" | undefined): void;
                onDataSync<T_2, K_1>(dataType: string | number, onSync?: ((data: T_2) => void) | undefined, onUnSync?: ((data: K_1) => void) | undefined): import("threadcomm").DataSync<T_2, K_1>;
            };
            parentComm: import("threadcomm").CommBase;
            worldComm: import("threadcomm").CommBase;
            tasks: {
                data: {
                    syncTextures: void;
                };
                build: {
                    chunk: {
                        tasks: void;
                    };
                    column: void;
                };
                voxelUpdate: {
                    update: void;
                    erase: void;
                    paint: void;
                };
                explosion: void;
                worldSun: void;
                worldGen: {
                    generate: void;
                };
                anaylzer: {
                    propagation: void;
                    update: void;
                };
            };
            hooks: {
                texturesRegistered: import("divine-hooks/Classes/SyncHook.js").SyncHook<{
                    textureDataHasBeenSet: boolean;
                    data: import("../../index.js").TextureTypeUVMap;
                    getTextureUV(data: import("../../index.js").ConstructorTextureData, overlay?: boolean): number;
                    setUVTextureMap(data: import("../../index.js").TextureTypeUVMap): void;
                    releaseTextureData(): void;
                    isReady(): boolean;
                }, void>;
            };
            requests: {
                getLightUpdateRequest(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: any;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): any;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getFlowUpdateRequest(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: null;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        flow: {
                            update: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            rmeove: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                        };
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): null;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getVoxelUpdateRequests(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: null;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        flow: {
                            update: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            rmeove: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                        };
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): null;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getWorldSunRequests(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: null;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        sun: number[];
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): null;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getExplosionRequests(origin: LocationData, radius: number, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: number;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        flow: {
                            update: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            rmeove: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                        };
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                        queue: [x: number, y: number, z: number][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): number;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
            };
            $INIT(): Promise<void>;
            getDataTool(): DataTool;
            getRichDataTool(): import("../../Tools/Data/RichDataTool.js").RichDataTool;
        }) => void>;
        registerVoxel(id: string, run: (locaton: LocationData, deltaTime: number, anayzer: any, DVEC: {
            environment: "node" | "browser";
            UTIL: {
                createPromiseCheck: (data: {
                    check: () => boolean;
                    onReady?: (() => any) | undefined;
                    checkInterval: number;
                    failTimeOut?: number | undefined;
                    onFail?: (() => any) | undefined;
                }) => Promise<boolean>;
                getEnviorment(): "node" | "browser";
                getAQueue<T>(): import("../../Global/Util/Queue.js").Queue<T>;
                merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
                degtoRad(degrees: number): number;
                radToDeg(radians: number): number;
                convertBufferToSAB(buffer: ArrayBuffer): SharedArrayBuffer;
                converSABToBuffer(buffer: SharedArrayBuffer): ArrayBuffer;
            };
            settings: {
                enviorment: "node" | "browser";
                settings: import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData;
                getSettings(): import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData;
                syncSettings(data: import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData): void;
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
            propagation: {
                expolosion: {
                    run(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: number;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            flow: {
                                update: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                                rmeove: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                    noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                            };
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                            queue: [x: number, y: number, z: number][];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): number;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
                flow: {
                    update(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: null;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            flow: {
                                update: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                                rmeove: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                    noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                            };
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): null;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): Promise<void>;
                    remove(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: null;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            flow: {
                                update: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                                rmeove: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                    noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                            };
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): null;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): Promise<void>;
                };
                worldSun: {
                    run(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: null;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            sun: number[];
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): null;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
                rgb: {
                    update(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                    remove(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
                sun: {
                    update(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                    remove(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
            };
            worldGen: {
                worldGen: import("../../index.js").WorldGenInterface | null;
                register: {
                    MAX_ATTEMPTS: number;
                    _requests: Map<string, {
                        attempts: number;
                        dimension: string;
                        chunks: Map<string, [x: number, y: number, z: number]>;
                        voxels: [x: number, y: number, z: number, data: import("../../index.js").RawVoxelData][];
                    }>;
                    registerRequest(dimension: string, x: number, y: number, z: number): string;
                    addToRequest(registerId: string, location: LocationData, rawData: import("../../index.js").RawVoxelData): void;
                    attemptRequestFullFill(registerId: string): boolean;
                };
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
                _brushes: any[];
                setWorldGen(worldGen: import("../../index.js").WorldGenInterface): void;
                generate(data: import("Meta/Tasks/Tasks.types.js").GenerateTasks, onDone: Function): void;
                getBrush(): import("../index.js").WorldGenBrush;
            };
            builder: {
                constructors: {
                    constructors: import("../../Global/Util/UtilMap.js").UtilMap<string, import("../index.js").VoxelConstructor>;
                    get(id: string): import("../index.js").VoxelConstructor;
                    registerVoxel(voxel: import("../index.js").VoxelConstructor | import("../index.js").VoxelConstructor[]): void;
                    defaults: {
                        box: {
                            simple(id: string, textures: import("../../index.js").ConstructorTextureData | Record<import("../../index.js").DirectionNames, import("../../index.js").ConstructorTextureData>): import("../Builder/Constructors/Classes/SimpleBox.constructor.js").SimpleBoxVoxelConstructor;
                            pillar(id: string, textures: import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructorData): import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructor;
                        };
                        stair: {
                            simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleStair.constructor.js").SimpleStairVoxelConstructor;
                        };
                        panel: {
                            simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimplePanel.constructor.js").SimplePanelVoxelConstructor;
                        };
                        crossedPanel: {
                            simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleCrossedPanel.constructor.js").SimpleCrossedPanelVoxelConstructor;
                        };
                        liquid: {
                            simple(id: string, textures: [import("../../index.js").ConstructorTextureData, import("../../index.js").ConstructorTextureData]): import("../Builder/Constructors/Classes/SimpleLiquid.constructor.js").SimpleLiquidConstructor;
                        };
                    };
                };
                textureManager: {
                    textureDataHasBeenSet: boolean;
                    data: import("../../index.js").TextureTypeUVMap;
                    getTextureUV(data: import("../../index.js").ConstructorTextureData, overlay?: boolean): number;
                    setUVTextureMap(data: import("../../index.js").TextureTypeUVMap): void;
                    releaseTextureData(): void;
                    isReady(): boolean;
                };
                processor: {
                    relative: {
                        x: number;
                        y: number;
                        z: number;
                    };
                    nLocation: LocationData;
                    _process(doSecondCheck?: boolean): void;
                    build(location: LocationData): void;
                };
                overrides: {
                    overrides: Record<import("../index.js").OverrideTypes, Map<string, Map<string, (data: import("../index.js").FaceDataOverride) => boolean>>>;
                    registerOverride(type: import("../index.js").OverrideTypes, subjectId: string, neighborShapeId: string, run: (data: import("../index.js").FaceDataOverride) => boolean): void;
                    hasOverride(type: import("../index.js").OverrideTypes, shapeId: string, neighborShapeId: string): boolean;
                    runOverride(type: import("../index.js").OverrideTypes, firstId: string, secondOverride: string, data: import("../index.js").FaceDataOverride): boolean;
                };
                renderedSubstances: {
                    meshers: import("../../Global/Util/UtilMap.js").UtilMap<string, import("../Builder/Tools/VoxelMesherDataTool.js").VoxelMesherDataTool>;
                };
                $INIT(): void;
                buildChunk(location: LocationData, LOD?: number): boolean;
            };
            analyzer: any;
            dataSyncNode: {
                _states: Record<string, boolean>;
                isReady(): boolean;
                voxelPalette: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").VoxelPaletteSyncData, any>;
                voxelData: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").VoxelDataSync, any>;
                dimension: import("threadcomm").DataSync<import("../../Meta/Data/DimensionData.types.js").DimensionData, void>;
                chunk: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                column: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                region: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                regionHeader: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                chunkTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData, void>;
                columnTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData, void>;
                regionTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData[], void>;
                stringMap: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").RegisterStringMapSync, void>;
            };
            data: {
                dimensions: {
                    _count: number;
                    dimensionRecord: Record<string, number>;
                    dimensionMap: Record<number, string>;
                    __defaultDimensionOptions: import("../../Meta/Data/DimensionData.types.js").DimensionOptions;
                    _dimensions: Record<string, import("../../Meta/Data/DimensionData.types.js").DimensionData>;
                    registerDimension(id: string, option: import("../../Meta/Data/DimensionData.types.js").DimensionOptions): void;
                    getDimension(id: string | number): import("../../Meta/Data/DimensionData.types.js").DimensionData;
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
                        voxel(location: LocationData, data: import("../../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
                        __paint(location: LocationData, data: import("../../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
                        erase(location: LocationData): void;
                    };
                };
                worldRegister: {
                    _dimensions: import("../../Meta/Data/WorldData.types.js").WorldDimensions;
                    _cacheOn: boolean;
                    _chunkCache: Map<string, import("../../Meta/Data/WorldData.types.js").ChunkData>;
                    _columnCache: Map<string, import("../../Meta/Data/WorldData.types.js").Column>;
                    cache: {
                        enable(): void;
                        disable(): void;
                        _addChunk(key: string, data: import("../../Meta/Data/WorldData.types.js").ChunkData): void;
                        _addColumn(key: string, data: import("../../Meta/Data/WorldData.types.js").Column): void;
                        _getChunk(key: string): import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        _getColumn(key: string): import("../../Meta/Data/WorldData.types.js").Column | undefined;
                    };
                    dimensions: {
                        add(id: string | number): Map<any, any>;
                        get(id: string | number): Map<string, import("../../Meta/Data/WorldData.types.js").Region> | undefined;
                    };
                    region: {
                        add(location: LocationData, sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Region;
                        _getRegionData(sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Region;
                        get(location: LocationData): false | import("../../Meta/Data/WorldData.types.js").Region;
                        remove(location: LocationData): boolean;
                    };
                    column: {
                        add(location: LocationData, sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Column | undefined;
                        _getColumnData(sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Column;
                        get(location: LocationData): false | import("../../Meta/Data/WorldData.types.js").Column;
                        remove(location: LocationData): boolean;
                        fill(location: LocationData): void;
                        height: {
                            getRelative(location: LocationData): number;
                            getAbsolute(location: LocationData): number;
                        };
                    };
                    chunk: {
                        add(location: LocationData, sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        _getChunkData(sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").ChunkData;
                        addFromServer(chunkBuffer: ArrayBuffer): import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        get(location: LocationData): false | import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        remove(location: LocationData): boolean;
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
                    $INIT(settings: import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData): void;
                };
                register: {
                    stringMaps: {
                        segments: Map<string, Map<string, string[]>>;
                        syncStringMap(data: import("../../Meta/Data/DataSync.types.js").RegisterStringMapSync): void;
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
                    remove(location: LocationData): boolean;
                    add(location: LocationData, buffer: SharedArrayBuffer): void;
                    get(location: LocationData): false | {
                        data: DataView;
                        buffer: SharedArrayBuffer;
                    } | undefined;
                    isStored(location: LocationData): 1 | 0 | -1;
                };
            };
            voxelManager: {
                constructors: import("../../Global/Util/UtilMap.js").UtilMap<string, import("../index.js").VoxelConstructor>;
                get(id: string): import("../index.js").VoxelConstructor;
                registerVoxel(voxel: import("../index.js").VoxelConstructor | import("../index.js").VoxelConstructor[]): void;
                defaults: {
                    box: {
                        simple(id: string, textures: import("../../index.js").ConstructorTextureData | Record<import("../../index.js").DirectionNames, import("../../index.js").ConstructorTextureData>): import("../Builder/Constructors/Classes/SimpleBox.constructor.js").SimpleBoxVoxelConstructor;
                        pillar(id: string, textures: import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructorData): import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructor;
                    };
                    stair: {
                        simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleStair.constructor.js").SimpleStairVoxelConstructor;
                    };
                    panel: {
                        simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimplePanel.constructor.js").SimplePanelVoxelConstructor;
                    };
                    crossedPanel: {
                        simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleCrossedPanel.constructor.js").SimpleCrossedPanelVoxelConstructor;
                    };
                    liquid: {
                        simple(id: string, textures: [import("../../index.js").ConstructorTextureData, import("../../index.js").ConstructorTextureData]): import("../Builder/Constructors/Classes/SimpleLiquid.constructor.js").SimpleLiquidConstructor;
                    };
                };
            };
            TC: {
                threadNumber: number;
                threadName: string;
                environment: "node" | "browser";
                _comms: Record<string, import("threadcomm").CommBase>;
                _commManageras: Record<string, import("threadcomm").CommManager>;
                _queues: Map<string, Map<string, import("threadcomm/Queue/SyncedQueue.js").SyncedQueue>>;
                parent: import("threadcomm").CommBase;
                internal: {
                    _tasks: Map<number, Map<number, import("threadcomm/Meta/Util.types.js").MessageFunction>>;
                    registerTasks(headID: number, taskId: number, run: import("threadcomm/Meta/Util.types.js").MessageFunction): void;
                    isInternal(data: any): boolean;
                    runInternal(data: any, event: any): false | undefined;
                };
                __initalized: boolean;
                __expectedPorts: Record<string, boolean>;
                crypto: Crypto;
                $INIT(threadName: string, threadParentName: string): Promise<void>;
                getSyncedQueue(threadId: string, queueId: string): import("threadcomm/Queue/SyncedQueue.js").SyncedQueue | undefined;
                addComm(comm: import("threadcomm").CommBase): void;
                createComm<T_2>(name: string, mergeObject?: T_2 | undefined): T_2 & import("threadcomm").CommBase;
                createCommManager(data: import("threadcomm/Meta/Manager/Manager.types.js").CommManagerData): import("threadcomm").CommManager;
                getComm(id: string): import("threadcomm").CommBase;
                getCommManager(id: string): import("threadcomm").CommManager;
                getWorkerPort(): Promise<any>;
                registerTasks<T_1>(id: string | number, run: (data: T_1, onDone?: ((data?: any, transfers?: any) => void) | undefined) => void, mode?: "async" | "deferred" | undefined): void;
                onDataSync<T_2, K_1>(dataType: string | number, onSync?: ((data: T_2) => void) | undefined, onUnSync?: ((data: K_1) => void) | undefined): import("threadcomm").DataSync<T_2, K_1>;
            };
            parentComm: import("threadcomm").CommBase;
            worldComm: import("threadcomm").CommBase;
            tasks: {
                data: {
                    syncTextures: void;
                };
                build: {
                    chunk: {
                        tasks: void;
                    };
                    column: void;
                };
                voxelUpdate: {
                    update: void;
                    erase: void;
                    paint: void;
                };
                explosion: void;
                worldSun: void;
                worldGen: {
                    generate: void;
                };
                anaylzer: {
                    propagation: void;
                    update: void;
                };
            };
            hooks: {
                texturesRegistered: import("divine-hooks/Classes/SyncHook.js").SyncHook<{
                    textureDataHasBeenSet: boolean;
                    data: import("../../index.js").TextureTypeUVMap;
                    getTextureUV(data: import("../../index.js").ConstructorTextureData, overlay?: boolean): number;
                    setUVTextureMap(data: import("../../index.js").TextureTypeUVMap): void;
                    releaseTextureData(): void;
                    isReady(): boolean;
                }, void>;
            };
            requests: {
                getLightUpdateRequest(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: any;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): any;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getFlowUpdateRequest(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: null;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        flow: {
                            update: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            rmeove: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                        };
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): null;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getVoxelUpdateRequests(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: null;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        flow: {
                            update: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            rmeove: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                        };
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): null;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getWorldSunRequests(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: null;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        sun: number[];
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): null;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getExplosionRequests(origin: LocationData, radius: number, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: number;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        flow: {
                            update: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            rmeove: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                        };
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                        queue: [x: number, y: number, z: number][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): number;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
            };
            $INIT(): Promise<void>;
            getDataTool(): DataTool;
            getRichDataTool(): import("../../Tools/Data/RichDataTool.js").RichDataTool;
        }) => void): void;
        getVoxel(id: string): false | ((locaton: LocationData, deltaTime: number, anayzer: any, DVEC: {
            environment: "node" | "browser";
            UTIL: {
                createPromiseCheck: (data: {
                    check: () => boolean;
                    onReady?: (() => any) | undefined;
                    checkInterval: number;
                    failTimeOut?: number | undefined;
                    onFail?: (() => any) | undefined;
                }) => Promise<boolean>;
                getEnviorment(): "node" | "browser";
                getAQueue<T>(): import("../../Global/Util/Queue.js").Queue<T>;
                merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
                degtoRad(degrees: number): number;
                radToDeg(radians: number): number;
                convertBufferToSAB(buffer: ArrayBuffer): SharedArrayBuffer;
                converSABToBuffer(buffer: SharedArrayBuffer): ArrayBuffer;
            };
            settings: {
                enviorment: "node" | "browser";
                settings: import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData;
                getSettings(): import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData;
                syncSettings(data: import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData): void;
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
            propagation: {
                expolosion: {
                    run(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: number;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            flow: {
                                update: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                                rmeove: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                    noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                            };
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                            queue: [x: number, y: number, z: number][];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): number;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
                flow: {
                    update(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: null;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            flow: {
                                update: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                                rmeove: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                    noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                            };
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): null;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): Promise<void>;
                    remove(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: null;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            flow: {
                                update: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                                rmeove: {
                                    queue: number[][];
                                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                    noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                };
                            };
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): null;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): Promise<void>;
                };
                worldSun: {
                    run(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: null;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            sun: number[];
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): null;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
                rgb: {
                    update(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                    remove(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
                sun: {
                    update(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                    remove(tasks: {
                        rebuildQueMap: Map<string, boolean>;
                        comm: import("threadcomm").CommBase;
                        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                        LOD: number;
                        syncQueue: LocationData[];
                        aSyncQueue: LocationData[];
                        buildMode: "sync" | "async";
                        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                        tasksType: string;
                        origin: LocationData;
                        data: any;
                        buildQueue: string;
                        originThread: string;
                        queues: {
                            rgb: {
                                update: number[];
                                rmeove: number[];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            sun: {
                                update: number[];
                                rmeove: number[];
                            };
                        };
                        start(): any;
                        stop(): any;
                        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                        getData(): any;
                        getOriginThread(): LocationData;
                        getBuildQueue(): string;
                        getOrigin(): LocationData;
                        needsRebuild(): boolean;
                        needsToUpdateOriginThread(): boolean;
                        setBuldMode(mode: "sync" | "async"): any;
                        addToRebuildQueue(x: number, y: number, z: number): boolean;
                        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                        runRebuildQueue(): any;
                    }): void;
                };
            };
            worldGen: {
                worldGen: import("../../index.js").WorldGenInterface | null;
                register: {
                    MAX_ATTEMPTS: number;
                    _requests: Map<string, {
                        attempts: number;
                        dimension: string;
                        chunks: Map<string, [x: number, y: number, z: number]>;
                        voxels: [x: number, y: number, z: number, data: import("../../index.js").RawVoxelData][];
                    }>;
                    registerRequest(dimension: string, x: number, y: number, z: number): string;
                    addToRequest(registerId: string, location: LocationData, rawData: import("../../index.js").RawVoxelData): void;
                    attemptRequestFullFill(registerId: string): boolean;
                };
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
                _brushes: any[];
                setWorldGen(worldGen: import("../../index.js").WorldGenInterface): void;
                generate(data: import("Meta/Tasks/Tasks.types.js").GenerateTasks, onDone: Function): void;
                getBrush(): import("../index.js").WorldGenBrush;
            };
            builder: {
                constructors: {
                    constructors: import("../../Global/Util/UtilMap.js").UtilMap<string, import("../index.js").VoxelConstructor>;
                    get(id: string): import("../index.js").VoxelConstructor;
                    registerVoxel(voxel: import("../index.js").VoxelConstructor | import("../index.js").VoxelConstructor[]): void;
                    defaults: {
                        box: {
                            simple(id: string, textures: import("../../index.js").ConstructorTextureData | Record<import("../../index.js").DirectionNames, import("../../index.js").ConstructorTextureData>): import("../Builder/Constructors/Classes/SimpleBox.constructor.js").SimpleBoxVoxelConstructor;
                            pillar(id: string, textures: import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructorData): import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructor;
                        };
                        stair: {
                            simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleStair.constructor.js").SimpleStairVoxelConstructor;
                        };
                        panel: {
                            simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimplePanel.constructor.js").SimplePanelVoxelConstructor;
                        };
                        crossedPanel: {
                            simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleCrossedPanel.constructor.js").SimpleCrossedPanelVoxelConstructor;
                        };
                        liquid: {
                            simple(id: string, textures: [import("../../index.js").ConstructorTextureData, import("../../index.js").ConstructorTextureData]): import("../Builder/Constructors/Classes/SimpleLiquid.constructor.js").SimpleLiquidConstructor;
                        };
                    };
                };
                textureManager: {
                    textureDataHasBeenSet: boolean;
                    data: import("../../index.js").TextureTypeUVMap;
                    getTextureUV(data: import("../../index.js").ConstructorTextureData, overlay?: boolean): number;
                    setUVTextureMap(data: import("../../index.js").TextureTypeUVMap): void;
                    releaseTextureData(): void;
                    isReady(): boolean;
                };
                processor: {
                    relative: {
                        x: number;
                        y: number;
                        z: number;
                    };
                    nLocation: LocationData;
                    _process(doSecondCheck?: boolean): void;
                    build(location: LocationData): void;
                };
                overrides: {
                    overrides: Record<import("../index.js").OverrideTypes, Map<string, Map<string, (data: import("../index.js").FaceDataOverride) => boolean>>>;
                    registerOverride(type: import("../index.js").OverrideTypes, subjectId: string, neighborShapeId: string, run: (data: import("../index.js").FaceDataOverride) => boolean): void;
                    hasOverride(type: import("../index.js").OverrideTypes, shapeId: string, neighborShapeId: string): boolean;
                    runOverride(type: import("../index.js").OverrideTypes, firstId: string, secondOverride: string, data: import("../index.js").FaceDataOverride): boolean;
                };
                renderedSubstances: {
                    meshers: import("../../Global/Util/UtilMap.js").UtilMap<string, import("../Builder/Tools/VoxelMesherDataTool.js").VoxelMesherDataTool>;
                };
                $INIT(): void;
                buildChunk(location: LocationData, LOD?: number): boolean;
            };
            analyzer: any;
            dataSyncNode: {
                _states: Record<string, boolean>;
                isReady(): boolean;
                voxelPalette: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").VoxelPaletteSyncData, any>;
                voxelData: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").VoxelDataSync, any>;
                dimension: import("threadcomm").DataSync<import("../../Meta/Data/DimensionData.types.js").DimensionData, void>;
                chunk: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                column: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                region: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                regionHeader: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").WorldDataSync, LocationData>;
                chunkTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData, void>;
                columnTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData, void>;
                regionTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData[], void>;
                stringMap: import("threadcomm").DataSync<import("../../Meta/Data/DataSync.types.js").RegisterStringMapSync, void>;
            };
            data: {
                dimensions: {
                    _count: number;
                    dimensionRecord: Record<string, number>;
                    dimensionMap: Record<number, string>;
                    __defaultDimensionOptions: import("../../Meta/Data/DimensionData.types.js").DimensionOptions;
                    _dimensions: Record<string, import("../../Meta/Data/DimensionData.types.js").DimensionData>;
                    registerDimension(id: string, option: import("../../Meta/Data/DimensionData.types.js").DimensionOptions): void;
                    getDimension(id: string | number): import("../../Meta/Data/DimensionData.types.js").DimensionData;
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
                        voxel(location: LocationData, data: import("../../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
                        __paint(location: LocationData, data: import("../../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
                        erase(location: LocationData): void;
                    };
                };
                worldRegister: {
                    _dimensions: import("../../Meta/Data/WorldData.types.js").WorldDimensions;
                    _cacheOn: boolean;
                    _chunkCache: Map<string, import("../../Meta/Data/WorldData.types.js").ChunkData>;
                    _columnCache: Map<string, import("../../Meta/Data/WorldData.types.js").Column>;
                    cache: {
                        enable(): void;
                        disable(): void;
                        _addChunk(key: string, data: import("../../Meta/Data/WorldData.types.js").ChunkData): void;
                        _addColumn(key: string, data: import("../../Meta/Data/WorldData.types.js").Column): void;
                        _getChunk(key: string): import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        _getColumn(key: string): import("../../Meta/Data/WorldData.types.js").Column | undefined;
                    };
                    dimensions: {
                        add(id: string | number): Map<any, any>;
                        get(id: string | number): Map<string, import("../../Meta/Data/WorldData.types.js").Region> | undefined;
                    };
                    region: {
                        add(location: LocationData, sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Region;
                        _getRegionData(sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Region;
                        get(location: LocationData): false | import("../../Meta/Data/WorldData.types.js").Region;
                        remove(location: LocationData): boolean;
                    };
                    column: {
                        add(location: LocationData, sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Column | undefined;
                        _getColumnData(sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").Column;
                        get(location: LocationData): false | import("../../Meta/Data/WorldData.types.js").Column;
                        remove(location: LocationData): boolean;
                        fill(location: LocationData): void;
                        height: {
                            getRelative(location: LocationData): number;
                            getAbsolute(location: LocationData): number;
                        };
                    };
                    chunk: {
                        add(location: LocationData, sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        _getChunkData(sab: SharedArrayBuffer): import("../../Meta/Data/WorldData.types.js").ChunkData;
                        addFromServer(chunkBuffer: ArrayBuffer): import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        get(location: LocationData): false | import("../../Meta/Data/WorldData.types.js").ChunkData | undefined;
                        remove(location: LocationData): boolean;
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
                    $INIT(settings: import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData): void;
                };
                register: {
                    stringMaps: {
                        segments: Map<string, Map<string, string[]>>;
                        syncStringMap(data: import("../../Meta/Data/DataSync.types.js").RegisterStringMapSync): void;
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
                    remove(location: LocationData): boolean;
                    add(location: LocationData, buffer: SharedArrayBuffer): void;
                    get(location: LocationData): false | {
                        data: DataView;
                        buffer: SharedArrayBuffer;
                    } | undefined;
                    isStored(location: LocationData): 1 | 0 | -1;
                };
            };
            voxelManager: {
                constructors: import("../../Global/Util/UtilMap.js").UtilMap<string, import("../index.js").VoxelConstructor>;
                get(id: string): import("../index.js").VoxelConstructor;
                registerVoxel(voxel: import("../index.js").VoxelConstructor | import("../index.js").VoxelConstructor[]): void;
                defaults: {
                    box: {
                        simple(id: string, textures: import("../../index.js").ConstructorTextureData | Record<import("../../index.js").DirectionNames, import("../../index.js").ConstructorTextureData>): import("../Builder/Constructors/Classes/SimpleBox.constructor.js").SimpleBoxVoxelConstructor;
                        pillar(id: string, textures: import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructorData): import("../Builder/Constructors/Classes/PillarBox.constructor.js").PillarBoxVoxelConstructor;
                    };
                    stair: {
                        simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleStair.constructor.js").SimpleStairVoxelConstructor;
                    };
                    panel: {
                        simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimplePanel.constructor.js").SimplePanelVoxelConstructor;
                    };
                    crossedPanel: {
                        simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("../Builder/Constructors/Classes/SimpleCrossedPanel.constructor.js").SimpleCrossedPanelVoxelConstructor;
                    };
                    liquid: {
                        simple(id: string, textures: [import("../../index.js").ConstructorTextureData, import("../../index.js").ConstructorTextureData]): import("../Builder/Constructors/Classes/SimpleLiquid.constructor.js").SimpleLiquidConstructor;
                    };
                };
            };
            TC: {
                threadNumber: number;
                threadName: string;
                environment: "node" | "browser";
                _comms: Record<string, import("threadcomm").CommBase>;
                _commManageras: Record<string, import("threadcomm").CommManager>;
                _queues: Map<string, Map<string, import("threadcomm/Queue/SyncedQueue.js").SyncedQueue>>;
                parent: import("threadcomm").CommBase;
                internal: {
                    _tasks: Map<number, Map<number, import("threadcomm/Meta/Util.types.js").MessageFunction>>;
                    registerTasks(headID: number, taskId: number, run: import("threadcomm/Meta/Util.types.js").MessageFunction): void;
                    isInternal(data: any): boolean;
                    runInternal(data: any, event: any): false | undefined;
                };
                __initalized: boolean;
                __expectedPorts: Record<string, boolean>;
                crypto: Crypto;
                $INIT(threadName: string, threadParentName: string): Promise<void>;
                getSyncedQueue(threadId: string, queueId: string): import("threadcomm/Queue/SyncedQueue.js").SyncedQueue | undefined;
                addComm(comm: import("threadcomm").CommBase): void;
                createComm<T_2>(name: string, mergeObject?: T_2 | undefined): T_2 & import("threadcomm").CommBase;
                createCommManager(data: import("threadcomm/Meta/Manager/Manager.types.js").CommManagerData): import("threadcomm").CommManager;
                getComm(id: string): import("threadcomm").CommBase;
                getCommManager(id: string): import("threadcomm").CommManager;
                getWorkerPort(): Promise<any>;
                registerTasks<T_1>(id: string | number, run: (data: T_1, onDone?: ((data?: any, transfers?: any) => void) | undefined) => void, mode?: "async" | "deferred" | undefined): void;
                onDataSync<T_2, K_1>(dataType: string | number, onSync?: ((data: T_2) => void) | undefined, onUnSync?: ((data: K_1) => void) | undefined): import("threadcomm").DataSync<T_2, K_1>;
            };
            parentComm: import("threadcomm").CommBase;
            worldComm: import("threadcomm").CommBase;
            tasks: {
                data: {
                    syncTextures: void;
                };
                build: {
                    chunk: {
                        tasks: void;
                    };
                    column: void;
                };
                voxelUpdate: {
                    update: void;
                    erase: void;
                    paint: void;
                };
                explosion: void;
                worldSun: void;
                worldGen: {
                    generate: void;
                };
                anaylzer: {
                    propagation: void;
                    update: void;
                };
            };
            hooks: {
                texturesRegistered: import("divine-hooks/Classes/SyncHook.js").SyncHook<{
                    textureDataHasBeenSet: boolean;
                    data: import("../../index.js").TextureTypeUVMap;
                    getTextureUV(data: import("../../index.js").ConstructorTextureData, overlay?: boolean): number;
                    setUVTextureMap(data: import("../../index.js").TextureTypeUVMap): void;
                    releaseTextureData(): void;
                    isReady(): boolean;
                }, void>;
            };
            requests: {
                getLightUpdateRequest(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: any;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): any;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getFlowUpdateRequest(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: null;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        flow: {
                            update: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            rmeove: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                        };
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): null;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getVoxelUpdateRequests(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: null;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        flow: {
                            update: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            rmeove: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                        };
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): null;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getWorldSunRequests(origin: LocationData, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: null;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        sun: number[];
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): null;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
                getExplosionRequests(origin: LocationData, radius: number, buildQueue?: string, originThread?: string): {
                    rebuildQueMap: Map<string, boolean>;
                    comm: import("threadcomm").CommBase;
                    priority: import("Meta/Tasks/Tasks.types.js").Priorities;
                    LOD: number;
                    syncQueue: LocationData[];
                    aSyncQueue: LocationData[];
                    buildMode: "sync" | "async";
                    buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
                    rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                    tasksType: string;
                    origin: LocationData;
                    data: number;
                    buildQueue: string;
                    originThread: string;
                    queues: {
                        flow: {
                            update: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                            rmeove: {
                                queue: number[][];
                                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                                noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                            };
                        };
                        rgb: {
                            update: number[];
                            rmeove: number[];
                            map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        sun: {
                            update: number[];
                            rmeove: number[];
                        };
                        queue: [x: number, y: number, z: number][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    start(): any;
                    stop(): any;
                    setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
                    getData(): number;
                    getOriginThread(): LocationData;
                    getBuildQueue(): string;
                    getOrigin(): LocationData;
                    needsRebuild(): boolean;
                    needsToUpdateOriginThread(): boolean;
                    setBuldMode(mode: "sync" | "async"): any;
                    addToRebuildQueue(x: number, y: number, z: number): boolean;
                    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                    runRebuildQueue(): any;
                };
            };
            $INIT(): Promise<void>;
            getDataTool(): DataTool;
            getRichDataTool(): import("../../Tools/Data/RichDataTool.js").RichDataTool;
        }) => void);
    };
    processor: {
        columnTool: import("../../Tools/Data/WorldData/ColumnDataTool.js").ColumnDataTool;
        chunkTool: import("../../Tools/Data/WorldData/ChunkDataTool.js").ChunkDataTool;
        goThroughColumn<T_3>(location: LocationData, run: (x: number, y: number, z: number, column: import("../../Tools/Data/WorldData/ColumnDataTool.js").ColumnDataTool) => void): void;
    };
    _flowChecks: number[][];
    runPropagation(data: UpdateTasksO): Promise<void>;
    runUpdate(data: UpdateTasksO): Promise<void>;
};
