import { DEFAULT_NODE_WIDTH } from "./TreeConstants";
import { useDrop } from 'react-dnd'
import ItemTypes from "../ItemTypes";

export interface IDegradationLevelTreeNodeDropProps {
    top: number,
    left: number
}

const DegradationLevelTreeNodeDrop = (props: IDegradationLevelTreeNodeDropProps) => {

    const {top, left} = props;

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.LEVEL,
        drop: (item) => console.log(ItemTypes),
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
                margin: "8px",
                width: DEFAULT_NODE_WIDTH - 32,
                border: isOver ? "1px dashed black" : "none",
                height: "20px" , 
                boxSizing: "border-box",
                backgroundColor: isOver ? "rgba(63, 81, 181, 0.3)" : "transparent",
                zIndex: 9 // required because otherwise the arrows would be in front of it             
            }}
        >
            
        </div>
    );
};

export default DegradationLevelTreeNodeDrop;