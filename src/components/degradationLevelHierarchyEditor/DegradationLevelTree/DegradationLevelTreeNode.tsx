import React from "react";
import IDegradationLevel from "../../../models/IDegradationLevel";
import DegradationLevelNode from "../DegradationLevelNode/DegradationLevelNode";

export interface IDegradationLevelTreeNodeProps {
    top: number;
    left: number;
    degradationLevel?: IDegradationLevel;
    isSelected: boolean;
    onSelectionChanged: (selected: IDegradationLevel) => void;
}

const DegradationLevelTreeNode = (props: IDegradationLevelTreeNodeProps) => {

    const {degradationLevel, isSelected, onSelectionChanged} = props;

    if(!degradationLevel){

        // Case for the OFF STATE
        return (
            <div>
                OFF
            </div>
        )
    }

    return (
        <React.Fragment>
            <div>
                TOP DROP ZONE
            </div>
            <DegradationLevelNode
                degradationLevel={degradationLevel}
                isSelected={isSelected}
                onSelectionChanged={onSelectionChanged}
            />
            <div>
                BOTTOM DROP ZONE
            </div>
        </React.Fragment>
    );
};

export default DegradationLevelTreeNode;