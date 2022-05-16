//types
import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
import type { VoxelSubstanceType } from "Meta/index.js";
//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";

const handleUpdate = (substance: VoxelSubstanceType, data: any) => {
 const chunkX = data[1];
 const chunkY = data[2];
 const chunkZ = data[3];
 const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(
  chunkX,
  chunkY,
  chunkZ
 );
 DVER.meshManager.handleUpdate(substance,chunkKey,data);
};

const builderComm = CreateInterComm("world-builder-base", { ready: false });
export const GetNewBuilderComm = (count: number, port: InterCommPortTypes) => {
 const newComm: InterCommInterface = Object.create(builderComm);
 newComm.messageFunctions = {
  //chunk meshes
  0: (data: any) => {
   handleUpdate("solid", data);
  },
  1: (data: any) => {
   handleUpdate("flora", data);
  },
  2: (data: any) => {
   handleUpdate("fluid", data);
  },
  3: (data: any) => {
   handleUpdate("magma", data);
  },
 };
 newComm.setPort(port);
 return newComm;
};
