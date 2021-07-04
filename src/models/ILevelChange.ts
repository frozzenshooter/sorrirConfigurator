interface ILevelChange {
    startDegradationLevelId: number | null, // the start level of a level change
    stateStartLevel: string | null, // the state in which the start level is in internally
    resultDegradationLevelId: number | null, // the level in which the change results in - null in the case that the parent is the off state
    stateResultLevel: string | null// the state the resulting level will be after the change
}

export default ILevelChange;