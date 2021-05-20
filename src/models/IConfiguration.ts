import IDegradationLevel from "./IDegradationLevel";
import ISubcomponent from "./ISubcomponent";

interface IConfiguration {
    subcomponents: ISubcomponent[],
    degradationLevels: IDegradationLevel[]
}

export default IConfiguration;