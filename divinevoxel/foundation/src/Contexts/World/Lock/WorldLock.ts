import type { WorldLockTasks } from "../../../Types/Tasks.types";
import type { LocationData } from "@divinevoxel/core/Math";

import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { DataLoaderTool } from "../../../Default/Tools/Loader/DataLoaderTool.js";
import { SafeInterval } from "@divinestar/utils/Intervals/SafeInterval.js";
import { UtilMap } from "../../../Util/UtilMap.js";

export const WorldLock = {
  locks: new UtilMap<string, WorldLockTasks>(),
  dataLoader: <DataLoaderTool>{},
  init(dataLoaderTool: DataLoaderTool) {
    this.dataLoader = dataLoaderTool;
  },

  _loadMap: new UtilMap<string, boolean>(),

  addLock(data: WorldLockTasks) {
    return new Promise((resolve) => {
      this.locks.add([[data.toString(), data]]);
      const [dim, [ssx, ssy, ssz], [esx, esy, esz]] = data;
      const [a, sx, sy, sz] = WorldSpaces.column.getLocationXYZ(ssx, ssy, ssz);
      const [b, ex, ey, ez] = WorldSpaces.column.getLocationXYZ(esx, esy, esz);
      const run = () => {
        let allFound = true;
        for (
          let y = sy;
          y < ey + WorldSpaces.column._bounds.y;
          y += WorldSpaces.column._bounds.y
        ) {
          for (let x = sx; x <= ex; x += WorldSpaces.column._bounds.x) {
            for (let z = sz; z <= ez; z += WorldSpaces.column._bounds.z) {
              const location: LocationData = [
                ...WorldSpaces.column.getLocationXYZ(x, y, z),
              ] as LocationData;
              location[0] = dim;
              if (WorldRegister.instance.column.get(location)) continue;
              allFound = false;
              const key = location.toString();
              if (this._loadMap.has(key)) continue;
              this._loadMap.set(key, true);
              if (!this.dataLoader.isEnabled()) {
                if (!WorldRegister.instance.column.get(location)) {
                  WorldRegister.instance.column.fill(location);
                }
              }
              this.dataLoader.setLocation(location).loadIfExists((loaded) => {
                this._loadMap.remove(key);
                if (WorldRegister.instance.column.get(location)) return;
                if (!loaded) {
                  WorldRegister.instance.column.fill(location);
                }
              });
            }
          }
        }
        return allFound;
      };
      if (run()) return resolve(true);

      const inte = new SafeInterval().setInterval(100).setOnRun(() => {
        if (run()) {
          inte.stop();
          resolve(true);
        }
      });
      inte.start();
    });
  },

  removeLock(data: WorldLockTasks) {
    this.locks.remove(data.toString());
  },

  isLocked([sdim, x, y, z]: LocationData) {
    let locked = false;

    for (const [key, [dim, [sx, sy, sz], [ex, ey, ez]]] of this.locks._map) {
      if (dim != sdim) continue;
      if (x >= sx && y >= sy && z >= sz && x <= ex && y <= ey && z <= ez)
        continue;
      locked = true;
      break;
    }

    return locked;
  },
};
