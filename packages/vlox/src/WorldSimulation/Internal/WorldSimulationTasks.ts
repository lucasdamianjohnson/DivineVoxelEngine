import { WorldRegister } from "../../World/WorldRegister";
import { Sector } from "../../World/index";
import { WorldSimulationTools } from "./WorldSimulationTools";
import { TaskRegister } from "./TaskRegister";
import { Circle, Square } from "@amodx/math";
import { BinaryTaskType, Threads } from "@amodx/threads";
import { setLocationData } from "../../Util/LocationData";
import { WorldSpaces } from "../../World/WorldSpaces";
const sectorSquare = new Square();

export class WorldSimulationTasks {
  /**# Load Sectors
   * ---
   */
  static readonly worldLoadTasks = TaskRegister.addTasks({
    id: "load",
    propagationBlocking: true,
    async run(dimesnion, location, taskId, task) {
      const [dimension, x, y, z] = location;
      const sector = WorldRegister.sectors.get(location[0], x, y, z);
      if (sector) return task.completeTask(taskId);
      if (!WorldSimulationTools.worldStorage) {
        WorldRegister.sectors.new(location[0], x, y, z);
        return task.completeTask(taskId);
      }
      const loaded = await WorldSimulationTools.worldStorage.loadSector([
        dimension,
        x,
        y,
        z,
      ]);
      if (!loaded) {
        WorldRegister.sectors.new(location[0], x, y, z);
      }
      task.completeTask(taskId);
    },
  });
  /**# Generate Sectors
   * ---
   */
  static readonly worldGenTasks = TaskRegister.addTasks({
    id: "generate",
    propagationBlocking: true,
    checkDone(location) {
      return (
        WorldRegister.sectors
          .get(...location)
          ?.getBitFlag(Sector.FlagIds.isWorldGenDone) || false
      );
    },
    run(dimension, location, taskId, task) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector)
        throw new Error(
          `Sector at ${location.toString()} does not exist when attempting generation.`
        );

      if (sector.getBitFlag(Sector.FlagIds.isWorldGenDone))
        return task.completeTask(taskId);
      WorldSimulationTools.taskTool.generate.run(location);
    },
  });
  /**# Decorate Sectors
   * ---
   */
  static readonly worldDecorateTasks = TaskRegister.addTasks({
    id: "decorate",
    propagationBlocking: true,
    checkDone(location) {
      return (
        WorldRegister.sectors
          .get(...location)
          ?.getBitFlag(Sector.FlagIds.isWorldDecorDone) || false
      );
    },
    run(dimension, location, taskId, task) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector)
        throw new Error(
          `Sector at ${location.toString()} does not exist when attempting decoration.`
        );

      if (sector.getBitFlag(Sector.FlagIds.isWorldDecorDone))
        return task.completeTask(taskId);
      WorldSimulationTools.taskTool.decorate.run(location);
    },
  });
  /**# World Sun
   * ---
   */
  static readonly worldSunTasks = TaskRegister.addTasks({
    id: "wolrd_sun",
    propagationBlocking: true,
    checkDone(location) {
      return (
        WorldRegister.sectors
          .get(...location)
          ?.getBitFlag(Sector.FlagIds.isWorldSunDone) || false
      );
    },
    run(dimension, location, taskId, task) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector)
        throw new Error(
          `Sector at ${location.toString()} does not exist when attempting world sun.`
        );

      if (sector.getBitFlag(Sector.FlagIds.isWorldSunDone))
        return task.completeTask(taskId);
      WorldSimulationTools.taskTool.worldSun.run(location);
    },
  });
  /**# World Propagation
   * ---
   */
  static readonly worldPropagationTasks = TaskRegister.addTasks({
    id: "propagation",
    propagationBlocking: true,
    checkDone(location) {
      return (
        WorldRegister.sectors
          .get(...location)
          ?.getBitFlag(Sector.FlagIds.isWorldPropagationDone) || false
      );
    },
    run(dimension, location, taskId, task) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector)
        throw new Error(
          `Sector at ${location.toString()} does not exist when attempting propagation.`
        );

      if (sector.getBitFlag(Sector.FlagIds.isWorldPropagationDone))
        return task.completeTask(taskId);
      WorldSimulationTools.taskTool.propagation.run(location);
    },
  });
  /**# Save Sector
   * ---
   */
  static readonly saveTasks = TaskRegister.addTasks({
    id: "save",
    async run(dimension, location, taskId, task) {
      if (!WorldSimulationTools.worldStorage) return task.completeTask(taskId);
      await WorldSimulationTools.worldStorage.saveSector(location);
      task.completeTask(taskId);
    },
  });
  /**# Save & Unload Sector
   * ---
   */
  static readonly unloadTasks = TaskRegister.addTasks({
    id: "unload",
    predicate(location, dimension) {
      sectorSquare.sideLength = WorldSpaces.sector.bounds.x;
      sectorSquare.center.x = location[1] + WorldSpaces.sector.bounds.x / 2;
      sectorSquare.center.y = location[3] + WorldSpaces.sector.bounds.z / 2;

      for (let i = 0; i < dimension.generators.length; i++) {
        const gen = dimension.generators[i];
        if (
          Circle.IsSquareInsideOrTouchingCircle(sectorSquare, gen._maxCircle)
        ) {
          return false;
        }
      }
      return true;
    },
    async run(dimension, location, taskId, task) {
      if (!WorldSimulationTools.worldStorage) {
        WorldRegister.sectors.removeAt(location);
        return task.completeTask(taskId);
      }
      await WorldSimulationTools.worldStorage.unloadSector(location);
      task.completeTask(taskId);
    },
  });
  /**# Build Task
   * ---
   */
  static readonly buildTasks = TaskRegister.addTasks({
    id: "build_tasks",
    sort: true,
    run(dimension, location, taskId, task) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector)
        throw new Error(
          `Sector at ${location.toString()} does not exist when attempting building.`
        );
      WorldSimulationTools.taskTool.build.section.run(location, null);
      task.completeTask(taskId);
    },
  });
  static readonly unbuildTasks = TaskRegister.addTasks({
    id: "unbuild_tasks",
    sort: true,
    propagationBlocking: true,
    predicate(location, dimension) {
      sectorSquare.sideLength = WorldSpaces.sector.bounds.x;
      sectorSquare.center.x = location[1] + WorldSpaces.sector.bounds.x / 2;
      sectorSquare.center.y = location[3] + WorldSpaces.sector.bounds.z / 2;
      for (let i = 0; i < dimension.generators.length; i++) {
        const gen = dimension.generators[i];
        if (
          Circle.IsSquareInsideOrTouchingCircle(sectorSquare, gen._renderCircle)
        ) {
          return false;
        }
      }
      return true;
    },
    run(dimension, location, taskId, task) {
      const view = Threads.createBinaryTask(16);
      setLocationData(view, location);
      WorldSimulationTools.parent.runBinaryTask("remove-sector", view);
      dimension.rendered.remove(location[1], location[2], location[3]);
      task.completeTask(taskId);
    },
  });
  static readonly logicTasks = TaskRegister.addTasks({
    id: "logic_tasks",
    sort: true,
    run(dimension, location, taskId, task) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector)
        throw new Error(
          `Sector at ${location.toString()} does not exist when attempting logic.`
        );
      WorldSimulationTools.taskTool.logic.run(location, null, () => {
        task.completeTask(taskId);
      });
    },
  });
}
