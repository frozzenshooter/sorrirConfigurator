import { Paper } from "@material-ui/core";
import React from "react";
import IDegradationLevel from "../../../models/IDegradationLevel";
import DegradationLevelNode from "../DegradationLevelNode/DegradationLevelNode";
import DegradationLevelTreeNodeDrop from "./DegradationLevelTreeNodeDrop";
import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from "./TreeConstants";

export interface IDegradationLevelTreeNodeProps {
    top: number;
    left: number;
    degradationLevel?: IDegradationLevel;
    isSelected: boolean;
    onSelectionChanged: (selected: IDegradationLevel) => void;
}

const DegradationLevelTreeNode = (props: IDegradationLevelTreeNodeProps) => {

    const {degradationLevel, isSelected, top, left, onSelectionChanged} = props;

    if(!degradationLevel){

        // Case for the OFF STATE
        return ( 
        <React.Fragment>
            <Paper
                style={{
                top:top+"px", 
                left:left+"px", 
                position: "absolute",
                margin: "8px",
                width: DEFAULT_NODE_WIDTH-32,
                height: DEFAULT_NODE_HEIGHT
                }}
                >
                <div className="degradation-level-node-content">
                <div className="degradation-level-node-content-label">
                    OFF
                </div>
                </div>
            </Paper>
            <DegradationLevelTreeNodeDrop
                left={left}
                top={top+DEFAULT_NODE_HEIGHT}
            />
        </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <DegradationLevelTreeNodeDrop
                left={left}
                top={top-20}
            />
            <DegradationLevelNode
                degradationLevel={degradationLevel}
                isSelected={isSelected}
                onSelectionChanged={onSelectionChanged}
                top={top}
                left={left}
            />
            <DegradationLevelTreeNodeDrop
                left={left}
                top={top+DEFAULT_NODE_HEIGHT}
            />
        </React.Fragment>
    );
};

export default DegradationLevelTreeNode;