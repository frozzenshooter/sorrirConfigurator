import {Component} from 'react';
import IConfiguration from '../../interfaces/IConfiguration';
import { AvailableViews } from '../AvailableViews';
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
        };
    }

    /**
     * Show a selected view
     */
    private showView(view: AvailableViews){

        //TODO: does this run into a problem when managing the confguration? - do you need to pass the complete state into it?
        this.setState({
            activeView: view
        });        
    }

    private handleConfigurationUpdate(configuration: IConfiguration){
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.configuration = configuration;
        this.setState(newState);
    }

    private GetView(availableView: AvailableViews): JSX.Element{
        switch(this.state.activeView){
            case AvailableViews.WelcomeView:
                return <WelcomeView showView={(availableView) => {this.showView(availableView);}} handleConfigurationUpdate={(configuration) => {this.handleConfigurationUpdate(configuration);}} />
            case AvailableViews.ComponentConfigurationView:
                return <SubComponentConfiguratorView showView={(availableView) => {this.showView(availableView);}} configuration={this.state.configuration} handleConfigurationUpdate={(configuration) => {this.handleConfigurationUpdate(configuration);}}/>
            case AvailableViews.ConfigurationImportView:
                return <ConfigurationImportView showView={(availableView) => {this.showView(availableView);}} handleConfigurationUpdate={(configuration) => {this.handleConfigurationUpdate(configuration);}}/>
            case AvailableViews.ConfigurationExportView:
                return <ConfigurationExportView showView={(availableView) => {this.showView(availableView);}} configuration={this.state.configuration} handleConfigurationUpdate={(configuration) => {this.handleConfigurationUpdate(configuration);}}/>
            default:
                return <WelcomeView showView={(availableView) => {this.showView(availableView);}} handleConfigurationUpdate={(configuration) => {this.handleConfigurationUpdate(configuration);}}/>;

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