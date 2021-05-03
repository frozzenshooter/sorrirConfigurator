import { Button } from '@material-ui/core';
import {Component} from 'react';
import { AvailableViews } from '../AvailableViews';
import {ViewProps} from '../wizard/Wizard';
import './WelcomeView.css';

/**
 * Welcome page for the application
 */
 export class WelcomeView extends Component<ViewProps,{}> {

    render() {
        return (
            <div>
                <h1 id="welcome-title">SORRIR Configurator</h1>
                <div id="welcome-button-container">
                    <Button variant="outlined" color="primary" onClick={() => this.props.showView(AvailableViews.ComponentConfigurationView)}>
                        New Configuration
                    </Button> <br/>
                    <Button variant="outlined" onClick={() => this.props.showView(AvailableViews.ConfigurationImportView)}>
                        Load Configuration
                    </Button>
                </div>
            </div>
        );
    }
 }