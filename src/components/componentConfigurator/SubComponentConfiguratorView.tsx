import React from 'react';
import Button from '@material-ui/core/Button';

// Local imports

import IConfiguration from '../../interfaces/IConfiguration';
import './SubComponentConfiguratorView.css';
import { SubComponentTable } from './SubComponentTable';
import { AvailableViews } from '../AvailableViews';
import { ViewProps } from '../wizard/Wizard';
import { SubComponentDialog , SubComponentDialogType, SubComponentDialogProps} from './SubComponentDialog';
import ISubcomponent from '../../interfaces/ISubcomponent';
import { DecisionDialog } from '../decisionDialog/DecisionDialog';

export interface SubComponentConfigurationViewProps extends ViewProps{
    configuration: IConfiguration;
}

interface DialogState{
    isOpen: boolean;
    subcomponentToEdit: ISubcomponent;
}

interface DeleteDialogState{
    isOpen: boolean;
    subComponentsToDelete: ISubcomponent[];
    resetSelection: () => void;
}
/**
 * View for the configuration of subcomponents 
 */
 export function SubComponentConfiguratorView (props: SubComponentConfigurationViewProps) {

    const emptySubComponent : ISubcomponent = {id:"", name:"", shadowmodes: []};

    const {configuration, showView, handleConfigurationUpdate} = props;

    // Edit Dialog
    const [editDialogState, setEditDialogState] = React.useState<DialogState>({ isOpen:false, subcomponentToEdit: emptySubComponent});

    const handleSubComponentChangedInEditDialog = (subcomponent: ISubcomponent) => {
        setEditDialogState({isOpen: editDialogState.isOpen, subcomponentToEdit: subcomponent});
    }

    const handleClickOpenEditDialog = (subcomponent: ISubcomponent) => {
        setEditDialogState({isOpen:true, subcomponentToEdit: subcomponent});
    };

    const handleCloseEditDialog = () => {
        console.log("Abort subcomponent: ", editDialogState.subcomponentToEdit);
        setEditDialogState({isOpen:false, subcomponentToEdit: emptySubComponent});
    };

    const handleSaveCloseEditDialog = () => {
        const newConfiguration: IConfiguration = JSON.parse(JSON.stringify(configuration));  

        // This index has to exists because the user cant edit an id
        const index = newConfiguration.subcomponents.findIndex(subcomponent => subcomponent.id === editDialogState.subcomponentToEdit.id);
        
        newConfiguration.subcomponents[index] = editDialogState.subcomponentToEdit;
        handleConfigurationUpdate(newConfiguration);

        setEditDialogState({isOpen:false, subcomponentToEdit: emptySubComponent});
    };

    // Open Dialog
    const [createDialogState, setCreateDialogState] = React.useState<DialogState>({ isOpen:false, subcomponentToEdit: emptySubComponent});

    const handleClickOpenCreateDialog = () => {
        setCreateDialogState({isOpen: true, subcomponentToEdit: emptySubComponent});
    };

    const handleSubComponentChangedInCreateDialog = (subcomponent: ISubcomponent) => {
        setCreateDialogState({isOpen: createDialogState.isOpen, subcomponentToEdit: subcomponent});
    }

    const handleCloseCreateDialog = () => {
        setCreateDialogState({isOpen: false, subcomponentToEdit: emptySubComponent});
    };

    const handleSaveCloseCreateDialog = () => {
        
        const newConfiguration: IConfiguration = JSON.parse(JSON.stringify(configuration));  

        const index = newConfiguration.subcomponents.findIndex(subcomponent => subcomponent.id === createDialogState.subcomponentToEdit.id);
        
        if(index === -1){
            newConfiguration.subcomponents.push(createDialogState.subcomponentToEdit);
            handleConfigurationUpdate(newConfiguration);
            setCreateDialogState({isOpen: false, subcomponentToEdit: emptySubComponent});
        }else{
            //TODO: SHOW ERROR THAT ID ALREADY EXISTS
        }
    };

    // Delete Dialog
    const [deleteDialogState, setDeleteDialogState] = React.useState<DeleteDialogState>({isOpen: false, subComponentsToDelete:[], resetSelection: () => {}});

    const handleDeleteSubComponents = (subComponentsToDelete: ISubcomponent[], resetSelection: () => void) => {
        setDeleteDialogState({isOpen: true, subComponentsToDelete: subComponentsToDelete, resetSelection: resetSelection});
    };

    const handleDeleteAccepted = () => {
        const newConfiguration: IConfiguration = JSON.parse(JSON.stringify(configuration));  

        for(let subComponentToDelete of deleteDialogState.subComponentsToDelete){
            newConfiguration.subcomponents = newConfiguration.subcomponents.filter(subcomponent => subcomponent.id !== subComponentToDelete.id);
        }
       
        deleteDialogState.resetSelection();
        setDeleteDialogState({isOpen: false, subComponentsToDelete:[], resetSelection: () => {}});
        handleConfigurationUpdate(newConfiguration);
    }

    const handleDeleteAborted = () => {
        setDeleteDialogState({isOpen: false, subComponentsToDelete:[], resetSelection: () => {}});
    }

    return (
        <div>
            <h1>Subcomponents and shadowmodes</h1>

            <div className="component-configurator-container">
                    <SubComponentTable
                        subcomponents={configuration.subcomponents}
                        handleCreateSubComponent={handleClickOpenCreateDialog}
                        handleDeleteSubComponents={handleDeleteSubComponents}
                        handleEditSubComponent={handleClickOpenEditDialog}
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
                subcomponent={editDialogState.subcomponentToEdit}
                onSubComponentChange={handleSubComponentChangedInEditDialog}
                onAbort={handleCloseEditDialog}
                onSaveClose={handleSaveCloseEditDialog}
            />
            <SubComponentDialog
                type={SubComponentDialogType.Create}
                open={createDialogState.isOpen}
                subcomponent={createDialogState.subcomponentToEdit}
                onSubComponentChange={handleSubComponentChangedInCreateDialog}
                onAbort={handleCloseCreateDialog}
                onSaveClose={handleSaveCloseCreateDialog}
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