import IStateChange from "./IStateChange";

interface ILevelChange {
    startDegradationLevelId: number, // the start level of a level change
    resultDegradationLevelId: number, // the level in which the change results in
    stateChanges: IStateChange[];
}

export default ILevelChange;