import { Button } from '@material-ui/core';
import { AvailableViews, GetNewConfigurationViews, GetImportConfigurationViews, ResolveViewLabel } from '../AvailableViews';
import {ViewProps} from '../wizard/Wizard';
import './WelcomeView.css';


export interface WelcomeViewProps extends ViewProps{
    startWizard: (views: AvailableViews[]) => void;
}

/**
 * Welcome page for the application
 */
export const WelcomeView = (props: WelcomeViewProps) => {

    const {startWizard} = props;

    const handleNewConfigurationClick = () => {

        const views: AvailableViews[] = GetNewConfigurationViews();
        startWizard(views);
    }

    const handleImportConfigurationClick = () => {

        const views: AvailableViews[] = GetImportConfigurationViews();
        startWizard(views);
    }

    return (
        <div id="welcome-container">
            <h1>{ResolveViewLabel(AvailableViews.WelcomeView)}</h1>
            <div id="welcome-button-container">
                <Button variant="outlined" color="primary" onClick={handleNewConfigurationClick}>
                    New Configuration
                </Button> <br/>
                <Button variant="outlined" onClick={handleImportConfigurationClick}>
                    Load Configuration
                </Button>
            </div>
        </div>
    );
 }