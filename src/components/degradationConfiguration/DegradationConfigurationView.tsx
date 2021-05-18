import React from 'react';
import { IStepperViewProps } from '../wizard/Wizard';
import { DecisionDialog } from '../decisionDialog/DecisionDialog';
import { AvailableViews } from '../AvailableViews';
import Paper from '@material-ui/core/Paper';
import './DegradationConfigurationView.css';
import { DegradationGraph } from './DegradationGraph';
import { DegradationLevelDialog, DegradationLevelDialogType } from './DegradationLevelDialog';
import IConfiguration from '../../interfaces/IConfiguration';
import IDegradationLevel from '../../interfaces/IDegradationLevel';
import { MenuBar } from '../menuBar/MenuBar';
import { WizardStepper } from '../wizardStepper/WizardStepper';

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
                currentView={AvailableViews.DegradationConfigurationView}
                showView={showView}
            />
            <WizardStepper 
                currentView={AvailableViews.DegradationConfigurationView}
                views={views}
                showView={showView}
            />
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
