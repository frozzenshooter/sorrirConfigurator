import IDegradationLevel from "../../../models/IDegradationLevel";
import ILevelChange from "../../../models/ILevelChange";
import { TreeType } from "../../../models/TreeType";
import DeleteDropNode from "./DeleteDropNode";
import GetSubtree from "./Subtree";

export interface IDegradationLevelTreeProps {
    degradationLevels: IDegradationLevel[]; // presort the relevant levels to just have to do it once
    levelChanges: ILevelChange[];
    onSelectionChanged: (selected: IDegradationLevel) => void;
    selectedDegradationLevels: IDegradationLevel[];
    treeType: TreeType;
}

const DegradationLevelTree = (props: IDegradationLevelTreeProps) => {

    // Reason for not using subtree directly: we want to be able to set the default OFF state and also calculate the tree recursively

    const {degradationLevels, levelChanges, treeType, selectedDegradationLevels, onSelectionChanged} = props;

    const deleteDropNodeHeight = 53;

    // Calculate the subtree (including the width for the internal calculation)
    const subtreeResult = GetSubtree({
        degradationLevels: degradationLevels,
        levelChanges: levelChanges,
        onSelectionChanged: onSelectionChanged,
        selectedDegradationLevels: selectedDegradationLevels,
        treeType: treeType,
        yOffset: deleteDropNodeHeight
    });

    return (
        <>
            <DeleteDropNode 
                treeType={treeType}
                width={subtreeResult.width}
                height={deleteDropNodeHeight}
            />
            {subtreeResult?.node}
        </>
    );
};

export default DegradationLevelTree;