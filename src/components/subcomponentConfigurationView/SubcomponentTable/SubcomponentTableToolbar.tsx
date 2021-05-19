import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';

/**
 * Style of the table toolbar
 */
const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
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
        },
    }),
);

/**
 * Properties for the SubComponentTableToolbar
 */
interface SubComponentTableToolbarProps {
    numSelected: number;
    handleSubComponentDeletion: () => void;
    handleSubComponentEdit: () => void;
    handleSubComponentCreation: () => void;
}

/**
 * Toolbar for the SubComponentTable
 * 
 * @param props SubComponentTableToolbarProps
 * @returns toolbar
 */
const SubComponentTableToolbar = (props: SubComponentTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected, handleSubComponentDeletion, handleSubComponentEdit, handleSubComponentCreation} = props;

    return (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          {numSelected > 0 ? (
            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Subcomponents
            </Typography>
          )}
          <Tooltip title="Create">
            <IconButton aria-label="Create" onClick={()=>{handleSubComponentCreation();}}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          { numSelected > 0 ? (
                numSelected === 1 ? 
                (   <div style={{display: "inline-flex"}}>
 
                        <Tooltip title="Edit">
                            <IconButton aria-label="edit" onClick={()=>{handleSubComponentEdit();}}>
                                <EditIcon />
                            </IconButton>                    
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton aria-label="delete" onClick={()=>{handleSubComponentDeletion();}}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                ) : 
                ( <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={()=>{handleSubComponentDeletion();}}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>    
                )
            ) : (<div></div>)}
        </Toolbar>
      );
}

export default SubComponentTableToolbar;