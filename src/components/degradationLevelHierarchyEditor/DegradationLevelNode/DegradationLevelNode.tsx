import { Paper } from "@material-ui/core";
import IDegradationLevel from "../../../models/IDegradationLevel";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../degradationLevelConfigurationView/DegradationLevelHierarchyEditor/Constants";
import { makeStyles, lighten, Theme, createStyles } from '@material-ui/core/styles';

import './DegradationLevelNode.css';
import ItemTypes from "../ItemTypes";
import { useDrag } from "react-dnd";

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
        color: theme.palette.text.primary, 
        margin: "8px",
        width: DEFAULT_WIDTH-32, //-32 becuase of the padding that will be added by the paper
        height: DEFAULT_HEIGHT
    },
    selected:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            margin: "8px",
            width: DEFAULT_WIDTH-32, //-32 becuase of the padding that will be added by the paper
            height: DEFAULT_HEIGHT
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
            margin: "8px",
            width: DEFAULT_WIDTH-32, //-32 becuase of the padding that will be added by the paper
            height: DEFAULT_HEIGHT
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

    return (
        <Paper
            className={classNames}
            onClick={handleClick}
            ref={drag}
            style={{
              opacity: isDragging ? 0.5 : 1,
              top: isUsedInTree ? top+"px" : "0px", 
              left: isUsedInTree ? left+"px" : "0px", 
              position: isUsedInTree ? "absolute" : "static"
            }}
        >
              <div className="degradation-level-node-content">
                <div className="degradation-level-node-content-label">
                    {label}
                </div>
            </div>
        </Paper>
    );
};

export default DegradationLevelNode;