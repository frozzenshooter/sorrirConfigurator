import ISubComponent from "./ISubComponent";

export default interface IConfiguration {
    subComponents: ISubComponent[];
    isShadowModeGranularityFine: boolean;
}
