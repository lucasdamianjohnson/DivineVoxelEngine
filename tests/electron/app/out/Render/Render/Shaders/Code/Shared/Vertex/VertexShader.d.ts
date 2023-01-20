export declare const SharedVertexShader: {
    top: string;
    standardPositionMain: string;
    uniforams: string;
    attributes(ao?: boolean): string;
    defaultAttributes: string;
    defaultVarying: string;
    varying(ao?: boolean): string;
    optionVars(ao?: boolean): string;
    useTime(passTime: boolean): string;
    setUVInMain: string;
    passTime: string;
    doAO: string;
    doRGB: string;
    doSun: string;
    doColors: string;
    doNormals: string;
    passAnimationState: string;
    updateVarying: string;
    getAnimationType: string;
    animationFunctions: string;
};
