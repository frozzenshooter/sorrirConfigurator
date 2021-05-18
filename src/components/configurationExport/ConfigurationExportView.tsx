import { Button } from '@material-ui/core';
import IConfiguration from '../../interfaces/IConfiguration';
import { AvailableViews, ResolveViewLabel } from '../AvailableViews';
import {IStepperViewProps} from '../wizard/Wizard';
import './ConfigurationExportView.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import lightfair from 'react-syntax-highlighter/dist/esm/styles/hljs/lightfair';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { MenuBar } from '../menuBar/MenuBar';


interface ExportFileProps {
    configuration: IConfiguration;
}

export const ExportFile = (props: ExportFileProps) => {

    const {configuration} = props;

    const href= "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configuration));
    
    return (
        <Button variant="contained" color="primary" href={href} download="configuration.json" >
            Download
        </Button>
    );
}

export interface ConfigurationExportViewProps extends IStepperViewProps {
    configuration: IConfiguration;
}

/**
 * View for the configuration export
 */
 export const ConfigurationExportView = (props: ConfigurationExportViewProps) => {

    const {configuration, showView, views} = props;
    const configurationString = JSON.stringify(configuration, undefined, 4)
    
    const handleStep = (index: number) => {
        showView(views[index]);
    }
    
    return (<div id="configuration-export-container">
                <MenuBar 
                    availableView={AvailableViews.ConfigurationExportView}
                    showView={showView}
                />
                <div id="configuration-export-view-stepper-container">
                    <Stepper nonLinear elevation={1} square={false} activeStep={views.findIndex(v => v === AvailableViews.ConfigurationExportView)}>
                        {views.map((view, index) => (
                            <Step key={ResolveViewLabel(view)}>
                                <StepButton onClick={() => {handleStep(index);}}>
                                    {ResolveViewLabel(view)}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </div>

                <div  id="configuration-export-export-container">
                        <ExportFile 
                                configuration={configuration}
                            />
                        {configurationString.trim() !== ""?
                            <SyntaxHighlighter 
                                language='json' 
                                style={lightfair}
                                showLineNumbers={true}
                                wrapLongLines={true}
                            >
                                {configurationString}
                            </SyntaxHighlighter> 
                        :
                            ""
                        }
                </div>
            </div>
        );
 }