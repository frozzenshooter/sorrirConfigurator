import React from 'react';
import { AvailableViews } from '../AvailableViews';
import {IStepperViewProps} from '../wizard/Wizard';
import { ConfigurationFileInput } from './ConfigurationFileInput';
import './ConfigurationImportView.css';
import IConfiguration from '../../interfaces/IConfiguration';
import SyntaxHighlighter from 'react-syntax-highlighter';
import lightfair from 'react-syntax-highlighter/dist/esm/styles/hljs/lightfair';
import { Alert, AlertTitle } from '@material-ui/lab';
import { MenuBar } from '../menuBar/MenuBar';
import { WizardStepper } from '../wizardStepper/WizardStepper';


/**
 * View for the configuration import
 */
export const ConfigurationImportView = (props: IStepperViewProps) => {

    const {showView, handleConfigurationUpdate, views} = props;

    const handleFileChange = (filename: string, jsonData: string) => {
        try{
            const loadedConfig : IConfiguration = JSON.parse(jsonData);
            const text : string = JSON.stringify(loadedConfig, undefined, 4);
            setJsonData(text);
            handleConfigurationUpdate(loadedConfig);
            setParserError("");
        }catch(ex){
            setJsonData(jsonData);

            setParserError((ex as Error).message);
        }

    };

    const [jsonData, setJsonData] = React.useState<string>("");
    const [parserError, setParserError] = React.useState<string>("");

    /*
    
        SYNTAX ONLY HIGHLIGHTED - YOU CANT EDIT IT 

        BACKWARDS AND FORWARDS BUTTON TO ADD

     */
    return (
        <div id="configuration-import-container">
            <MenuBar 
                currentView={AvailableViews.ConfigurationImportView}
                showView={showView}
            />
            <WizardStepper 
                currentView={AvailableViews.ConfigurationImportView}
                views={views}
                showView={showView}
            />
            <div id="configuration-import-view-import-container">
                    <ConfigurationFileInput
                        handleChange={handleFileChange}
                        value={""}
                    />
                <div id="configuration-import-view-syntaxhighlighter-container">
                    {parserError !== ""?
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                <strong>Failure in the import:</strong>{parserError}
                            </Alert>
                            : ""
                        }
                    {jsonData.trim() !== ""?
                        <SyntaxHighlighter 
                            language='json' 
                            style={lightfair}
                            showLineNumbers={true}
                            wrapLongLines={true}
                        >
                            {jsonData}
                        </SyntaxHighlighter> 
                    :
                        ""
                    }
                </div>
            </div>
        </div>
    );
}