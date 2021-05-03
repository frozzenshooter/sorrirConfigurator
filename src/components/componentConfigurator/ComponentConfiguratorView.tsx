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

// Local imports

import IConfiguration from '../../interfaces/IConfiguration';
import './ComponentConfiguratorView.css';
import { ChipCreator } from '../chipCreator/ChipCreator';

export interface ComponentConfigurationViewProps extends ViewProps{
    configuration: IConfiguration;
}

export interface ComponentConfiguratorViewState {
    shadowmodes: string[]
}

/**
 * View for the configuration of subcomponents 
 */
 export class ComponentConfiguratorView extends Component<ComponentConfigurationViewProps,{}> {

    state: ComponentConfiguratorViewState;

    constructor(props:ComponentConfigurationViewProps){
        super(props);     
        this.state = {
            shadowmodes:[]
        };   
    }
      
    private handleChipDeletion(shadowmode: string){
        let newShadowmodes = this.state.shadowmodes.filter(e => e !== shadowmode).slice();
        this.setState({shadowmodes: newShadowmodes});
    }

    private handleChipCreation(shadowmode: string){
        let newShadowmodes = this.state.shadowmodes.slice();
        if(newShadowmodes.indexOf(shadowmode) === -1){
            newShadowmodes.push(shadowmode);
            this.setState({shadowmodes: newShadowmodes});
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
                            <TableRow>
                                <TableCell padding="checkbox">
                                Test
                                </TableCell>
                                <TableCell padding="none">
                                    <ChipCreator
                                        handleChipDeletion={(shadowmode: string) => {this.handleChipDeletion(shadowmode);}}
                                        handleChipCreation={(shadowmode: string) => {this.handleChipCreation(shadowmode);}}
                                        shadowmodes={this.state.shadowmodes}
                                    />
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