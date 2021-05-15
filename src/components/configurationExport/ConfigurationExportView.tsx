import { Button } from '@material-ui/core';
import IConfiguration from '../../interfaces/IConfiguration';
import { AvailableViews } from '../AvailableViews';
import {ViewProps} from '../wizard/Wizard';
import './ConfigurationExportView.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import lightfair from 'react-syntax-highlighter/dist/esm/styles/hljs/lightfair';

interface ExportFileProps {
    configuration: IConfiguration;
}

export const ExportFile = (props:ExportFileProps) => {

    const {configuration} = props;

    const href= "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configuration));
    
    return (
        <Button variant="contained" color="primary" href={href} download="configuration.json" >
            Download
        </Button>
    );
}

export interface ConfigurationExportViewProps extends ViewProps {
    configuration: IConfiguration;
}

/**
 * View for the configuration export
 */
 export const ConfigurationExportView = (props: ConfigurationExportViewProps) => {

    const {configuration, showView} = props;
    const configurationString = JSON.stringify(configuration, undefined, 4)
    
    return (<div className="configuration-export-view">
                <h1>Export the configuration</h1>
                <div className="configuration-export-view-export-container">
                    <ExportFile 
                            configuration={configuration}
                        />
                </div>
                <div className="configuration-export-view-syntaxhighlighter-container">
                    {configurationString.trim() != ""?
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
                <div className="configuration-export-view-button-container">

                    <Button variant="contained" color="primary" onClick={() => showView(AvailableViews.ComponentConfigurationView)}>
                        Go back
                    </Button><br/>
                    <Button variant="contained" color="primary" onClick={() => showView(AvailableViews.WelcomeView)}>
                        Go back to welcome
                    </Button>

                </div>
            </div>
        );
 }