import { SetUpEngine, SetUpCanvas, SetUpDarkScene, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "../Shared/Builder/builder.js", "../Shared/Propagators/propagators.js");
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    builderWorker: workers.builderWorkers,
    propagationWorker: workers.propagationWorkers,
    lighting: {
        doAO: true,
        doRGBLight: true,
        doSunLight: true,
        autoRGBLight: true,
        autoSunLight: true,
    },
    chunks: {
        chunkXPow2: 4,
        chunkYPow2: 6,
        chunkZPow2: 4,
        autoHeightMap: true,
    },
    world: {
        voxelPaletteMode: "global",
        minZ: -64,
        maxZ: 64,
        minX: -64,
        maxX: 64,
        minY: 0,
        maxY: 128,
    },
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDarkScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 150, z: 0 });
    SetUpDefaultSkybox(scene);
    await DVER.$SCENEINIT({ scene: scene });
    runRenderLoop(engine, scene, camera, DVER);
};
RunInit(init);
