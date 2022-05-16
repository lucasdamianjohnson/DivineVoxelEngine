/**# Builder Comm
 * ---
 * Handles communcation with the builder threads and the fluid builder thread.
 * Sends the mesh data from them to the mesh manager.
 */
export class BuilderComm {
    DVER;
    numBuilders = 4;
    count = 0;
    builders = [];
    buildRequestFunctions = {
        //chunk meshes
        0: (chunkKey, data) => {
            this.DVER.meshManager.handleUpdate("solid", chunkKey, data);
        },
        1: (chunkKey, data) => {
            this.DVER.meshManager.handleUpdate("flora", chunkKey, data);
        },
        2: (chunkKey, data) => {
            this.DVER.meshManager.handleUpdate("fluid", chunkKey, data);
        },
        3: (chunkKey, data) => {
            this.DVER.meshManager.handleUpdate("magma", chunkKey, data);
        },
    };
    constructor(DVER) {
        this.DVER = DVER;
        const numBuilders = 4;
        /*   if (window.navigator.hardwareConcurrency > numBuilders) {
         //use all possible cores if we can
         this.numBuilders = window.navigator.hardwareConcurrency;
        } */
    }
    reStart() {
        for (const worker of this.builders) {
            worker.postMessage(["re-start"]);
        }
    }
    setBuilderWorkers(workers) {
        this.builders = workers;
        this.numBuilders = workers.length;
        this._initBuilderWorkers();
    }
    createBuilderWorkers(path) {
        //  "../Contexts/MeshBuilders/ChunkMeshBuilder.worker.js",
        for (let i = 0; i < this.numBuilders; i++) {
            this.builders[i] = new Worker(new URL(path, import.meta.url), {
                type: "module",
            });
        }
        this._initBuilderWorkers();
    }
    _initBuilderWorkers() {
        for (let i = 0; i < this.numBuilders; i++) {
            this.builders[i].onerror = (er) => {
                console.log(er);
            };
            this.builders[i].onmessage = async (event) => {
                this._handleBuildMeshMessage(event);
            };
            const channel = new MessageChannel();
            const builderWorker = this.builders[i];
            //connect builder to world
            this.DVER.worldComm.sendMessage("connect-builder", [], [channel.port1]);
            //connect world to builder
            builderWorker.postMessage(["connect-world"], [channel.port2]);
        }
    }
    async _handleBuildMeshMessage(event) {
        const meshType = event.data[0];
        const chunkX = event.data[1];
        const chunkY = event.data[2];
        const chunkZ = event.data[3];
        const chunkKey = `${chunkX}-${chunkZ}-${chunkY}`;
        this.buildRequestFunctions[meshType](chunkKey, event.data);
    }
    _syncSettings() {
        const settings = this.DVER.engineSettings.getSettingsCopy();
        for (const builders of this.builders) {
            builders.postMessage(["sync-settings", settings]);
        }
    }
}
