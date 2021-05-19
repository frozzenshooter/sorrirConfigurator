import View from "../../../util/Views";
import ExportView from "../../exportView/ExportView";
import ImportView from "../../importView/ImportView";
import SubcomponentConfigurationView from "../../subcomponentConfigurationView/SubComponentConfigurationView";

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
            case View.DegradationLevelConfiguration:
                return <div>DegradationLevelConfiguration</div>;
            case View.Export:
                return <ExportView />;
        default:
            return <div>Default</div>;
    }
};

export default ViewSelector;