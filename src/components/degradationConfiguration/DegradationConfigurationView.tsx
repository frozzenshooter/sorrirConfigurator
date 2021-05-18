import React from 'react';
import { IStepperViewProps, IViewProps } from '../wizard/Wizard';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { DecisionDialog } from '../decisionDialog/DecisionDialog';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AvailableViews, ResolveViewLabel } from '../AvailableViews';
import Paper from '@material-ui/core/Paper';

// Local imports 

import './DegradationConfigurationView.css';
import { DegradationGraph } from './DegradationGraph';
import { DegradationLevelDialog, DegradationLevelDialogType } from './DegradationLevelDialog';
import IConfiguration from '../../interfaces/IConfiguration';
import IDegradationLevel from '../../interfaces/IDegradationLevel';
import { MenuBar } from '../menuBar/MenuBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        grow: {
            flexGrow: 1,
        }
    })
);

export interface IDegradationConfigurationViewProps extends IStepperViewProps {
    configuration: IConfiguration;
}

interface IDegradationLevelDialogState {
    isOpen: boolean,
    degradationLevel: IDegradationLevel
}

interface IDeleteDialogState {
    isOpen: boolean,
    degradationLevelsToDelete: IDegradationLevel[]
}

/**
 * View for configuration of the degraadation levels 
 *
 */
export const DegradationConfigurationView = (props: IDegradationConfigurationViewProps) => {

    const {showView, handleConfigurationUpdate, views, configuration} = props;

    const classes = useStyles();

    const handleStep = (index: number) => {
        showView(views[index]);
    }


    // Creation of empty objects
    const getEmptyDegradationLevelDialogState = () : IDegradationLevelDialogState => {
        return {isOpen: false, degradationLevel: getEmptyDegradationLevel()}
    }

    const getEmptyDegradationLevel = () : IDegradationLevel => {
        return { id:-1, label:"", dependencies:[] };
    }

    //#region State for DegradationLevelCreateDialog
    const [degradationLevelCreateDialogState, setDegradationLevelCreateDialogState] = React.useState<IDegradationLevelDialogState>(getEmptyDegradationLevelDialogState());

    const handleDegradationLevelCreateDialogCancel = () => {
        setDegradationLevelCreateDialogState({isOpen: false, degradationLevel: getEmptyDegradationLevel()});
    }

    const handleDegradationLevelCreateDialogSave = () => {

        // deep copy
        const newConfiguration = JSON.parse(JSON.stringify(configuration));

        // remove the dc dependencies when saving
        const simplifiedDegradationLevel : IDegradationLevel = {
             id: degradationLevelCreateDialogState.degradationLevel.id, 
             label: degradationLevelCreateDialogState.degradationLevel.label, 
             dependencies: degradationLevelCreateDialogState.degradationLevel.dependencies.filter(d => d.shadowmodeId !== "").slice() 
        };

        newConfiguration.degradationLevels.push(simplifiedDegradationLevel);

        setDegradationLevelCreateDialogState({isOpen: false, degradationLevel: getEmptyDegradationLevel()});

        handleConfigurationUpdate(newConfiguration);
    }

    const handleChangeDegradationLevelCreateDialog = (newDegradationLevel : IDegradationLevel) => {
        setDegradationLevelCreateDialogState({isOpen: true, degradationLevel: newDegradationLevel});
    }

    //#endregion
    
    //#region State for DegradationLevelEditDialog
    const [degradationLevelEditDialogState, setDegradationLevelEditDialogState] = React.useState<IDegradationLevelDialogState>(getEmptyDegradationLevelDialogState());

    const handleDegradationLevelEditDialogCancel = () => {
        setDegradationLevelEditDialogState({isOpen: false, degradationLevel: getEmptyDegradationLevel()});
    }

    const handleDegradationLevelEditDialogSave = () => {

        // deep copy
        const newConfiguration = JSON.parse(JSON.stringify(configuration));

        // remove the dc dependencies when saving
        const simplifiedDegradationLevel : IDegradationLevel = {
             id: degradationLevelCreateDialogState.degradationLevel.id, 
             label: degradationLevelCreateDialogState.degradationLevel.label, 
             dependencies: degradationLevelCreateDialogState.degradationLevel.dependencies.filter(d => d.shadowmodeId !== "").slice() 
        };

        //TODO: THE LEVEL HAS TO BE REPLACED HERE
        newConfiguration.degradationLevels.push(simplifiedDegradationLevel);

        setDegradationLevelEditDialogState({isOpen: false, degradationLevel: getEmptyDegradationLevel()});

        handleConfigurationUpdate(newConfiguration);
    }

    const handleChangeDegradationLevelEditDialog = (newDegradationLevel : IDegradationLevel) => {
        setDegradationLevelEditDialogState({isOpen: true, degradationLevel: newDegradationLevel});
    }

    //#endregion

    //#region State for DeleteDialog
    const [deleteDialogState, setDeleteDialogState] = React.useState<IDeleteDialogState>({isOpen: false, degradationLevelsToDelete:[]});

    const handleDeleteDegradationLevels = (degradationLevelsToDelete: IDegradationLevel[]) => {
        setDeleteDialogState({isOpen: true, degradationLevelsToDelete: degradationLevelsToDelete});
    };

    const handleDeleteAccepted = () => {
        console.log("Delete of levels:", deleteDialogState.degradationLevelsToDelete);
        const newConfiguration: IConfiguration = JSON.parse(JSON.stringify(configuration));  

        /*for(let degradationLevelToDelete of deleteDialogState.degradationLevelsToDelete){
            newConfiguration.degradationLevels = newConfiguration.degradationLevels.filter(d => d.id !== degradationLevelToDelete.id);
        }*/
        newConfiguration.degradationLevels=[];
        //TODO: reset selection

        setDeleteDialogState({isOpen: false, degradationLevelsToDelete:[]});
        handleConfigurationUpdate(newConfiguration);
    }

    const handleDeleteAborted = () => {
        setDeleteDialogState({isOpen: false, degradationLevelsToDelete:[]});
    }
    //#endregion

    //#region Button handling for DegradationGraph 

    const handleCreateDegradationLevel = () => {
        setDegradationLevelCreateDialogState({isOpen: true, degradationLevel: degradationLevelCreateDialogState.degradationLevel});
    }

    const handleEditDegradationLevel = () => {
        //TODO: based on selection insert here the level to edit
        setDegradationLevelEditDialogState({isOpen: true, degradationLevel: degradationLevelEditDialogState.degradationLevel});
    }

    const handleDeleteDegradationLevel = () => {
        //TODO: a list of all selected Levels as parameter required (perhpas another solution required based on the framework for the drag and drop part)
        handleDeleteDegradationLevels([]);
    }

    //#endregion

    return (
        <div id="degradation-configuration-container">            
            <MenuBar 
                availableView={AvailableViews.DegradationConfigurationView}
                showView={showView}
            />
            <div id="degradation-configuration-stepper-container">
                    <Stepper elevation={1} square={false} className={classes.grow} nonLinear activeStep={views.findIndex(v => v === AvailableViews.DegradationConfigurationView)}>
                        {views.map((view, index) => (
                            <Step key={ResolveViewLabel(view)}>
                                <StepButton onClick={() => {handleStep(index);}}>
                                    {ResolveViewLabel(view)}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
            </div>
            <div id="degradation-configuration-flow-graph">
                <Paper id="degradation-configuration-flow-graph-paper">
                    <DegradationGraph 
                        createDegradationLevel={handleCreateDegradationLevel}
                        deleteDegradationLevel={handleDeleteDegradationLevel}
                        editDegradationLevel={handleEditDegradationLevel}
                        />
                </Paper>
            </div>

            <DegradationLevelDialog
                type={DegradationLevelDialogType.Create}
                degradationLevel={degradationLevelCreateDialogState.degradationLevel}
                configuration={configuration}
                isOpen={degradationLevelCreateDialogState.isOpen}
                handleCancel={handleDegradationLevelCreateDialogCancel}
                handleSave={handleDegradationLevelCreateDialogSave}
                onDegradationLevelChange={handleChangeDegradationLevelCreateDialog}
            />

            <DegradationLevelDialog
                type={DegradationLevelDialogType.Edit}
                degradationLevel={degradationLevelEditDialogState.degradationLevel}
                configuration={configuration}
                isOpen={degradationLevelEditDialogState.isOpen}
                handleCancel={handleDegradationLevelEditDialogCancel}
                handleSave={handleDegradationLevelEditDialogSave}
                onDegradationLevelChange={handleChangeDegradationLevelEditDialog}
            />

            <DecisionDialog 
                title={"Delete "+ deleteDialogState.degradationLevelsToDelete.length + " items"}
                isOpen={deleteDialogState.isOpen}
                text="The selected items will be irreversibly deleted."
                handleAccept={handleDeleteAccepted}
                handleCancel={handleDeleteAborted}  
                />

        </div>

    );
 }
