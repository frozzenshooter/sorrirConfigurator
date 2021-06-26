import IDegradationLevelDependency from "./IDegradationLevelDependency";
import IDegradationLevelState from "./IDegradationLevelState";

export default interface IDegradationLevel{
    id: number;
    label: string;
    dependencies: IDegradationLevelDependency[];
    states: IDegradationLevelState[];
}