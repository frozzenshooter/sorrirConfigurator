import { Button } from '@material-ui/core';
import React from 'react';
import {Component, VoidFunctionComponent} from 'react';
import { AvailableViews } from '../AvailableViews';
import {ViewProps} from '../wizard/Wizard';
import { ConfigurationFileInput } from './ConfigurationFileInput';
import './ConfigurationImportView.css';
import TextField from '@material-ui/core/TextField';
import IConfiguration from '../../interfaces/IConfiguration';

/**
 * View for the configuration import
 */
export const ConfigurationImportView = (props: ViewProps) => {

    const {showView, handleConfigurationUpdate} = props;

    const handleFileChange = (filename: string, jsonData: string) => {
        console.log(filename);
        try{
            const loadedConfig : IConfiguration = JSON.parse(jsonData);
            const text : string = JSON.stringify(loadedConfig, undefined, 4);
            setJsonData(text);
            handleConfigurationUpdate(loadedConfig);
        }catch(ex){

            setJsonData("Not possible to parse the data: " + (ex as Error).message);
        }

    };

    const [jsonData, setJsonData] = React.useState<string>("");

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
                <TextField
                    label="Configuration"
                    multiline
                    fullWidth={true}
                    rowsMax={25}
                    value={jsonData}
                    variant="outlined"
                    onChange={(ev)=>{setJsonData(ev.target.value);}}
                />
            </div>
            <div className="configuration-import-view-button-container">
                <Button variant="contained" color="primary" onClick={() => showView(AvailableViews.WelcomeView)}>
                    Go back
                </Button><br/>
                <Button variant="contained" color="primary" onClick={() => showView(AvailableViews.ComponentConfigurationView)}>
                    Create new instead
                </Button>
            </div>

        </div>
    );
}