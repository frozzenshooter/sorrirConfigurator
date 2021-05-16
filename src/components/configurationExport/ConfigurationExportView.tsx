import { Button } from '@material-ui/core';
import IConfiguration from '../../interfaces/IConfiguration';
import { AvailableViews, ResolveViewLabel } from '../AvailableViews';
import {StepperViewProps, ViewProps} from '../wizard/Wizard';
import './ConfigurationExportView.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import lightfair from 'react-syntax-highlighter/dist/esm/styles/hljs/lightfair';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

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

export interface ConfigurationExportViewProps extends StepperViewProps {
    configuration: IConfiguration;
}

/**
 * View for the configuration export
 */
 export const ConfigurationExportView = (props: ConfigurationExportViewProps) => {

    const {configuration, showView, views} = props;
    const configurationString = JSON.stringify(configuration, undefined, 4)
    
    const classes = useStyles();

    const handleStep = (index: number) => {
        showView(views[index]);
    }

    return (<div className="configuration-export-view">
                <div className={classes.grow}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <Typography className={classes.title} variant="h6" noWrap>
                                Configuration export
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.appBarSpacer}></div>
                <div className="configuration-export-stepper-container">
                    <Stepper nonLinear activeStep={views.findIndex(v => v === AvailableViews.ConfigurationExportView)}>
                        {views.map((view, index) => (
                            <Step key={ResolveViewLabel(view)}>
                                <StepButton onClick={() => {handleStep(index);}}>
                                    {ResolveViewLabel(view)}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </div>


                <div  className="configuration-export-view-export-container">
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