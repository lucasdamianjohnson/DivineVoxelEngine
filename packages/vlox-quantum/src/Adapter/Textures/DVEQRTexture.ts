import {
  URITexture,
  URITextureData,
  URITexture2DArrayData,
} from "@amodx/uri/Textures/URITexture.js";
import {
  URITextureFormat,
  URITextureSamplingMode,
  URITextureTypes,
} from "@amodx/uri/Constants/URITexturesConstants.js";
import {
  DVEQRTextureFormatMap,
  DVEQRTextureSamplingModeMap,
} from "../Constants/DVEQRTextureConstants";
import { DVEQRScene } from "../Scene/DVEQRScene";

export class DVEQRTexture extends URITexture<DVEQRScene, any> {

   clone(scene: any) {
    const dveTexture = new DVEQRTexture(this.data);
    const data = this.data;
    if (data.type == URITextureTypes.Texture2D) {
    }
    if (data.type == URITextureTypes.Texture2DArray) {
      const textureData = data as URITexture2DArrayData;
      let rawData: Uint8ClampedArray | null = null;
      if (textureData.data instanceof Uint8ClampedArray) {
        rawData = textureData.data;
      }
/*       const texture = new RawTexture2DArray(
        rawData,
        textureData.width,
        textureData.height,
        textureData.layers,
        (textureData.format !== undefined &&
          DVEQRTextureFormatMap[textureData.format]) ||
          DVEQRTextureFormatMap[URITextureFormat.Rgba],
          scene,
        //gen mip maps
        true,
        //invert y
        false,
        (textureData.samplingMode !== undefined &&
          DVEQRTextureSamplingModeMap[textureData.samplingMode]) ||
          DVEQRTextureSamplingModeMap[
            URITextureSamplingMode.NearestLinearMipLinear
          ]
      ); */
      dveTexture._texture = {};
    }
    return dveTexture;
  }
  async _create() {
    const data = this.data;
    if (data.type == URITextureTypes.Texture2D) {
    }
    if (data.type == URITextureTypes.Texture2DArray) {
      const textureData = data as URITexture2DArrayData;
      let rawData: Uint8ClampedArray | null = null;
      if (textureData.data instanceof Uint8ClampedArray) {
        rawData = textureData.data;
      }

      if (!rawData)
        throw new Error(
          `Could not create Raw2DTextureArray invalid data. ${data}`
        );
 
/*       const texture = new RawTexture2DArray(
        rawData,
        textureData.width,
        textureData.height,
        textureData.layers,
        (textureData.format !== undefined &&
          DVEQRTextureFormatMap[textureData.format]) ||
          DVEQRTextureFormatMap[URITextureFormat.Rgba],
        textureData.scene._scene,
        //gen mip maps
        true,
        //invert y
        false,
        (textureData.samplingMode !== undefined &&
          DVEQRTextureSamplingModeMap[textureData.samplingMode]) ||
          DVEQRTextureSamplingModeMap[
            URITextureSamplingMode.NearestLinearMipLinear
          ]
      );
 */
 /*
      const engine = data.scene._scene.getEngine() as Engine;
      const iTexture = new InternalTexture(engine,InternalTextureSource.Raw2DArray,false);
   
      const texture = new Texture(null,data.scene._scene);
      texture.anisotropicFilteringLevel = 16;


     // texture.anisotropic

   
      const { width, height, layers } = textureData;
      texture._noMipmap = false;
     
      iTexture.generateMipMaps = true;
      iTexture.useMipMaps = true;
      iTexture.is2DArray = true;

      engine._bindTextureDirectly(engine._gl.TEXTURE_2D_ARRAY, iTexture);

      let w = width,
        h = height,
        mipMapLevel = 0;
      while (w >= 1 && h >= 1) {
           if (mipMapLevel == 0) {
            TextureBuilder.context!.imageSmoothingEnabled = false;
          } else {
            TextureBuilder.context!.imageSmoothingEnabled = true;
          } 
        const mip = await TextureBuilder._createMipMap(
          mipMapLevel,
          (data as any).images,
          w,
          h
        );

        const gl = engine._gl;
      //  const textureType = engine._getWebGLTextureType(iTexture.type);
       // const format = engine._getInternalFormat(iTexture.format);

       // engine._unpackFlipY(texture.invertY);
        let target = gl.TEXTURE_2D_ARRAY;

        gl.texImage3D(
          target,
          mipMapLevel,
          gl.RGBA8,          // internal format
          w,
          h,
          layers,
          0,                // border, must be 0
          gl.RGBA,          // format
          gl.UNSIGNED_BYTE, // type
          mip
        );
        w /= 2;
        h /= 2;
        mipMapLevel++;
      }

      iTexture.width = width;
      iTexture.height = height;
      iTexture.isReady = true; 
      iTexture.samplingMode = Texture.TRILINEAR_SAMPLINGMODE;
      engine._bindTextureDirectly(engine._gl.TEXTURE_2D_ARRAY, null);
      texture._texture = iTexture;


*/
      this._texture = {};
      return this._texture;
    }
    throw new Error(`Unsuppourted texture type`);
  }

  dispose(): void {
    this._texture?.dispose();
    this._texture = null;
  }
}
