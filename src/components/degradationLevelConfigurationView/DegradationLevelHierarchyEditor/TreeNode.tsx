import { Paper } from "@material-ui/core";
import ItemTypes from "../../degradationLevelHierarchyEditor/ItemTypes";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./Constants";
import { useDrop, useDrag } from 'react-dnd'

import './TreeNode.css';
import React from "react";
import IDegradationLevelDependency from "../../../models/IDegradationLevelDependency";
import IDegradationLevel from "../../../models/IDegradationLevel";
import { useConfigurationContext } from "../../../context/ConfigurationContext";

export interface ITreeNodeProps {
    left: number;
    top: number;
    id: number,
    label: string,
}

const TreeNode = (props:ITreeNodeProps) => {

    const {left, top, id, label} = props;

    const handleDrop = (item: IDegradationLevel) : IDegradationLevel => {
        console.log("drop", id, item);

        return {
            dependencies:[],
            states:[],
            id: id,
            label: "("+id+")"
        };
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.LEVEL,
        drop: (item) => handleDrop(item as IDegradationLevel),
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
    }))

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.LEVEL,
        item: {
            dependencies:[],
            states:[],
            id: id,
            label: "("+id+")"
        },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
    }))


    return (
        <React.Fragment>

            <div 
                ref={drop}
                style={{
                    top:(top-20)+"px", 
                    left:left+"px", 
                    width: (DEFAULT_WIDTH-32)+"px",
                    height: (20)+"px",
                    marginRight: "16px",
                    marginLeft: "16px",
                    backgroundColor: "red"
                }} className="degradation-level-tree-node">
            </div>
            <Paper 
                ref={drag}
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
        </React.Fragment>
    );
}

export default TreeNode;