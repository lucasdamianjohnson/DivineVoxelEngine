import InitDataSync from "../Contexts/Base/Remote/InitDataSync";
import { DivineVoxelEngineWorld } from "../Contexts/World/DivineVoxelEngineWorld";
import { Thread, Threads } from "@amodx/threads/";
import { CreatePromiseCheck } from "@amodx/core/Intervals/CreatePromiseCheck.js";
import InitWorldTasks from "../World/InitTasks";
import { Environment } from "@amodx/core/Environment/Environment";
import { VoxelTagStates } from "../Voxels/State/VoxelTagStates";
import { SchemaRegister } from "../Voxels/State/SchemaRegister";
import { WorldStorageInterface } from "World/Storage/WorldStorage.interface";
type StartWorldProps = {
  worldStorage?: WorldStorageInterface;
};
export async function StartWorld(props: StartWorldProps = {}) {
  const DVEW = new DivineVoxelEngineWorld();

  DivineVoxelEngineWorld.environment = Environment.nodeJS.isNode
    ? "node"
    : "browser";
  Threads.threadName = "world";
  let parent = "render";
  if (DivineVoxelEngineWorld.environment == "node") {
    parent = "server";
  }
  await Threads.init("world", self, parent);
  let ready = false;
  InitDataSync({
    onSync(data) {
      if (data.threads.nexus) {
        DVEW.threads.addThread(DVEW.threads.nexus);
      }
      if (data.modelData) {
        const modelData = data.modelData;
        for (const model of modelData.models) {
          SchemaRegister.registerModel(model.id, model.schema);
        }
        for (const voxel of modelData.voxels) {
          SchemaRegister.registerVoxel(
            voxel.id,
            voxel.modelId,
            voxel.modSchema
          );
        }
        VoxelTagStates.load(modelData.tagState);
      }

      ready = true;
    },
  });

  await CreatePromiseCheck({
    check: () => ready,
    checkInterval: 1,
  });

  const threads: Thread[] = [
    DVEW.threads.parent,
    ...DVEW.threads.constructors.getThreads(),
  ];
  if (DVEW.threads.nexus.isPortSet) {
    threads.push(DVEW.threads.nexus);
  }

  InitWorldTasks({
    threads,
    worldStorage: props.worldStorage,
  });
  return DVEW;
}
