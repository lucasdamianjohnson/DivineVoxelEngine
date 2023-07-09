//objects
import { CCM } from "../../World/Threads/WorldThreads.js";
import { ConstructorTasks } from "../Threads/Contracts/ConstructorTasks.js";
const QMBase = {
    $INIT() {
        this.addQueue("main");
    },
    _queueMap: new Map(),
    addQueue(queueKey) {
        if (this._queueMap.has(queueKey)) {
            this._queueMap.set(queueKey, Date.now());
            return false;
        }
        this.worldSun.addQueue(queueKey);
        this.propagation.addQueue(queueKey);
        this.build.chunk.addQueue(queueKey);
        this.generate.addQueue(queueKey);
        this.decorate.addQueue(queueKey);
        this._queueMap.set(queueKey, Date.now());
        return true;
    },
    removeQueue(queueKey) {
        if (!this._queueMap.has(queueKey))
            return false;
        this.worldSun.removeQueue(queueKey);
        this.propagation.addQueue(queueKey);
        this.build.chunk.addQueue(queueKey);
        this.generate.removeQueue(queueKey);
        this.decorate.addQueue(queueKey);
        this._queueMap.delete(queueKey);
        return true;
    },
    /**# Filter Queues
     * ---
     * Go through each current queue. IF the passed fucntion returns false it will remove that queue.
     * @param filter
     */
    filterQueues(filter) {
        this._queueMap.forEach((v, key) => {
            if (!filter(key)) {
                this.removeQueue(key);
            }
        });
    },
    /**# Filter Old Queues
     * ---
     * Will remove queues older then 10 minutes.
     * @param maxTime Max time in miliseconds.
     */
    filterOldQueues(maxTime = 600000) {
        const t = Date.now();
        this._queueMap.forEach((v, key) => {
            if (t - v > maxTime) {
                this.removeQueue(key);
            }
        });
    },
    worldSun: CCM.addQueue("world-sun", ConstructorTasks.worldSun),
    propagation: CCM.addQueue("propagation", ConstructorTasks.analyzerPropagation),
    build: {
        chunk: CCM.addQueue("build-chunk", ConstructorTasks.buildChunk),
    },
    generate: CCM.addQueue("generatek", ConstructorTasks.generate),
    decorate: CCM.addQueue("decorate", ConstructorTasks.decorate),
};
export const ConstructorQueues = QMBase;
