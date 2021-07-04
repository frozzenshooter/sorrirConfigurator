import { Paper } from "@material-ui/core";
import IDegradationLevel from "../../../models/IDegradationLevel";
import { makeStyles, lighten, Theme, createStyles } from '@material-ui/core/styles';

import './DegradationLevelNode.css';
import ItemTypes from "../ItemTypes";
import { useDrag } from "react-dnd";
import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from "../DegradationLevelTree/TreeConstants";

export interface IDegradationLevelNodeProps {
    degradationLevel: IDegradationLevel;
    isSelected: boolean;
    onSelectionChanged: (selected: IDegradationLevel) => void;
    top?: number;
    left?: number;
}

// Style required for the selection of the nodes
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    normal: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
    selected:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
  }),
);


const DegradationLevelNode = (props: IDegradationLevelNodeProps) => {

    const {degradationLevel, isSelected, top, left, onSelectionChanged} = props;

    const classes = useStyles();

    // Dynamically set different classes based on the selection state of the current degradation level
    let classNames = classes.normal;
    if(isSelected){
        classNames = classes.selected;
    }

    const label = degradationLevel.label + " (" + degradationLevel.id + ")";

    const handleClick = () => {
        onSelectionChanged(degradationLevel);
    }

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.LEVEL,
        item: degradationLevel,
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
    }))

    // Determine if the node will be displayed in the tree and therefore additonal css properties have to be set
    let isUsedInTree = false;
    if(top != undefined && left  != undefined){
        isUsedInTree = true;
    }

    const finalWidth = DEFAULT_NODE_WIDTH - 16; // -16 because of the padding that is added 
    const finalHeight = DEFAULT_NODE_HEIGHT - 16; // -16 because of the padding that is added 

    return (
        <div
            style={{
                width: finalWidth, 
                height: finalHeight,
                padding: "8px",
                top: isUsedInTree ? top+"px" : "0px", 
                left: isUsedInTree ? left+"px" : "0px", 
                position: isUsedInTree ? "absolute" : "static"
            }}
        >
            <Paper
                className={classNames}
                onClick={handleClick}
                ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    height: finalHeight,
                    width: finalWidth,
                }}
            >
                <div className="degradation-level-node-content">
                    <div className="degradation-level-node-content-label">
                        {label}
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default DegradationLevelNode;