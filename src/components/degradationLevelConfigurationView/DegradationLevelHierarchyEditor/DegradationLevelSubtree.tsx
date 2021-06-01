import React from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_GRAPH_X_OFFSET, DEFAULT_X_PADDING, DEFAULT_Y_OFFSET as DEFAULT_GRAPH_Y_OFFSET, DEFAULT_Y_PADDING } from "./Constants";
import TreeNode from "./TreeNode";

export interface IDegradationLevelTreeNode {
    id: number;
    parentId: number | null;
    label: string
}

export interface IDegradationLevelSubtreeProps {
    nodes: IDegradationLevelTreeNode[];   
    id: number; 
    xOffset?: number;
    yOffset?: number;
}

export interface IDegradationLevelSubtreeResult {
    node: React.ReactNode;
    width: number;
}

const GetDegradationLevelSubtree = (props: IDegradationLevelSubtreeProps): IDegradationLevelSubtreeResult => {

    const { nodes, id } = props;
    let { xOffset, yOffset } = props;

    // Fallback if not set
    if(!xOffset){
        xOffset = DEFAULT_GRAPH_X_OFFSET;
    }

    if(!yOffset){
        yOffset = DEFAULT_GRAPH_Y_OFFSET;
    }

    const childnodes = nodes.filter(node => node.parentId == id);

    if(childnodes.length > 0){

        const subtreeNodes : React.ReactNode[] = [];
        let subtreeWidth : number = 0;

        // left value of the first childnode/subtree
        let xOffsetCurrent = xOffset; 

        // top value of the childnodes/subtrees       
        let yOffsetCurrent = yOffset + DEFAULT_Y_PADDING + DEFAULT_Y_PADDING + DEFAULT_HEIGHT;

        for(const childnode of childnodes){
            // Get all subtrees for this node as recursion           
            const subtree = GetDegradationLevelSubtree({
                id: childnode.id, 
                nodes: nodes, 
                xOffset: xOffsetCurrent, 
                yOffset: yOffsetCurrent
            });

            // Calculate the overall width for this subtree
            subtreeWidth = subtreeWidth + subtree.width;
            subtreeNodes.push(subtree.node);

            // Update the xOffset (CSS: left) for every new subtree 
            xOffsetCurrent = xOffsetCurrent + subtree.width;
        }

        let left = xOffsetCurrent/2; // + DEFAULT_WIDTH/2;

        if(childnodes.length === 1){
            left = xOffset;
        }

        return {
            width: subtreeWidth,
            node: (
            <>
                <TreeNode
                    left={left}
                    top={yOffset}
                    id={id}
                    label={"Level: "+id}
                />
                {subtreeNodes}
            </>
            )
        };


    }else{

        return {
            width: DEFAULT_X_PADDING + DEFAULT_WIDTH + DEFAULT_X_PADDING,
            node: (<TreeNode
                        left={xOffset+DEFAULT_X_PADDING}
                        top={yOffset}
                        id={id}
                        label={"Level: "+id}
                    />
                )
        };
    }
};

export default GetDegradationLevelSubtree;
