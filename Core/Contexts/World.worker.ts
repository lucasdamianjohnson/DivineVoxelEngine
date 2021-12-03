import { MeshData } from "Meta/Util.types.js";
import { Util } from "../../Global/Util.helper.js";
import { AnimationComm } from "./AnimationComm.js";
import { BlockManager } from "./Blocks/BlockManager.js";
import { BuilderManagerWorker } from "./BuilderManager.worker.js";

import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { ChunkMap } from "./Chunks/ChunkMap.js";
import { WorldData } from "./WorldData/WorldData.js";
import { PlayerWatcher } from "./WorldGen/PlayerWatcher.js";
const worker = self;
const UTIL = new Util();

const builderManager = new BuilderManagerWorker();
builderManager.setMainThreadCom(<any>worker);

const chunkMap = new ChunkMap();
const worldData = new WorldData(builderManager, chunkMap, UTIL);
const playerWatcher = new PlayerWatcher(worldData);

const blockManager = new BlockManager();
const chunkProccesor = new ChunkProcessor(worldData, playerWatcher, UTIL);
worldData.setChunkProcessor(chunkProccesor);

(worker as any).worldData = worldData;
(worker as any).playerWatcher = playerWatcher;
(worker as any).builderManager = builderManager;
(worker as any).chunkProccesor = chunkProccesor;
const start = () => {
  let chunkNum = 20;
  let totalChunks = chunkNum * 16 - 144;
  for (let i = -144; i < totalChunks; i += 16) {
    for (let k = -144; k < totalChunks; k += 16) {
      worldData.generateChunk(i, k);
    }
  }

  for (let i = -144; i < totalChunks; i += 16) {
    for (let k = -144; k < totalChunks; k += 16) {
      const chunk = worldData.getChunk(i, k);
      if (!chunk) continue;

      const template = chunkProccesor.makeChunkTemplate(chunk, i, k);

      // sendChunkData("new", i, k, data);
      builderManager.requestChunkBeBuilt(i, k, template);
      //     animationComm.sendChunkTemplateUpdate(i,k,template[1],template[2]);
    }
  }

  playerWatcher.startWatchingPlayer();
};

function sendAnimationData(chunkX: number, chunkZ: number, uvs: number[]) {
  const uvArray = new Float32Array(uvs);

  //@ts-ignore
  worker.postMessage(
    ["animation", chunkX, chunkZ, uvArray.buffer],
    //@ts-ignore
    [uvArray.buffer]
  );
}

function sendChunkData(
  message: "new" | "update",
  chunkX: number,
  chunkZ: number,
  data: MeshData
) {
  const positionArray = new Float32Array(data.positions);
  const indiciesArray = new Int32Array(data.indices);
  const colorsArray = new Float32Array(data.colors);
  const uvArray = new Float32Array(data.uvs);

  //@ts-ignore
  worker.postMessage(
    [
      message,
      chunkX,
      chunkZ,
      positionArray.buffer,
      indiciesArray.buffer,
      colorsArray.buffer,
      uvArray.buffer,
    ],
    //@ts-ignore
    [
      positionArray.buffer,
      indiciesArray.buffer,
      colorsArray.buffer,
      uvArray.buffer,
    ]
  );
}

addEventListener("message", (event: MessageEvent) => {
  const eventData = event.data;

  const message = eventData[0];

  if (message == "block-add") {
    const chunkXZ = UTIL.calculateGameZone(eventData[1], eventData[3]);
    worldData.requestBlockAdd(
      chunkXZ[0],
      chunkXZ[1],
      eventData[1],
      eventData[2],
      eventData[3]
    );
  }
  if (message == "block-remove") {
    const chunkXZ = UTIL.calculateGameZone(eventData[1], eventData[3]);
    worldData.requestBlockRemove(
      chunkXZ[0],
      chunkXZ[1],
      eventData[1],
      eventData[2],
      eventData[3]
    );
  }

  if (eventData == "start") {
    start();
    return;
  }

  if (message == "block-data-recieve") {
    const blockData = eventData[1];
    console.log(blockData);
  }

  if (message == "connect-builder") {
    const port = event.ports[0];
    builderManager.addBuilder(port);
  }

  if (message == "connect-animator") {
    const port = event.ports[0];
    //    animationComm.setPort(port);
  }
  if (message == "connect-player") {
    playerWatcher.setPlayerSharedArrays(
      event.data[1],
      event.data[2],
      event.data[3]
    );
  }
});
