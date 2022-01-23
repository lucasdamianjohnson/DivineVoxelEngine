function visitAll(gx0, gy0, gz0, gx1, gy1, gz1
// visitor: (x: number, y: number, z: number) => {}
) {
    const positons = [];
    const gx0idx = Math.floor(gx0);
    const gy0idx = Math.floor(gy0);
    const gz0idx = Math.floor(gz0);
    const gx1idx = Math.floor(gx1);
    const gy1idx = Math.floor(gy1);
    const gz1idx = Math.floor(gz1);
    const sx = gx1idx > gx0idx ? 1 : gx1idx < gx0idx ? -1 : 0;
    const sy = gy1idx > gy0idx ? 1 : gy1idx < gy0idx ? -1 : 0;
    const sz = gz1idx > gz0idx ? 1 : gz1idx < gz0idx ? -1 : 0;
    let gx = gx0idx;
    let gy = gy0idx;
    let gz = gz0idx;
    const gxp = gx0idx + (gx1idx > gx0idx ? 1 : 0);
    const gyp = gy0idx + (gy1idx > gy0idx ? 1 : 0);
    const gzp = gz0idx + (gz1idx > gz0idx ? 1 : 0);
    const vx = gx1 === gx0 ? 1 : gx1 - gx0;
    const vy = gy1 === gy0 ? 1 : gy1 - gy0;
    const vz = gz1 === gz0 ? 1 : gz1 - gz0;
    const vxvy = vx * vy;
    const vxvz = vx * vz;
    const vyvz = vy * vz;
    let errx = (gxp - gx0) * vyvz;
    let erry = (gyp - gy0) * vxvz;
    let errz = (gzp - gz0) * vxvy;
    const derrx = sx * vyvz;
    const derry = sy * vxvz;
    const derrz = sz * vxvy;
    do {
        //  visitor(gx, gy, gz);
        positons.push(gx, gy, gz);
        if (gx === gx1idx && gy === gy1idx && gz === gz1idx)
            break;
        let xr = Math.abs(errx);
        let yr = Math.abs(erry);
        let zr = Math.abs(errz);
        if (sx !== 0 && (sy === 0 || xr < yr) && (sz === 0 || xr < zr)) {
            gx += sx;
            errx += derrx;
        }
        else if (sy !== 0 && (sz === 0 || yr < zr)) {
            gy += sy;
            erry += derry;
        }
        else if (sz !== 0) {
            gz += sz;
            errz += derrz;
        }
    } while (true);
    return positons;
}
function plotLine3d(x0, y0, z0, x1, y1, z1) {
    const pooints = [];
    const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    const dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
    const dz = Math.abs(z1 - z0), sz = z0 < z1 ? 1 : -1;
    let dm = Math.max(dx, dy, dz), i = dm;
    x1 = y1 = z1 = dm / 2;
    while (true) {
        pooints.push(x0, y0, z0);
        if (i-- == 0)
            break;
        x1 -= dx;
        if (x1 < 0) {
            x1 += dm;
            x0 += sx;
        }
        y1 -= dy;
        if (y1 < 0) {
            y1 += dm;
            y0 += sy;
        }
        z1 -= dz;
        if (z1 < 0) {
            z1 += dm;
            z0 += sz;
        }
    }
    return pooints;
}
/**# Player Watcher
 * ---
 * Keeps track of the players movement and
 * singles the world to add or remove chunks
 * based on their new position and render distance.
 */
export class PlayerWatcher {
    worldGen;
    DVEW;
    playerABSPositon;
    playerChunkPosition;
    playerDirection;
    playerPickPosition;
    playerStatesArray;
    renderDistance = 20;
    currentMaxChunkX = 160;
    currentMinChunkX = -144;
    currentMaxChunkZ = 160;
    currentMinChunkZ = -144;
    cachedChunkZ = 0;
    cachedChunkX = 0;
    playerReach = 8;
    constructor(worldGen, DVEW) {
        this.worldGen = worldGen;
        this.DVEW = DVEW;
    }
    setPlayerSharedArrays(data) {
        this.playerABSPositon = new Float32Array(data[1]);
        this.playerChunkPosition = new Float32Array(data[2]);
        this.playerDirection = new Float32Array(data[3]);
        this.playerPickPosition = new Float32Array(data[4]);
        this.playerStatesArray = new Uint8Array(data[5]);
    }
    async startWatchingPlayer() {
        this.cachedChunkX = this.playerChunkPosition[0];
        this.cachedChunkZ = this.playerChunkPosition[1];
        setInterval(() => {
            // console.log(this.playerDirection, this.playerABSPositon);
            const pickVector = [
                this.playerDirection[0] * this.playerReach + this.playerABSPositon[0],
                this.playerDirection[1] * this.playerReach + this.playerABSPositon[1],
                this.playerDirection[2] * this.playerReach + this.playerABSPositon[2],
            ];
            const pAbsX = Math.floor(this.playerABSPositon[0]);
            const pAbsY = Math.floor(this.playerABSPositon[1] + 0.5);
            const pAbsZ = Math.floor(this.playerABSPositon[2]);
            /*    const data = plotLine3d(
             pAbsX,
             pAbsY,
             pAbsZ,
             Math.floor(pickVector[0]),
             Math.floor(pickVector[1]),
             Math.floor(pickVector[2])
            ); */
            const data = visitAll(this.playerABSPositon[0], this.playerABSPositon[1], this.playerABSPositon[2], pickVector[0], pickVector[1], pickVector[2]);
            const chunkX = (pAbsX >> 4) << 4;
            const chunkY = (pAbsY >> 7) << 7;
            const chunkZ = (pAbsZ >> 4) << 4;
            let i = 0;
            let closestCalc = 0;
            let closestIndex = 6;
            for (i; i < data.length; i += 3) {
                const x = data[i];
                const y = data[i + 1];
                const z = data[i + 2];
                const voxelData = this.DVEW.worldData.getVoxelData(x, y, z);
                if (voxelData) {
                    if (voxelData[0]) {
                        break;
                    }
                }
            }
            this.playerPickPosition[0] = data[i];
            this.playerPickPosition[1] = data[i + 1];
            this.playerPickPosition[2] = data[i + 2];
            //below player
            const belowVoxel = this.DVEW.worldData.getVoxelData(pAbsX, pAbsY, pAbsZ, 0, -2, 0);
            if (belowVoxel) {
                this.playerStatesArray[0] = 1;
            }
            else {
                this.playerStatesArray[0] = 0;
            }
            const headVoxel = this.DVEW.worldData.getVoxelData(pAbsX, pAbsY, pAbsZ, 0, 0, 0);
            if (headVoxel) {
                if (this.DVEW.voxelManager.getVoxel(this.DVEW.worldGeneration.getGlobalVoxelPallet()[headVoxel[0]][0]).data.substance == "fluid") {
                    this.playerStatesArray[1] = 1;
                }
                else {
                    this.playerStatesArray[1] = 0;
                }
            }
            else {
                this.playerStatesArray[1] = 0;
            }
            /*
            let movedWest = false;
            let movedEast = false;
            let movedNorth = false;
            let movedSouth = false;
         
            if (this.cachedChunkX != chunkX) {
             if (this.cachedChunkX > chunkX) {
              movedWest = true;
             }
             if (this.cachedChunkX < chunkX) {
              movedEast = true;
             }
            }
            if (this.cachedChunkZ != chunkZ) {
             if (this.cachedChunkZ < chunkZ) {
              movedNorth = true;
             }
             if (this.cachedChunkZ > chunkZ) {
              movedSouth = true;
             }
            }
         
            let moved = false;
            if (movedNorth) {
             moved = true;
             this.currentMaxChunkZ += 16;
             this.currentMinChunkZ += 16;
             //add chunks to the north remove from the south
             this.worldGen.generateChunkLine(
              this.cachedChunkX,
              this.cachedChunkZ,
              "north"
             );
            }
            if (movedSouth) {
             moved = true;
             this.currentMaxChunkZ -= 16;
             this.currentMinChunkZ -= 16;
             //add chunks to the south remove from the north
             this.worldGen.generateChunkLine(
              this.cachedChunkX,
              this.cachedChunkZ,
              "south"
             );
            }
            if (movedWest) {
             moved = true;
             this.currentMaxChunkX -= 16;
             this.currentMinChunkX -= 16;
             //add chunks to the west remove from the east
             this.worldGen.generateChunkLine(
              this.cachedChunkX,
              this.cachedChunkZ,
              "west"
             );
            }
            if (movedEast) {
             moved = true;
             this.currentMaxChunkX += 16;
             this.currentMinChunkX += 16;
             //add chunks to the east remove from te wast
             this.worldGen.generateChunkLine(
              this.cachedChunkX,
              this.cachedChunkZ,
              "east"
             );
            }
         
            this.cachedChunkX = chunkX;
            this.cachedChunkZ = chunkZ;
            if (moved) {
            } */
        }, 10);
    }
}
