interface IDegradationLevelDependency{
    subcomponentId: string; // the subcomponent the level is dependent on
    shadowmodeId: string;  // the shadowmode in which the subcomponent has to be
}

export default IDegradationLevelDependency;