import React from 'react';
import {Component} from 'react';
import IConfiguration from '../../interfaces/IConfiguration';
import { AvailableViews, GetNewConfigurationViews } from '../AvailableViews';
import { SubComponentConfiguratorView } from '../componentConfigurator/SubComponentConfiguratorView';
import { ConfigurationExportView } from '../configurationExport/ConfigurationExportView';
import { ConfigurationImportView } from '../configurationImport/ConfigurationImportView';
import { WelcomeView } from '../welcome/WelcomeView';

/**
 * Properties of a View
 */
export interface ViewProps {
    showView: (availableView: AvailableViews) => void;
    handleConfigurationUpdate: (configuration: IConfiguration) => void;
}

/**
 * State of the Wizard
 */
export interface WizardState{
    activeView: AvailableViews;
    views: AvailableViews[];
    configuration: IConfiguration;
}


/**
 * Wizard to navigate through Views
 */
export const Wizard = () => {

    const [wizardState, setWizardState] = React.useState<WizardState>(
        {
            activeView: AvailableViews.WelcomeView,
            views: GetNewConfigurationViews(),
            configuration: {
                isShadowModeGranularityFine: false,
                subComponents: [
                {
                    id: "Subcomponent1",
                    name: "Subcomponent1",
                    shadowmodes: [
                        {
                            id: "1",
                            name:"ON"

                        },
                        {
                            id: "2",
                            name: "OFF"
                        },
                        {
                            id: "3",
                            name: "DC"
                        }
                    ]
                },
                {
                    id: "Subcomponent2",
                    name: "Subcomponent2",
                    shadowmodes: [
                        {
                            id: "1",
                            name:"ON"

                        },
                        {
                            id: "2",
                            name: "OFF"
                        }
                    ]
                },
                {
                    id: "Subcomponent3",
                    name: "Subcomponent3",
                    shadowmodes: [
                        {
                            id: "1",
                            name:"ON"

                        },
                        {
                            id: "2",
                            name: "OFF"
                        },
                        {
                            id: "3",
                            name: "DC"
                        }
                    ]
                },
                {
                    id: "Subcomponent4",
                    name: "Subcomponent4",
                    shadowmodes: [
                        {
                            id: "1",
                            name:"ON"

                        },
                        {
                            id: "2",
                            name: "OFF"
                        }
                    ]
                },
                {
                    id: "Subcomponent5",
                    name: "Subcomponent5",
                    shadowmodes: [
                        {
                            id: "1",
                            name:"ON"

                        },
                        {
                            id: "2",
                            name: "OFF"
                        },
                        {
                            id: "3",
                            name: "DC"
                        }
                    ]
                },
                {
                    id: "Subcomponent6",
                    name: "Subcomponent6",
                    shadowmodes: [
                        {
                            id: "1",
                            name:"ON"

                        },
                        {
                            id: "2",
                            name: "OFF"
                        }
                    ]
                }
            ]}          
        }
    );

    /**
     * Show a selected view
     */
    const showView = (view: AvailableViews) => {
        const newState: WizardState = JSON.parse(JSON.stringify(wizardState));
        newState.activeView = view;
        setWizardState(newState);     
    }

    /**
     * Handle the update of the global configuration
     * 
     * @param configuration 
     */
    const handleConfigurationUpdate = (configuration: IConfiguration) => {
        const newState: WizardState = JSON.parse(JSON.stringify(wizardState));
        newState.configuration = configuration;
        setWizardState(newState);  
    }

    /**
     * Handle the update of the views the wizard will use
     * 
     * @param views 
     */
    const startWizard = (views: AvailableViews[]) => {
        console.log(views);
        const newState: WizardState = JSON.parse(JSON.stringify(wizardState));
        newState.views = views;
        newState.activeView = views[0];
        setWizardState(newState);  
    }

    const getView = (availableView: AvailableViews): JSX.Element => {
        
        switch(availableView){
            case AvailableViews.WelcomeView:
                return <WelcomeView startWizard={startWizard} showView={showView} handleConfigurationUpdate={handleConfigurationUpdate}/>
            case AvailableViews.ComponentConfigurationView:
                return <SubComponentConfiguratorView showView={showView} configuration={wizardState.configuration} handleConfigurationUpdate={handleConfigurationUpdate}/>
            case AvailableViews.ConfigurationImportView:
                return <ConfigurationImportView showView={showView} views={wizardState.views} handleConfigurationUpdate={handleConfigurationUpdate}/>
            case AvailableViews.ConfigurationExportView:
                return <ConfigurationExportView showView={showView} configuration={wizardState.configuration} handleConfigurationUpdate={handleConfigurationUpdate}/>
            default:
                return <WelcomeView startWizard={startWizard} showView={showView} handleConfigurationUpdate={handleConfigurationUpdate}/>;

        }
    }

    return  (
        <div>     
            {getView(wizardState.activeView)}
        </div>
    ); 
}