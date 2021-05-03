import { Button } from '@material-ui/core';
import {Component} from 'react';
import { AvailableViews } from '../AvailableViews';
import {ViewProps} from '../wizard/Wizard';

/**
 * View for the configuration export
 */
 export class ConfigurationExportView extends Component<ViewProps,{}> {
    render() {
        return (
            <div>
                <h1>Export the configuration</h1>
                <Button variant="contained" color="primary" onClick={() => this.props.showView(AvailableViews.ComponentConfigurationView)}>
                    Go back
                </Button><br/>
                <Button variant="contained" color="primary" onClick={() => this.props.showView(AvailableViews.WelcomeView)}>
                    Go back to welcome
                </Button>
            </div>
        );
    }
 }