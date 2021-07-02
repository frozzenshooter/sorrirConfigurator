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
        width: DEFAULT_WIDTH-32,
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
            width: DEFAULT_WIDTH-32,
            height: DEFAULT_HEIGHT
          },
  }),
);


const DegradationLevelNode = (props: IDegradationLevelNodeProps) => {

    const {degradationLevel, isSelected, top, left, onSelectionChanged} = props;

    const classes = useStyles();

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

    if(top && left){
        // This is the case in which the node is used in the tree

        return (
            <Paper
                className={classNames}
                onClick={handleClick}
                ref={drag}
                style={{
                  opacity: isDragging ? 0.5 : 1,
                  top:top+"px", 
                  left:left+"px", 
                  position: "absolute"
                }}
            >
                  <div className="degradation-level-node-content">
                    <div className="degradation-level-node-content-label">
                        {label}
                    </div>
                </div>
            </Paper>
        );

    }else{
        
        // This is the case for the unsorted degradation levels that don't require an additonal positioning

        return (
            <Paper
                className={classNames}
                onClick={handleClick}
                ref={drag}
                style={{
                  opacity: isDragging ? 0.5 : 1,
                }}
            >
                  <div className="degradation-level-node-content">
                    <div className="degradation-level-node-content-label">
                        {label}
                    </div>
                </div>
            </Paper>
        );
    }
};

export default DegradationLevelNode;