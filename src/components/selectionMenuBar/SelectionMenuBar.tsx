import { makeStyles, lighten, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
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
        paddingLeft: theme.spacing(2),
    },
    highlight:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
        paddingTop: "12px"
    },
  }),
);

const SelectionMenuBar = (props: ISelectionMenuBarProps) => {

    const {amountOfSelectedItems, onCreateClick, onEditClick, onDeleteClick} = props;
    const classes = useStyles();

    return (
        <>
            <div id="selection-menu-bar" className={clsx(classes.menu, {[classes.highlight]: amountOfSelectedItems > 0})}>  
                {amountOfSelectedItems > 0 ? 
                    
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {amountOfSelectedItems} selected
                    </Typography>
                    : 
                    null                    
                }

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