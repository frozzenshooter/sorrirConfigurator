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

export interface SubComponentConfigurationViewProps extends ViewProps{
    configuration: IConfiguration;
}

interface EditDialogState{
    isOpen: boolean;
    subcomponentToEdit: ISubcomponent;
}

/**
 * View for the configuration of subcomponents 
 */
 export function SubComponentConfiguratorView (props: SubComponentConfigurationViewProps) {

    /**
     * IDEA: THE DIALOG NEEDS A HANDLER THAT WILL UPDATE A STATE HERE: you have a subcomponentToEdit as state
     *   
     * the dialog gets a handler via his props -> whenever sth is edited the handler will be called and update the state to edit
     * 
     * on close the state will be taken and handleConfigurationUpdate will be triggered to update the global configuration
     * 
     *  The state of the values in the dialog will be removed and only the props will be set
     */

    const emptySubComponent:ISubcomponent = {id:"", name:"", shadowmodes: []};

    const {configuration, showView, handleConfigurationUpdate} = props;

    //const [openEditDialog, setOpenEditDialog] = React.useState(false);
    //const [subComponentToEdit, setSubComponentToEdit] = React.useState<ISubcomponent>(emptySubComponent);

    const [editDialogState, setEditDialogState] = React.useState<EditDialogState>({ isOpen:false, subcomponentToEdit: emptySubComponent});

    const handleSubComponentChange = (subcomponent: ISubcomponent) => {
        setEditDialogState({isOpen: editDialogState.isOpen, subcomponentToEdit: subcomponent});
    }

    const handleClickOpenEditDialog = (subcomponent: ISubcomponent) => {
        console.log("Open EditDialog with: ", subcomponent);
        //setSubComponentToEdit(subcomponent);
        //setOpenEditDialog(true);

        setEditDialogState({isOpen:true, subcomponentToEdit: subcomponent});
    };

    const handleCloseEditDialog = () => {
        //setOpenEditDialog(false);        
        //setSubComponentToEdit(emptySubComponent);

        
        setEditDialogState({isOpen:false, subcomponentToEdit: emptySubComponent});
    };

    const handleSaveCloseEditDialog = (subcomponent: ISubcomponent) => {

        //handleConfigurationUpdate
        //setOpenEditDialog(false);
        //setSubComponentToEdit(emptySubComponent);
        console.log("Save subcomponent: ",subcomponent);
        setEditDialogState({isOpen:false, subcomponentToEdit: emptySubComponent});
    };

    const [openCreateDialog, setOpenCreateDialog] = React.useState(false);

    const handleClickOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
    };

    const handleSaveCloseCreateDialog = (subcomponent: ISubcomponent) => {
        
        //handleConfigurationUpdate
        setOpenCreateDialog(false);
    };

    const handleDeleteSubComponents = (subComponentsToDelete: ISubcomponent[]) => {
        console.log("Deletion", subComponentsToDelete);
    };

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
                onSubComponentChange={handleSubComponentChange}
                onAbort={handleCloseEditDialog}
                onSaveClose={handleSaveCloseEditDialog}
            />
            <SubComponentDialog
                type={SubComponentDialogType.Create}
                open={openCreateDialog}
                subcomponent={emptySubComponent}
                onSubComponentChange={handleSubComponentChange}
                onAbort={handleCloseCreateDialog}
                onSaveClose={handleSaveCloseCreateDialog}
            />
           
        </div>
    );
    
 }