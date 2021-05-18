import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import View from "../../../util/Views";
import ViewLabelResolver from '../../../util/ViewLabelResolver';
import './WizardStepper.css';

export interface IWizardStepperProps {
    currentView: View;
    views: View[];
    onViewChange: (view: View) => void;
}

const WizardStepper = (props: IWizardStepperProps) => {

    const {currentView, views, onViewChange} = props;

    return (
        <div id="wizard-stepper-container">
            <Stepper elevation={1} square={false} nonLinear activeStep={views.findIndex(v => v === currentView)}>
                {views.map(view => (
                    <Step key={ViewLabelResolver(view)}>
                        <StepButton onClick={() => {onViewChange(view);}}>
                            {ViewLabelResolver(view)}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default WizardStepper;