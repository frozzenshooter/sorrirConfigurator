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
                            <TableRow
                                onClick={(event) => console.log("click")}
                            >
                            <TableCell padding="checkbox">
                               Test
                            </TableCell>
                            <TableCell padding="none">
                                <Chip label={"Test Chip 1"} />
                                <Chip label={"Test Chip 2"} />
                                <Chip label={"Test Chip 3"} />
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