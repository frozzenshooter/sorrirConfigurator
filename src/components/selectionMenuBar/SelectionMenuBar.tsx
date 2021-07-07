import { makeStyles, lighten, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { TreeType } from '../../models/TreeType';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import './SelectionMenuBar.css';
import DecisionDialog from '../decisionDialog/DecisionDialog';
import { useState } from 'react';
import { useConfigurationContext } from '../../context/ConfigurationContext';
import IConfiguration from '../../models/IConfiguration';

export interface ISelectionMenuBarProps {
    amountOfSelectedItems: number;
    onCreateClick: () => void;
    onEditClick: () => void;
    onDeleteClick: () => void;
    treeType: TreeType;
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

    const {amountOfSelectedItems, treeType, onCreateClick, onEditClick, onDeleteClick} = props;
    const classes = useStyles();

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const {configuration, updateConfiguration} = useConfigurationContext();

    const autoCreateTree = () => {
        let newConfiguration : IConfiguration = Object.assign({}, configuration);

        newConfiguration.upgrades = [];

        for(const levelChange of newConfiguration.degradations){

            newConfiguration.upgrades.push({
                resultDegradationLevelId: levelChange.startDegradationLevelId,
                startDegradationLevelId: levelChange.resultDegradationLevelId,
                stateChanges: []
            });
        }
        
        setIsDialogOpen(false);
        updateConfiguration(newConfiguration);
    };

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

                { treeType === TreeType.Upgrade ?
                <Tooltip title="Auto create tree">
                    <IconButton onClick={()=>{setIsDialogOpen(true);}}>
                        <MergeTypeIcon/>
                    </IconButton>
                </Tooltip> 
                : null}   
                <Tooltip title="Create level">
                    <IconButton onClick={()=>{onCreateClick();}}>
                        <AddIcon />
                    </IconButton>
                </Tooltip> 
                {amountOfSelectedItems > 0?
                    amountOfSelectedItems === 1 ?
                            <>
                                <Tooltip title="Edit level">
                                    <IconButton onClick={()=>{onEditClick();}}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>            
                                <Tooltip title="Delete level">
                                    <IconButton onClick={()=>{onDeleteClick();}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>  
                            </>
                        :
                            <Tooltip title="Delete levels">
                                <IconButton onClick={()=>{onDeleteClick();}}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>  
                    :
                    null
                } 

            </div>
            <Divider></Divider>

            <DecisionDialog 
                onCancelClick={() => {setIsDialogOpen(false);}}
                onConfirmClick={autoCreateTree}
                open={isDialogOpen}
                title={"Auto create tree"}
                text={"The current tree will be deleted and replaced with a automatic generated tree. The automatic generated tree will be the inverse of the degradation tree."}                
            />
        </>
    );
};

export default SelectionMenuBar;