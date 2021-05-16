import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

// Local imports

import IConfiguration from '../../interfaces/IConfiguration';
import './SubComponentConfiguratorView.css';
import { SubComponentTable } from './SubComponentTable';
import { AvailableViews, ResolveViewLabel } from '../AvailableViews';
import { StepperViewProps, ViewProps } from '../wizard/Wizard';
import { SubComponentDialog , SubComponentDialogType} from './SubComponentDialog';
import ISubComponent from '../../interfaces/ISubComponent';
import { DecisionDialog } from '../decisionDialog/DecisionDialog';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        grow: {
        flexGrow: 1,
        },
        title: {
            display: 'block'
        },
        appBarSpacer: theme.mixins.toolbar
    })
);

export interface SubComponentConfigurationViewProps extends StepperViewProps{
    configuration: IConfiguration;
}

interface DialogState{
    isOpen: boolean;
    error: string;
    subcomponentToEdit: ISubComponent;
}

interface DeleteDialogState{
    isOpen: boolean;
    subComponentsToDelete: ISubComponent[];
    resetSelection: () => void;
}

interface ShadowModeGranularityChangeState {
    isOpen: boolean;
}

/**
 * View for the configuration of subcomponents 
 */
 export function SubComponentConfiguratorView (props: SubComponentConfigurationViewProps) {

    const emptySubComponent : ISubComponent = {id:"", name:"", shadowmodes: []};

    const {configuration, showView, handleConfigurationUpdate, views} = props;

    const classes = useStyles();

    // Edit Dialog
    const [editDialogState, setEditDialogState] = React.useState<DialogState>({ isOpen:false, error:"", subcomponentToEdit: emptySubComponent});

    const handleSubComponentChangedInEditDialog = (subcomponent: ISubComponent) => {
        setEditDialogState({isOpen: editDialogState.isOpen, error: "", subcomponentToEdit: subcomponent});
    }

    const handleClickOpenEditDialog = (subcomponent: ISubComponent) => {
        setEditDialogState({isOpen:true, error: "", subcomponentToEdit: subcomponent});
    };

    const handleCloseEditDialog = () => {
        console.log("Abort subcomponent: ", editDialogState.subcomponentToEdit);
        setEditDialogState({isOpen:false, error: "", subcomponentToEdit: emptySubComponent});
    };

    const handleSaveCloseEditDialog = () => {
        const newConfiguration: IConfiguration = JSON.parse(JSON.stringify(configuration));  

        // This index has to exists because the user cant edit an id
        const index = newConfiguration.subComponents.findIndex(subcomponent => subcomponent.id === editDialogState.subcomponentToEdit.id);
        
        newConfiguration.subComponents[index] = editDialogState.subcomponentToEdit;
        handleConfigurationUpdate(newConfiguration);

        setEditDialogState({isOpen:false, error: "", subcomponentToEdit: emptySubComponent});
    };

    // Open Dialog
    const [createDialogState, setCreateDialogState] = React.useState<DialogState>({ isOpen:false, error: "", subcomponentToEdit: emptySubComponent});

    const handleClickOpenCreateDialog = () => {
        setCreateDialogState({isOpen: true, error: "", subcomponentToEdit: emptySubComponent});
    };

    const handleSubComponentChangedInCreateDialog = (subcomponent: ISubComponent) => {
        setCreateDialogState({isOpen: createDialogState.isOpen, error: "", subcomponentToEdit: subcomponent});
    }

    const handleCloseCreateDialog = () => {
        setCreateDialogState({isOpen: false, error: "", subcomponentToEdit: emptySubComponent});
    };

    const handleSaveCloseCreateDialog = () => {
        
        if(createDialogState.subcomponentToEdit.id === ""){
            // An id is required to be able to save a subcomponent
            setCreateDialogState({isOpen: true, error: "No ID specified", subcomponentToEdit: createDialogState.subcomponentToEdit});
        }else{
            const newConfiguration: IConfiguration = JSON.parse(JSON.stringify(configuration));  

            const index = newConfiguration.subComponents.findIndex(subcomponent => subcomponent.id === createDialogState.subcomponentToEdit.id);
            
            if(index === -1){
                newConfiguration.subComponents.push(createDialogState.subcomponentToEdit);
                handleConfigurationUpdate(newConfiguration);
                setCreateDialogState({isOpen: false, error: "", subcomponentToEdit: emptySubComponent});
            }else{
                setCreateDialogState({isOpen: true, error: "A subcomponent with this ID already exists", subcomponentToEdit: createDialogState.subcomponentToEdit});
            }
        }
    };

    // Delete Dialog
    const [deleteDialogState, setDeleteDialogState] = React.useState<DeleteDialogState>({isOpen: false, subComponentsToDelete:[], resetSelection: () => {}});

    const handleDeleteSubComponents = (subComponentsToDelete: ISubComponent[], resetSelection: () => void) => {
        setDeleteDialogState({isOpen: true, subComponentsToDelete: subComponentsToDelete, resetSelection: resetSelection});
    };

    const handleDeleteAccepted = () => {
        const newConfiguration: IConfiguration = JSON.parse(JSON.stringify(configuration));  

        for(let subComponentToDelete of deleteDialogState.subComponentsToDelete){
            newConfiguration.subComponents = newConfiguration.subComponents.filter(subcomponent => subcomponent.id !== subComponentToDelete.id);
        }
       
        deleteDialogState.resetSelection();
        setDeleteDialogState({isOpen: false, subComponentsToDelete:[], resetSelection: () => {}});
        handleConfigurationUpdate(newConfiguration);
    }

    const handleDeleteAborted = () => {
        setDeleteDialogState({isOpen: false, subComponentsToDelete:[], resetSelection: () => {}});
    }


    // ShadowModeGranularity
    const handleShadowModeGranularityChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const newConfiguration: IConfiguration = JSON.parse(JSON.stringify(configuration));  
        newConfiguration.isShadowModeGranularityFine = checked;

        handleConfigurationUpdate(newConfiguration);
    }

    const handleStep = (index: number) => {
        showView(views[index]);
    }

    return (
        <div>
            <div className={classes.grow}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Configuration import
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div className={classes.appBarSpacer}></div>
            <div className="component-configurator-stepper-container">
                <Stepper nonLinear activeStep={views.findIndex(v => v === AvailableViews.ComponentConfigurationView)}>
                        {views.map((view, index) => (
                            <Step key={ResolveViewLabel(view)}>
                                <StepButton onClick={() => {handleStep(index);}}>
                                    {ResolveViewLabel(view)}
                                </StepButton>
                            </Step>
                        ))}
                </Stepper>
            </div>

            <div className="component-configurator-container">
                    <SubComponentTable
                        subcomponents={configuration.subComponents}
                        handleCreateSubComponent={handleClickOpenCreateDialog}
                        handleDeleteSubComponents={handleDeleteSubComponents}
                        handleEditSubComponent={handleClickOpenEditDialog}
                    />
            </div>
            <div className="component-configurator-button-container">
                <FormControlLabel
                    label={"Shadowmode Granularity: " + (configuration.isShadowModeGranularityFine ? "Fine" : "Normal")}
                    control={        
                        <Switch
                            checked={configuration.isShadowModeGranularityFine}
                            onChange={handleShadowModeGranularityChange}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                />
            </div>
            <div className="component-configurator-button-container">
                <Button variant="contained" color="primary" onClick={() => showView(AvailableViews.WelcomeView)}>
                    Go back
                </Button>
                <Button variant="contained" color="primary" onClick={() => showView(AvailableViews.ConfigurationExportView)}>
                    Export
                </Button>
            </div>

            <SubComponentDialog
                type={SubComponentDialogType.Edit}
                open={editDialogState.isOpen}
                subComponent={editDialogState.subcomponentToEdit}
                error={editDialogState.error}
                onSubComponentChange={handleSubComponentChangedInEditDialog}
                onAbort={handleCloseEditDialog}
                onSaveClose={handleSaveCloseEditDialog}
            />
            <SubComponentDialog
                type={SubComponentDialogType.Create}
                open={createDialogState.isOpen}
                subComponent={createDialogState.subcomponentToEdit}
                onSubComponentChange={handleSubComponentChangedInCreateDialog}
                onAbort={handleCloseCreateDialog}
                onSaveClose={handleSaveCloseCreateDialog}
                error={createDialogState.error}
            />
            <DecisionDialog 
                title={"Delete "+ deleteDialogState.subComponentsToDelete.length + " items"}
                isOpen={deleteDialogState.isOpen}
                text="The selected items will be irreversibly deleted."
                handleAccept={handleDeleteAccepted}
                handleCancel={handleDeleteAborted}            
            />
        </div>
    );
    
 }