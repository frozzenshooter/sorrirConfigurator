import {Component} from 'react';
import IConfiguration from '../../interfaces/IConfiguration';
import { AvailableViews } from '../AvailableViews';
import { ComponentConfiguratorView } from '../componentConfigurator/ComponentConfiguratorView';
import { ConfigurationExportView } from '../configurationExport/ConfigurationExportView';
import { ConfigurationImportView } from '../configurationImport/ConfigurationImportView';
import { WelcomeView } from '../welcome/WelcomeView';

/**
 * Properties of a View
 */
export interface ViewProps {
    showView: (availableView: AvailableViews) => void;
 }

/**
 * State of the Wizard
 */
export interface WizardState{
    activeView: AvailableViews;
    configuration: IConfiguration;
}


/**
 * Wizard to navigate through Views forward and backwards 
 */
export class Wizard extends Component<{},{}>{

    state: WizardState;

    constructor(props: {}){ 
        super(props);    

        this.state  = {
            activeView: AvailableViews.WelcomeView,
            configuration: {subcomponents: []}          
        };
    }

    /**
     * Show a selected view
     */
    private showView(view: AvailableViews){
        this.setState({
            activeView: view
        });        
    }

    private GetView(availableView: AvailableViews): JSX.Element{
        switch(this.state.activeView){
            case AvailableViews.WelcomeView:
                return <WelcomeView showView={(availableView) => {this.showView(availableView);}} />
            case AvailableViews.ComponentConfigurationView:
                return <ComponentConfiguratorView showView={(availableView) => {this.showView(availableView);}} configuration={this.state.configuration}/>
            case AvailableViews.ConfigurationImportView:
                return <ConfigurationImportView showView={(availableView) => {this.showView(availableView);}} />
            case AvailableViews.ConfigurationExportView:
                return <ConfigurationExportView showView={(availableView) => {this.showView(availableView);}} />
            default:
                return <WelcomeView showView={(availableView) => {this.showView(availableView);}} />;

        };
    }

    render() {
        return  (
            <div>     
                {this.GetView(this.state.activeView)}
            </div>
        ); 
    }
}