import { Button } from '@material-ui/core';
import {Component} from 'react';
import { AvailableViews } from '../AvailableViews';
import { ViewProps } from '../wizard/Wizard';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

// Local imports

import IConfiguration from '../../interfaces/IConfiguration';
import './ComponentConfiguratorView.css';
import { ChipCreator } from '../chipCreator/ChipCreator';
import IShadowmode from '../../interfaces/IShadowmode';


export interface ComponentConfigurationViewProps extends ViewProps{
    configuration: IConfiguration;
}

/**
 * View for the configuration of subcomponents 
 */
 export class ComponentConfiguratorView extends Component<ComponentConfigurationViewProps,{}> {

    constructor(props:ComponentConfigurationViewProps){
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
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Subcomponent</TableCell>
                                <TableCell align="left">Shadowmodes</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>                            
                            {this.props.configuration.subcomponents.map((subcomponent)=> {

                                return (
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            {subcomponent.name}
                                        </TableCell>
                                        <TableCell padding="default">
                                            <ul className="component-configurator-shadowmode-list">
                                            {subcomponent.shadowmodes.map((shadowmode)=> {

                                                    return (
                                                    <li key={shadowmode.id} className="component-configurator-shadowmode-list-item">
                                                        <Chip label={shadowmode.name} />
                                                    </li>);
                                                })
                                            }
                                            </ul>
                                        </TableCell>
                                    </TableRow>

                                );
                            })}
                            <TableRow>
                                <TableCell padding="checkbox">
                                    Input
                                </TableCell>
                                <TableCell padding="default">
                                    <ChipCreator
                                        handleChipCreation = {(subcomponentId: string, shadowmodeToCreate: IShadowmode) => {this.handleChipCreation(subcomponentId, shadowmodeToCreate);}}
                                        handleChipDeletion = {(subcomponentId: string, shadowmodeToDelete: IShadowmode) => {this.handleChipDeletion(subcomponentId, shadowmodeToDelete);}}
                                        shadowmodes={this.props.configuration.subcomponents[0].shadowmodes}
                                    ></ChipCreator>
                                </TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
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