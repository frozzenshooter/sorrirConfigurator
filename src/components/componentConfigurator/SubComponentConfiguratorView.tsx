import React from 'react';
import Button from '@material-ui/core/Button';

// Local imports

import IConfiguration from '../../interfaces/IConfiguration';
import './SubComponentConfiguratorView.css';
import IShadowmode from '../../interfaces/IShadowmode';
import { SubComponentTable } from './SubComponentTable';
import { AvailableViews } from '../AvailableViews';
import { ViewProps } from '../wizard/Wizard';
import { SubComponentDialog , SubComponentDialogType, SubComponentDialogProps} from './SubComponentDialog';
import ISubcomponent from '../../interfaces/ISubcomponent';

export interface SubComponentConfigurationViewProps extends ViewProps{
    configuration: IConfiguration;
}

/**
 * View for the configuration of subcomponents 
 */
 export function SubComponentConfiguratorView (props: SubComponentConfigurationViewProps) {

    const {configuration, showView, handleConfigurationUpdate} = props;

    const [openEditDialog, setOpenEditDialog] = React.useState(false);

    const handleClickOpenEditDialog = () => {
        setOpenEditDialog(true);
        //handleConfigurationUpdate
    };
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        //handleConfigurationUpdate
    };

    return (
        <div>
            <h1>Subcomponents and shadowmodes</h1>

            <div className="component-configurator-container">
                    <SubComponentTable
                        subcomponents={configuration.subcomponents}
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

            <Button variant="outlined" color="primary" onClick={handleClickOpenEditDialog}>
                Open dialog
            </Button>
            <SubComponentDialog
                type={SubComponentDialogType.Edit}
                open={openEditDialog}
                subcomponent={configuration.subcomponents[0]}
                onAbort={() => {console.log("OnAbort called"); setOpenEditDialog(false);}}
                onSaveClose={(subcomponent: ISubcomponent) => {console.log("OnSaveClose called", subcomponent); setOpenEditDialog(false);}}
            />
           
        </div>
    );
    
 }