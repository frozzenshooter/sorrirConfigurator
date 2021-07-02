import { Paper } from "@material-ui/core";
import React from "react";
import IDegradationLevel from "../../../models/IDegradationLevel";
import DegradationLevelNode from "../DegradationLevelNode/DegradationLevelNode";
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
        )
    }

    return (
        <React.Fragment>
            <DegradationLevelNode
                degradationLevel={degradationLevel}
                isSelected={isSelected}
                onSelectionChanged={onSelectionChanged}
                top={top}
                left={left}
            />
        </React.Fragment>
    );
};

export default DegradationLevelTreeNode;