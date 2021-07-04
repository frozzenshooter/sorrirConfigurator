import React from "react";
import IDegradationLevel from "../../../models/IDegradationLevel";
import ILevelChange from "../../../models/ILevelChange";
import Arrow, { ArrowType } from "./Arrow";
import DegradationLevelTreeNode from "./DegradationLevelTreeNode";
import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH, DEFAULT_NODE_Y_DISTANCE, DEFAULT_TREE_X_OFFSET, DEFAULT_TREE_Y_OFFSET } from "./TreeConstants";


export enum SubtreeType {
    Degradation = 0,
    Upgrade = 1
}

export interface ISubtreeProps {
    currentDegradationLevel?: IDegradationLevel; // not set value means inital OFF state
    degradationLevels: IDegradationLevel[]; // all relevant degradationLevels
    levelChanges: ILevelChange[]; // all LevelChanges that are configured

    // Global offset of the subtree 
    xOffset?: number; // not set as inital values
    yOffset?: number; // not set as inital values

    // SELECTION
    onSelectionChanged: (selected: IDegradationLevel) => void;
    selectedDegradationLevels: IDegradationLevel[];

    subtreeType: SubtreeType;
}

/**
 * Result of the GetSubtree function
 * 
 * Contains the subtree and also the width of it
 */
export interface ISubtreeResult {
    node: React.ReactNode;
    width: number;
}

/**
 * This function will generate the subtree with the currentDegradationLevel as the start node and will it return togheter with the width of this subtree.
 * 
 * Internally it will calculate the subtrees recursively, by calling this function.
 */
const GetSubtree = (props: ISubtreeProps): ISubtreeResult => {

    const {currentDegradationLevel, degradationLevels, levelChanges, subtreeType, onSelectionChanged, selectedDegradationLevels} = props;
    let { xOffset, yOffset } = props;

    // For the case it is nothing set (which is the inital case) use the default offset of the graph
    if(!xOffset){
        xOffset = DEFAULT_TREE_X_OFFSET;
    }

    if(!yOffset){ 
        yOffset = DEFAULT_TREE_Y_OFFSET;
    }

    // Null has to be possible for the OFF node
    let currentDegradationLevelId: number | null = null;
    if(currentDegradationLevel){
        currentDegradationLevelId = currentDegradationLevel.id;
    }

    // Calculate the childnodes to determine if a recursion is required or if you can just return the current node 
    const relevantChildIds = levelChanges.filter(lc => lc.resultDegradationLevelId === currentDegradationLevelId).map(lc => lc.startDegradationLevelId);

    const isSelected = (id: number | null) => {
        if(id === null){
            // This is the case for the OFF node - can't be selected
            return false;
        }

        const index = selectedDegradationLevels.findIndex(d => d.id === id);
        return index !== -1;
    }

    const arrowsEndXCoordinates: number[] = [];

    if(relevantChildIds.length > 0){

        // This case requires to (recursively) calculate a subtree (this might be either a single childnode or a larger subtree) with the corresponding width

        const subtreeNodes : React.ReactNode[] = [];
        let completeSubtreeWidth : number = 0;

        // Calculate the top value for the childnodes/subtrees       
        const yOffsetCurrent = yOffset + DEFAULT_NODE_Y_DISTANCE + DEFAULT_NODE_HEIGHT;

        // left value of the first childnode/subtree
        let xOffsetCurrent = xOffset; 

        const childDegradationLevels = degradationLevels.filter(dl => {
            const index = relevantChildIds.findIndex(id => id === dl.id);
            return index !== -1;
        });


        for(const childDegradationLevel of childDegradationLevels){

            // Get all subtrees for this node as recursion           
            const subtreeResult = GetSubtree({
                degradationLevels: degradationLevels,
                currentDegradationLevel: childDegradationLevel,
                levelChanges: levelChanges,
                selectedDegradationLevels: selectedDegradationLevels,                 
                xOffset: xOffsetCurrent, 
                yOffset: yOffsetCurrent,
                onSelectionChanged: onSelectionChanged,
                subtreeType: subtreeType                
            });

            arrowsEndXCoordinates.push(completeSubtreeWidth + subtreeResult.width/2);

            // Update the complete width
            completeSubtreeWidth = completeSubtreeWidth + subtreeResult.width;
            subtreeNodes.push(subtreeResult.node);

            // Update the xOffset (CSS: left) for every new subtree 
            xOffsetCurrent = xOffsetCurrent + subtreeResult.width;
        }

        let currentNodeLeft = xOffset + completeSubtreeWidth/2 - (DEFAULT_NODE_WIDTH/2);

        return {
            width: completeSubtreeWidth,
            node: (
            <React.Fragment key={currentDegradationLevelId /* This id has to be set because React wants to resolve it under the hood*/}>
                <DegradationLevelTreeNode 
                    key={currentDegradationLevelId}
                    onSelectionChanged={onSelectionChanged}
                    isSelected={isSelected(currentDegradationLevelId)}
                    degradationLevel={currentDegradationLevel}
                    left={currentNodeLeft}
                    top={yOffset}
                />
                {subtreeNodes}
                {arrowsEndXCoordinates.length > 0 ? 
                    <>
                        {arrowsEndXCoordinates.map((a, index) => {

                            if(!xOffset){
                                xOffset = DEFAULT_TREE_Y_OFFSET;
                            }

                            if(!yOffset){ 
                                yOffset = DEFAULT_TREE_Y_OFFSET;
                            }

                            return (
                                <Arrow 
                                    key={index}
                                    left={xOffset}
                                    top={yOffset+DEFAULT_NODE_HEIGHT - 8}
                                    width={completeSubtreeWidth}
                                    endXCoordinate={arrowsEndXCoordinates[index]}
                                    type={subtreeType === SubtreeType.Degradation ? ArrowType.Degradation : ArrowType.Upgrade}
                                    />
                            );
                        })}
                    </>
                : null}
            </React.Fragment>
            )
        };

        
    }else{

        // Trivial case - no Subtree required 
        return {
            width: DEFAULT_NODE_WIDTH,
            node: (
                    <DegradationLevelTreeNode 
                        key={currentDegradationLevelId}
                        onSelectionChanged={onSelectionChanged}
                        isSelected={isSelected(currentDegradationLevelId)}
                        degradationLevel={currentDegradationLevel}
                        left={xOffset}
                        top={yOffset}
                    />
                )

        };
        
    }    
}

export default GetSubtree;