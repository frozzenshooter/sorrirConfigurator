import { Button } from "@material-ui/core";
import View from "../../util/Views";
import './AppWelcome.css';
import logo from './logo384.png';

export interface IAppWelcomeProps {
    onWizardStart: (requiredViews: View[]) => void;
}

const AppWelcome = (props: IAppWelcomeProps) => {

    const {onWizardStart} = props;

    const handleNewConfigurationClick = () => {
        onWizardStart([View.SubcomponentConfiguration, View.DegradationConfiguration, View.DegradationStateConfiguration, View.UpgradeConfiguration, View.UpgradeStateConfiguration, View.Export]);
    };

    const handleImportConfigurationClick = () => {
        onWizardStart([View.Import, View.SubcomponentConfiguration, View.DegradationConfiguration, View.DegradationStateConfiguration, View.UpgradeConfiguration, View.UpgradeStateConfiguration, View.Export]);
    };    

    return (
        <div id="welcome-container">
            <div id="welcome-title-container">
                <img src={logo} alt={"Sorrir Logo"} height={192} width={192}/>
                <h1>CONFIGURATOR</h1>
            </div>
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

export default AppWelcome;