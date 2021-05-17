import React from 'react';
import IConfiguration from '../../interfaces/IConfiguration';
import { AvailableViews, getDevelopmentInitalConfiguration, getInitalConfiguration, getInitalDevelopmentConfiguration, GetNewConfigurationViews } from '../AvailableViews';
import { SubComponentConfiguratorView } from '../subComponentConfigurator/SubComponentConfiguratorView';
import { ConfigurationExportView } from '../configurationExport/ConfigurationExportView';
import { ConfigurationImportView } from '../configurationImport/ConfigurationImportView';
import { DegradationConfigurationView } from '../degradationConfiguration/DegradationConfigurationView';
import { WelcomeView } from '../welcome/WelcomeView';
import './Wizard.css'

/**
 * Properties of a simple view
 */
export interface IViewProps {
    showView: (availableView: AvailableViews) => void;
    handleConfigurationUpdate: (configuration: IConfiguration) => void;
}

/**
 * Properties of a view that wants to display a stepper
 */
export interface IStepperViewProps extends IViewProps {
    views: AvailableViews[]
}

/**
 * State of the @Wizard
 */
export interface IWizardState{
    activeView: AvailableViews;
    views: AvailableViews[];
    configuration: IConfiguration;
}


/**
 * Wizard to navigate through views
 */
export const Wizard = () => {

    const [wizardState, setWizardState] = React.useState<IWizardState>(getDevelopmentInitalConfiguration());

    /**
     * Show a selected view
     */
    const showView = (view: AvailableViews) => {
        const newState: IWizardState = JSON.parse(JSON.stringify(wizardState));
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
        const newState: IWizardState = JSON.parse(JSON.stringify(wizardState));
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
        const newState: IWizardState = JSON.parse(JSON.stringify(wizardState));
        //TODO: replace with getInitalConfiguration when its not in development anymore
        
        // This resets the configuration from previous configurations
        newState.configuration = getInitalDevelopmentConfiguration();
        newState.views = views;
        newState.activeView = views[0];
        setWizardState(newState);  
    }

    /**
     * Resolves the view to display
     * 
     * @param availableView 
     * @returns 
     */
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
                return <DegradationConfigurationView showView={showView} views={wizardState.views} configuration={wizardState.configuration} handleConfigurationUpdate={handleConfigurationUpdate}/>;
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