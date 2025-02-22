import { CardinalNeighbors3D } from "../../../../Math/CardinalNeighbors";
import { VoxelBehaviorsRegister } from "../VoxelBehaviorsRegister";

VoxelBehaviorsRegister.register({
  type: "liquid",
  onPaint(simulation, voxel, x, y, z) {
    simulation.scheduleUpdate("liquid", x, y, z, 0);
  },
  onErase(simulation, voxel, x, y, z) {
    voxel.setLevelState(2);
    for (let i = 0; i < CardinalNeighbors3D.length; i++) {
      const nx = CardinalNeighbors3D[i][0] + x;
      const ny = CardinalNeighbors3D[i][1] + y;
      const nz = CardinalNeighbors3D[i][2] + z;
      const nVoxel = simulation.sDataCursor.getVoxel(nx, ny, nz);
      if (!nVoxel || !nVoxel._substanceTags["dve_is_liquid"]) continue;
      simulation.scheduleUpdate("liquid", nx, ny, nz, 0);
    }
    simulation.scheduleUpdate("liquid", x, y, z, 10);
  },
});
