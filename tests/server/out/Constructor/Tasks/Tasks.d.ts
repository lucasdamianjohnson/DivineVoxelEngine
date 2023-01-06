import { BuildTasks, ExplosionTasks, GenerateTasks, PaintTasks, PriorityTask, UpdateTasksO, WorldSunTask } from "Meta/Tasks/Tasks.types.js";
export declare const Tasks: {
    build: {
        chunk: {
            tasks: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<PriorityTask<BuildTasks>>;
            run(data: BuildTasks): Promise<void>;
        };
        column: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<BuildTasks>;
    };
    voxelUpdate: {
        erase: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        paint: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<PaintTasks>;
    };
    explosion: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<ExplosionTasks>;
    worldSun: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<WorldSunTask>;
    worldGen: {
        generate: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<GenerateTasks>;
    };
    flow: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
    };
    rgb: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
    };
    sun: {
        update: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
        remove: import("../../Libs/ThreadComm/Tasks/Tasks.js").Task<UpdateTasksO>;
    };
};
