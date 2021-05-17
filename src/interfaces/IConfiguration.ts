import { IDegradationLevelDialogProps } from "../components/degradationConfiguration/DegradationLevelDialog";
import IDegradationLevel from "./IDegradationLevel";
import ISubComponent from "./ISubComponent";

export default interface IConfiguration {
    subComponents: ISubComponent[];
    degradationLevels: IDegradationLevel[];
    isShadowModeGranularityFine: boolean;
}
