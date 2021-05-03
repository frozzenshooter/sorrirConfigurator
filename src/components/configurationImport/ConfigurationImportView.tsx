import { Button } from '@material-ui/core';
import {Component} from 'react';
import { AvailableViews } from '../AvailableViews';
import {ViewProps} from '../wizard/Wizard';

/**
 * View for the configuration import
 */
 export class ConfigurationImportView extends Component<ViewProps,{}> {
    render() {
        return (
            <div>
                <h1>Import the configuration</h1>
                <Button variant="contained" color="primary" onClick={() => this.props.showView(AvailableViews.WelcomeView)}>
                    Go back
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.props.showView(AvailableViews.ComponentConfigurationView)}>
                    Create new instead
                </Button>
            </div>
        );
    }
 }