export declare const ExplosionManager: {
    runExplosion(tasks: {
        rebuildQueMap: Map<string, boolean>;
        comm: CommBase;
        priority: import("../../../Meta/Tasks/Tasks.types.js").Priorities;
        LOD: number;
        syncQueue: import("voxelspaces").LocationData[];
        aSyncQueue: import("voxelspaces").LocationData[];
        buildMode: "sync" | "async";
        buildTasks: import("../../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../../Meta/Tasks/Tasks.types.js").BuildTasks>;
        rebuildTasks: import("../../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
        tasksType: string;
        origin: import("voxelspaces").LocationData;
        data: number;
        buildQueue: string;
        originThread: string;
        queues: {
            flow: {
                update: {
                    queue: number[][];
                    map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                };
                rmeove: {
                    queue: number[][];
                    map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                    noRemoveMap: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            rgb: {
                update: number[];
                rmeove: number[];
                map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
            };
            sun: {
                update: number[];
                rmeove: number[];
            };
            queue: [x: number, y: number, z: number][];
            map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
        };
        start(): any;
        stop(): any;
        setPriority(priority: import("../../../Meta/Tasks/Tasks.types.js").Priorities): any;
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
