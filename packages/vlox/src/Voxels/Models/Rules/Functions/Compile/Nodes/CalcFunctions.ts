import { VoxelFaces } from "../../../../../../Math";
import { Quad } from "../../../../../../Mesher/Geomtry";
import {
  QuadUVData,
  QuadVerticiesArray,
  VoxelGeometryTransform,
} from "../../../../../../Mesher/Geomtry/Geometry.types";
import {
  Matrix2x2Like,
  Mat2Array,
  Vec3Array,
  Vec4Array,
  AMath,
  Vec2Array,
} from "@amodx/math";
function getInterpolationWeights(
  x: number,
  y: number,
  flip = false
): Vec4Array {
  x = Math.max(0, Math.min(1, x));
  y = Math.max(0, Math.min(1, y));

  let w1 = (1 - x) * (1 - y); // Weight for v1 = (0, 0)
  let w2 = x * (1 - y); // Weight for v2 = (1, 0)
  let w3 = x * y; // Weight for v3 = (1, 1)
  let w4 = (1 - x) * y; // Weight for v4 = (0, 1)

  return flip ? [w4, w3, w2, w1] : [w3, w4, w1, w2];
}

export function getVertexWeights(
  face: VoxelFaces,
  x: number,
  y: number,
  z: number
): Vec4Array {
  let flip = false;
  let u: number, v: number;
  switch (face) {
    case VoxelFaces.Up:
      u = x;
      v = z;
      break;
    case VoxelFaces.Down:
      u = x;
      v = z;
      flip = true;
      break;
    case VoxelFaces.North:
      u = x;
      v = y;
      flip = true;
      break;
    case VoxelFaces.South:
      u = x;
      v = y;
      break;
    case VoxelFaces.East:
      u = z;
      v = y;
      break;
    case VoxelFaces.West:
      u = z;
      v = y;
      flip = true;
      break;
  }

  return getInterpolationWeights(u, v, flip);
}

export type QuadVertexWeights = [Vec4Array, Vec4Array, Vec4Array, Vec4Array];

export const getQuadWeights = (
  quad: Quad,
  direction: VoxelFaces
): QuadVertexWeights => {
  const returnArray: QuadVertexWeights = [] as any;
  for (const vertex of QuadVerticiesArray) {
    const { x, y, z } = quad.positions.vertices[vertex];
    returnArray[vertex] = getVertexWeights(direction, x, y, z);
  }

  return returnArray;
};
export function closestUnitNormal(v: Vec3Array): Vec3Array {
  const [x, y, z] = v;
  let maxDotOverMagnitude = -Infinity;
  let bestS: Vec3Array = [0, 0, 0];

  for (const sx of [-1, 0, 1]) {
    for (const sy of [-1, 0, 1]) {
      for (const sz of [-1, 0, 1]) {
        if (sx === 0 && sy === 0 && sz === 0) continue; // Skip the zero vector
        const sMagnitude = Math.sqrt(sx * sx + sy * sy + sz * sz);
        const vDotS = x * sx + y * sy + z * sz;
        const dotOverMagnitude = vDotS / sMagnitude;

        if (dotOverMagnitude > maxDotOverMagnitude) {
          maxDotOverMagnitude = dotOverMagnitude;
          bestS = [sx, sy, sz];
        }
      }
    }
  }

  // Normalize the best vector to unit length
  const sMagnitude = Math.sqrt(
    bestS[0] * bestS[0] + bestS[1] * bestS[1] + bestS[2] * bestS[2]
  );
  return [bestS[0] / sMagnitude, bestS[1] / sMagnitude, bestS[2] / sMagnitude];
}



const rotationMatrix = new Map<number, Mat2Array>();

export const mapQuadUvs = (
  uvs: Vec4Array,
  rotation: number = 0,
  transform: VoxelGeometryTransform
): QuadUVData => {
  if (transform.lockUVs == true) {
    let rotM = rotationMatrix.get(rotation);

    if (!rotM) {
      rotM = Matrix2x2Like.Rotation(AMath.DegreesToRadians(rotation));
      rotationMatrix.set(rotation, rotM);
    }

    return [
      Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[2], uvs[3]]),
      Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[0], uvs[3]]),
      Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[0], uvs[1]]),
      Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[2], uvs[1]]),
    ];
  }

  let u0 = uvs[0];
  let v0 = uvs[1];
  let u1 = uvs[2];
  let v1 = uvs[3];

  if (transform.flip) {
    if (transform.flip[0] === 1) {
      [u0, u1] = [u1, u0];
    }
    if (transform.flip[1] === 1) {
      [v0, v1] = [v1, v0];
    }
  }

  let quadUVs: QuadUVData = [
    [u1, v1],
    [u0, v1],
    [u0, v0],
    [u1, v0],
  ];

  if (rotation !== 0) {
    let rotM = rotationMatrix.get(rotation);
    if (!rotM) {
      rotM = Matrix2x2Like.Rotation(AMath.DegreesToRadians(rotation));
      rotationMatrix.set(rotation, rotM);
    }

    const centerU = (u0 + u1) / 2;
    const centerV = (v0 + v1) / 2;
    quadUVs = quadUVs.map(([u, v]) => {
      let x = u - centerU;
      let y = v - centerV;
      [x, y] = Matrix2x2Like.ApplyMatrixArray(rotM, [x, y]);
      x += centerU;
      y += centerV;
      return [x, y];
    }) as QuadUVData;
  }

  return quadUVs;
};
