import IDegradationLevelDependency from "./IDegradationLevelDependency";

export default interface IDegradationLevel{
    id: number;
    label: string;
    dependencies: IDegradationLevelDependency[];
}