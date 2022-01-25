import { Dreamestone } from "../Voxels/Solid/DreamStone.js";
import { DreamGrassBlock } from "../Voxels/Solid/DreamGrassBlock.js";
import { DebugBox } from "../Voxels/Solid/DebugBox.js";
import { DreamStonePillar } from "../Voxels/Solid/DreamStonePillar.js";
import { DreamGrass } from "../Voxels/Flora/DreamGrass.js";
import { LiquidDreamEther } from "../Voxels/Fluid/LiquidDreamEther.js";
export function RegisterVoxels(DVEW, voxelPaletteMode) {
    //solid
    const debugBlock = new DebugBox(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(debugBlock);
    const dreamStone = new Dreamestone(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(dreamStone);
    const dreamStonePillar = new DreamStonePillar(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(dreamStonePillar);
    const dreamGrassBlock = new DreamGrassBlock(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(dreamGrassBlock);
    //flora
    const dreamGrass = new DreamGrass(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(dreamGrass);
    //fluid
    const liquidDreamEther = new LiquidDreamEther(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(liquidDreamEther);
    if (voxelPaletteMode == "global") {
        //solid
        DVEW.worldGeneration.addToGlobalVoxelPalette(`${debugBlock.data.id}:defualt`, debugBlock.data.defaultState);
        DVEW.worldGeneration.addToGlobalVoxelPalette(`${dreamStone.data.id}:defualt`, dreamStone.data.defaultState);
        DVEW.worldGeneration.addToGlobalVoxelPalette(`${dreamStonePillar.data.id}:defualt`, dreamStonePillar.data.defaultState);
        DVEW.worldGeneration.addToGlobalVoxelPalette(`${dreamGrassBlock.data.id}:defualt`, dreamGrassBlock.data.defaultState);
        //flora
        DVEW.worldGeneration.addToGlobalVoxelPalette(`${dreamGrass.data.id}:defualt`, dreamGrass.data.defaultState);
        //fluid
        DVEW.worldGeneration.addToGlobalVoxelPalette(`${liquidDreamEther.data.id}:defualt`, liquidDreamEther.data.defaultState);
        // console.log(DVEW.worldGeneration.getGlobalVoxelPalette());
    }
}
