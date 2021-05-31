import { Button } from '@material-ui/core';
import React from 'react';
import { isParenthesizedTypeNode } from 'typescript';
import './DegradationLevelHierarchyEditor.css';


const PADDING_LEFT: number = 50;
const PADDING_TOP: number = 50;
const DEFAULT_WIDTH: number = 200;
const DEFAULT_HEIGHT: number = 64;

export interface IDegradationLevelHierarchyEditorProps{

}

interface Node {
    id: number;
    parentId: number | null;
}


interface ISubTree {
    node: React.ReactNode;
    width: number;
}

interface ISubTreeProps{
    id: number;
    nodes: Node[];
    xOffset: number;
    yOffset: number;
}

const GetSubTree = (props: ISubTreeProps): ISubTree => {

    const {id, nodes, xOffset, yOffset} = props;

    const childnodes = nodes.filter(node => node.parentId == id);

    if(childnodes.length > 0){

        const subtreeNodes : React.ReactNode[] = [];
        let subtreewidth : number = 0;

        let xOffsetCurrent = xOffset;        
        let yOffsetCurrent = yOffset + PADDING_TOP;

        for(const childnode of childnodes){
            // Get all subtrees for this node
            
            const subtree = GetSubTree({id: childnode.id, nodes: nodes, xOffset: xOffsetCurrent, yOffset: yOffsetCurrent});

            // Calculate the overall width for this subtree
            subtreewidth = subtreewidth + subtree.width;
            subtreeNodes.push(subtree.node);

            console.log("Id:", id, xOffsetCurrent);
            // Update the xOffset (CSS: left) for every new subtree 
            xOffsetCurrent = xOffsetCurrent + subtree.width;
        }

        let left = xOffsetCurrent/2;

        if(childnodes.length === 1){
            left = xOffset;
        }

        return {
            width: subtreewidth,
            node: (
            <>

                <div
                    style={{
                            top:(yOffset)+"px", 
                            left:(left)+"px", 
                            width: DEFAULT_WIDTH+"px",
                            display:"inline-block", 
                            border:"1px solid black",
                            position:"absolute"
                            }}
                    >
                    (Id:){id}
                </div>
                {subtreeNodes}
            </>
            )
        };

    }else{

        // use offset to calculate top and left
        return {
            width: DEFAULT_WIDTH,
            node: (<div
                    style={{
                    top:(yOffset)+"px", 
                    left:(xOffset)+"px", 
                    width: DEFAULT_WIDTH+"px",
                    display:"inline-block", 
                    border:"1px solid black",
                    position:"absolute"
                    }}
            >
                    (Id:){id}
            </div>)
        };
    }
}


const DegradationLevelHierarchyEditor = (props: IDegradationLevelHierarchyEditorProps) => {

    const t = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

    const initNodes: Node[] = [
        {
            id: 0,
            parentId: null,
        },
        {
            id: 1,
            parentId: 0,
        },
        {
            id: 2,
            parentId: 0,
        },
        {
            id: 3,
            parentId: 1,
        },
        {
            id: 4,
            parentId: 1,
        },
        {
            id: 5,
            parentId: 3,
        },
        {
            id: 6,
            parentId: 3,
        },
        {
            id: 7,
            parentId: 2,
        },
        {
            id: 8,
            parentId: 7,
        },
        {
            id: 9,
            parentId: 8,
        },
        {
            id: 10,
            parentId: 9,
        }
    ];

    const calculateWidth = (id: number, nodes: Node[]): number => {
        const childnodes = nodes.filter(node => node.parentId == id);
        let width = DEFAULT_WIDTH;
        for(const childnode of childnodes){
            width += calculateWidth(childnode.id, nodes);
        }

        return width;
    };

    // calculate the width at the top node  -> give to the child nodes the cooordinates fir width, left and top - they can calculate the next child coordinates based on these values 
    // NOT POSSIBLE! because not all nodes have the same width -> you dont know it at this state

    const w = calculateWidth(0, initNodes);
    console.log("Complete width:", w);

    const temp = GetSubTree({id: 0, xOffset: 50, yOffset: 50, nodes: initNodes});
    console.log(temp);

    return (
        <div id="degradation-level-hierarchy-editor-container">
            <div id="degradation-level-hierarchy-editor-sidebar">
                <div id="degradation-level-hierarchy-editor-sidebar-title">
                    Unsorted degradation levels
                </div>
                <div id="degradation-level-hierarchy-editor-sidebar-content">
                    {t.map((s)=>{
                        return (
                            <div className="degradation-level-hierarchy-editor-sidebar-item">
                                Item {s}
                            </div>
                            );
                    })
                    }
                </div>
            </div>
            <div id="degradation-level-hierarchy-editor-tree-container">

                <div id="degradation-level-hierarchy-editor-tree-container-content-test">
                   <div className="degradation-level-hierarchy-editor-tree-container-content-test-item">
                        OFF
                    </div>
                    {/* initNodes.filter(n => n.parentId === 0).map((ne, index) => {
                        
                        return (<div style={{
                            top:(PADDING_TOP+100)+"px", 
                            left:(PADDING_LEFT + DEFAULT_WIDTH*index)+"px", 
                            width: DEFAULT_WIDTH+"px",
                            display:"inline-block", 
                            border:"1px solid black",
                            position:"relative"
                            }}>
                                ID: {ne.id}
                            </div>
                        );

                        })*/
                    }
                </div>

                <div>
                    {temp.node}
                </div>
            </div>
        </div>
    );



};


export default DegradationLevelHierarchyEditor;