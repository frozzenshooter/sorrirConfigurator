import { Button } from '@material-ui/core';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { AvailableViews, ResolveViewLabel } from '../AvailableViews';
import {ViewProps} from '../wizard/Wizard';
import { ConfigurationFileInput } from './ConfigurationFileInput';
import './ConfigurationImportView.css';
import IConfiguration from '../../interfaces/IConfiguration';
import SyntaxHighlighter from 'react-syntax-highlighter';
import lightfair from 'react-syntax-highlighter/dist/esm/styles/hljs/lightfair';
import { Alert, AlertTitle } from '@material-ui/lab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        grow: {
            flexGrow: 1,
        },
        title: {
            display: 'block'
        },
        appBarSpacer: theme.mixins.toolbar
    })
);

export interface ConfigurationImportViewProps extends ViewProps{
    views: AvailableViews[]
}


/**
 * View for the configuration import
 */
export const ConfigurationImportView = (props: ConfigurationImportViewProps) => {

    const {showView, handleConfigurationUpdate, views} = props;

    const classes = useStyles();

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

    const handleStep = (index: number) => {
        showView(views[index])
    }

    /*
    
        SYNTAX ONLY HIGHLIGHTED - YOU CANT EDIT IT 

     */
    return (
        <div className="configuration-import-view">
            <div className={classes.grow}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Configuration import
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div className={classes.appBarSpacer}></div>
            <Stepper nonLinear activeStep={views.findIndex(v => v === AvailableViews.ConfigurationImportView)}>
                {views.map((view, index) => (
                <Step key={index}>
                    <StepButton onClick={() => {handleStep(index);}}>
                        {ResolveViewLabel(view)}
                    </StepButton>
                </Step>
                ))}
            </Stepper>

            <div className="configuration-import-view-button-container">
                <Button variant="contained" color="primary" onClick={() => showView(AvailableViews.WelcomeView)}>
                    Go back
                </Button>

                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => showView(AvailableViews.ComponentConfigurationView)}
                    disabled={parserError !== ""}>
                    Edit subcomponents
                </Button>
            </div>
            <div className="configuration-import-view-import-container ">
                    <ConfigurationFileInput
                        handleChange={handleFileChange}
                        value={""}
                    />
                <div className="configuration-import-view-syntaxhighlighter-container">
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