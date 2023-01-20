import { EngineSettingsData } from "Meta/index.js";
import { ChunkMeshData, SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types";
import { DVEMaterial } from "../Materials/DVEMaterial.js";

export class DVEMesh {
 pickable = false;
 checkCollisions = false;
 seralize = false;
 clearCachedGeometry = false;
 defaultBb = new BABYLON.BoundingInfo(
  BABYLON.Vector3.Zero(),
  BABYLON.Vector3.Zero()
 );

 constructor(public name: string, public dveMat: DVEMaterial) {}

 createTemplateMesh(scene: BABYLON.Scene) {
  const mesh = new BABYLON.Mesh(this.name, scene);
  mesh.isPickable = this.pickable;
  mesh.checkCollisions = this.checkCollisions;
  (mesh as any).type = "chunk";
  mesh.alwaysSelectAsActiveMesh = true;

  if (!this.checkCollisions) {
   mesh.doNotSyncBoundingInfo = true;
  }

  mesh.doNotSerialize = this.seralize;
  mesh.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_STANDARD;
  mesh.material = this.dveMat.getMaterial();

  const chunkVertexData = new BABYLON.VertexData();
  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.position.z = 0;
  chunkVertexData.positions = [0];
  chunkVertexData.normals = [0];
  chunkVertexData.indices = [0];
  mesh.setVerticesData("faceData", [0], false, 1);
  mesh.setVerticesData("aoColors", [0], false, 1);
  mesh.setVerticesData("lightColors", [0], false, 4);
  mesh.setVerticesData("colors", [9], false, 4);
  mesh.setVerticesData("cuv3", [0], false, 3);
  mesh.setVerticesData("ocuv3", [0], false, 4);
  chunkVertexData.applyToMesh(mesh, false);

  (mesh as any).vertexData = chunkVertexData;

  mesh.isVisible = false;
  mesh.setEnabled(false);
  return mesh;
 }

 syncSettings(settings: EngineSettingsData) {
  if (settings.meshes.pickable) {
   this.pickable = true;
  }
  if (settings.meshes.clearChachedGeometry) {
   this.clearCachedGeometry = true;
  }
  if (settings.meshes.seralize) {
   this.seralize = true;
  }
 }

 async setMeshData(
  mesh: BABYLON.Mesh,
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  data: ChunkMeshData
 ) {
  mesh.unfreezeWorldMatrix();
  mesh.position.x = chunkX;
  mesh.position.y = chunkY;
  mesh.position.z = chunkZ;

  const chunkVertexData: BABYLON.VertexData = (mesh as any).vertexData;
  chunkVertexData.positions = data[1];
  chunkVertexData.normals = data[2];
  chunkVertexData.indices = data[3];
  mesh.setVerticesData("faceData", data[4], false, 1);
  mesh.setVerticesData("aoColors", data[5], false, 1);
  mesh.setVerticesData("lightColors", data[6], false, 4);
  mesh.setVerticesData("colors", data[7], false, 4);
  mesh.setVerticesData("cuv3", data[8], false, 3);
  mesh.setVerticesData("ocuv3", data[9], false, 4);
  chunkVertexData.applyToMesh(mesh, false);
  if (this.clearCachedGeometry) {
   if (mesh.subMeshes) {
    for (const sm of mesh.subMeshes) {
     sm.setBoundingInfo(this.defaultBb);
    }
   }
   mesh.geometry?.clearCachedData();
  }

  mesh.freezeWorldMatrix();
  return mesh;
 }
}
