import React from "react";
import Arrow, { ArrowType } from "./Arrow";
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

    const arrowEnds: number[] = [];

    const getArrows = () => {

        const amount = childnodes.length;
        
        return (
            <>
            </>            
        );
    };


    if(childnodes.length > 0){

        // Complexe case: recusively resolve the subtrees  
        const subtreeNodes : React.ReactNode[] = [];
        let subtreeWidth : number = 0;

        // Calculate the top value for the childnodes/subtrees       
        const yOffsetCurrent = yOffset + DEFAULT_Y_PADDING + DEFAULT_HEIGHT;

        // left value of the first childnode/subtree
        let xOffsetCurrent = xOffset; 

        for(const childnode of childnodes){
            // Get all subtrees for this node as recursion           
            const subtree = GetDegradationLevelSubtree({
                id: childnode.id, 
                nodes: nodes, 
                xOffset: xOffsetCurrent, 
                yOffset: yOffsetCurrent
            });

            arrowEnds.push(subtreeWidth + subtree.width/2);

            // Calculate the overall width for this subtree
            subtreeWidth = subtreeWidth + subtree.width;
            subtreeNodes.push(subtree.node);

            // Update the xOffset (CSS: left) for every new subtree 
            xOffsetCurrent = xOffsetCurrent + subtree.width;
        }

        let parentNodeLeft = xOffset + subtreeWidth/2 - (DEFAULT_WIDTH/2);

        if(childnodes.length === 1){
            parentNodeLeft = xOffset;
        }

        return {
            width: subtreeWidth,
            node: (
            <>
                <TreeNode
                    left={parentNodeLeft}
                    top={yOffset}
                    id={id}
                    label={"Level: "+id}
                />
                {arrowEnds.length > 0 ? 
                    <>
                    {arrowEnds.map((a,index) => {

                        if(!xOffset){
                            xOffset = DEFAULT_GRAPH_X_OFFSET;
                        }

                        if(!yOffset){ 
                            yOffset = DEFAULT_GRAPH_Y_OFFSET;
                        }

                        return (

                        <Arrow 
                            left={xOffset}
                            top={yOffset+DEFAULT_HEIGHT}
                            width={subtreeWidth}
                            end={arrowEnds[index]}
                            type={ArrowType.Degradation}
                            />);
                    })}
                </>
                : null}
                {subtreeNodes}
            </>
            )
        };


    }else{

        // Simple case: just create a node
        return {
            width: DEFAULT_WIDTH,
            node: (<TreeNode
                        left={xOffset}
                        top={yOffset}
                        id={id}
                        label={"Level: "+id}
                    />
                )
        };
    }
};

export default GetDegradationLevelSubtree;
