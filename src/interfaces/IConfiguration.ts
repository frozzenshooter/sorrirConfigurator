import ISubcomponent from "./ISubcomponent";

export default interface IConfiguration {
    subcomponents: ISubcomponent[];
    isShadowModeGranularityFine: boolean;
}
