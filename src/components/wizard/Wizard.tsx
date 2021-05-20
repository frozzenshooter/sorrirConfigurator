import React from "react";
import ViewLabelResolver from "../../util/ViewLabelResolver";
import View from "../../util/Views";
import MenuBar from "./MenuBar/MenuBar";
import ViewSelector from "./ViewSelector/ViewSelector";
import WizardStepper from "./WizardStepper/WizardStepper";
import './Wizard.css';

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
            <div id="wizard-container">                
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
            </div>
        );

    }else{
        return (
            <div>{"No view to display specified!"}</div>
        );
    }
}

export default Wizard;