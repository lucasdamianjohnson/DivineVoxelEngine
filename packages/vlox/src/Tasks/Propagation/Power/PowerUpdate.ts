import { VoxelUpdateTask } from "../../VoxelUpdateTask";
import { $3dCardinalNeighbors } from "../../../Math/CardinalNeighbors";

//@todo change array to not use push and shift
export function PowerUpdate(tasks: VoxelUpdateTask) {
  const queue = tasks.power.update;
  while (queue.length) {
    const x = queue.shift()!;
    const y = queue.shift()!;
    const z = queue.shift()!;
    const voxel = tasks.sDataCursor.getVoxel(x, y, z);
    if (!voxel) continue;
    const sl = voxel.getPower();
    if (sl <= 0) continue;

    for (let i = 0; i < 6; i++) {
      const nx = $3dCardinalNeighbors[i][0] + x;
      const ny = $3dCardinalNeighbors[i][1] + y;
      const nz = $3dCardinalNeighbors[i][2] + z;
      if (!tasks.nDataCursor.inBounds(nx, ny, nz)) continue;
      const voxel = tasks.nDataCursor.getVoxel(nx, ny, nz);
      if (!voxel) continue;

      const nl = voxel.getPower();

      if (nl > -1 && nl < sl) {
        if (voxel._tags["dve_can_carry_power"]) {
          queue.push(nx, ny, nz);
        }

        voxel.setPower(sl - 1);
      }
    }
    tasks.bounds.update(x, y, z);
  }
}

export function PowerRemove(tasks: VoxelUpdateTask) {
  const remove = tasks.power.remove;
  const update = tasks.power.update;
  const removeMap = tasks.power.removeMap;
  const updateMap = tasks.power.updateMap;
  while (remove.length) {
    const x = remove.shift()!;
    const y = remove.shift()!;
    const z = remove.shift()!;
    if (removeMap.has(x, y, z)) continue;
    removeMap.add(x, y, z);
    const voxel = tasks.sDataCursor.getVoxel(x, y, z);
    if (!voxel) continue;
    const sl = voxel.isAir() ? voxel.getLevel() : voxel.getPower();
    if (sl <= 0) continue;

    for (let i = 0; i < 6; i++) {
      const nx = $3dCardinalNeighbors[i][0] + x;
      const ny = $3dCardinalNeighbors[i][1] + y;
      const nz = $3dCardinalNeighbors[i][2] + z;
      if (!tasks.nDataCursor.inBounds(nx, ny, nz)) continue;
      const voxel = tasks.nDataCursor.getVoxel(nx, ny, nz);
      if (!voxel) continue;
      const nl = voxel.isAir() ? voxel.getLevel() : voxel.getPower();
      if (nl > 0 && nl < sl) {
        remove.push(nx, ny, nz);
        if (voxel.isPowerSource()) {
          update.push(nx, ny, nz);
        }
      } else {
        if (nl > 0 && nl > sl && !updateMap.has(nx, ny, nz)) {
          updateMap.add(nx, ny, nz);
          update.push(nx, ny, nz);
        }
      }
    }

    tasks.bounds.update(x, y, z);
    voxel.setPower(0);
  }
  removeMap.clear();
}
