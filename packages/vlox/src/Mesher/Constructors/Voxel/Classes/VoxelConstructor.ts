import { VoxelMesherDataTool } from "../../../Tools/VoxelMesherDataTool.js";
import { TextureRegister } from "../../../../Textures/TextureRegister.js";

export abstract class VoxelConstructor {
 id: string;
 debug?:boolean;
 abstract process(tool: VoxelMesherDataTool) : void;
 abstract onTexturesRegistered(textures: typeof TextureRegister): void;
}
