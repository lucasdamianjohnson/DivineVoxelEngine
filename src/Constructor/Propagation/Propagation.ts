//objects
import {
 ExplosionTaskRequests,
 FlowTaskRequests,
 LightTaskRequest,
 WorldSunTaskRequest,
} from "Constructor/Tasks/TasksRequest.js";
import { RGBRemove, RGBUpdate } from "./Illumanation/Functions/RGBUpdate.js";
import { SunRemove, SunUpdate } from "./Illumanation/Functions/SunUpdate.js";
import { RunWorldSun } from "./Illumanation/Functions/WorldSun.js";
import { FlowUpdate } from "./Flow/Functions/FlowUpdate.js";
import { FlowRemove } from "./Flow/Functions/FlowRemove.js";
import { ExplosionManager } from "./Explosion/ExplosionManager.js";

export const Propagation = {
 $INIT() {},

 expolosion: {
  run(tasks: ExplosionTaskRequests) {
    ExplosionManager.runExplosion(tasks);
  },
 },

 flow: {
  update(tasks: FlowTaskRequests) {
   FlowUpdate(tasks);
  },
  remove(tasks: FlowTaskRequests) {
   FlowRemove(tasks);
  },
 },
 worldSun: {
  run(tasks: WorldSunTaskRequest) {
   RunWorldSun(tasks);
  },
 },
 rgb: {
  update(tasks: LightTaskRequest) {
   RGBUpdate(tasks);
  },
  remove(tasks: LightTaskRequest) {
   RGBRemove(tasks);
  },
 },
 sun: {
  update(tasks: LightTaskRequest) {
   SunUpdate(tasks);
  },
  remove(tasks: LightTaskRequest) {
   SunRemove(tasks);
  },
 },
};
