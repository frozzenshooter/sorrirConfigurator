import { Paper } from "@material-ui/core";
import ItemTypes from "../../degradationLevelHierarchyEditor/ItemTypes";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./Constants";
import { useDrop } from 'react-dnd'

import './TreeNode.css';
import React from "react";

export interface ITreeNodeProps {
    left: number;
    top: number;
    id: number,
    label: string,
}

const TreeNode = (props:ITreeNodeProps) => {

    const {left, top, id, label} = props;

    const handleDrop = () => {
        console.log("drop", id);
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.LEVEL,
        drop: () => handleDrop(),
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      }))

    return (
        <Paper 
            ref={drop}
            style={{
                top:top+"px", 
                left:left+"px", 
                width: (DEFAULT_WIDTH-32)+"px",
                height: (DEFAULT_HEIGHT)+"px",
                marginRight: "16px",
                marginLeft: "16px"
            }} 
            className="degradation-level-tree-node">

            <div className="degradation-level-tree-node-content">
                <div className="degradation-level-tree-node-content-label">
                    {label}{isOver? "HOVER" : ""}
                </div>
            </div>
        </Paper>
    );
}

export default TreeNode;