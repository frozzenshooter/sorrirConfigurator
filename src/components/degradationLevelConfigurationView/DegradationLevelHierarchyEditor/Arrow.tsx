import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./Constants";

export interface IArrowProps {
    left: number,
    top: number,
    width: number,
    end: number
}

const Arrow = (props: IArrowProps) => {

    const {top, left, width, end} = props;

    const arrowStart = width/2;
    const height = 50;
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
            <marker id='head' orient='0' markerWidth='10' markerHeight='10' refX='5' refY='1'>
                <path d='M0,0 H10 L5,10 L0,0 Z' fill='black' />
            </marker>
        </defs> 
        <path marker-end='url(#head)' d={"M"+arrowStart+" 0 L"+arrowStart+" 25 H"+end+" L"+end+" "+(height-10)+""} stroke="black" />
    </svg>
    );
};

export default Arrow;