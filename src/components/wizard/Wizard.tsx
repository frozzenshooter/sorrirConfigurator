import React from 'react';
import IConfiguration from '../../interfaces/IConfiguration';
import { AvailableViews, getDevelopmentInitalConfiguration, getInitalConfiguration, getInitalDevelopmentConfiguration, GetNewConfigurationViews } from '../AvailableViews';
import { SubComponentConfiguratorView } from '../componentConfigurator/SubComponentConfiguratorView';
import { ConfigurationExportView } from '../configurationExport/ConfigurationExportView';
import { ConfigurationImportView } from '../configurationImport/ConfigurationImportView';
import { DegradationConfigurationView } from '../degradationConfiguration/DegradationConfigurationView';
import { WelcomeView } from '../welcome/WelcomeView';
import './Wizard.css'

/**
 * Properties of a View
 */
export interface ViewProps {
    showView: (availableView: AvailableViews) => void;
    handleConfigurationUpdate: (configuration: IConfiguration) => void;
}

/**
 * Properties ofa view that wants to display a stepper
 */
export interface StepperViewProps extends ViewProps {
    views: AvailableViews[]
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

    const [wizardState, setWizardState] = React.useState<WizardState>(getDevelopmentInitalConfiguration());

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
        console.log(configuration);
        const newState: WizardState = JSON.parse(JSON.stringify(wizardState));
        newState.configuration = configuration;
        console.log(newState);
        setWizardState(newState);  
    }

    /**
     * Handle the update of the views the wizard will use (This will reset previous configurations!)
     * 
     * @param views 
     */
    const startWizard = (views: AvailableViews[]) => {
        const newState: WizardState = JSON.parse(JSON.stringify(wizardState));
        //TODO: replace with getInitalConfiguration when its not in development anymore
        
        // This resets the configuration from previous configurations
        newState.configuration = getInitalDevelopmentConfiguration();
        newState.views = views;
        newState.activeView = views[0];
        setWizardState(newState);  
    }

    const getView = (availableView: AvailableViews): JSX.Element => {
        
        switch(availableView){
            case AvailableViews.WelcomeView:
                return <WelcomeView startWizard={startWizard} showView={showView} handleConfigurationUpdate={handleConfigurationUpdate}/>
            case AvailableViews.ComponentConfigurationView:
                return <SubComponentConfiguratorView showView={showView} views={wizardState.views} configuration={wizardState.configuration} handleConfigurationUpdate={handleConfigurationUpdate}/>
            case AvailableViews.ConfigurationImportView:
                return <ConfigurationImportView showView={showView} views={wizardState.views} handleConfigurationUpdate={handleConfigurationUpdate}/>
            case AvailableViews.ConfigurationExportView:
                return <ConfigurationExportView showView={showView} views={wizardState.views} configuration={wizardState.configuration} handleConfigurationUpdate={handleConfigurationUpdate}/>
            case AvailableViews.DegradationConfigurationView:
                return <DegradationConfigurationView showView={showView} views={wizardState.views} handleConfigurationUpdate={handleConfigurationUpdate}/>;
            default:
                return <WelcomeView startWizard={startWizard} showView={showView} handleConfigurationUpdate={handleConfigurationUpdate}/>;

        }
    }

    return  (
        <div id="wizard-container">     
            {getView(wizardState.activeView)}
        </div>
    ); 
}