import { Button } from '@material-ui/core';
import {Component} from 'react';
import { AvailableViews } from '../AvailableViews';
import { ViewProps } from '../wizard/Wizard';

// Local imports

import IConfiguration from '../../interfaces/IConfiguration';
import './SubComponentConfiguratorView.css';
import { ChipCreator } from '../chipCreator/ChipCreator';
import IShadowmode from '../../interfaces/IShadowmode';
import { SubComponentTable } from './SubComponentTable';


export interface SubComponentConfigurationViewProps extends ViewProps{
    configuration: IConfiguration;
}

/**
 * View for the configuration of subcomponents 
 */
 export class SubComponentConfiguratorView extends Component<SubComponentConfigurationViewProps,{}> {

    constructor(props:SubComponentConfigurationViewProps){
        super(props); 
    }
      
    private handleChipDeletion(subcomponentId: string, shadowmodeToDelete: IShadowmode){

        const subcomponentIndex = this.props.configuration.subcomponents.findIndex(subcomponent => subcomponent.id === subcomponentId);
        const updatedShadomodes = this.props.configuration.subcomponents[subcomponentIndex].shadowmodes.filter(shadowmode => shadowmode.id !== shadowmodeToDelete.id ).slice();

        this.props.configuration.subcomponents[subcomponentIndex].shadowmodes = updatedShadomodes;

        this.props.handleConfigurationUpdate(this.props.configuration);
    }

    private handleChipCreation(subcomponentId: string, shadowmodeToCreate: IShadowmode){

        const subcomponentIndex = this.props.configuration.subcomponents.findIndex(subcomponent => subcomponent.id === subcomponentId);
        
        const chipExisting = this.props.configuration.subcomponents[subcomponentIndex].shadowmodes.findIndex(shadowmode => shadowmode.id === shadowmodeToCreate.id);

        if(chipExisting === -1){
            this.props.configuration.subcomponents[subcomponentIndex].shadowmodes.push(
                {
                    id: shadowmodeToCreate.id,
                    name: shadowmodeToCreate.name
            });

            this.props.handleConfigurationUpdate(this.props.configuration);
        }else{
            //TODO
            console.log("Chip already existing!");
        }

    }

    render() {

        return (
            <div>
                <h1>Subcomponents and shadowmodes</h1>

                <div className="component-configurator-container">
                        <SubComponentTable
                            subcomponents={this.props.configuration.subcomponents}
                        />
                </div>

                <div className="component-configurator-button-container">
                    <Button variant="contained" color="primary" onClick={() => this.props.showView(AvailableViews.WelcomeView)}>
                        Go back
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => this.props.showView(AvailableViews.ConfigurationExportView)}>
                        Export
                    </Button>
                </div>
            </div>
        );
    }
 }