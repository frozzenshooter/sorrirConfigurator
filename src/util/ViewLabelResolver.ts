import View from "./Views";

const ViewLabelResolver = (view: View) => {
    switch(view){
        case View.Import:
            return "Import";
        case View.SubcomponentConfiguration:
            return "Subcomponent";
        case View.DegradationConfiguration:
            return "Degradation";
        case View.DegradationStateConfiguration:
            return "Degradation State";
        case View.UpgradeConfiguration:
            return "Upgrade";
        case View.UpgradeStateConfiguration:
            return "Upgrade State";
        case View.Export:
            return "Export";
        default:
            return "";
    }
}

export default ViewLabelResolver; 