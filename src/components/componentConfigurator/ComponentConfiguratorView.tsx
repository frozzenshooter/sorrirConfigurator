import { Button } from '@material-ui/core';
import {Component} from 'react';
import { AvailableViews } from '../AvailableViews';
import {ViewProps} from '../wizard/Wizard';

/**
 * View for the 
 */
 export class ComponentConfiguratorView extends Component<ViewProps,{}> {
    render() {
        return (
            <div>
                <h1>Initalize the subcomponents and their states</h1>
                <Button variant="contained" color="primary" onClick={() => this.props.showView(AvailableViews.WelcomeView)}>
                    Go back
                </Button>
                <br/>
                <Button variant="contained" color="primary" onClick={() => this.props.showView(AvailableViews.ConfigurationExportView)}>
                    Export
                </Button><br/>
            </div>
        );
    }
 }