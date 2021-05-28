
export interface IDegradationLevelBoxProps {
    label: string
}

const DegradationLevelBox = (props: IDegradationLevelBoxProps) => {
    const {label} = props;

    return (
        <div>
           {label} 
        </div>
    );
};

export default DegradationLevelBox;