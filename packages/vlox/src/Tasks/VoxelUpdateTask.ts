import { WorldCursor } from "../World/Cursor/WorldCursor";
import { Vec3Array, Vector3Like } from "@amodx/math";
import { WorldSpaces } from "../World/WorldSpaces";
import { LocationData } from "../Math";
import { WorldRegister } from "../World/WorldRegister";

export class TaskMap {
  _map: boolean[] = [];
  get size() {
    return this._map.length;
  }
  origin = Vector3Like.Create();
  start(x: number, y: number, z: number) {
    this._map.length = 0;
    this.origin.x = x;
    this.origin.y = y;
    this.origin.z = z;
  }
  has(x: number, y: number, z: number) {
    return (
      this._map[
        Vector3Like.HashXYZ(
          x - this.origin.x,
          y - this.origin.y,
          z - this.origin.z
        )
      ] !== undefined
    );
  }
  add(x: number, y: number, z: number) {
    this._map[
      Vector3Like.HashXYZ(
        x - this.origin.x,
        y - this.origin.y,
        z - this.origin.z
      )
    ] = true;
  }
  delete(x: number, y: number, z: number) {
    //@ts-ignore
    this._map[
      Vector3Like.HashXYZ(
        x - this.origin.x,
        y - this.origin.y,
        z - this.origin.z
      )
    ] = undefined;
  }
  clear() {
    this._map.length = 0;
  }
}

const NegativeInfinityVec3 = Vector3Like.Create(
  -Infinity,
  -Infinity,
  -Infinity
);
const InfinityVec3 = Vector3Like.Create(Infinity, Infinity, Infinity);
const tempPosition = Vector3Like.Create();
class UpdatedBounds {
  displayMin = Vector3Like.Clone(InfinityVec3);
  displayMax = Vector3Like.Clone(NegativeInfinityVec3);
  logicMin = Vector3Like.Clone(InfinityVec3);
  logicMax = Vector3Like.Clone(NegativeInfinityVec3);
  propagationMin = Vector3Like.Clone(InfinityVec3);
  propagationMax = Vector3Like.Clone(NegativeInfinityVec3);

  dimension = 0;
  constructor(public _task: VoxelUpdateTask) {}

  start(dimension?: number) {
    this.dimension = dimension || 0;
    Vector3Like.Copy(this.displayMin, InfinityVec3);
    Vector3Like.Copy(this.displayMax, NegativeInfinityVec3);
    Vector3Like.Copy(this.logicMin, InfinityVec3);
    Vector3Like.Copy(this.logicMax, NegativeInfinityVec3);
    Vector3Like.Copy(this.propagationMin, InfinityVec3);
    Vector3Like.Copy(this.propagationMax, NegativeInfinityVec3);
  }

  updateDisplay(x: number, y: number, z: number) {
    if (x < this.displayMin.x) this.displayMin.x = x;
    if (y < this.displayMin.y) this.displayMin.y = y;
    if (z < this.displayMin.z) this.displayMin.z = z;
    if (x > this.displayMax.x) this.displayMax.x = x;
    if (y > this.displayMax.y) this.displayMax.y = y;
    if (z > this.displayMax.z) this.displayMax.z = z;
  }

  updateLogic(x: number, y: number, z: number) {
    if (x < this.logicMin.x) this.logicMin.x = x;
    if (y < this.logicMin.y) this.logicMin.y = y;
    if (z < this.logicMin.z) this.logicMin.z = z;
    if (x > this.logicMax.x) this.logicMax.x = x;
    if (y > this.logicMax.y) this.logicMax.y = y;
    if (z > this.logicMax.z) this.logicMax.z = z;
  }

  updatePropagation(x: number, y: number, z: number) {
    if (x < this.propagationMin.x) this.propagationMin.x = x;
    if (y < this.propagationMin.y) this.propagationMin.y = y;
    if (z < this.propagationMin.z) this.propagationMin.z = z;
    if (x > this.propagationMax.x) this.propagationMax.x = x;
    if (y > this.propagationMax.y) this.propagationMax.y = y;
    if (z > this.propagationMax.z) this.propagationMax.z = z;
  }

  getSections() {
    const minSectionPos = WorldSpaces.section.getPosition(
      this.displayMin.x - 1,
      this.displayMin.y - 1,
      this.displayMin.z - 1,
      tempPosition
    );
    const minX = minSectionPos.x;
    const minY = minSectionPos.y;
    const minZ = minSectionPos.z;
    const maxSectionPos = WorldSpaces.section.getPosition(
      this.displayMax.x + 1,
      this.displayMax.y + 1,
      this.displayMax.z + 1,
      tempPosition
    );
    const maxX = maxSectionPos.x;
    const maxY = maxSectionPos.y;
    const maxZ = maxSectionPos.z;
    const sectionPositions: Vec3Array[] = [];
    for (let x = minX; x <= maxX; x += WorldSpaces.section.bounds.x) {
      for (let y = minY; y <= maxY; y += WorldSpaces.section.bounds.y) {
        for (let z = minZ; z <= maxZ; z += WorldSpaces.section.bounds.z) {
          if (!this._task.nDataCursor.inBounds(x, y, z)) continue;
          sectionPositions.push([x, y, z]);
        }
      }
    }

    return sectionPositions;
  }

  markDisplayDirty() {
    if (
      this.displayMax.x == -Infinity ||
      this.displayMax.y == -Infinity ||
      this.displayMax.z == -Infinity
    )
      return false;
    if (
      this.displayMin.x == Infinity ||
      this.displayMin.y == Infinity ||
      this.displayMin.z == Infinity
    )
      return false;
    const minSectionPos = WorldSpaces.section.getPosition(
      this.displayMin.x - 1,
      this.displayMin.y - 1,
      this.displayMin.z - 1,
      tempPosition
    );
    const minX = minSectionPos.x;
    const minY = minSectionPos.y;
    const minZ = minSectionPos.z;
    const maxSectionPos = WorldSpaces.section.getPosition(
      this.displayMax.x + 1,
      this.displayMax.y + 1,
      this.displayMax.z + 1,
      tempPosition
    );
    const maxX = maxSectionPos.x;
    const maxY = maxSectionPos.y;
    const maxZ = maxSectionPos.z;

    for (let x = minX; x <= maxX; x += WorldSpaces.section.bounds.x) {
      for (let z = minZ; z <= maxZ; z += WorldSpaces.section.bounds.z) {
        for (let y = minY; y <= maxY; y += WorldSpaces.section.bounds.y) {
          if (!WorldSpaces.world.inBounds(x, y, z)) continue;
          const sector = WorldRegister.sectors.get(this.dimension, x, y, z);
          if (!sector) continue;
          const section = sector.getSection(x, y, z);
          if (!section.canRender()) continue;
          section.incrementTick(section._Ticks.displayDirty);
        }
      }
    }
  }
  markLogicDirty() {
    if (
      this.logicMax.x == -Infinity ||
      this.logicMax.y == -Infinity ||
      this.logicMax.z == -Infinity
    )
      return false;
    if (
      this.logicMin.x == Infinity ||
      this.logicMin.y == Infinity ||
      this.logicMin.z == Infinity
    )
      return false;
    const minSectionPos = WorldSpaces.section.getPosition(
      this.logicMin.x - 1,
      this.logicMin.y - 1,
      this.logicMin.z - 1,
      tempPosition
    );
    const minX = minSectionPos.x;
    const minY = minSectionPos.y;
    const minZ = minSectionPos.z;
    const maxSectionPos = WorldSpaces.section.getPosition(
      this.logicMax.x + 1,
      this.logicMax.y + 1,
      this.logicMax.z + 1,
      tempPosition
    );
    const maxX = maxSectionPos.x;
    const maxY = maxSectionPos.y;
    const maxZ = maxSectionPos.z;

    for (let x = minX; x <= maxX; x += WorldSpaces.section.bounds.x) {
      for (let z = minZ; z <= maxZ; z += WorldSpaces.section.bounds.z) {
        for (let y = minY; y <= maxY; y += WorldSpaces.section.bounds.y) {
          if (!WorldSpaces.world.inBounds(x, y, z)) continue;
          const sector = WorldRegister.sectors.get(this.dimension, x, y, z);
          if (!sector) continue;
          const section = sector.getSection(x, y, z);
          const [min, max] = section.getLogicMinMax();
          if (Math.abs(min) == Infinity || Math.abs(max) == Infinity) continue;
          section.incrementTick(section._Ticks.logicDirty);
        }
      }
    }
  }
  markPropagationDirty() {
    if (
      this.propagationMax.x == -Infinity ||
      this.propagationMax.y == -Infinity ||
      this.propagationMax.z == -Infinity
    )
      return false;
    if (
      this.propagationMin.x == Infinity ||
      this.propagationMin.y == Infinity ||
      this.propagationMin.z == Infinity
    )
      return false;
    const minSectionPos = WorldSpaces.section.getPosition(
      this.propagationMin.x - 1,
      this.propagationMin.y - 1,
      this.propagationMin.z - 1,
      tempPosition
    );
    const minX = minSectionPos.x;
    const minY = minSectionPos.y;
    const minZ = minSectionPos.z;
    const maxSectionPos = WorldSpaces.section.getPosition(
      this.propagationMax.x + 1,
      this.propagationMax.y + 1,
      this.propagationMax.z + 1,
      tempPosition
    );
    const maxX = maxSectionPos.x;
    const maxY = maxSectionPos.y;
    const maxZ = maxSectionPos.z;

    for (let x = minX; x <= maxX; x += WorldSpaces.section.bounds.x) {
      for (let z = minZ; z <= maxZ; z += WorldSpaces.section.bounds.z) {
        for (let y = minY; y <= maxY; y += WorldSpaces.section.bounds.y) {
          if (!WorldSpaces.world.inBounds(x, y, z)) continue;
          const sector = WorldRegister.sectors.get(this.dimension, x, y, z);
          if (!sector) continue;
          const section = sector.getSection(x, y, z);
          section.incrementTick(section._Ticks.propagationDirty);
        }
      }
    }
  }
}

export class VoxelUpdateTask {
  flow = new FlowQueues();
  rgb = new LightQueue();
  sun = new LightQueue();
  power = new PowerQueue();

  bounds = new UpdatedBounds(this);
  sDataCursor = new WorldCursor();
  nDataCursor = new WorldCursor();
  origin: LocationData = [0, 0, 0, 0];
  setOrigin(dimension: number, x: number, y: number, z: number) {
    this.sDataCursor.setFocalPoint(dimension, x, y, z);
    this.nDataCursor.setFocalPoint(dimension, x, y, z);

    this.origin[0] = dimension;
    this.origin[1] = x;
    this.origin[2] = y;
    this.origin[3] = z;

    this.rgb.removeMap.start(x, y, z);
    this.sun.removeMap.start(x, y, z);
    this.rgb.updateMap.start(x, y, z);
    this.sun.updateMap.start(x, y, z);
    this.flow.update.map.start(x, y, z);
    this.flow.remove.map.start(x, y, z);
    this.flow.remove.noRemoveMap.start(x, y, z);
    this.bounds.start(dimension);
    this.clear();
  }
  setOriginAt(origin: LocationData) {
    this.setOrigin(...origin);
  }
  clear() {
    this.rgb.clear();
    this.sun.clear();
    this.flow.clear();
  }
}

class FlowQueues {
  update = {
    queue: <number[][]>[],
    map: new TaskMap(),
  };
  remove = {
    queue: <number[][]>[],
    map: new TaskMap(),
    noRemoveMap: new TaskMap(),
  };
  clear() {
    this.update.queue.length = 0;
    this.update.map.clear();
    this.remove.queue.length = 0;
    this.remove.map.clear();
    this.remove.noRemoveMap.clear();
  }
}

class LightQueue {
  update: number[] = [];
  remove: number[] = [];
  removeMap = new TaskMap();
  updateMap = new TaskMap();

  clear() {
    this.update.length = 0;
    this.remove.length = 0;
    this.removeMap.clear();
    this.updateMap.clear();
  }
}

class PowerQueue {
  update: number[] = [];
  remove: number[] = [];
  removeMap = new TaskMap();
  updateMap = new TaskMap();

  clear() {
    this.update.length = 0;
    this.remove.length = 0;
    this.removeMap.clear();
    this.updateMap.clear();
  }
}
