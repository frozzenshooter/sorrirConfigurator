import ReactFlow, { Controls, Background }  from 'react-flow-renderer';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import './DegradationGraph.css';

const elements = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
    // you can also pass a React component as a label
    { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
  ];
  
const BasicFlow = () => 
<ReactFlow elements={elements}>
    <Controls />
    <Background color="#aaa" gap={16} />
</ReactFlow>;

/**
 * Styles for the @DegradationGraph
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
        width: 'fit-content',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary, 
        padding: theme.spacing(1),
    },
  }),
);


/**
 * Properties for the @DegradationGraph
 */
export interface IDegradationGraphProps{
    createDegradationLevel: () => void;
    editDegradationLevel: () => void;
    deleteDegradationLevel: () => void;
}

/**
 * Interactive graph to allow the creation of the different degradation levels
 * 
 * @param props
 */
export const DegradationGraph = (props: IDegradationGraphProps) => {

    const {createDegradationLevel, editDegradationLevel, deleteDegradationLevel} = props;

    const classes = useStyles();

    return (
        <div id="degradation-graph-container">
            <div id="degradation-graph-menu" className={classes.menu}>    
                <Tooltip title="Create">
                    <IconButton aria-label="Create" onClick={()=>{createDegradationLevel();}}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>  
                <Tooltip title="Edit">
                    <IconButton aria-label="Edit" onClick={()=>{editDegradationLevel();}}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>            
                <Tooltip title="Delete">
                    <IconButton aria-label="Delete" onClick={()=>{deleteDegradationLevel();}}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>    
                <Tooltip title="Help">
                    <IconButton aria-label="Help" onClick={()=>{console.log("Help clicked!");}}>
                        <HelpOutlineIcon />
                    </IconButton>
                </Tooltip>  
            </div>
            <Divider></Divider>
            <div id="degradation-graph-content">
                <BasicFlow/>
            </div>
        </div>
    );
}