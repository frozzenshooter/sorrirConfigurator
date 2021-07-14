import IDegradationLevelDependencySet from "./IDegradationLevelDependencySet";
import IDegradationLevelState from "./IDegradationLevelState";

export default interface IDegradationLevel{
    id: number;
    label: string;
    dependencySets: IDegradationLevelDependencySet[];
    states: IDegradationLevelState[];
}