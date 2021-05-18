import View from "./Views";

const ViewLabelResolver = (view: View) => {
    switch(view){
        case View.Import:
            return "Import";
        case View.SubcomponentConfiguration:
            return "Subcomponent Configuration";
        case View.DegradationLevelConfiguration:
            return "Degradation Level Configuration";
        case View.Export:
            return "Export";
        default:
            return "";
    }
}

export default ViewLabelResolver; 