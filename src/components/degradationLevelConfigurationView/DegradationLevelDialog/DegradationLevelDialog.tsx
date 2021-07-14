import React from 'react';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import IDegradationLevel from '../../../models/IDegradationLevel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Divider } from '@material-ui/core';
import './DegradationLevelDialog.css';
import { useConfigurationContext } from '../../../context/ConfigurationContext';
import IConfiguration from '../../../models/IConfiguration';
import DecisionDialog from '../../decisionDialog/DecisionDialog';
import DegradationLevelDialogType from './DegradationLevelDialogType';
import Alert from '@material-ui/lab/Alert';
import ChipInput from '../../chipInput/ChipInput';
import IDegradationLevelState from '../../../models/IDegradationLevelState';
import IDegradationLevelDependencySet from '../../../models/IDegradationLevelDependencySet';
import DegradationLevelDependencySetInput from '../DegradationLevelDependencySetInput/DegradationLevelDependencySetInput';

export interface IDegradationLevelDialogProps {
    open: boolean
    type: DegradationLevelDialogType,
    degradationLevel?: IDegradationLevel,
    onClose: () => void;
}

/**
 * Styles for the @DegradationLevelDialog
 */
 const useStyles = makeStyles((theme: Theme) =>
 createStyles({
       title: {            
           flexGrow: 1,
       },
       appBarSpacer: theme.mixins.toolbar,
       formControl: {
        marginRight: theme.spacing(1),
        minWidth: 200,
        maxWidth: 200,
    },
   })
);


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

const DegradationLevelDialog = (props: IDegradationLevelDialogProps) => {

    const {open, type, degradationLevel, onClose} = props;

    //#region Init state
    const initalDegradationLevel :IDegradationLevel = {
        id: 1,
        label: "",
        dependencySets: [],
        states: []
    };

    if(type === DegradationLevelDialogType.Edit && degradationLevel !== null && degradationLevel !== undefined){
        initalDegradationLevel.id = degradationLevel.id;
        initalDegradationLevel.label = degradationLevel.label;
        initalDegradationLevel.dependencySets = degradationLevel.dependencySets.slice();
        initalDegradationLevel.states = degradationLevel.states.slice();
    }

    //#endregion

    const [id, setId] = React.useState<number>(initalDegradationLevel.id);
    const [label, setLabel] = React.useState<string>(initalDegradationLevel.label);
    const [dependencySets, setDependencySets] = React.useState<IDegradationLevelDependencySet[]>(initalDegradationLevel.dependencySets);
    const [states, setStates] = React.useState<IDegradationLevelState[]>(initalDegradationLevel.states);
    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState<boolean>(false);
    const [errorMessages, setErrorMessages] = React.useState<string[]>([]);

    const classes = useStyles();

    const {configuration, updateConfiguration} = useConfigurationContext();

    //#region Close/Save handling
    const resetState = () => {
        if(type === DegradationLevelDialogType.Create){
            setId(1);
            setLabel("");
            setDependencySets([]);
            setStates([]);
            setErrorMessages([]);
        }
        // This is not required for type === Edit, because then the dialog has to be rerendered anyway
    }

    const handleClose = () => {
        resetState();
        onClose();
    }

    const handleSave = () => {
        if(isValid()){
            const newConfiguration: IConfiguration = Object.assign({}, configuration);

            // Remove all dont cares and only save the relevant ones
            for(let setIndex = 0; setIndex < dependencySets.length; setIndex++){
                dependencySets[setIndex].dependencies = dependencySets[setIndex].dependencies.filter(d => d.shadowmodeId !== "").slice();
            }

            if(type === DegradationLevelDialogType.Create) {

                // you can just push it - validate ensures there can't be an invalid state
                const newDegradationLevel: IDegradationLevel = {
                    id: id,
                    label: label,
                    dependencySets: dependencySets,
                    states: states
                };
        
                newConfiguration.degradationLevels.push(newDegradationLevel);

            }else if(type === DegradationLevelDialogType.Edit) {

                // Find all states that will be deleted to update stateChanges later
                const idsOfStatesToDelete: string[] = [];

                initalDegradationLevel.states.forEach(s => {
                    const ind = states.findIndex(newS => newS.id === s.id);
                    if(ind === -1){
                        // old sate not found in new states - has to be deleted
                        idsOfStatesToDelete.push(s.id);
                    }
                });

                if(id !== initalDegradationLevel.id){
                
                    // id has changed - remove old level and insert new one
                    newConfiguration.degradationLevels = newConfiguration.degradationLevels.filter(d => d.id !== initalDegradationLevel.id).slice();
                    const newDegradationLevel: IDegradationLevel = {
                        id: id,
                        label: label,
                        dependencySets: dependencySets,
                        states: states
                    };
            
                    newConfiguration.degradationLevels.push(newDegradationLevel);

                    //#region LevelChange updates

                    // update the stateChanges(degradation and upgrade) because the states might be changed and also update the id of the levelChange                    
                    for(let degradationIndex = 0; degradationIndex < newConfiguration.degradations.length; degradationIndex++){

                        // Update the LevelChangeIds
                        if(newConfiguration.degradations[degradationIndex].startDegradationLevelId === initalDegradationLevel.id){
                            newConfiguration.degradations[degradationIndex].startDegradationLevelId = id;
                        }

                        if(newConfiguration.degradations[degradationIndex].resultDegradationLevelId === initalDegradationLevel.id){
                            newConfiguration.degradations[degradationIndex].resultDegradationLevelId = id;
                        }

                        // Update the stateChanges of the current LevelChange (Degradation) - remove the stateChanges that rely on not exitsing states (they have to be set again anyway)
                        newConfiguration.degradations[degradationIndex].stateChanges = newConfiguration.degradations[degradationIndex].stateChanges.filter(sc => {
                            const startStateIndex = idsOfStatesToDelete.findIndex(id => id === sc.startStateId);
                            const resultStateIndex = idsOfStatesToDelete.findIndex(id => id === sc.resultStateId);

                            if(startStateIndex !== -1 || resultStateIndex !== -1){
                                return false;
                            }else{
                                return true;
                            }
                        });
                    }

                    for(let upgradeIndex = 0; upgradeIndex < newConfiguration.upgrades.length; upgradeIndex++){

                        // Update the LevelChangeIds
                        if(newConfiguration.upgrades[upgradeIndex].startDegradationLevelId === initalDegradationLevel.id){
                            newConfiguration.upgrades[upgradeIndex].startDegradationLevelId = id;
                        }

                        if(newConfiguration.upgrades[upgradeIndex].resultDegradationLevelId === initalDegradationLevel.id){
                            newConfiguration.upgrades[upgradeIndex].resultDegradationLevelId = id;
                        }

                        // Update the stateChanges of the current LevelChange (Upgrade) - remove the stateChanges that rely on not exitsing states (they have to be set again anyway)
                        newConfiguration.upgrades[upgradeIndex].stateChanges = newConfiguration.upgrades[upgradeIndex].stateChanges.filter(sc => {
                            const startStateIndex = idsOfStatesToDelete.findIndex(id => id === sc.startStateId);
                            const resultStateIndex = idsOfStatesToDelete.findIndex(id => id === sc.resultStateId);

                            if(startStateIndex !== -1 || resultStateIndex !== -1){
                                return false;
                            }else{
                                return true;
                            }
                        });
                    }

                    //#endregion

                }else{
                     // id the same - update the existing degradation level
                    const index = newConfiguration.degradationLevels.findIndex(d => d.id === id);

                    if(index !== -1){
                        // should always find the level, but just to be sure

                        newConfiguration.degradationLevels[index].label = label;
                        newConfiguration.degradationLevels[index].dependencySets = dependencySets;
                        newConfiguration.degradationLevels[index].states = states.slice();
                    }

                    //#region LevelChange updates

                    // update the stateChanges(degradation and upgrade) because the states might be changed                 
                    for(let degradationIndex = 0; degradationIndex < newConfiguration.degradations.length; degradationIndex++){

                        // Update the stateChanges of the current LevelChange (Degradation) - remove the stateChanges that rely on not exitsing states (they have to be set again anyway)
                        newConfiguration.degradations[degradationIndex].stateChanges = newConfiguration.degradations[degradationIndex].stateChanges.filter(sc => {
                            const startStateIndex = idsOfStatesToDelete.findIndex(id => id === sc.startStateId);
                            const resultStateIndex = idsOfStatesToDelete.findIndex(id => id === sc.resultStateId);

                            if(startStateIndex !== -1 || resultStateIndex !== -1){
                                return false;
                            }else{
                                return true;
                            }
                        });
                    }

                    for(let upgradeIndex = 0; upgradeIndex < newConfiguration.upgrades.length; upgradeIndex++){

                        // Update the stateChanges of the current LevelChange (Upgrade) - remove the stateChanges that rely on not exitsing states (they have to be set again anyway)
                        newConfiguration.upgrades[upgradeIndex].stateChanges = newConfiguration.upgrades[upgradeIndex].stateChanges.filter(sc => {
                            const startStateIndex = idsOfStatesToDelete.findIndex(id => id === sc.startStateId);
                            const resultStateIndex = idsOfStatesToDelete.findIndex(id => id === sc.resultStateId);

                            if(startStateIndex !== -1 || resultStateIndex !== -1){
                                return false;
                            }else{
                                return true;
                            }
                        });
                    }

                    //#endregion
                }
            }

            resetState();
            updateConfiguration(newConfiguration);
            onClose();
        }
    };

    //#endregion

    //#region Validation
    const isValid = (): boolean => {
        let isValid = true;
        const newErrorMessages :string[] = [];

        if(type === DegradationLevelDialogType.Create){
            // Validate if id already exists?

            const index = configuration.degradationLevels.findIndex(d => d.id === id);
            if(index !== -1){
                isValid = false;
                newErrorMessages.push("The id '"+id+"' is already used by another Degradation Level");
            }
        }

        if(type === DegradationLevelDialogType.Edit){
            // If id has changed it can happen that the id is already used by another DegradationLevel
            if(id !== initalDegradationLevel.id){
                const index = configuration.degradationLevels.findIndex(d => d.id === id);
                if(index !== -1){
                    isValid = false;
                    newErrorMessages.push("The id '"+id+"' is already used by another Degradation Level");
                }
            }
        }

        if(id === 0){
            isValid = false;
            newErrorMessages.push("The id '0' is reserved for the OFF Level");
        }

        setErrorMessages(newErrorMessages);

        return isValid
    };

    //#endregion

    //#region change handlers

    const handleDependecySetChange = (currentDependencySets: IDegradationLevelDependencySet[]) => {
        setDependencySets(currentDependencySets);
    };

    const handleStateChange = (newStates: IDegradationLevelState[]) => {
        setStates(newStates);
    }

    //#endregion

    //#region Cancel confirmation dialog

    const handleCancel = () => {
        setOpenConfirmationDialog(true);
    }

    const handleCancelConfirmationDialogAccept = () => {
        setOpenConfirmationDialog(false);
        handleClose();
    };

    const handleCancelConfirmationDialogCancel = () => {
        setOpenConfirmationDialog(false);
    };
    
    //#endregion

    //#region Title generation
    const getTitle = () => {
        let title = "";

        if(type === DegradationLevelDialogType.Create){
            title = "Create";
        }else{
            title = "Edit";

            if(label !== ""){

                if(label.length > 20){
                    title = title + " - " + label.substring(0,17)+"...";
                }else{
                    title = title + " - " + label;
                }
                
            }
        }

        return title;
    }

    //#endregion
    
    return (
        <Dialog
            fullScreen={true}
            open={open}
            onClose={handleCancel}
            TransitionComponent={Transition}
            >
                <AppBar position="fixed">
                    <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCancel}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {getTitle()}
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleSave}>
                        <SaveIcon />
                    </IconButton>

                    </Toolbar>
                </AppBar>
                <div className={classes.appBarSpacer}></div>
                {errorMessages.length > 0?
                    <div id="degradation-level-dialog-error-container">
                        {errorMessages.map(e => {
                                return (
                                    <div className="degradation-level-dialog-error-container-item" key={e}>
                                        <Alert severity="error">
                                            {e}
                                        </Alert>
                                    </div>
                                );
                            }
                        )}
                    </div>
                    : 
                    null
                }
                <div id="degradation-level-dialog-properties-container">
                    <h3 className="degradation-level-dialog-properties-section-caption">Details</h3>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Id"
                            type="number"
                            variant="outlined"
                            value={id}
                            onChange={(ev) => {setId(+(ev.target.value));}}
                            InputLabelProps={{ shrink: true }}
                            /> 
                    </FormControl> 
                    <FormControl className={classes.formControl}>
                        <TextField
                            value={label}
                            onChange={(ev) => {setLabel(ev.target.value);}}
                            variant="outlined"
                            label="Label"/> 
                    </FormControl> 
                </div>
                <Divider className="degradation-level-dialog-properties-divider"/>
                <div id="degradation-level-dialog-dependency-container">
                    <h3 className="degradation-level-dialog-properties-section-caption">Shadowmode dependencies</h3>
                    
                        <DegradationLevelDependencySetInput 
                            dependencySets={dependencySets}
                            subcomponents={configuration.subcomponents}
                            onChange={handleDependecySetChange}
                        /> 
                </div>
                <Divider className="degradation-level-dialog-properties-divider"/>
                <div id="degradation-level-dialog-states-container">
                    <h3 className="degradation-level-dialog-properties-section-caption">Internal states</h3>
                    <ChipInput
                        chips={states.slice()}
                        label="States"
                        onChange={handleStateChange}
                    />
                </div>
                
                <DecisionDialog
                    open={openConfirmationDialog}
                    title={"Discard changes?"}
                    text={"All changes will be discarded!"}
                    onCancelClick={handleCancelConfirmationDialogCancel}
                    onConfirmClick={handleCancelConfirmationDialogAccept}
                />
        </Dialog>
    );
}

export default DegradationLevelDialog;