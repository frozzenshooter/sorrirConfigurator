import IDegradationLevel from "../../../models/IDegradationLevel";
import ILevelChange from "../../../models/ILevelChange";
import DeleteDropNode, { DeleteDropNodeType } from "./DeleteDropNode";
import GetSubtree, { SubtreeType } from "./Subtree";

export enum DegradationLevelTreeType {
    Degradation = 0,
    Upgrade = 1
}

export interface IDegradationLevelTreeProps {
    degradationLevels: IDegradationLevel[]; // presort the relevant levels to just have to do it once
    levelChanges: ILevelChange[];
    onSelectionChanged: (selected: IDegradationLevel) => void;
    selectedDegradationLevels: IDegradationLevel[];
    degradationLevelTreeType: DegradationLevelTreeType;
}

const DegradationLevelTree = (props: IDegradationLevelTreeProps) => {

    // Reason for not using subtree directly: we want to be able to set the default OFF state and also calculate the tree recursively

    const {degradationLevels, levelChanges, degradationLevelTreeType, selectedDegradationLevels, onSelectionChanged} = props;

    const deleteDropNodeHeight = 50;

    // Calculate the subtree (including the width for the internal calculation)
    const subtreeResult = GetSubtree({
        degradationLevels: degradationLevels,
        levelChanges: levelChanges,
        onSelectionChanged: onSelectionChanged,
        selectedDegradationLevels: selectedDegradationLevels,
        subtreeType: degradationLevelTreeType === DegradationLevelTreeType.Degradation ? SubtreeType.Degradation : SubtreeType.Upgrade,
        yOffset: deleteDropNodeHeight
    });

    return (
        <>
            <DeleteDropNode 
                type={degradationLevelTreeType === DegradationLevelTreeType.Degradation ? DeleteDropNodeType.Degradation : DeleteDropNodeType.Upgrade}
                width={subtreeResult.width}
                height={deleteDropNodeHeight}
            />
            {subtreeResult?.node}
        </>
    );
};

export default DegradationLevelTree;