import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import './SelectionMenuBar.css';

export interface ISelectionMenuBarProps {
    amountOfSelectedItems: number;
    onCreateClick: () => void;
    onEditClick: () => void;
    onDeleteClick: () => void;
}

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



const SelectionMenuBar = (props: ISelectionMenuBarProps) => {

    const {amountOfSelectedItems, onCreateClick, onEditClick, onDeleteClick} = props;
    const classes = useStyles();

    return (
        <>
            <div id="selection-menu-bar" className={classes.menu}>    
                <Tooltip title="Create">
                    <IconButton onClick={()=>{onCreateClick();}}>
                        <AddIcon />
                    </IconButton>
                </Tooltip> 
                {amountOfSelectedItems > 0?
                    amountOfSelectedItems === 1 ?
                            <>
                                <Tooltip title="Edit">
                                <IconButton onClick={()=>{onEditClick();}}>
                                    <EditIcon />
                                </IconButton>
                                </Tooltip>            
                                <Tooltip title="Delete">
                                    <IconButton onClick={()=>{onDeleteClick();}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>  
                            </>
                        :
                            <Tooltip title="Delete">
                            <IconButton onClick={()=>{onDeleteClick();}}>
                                <DeleteIcon />
                            </IconButton>
                            </Tooltip>  
                    :
                    null
                } 

            </div>
            <Divider></Divider>
        </>
    );
};

export default SelectionMenuBar;