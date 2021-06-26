interface ILevelChange {
    startDegradationLevelId: number, // the start level of a level change
    stateStartLevel: string, // the state in which the start level is in internally
    resultDegradationLevelId: number, // the level in which the change results in
    stateResultLevel: string // the state the resulting level will be after the change
}

export default ILevelChange;