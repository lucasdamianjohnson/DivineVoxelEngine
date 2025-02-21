import { Vec3Array, Vector3Like } from "@amodx/math";

import { TaskTool } from "../../../Tools/Tasks/TasksTool";
import { TaskSegment } from "./TaskSegment";
import { Generator } from "./Generator";
import { SimulationSector } from "./SimulationSector";
import { WorldSpaces } from "../../../World/WorldSpaces";
import { DimensionSimulation } from "../../Tick/VoxelUpdateTick";

const tempPosition = Vector3Like.Create();
class ActiveSectors {
  _sectors: SimulationSector[] = [];
  _map = new Map<string, SimulationSector>();
  constructor(public dimension: DimensionSegment) {}
  add(x: number, y: number, z: number) {
    const key = WorldSpaces.hash.hashVec3(
      WorldSpaces.sector.getPosition(x, y, z, tempPosition)
    );
    if (this._map.has(key)) return false;
    const newSector = new SimulationSector(this.dimension);
    newSector.position[0] = x;
    newSector.position[1] = y;
    newSector.position[2] = z;
    this._sectors.push(newSector);
    this._map.set(key, newSector);
  }

  get(x: number, y: number, z: number) {
    const key = WorldSpaces.hash.hashVec3(
      WorldSpaces.sector.getPosition(x, y, z, tempPosition)
    );
    if (!this._map.has(key)) return null;
    return this._map.get(key);
  }

  remove(x: number, y: number, z: number) {
    const key = WorldSpaces.hash.hashVec3(
      WorldSpaces.sector.getPosition(x, y, z, tempPosition)
    );
    if (!this._map.has(key)) return false;
    for (let i = 0; i < this._sectors.length; i++) {
      if (this._sectors[i]) this._sectors.splice(i, 1);
    }
  }
}

export class DimensionSegment {
  private tick = new Uint32Array(1);
  tasks = new Map<string, TaskSegment>();
  active = new ActiveSectors(this);
  generators: Generator[] = [];
  simulation = new DimensionSimulation(this);
  _updatePosition = Vector3Like.Create();

  constructor(
    public id: number,
    public taskTool: TaskTool
  ) {}

  incrementTick() {
    this.tick[0]++;
  }

  getTick() {
    return this.tick[0];
  }

  addGenerator(generator: Generator) {
    this.generators.push(generator);
  }

  removeGenerator(generator: Generator) {
    for (let i = 0; i < this.generators.length; i++) {
      if (this.generators[i] == generator) this.generators.splice(i, 1);
    }
  }

  getUpdatePosition() {
    const numGenerators = this.generators.length;
    if (numGenerators === 0) {
      this._updatePosition.x = 0;
      this._updatePosition.y = 0;
      this._updatePosition.z = 0;
      return this._updatePosition;
    }
    if (numGenerators === 1) {
      this._updatePosition.x = this.generators[0].position.x;
      this._updatePosition.y = this.generators[0].position.y;
      this._updatePosition.z = this.generators[0].position.z;
      return this._updatePosition;
    }

    let sumX = 0,
      sumY = 0,
      sumZ = 0;
    for (let i = 0; i < numGenerators; i++) {
      sumX += this.generators[i].position.x;
      sumY += this.generators[i].position.y;
      sumZ += this.generators[i].position.z;
    }

    this._updatePosition.x = sumX / numGenerators;
    this._updatePosition.y = sumY / numGenerators;
    this._updatePosition.z = sumZ / numGenerators;

    return this._updatePosition;
  }

  addTask(id: string, generationTask: boolean) {
    this.tasks.set(id, new TaskSegment(this, generationTask));
  }
  getTask(id: string) {
    const task = this.tasks.get(id);
    if (!task)
      throw new Error(
        `Task with id [${id}] not registered in dimension segment ${this.id}`
      );
    return task;
  }
  clearAllTasks() {
    for (const [key, task] of this.tasks) {
      task.clear();
    }
  }

  logTasks() {
    const tasks: string[] = [];
    for (const [key, task] of this.tasks) {
      tasks.push(`${key} | ${task.waitingFor}`);
    }
    return tasks.join("\n");
  }
}
