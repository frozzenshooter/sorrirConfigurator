import View from "../../../util/Views";
import ImportView from "../../importView/ImportView";

export interface IViewSelectorProps{
    view: View
}

const ViewSelector = (props: IViewSelectorProps): JSX.Element => {

    const {view} = props;
        
    switch(view){
            case View.Import:
                return <ImportView />;
            case View.SubcomponentConfiguration:
                return <div>SubcomponentConfiguration</div>;
            case View.DegradationLevelConfiguration:
                return <div>DegradationLevelConfiguration</div>;
            case View.Export:
                return <div>Export</div>;
        default:
            return <div>Default</div>;
    }
};

export default ViewSelector;