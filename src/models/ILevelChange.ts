import IStateChange from "./IStateChange";

interface ILevelChange {
    startDegradationLevelId: number, // the start level of a level change
    resultDegradationLevelId: number, // the level in which the change results in - null in the case that the parent is the off state
    stateChanges: IStateChange[];
}

export default ILevelChange;