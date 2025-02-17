import { CompassDirections, Vec2Array, Vec3Array } from "@amodx/math";
import { QuadUVData } from "../../Mesher/Geomtry/Geometry.types";
import { VoxelFaceNames } from "../../Math";
import { TextureId } from "../../Textures/Texture.types";
import {
  VoxelStateStringSchemaData,
  VoxelModelRelationsSchemaData,
  VoxelStateNumberSchemaData,
} from "../../Voxels/State/State.types";
import { VoxelEffectData } from "../../Voxels/Effects/VoxelEffects.types";
import { VoxelTags } from "../Data/VoxelTag.types";

/**The model data assoicated with the actual voxel. */
export interface VoxelModelConstructorData {
  id: string;
  modRelationSchema?: VoxelModelRelationsSchemaData[];
  modSchema?: VoxelStateStringSchemaData[];
  inputs: Record<string, Record<string, any>>;
  tagOverrides?: {
    isLightSource?: Record<string, boolean>;
    lightValue?: Record<string, Vec3Array>;
  };
}

/**Define a custom geomtry node */
export interface VoxelCustomGeomtryNode {
  type: "custom";
  id: string;
  inputs: Record<string, any>;
}

//box
export interface VoxelBoxGeometryNode {
  type: "box";
  /**Divisor used for transform of this specific node.*/
  divisor?: Vec3Array;
  points: [start: Vec3Array, end: Vec3Array];
  rotation?: Vec3Array;
  faces: Record<VoxelFaceNames, BaseVoxelQuadData>;
}

export interface BaseVoxelQuadData {
  doubleSided?: boolean | string;
  enabled?: boolean;
  /**Id for an input arg for the texture */
  texture: string;
  /**UV for the face or id for an input arg. */
  uv: [x1: number, y1: number, x2: number, y2: number] | string;
  /**UV rotation or id for an input arg */
  rotation?: number | string;
}

//quad
export interface VoxelQuadGeometryNode extends BaseVoxelQuadData {
  type: "quad";
  /**Divisor used for transform of this specific node.*/
  divisor?: Vec3Array;
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array, p4: Vec3Array];
}

export interface BaseVoxelTriangleData {
  doubleSided?: boolean;
  /**Id for the input arg for the texture */
  texture: string;
  /**UV for the triangle or id for the input arg. */
  uv: [v1: Vec2Array, v2: Vec2Array, v3: Vec2Array] | string;
  /**UV rotation or id for an input arg */
  rotation?: number | string;
}

//triangle
export interface VoxelTriangleGeometryNode extends BaseVoxelTriangleData {
  type: "triangle";
  /**Divisor used for transform of this specific node.*/
  divisor?: Vec3Array;
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array];
}

//arguments
export interface VoxelGeometryTextureArgument {
  type: "texture";
}
export interface VoxelGeometryBooleanArgument {
  type: "boolean";
  default: boolean;
}
export interface VoxelGeometryIntArgument {
  type: "int";
  default: number;
}
export interface VoxelGeometryFloatArgument {
  type: "float";
  default: number;
}
export interface VoxelGeometryBoxUVArgument {
  type: "box-uv";
  default: [x1: number, y1: number, x2: number, y2: number];
}
export interface VoxelGeometryUVArgument {
  type: "uv";
  default: Vec2Array[];
}
export interface VoxelGeometryVector3Argument {
  type: "vector3";
  default?: Vec3Array;
  min?: Vec3Array;
  max?: Vec3Array;
}

export type VoxelGeometryNodes =
  | VoxelCustomGeomtryNode
  | VoxelBoxGeometryNode
  | VoxelTriangleGeometryNode
  | VoxelQuadGeometryNode;

export type CullingProcedureData =
  | {
      type: "default";
    }
  | {
      type: "none";
    }
  | {
      type: "transparent";
    }
  | {
      type: "custom";
      id: string;
      data: any;
    };

export interface VoxelGeometryData {
  id: string;
  nodes: VoxelGeometryNodes[];
  /* The divisor used for all the geomtry node values like positions and uvs.  */
  divisor?: Vec3Array;
  /**
   * If this is set the voxel geometry will not be included in the
   * geometry rules and will be fall back to custom inputs.
   * Ideal for advanced or non cubic models.
   * */
  doNotBuildRules?: true;
  /**
   * Define the culling procedure for faces
   */
  cullingProcedure?: CullingProcedureData;
  arguments: Record<
    string,
    | VoxelGeometryTextureArgument
    | VoxelGeometryBoxUVArgument
    | VoxelGeometryUVArgument
    | VoxelGeometryVector3Argument
    | VoxelGeometryIntArgument
    | VoxelGeometryBooleanArgument
    | VoxelGeometryFloatArgument
  >;
}

export interface VoxelGeometryLinkData {
  //  id: string;
  geometryId: string;
  /**
   * Overrride the culling procedure for faces
   */
  cullingProcedure?: CullingProcedureData;
  /**Divisor used for transform of this specific node.*/
  divisor?: Vec3Array;
  inputs: Record<string, any>;
  scale?: Vec3Array;
  position?: Vec3Array;
  rotation?: Vec3Array;
  rotationPivot?: Vec3Array;
  flip?: [flipX: 0 | 1, flipY: 0 | 1, flipZ: 0 | 1];
}

/** Defines the state the model should be placed in given the parameters. */
export interface VoxelModelPlacingStrategyData {
  /** The closest voxel face of the intersected voxel model. */
  face: VoxelFaceNames;
  /** The direction of the ray that intersected the voxel that is being placed upon.  */
  direction: Vec3Array;
  /** The delta of the virtual voxel cube face intersected. If it was intersected halfway, it would be 0.5. */
  delta?: [min:number,max:number];
  /** Defines an alternative ID to override the same parameters. */
  alt?: number;
  /** The resulting state string of the model. */
  state: string;
}

export interface VoxelModelData {
  id: string;
  /**Divisor used all transforms of geometry nodes. */
  divisor?: Vec3Array;
  arguments: Record<
    string,
    | VoxelGeometryTextureArgument
    | VoxelGeometryBoxUVArgument
    | VoxelGeometryVector3Argument
    | VoxelGeometryIntArgument
    | VoxelGeometryBooleanArgument
    | VoxelGeometryFloatArgument
  >;
  /**Define the placing strategy for the model. */
  placingStrategy: VoxelModelPlacingStrategyData[]|string;
  stateSchema: (VoxelStateStringSchemaData | VoxelStateNumberSchemaData)[];
  /**Define default tags for the voxel. */
  tags?: Partial<VoxelTags>;
  effects?: VoxelEffectData[];
  relationsSchema: VoxelModelRelationsSchemaData[];
  stateNodes: Record<string, VoxelGeometryLinkData[]>;
  conditonalNodes: Record<string, VoxelGeometryLinkData[]>;
}
