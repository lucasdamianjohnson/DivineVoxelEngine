export const QueuesManager = {
 states: <Int32Array>new Int32Array(),

 setQueueStates(states: Int32Array) {
  this.states = states;
 },
 startRGBLightUpdate() {
  this.states[0]++;
 },
 finishRGBLightUpdate() {
  Atomics.sub(this.states, 0, 1);
 },
 finishRGBLightRemove() {
  Atomics.sub(this.states, 1, 1);
 },
 finishWorldColumnSunLightProp() {
  Atomics.sub(this.states, 2, 1);
 },
 finishSunLightUpdateAtMaxY() {
  Atomics.sub(this.states, 3, 1);
 },
 finishSunLightUpdate() {
    Atomics.sub(this.states, 4, 1);
   },
};
