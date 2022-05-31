export const TextureManager = {
    defaultTexturePath: "",
    processedTextureData: {},
    textureData: {},
    textureExtension: {
        solid: "png",
        transparent: "png",
        fluid: "png",
        magma: "png",
        flora: "png",
    },
    textures: {
        solid: [],
        transparent: [],
        fluid: [],
        magma: [],
        flora: [],
    },
    uvTextureMap: {
        solid: {},
        transparent: {},
        fluid: {},
        magma: {},
        flora: {},
    },
    _processVariations(texture, texturePaths, animations, textureAnimatioTimes, extension, count, path, substance) {
        if (!texture.variations)
            return count;
        for (const varation of Object.keys(texture.variations)) {
            const data = texture.variations[varation];
            if (data.frames == 0) {
                this.uvTextureMap[substance][`${texture.id}:${varation}`] = count;
                texturePaths.push(`${path}/${texture.id}/${varation}.${extension}`);
                count++;
            }
            else {
                if (!data.animKeys)
                    throw new Error("Texture Varation must have supplied animKeys if frames are greater than 0.");
                for (let i = 1; i <= data.frames; i++) {
                    this.uvTextureMap[substance][`${texture.id}:${varation}-${i}`] = count;
                    texturePaths.push(`${path}/${texture.id}/${varation}-${i}.${extension}`);
                    count++;
                }
                const trueKeys = [];
                for (let i = 0; i < data.animKeys.length; i++) {
                    trueKeys.push(this.uvTextureMap[substance][`${texture.id}:${varation}-${data.animKeys[i]}`]);
                }
                if (data.animKeyFrameTimes) {
                    textureAnimatioTimes[substance].push(data.animKeyFrameTimes);
                }
                if (data.globalFrameTime) {
                    textureAnimatioTimes[substance].push([data.globalFrameTime]);
                }
                animations[substance].push(trueKeys);
            }
        }
        return count;
    },
    generateTexturesData() {
        const returnTexturePaths = {
            solid: [],
            transparent: [],
            magma: [],
            fluid: [],
            flora: [],
        };
        const textureAnimatioTimes = {
            solid: [],
            transparent: [],
            magma: [],
            fluid: [],
            flora: [],
        };
        const animations = {
            solid: [],
            transparent: [],
            magma: [],
            fluid: [],
            flora: [],
        };
        const substances = [
            "transparent",
            "fluid",
            "solid",
            "magma",
            "flora",
        ];
        for (const substance of substances) {
            let texturePaths = [];
            let count = 1;
            const extension = this.textureExtension[substance];
            for (const texture of this.textures[substance]) {
                let path = texture.path ? texture.path : this.defaultTexturePath;
                if (texture.frames == 0) {
                    this.uvTextureMap[substance][`${texture.id}`] = count;
                    texturePaths.push(`${path}/${texture.id}/default.${extension}`);
                    count++;
                    count = this._processVariations(texture, texturePaths, animations, textureAnimatioTimes, extension, count, path, substance);
                }
                else {
                    if (!texture.animKeys)
                        throw new Error("Texture must have supplied animKeys if frames are greater than 0.");
                    this.uvTextureMap[substance][`${texture.id}`] = count;
                    for (let i = 1; i < texture.frames; i++) {
                        texturePaths.push(`${path}/${texture.id}/default-${i}.${extension}`);
                        count++;
                    }
                    const trueKeys = [];
                    for (let i = 0; i < texture.animKeys.length; i++) {
                        trueKeys.push(this.uvTextureMap[substance][`${texture.id}:default-${texture.animKeys[i]}`]);
                    }
                    if (texture.animKeyFrameTimes) {
                        textureAnimatioTimes[substance].push(texture.animKeyFrameTimes);
                    }
                    if (texture.globalFrameTime) {
                        textureAnimatioTimes[substance].push([texture.globalFrameTime]);
                    }
                    animations[substance].push(trueKeys);
                    count = this._processVariations(texture, texturePaths, animations, textureAnimatioTimes, extension, count, path, substance);
                }
            }
            returnTexturePaths[substance] = texturePaths;
        }
        this.processedTextureData = {
            textureAnimationTimes: textureAnimatioTimes,
            textureAnimations: animations,
            texturePaths: returnTexturePaths,
        };
        return this.processedTextureData;
    },
    defineDefaultTexturePath(path) {
        this.defaultTexturePath = path;
    },
    defineDefaultTextureExtension(voxelSubstanceType, ext) {
        this.textureExtension[voxelSubstanceType] = ext;
    },
    getTextureUV(voxelSubstanceType, textureId, varation) {
        let id = textureId;
        if (varation) {
            id = `${textureId}:${varation}`;
        }
        return this.uvTextureMap[voxelSubstanceType][id];
    },
    registerTexture(voxelSubstanceType, textureData) {
        this.textures[voxelSubstanceType].push(textureData);
    },
};
