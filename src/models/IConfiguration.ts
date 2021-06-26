import IDegradationLevel from "./IDegradationLevel";
import ILevelChange from "./ILevelChange";
import ISubcomponent from "./ISubcomponent";

interface IConfiguration {
    subcomponents: ISubcomponent[],
    degradationLevels: IDegradationLevel[],
    degradations: ILevelChange[],
    upgrades: ILevelChange[]
}

export default IConfiguration;