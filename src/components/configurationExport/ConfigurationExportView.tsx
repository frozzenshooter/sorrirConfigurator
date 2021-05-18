import { Button } from '@material-ui/core';
import IConfiguration from '../../interfaces/IConfiguration';
import { AvailableViews } from '../AvailableViews';
import {IStepperViewProps} from '../wizard/Wizard';
import './ConfigurationExportView.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import lightfair from 'react-syntax-highlighter/dist/esm/styles/hljs/lightfair';
import { MenuBar } from '../menuBar/MenuBar';
import { WizardStepper } from '../wizardStepper/WizardStepper';


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
    
    return (<div id="configuration-export-container">
                <MenuBar 
                    currentView={AvailableViews.ConfigurationExportView}
                    showView={showView}
                />
                <WizardStepper 
                    currentView={AvailableViews.ConfigurationExportView}
                    views={views}
                    showView={showView}
                />

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