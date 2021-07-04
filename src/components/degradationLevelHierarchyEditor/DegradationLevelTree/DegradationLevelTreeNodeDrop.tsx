import { DEFAULT_DROP_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from "./TreeConstants";
import { useDrop } from 'react-dnd'
import ItemTypes from "../ItemTypes";

export enum DegradationLevelTreeNodeDropType {
    ABOVE = 0,
    BELOW = 1
}

export interface IDegradationLevelTreeNodeDropProps {
    top: number;
    left: number;
    degradationLevelId: number | null;
    type: DegradationLevelTreeNodeDropType;
}

const DegradationLevelTreeNodeDrop = (props: IDegradationLevelTreeNodeDropProps) => {

    const {top, left, degradationLevelId, type} = props;

    const asString = (type: DegradationLevelTreeNodeDropType) => {
        if(type === DegradationLevelTreeNodeDropType.ABOVE){
            return "above";
        }else{
            return "below";
        }        
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.LEVEL,
        drop: (item) => console.log(degradationLevelId + "("+asString(type)+"):", item),
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
    }))

    return (
        <div
            ref={drop}            
            style={{
                top: top + "px",
                left: left + "px",
                position: "absolute",
                width: DEFAULT_NODE_WIDTH - 16,
                border: isOver ? "1px dashed black" : "none",
                height: DEFAULT_DROP_NODE_HEIGHT+ "px" , 
                boxSizing: "border-box",
                backgroundColor: isOver ? "rgba(63, 81, 181, 0.3)" : "transparent",
                zIndex: 9 // required because otherwise the arrows would be in front of it             
            }}
        >
            
        </div>
    );
};

export default DegradationLevelTreeNodeDrop;