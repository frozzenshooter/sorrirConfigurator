import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DecisionDialog } from '../decisionDialog/DecisionDialog';
import IConfiguration from '../../interfaces/IConfiguration';
import IDegradationLevel from '../../interfaces/IDegradationLevel';
import ISubComponent from '../../interfaces/ISubComponent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import './DegradationLevelDialog.css';
import { Divider, FormGroup } from '@material-ui/core';

export enum DegradationLevelDialogType {
    Create = 0,
    Edit = 1
}





/**
 * Styles for the @DecisionDialog
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        title: {            
            flexGrow: 1,
        },
        appBarSpacer: theme.mixins.toolbar,
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
            maxWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
);


/**
 * Properties for the @DecisionDialog
 */
export interface IDegradationLevelDialogProps{
    degradationLevel: IDegradationLevel,
    type: DegradationLevelDialogType,
    configuration: IConfiguration,
    isOpen: boolean;
    handleSave: (degradationLevel: IDegradationLevel) => void;
    handleCancel: () => void;
}

/**
 * Transition of the dialog to slide in from the topside 
 */
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  }
);


export const DegradationLevelDialog = (props: IDegradationLevelDialogProps) => {

    const {configuration, degradationLevel, type, isOpen, handleSave, handleCancel } = props;

    const classes = useStyles();

    // Title generation
    let title = "";

    if(type === DegradationLevelDialogType.Create){
        title += "Create";
    }else if(type === DegradationLevelDialogType.Edit){
        title += "Edit";
        if(degradationLevel?.label !== null){
            title = title + " - " + degradationLevel?.label;
        }
    }

    // Cancel confirmation dialog
    const [cancelConfirmationDialogOpen, setCancelConfirmationDialogOpen] = React.useState<boolean>(false);

    const handleCloseIconClicked = () => {
        setCancelConfirmationDialogOpen(true);
    }

    const handleCancelConfirmationDialogAccept = () => {
        setCancelConfirmationDialogOpen(false);
        handleCancel();
    }

    const handleCancelConfirmationDialogCancel = () => {
        setCancelConfirmationDialogOpen(false);
    }


    // Internal state
    const getInitalInternalState = () : IDegradationLevel => {
        const initalDegradationLevel : IDegradationLevel = {...degradationLevel};

        if(type === DegradationLevelDialogType.Create){
            // Create inital state of the dependencies
            configuration.subComponents.map(s => {
                initalDegradationLevel.dependencies.push({shadowmodeId: "", subComponentId: s.id});            
            });

        }else if(type === DegradationLevelDialogType.Edit){
            // Add the DC (don't care) dependencies - they won't be saved
            configuration.subComponents.map(s => {

                const id = initalDegradationLevel.dependencies.findIndex(d => d.subComponentId == s.id);
                if(id === -1){
                    // No index found means that in the shadowmode was on DC before and an empty dependecy has to be added
                    initalDegradationLevel.dependencies.push({shadowmodeId: "", subComponentId: s.id}); 
                }
            });
        }
        
        return initalDegradationLevel;
    };

    const [degradationLevelState, setDegradationLevelState] =  React.useState<IDegradationLevel>(getInitalInternalState());

    /**
     * Update the degradationLevelState with the new dependency
     * 
     * @param shadowmodeId 
     * @param dependencyIndex 
     */
    const updateDegradationLevelStateDependency = (shadowmodeId: string, dependencyIndex: number) => {
        let newDegradationLevelState = {... degradationLevelState};   
        newDegradationLevelState.dependencies[dependencyIndex].shadowmodeId = shadowmodeId;
        setDegradationLevelState(newDegradationLevelState); 
    }

    /**
     * Creates the selector for the shadowode based on a subcomponent
     * 
     * @param subComponent 
     * @returns 
     */
    const getDependencySelector = (subComponent: ISubComponent) => {

        let dependencyIndex = degradationLevelState.dependencies.findIndex(d => d.subComponentId === subComponent.id);
        
        if(dependencyIndex === -1){
            console.error("Not able to find dependency for subcomponent!");
            return ;
        }

        return (
        <FormControl className={classes.formControl}>
            <InputLabel shrink id="shadowmode-select-label">{subComponent.name}</InputLabel>
            <Select
                variant="outlined"
                labelId="shadowmode-select-label"
                id="shadowmode-select"
                value={degradationLevelState.dependencies[dependencyIndex].shadowmodeId}
                onChange={(ev)=> {
                    updateDegradationLevelStateDependency((ev.target.value as string), dependencyIndex);
                }}
                displayEmpty
                className={classes.selectEmpty}
                >
                <MenuItem value="">
                    <em>DC</em>
                </MenuItem>
                {subComponent.shadowmodes.map(sm => {
                        return (
                            <MenuItem value={sm.id}>{sm.name}</MenuItem>
                        );
                    })
                }                
            </Select>
        </FormControl>
      );
    }

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id: number = +event.target.value;
        let newDegradationLevelState = {... degradationLevelState};   
        newDegradationLevelState.id = id;
        setDegradationLevelState(newDegradationLevelState); 
    }
    
    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newDegradationLevelState = {... degradationLevelState};   
        newDegradationLevelState.label = event.target.value;
        setDegradationLevelState(newDegradationLevelState); 
    }

    return (
        <Dialog
            fullScreen={true}
            open={isOpen}
            onClose={handleCancel}
            TransitionComponent={Transition}
            >
                <AppBar position="fixed">
                    <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseIconClicked}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={() => { handleSave(degradationLevelState)}}>
                        <SaveIcon />
                    </IconButton>

                    </Toolbar>
                </AppBar>
                <div className={classes.appBarSpacer}></div>
                <div id="degradation-level-dialog-properties-container">
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Id"
                            type="number"
                            variant="outlined"
                            value={degradationLevelState.id}
                            onChange={handleIdChange}
                            InputLabelProps={{ shrink: true }}
                            /> 
                    </FormControl> 
                    <FormControl className={classes.formControl}>
                        <TextField
                            value={degradationLevelState.label}
                            onChange={handleLabelChange}
                            variant="outlined"
                            label="Label"/> 
                    </FormControl> 
                </div>
                <div id="degradation-level-dialog-dependency-container">
                    {configuration.subComponents.map(subComponent => {
                        return (getDependencySelector(subComponent));
                    })}
                </div>
                <DecisionDialog
                    isOpen={cancelConfirmationDialogOpen}
                    handleAccept={handleCancelConfirmationDialogAccept}
                    handleCancel={handleCancelConfirmationDialogCancel}
                    text={"All changes will be discarded!"}
                    title={"Discard changes?"}
                />
        </Dialog>
    );    
}