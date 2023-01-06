import { Propagation } from "../../Propagation/Propagation.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { EngineSettings as ES } from "../../../Data/Settings/EngineSettings.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { $3dCardinalNeighbors, $3dMooreNeighborhood, } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { BrushTool } from "../../../Tools/Brush/Brush.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
const dataTool = new DataTool();
const nDataTool = new DataTool();
const brushTool = new BrushTool();
const addToRebuildQue = (dimension, rebuildQueue, x, y, z, comm) => {
    for (let i = 0; i < $3dMooreNeighborhood.length; i++) {
        const n = $3dMooreNeighborhood[i];
        const chunkPOS = WorldSpaces.chunk.getPositionXYZ(n[0] + x, n[1] + y, n[2] + z);
        Propagation.addToRebuildQue(chunkPOS.x, chunkPOS.y, chunkPOS.z, "all");
    }
};
const updateLight = (x, y, z) => {
    let doRGB = ES.doRGBPropagation();
    let doSun = ES.doSunPropagation();
    for (const n of $3dCardinalNeighbors) {
        const nx = n[0] + x;
        const ny = n[1] + y;
        const nz = n[2] + z;
        if (!nDataTool.loadInAt(nx, ny, nz))
            continue;
        const l = nDataTool.getLight();
        if (l <= 0)
            continue;
        if (doRGB) {
            if (LightData.hasRGBLight(l)) {
                Propagation.illumination._RGBlightUpdateQ.push([nx, ny, nz]);
            }
        }
        if (doSun) {
            if (LightData.getS(l) > 0) {
                Propagation.illumination._sunLightUpdate.enqueue([nx, ny, nz]);
            }
        }
    }
};
export async function EreaseAndUpdate(data) {
    const [dimension, x, y, z] = data[0];
    const rebuildQueueId = data[1];
    const threadId = data[2];
    const thread = ThreadComm.getComm(threadId);
    const rebuildqQueue = ThreadComm.getSyncedQueue(threadId, "build-chunk-" + rebuildQueueId);
    if (!rebuildqQueue)
        return false;
    dataTool.setDimension(dimension).loadInAt(x, y, z);
    Propagation.setBuildData(dimension, rebuildQueueId);
    Propagation.setPriority(0);
    if (ES.doFlow()) {
        const substance = dataTool.getSubstance();
        if (substance == "liquid" || substance == "magma") {
            await Propagation.removeFlowAt(data);
            return true;
        }
    }
    const light = dataTool.getLight();
    if (light > 0) {
        dataTool.setLight(light);
    }
    dataTool.setAir().commit(2);
    if (ES.doLight()) {
        let doRGB = ES.doRGBPropagation();
        let doSun = ES.doSunPropagation();
        const sl = dataTool.getLight();
        if (doRGB) {
            if (sl >= 0) {
                Propagation.runRGBRemove(data);
            }
        }
        updateLight(x, y, z);
        if (sl >= 0) {
            if (doRGB) {
                Propagation.runRGBUpdate(data);
            }
            if (doSun) {
                Propagation.runSunLightUpdate(data);
            }
        }
    }
    addToRebuildQue(dimension, rebuildQueueId, x, y, z, thread);
    Propagation.runRebuildQue();
    Propagation.setPriority(2);
    //await rebuildqQueue.wait();
    return true;
}
export async function PaintAndUpdate(data) {
    const [dimension, x, y, z] = data[0];
    const raw = data[1];
    const rebuildQueueId = data[2];
    const threadId = data[3];
    const thread = ThreadComm.getComm(threadId);
    const rebuildqQueue = ThreadComm.getSyncedQueue(threadId, "build-chunk-" + rebuildQueueId);
    if (!rebuildqQueue)
        return false;
    const tasks = [[dimension, x, y, z], rebuildQueueId, threadId];
    brushTool.setDimension(dimension).setXYZ(x, y, z).setRaw(raw);
    dataTool.setDimension(dimension).loadInAt(x, y, z);
    Propagation.setBuildData(dimension, rebuildQueueId);
    Propagation.setPriority(0);
    let doRGB = ES.doRGBPropagation();
    let doSun = ES.doSunPropagation();
    lighttest: if (ES.doLight()) {
        const light = dataTool.getLight();
        if (light <= 0)
            break lighttest;
        if (doSun) {
            if (LightData.getS(light) > 0) {
                Propagation.runSunLightRemove(tasks);
            }
        }
        if (doRGB) {
            if (LightData.hasRGBLight(light)) {
                Propagation.runRGBRemove(tasks);
            }
        }
    }
    brushTool.paint();
    if (ES.doLight()) {
        updateLight(x, y, z);
        if (doRGB) {
            Propagation.runRGBUpdate(tasks);
        }
        if (doSun) {
            Propagation.runSunLightUpdate(tasks);
        }
    }
    addToRebuildQue(dimension, rebuildQueueId, x, y, z, thread);
    Propagation.runRebuildQue();
    Propagation.setPriority(2);
    if (ES.doFlow()) {
        const substance = brushTool._dt.getSubstance();
        if (substance == "liquid" || substance == "magma") {
            Propagation.updateFlowAt(tasks);
        }
    }
    return;
}
