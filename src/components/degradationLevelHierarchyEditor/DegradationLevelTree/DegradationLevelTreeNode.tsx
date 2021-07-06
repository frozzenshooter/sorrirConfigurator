import { Paper } from "@material-ui/core";
import React from "react";
import IDegradationLevel from "../../../models/IDegradationLevel";
import DegradationLevelNode from "../DegradationLevelNode/DegradationLevelNode";
import DegradationLevelTreeNodeDrop, { DegradationLevelTreeNodeDropPositionType, DegradationLevelTreeNodeDropType } from "./DegradationLevelTreeNodeDrop";
import { DEFAULT_DROP_NODE_HEIGHT, DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from "./TreeConstants";

export enum DegradationLevelTreeNodeType{
    Degradation = 0,
    Upgrade = 1
}

export interface IDegradationLevelTreeNodeProps {
    top: number;
    left: number;
    degradationLevel?: IDegradationLevel;
    isSelected: boolean;
    onSelectionChanged: (selected: IDegradationLevel) => void;
    type: DegradationLevelTreeNodeType;
}

const DegradationLevelTreeNode = (props: IDegradationLevelTreeNodeProps) => {

    const {degradationLevel, isSelected, top, left, type, onSelectionChanged} = props;

    if(!degradationLevel){

        const finalWidth = DEFAULT_NODE_WIDTH - 16; // -16 because of the padding that is added 
        const finalHeight = DEFAULT_NODE_HEIGHT - 16; // -16 because of the padding that is added 

        // Case for the OFF STATE
        return ( 
            <React.Fragment>
                <div
                    style={{
                        width: finalWidth, 
                        height: finalHeight,
                        padding: "8px",
                        top: top+"px", 
                        left: left+"px", 
                        position: "absolute",
                    }}
                >
                    <Paper
                        style={{
                            width: finalWidth, 
                            height: finalHeight,
                        }}
                    >
                        <div className="degradation-level-node-content">
                            <div className="degradation-level-node-content-label">
                                0 - OFF
                            </div>
                        </div>
                    </Paper>
                </div>
                <DegradationLevelTreeNodeDrop
                    left={left+8}  // 8 addtional pixels because the normal nodes have a padding - to align them correctly
                    top={top+DEFAULT_NODE_HEIGHT-8} // remove 8 pixels because the normal nodes have a padding - to align them correctly
                    degradationLevelId={0}
                    positionType={DegradationLevelTreeNodeDropPositionType.BELOW}
                    type={type === DegradationLevelTreeNodeType.Degradation? DegradationLevelTreeNodeDropType.Degradation : DegradationLevelTreeNodeDropType.Upgrade}
                />

            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <DegradationLevelTreeNodeDrop
                left={left + 8} // 8 addtional pixels because the normal nodes have a padding - to align them correctly
                top={top-DEFAULT_DROP_NODE_HEIGHT + 8} // - DEFAULT_DROP_NODE_HEIGHT to align the dropzone above the TreeNode
                degradationLevelId={degradationLevel.id}
                positionType={DegradationLevelTreeNodeDropPositionType.ABOVE}
                type={type === DegradationLevelTreeNodeType.Degradation? DegradationLevelTreeNodeDropType.Degradation : DegradationLevelTreeNodeDropType.Upgrade}
            />
            <DegradationLevelNode
                degradationLevel={degradationLevel}
                isSelected={isSelected}
                onSelectionChanged={onSelectionChanged}
                top={top}
                left={left}
            />
            <DegradationLevelTreeNodeDrop
                left={left + 8} // 8 addtional pixels because the normal nodes have a padding - to align them correctly
                top={top + DEFAULT_NODE_HEIGHT - 8} // remove 8 pixels because the normal nodes have a padding - to align them correctly
                degradationLevelId={degradationLevel.id}
                positionType={DegradationLevelTreeNodeDropPositionType.BELOW}
                type={type === DegradationLevelTreeNodeType.Degradation? DegradationLevelTreeNodeDropType.Degradation : DegradationLevelTreeNodeDropType.Upgrade}
            />
        </React.Fragment>
    );
};

export default DegradationLevelTreeNode;