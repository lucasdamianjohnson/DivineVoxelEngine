export async function BuildInitalMeshes(DVE, scene) {
    if (!DVE.world.baseWorldData) {
        throw new Error("World base data was not set. Call $INIT before $SCENEINIT");
    }
    await DVE.renderManager.textureCreator.setUpImageCreation();
    //make chunk meshes
    console.log(DVE.world.baseWorldData);
    const solidTextures = DVE.world.baseWorldData?.texturePaths.solid;
    const combinedChunkTextures = await DVE.renderManager.textureCreator.createMaterialTexture(scene, solidTextures);
    DVE.renderManager.chunkMaterial.createMaterial(scene, combinedChunkTextures);
    const floraTextures = DVE.world.baseWorldData?.texturePaths.flora;
    const combinedFloraTextures = await DVE.renderManager.textureCreator.createMaterialTexture(scene, floraTextures);
    DVE.renderManager.floraMaterial.createMaterial(scene, combinedFloraTextures);
    DVE.builderManager.setScene(scene);
    DVE.builderManager.setMaterial(DVE.renderManager.chunkMaterial.getMaterial());
    DVE.builderManager.createBaseChunkMeshes();
}
