import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
export declare const DVEC: {
    environment: "node" | "browser";
    __settingsHaveBeenSynced: boolean;
    UTIL: {
        createPromiseCheck: (data: {
            check: () => boolean;
            onReady?: (() => any) | undefined;
            checkInterval: number;
            failTimeOut?: number | undefined;
            onFail?: (() => any) | undefined;
        }) => Promise<boolean>;
        getEnviorment(): "node" | "browser";
        getAQueue<T>(): import("../Global/Util/Queue.js").Queue<T>;
        merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
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
    propagation: {
        expolosion: {
            run(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "sync" | "async";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: number;
                buildQueue: string;
                originThread: string;
                queues: {
                    flow: {
                        update: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        rmeove: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                            noRemoveMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                    };
                    rgb: {
                        update: number[];
                        rmeove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        rmeove: number[];
                    };
                    queue: [x: number, y: number, z: number][];
                    map: import("../Global/Util/VisistedMap.js").VisitedMap;
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): number;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
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
                comm: CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "sync" | "async";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: null;
                buildQueue: string;
                originThread: string;
                queues: {
                    flow: {
                        update: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        rmeove: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                            noRemoveMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                    };
                    rgb: {
                        update: number[];
                        rmeove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        rmeove: number[];
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): null;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
                needsRebuild(): boolean;
                needsToUpdateOriginThread(): boolean;
                setBuldMode(mode: "sync" | "async"): any;
                addToRebuildQueue(x: number, y: number, z: number): boolean;
                addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                runRebuildQueue(): any;
            }): Promise<void>;
            remove(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "sync" | "async";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: null;
                buildQueue: string;
                originThread: string;
                queues: {
                    flow: {
                        update: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        rmeove: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                            noRemoveMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                    };
                    rgb: {
                        update: number[];
                        rmeove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        rmeove: number[];
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): null;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
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
                comm: CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "sync" | "async";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: null;
                buildQueue: string;
                originThread: string;
                queues: {
                    sun: number[];
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): null;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
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
                comm: CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "sync" | "async";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: any;
                buildQueue: string;
                originThread: string;
                queues: {
                    rgb: {
                        update: number[];
                        rmeove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        rmeove: number[];
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): any;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
                needsRebuild(): boolean;
                needsToUpdateOriginThread(): boolean;
                setBuldMode(mode: "sync" | "async"): any;
                addToRebuildQueue(x: number, y: number, z: number): boolean;
                addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                runRebuildQueue(): any;
            }): void;
            remove(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "sync" | "async";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: any;
                buildQueue: string;
                originThread: string;
                queues: {
                    rgb: {
                        update: number[];
                        rmeove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        rmeove: number[];
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): any;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
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
                comm: CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "sync" | "async";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: any;
                buildQueue: string;
                originThread: string;
                queues: {
                    rgb: {
                        update: number[];
                        rmeove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        rmeove: number[];
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): any;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
                needsRebuild(): boolean;
                needsToUpdateOriginThread(): boolean;
                setBuldMode(mode: "sync" | "async"): any;
                addToRebuildQueue(x: number, y: number, z: number): boolean;
                addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                runRebuildQueue(): any;
            }): void;
            remove(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "sync" | "async";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: any;
                buildQueue: string;
                originThread: string;
                queues: {
                    rgb: {
                        update: number[];
                        rmeove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        rmeove: number[];
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): any;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
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
        worldGen: import("../index.js").WorldGenInterface | null;
        register: {
            MAX_ATTEMPTS: number;
            _requests: Map<string, {
                attempts: number;
                dimension: string;
                chunks: Map<string, [x: number, y: number, z: number]>;
                voxels: [x: number, y: number, z: number, data: import("../index.js").RawVoxelData][];
            }>;
            registerRequest(dimension: string, x: number, y: number, z: number): string;
            addToRequest(registerId: string, location: import("voxelspaces").LocationData, rawData: import("../index.js").RawVoxelData): void;
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
        setWorldGen(worldGen: import("../index.js").WorldGenInterface): void;
        generate(data: import("../Meta/Tasks/Tasks.types.js").GenerateTasks, onDone: Function): void;
        getBrush(): import("../Tools/Brush/Brush.js").BrushTool & {
            requestsId: string;
            paint(this: import("../Tools/Brush/Brush.js").BrushTool): import("../Tools/Brush/Brush.js").BrushTool;
        };
    };
    builder: {
        textureManager: {
            textureDataHasBeenSet: boolean;
            data: import("../index.js").TextureTypeUVMap;
            getTextureUV(data: import("../index.js").ConstructorTextureData, overlay?: boolean): number;
            setUVTextureMap(data: import("../index.js").TextureTypeUVMap): void;
            releaseTextureData(): void;
            isReady(): boolean;
        };
        shapeManager: {
            shapes: Map<string, import("../index.js").VoxelShape>;
            shapeCount: number;
            registerShape(shapeObject: import("../index.js").VoxelShape): void;
            getShape(shapeId: string): import("../index.js").VoxelShape;
        };
        chunkMesher: {
            voxelBuildOrder: string[];
            buildChunkMesh(location: import("voxelspaces").LocationData, template: Record<string, import("../Meta/Constructor/VoxelTemplate.types.js").VoxelTemplate>, LOD?: number): void;
        };
        processor: {
            LOD: number;
            mDataTool: import("../index.js").ConstructorDataTool;
            nDataTool: import("../index.js").ConstructorDataTool;
            faceByte: {
                _rotationMap: Record<import("../Meta/Constructor/Geometry/Geometry.types.js").TextureRotations, number>;
                _rotationReverseMap: Record<number, import("../Meta/Constructor/Geometry/Geometry.types.js").TextureRotations>;
                _setFaceTextureState: Record<import("../index.js").DirectionNames, (state: number, faceBit: number) => number>;
                _getFaceTextureState: Record<import("../index.js").DirectionNames, (faceBit: number) => number>;
                _setFaceRotateState: Record<import("../index.js").DirectionNames, (state: number, faceBit: number) => number>;
                _getFaceRotateState: Record<import("../index.js").DirectionNames, (faceBit: number) => number>;
                _markExposedFace: Record<import("../index.js").DirectionNames, (faceBit: number) => number>;
                _checkExposedFace: Record<import("../index.js").DirectionNames, (faceBit: number) => boolean>;
                markFaceAsExposed(direction: import("../index.js").DirectionNames, rawData: number): number;
                isFaceExposed(direction: import("../index.js").DirectionNames, rawData: number): boolean;
                setFaceRotateState(direction: import("../index.js").DirectionNames, state: number, rawData: number): number;
                getFaceRotateState(direction: import("../index.js").DirectionNames, rawData: number): number;
                setFaceTextureState(direction: import("../index.js").DirectionNames, rotation: import("../Meta/Constructor/Geometry/Geometry.types.js").TextureRotations, rawData: number): number;
                getFaceTextureState(direction: import("../index.js").DirectionNames, rawData: number): import("../Meta/Constructor/Geometry/Geometry.types.js").TextureRotations;
            };
            lightData: {
                SRS: number;
                _lightValues: [s: number, r: number, g: number, b: number];
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
                hasSunLight(sl: number): boolean;
                mixLight(l1: number, l2: number): number;
                getRGB(sl: number): number;
                setRGB(value: number, sl: number): number;
                decodeLightFromVoxelData(voxelData: number): number;
                encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
                setLightValues(values: number[]): number;
                getLightValues(value: number): [s: number, r: number, g: number, b: number];
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
                minusOneForAll(sl: number): number;
            };
            calculatFlow: typeof import("./Builder/Processor/Functions/CalculateFlow.js").CalculateFlow;
            voxellightMixCalc: typeof import("./Builder/Processor/Functions/CalculateVoxelLight.js").VoxelLightMixCalc;
            doVoxelLight: typeof import("./Builder/Processor/Functions/CalculateVoxelLight.js").CalculateVoxelLight;
            nLocation: import("voxelspaces").LocationData;
            exposedFaces: number[];
            faceStates: number[];
            textureRotation: import("../Meta/Constructor/Geometry/Geometry.types.js").TextureRotations[];
            settings: {
                doAO: boolean;
                doSun: boolean;
                doRGB: boolean;
                ignoreSun: boolean;
                entity: boolean;
                composedEntity: number;
            };
            faceDataOverride: import("../Meta/Constructor/OverRide.types.js").FaceDataOverride;
            template: Record<string, import("../Meta/Constructor/VoxelTemplate.types.js").VoxelTemplate>;
            getVoxelTemplate(): import("../Meta/Constructor/VoxelTemplate.types.js").VoxelTemplate;
            $INIT(): void;
            cullCheck(face: import("../index.js").DirectionNames, voxelObject: import("../index.js").VoxelConstructor, voxelShape: import("../index.js").VoxelShape, voxelSubstance: string, faceBit: number): number;
            faceStateCheck(face: import("../index.js").DirectionNames, faceBit: number): number;
            _process(doSecondCheck?: boolean): void;
            makeAllChunkTemplates(location: import("voxelspaces").LocationData, LOD?: number): Record<string, import("../Meta/Constructor/VoxelTemplate.types.js").VoxelTemplate>;
            syncSettings(settings: EngineSettingsData): void;
            flush(): void;
        };
        substanceRules: {
            rules: Map<string, Map<string, boolean>>;
            parents: Map<string, string>;
            registerSubstance(id: string, substanceCulls?: string[] | undefined, parentId?: string | undefined): void;
            $INIT(): void;
            exposedCheck(subject: string, neightborVoxel: string): boolean;
            getSubstanceParent(id: string): string;
        };
        overrides: {
            overrides: Record<import("../Meta/Constructor/OverRide.types.js").OverrideTypes, Map<string, Map<string, (data: import("../Meta/Constructor/OverRide.types.js").FaceDataOverride) => boolean>>>;
            registerOverride(type: import("../Meta/Constructor/OverRide.types.js").OverrideTypes, subjectId: string, neighborShapeId: string, run: (data: import("../Meta/Constructor/OverRide.types.js").FaceDataOverride) => boolean): void;
            hasOverride(type: import("../Meta/Constructor/OverRide.types.js").OverrideTypes, shapeId: string, neighborShapeId: string): boolean;
            runOverride(type: import("../Meta/Constructor/OverRide.types.js").OverrideTypes, shapeId: string, neighborShapeId: string, data: import("../Meta/Constructor/OverRide.types.js").FaceDataOverride): boolean;
        };
        dimension: number;
        $INIT(): Promise<void>;
        syncSettings(settings: EngineSettingsData): void;
        buildChunk(location: import("voxelspaces").LocationData, LOD?: number): true | undefined;
        constructEntity(): void;
    };
    analyzer: {
        updater: {
            _voxels: Map<string, (locaton: import("voxelspaces").LocationData, deltaTime: number, anayzer: any, DVEC: any) => void>;
            registerVoxel(id: string, run: (locaton: import("voxelspaces").LocationData, deltaTime: number, anayzer: any, DVEC: any) => void): void;
            getVoxel(id: string): false | ((locaton: import("voxelspaces").LocationData, deltaTime: number, anayzer: any, DVEC: any) => void);
        };
        processor: {
            columnTool: import("../Tools/Data/WorldData/ColumnDataTool.js").ColumnDataTool;
            chunkTool: import("../Tools/Data/WorldData/ChunkDataTool.js").ChunkDataTool;
            goThroughColumn<T_2>(location: import("voxelspaces").LocationData, run: (x: number, y: number, z: number, column: import("../Tools/Data/WorldData/ColumnDataTool.js").ColumnDataTool) => void): void;
        };
        _flowChecks: number[][];
        runPropagation(data: import("../Meta/Tasks/Tasks.types.js").UpdateTasksO): Promise<void>;
        runUpdate(data: import("../Meta/Tasks/Tasks.types.js").UpdateTasksO): Promise<void>;
    };
    dataSyncNode: {
        _states: Record<string, boolean>;
        isReady(): boolean;
        voxelPalette: any;
        voxelData: any;
        dimension: any;
        chunk: any;
        column: any;
        region: any;
        regionHeader: any;
        chunkTags: any;
        columnTags: any;
        regionTags: any;
        stringMap: any;
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
        };
        world: {
            _currentionDimension: string;
            paint: {
                _dt: import("../Tools/Data/DataTool.js").DataTool;
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
        columnTags: any;
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
        chunkTags: any;
        regionTags: any;
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
    voxelManager: {
        voxelObjects: Map<string, import("../index.js").VoxelConstructor>;
        getVoxel(id: string): import("../index.js").VoxelConstructor;
        registerVoxel(voxel: import("../index.js").VoxelConstructor | import("../index.js").VoxelConstructor[]): void;
        defaults: {
            box: {
                simple(id: string, textures: import("../index.js").ConstructorTextureData | Record<import("../index.js").DirectionNames, import("../index.js").ConstructorTextureData>): import("./Builder/Constructors/Voxel/classes/Box.constructor.js").BoxVoxelConstructor;
                pillar(id: string, textures: import("./Builder/Constructors/Voxel/classes/Box.constructor.js").PillarBoxVoxelConstructorData): import("./Builder/Constructors/Voxel/classes/Box.constructor.js").PillarBoxVoxelConstructor;
            };
            panel: {
                simple(id: string, texture: import("../index.js").ConstructorTextureData): import("./Builder/Constructors/Voxel/classes/Panel.constructor.js").PanelVoxelConstructor;
            };
            liquid: {
                simple(id: string, textures: [import("../index.js").ConstructorTextureData, import("../index.js").ConstructorTextureData]): import("./Builder/Constructors/Voxel/classes/Liquid.constructor.js").LiquidVoxelConstructor;
            };
        };
    };
    TC: any;
    parentComm: any;
    worldComm: any;
    tasks: {
        data: {
            syncTextures: any;
        };
        build: {
            chunk: {
                tasks: any;
                run(data: import("../Meta/Tasks/Tasks.types.js").BuildTasks): Promise<void>;
            };
            column: any;
        };
        voxelUpdate: {
            erase: any;
            paint: any;
        };
        explosion: any;
        worldSun: any;
        worldGen: {
            generate: any;
        };
        anaylzer: {
            propagation: any;
            update: any;
        };
        flow: {
            update: any;
            remove: any;
        };
        rgb: {
            update: any;
            remove: any;
        };
        sun: {
            update: any;
            remove: any;
        };
    };
    tasksQueue: {
        tasks: Map<import("../Meta/Tasks/Tasks.types.js").Priorities, [id: string, data: any][]>;
        addTasks(priority: import("../Meta/Tasks/Tasks.types.js").Priorities, data: any, run: (data: any) => void): void;
        $INIT(): void;
    };
    hooks: {
        texturesRegistered: any;
    };
    syncSettings(data: EngineSettingsData): void;
    reStart(): void;
    isReady(): any;
    $INIT(): Promise<void>;
    getDataTool(): import("../index.js").ConstructorDataTool;
};
export declare type DivineVoxelEngineConstructor = typeof DVEC;
