import { Button } from '@material-ui/core';
import {Component} from 'react';
import { AvailableViews } from '../AvailableViews';
import {ViewProps} from '../wizard/Wizard';

/**
 * Welcome page for the application
 */
 export class WelcomeView extends Component<ViewProps,{}> {

    render() {
        return (
            <div>
                <h1>Start the configuration of a component</h1>
                <Button variant="contained" color="primary" onClick={() => this.props.showView(AvailableViews.ComponentConfigurationView)}>
                    New Configuration
                </Button> <br/>
                <Button variant="contained" color="primary" onClick={() => this.props.showView(AvailableViews.ConfigurationImportView)}>
                    Load an existing configuration
                </Button>
            </div>
        );
    }
 }