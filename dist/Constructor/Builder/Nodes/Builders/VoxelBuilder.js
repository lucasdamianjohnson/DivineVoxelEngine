import { NodeBuilder } from "../Classes/NodeBuilder.js";
import { BuilderDataTool } from "../../Tools/BuilderDataTool.js";
import { RenderedSubstances } from "../../Rules/RenderedSubstances.js";
import { ShapeTool } from "../../Shapes/ShapeTool.js";
class VoxelBuilderBase extends NodeBuilder {
    id;
    dataTool = new BuilderDataTool();
    constructor(id) {
        super(id);
        this.id = id;
        this.dataTool.setMode(BuilderDataTool.VOXEL_DATA_MODE);
    }
    build([location, type, rawVoxelData]) {
        if (!this.dataTool.loadInRaw(rawVoxelData).isRenderable())
            return false;
        const constructor = this.dataTool.getConstructor();
        const mesher = RenderedSubstances.meshers.get(this.dataTool.getSubstnaceData().getRendered());
        if (!mesher || !constructor)
            return false;
        mesher.voxel.loadInRaw(rawVoxelData).setMode(BuilderDataTool.VOXEL_DATA_MODE);
        mesher.nVoxel
            .loadInRaw(rawVoxelData)
            .setMode(BuilderDataTool.VOXEL_DATA_MODE);
        ShapeTool.setMesher(mesher);
        ShapeTool.builder.quad.clear().setPosition(0, 0, 0);
        constructor.process(mesher);
        mesher.resetSegments();
        mesher.resetVars();
        const [attributes, buffers] = mesher.getAllAttributes();
        mesher.voxel.loadInRaw(rawVoxelData).setMode(BuilderDataTool.WORLD_DATA_MODE);
        mesher.nVoxel
            .loadInRaw(rawVoxelData)
            .setMode(BuilderDataTool.WORLD_DATA_MODE);
        return [[location, attributes], buffers];
    }
}
export const VoxelBuilder = new VoxelBuilderBase("#dve_node_voxel");
