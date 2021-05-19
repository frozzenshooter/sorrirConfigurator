import React from "react";
import ViewLabelResolver from "../../util/ViewLabelResolver";
import View from "../../util/Views";
import MenuBar from "./MenuBar/MenuBar";
import ViewSelector from "./ViewSelector/ViewSelector";
import WizardStepper from "./WizardStepper/WizardStepper";

export interface IWizardProps{
    requiredViews: View[];
    onWizardRestart: () => void;
}

const Wizard = (props: IWizardProps) => {

    const {requiredViews, onWizardRestart} = props;

    const [currentView, setCurrentView] = React.useState<View>(requiredViews[0]);
    
    const handleViewChange = (view: View) =>{
        setCurrentView(view);
    }

    const handleWizardRestart = () => {
        onWizardRestart();
    }

    if(currentView !== null){

        return (
            <React.Fragment>                
                <MenuBar
                    viewLabel={ViewLabelResolver(currentView)}                
                    onWizardRestart={handleWizardRestart}            
                />
                <WizardStepper
                    currentView={currentView}
                    views={requiredViews}
                    onViewChange={handleViewChange}
                />
                <ViewSelector 
                    view={currentView}
                />
            </React.Fragment>
        );

    }else{
        return (
            <div>{"No view to display specified!"}</div>
        );
    }
}

export default Wizard;