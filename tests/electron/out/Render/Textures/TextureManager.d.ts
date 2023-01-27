import type { TextureData } from "Meta/Render/Textures/Texture.types";
import type { TextureProccesedData, TextureTypes } from "Meta/Render/Textures/Texture.types";
export declare const TextureManager: {
    defaultTexturePath: string;
    processedTextureData: TextureProccesedData;
    overlayProcessedTextureData: TextureProccesedData;
    textureData: TextureData;
    textureExtension: Record<TextureTypes, string>;
    textures: Record<TextureTypes, TextureData[]>;
    uvTextureMap: Record<TextureTypes, Record<string, number>>;
    overylayTextures: Record<TextureTypes, TextureData[]>;
    overlayUVTextureMap: Record<TextureTypes, Record<string, number>>;
    normalMapTextures: Record<TextureTypes, TextureData[]>;
    noramlMapUVTexturesMap: Record<TextureTypes, Record<string, number>>;
    textureTypes: TextureTypes[];
    _processVariations(texture: TextureData, texturePaths: string[], animations: Record<TextureTypes, number[][]>, textureAnimatioTimes: Record<TextureTypes, number[][]>, extension: string, count: number, path: string, textureType: TextureTypes, overlay?: boolean, normalMap?: boolean): number;
    generateTexturesData(overlay?: boolean, normalMap?: boolean): void;
    defineDefaultTexturePath(path: string): void;
    defineDefaultTextureExtension(textureType: TextureTypes, ext: string): void;
    getTextureUV(textureType: TextureTypes, textureId: string, varation?: string): number;
    registerTexture(textureType: TextureTypes, textureData: TextureData): void;
    releaseTextureData(): void;
};
