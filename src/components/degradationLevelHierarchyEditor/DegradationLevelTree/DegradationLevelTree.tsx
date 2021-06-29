import IDegradationLevel from "../../../models/IDegradationLevel";
import ILevelChange from "../../../models/ILevelChange";
import { DEFAULT_NODE_WIDTH, DEFAULT_TREE_X_OFFSET, DEFAULT_TREE_Y_OFFSET } from "./TreeConstants";

export interface IDegradationLevelTreeProps {
    degradationLevels: IDegradationLevel[]; // presort the relevant levels to just have to do it once
    levelChanges: ILevelChange[];
    onSelectionChanged: (selected: IDegradationLevel) => void;
}

const DegradationLevelTree = (props: IDegradationLevelTreeProps) => {

    const {degradationLevels, levelChanges, onSelectionChanged} = props;

    // Calculate the subtree (including the width for the internal calculation)
    const subtreeResult = GetSubtree({
        degradationLevels:degradationLevels,
        levelChanges: levelChanges,
        onSelectionChanged: onSelectionChanged
    });

    return (
        <>
            {subtreeResult.node}
        </>
    );
};


//#region internal generation of the subtree

interface ISubtreeProps {
    currentDegradationLevel?: IDegradationLevel; // not set value means inital OFF state
    xOffset?: number; // not set as inital values
    yOffset?: number; // not set as inital values
    degradationLevels: IDegradationLevel[]; // all relevant degradationLevels
    levelChanges: ILevelChange[]; // all LevelCHanges that are configured
    onSelectionChanged: (selected: IDegradationLevel) => void;
}

interface ISubtreeResult {
    node: React.ReactNode;
    width: number;
}


const GetSubtree = (props: ISubtreeProps): ISubtreeResult => {

    const {currentDegradationLevel, degradationLevels, levelChanges, onSelectionChanged} = props;
    let { xOffset, yOffset } = props;

    // For the case it is nothing set (which is the inital case) use the default offset of the graph
    if(!xOffset){
        xOffset = DEFAULT_TREE_X_OFFSET;
    }

    if(!yOffset){ 
        yOffset = DEFAULT_TREE_Y_OFFSET;
    }

    // Calculate the childnodes to determine if a recursion is required or if you can just return the current node 
    let currentDegradationLevelId: number | null = null;
    if(currentDegradationLevel){
        currentDegradationLevelId = currentDegradationLevel.id;
    }

    const relevantChildIds = levelChanges.filter(lc => lc.resultDegradationLevelId === currentDegradationLevelId).map(lc => lc.startDegradationLevelId);

    if(relevantChildIds.length > 0){

        // This case requires to (recursively) calculate a subtree (this might be either a single childnode or a larger subtree) with the corresponding width

        return {node: null, width: 0};
        
    }else{

        // Trivial case - no Subtree required 

        return {
            width: DEFAULT_NODE_WIDTH,
            node: (
                    <div>
                    </div>
                )

        };
        
    }    
}

//#endregion

export default DegradationLevelTree;



const GetDegradationLevelSubtreeaa = (props: IDegradationLevelSubtreeProps): IDegradationLevelSubtreeResult => {

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