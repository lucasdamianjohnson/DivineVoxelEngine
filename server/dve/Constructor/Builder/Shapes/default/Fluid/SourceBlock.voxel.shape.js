import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const processDefaultFaceData = (face, data) => {
    const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, face);
    DVEB.shapeBuilder.addFace(face, data.position, shapeDimensions, data, flip);
    const uv = data.unTemplate[data.uvTemplateIndex];
    DVEB.uvHelper.addUVs(face, {
        uvs: data.uvs,
        uv: uv,
        width: { start: 0, end: 1 },
        height: { start: 0, end: 1 },
        flipped: flip,
        rotoate: 0,
    });
    DVEB.uvHelper.processOverlayUVs(data);
    DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
    data.uvTemplateIndex += 1;
    data.overylayUVTemplateIndex += 4;
    data.lightIndex += 4;
    data.colorIndex += 4;
    data.aoIndex += 4;
};
const faceFunctions = {
    //add top face
    0: (data) => {
        processDefaultFaceData("top", data);
    },
    //add bottom face
    1: (data) => {
        processDefaultFaceData("bottom", data);
    },
    //add east face
    2: (data) => {
        processDefaultFaceData("east", data);
    },
    //add weest face
    3: (data) => {
        processDefaultFaceData("west", data);
    },
    //add south face
    4: (data) => {
        processDefaultFaceData("south", data);
    },
    //add north face
    5: (data) => {
        processDefaultFaceData("north", data);
    },
};
export const FluidSourceBlockVoxelShape = {
    id: "FluidSourceBlock",
    addToChunkMesh(data) {
        data.position.x += shapeDimensions.width;
        data.position.z += shapeDimensions.depth;
        data.position.y += shapeDimensions.height;
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "top")) {
            faceFunctions[0](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "bottom")) {
            faceFunctions[1](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "east")) {
            faceFunctions[2](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "west")) {
            faceFunctions[3](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "south")) {
            faceFunctions[4](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "north")) {
            faceFunctions[5](data);
        }
        return DVEB.shapeHelper.produceShapeReturnData(data);
    },
};
