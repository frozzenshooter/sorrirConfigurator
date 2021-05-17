import { Button } from '@material-ui/core';
import IConfiguration from '../../interfaces/IConfiguration';
import { AvailableViews, ResolveViewLabel } from '../AvailableViews';
import {StepperViewProps} from '../wizard/Wizard';
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
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { DecisionDialog } from '../decisionDialog/DecisionDialog';
import React from 'react';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        grow: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
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
    
    // State for the menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isConfigurationResetDialogOpen, setIsConfigurationResetDialogOpen] = React.useState<boolean>(false);

    const handleMoreButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleCloseMoreMenu = () => {
        setAnchorEl(null);
    };

    const handleResetConfiguration = () => {
        setAnchorEl(null);
        setIsConfigurationResetDialogOpen(true);
    };

    const resetConfiguration = () => {
        // This will reset the configuration when the user starts a new configuration on the WelcomeView
        showView(AvailableViews.WelcomeView);
    };
    

    return (<div id="configuration-export-container">
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Configuration export
                        </Typography>
                        <IconButton edge="end" color="inherit" onClick={handleMoreButtonClicked}>
                            <MoreIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={
                                {
                                    vertical: 'top',
                                    horizontal: 'right',
                                }
                            }
                            keepMounted
                            transformOrigin={
                                {
                                    vertical: 'top',
                                    horizontal: 'right',
                                }
                            }
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMoreMenu}
                        >
                            <MenuItem onClick={handleResetConfiguration}>Reset configuration</MenuItem>
                        </Menu>

                    </Toolbar>
                </AppBar>
                <DecisionDialog
                    handleAccept={resetConfiguration}
                    handleCancel={() => {setIsConfigurationResetDialogOpen(false);}}
                    isOpen={isConfigurationResetDialogOpen}
                    title={"Reset configuration"}
                    text={"Confirm the reset of the current configuration. All unsaved data will be deleted!"}
                />
                <div className={classes.appBarSpacer}></div>
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