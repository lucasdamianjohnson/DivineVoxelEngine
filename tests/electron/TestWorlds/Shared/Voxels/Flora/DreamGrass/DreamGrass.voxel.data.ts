import type { VoxelData } from "out/Meta/index";

export const DreamGrassVoxelData: VoxelData = {
 name: "Dream Grass",
 shapeId: "CrossedPanels",
 id: "dve_dreamgrass",
 substance: "flora",
 material: "grass",
 hardnress: 1000,
 lightSource: true,
 lightValue: 0b0000_1111_0000_0000,
 physics: {
  collider: "",
  checkCollisions: false,
 },
};
