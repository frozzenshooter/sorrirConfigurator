import View from "../../../util/Views";
import DegradationLevelConfigurationView from "../../degradationLevelConfigurationView/DegradationLevelConfigurationView";
import DegradationStateConfigurationView from "../../degradationStateConfigurationView/DegradationStateConfigurationView";
import ExportView from "../../exportView/ExportView";
import ImportView from "../../importView/ImportView";
import SubcomponentConfigurationView from "../../subcomponentConfigurationView/SubComponentConfigurationView";
import UpgradeLevelConfigrationView from "../../upgradeLevelConfigurationView/UpgradeLevelConfigrationView";
import UpgradeStateConfigrationView from "../../upgradeStateConfigrationView/UpgradeStateConfigrationView";

export interface IViewSelectorProps{
    view: View
}

const ViewSelector = (props: IViewSelectorProps): JSX.Element => {

    const {view} = props;
        
    switch(view){
            case View.Import:
                return <ImportView />;
            case View.SubcomponentConfiguration:
                return <SubcomponentConfigurationView/>;
            case View.DegradationConfiguration:
                return <DegradationLevelConfigurationView />;
            case View.DegradationStateConfiguration:
                return <DegradationStateConfigurationView />;
            case View.UpgradeConfiguration:
                return <UpgradeLevelConfigrationView />;
            case View.UpgradeStateConfiguration:
                return <UpgradeStateConfigrationView />;
            case View.Export:
                return <ExportView />;
        default:
            return <div>Default</div>;
    }
};

export default ViewSelector;