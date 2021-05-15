import { Button } from '@material-ui/core';
import React from 'react';
import {Component, VoidFunctionComponent} from 'react';
import { AvailableViews } from '../AvailableViews';
import {ViewProps} from '../wizard/Wizard';
import { ConfigurationFileInput } from './ConfigurationFileInput';
import './ConfigurationImportView.css';
import IConfiguration from '../../interfaces/IConfiguration';
import SyntaxHighlighter from 'react-syntax-highlighter';
import lightfair from 'react-syntax-highlighter/dist/esm/styles/hljs/lightfair';
import { Alert, AlertTitle } from '@material-ui/lab';

/**
 * View for the configuration import
 */
export const ConfigurationImportView = (props: ViewProps) => {

    const {showView, handleConfigurationUpdate} = props;

    const handleFileChange = (filename: string, jsonData: string) => {
        console.log(filename, jsonData);
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

     */
    return (
        <div className="configuration-import-view">
            <h1>Import the configuration</h1>
            <div className="configuration-import-view-import-container">
                <div className="configuration-import-view-import-file-import">
                    <ConfigurationFileInput
                        handleChange={handleFileChange}
                        value={""}
                    />
                </div>
                <div className="configuration-import-view-syntaxhighlighter-container">
                    {parserError != ""?
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                <strong>Failure in the import:</strong>{parserError}
                            </Alert>
                            : ""
                        }
                    {jsonData.trim() != ""?
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
            <div className="configuration-import-view-button-container">
                <Button variant="contained" color="primary" onClick={() => showView(AvailableViews.WelcomeView)}>
                    Go back
                </Button><br/>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => showView(AvailableViews.ComponentConfigurationView)}
                    disabled={parserError != ""}>
                    Edit subcomponents
                </Button>
            </div>

        </div>
    );
}