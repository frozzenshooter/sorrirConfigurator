import { DEFAULT_NODE_Y_DISTANCE } from "./TreeConstants";

export enum ArrowType {
    Degradation = 0,
    Upgrade = 1
}

export interface IArrowProps {
    left: number,
    top: number,
    width: number,
    endXCoordinate: number,
    type: ArrowType,
}

const Arrow = (props: IArrowProps) => {

    const {top, left, width, endXCoordinate, type} = props;

    const arrowXCoordinateStart = width/2;
    const height = DEFAULT_NODE_Y_DISTANCE + 16; // + 16 is because of the internal padding of the tree nodes

    const halfHeight = height / 2;

    if(type === ArrowType.Upgrade){
        return(
            <svg
                style = {{
                    position:"absolute", 
                    top: top+"px",
                    left: left +"px"
                }}
                preserveAspectRatio="none" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                height={height}
                width={width}>
        
                <defs>
                    <marker id='head' orient='0' markerWidth='10' markerHeight='10' refX='5' refY='1'>
                        <path d='M0,0 H10 L5,10 L0,0 Z' fill='black' />
                    </marker>
                </defs> 
                <path markerEnd='url(#head)' d={"M"+arrowXCoordinateStart+" 0 L"+arrowXCoordinateStart+" "+halfHeight+" H"+endXCoordinate+" L"+endXCoordinate+" "+(height-10)+""} stroke="black" />
            </svg>
            );
    }else{
        return(
            <svg
                style = {{
                    position:"absolute", 
                    top:top+"px",
                    left: left +"px"
                }}
                preserveAspectRatio="none" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                height={height}
                width={width}>
        
                <defs>
                    <marker id='head' orient='180' markerWidth='10' markerHeight='10' refX='5' refY='1'>
                        <path d='M0,0 H10 L5,10 L0,0 Z' fill='black' />
                    </marker>
                </defs>         
                <path markerEnd='url(#head)' d={"M"+endXCoordinate+" "+height+ "L"+endXCoordinate +" "+(height-halfHeight)+ " " +"H"+endXCoordinate +"L"+arrowXCoordinateStart+" "+halfHeight+""+ "L"+arrowXCoordinateStart+" 10"  } stroke="black" />
            </svg>
            );
    }



};

export default Arrow;