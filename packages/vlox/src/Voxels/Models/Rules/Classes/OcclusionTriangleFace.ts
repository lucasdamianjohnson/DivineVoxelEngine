import { Vec3Array, Vector3Like } from "@amodx/math";
import { Triangle } from "../../../../Mesher/Geomtry/Primitives/Triangle";
import { IOcclusionFace } from "./OcclusionFace";

export class OcclusionTriangleFace extends IOcclusionFace {
  normals: Vec3Array[];

  public points: [Vec3Array, Vec3Array, Vec3Array] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  private _points: [Vec3Array, Vec3Array, Vec3Array];

  setPoints(points: [Vec3Array, Vec3Array, Vec3Array]) {
    this._points = points;
    this.normals = Triangle.GetNormalLeftHanded(
      points[0],
      points[1],
      points[2],
    );

    const averageNormal: Vec3Array = [0, 0, 0];

    for (let i = 0; i < this.normals.length; i++) {
      averageNormal[0] += this.normals[i][0];
      averageNormal[1] += this.normals[i][1];
      averageNormal[2] += this.normals[i][2];
    }
    averageNormal[0] /= this.normals.length;
    averageNormal[1] /= this.normals.length;
    averageNormal[2] /= this.normals.length;

    // Normalize the average normal
    const magnitude = Math.sqrt(
      averageNormal[0] * averageNormal[0] +
        averageNormal[1] * averageNormal[1] +
        averageNormal[2] * averageNormal[2]
    );
    if (magnitude !== 0) {
      averageNormal[0] /= magnitude;
      averageNormal[1] /= magnitude;
      averageNormal[2] /= magnitude;
    }

    this.normal = averageNormal;
    this.updatePoints();
  }

  setOffset(x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
    this.updatePoints();
  }

  updatePoints() {
    for (let i = 0; i < 4; i++) {
      this.points[i][0] = this._points[i][0] + this.offset[0];
      this.points[i][1] = this._points[i][1] + this.offset[1];
      this.points[i][2] = this._points[i][2] + this.offset[2];
    }
  }

  private isPointInTriangle(
    p: Vec3Array,
    a: Vec3Array,
    b: Vec3Array,
    c: Vec3Array
  ): boolean {
    // Compute vectors
    const v0: Vec3Array = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const v1: Vec3Array = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const v2: Vec3Array = [p[0] - a[0], p[1] - a[1], p[2] - a[2]];

    // Compute dot products
    const dot00 = Vector3Like.DotArray(v0, v0);
    const dot01 = Vector3Like.DotArray(v0, v1);
    const dot02 = Vector3Like.DotArray(v0, v2);
    const dot11 = Vector3Like.DotArray(v1, v1);
    const dot12 = Vector3Like.DotArray(v1, v2);

    // Compute barycentric coordinates
    const denom = dot00 * dot11 - dot01 * dot01;
    if (denom === 0) {
      return false; // Degenerate triangle
    }
    const u = (dot11 * dot02 - dot01 * dot12) / denom;
    const v = (dot00 * dot12 - dot01 * dot02) / denom;

    // Check if point is in triangle
    return u >= 0 && v >= 0 && u + v <= 1;
  }

  isPointInBounds(point: Vec3Array): boolean {
    return (
      this.isPointInTriangle(
        point,
        this.points[0],
        this.points[1],
        this.points[2]
      )
    );
  }

  isPointOnFace(x: number, y: number, z: number): boolean {
    // First, check if point is on the plane
    const p0 = this.points[0];
    const v: Vec3Array = [x - p0[0], y - p0[1], z - p0[2]];
    const d = Vector3Like.DotArray(this.normal, v);
    const epsilon = 1e-6;
    if (Math.abs(d) > epsilon) {
      return false;
    }
    // Point is on plane, now check if it's inside the face
    const p: Vec3Array = [x, y, z];
    return this.isPointInBounds(p);
  }

  doesCoverFace(face: IOcclusionFace): boolean {
    const epsilon = 1e-6;

    // Normalize normals
    const n1 = this.normal;
    const n2 = face.normal;
    const n1Mag = Math.sqrt(n1[0] * n1[0] + n1[1] * n1[1] + n1[2] * n1[2]);
    const n2Mag = Math.sqrt(n2[0] * n2[0] + n2[1] * n2[1] + n2[2] * n2[2]);
    const n1Norm: Vec3Array = [n1[0] / n1Mag, n1[1] / n1Mag, n1[2] / n1Mag];
    const n2Norm: Vec3Array = [n2[0] / n2Mag, n2[1] / n2Mag, n2[2] / n2Mag];

    // Compute dot product of normals
    const dotNormals = Vector3Like.DotArray(n1Norm, n2Norm);
    if (Math.abs(Math.abs(dotNormals) - 1) > epsilon) {
      // Normals are not parallel
      return false;
    }

    // Check if a point from face lies on the plane of this face
    const p0 = this.points[0];
    const v: Vec3Array = [
      face.points[0][0] - p0[0],
      face.points[0][1] - p0[1],
      face.points[0][2] - p0[2],
    ];
    const d = Vector3Like.DotArray(this.normal, v);
    if (Math.abs(d) > epsilon) {
      // Faces are not coplanar
      return false;
    }

    // Check if all points of face are within this face
    for (const point of face.points) {
      if (!this.isPointInBounds(point)) {
        return false;
      }
    }
    return true;
  }
}
