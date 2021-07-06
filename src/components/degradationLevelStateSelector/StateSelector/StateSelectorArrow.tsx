export interface IStateSelectorArrowProps {
    height: number;
    width: number;
};

const StateSelectorArrow = (props: IStateSelectorArrowProps) => {

    const {height, width} = props;

    const pathString = "M"+0+" "+(height/2) + " H"+ (width-10);

    return (
        <svg
            style={{
                marginRight: "8px",
                marginTop: "16px",
                minWidth: width
            }}
            preserveAspectRatio="none" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            height={height}
            width={width}>

            <defs>
                <marker id='head' orient='270' markerWidth='10' markerHeight='10' refX='5' refY='1'>
                    <path d='M0,0 H10 L5,10 L0,0 Z' fill='black' />
                </marker>
            </defs> 
            <path markerEnd='url(#head)' d={pathString} stroke="black" />
        </svg>
    );
};

export default StateSelectorArrow;