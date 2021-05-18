import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { AvailableViews, ResolveViewLabel } from '../AvailableViews';
import './WizardStepper.css';

export interface IWizardStepperProps {
    views: AvailableViews[];
    currentView: AvailableViews;
    showView: (availableView: AvailableViews) => void;
}


export const WizardStepper = (props : IWizardStepperProps) => {

    const {views, currentView, showView} = props;

    const handleStep = (index: number) => {
        showView(views[index]);
    }

    return (
        <div id="wizard-stepper-container">
            <Stepper elevation={1} square={false} nonLinear activeStep={views.findIndex(v => v === currentView)}>
                {views.map((view, index) => (
                    <Step key={ResolveViewLabel(view)}>
                        <StepButton onClick={() => {handleStep(index);}}>
                            {ResolveViewLabel(view)}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}