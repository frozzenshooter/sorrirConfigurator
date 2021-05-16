import { Button } from '@material-ui/core';
import { AvailableViews, GetNewConfigurationViews, GetImportConfigurationViews, ResolveViewLabel } from '../AvailableViews';
import {ViewProps} from '../wizard/Wizard';
import './WelcomeView.css';


export interface WelcomeViewProps extends ViewProps{
    handleViewsUpdate: (views: AvailableViews[]) => void;
}

/**
 * Welcome page for the application
 */
export const WelcomeView = (props: WelcomeViewProps) => {

    const {handleViewsUpdate, showView} = props;

    const handleNewConfigurationClick = () => {

        const views: AvailableViews[] = GetNewConfigurationViews();
        handleViewsUpdate(views);

        showView(AvailableViews.ComponentConfigurationView)
    }

    const handleImportConfigurationClick = () => {

        const views: AvailableViews[] = GetImportConfigurationViews();
        handleViewsUpdate(views);

        showView(AvailableViews.ConfigurationImportView)
    }

    return (
        <div>
            <h1 id="welcome-title">{ResolveViewLabel(AvailableViews.WelcomeView)}</h1>
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