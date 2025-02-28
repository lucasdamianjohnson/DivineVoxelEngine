import { PerlinGen } from "./Gen/PerlinGen";
import { TaskTool } from "@divinevoxel/vlox/Tools/Tasks/TasksTool";
import { WorldGen } from "./Gen/WorldGen";
import { DivineVoxelEngineWorld } from "@divinevoxel/vlox/Contexts/World/DivineVoxelEngineWorld";
import { BrushTool } from "@divinevoxel/vlox/Tools/Brush/Brush";
import { WorldSpaces } from "@divinevoxel/vlox/World/WorldSpaces";
export async function FlatTest(DVEW: DivineVoxelEngineWorld) {
  const tStart = performance.now();
  const numChunks = 4;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const tasks = new TaskTool(DVEW.threads.meshers, DVEW.threads.generators);
  const propagation = tasks.generation.propagation.createQueue();
  const worldSun = tasks.generation.worldSun.createQueue();
  const brush = new BrushTool();
  brush.start(0, 0, 0, 0);

  PerlinGen.worldCursor.setFocalPoint(0, 0, 0, 0);
  WorldGen.worldCursor.setFocalPoint(0, 0, 0, 0);
  let genOne = true;
  for (let x = startX - 32; x < endX + 32; x += 16) {
    for (let z = startZ - 32; z < endZ + 32; z += 16) {
      brush.setXYZ(x, 0, z).newSector();
      propagation.add([0, x, 0, z]);
      worldSun.add([0, x, 0, z]);
    }
  }
  if (genOne) {
    //  WorldGen.pyramidColumn(0, 0);
    //   WorldGen.flatColumn(0, 0);
    PerlinGen.generateTest(0, 0, true);
    // brush.setId("dve_dream_leaves").setXYZ(0, 1, -2).paint();
    // brush.setId("dve_dread_stone").setXYZ(0, 1, -1).paint();

    //  PerlinGen.generateTest(0, 0);
  } else {
    for (let x = startX; x < endX; x += 16) {
      for (let z = startZ; z < endZ; z += 16) {
        //   WorldGen.flatColumn(x,z);
        PerlinGen.generateTest(x, z, true);
        /*        if (Math.random() > 0.5) {
          WorldGen.pyramidColumn(x, z);
          continue;
        } 
        WorldGen.upsideDownPyramid(x, z); */
        //  WorldGen.flatColumn(x, z);
      }
    }
  }
  const tPropS = performance.now();
  await propagation.run();
  const tPropE = performance.now();
  console.log("Propagation done = ", tPropE - tPropS);
  const tSunS = performance.now();
  await worldSun.run();
  const tSunE = performance.now();

  const buildQueue = tasks.build.sector.createQueue();
  console.log("Sun done = ", tSunE - tSunS);

  for (let x = startX - 32; x < endX + 32; x += 16) {
    for (let z = startZ - 32; z < endZ + 32; z += 16) {
      buildQueue.add([0, x, 0, z]);
    }
  }
  await buildQueue.run();
  const tEnd = performance.now();

  console.log("ALL DONE! total time = ", tEnd - tStart);
}
